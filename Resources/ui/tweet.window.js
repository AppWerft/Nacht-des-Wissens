exports.create = function() {
	var self = Ti.UI.createWindow({
		modal : true,
		bottom : 0,
		transform : Ti.UI.create2DMatrix({
			scale : 0.9
		}),
		barColor : '#ddd',
		height : Ti.UI.SIZE,
		navBarHidden : true,
		borderRadius : '10dp',
	});
	self.bg = Ti.UI.createImageView({
		width : Ti.UI.FILL,
		borderRadius : '10dps',
		opacity : 0.8,
		height : Ti.UI.FILL
	});
	self.add(self.bg);
	self.container = Ti.UI.createView({
		layout : 'vertical',
		height : Ti.UI.FILL
	});
	self.add(self.container);
	self.input = Ti.UI.createTextArea({
		barColor : '#00597C',
		value : '#ndwhh ',
		height : '80dp',
		top : 0,
		opacity : 0.88,
		enableReturnKey : true,
		left : '10dp',
		right : '10dp',
		width : Ti.UI.FILL,
	});
	self.container.add(Ti.UI.createLabel({
		text : 'Dein Tweet zur Nacht:',
		top : '10dp',
		backgroundColor : 'black',
		height : Ti.UI.SIZE,
		bottom : 0,
		width : Ti.UI.SIZE,
		left : '10dp',
		right : '10dp',
		color : 'white',
		font : {
			fontSize : '24dp',
			fontWeight : 'bold',
			fontFamily : 'PTSans-Narrow'
		}
	}));
	self.progressbar = Ti.UI.createProgressBar({
		height : '23dp',
		left : '12dp',
		right : '12dp',
		width : Ti.UI.FILL,
		min : 0,
		value : 5,
		bottom : 0,
		max : 180
	});
	self.container.add(self.progressbar);
	self.container.add(self.input);
	self.tweetbutton = Ti.UI.createButton({
		right : '10dp',
		bottom : '10dp',
		top : '10dp',
		visible : false,
		height : Ti.UI.SIZE,
		width : '100dp',
		title : 'Twittern',
	});
	self.container.add(self.tweetbutton);
	self.input.focus();
	self.input.addEventListener('return', function(_e) {
		self.input.blur();
	});
	self.input.addEventListener('change', function(_e) {
		self.progressbar.setValue(_e.source.value.length);
		if (_e.source.getValue().length > 30)
			self.tweetbutton.show();
	});
	self.tweetbutton.addEventListener('click', function(_e) {
		Ti.App.Twitter.addTweet({
			tweet : self.input.getValue(),
			ontweeted : function() {
				self.close();
			}
		});

	});
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			console.log(this.status);
			if (this.status == 200) {
				self.bg.setImage(this.responseData);
			}
		},
		onerror : function(e) {
			console.log(e.error);
		}
	});
	xhr.open('GET', 'http://familientagebuch.de/rainer/img/teaser/teaser' + Math.floor(Math.random() * 56 + 1) + '.jpg');
	xhr.send();
	return self;
};

