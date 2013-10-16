exports.create = function(_options) {
	var event = JSON.parse(_options);
	if (!Ti.Network.online && event.location) {
		 event.location.hvvlink = undefined;
	}
	var self = Ti.UI.createWindow({
		fullscreen : false,
		barColor : '#ddd',
		navBarHidden : false,
		title : event.titel,
		backgroundColor : '#00597C',
	});
	var container = Ti.UI.createScrollView({
		scrollType : 'vertical',
		left : '10dp',
		right : '10dp',
		top : '20dp',
		layout : 'vertical',
		top : 0
	});
	var event = Ti.App.NdW.getEventById(event.id);
	var banner = Ti.UI.createView({
		backgroundImage : '/assets/rot.png',
		width : Ti.UI.SIZE,
		left : 0,
		top : 0,
		height : Ti.UI.SIZE
	});
	banner.add(Ti.UI.createLabel({
		text : event.titel,
		top : '7dp',
		left : '10dp',
		right : '10dp',
		bottom : '10dp',
		color : '#fff',
		font : {
			fontSize : '26dp',
			fontFamily : 'PTSans-Narrow'
		},
	}));
	container.add(banner);
	container.add(Ti.UI.createLabel({
		text : event.description,
		top : '7dp',
		color : '#fff',
		font : {
			fontSize : '20dp',
			fontFamily : 'PTSans-Narrow'
		},
	}));
	var navi = Ti.UI.createView({
		height : Ti.UI.SIZE,
		top : '10dp',
		backgroundColor : '#003040'
	});
	navi.add(Ti.UI.createLabel({
		left : '10dp',
		top : '5dp',
		text : 'Wo: ' + event.ort,
		color : 'white',
		font : {
			fontSize : '16dp',
			fontFamily : 'PTSans-Narrow'
		},
	}));
	navi.add(Ti.UI.createLabel({
		left : '10dp',
		top : '25dp',
		text : 'Wann: ' + event.zeit,
		color : '#fff',
		font : {
			fontSize : '16dp',
			fontFamily : 'PTSans-Narrow'
		},
	}));
	var star = Ti.UI.createButton({
		image : (event.fav) ? '/assets/star.png' : '/assets/stargray.png',
		width : '50dp',
		backgroundColor : 'transparent',
		height : '60dp',
		right : 0
	});
	star.addEventListener('click', function() {
		Ti.App.NdW.addFav(event.id);
		star.setImage('/assets/star.png');
	});
	navi.add(star);
	container.add(navi);
	var hvv = Ti.UI.createView({
		height : Ti.UI.SIZE,
		top : '10dp',
		backgroundColor : '#003040'
	});
	hvv.add(Ti.UI.createImageView({
		left : 0,
		image : (event.location.hvvlink) ? '/assets/hvv.png' : '/assets/hvvgray.png',
		width : '100dp'
	}));
	hvv.add(Ti.UI.createLabel({
		left : '110dp',
		text : event.location.hvv,
		color : 'white',
		font : {
			fontSize : '16dp',
			fontFamily : 'PTSans-Narrow'
		},
	}));
	container.add(hvv);
	hvv.addEventListener('click', function() {
		if (event.location.hvvlink) {
			var win = Ti.UI.createWindow({
				modal : true,
				title : 'Fahrplanauskunft für „' + event.location.haus + '“'
			});
			win.add(Ti.UI.createWebView({
				url : event.location.hvvlink
			}));
			win.open();
		}
	});
	container.add(Ti.UI.createImageView({
		image : event.location.grafik,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		top : '50dp'
	}));
	container.add(Ti.UI.createLabel({
		text : event.location.infotext,
		top : '10dp',
		height : Ti.UI.SIZE,
		color : '#fff',
		font : {
			fontSize : '20dp',
			fontFamily : 'PTSans-Narrow'
		},
	}));
	self.add(container);
	var toast = Ti.UI.createNotification({
		message : (event.fav) ? 'Diese Veranstaltung hast Du Dir schon vorgemerkt.' : "Mit dem kleinen Stern kannst Du Dir dieses Ereignis merken.",
		duration : Ti.UI.NOTIFICATION_DURATION_SHORT
	});
	toast.show();
	return self;
};
