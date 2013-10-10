// this sets the background color of the master UIView (when there are no windows/tab groups on it)
exports.create = function() {
	Ti.UI.setBackgroundImage('default.png');
	var state = 0;
	var cron = setInterval(function() {
		Ti.UI.setBackgroundImage((state % 2) ? 'default.png' : 'default_.png');
		state++;
		console.log('Info: startcounter=' + state);
	}, 150);
	var tabGroup = Ti.UI.createTabGroup();
	console.log('Info: tabgroup created');

	var win1 = Titanium.UI.createWindow({
		title : 'Tab 1',
		backgroundColor : '#fff'
	});
	var tab1 = Titanium.UI.createTab({
		icon : '/icons/route.png',
		title : 'Shuttles',
		window : require('ui/lines.window').create()
	});

	var tab2 = Titanium.UI.createTab({
		icon : '/icons/notepad.png',
		title : 'Themen',
		window : require('ui/categories.window').create()
	});

	var tab3 = Titanium.UI.createTab({
		icon : '/icons/house.png',
		title : 'Einrichtungen',
		window : require('ui/locations.window').create()
	});

	var tab4 = Titanium.UI.createTab({
		title : 'FAQ',
		window : require('ui/faq.window').create()
	});
	var tab5 = Titanium.UI.createTab({
		title : 'Meine Nacht',
		icon : 'icons/person.png',
		visible : false,
		window : require('ui/mytour.window').create()
	});
	tabGroup.addTab(tab2);
	tabGroup.addTab(tab1);
	tabGroup.addTab(tab3);
	tabGroup.addTab(tab4);
	tabGroup.addTab(tab5);
	console.log('Info: tabs to tabgroup added');

	setTimeout(function() {
		clearInterval(cron);
		console.log('Info: conter stopped');
		Ti.UI.setBackgroundImage('default.png');
		tabGroup.open();
		console.log('Info: tabgroup opened');
	
	}, 900);
};
