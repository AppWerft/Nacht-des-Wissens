Array.prototype.isArray = true;
var categories = ["Arbeit (24)", "Archäologie und Kunstgeschichte (11)", "Architektur und Bauwesen (30)", "Ausbildung und Arbeitswelt (55)", "Bank, Geld, Börse (20)", "Bibliothek,  Archiv, Datenbank (49)", "Bildung und Pädagogik (74)", "Biologie (83)", "Chemie und Biochemie (53)", "Datenverarbeitung und -schutz (24)", "Design und Mode (42)", "Energie (51)", "Ethik (17)", "Gartenbau und Landwirtschaft (6)", "Genetik (5)", "Gentechnologie und Biotechnologie (8)", "Geowissenschaften (42)", "Geschichtswissenschaften (42)", "Gesellschaftswissenschaften (40)", "Hamburg (50)", "Holzwirtschaft (29)", "Informatik und Computer Science (55)", "Ingenieurwissenschaften (108)", "Klima- und Umweltschutz (43)", "Kommunikation und Medien (100)", "Kunst und Kultur (73)", "Management (51)", "Marketing (42)", "Maschinenbau und Fahrzeugtechnik (62)", "Mathematik (28)", "Medizin und Gesundheit (155)", "Meeresforschung (20)", "Messen und Wiegen (9)", "Musik und Theater (69)", "Nachhaltigkeit (49)", "Neue Technologien und Materialien (56)", "Neurowissenschaften (15)", "Physik (88)", "Politik und Gesellschaft (87)", "Psyche und Gehirn (66)", "Recht und Gesetz (37)", "Religion und Philosophie (7)", "Sammlung (62)", "Sicherheit (17)", "Soziale Arbeit (5)", "Sport (14)", "Sprache und Literatur (45)", "Stadt und Metropole (44)", "Studium, Universität und Wissenschaft (220)", "Verkehr, Transport, Logistik (34)", "Weltraum (23)", "Wetter und Klima (42)"];
exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : false,
		barColor : '#ddd',
		navBarHidden : true,
		title : 'Wissensgebiete'
	});
	self.listView = Ti.UI.createListView({
		bottom : '60dp',
		backgroundColor : '#00597C',
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
	for (var i = 0; i < categories.length; i++) {
		var title = categories[i].split(' (')[0];
		var count = categories[i].split(' (')[1].replace(')', '');
		data.push({
			pic : {
				image : '/assets/uhu.png'
			},
			category : {
				text : title
			},
			count : {
				text : 'Anzahl der Sessions: ' + count
			},
			properties : {
				itemId : JSON.stringify(categories[i]),
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
			}
		});
		sections[0] = Ti.UI.createListSection({
			items : data
		});
		self.listView.setSections(sections);
	}
	self.add(require('ui/gallery.widget').create());

	return self;
};