Array.prototype.isArray = true;
exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : false,
		barColor : '#ddd',
		navBarHidden : false,
		title : 'Bus-Shuttles'
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
		var props = _e.section.getItemAt(_e.itemIndex).properties;
		if (props.itemId) {
			var win = require('ui/eventsbylocation.window').create(props.itemId);
			if (Ti.Android)
				win.open();
			else
				self.tab.open(win, {
					animate : true
				});
		}
	});
	self.add(self.listView);
	var sections = [], data = [];
	var lines = Ti.App.NdW.getAllLines();
	for (var i = 0; i < lines.length; i++) {
		if (lines[i].locations.length > 1)
			data.push({
				line : {
					text : 'Nacht des Wissens ' + lines[i].name
				},
				template : 'lines',
				properties : {
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
				}
			});
		if (lines[i].locations && lines[i].locations.isArray)
			for (var loc = 0; loc < lines[i].locations.length; loc++) {
				var location = lines[i].locations[loc];
				data.push({
					pict : {
						image : location.pict
					},
					catering : {
						image : (location.catering) ? '/assets/catering.png' : '/assets/null.png',
					},
					loc : {
						text : location.haus + '\n' + location.teilnehmer
					},
					template : 'locs',
					properties : {
						itemId : JSON.stringify(location),
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
	return self;
};
