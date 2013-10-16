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
	});
	self.tv = Ti.UI.createTableView({
		top : '0dp',
		height : Ti.UI.FILL,
		backgroundColor : '#00597C'
	});
	self.tv.addEventListener('click', function(_e) {
		var dialog = Ti.UI.createOptionDialog({
			options : [_e.rowData.user.name, 'Retweet', 'Link'],
			title : 'Wie geht es weiter?'
		});
		dialog.show();
		dialog.addEventListener('click', function(_d) {
			switch(_d.index) {
				case 0:
					var win = require('ui/twitterprofil.window').create(_e.rowData.user);
					break;
			}
			if (Ti.Android)
				win.open();
			else
				self.tab.open(win, {
					animate : true
				});
		});
	});
	function updateTweets() {
		Ti.App.Twitter.fetch('search_tweets', 'NachtdesWissens', function(_response) {
			var rows = [];
			console.log('Info: tweets=' + _response.statuses.length);
			for (var i = 0; i < _response.statuses.length; i++) {
				var tweet = _response.statuses[i];
				var row = Ti.UI.createTableViewRow({
					user : tweet.user,
					hasChild : true
				});
				row.add(Ti.UI.createLabel({
					text : tweet.text,
					top : '5dp',
					bottom : '10dp',
					left : '90dp',
					right : '10dp',
					color : 'white',
					font : {
						fontSize : '22dp',
						fontFamily : 'PTSans-Narrow'
					}
				}));
				row.add(Ti.UI.createImageView({
					left : 0,
					width : '64dp',
					height : '64dp',
					top : '10dp',
					image : tweet.user.profile_image_url

				}));
				rows.push(row);
			}
			self.tv.setData(rows);
		});
	}


	self.add(self.search);
	self.add(self.tv);
	self.addEventListener('focus', updateTweets);
	updateTweets();
	return self;
};

