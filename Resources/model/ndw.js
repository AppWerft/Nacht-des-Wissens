var NdW = function() {
	this.DB = Ti.Database.install('/model/nachtdeswissens.sqlite', 'nachtdeswissensutf8');
	this.getAllLines();
	return this;
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
	var res = this.DB.execute('SELECT * FROM veranstaltungsorte WHERE id= ?', id);
	var location = {};
	if (res.isValidRow()) {
		location = {
			id : res.fieldByName('id'),
			teilnehmer : res.fieldByName('teilnehmer') || '',
			haus : res.fieldByName('haus') || '',
			barrierefrei : (res.fieldByName('nicht_barrierefrei')) ? false : true,
			catering : res.fieldByName('catering'),
			grafik : 'http://nachtdeswissens.hamburg.de/files/docs/' + res.fieldByName('grafik'),
			pict : 'http://nachtdeswissens.hamburg.de/files/docs/resized/150x120/' + res.fieldByName('bild_datei'),
		};
	}
	res.close();
	return location;
};

NdW.prototype.getEventById = function(id) {
	var result = undefined;
	var res = this.DB.execute('SELECT * FROM programmpunkte WHERE id = ?', id);
	if (res.isValidRow()) {
		result = {
			id : res.fieldByName('id'),
			description : res.fieldByName('description') || '',
			titel : res.fieldByName('titel') || '',
			catering : res.fieldByName('catering'),
			kinderprogramm : res.fieldByName('kinderprogramm'),
			location : this.getLocationById(id)
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
