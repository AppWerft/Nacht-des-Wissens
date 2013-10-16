Array.prototype.in_array = function(needle) {
	for (var i = 0; i < this.length; i++)
		if (this[i] === needle)
			return true;
	return false;
};

var NdW = function() {
	return this;
};

NdW.prototype.init = function(_args) {
	/*this.DB = Ti.Database.install('/model/nachtdeswissens.sqlite', 'nachtdeswissensutf8');
	 _args.onconnect && _args.onconnect(true);
	 return;*/
	var self = this;
	this.getDB({
		url : 'http://nacht-des-wissens-hamburg.de/lib/export/hh_app_export.sqlite.php',
		aspectedtablecount : 6,
		aspectedcontentlength : 600000,
		onprogress : _args.onprogress,
		onconnect : function(_DBconn) {
			console.log('Info: sucessful mirroring in model::init ' + _DBconn);
			self.DB = _DBconn;
			_args.onconnect && _args.onconnect(true);
		}
	});
};

NdW.prototype.getDB = function(_args) {
	var self = this;
	var DBconn = undefined;
	var dbname = Ti.Utils.md5HexDigest(_args.url);
	var onOffline = function() {
		console.log('Info: offline node ==> try to open cached db');
		DBconn = Ti.Database.open(dbname);
		var res = DBconn.execute('SELECT count(*) total FROM sqlite_master WHERE type="table" order by name');
		if (res.isValidRow()) {
			var total = res.fieldByName('total');
			console.log('Info: tables found=' + total + ' aspectedtablecount=' + _args.aspectedtablecount);
			res.close();
			if (total == _args.aspectedtablecount && _args.onconnect) {
				Ti.UI.createNotification({
					message : "Keine neue Version verfügbar, nutze Daten der letzten Mutzung.",
					duration : Ti.UI.NOTIFICATION_DURATION_LONG
				}).show();
				_args.onconnect(DBconn);
			} else {
				if (Ti.Android)
					DBconn.remove();
				else
					DBconn.file.deleteFile();
				alert('Für die Aktualisierung der Daten braucht die App wenigstens einmal das Internet');
				return;
			}
		} else {
			if (Ti.Android)
				DBconn.remove();
			else
				DBconn.file.deleteFile();

			alert('Für die Aktualisierung der Daten braucht die App wenigstens einmal das Internet');
			if (_args.defaultpath) {
				DBconn = Ti.Database.install(_args.defaultpath, dbname);
				_args.onconnect && _args.onconnect(DBconn);
				Ti.App.Properties.setString('dbmtime', (new Date).getTime());
			}
		}
	};
	var xhr = Ti.Network.createHTTPClient({
		onerror : onOffline,
		ondatastream : function(_p) {
			if (_args.onprogress) {
				if (_p.progress < 0)
					_p.progress = (1 - _p.progress / _args.aspectedcontentlength) / 2;
				_args.onprogress(_p.progress);
			}
		},
		onload : function() {
			var filename = dbname + '.sql';
			var tempfile = Ti.Filesystem.getFile(Ti.Filesystem.getTempDirectory(), filename);
			tempfile.write(this.responseData);
			try {
				var dummy = Ti.Database.open(dbname);
				if (Ti.Android)
					dummy.remove();
				else
					dummy.file.deleteFile();
			} catch(E) {
				onOffline();
				return;
			}
			DBconn = Ti.Database.install(tempfile.nativePath, dbname);
			console.log('Info: DBhandler ' + DBconn);
			_args.onconnect && _args.onconnect(DBconn);
		}
	});
	xhr.open('GET', _args.url);
	xhr.send();
};

NdW.prototype.getLastMod = function() {
	var res = this.DB.execute('SELECT modifiziert_am mtime FROM veranstaltungsorte ORDER BY modifiziert_am DESC LIMIT 0,1');
	if (res.isValidRow()) {
		Ti.UI.createNotification({
			message : "Letzte Änderung:  " + res.fieldByName('mtime'),
			duration : Ti.UI.NOTIFICATION_DURATION_LONG,
			bottom : 0,
		}).show();
		res.close();
	}
};

