exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : false,
		barColor : '#ddd',
		navBarHidden : true,
		backgroundColor : '#00597C'
	});
	self.tweetButton = Ti.UI.createButton({
		backgroundImage : '/assets/tweet.png',
		bottom : 0,
		width : '50dp',
		height : '50dp',
		right : 0,
		opacity : 0,
		bubbleParent : false
	});

	self.tweetList = Ti.UI.createTableView({
		height : Ti.UI.FILL,
		backgroundColor : '#00597C'
	});
	self.tweetList.addEventListener('click', function(_e) {
		var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
		var uri = _e.rowData.tweet.match(uri_pattern);
		var options = ['Twitter.Profil'];
		if (uri)
			options.push('ext. Link');
		var dialog = Ti.UI.createOptionDialog({
			options : options,
			title : _e.rowData.user.name
		});
		dialog.show();
		dialog.addEventListener('click', function(_d) {
			switch(_d.index) {
				case 0:
					var win = require('ui/twitterprofil.window').create(_e.rowData.user);
					break;
				case 1:
					var win = Ti.UI.createWindow({
						fullscreen : false
					});
					win.add(Ti.UI.createWebView({
						url : uri[0]
					}));
					win.addEventListener('longpress', function() {
						won.close();
					});
					break;
			}
			if (!win)
				return;
			if (Ti.Android)
				win.open();
			else
				self.tab.open(win, {
					animate : true
				});
		});
	});
	function updateTweetsOnGUI() {
		Ti.App.Twitter.fetch('search_tweets', 'NachtdesWissens OR #ndwhh', function(_response) {
			var rows = [];
			for (var i = 0; i < _response.statuses.length; i++) {
				var tweet = _response.statuses[i];
				var row = Ti.UI.createTableViewRow({
					user : tweet.user,
					tweet : tweet.text,
					hasChild : true,
					height : Ti.UI.SIZE
				});
				row.add(Ti.UI.createLabel({
					text : tweet.user.name + ', ' + tweet.user.location,
					top : '5dp',
					left : '100dp',
					right : '5dp',
					color : 'silver',
					height : '24dp',
					font : {
						fontSize : '18dp',
						fontFamily : 'PTSans-Narrow'
					}
				}));
				row.add(Ti.UI.createLabel({
					text : tweet.text,
					top : '35dp',
					bottom : '10dp',
					left : '100dp',
					right : '5dp',
					color : 'white',
					font : {
						fontSize : '22dp',
						fontFamily : 'PTSans-Narrow'
					},
					height : Ti.UI.SIZE
				}));
				row.add(Ti.UI.createImageView({
					left : 0,
					width : '70dp',
					height : '70dp',
					top : '10dp',
					image : tweet.user.profile_image_url

				}));
				rows.push(row);
			}
			self.tweetList.setData(rows);
		});
	}


	self.add(self.tweetList);
	self.add(self.tweetButton);
	self.tweetButton.addEventListener('click', function() {
		self.tweetButton.setOpacity(0);
		Ti.App.Twitter.autorize(function(_reply) {
			if (_reply.success == true) {
				var tweetWin = require('ui/tweet.window').create();
				tweetWin.open();
			}
		});
	});
	self.addEventListener('focus', function() {
		updateTweetsOnGUI();
		self.tweetButton.animate({
			opacity : 1,
			duration : 1700
		});
	});
	self.addEventListener('blur', function() {
		self.tweetButton.setOpacity(0);
	});
	updateTweetsOnGUI();
	return self;
};

