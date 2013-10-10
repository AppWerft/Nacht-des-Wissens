Array.prototype.isArray = true;
exports.create = function() {
	var locations = ["Akademie der Polizei Hamburg", "Akademie der Wissenschaften in Hamburg", "AMD Akademie Mode & Design", "Bernhard-Nocht-Institut für Tropenmedizin", "Bucerius Law School - Hochschule für Rechtswissenschaft", "Deutsches Elektronen-Synchrotron DESY", "DIPLOMA Hochschule Studienzentrum Hamburg", "EBC Hochschule", "EMBA - Europäische Medien- und Business-Akademie", "Europäisches Laboratorium für Molekularbiologie (EMBL)", "FOM Hochschule für Oekonomie & Management", "Forschungsinstitut Kinderkrebs-Zentrum Hamburg", "Forschungsstelle für Zeitgeschichte in Hamburg (FZH)", "GIGA German Institute of Global and Area Studies", "HafenCity Universität Hamburg", "Hamburg Media School", "Hamburger Institut für Sozialforschung", "Hanseatische Verwaltungs- und Wirtschaftsakademie VWA", "HanseMerkur Zentrum für Traditionelle Chinesische Medizin am UKE gGmbH", "Helmut-Schmidt-Universität", "HFH · Hamburger Fern-Hochschule gemeinnützige GmbH", "Hochschule Fresenius", "Hochschule für Angewandte Wissenschaften Hamburg (HAW Hamburg)", "    Campus Berliner Tor", "    ModeCampus Armgartstraße", "    Kunst- und Mediencampus Hamburg", "    Campus Bergedorf", "Hochschule für bildende Künste", "Hochschule für Musik und Theater", "HSBA Hamburg School of Business Administration", "Institut für Friedensforschung und Sicherheitspolitik an der Universität Hamburg", "Institut für Geschichte der deutschen Juden - IGDJ", "Internationale Bauausstellung IBA Hamburg GmbH", "International School of Management", "ISS International Business School of Service Management", "KlimaCampus, Universität Hamburg", "    Deutsches Klimarechenzentrum", "    Exzellenzcluster CliSAP", "    Helmholtz-Zentrum Geesthacht", "    Max-Planck-Institut für Meteorologie", "    Universität Hamburg", "Kühne Logistics University", "Max-Planck-Institut für ausländisches und internationales Privatrecht", "MHMK Macromedia Hochschule für Medien und Kommunikation", "Michael-Balint-Institut", "SCOLAB Schülerlabor Hamburger Großmarkt", "Staats- und Universitätsbibliothek Hamburg Carl von Ossietzky", "Technische Universität Hamburg-Harburg (TUHH)", "Universität Hamburg", "    Hauptgebäude", "    Manuskriptkulturen in Asien, Afrika und Europa", "    Zoologisches Museum und Biozentrum Grindel", "    Fachbereich Chemie am Martin-Luther-King-Platz", "    Schaugewächshäuser des Botanischen Gartens", "    Fachbereich Physik in der Jungiusstraße", "    Thünen-Institute und Zentrum für Holzwirtschaft, Bergedorf", "    Sternwarte Hamburg-Bergedorf", "    CUI –The Hamburg Centre for Ultrafast Imaging, Bahrenfeld", "    Carl Friedrich von Weizsäcker-Zentrum für Naturwissenschaft und Friedensforschung (ZNF)", "Universitätsklinikum Hamburg-Eppendorf", "Vier Institute „Beim Schlump 83“", "    Carl Friedrich von Weizsäcker-Zentrum für Naturwissenschaft und Friedensforschung (ZNF)", "    Forschungsstelle für Zeitgeschichte in Hamburg (FZH)", "    Institut für Friedensforschung und Sicherheitspolitik an der Universität Hamburg", "    Institut für Geschichte der deutschen Juden - IGDJ", "ZBW – Leibniz-Informationszentrum Wirtschaft"];
	var self = Ti.UI.createWindow({
		fullscreen : false,
		barColor : '#ddd',navBarHidden:true,
		title : 'Wissensgebiete'
	});
	self.listView = Ti.UI.createListView({
		templates : {
			'cats' : require('ui/TEMPLATES').catrow
		},
		defaultItemTemplate : 'cats',
	});
	self.listView.addEventListener('itemclick', function(_e) {/*
		 var win = require('ui/listbycategory.detail.window').create(_e.itemId);
		 if (Ti.Android)
		 win.open();
		 else
		 self.tab.open(win, {
		 animate : true
		 });*/
	});
	self.add(self.listView);
	var sections = [], data = [];
	for (var i = 0; i < locations.length; i++) {
		data.push({
			pic : {
				image : '/assets/uhu.png'
			},
			category : {
				text : locations[i]
			},
			rties : {
				itemId : JSON.stringify(locations[i]),
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
			}
		});
		sections[0] = Ti.UI.createListSection({
			items : data
		});
		self.listView.setSections(sections);
	}
	

	return self;
};
