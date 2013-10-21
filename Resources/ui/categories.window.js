Array.prototype.isArray = true;
exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : false,
		barImage : '/assets/rot.png',
		barColor :'#00597C',
		title : 'Wissensgebiete / Suche'
	});
	var activityIndicator = Ti.UI.createActivityIndicator({
		color : 'black',
		font : {
			fontFamily : 'PTSans-Narrow',
			fontSize : '16dp',
		},
		message : 'Suche und stöbere im Veranstaltungsplan …',
		style : (Ti.Android) ? Ti.UI.ActivityIndicatorStyle.DARK : Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		height : '100dp',
		center : {
			x : 0.5,
			y : 0.3
		},
		width : '88%'
	});
	self.search = Titanium.UI.createSearchBar({
		barColor : '#00597C',
		showCancel : false,
		hintText : 'Suchbegriff',
		height : '50dp',
		top : 0,
	});
	self.search.addEventListener('return', function(_e) {
		self.search.blur();
		activityIndicator.show();
		_e.source.hide();
		Ti.App.NdW.searchEvents({
			needle : _e.source.value,
			onfound : function(_artifacts) {
				_e.source.show();
				setTimeout(function() {
					activityIndicator.hide();
				}, 1000);
				var artifacts = [];
				for (var i = 0; i < _artifacts.length; i++) {
					artifacts.push({
						title : {
							text : _artifacts[i].titel
						},
						location : {
							text : _artifacts[i].location.haus + '\n' + _artifacts[i].location.teilnehmer
						},
						zeit : {
							text : _artifacts[i].zeit
						},
						pict : {
							image : _artifacts[i].location.pict
						},
						template : 'event',
						properties : {
							itemId : JSON.stringify(_artifacts[i]),
							type : 'event',
							accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
						}
					});
				}
				sections[0].setItems(artifacts);
			}
		});
	});
	self.add(self.search);
	var catTemplate = require('ui/TEMPLATES').catrow;
	var eventTemplate = require('ui/TEMPLATES').eventrow;

	self.listView = Ti.UI.createListView({
		bottom : '60dp',
		top : '50dp',
		backgroundColor : '#00597C',
		templates : {
			'category' : catTemplate,
			'event' : eventTemplate
		},
		defaultItemTemplate : 'category',
	});
	self.listView.addEventListener('itemclick', function(_e) {
		var props = _e.section.getItemAt(_e.itemIndex).properties;
		var win = (props.type == 'category') ? require('ui/eventsbycategory.window').create(props.itemId) : require('ui/event.window').create(props.itemId);
		if (Ti.Android)
			win.open();
		else
			self.tab.open(win, {
				animate : true
			});
	});
	self.add(self.listView);
	var sections = [], data = [];
	var categories = Ti.App.NdW.getTags();
	for (var i = 0; i < categories.length; i++) {
		data.push({
			pic : {
				image : '/assets/uhu.png'
			},
			category : {
				text : categories[i].name
			},
			properties : {
				itemId : JSON.stringify(categories[i]),
				type : 'category',
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
			}
		});
		sections[0] = Ti.UI.createListSection({
			headerTitle : 'Suchergebnisse',
			items : []
		});
		sections[1] = Ti.UI.createListSection({
			headerTitle : 'Kategorien',
			items : data
		});
		self.listView.setSections(sections);
	}
	self.listView.add(activityIndicator);
	self.add(require('ui/gallery.widget').create());

	return self;
};
x = {
	"category" : {
		"text" : "Architektur und Bauwesen"
	},
	"pic" : {
		"image" : "/assets/uhu.png"
	},
	"properties" : {
		"accessoryType" : 3,
		"type" : "category",
		"itemId" : "{\"id\":3,\"name\":\"Architektur und Bauwesen\"}"
	}
};