NdW.prototype.addFav = function(_id) {
	var favs = Ti.App.Properties.hasProperty('favs') ? Ti.App.Properties.getList('favs') : [];
	if (!favs.in_array(_id)) {
		favs.push(_id);
		Ti.Media.vibrate();
		Ti.App.Properties.setList('favs', favs);
	}
	console.log('Info: count of favs: ' + Ti.App.Properties.getList('favs').length);
};

NdW.prototype.isFav = function(_id) {
	var favs = Ti.App.Properties.hasProperty('favs') ? Ti.App.Properties.getList('favs') : [];
	return favs.in_array(_id);
};

NdW.prototype.getFavs = function() {
	var fav_ids = Ti.App.Properties.hasProperty('favs') ? Ti.App.Properties.getList('favs') : [];
	var favs = [];
	for (var i = 0; i < fav_ids.length; i++) {
		favs.unshift(this.getEventById(fav_ids[i]));
	}
	return favs;
};

NdW.prototype.getEventsByLocation = function(_id) {
	var self = this;
	var getEvent = function(eventset) {
		var keys = ['id', 'titel', 'kinderprogramm', 'kinder_ab', 'ort', 'zeit', 'beschreibung'];
		var event = {};
		for (var i = 0; i < keys.length; i++) {
			event[keys[i]] = eventset.fieldByName(keys[i]);
		}
		return event;
	};
	var sql = 'SELECT * FROM programmpunkte WHERE veranstaltungsort_id=' + _id;
	var eventset = self.DB.execute(sql);
	var events = [];
	while (eventset.isValidRow()) {
		events.push(getEvent(eventset));
		eventset.next();
	}
	eventset.close();
	return events;
};

NdW.prototype.getEventsByTag = function(_tag) {
	var self = this;
	var getEvent = function(eventset) {
		var keys = ['id', 'titel', 'kinderprogramm', 'kinder_ab', 'ort', 'zeit', 'beschreibung'];
		var event = {};
		for (var i = 0; i < keys.length; i++) {
			event[keys[i]] = eventset.fieldByName(keys[i]);
		}
		return event;
	};
	var eventset = self.DB.execute('SELECT * FROM programmpunkte WHERE schlagwort_1=? OR schlagwort_2=? OR schlagwort_3=? OR schlagwort_4=? OR schlagwort_5=? OR schlagwort_6=? ', _tag, _tag, _tag, _tag, _tag, _tag);
	var events = [];
	while (eventset.isValidRow()) {
		events.push(getEvent(eventset));
		eventset.next();
	}
	eventset.close();
	return events;
};

NdW.prototype.getLocationsByLine = function(line) {
	var res = this.DB.execute('SELECT * FROM veranstaltungsorte WHERE  haus <> "Wissenschaftszelt" AND (route_1_id = ? OR route_2_id = ? OR route_3_id = ? OR route_4_id = ? OR route_5_id = ? OR route_6_id = ? OR route_7_id = ?)', line, line, line, line, line, line, line);
	var loclist = [];
	while (res.isValidRow()) {
		loclist.push({
			id : res.fieldByName('id'),
			teilnehmer : res.fieldByName('teilnehmer') || '',
			haus : res.fieldByName('haus') || '',
			barrierefrei : (res.fieldByName('nicht_barrierefrei')) ? false : true,
			catering : res.fieldByName('catering'),
			grafik : 'http://nachtdeswissens.hamburg.de/files/docs/' + res.fieldByName('grafik'),
			pict : 'http://nachtdeswissens.hamburg.de/files/docs/resized/150x120/' + res.fieldByName('bild_datei'),
		});
		res.next();
	}
	res.close();
	return loclist;
};

