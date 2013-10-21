Array.prototype.isArray = true;
exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : false,
		barImage : '/assets/rot.png',
		barColor :'#00597C',
		backgroundColor : '#00597C',
		title : 'Meine Nachttour'
	});
	var eventtemplate = require('ui/TEMPLATES').eventrow;
	self.listView = Ti.UI.createListView({
		backgroundColor : '#00597C',
		templates : {
			'event' : eventtemplate
		},
		defaultItemTemplate : 'event',
	});
	var sections = [];
	var updateList = function() {
		var events = Ti.App.NdW.getFavs();
		if (events.length == 0) {
			alert('Hier werden die von Dir vorgemerkten Ereignisse angezeigt. Du kannst Sie mit dem Stern auf dr Ereignisseite vormerken.');
			return;
		}
		var data = [];
		for (var i = 0; i < events.length; i++) {
			var event = events[i];
			data.push({
				kind : {
					image : (event['kinderprogramm']) ? '/assets/forkind.png' : '/assets/null.png'
				},
				rollstuhl : {
					image : (event['nicht_barrierefrei']) ? '/assets/norollstuhl.png' : '/assets/rollstuhl.png'
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
		sections[0] = Ti.UI.createListSection({
			items : data
		});
		self.listView.setSections(sections);
	};
	self.add(self.listView);
	self.addEventListener('focus', updateList);
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
