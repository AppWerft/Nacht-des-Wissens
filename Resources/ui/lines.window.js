Array.prototype.isArray = true;
exports.create = function() {
	var lines = [{
		"line" : "#411",
		"locations" : ["HSBA Hamburg School of Business Administration", "Bernhard-Nocht-Institut für Tropenmedizin", "HafenCity Universität Hamburg – Universität für Baukunst und Metropolenentwicklung (HCU)", "Kühne Logistics University", "International School of Management (ISM)", "EBC Hochschule", "GIGA German Institute of Global and Area Studies", "ZBW – Leibniz-Informationszentrum Wirtschaft"]
	}, {
		"line" : "#412",
		"locations" : ["MHMK Macromedia Hochschule für Medien und Kommunikation", "GIGA German Institute of Global and Area Studies", "ZBW – Leibniz-Informationszentrum Wirtschaft", "Bucerius Law School - Hochschule für Rechtswissenschaft"]
	}, {
		"line" : "#413",
		"locations" : ["Wissenschaftszelt", "MHMK Macromedia Hochschule für Medien und Kommunikation", "EBC Hochschule", "ZBW – Leibniz-Informationszentrum Wirtschaft", "GIGA German Institute of Global and Area Studies", "Akademie der Wissenschaften in Hamburg", "Universität Hamburg Hauptgebäude", "Staats- und Universitätsbibliothek Hamburg Carl von Ossietzky", "Universität Hamburg – Schaugewächshäuser des Botanischen Gartens – Planten un Blomen, Fachbereich Biologie", "Universität Hamburg - Fachbereich Chemie (MLK 6)", "Universität Hamburg – Fachbereich Biologie: Zoologisches Museum und Biozentrum Grindel (MLK 3)", "KlimaCampus, Exzellenzcluster CliSAP", "FOM Hochschule für Oekonomie & Management / Hanseatische Verwaltungs- und Wirtschafts-Akademie VWA", "Hanseatische Verwaltungs- und Wirtschafts-Akademie VWA", "Carl Friedrich von Weizsäcker-Zentrum für Naturwissenschaft und Friedensforschung (ZNF)", "Forschungsstelle für Zeitgeschichte in Hamburg (FZH)", "Institut für Friedensforschung und Sicherheitspolitik an der Universität Hamburg (IFSH)", "Institut für die Geschichte der deutschen Juden (IGDJ)", "Michael-Balint-Institut", "Universitätsklinikum Hamburg-Eppendorf", "Forschungsinstitut Kinderkrebs-Zentrum Hamburg", "HanseMerkur Zentrum für Traditionelle Chinesische Medizin am UKE gGmbH", "EMBA Europäische Medien- und Business-Akademie", "Hamburger Institut für Sozialforschung", "Hochschule für Musik und Theater", "AMD Akademie Mode & Design", "Hochschule Fresenius, Fachbereiche Wirtschaft & Medien / Gesundheit & Soziales", "Max-Planck-Institut für ausländisches und internationales Privatrecht", "Manuskriptkulturen in Asien, Afrika und Europa"]
	}, {
		"line" : "#414",
		"locations" : ["MHMK Macromedia Hochschule für Medien und Kommunikation", "GIGA German Institute of Global and Area Studies", "EBC Hochschule", "ZBW – Leibniz-Informationszentrum Wirtschaft", "Staats- und Universitätsbibliothek Hamburg Carl von Ossietzky", "Universität Hamburg Hauptgebäude", "Universität Hamburg – Schaugewächshäuser des Botanischen Gartens – Planten un Blomen, Fachbereich Biologie", "Universität Hamburg Hauptgebäude", "Akademie der Wissenschaften in Hamburg", "Max-Planck-Institut für ausländisches und internationales Privatrecht", "Manuskriptkulturen in Asien, Afrika und Europa", "Hochschule Fresenius, Fachbereiche Wirtschaft & Medien / Gesundheit & Soziales", "AMD Akademie Mode & Design", "Hochschule für Musik und Theater", "Hamburger Institut für Sozialforschung", "EMBA Europäische Medien- und Business-Akademie", "Universitätsklinikum Hamburg-Eppendorf", "HanseMerkur Zentrum für Traditionelle Chinesische Medizin am UKE gGmbH", "Forschungsinstitut Kinderkrebs-Zentrum Hamburg", "Universitätsklinikum Hamburg-Eppendorf", "Michael-Balint-Institut", "Carl Friedrich von Weizsäcker-Zentrum für Naturwissenschaft und Friedensforschung (ZNF)", "Institut für Friedensforschung und Sicherheitspolitik an der Universität Hamburg (IFSH)", "Institut für die Geschichte der deutschen Juden (IGDJ)", "Forschungsstelle für Zeitgeschichte in Hamburg (FZH)", "Hanseatische Verwaltungs- und Wirtschafts-Akademie VWA", "FOM Hochschule für Oekonomie & Management / Hanseatische Verwaltungs- und Wirtschafts-Akademie VWA", "KlimaCampus, Exzellenzcluster CliSAP", "Universität Hamburg – Fachbereich Biologie: Zoologisches Museum und Biozentrum Grindel (MLK 3)", "Universität Hamburg - Fachbereich Chemie (MLK 6)", "Universität Hamburg Hauptgebäude"]
	}, {
		"line" : "#415",
		"locations" : ["DIPLOMA Hochschule", "SCOLAB Schülerlabor Hamburger Großmarkt", "GIGA German Institute of Global and Area Studies", "EBC Hochschule", "ZBW – Leibniz-Informationszentrum Wirtschaft", "Wissenschaftszelt"]
	}, {
		"line" : "#416",
		"locations" : ["Wissenschaftszelt", "Hochschule für Angewandte Wissenschaften Hamburg (HAW Hamburg)", "HAW Hamburg – ModeCampus Armgartstraße", "ISS International Business School of Service Management", "Akademie der Polizei Hamburg"]
	}, {
		"line" : "#417",
		"locations" : ["Hochschule für Angewandte Wissenschaften Hamburg (HAW Hamburg)", "Hochschule für bildende Künste", "Hamburg Media School", "HAW Hamburg – Kunst- und Mediencampus Hamburg", "HFH · Hamburger Fern-Hochschule – Studienzentrum Hamburg", "Helmut-Schmidt-Universität", "Wissenschaftszelt"]
	}, {
		"line" : "#418",
		"locations" : ["HAW Hamburg – Campus Bergedorf", "Universität Hamburg, Thünen-Institute und Zentrum für Holzwirtschaft, Fachbereich Biologie"]
	}, {
		"line" : "#419",
		"locations" : ["Universität Hamburg, Sternwarte Hamburg-Bergedorf, Fachbereich Physik"]
	}, {
		"line" : "#420",
		"locations" : ["IBA: Energieberg Georgswerder", "IBA: Energiebunker", "Technische Universität Hamburg-Harburg (TUHH)"]
	}];
	var self = Ti.UI.createWindow({
		fullscreen : false,
		barColor : '#ddd',
		navBarHidden : true,
		title : 'Wissensgebiete'
	});
	var linetemplate = require('ui/TEMPLATES').linerow;
	var loctemplate = require('ui/TEMPLATES').locrow;
	self.listView = Ti.UI.createListView({
		backgroundColor : '#00597C',
		templates : {
			'lines' : linetemplate,
			'locs' : loctemplate
		},
		defaultItemTemplate : 'locs',
	});
	self.listView.addEventListener('itemclick', function(_e) {
	});
	self.add(self.listView);
	var sections = [], data = [];
	for (var i = 0; i < lines.length; i++) {
		data.push({
			line : {
				text : 'Nacht des Wissens ' + lines[i].line
			},
			template : 'lines',
			properties : {
				itemId : JSON.stringify(lines[i]),
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
			}
		});
		if (lines[i].locations && lines[i].locations.isArray)
			for (var loc = 0; loc < lines[i].locations.length; loc++) {
				data.push({
					loc : {
						text : lines[i].locations[loc]
					},
					template : 'locs',
					properties : {
						itemId : JSON.stringify(lines[i]),
						accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
					}
				});
			}
		sections[0] = Ti.UI.createListSection({
			items : data
		});
		self.listView.setSections(sections);
	}
	var busmap = Ti.UI.createButton({
		backgroundImage : '/assets/busmap.png',
		width : '70dp',
		height : '70dp',
		bottom : 0,
		bubbleParent : false,
		right : 0
	});
	self.add(busmap);
	busmap.addEventListener('click', function() {
		console.log('Info: click on busmap received');
		require('ui/localpdfviewer').createPDFViewer('assets/busmap.pdf');
	});
	/*self.listView.addEventListener('swipe', function(_e) {
	 console.log(_e.direction);
	 });
	 */
	return self;
};
