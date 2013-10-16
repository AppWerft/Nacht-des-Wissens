exports.create = function(_options) {
	var location = JSON.parse(_options);
	var self = Ti.UI.createWindow({
		fullscreen : false,
		barColor : '#ddd',
		navBarHidden : false,
		title : location.teilnehmer || location.haus,
		backgroundColor : '#00597C',
	});
	var eventtemplate = require('ui/TEMPLATES').eventrow;
	self.listView = Ti.UI.createListView({
		backgroundColor : '#00597C',
		templates : {
			'event' : eventtemplate
		},
		defaultItemTemplate : 'event',
	});

	var events = Ti.App.NdW.getEventsByLocation(location.id);
	var data = [];
	for (var i = 0; i < events.length; i++) {
		var event = events[i];
		data.push({
			kind : {
				image : (event.kinderprogramm == true) ? '/assets/forkind.png' : '/assets/null.png'
			},
			rollstuhl : {
				image : (event.barrierefrei == true) ? '/assets/norollstuhl.png' : '/assets/rollstuhl.png'
			},
			title : {
				text : event.titel
			},
			zeit : {
				text : (event.zeit) ? event.zeit + '  ' : null
			},
			properties : {
				itemId : JSON.stringify(event),
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
			}
		});
	}

	var sections = [];
	sections[0] = Ti.UI.createListSection({
		items : data
	});
	self.listView.setSections(sections);
	self.add(self.listView);
	self.listView.addEventListener('itemclick', function(_e) {
		var win = require('ui/event.window').create(_e.itemId);
		if (Ti.Android)
			win.open();
		else
			self.tab.open(win, {
				animate : true
			});
	});
	return self;
};
