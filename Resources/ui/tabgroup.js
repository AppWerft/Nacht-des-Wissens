// this sets the background color of the master UIView (when there are no windows/tab groups on it)
exports.create = function() {
	var splash = Ti.UI.createWindow({
		backgroundImage : 'default.png'
	});
	splash.open();
	console.log('Info: SPLASH created ======================================');
	var state = 0;
	var cron = setInterval(function() {
		splash.setBackgroundImage((state % 2) ? 'default.png' : 'default_.png');
		state++;
	}, 250);
	var pb = Ti.UI.createProgressBar({
		bottom : '25%',
		height : '40dp',
		opacity : 0.5,
		width : '90%',
		min : 0,
		max : 1
	});
	splash.add(pb);
	pb.show();
	Ti.App.NdW.init({
		onprogress : function(_progress) {
			pb.setValue(_progress);
		},
		onconnect : function() {
			clearInterval(cron);
			Ti.App.NdW.getLastMod();
			var tabGroup = Ti.UI.createTabGroup();
			var tab1 = Titanium.UI.createTab({
				icon : '/icons/route.png',
				title : 'Shuttles',
				window : require('ui/linesandlocations.window').create()
			});
			var tab2 = Titanium.UI.createTab({
				icon : '/icons/notepad.png',
				title : 'Suche',
				window : require('ui/categories.window').create()
			});
			var tab3 = Titanium.UI.createTab({
				icon : '/icons/twitterbird.png',
				title : 'Twitter',
				window : require('ui/twitter.window').create()
			});
			var tab4 = Titanium.UI.createTab({
				title : 'Fragen',
				icon : '/icons/faq.png',
				window : require('ui/faq.window').create()
			});
			var tab5 = Titanium.UI.createTab({
				title : 'Meine Nacht',
				icon : 'icons/person.png',
				visible : false,
				window : require('ui/eventsbyfavs.window').create()
			});
			//tabGroup.addTab(tab2);
			tabGroup.addTab(tab1);
			tabGroup.addTab(tab2);
			tabGroup.addTab(tab4);
			tabGroup.addTab(tab3);
			tabGroup.addTab(tab5);
			splash.close();
			tabGroup.open();
		}
	});

};
