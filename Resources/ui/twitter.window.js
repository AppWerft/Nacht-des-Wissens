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
		width : '120dp',
		height : '20dp',
		right : 0,
		bubbleParent : false,
		height : '50dp'
	});
	self.tweetButtonList = Ti.UI.createTableView({
		height : Ti.UI.FILL,
		backgroundColor : '#00597C'
	});
	self.tweetButtonList.addEventListener('click', function(_e) {
		var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
		var uri = _e.rowData.tweet.match(uri_pattern);
		var options = ['Twitter.Profil', 'Retweet'];
		if (uri)
			options.push('Link');
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
				case 2:
					console.log(uri);
					var win = Ti.UI.createWindow({
						fullscreen : false
					});
					win.add(Ti.UI.createWebView({
						url : uri[0]
					}));
					break;
				case 1:
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
			for (var i = 0; i < _response.statuses.length; i++) {
				var tweet = _response.statuses[i];
				var row = Ti.UI.createTableViewRow({
					user : tweet.user,
					tweet : tweet.text,
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
			self.tweetButtonList.setData(rows);
		});
	}


	self.add(self.tweetButtonList);
	self.add(self.tweetButton);
	self.tweetButton.addEventListener('click', function() {
		Ti.App.Twitter.tweet();
	});
	self.addEventListener('focus', function() {
		updateTweets();
	});
	updateTweets();
	return self;
};

