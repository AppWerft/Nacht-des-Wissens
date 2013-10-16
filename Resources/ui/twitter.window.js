exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : false,
		barColor : '#ddd',
		navBarHidden : true,
	});
	self.search = Titanium.UI.createSearchBar({
		barColor : '#00597C',
		showCancel : false,
		value : '#nachtdeswissens',
		height : '50dp',
		top : 0,
	});
	self.search.addEventListener('return', function(_e) {
		self.search.blur();
		_e.source.hide();
	});
	self.add(self.search);
	var catTemplate = require('ui/TEMPLATES').catrow;
	var eventTemplate = require('ui/TEMPLATES').eventrow;
	self.tv= Ti.UI.createTableView({top:'50dp'});
	self.add(self.tv);
	var rows = [];
	Ti.App.Twitter.fetch('search_tweets', 'medialehamburg', function(_response) {
		for (var i = 0; i < _response.statuses.length; i++) {

			var row = Ti.UI.createTableViewRow({
				user : _response.statuses[i].user
			});
			row.add(Ti.UI.createLabel({
				text : _response.statuses[i].text,
				left : 100
			}));
			row.add(Ti.UI.createImageView({
				left : 0,
				width : 90,
				height : 90,
				image : _response.statuses[i].user.profile_image_url

			}));

			rows.push(row);

		}
		tv.setData(rows);
	});
	self.add(self.listView);
	return self;
}; 