NdW.prototype.getLocationById = function(id) {
	var self = this;
	var getShuttlesById = function(ids) {
		var sql = 'SELECT * FROM routen WHERE id IN (' + ids.join(',') + ')';
		var res = self.DB.execute(sql);
		var shuttles = [];
		while (res.isValidRow()) {
			shuttles.push({
				takt : res.fieldByName('takt'),
				name : res.fieldByName('name'),
			});
			res.next();
		}
		res.close();
		return shuttles;
	};
	var res = this.DB.execute('SELECT *,hvv_link_id hvvlink FROM veranstaltungsorte WHERE id= ?', id);
	var location = {};
	if (res.isValidRow()) {
		location = {
			id : res.fieldByName('id'),
			teilnehmer : res.fieldByName('teilnehmer') || '',
			haus : res.fieldByName('haus') || '',
			barrierefrei : (res.fieldByName('nicht_barrierefrei')) ? false : true,
			catering : res.fieldByName('catering'),
			plz : res.fieldByName('plz'),
			ort : res.fieldByName('ort'),
			strasse : res.fieldByName('strasse'),
			hvv : res.fieldByName('hvv'),
			hvvlink : (res.fieldByName('hvvlink')) ? 'http://m.hvv.de/fp.php?id=' + res.fieldByName('hvvlink') : null,
			infotext : res.fieldByName('infotext'),
			grafik : 'http://nachtdeswissens.hamburg.de/files/docs/' + res.fieldByName('grafik'),
			pict : 'http://nachtdeswissens.hamburg.de/files/docs/resized/150x120/' + res.fieldByName('bild_datei'),
		};
		var routen_ids = [];
		// das ist nun wirklich krank, aber der "DB" geschuldet
		for (var i = 1; i <= 7; i++) {
			if (res.fieldByName('route_' + i + '_id')) {
				routen_ids.push(i);
			}
		}
		location.shuttles = getShuttlesById(routen_ids);

	}
	res.close();
	return location;
};

NdW.prototype.getTags = function() {
	var res = this.DB.execute('SELECT * FROM schlagwoerter ORDER BY name');
	var tags = [];
	while (res.isValidRow()) {
		tags.push({
			id : res.fieldByName('id'),
			name : res.fieldByName('name')
		});
		res.next();
	}
	res.close();
	return tags;
};

NdW.prototype.searchEvents = function(_args) {
	var res = this.DB.execute('SELECT * FROM programmpunkte WHERE beschreibung LIKE "%' + _args.needle + '%"');
	var results = [];
	while (res.isValidRow()) {
		var id = res.fieldByName('id');
		results.push( result = {
			id : res.fieldByName('id'),
			fav : this.isFav(id),
			description : res.fieldByName('beschreibung') || '',
			titel : res.fieldByName('titel') || '',
			zeit : res.fieldByName('zeit') || 'keine Angabe',
			ort : res.fieldByName('ort') || 'keine Angabe',
			barrierefrei : (res.fieldByName('nicht_barrierefrei')) ? false : true,
			catering : res.fieldByName('catering'),
			kinderprogramm : res.fieldByName('kinderprogramm'),
			kinderab : res.fieldByName('kinder_ab'),
			location : this.getLocationById(res.fieldByName('veranstaltungsort_id'))
		});
		res.next();
	}
	res.close();
	_args.onfound && _args.onfound(results);

};

NdW.prototype.getEventById = function(id) {
	var result = undefined;
	var res = this.DB.execute('SELECT * FROM programmpunkte WHERE id = ?', id);
	if (res.isValidRow()) {
		var id = res.fieldByName('id');
		result = {
			id : id,
			fav : this.isFav(id),
			description : res.fieldByName('beschreibung') || '',
			titel : res.fieldByName('titel') || '',
			zeit : res.fieldByName('zeit') || 'keine Angabe',
			ort : res.fieldByName('ort') || 'keine Angabe',
			barrierefrei : (res.fieldByName('nicht_barrierefrei')) ? false : true,
			catering : res.fieldByName('catering'),
			kinderprogramm : res.fieldByName('kinderprogramm'),
			kinderab : res.fieldByName('kinder_ab'),
			location : this.getLocationById(res.fieldByName('veranstaltungsort_id'))
		};
	}
	res.close();
	return result;
};

NdW.prototype.getAllLines = function() {
	var self = this;
	var routen = self.DB.execute('SELECT * FROM routen ORDER BY name');
	var list = [];
	while (routen.isValidRow()) {
		var id = routen.fieldByName('id');
		list.push({
			id : id,
			name : routen.fieldByName('name'),
			takt : routen.fieldByName('takt'),
			locations : this.getLocationsByLine(id)
		});
		routen.next();
	}
	routen.close();
	return list;
};

module.exports = NdW;
