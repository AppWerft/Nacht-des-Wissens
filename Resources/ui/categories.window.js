Array.prototype.isArray = true;
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
	self.listView.addEventListener('itemclick', function(_e) {
		var win = require('ui/eventsbycategory.window').create(_e.itemId);
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
