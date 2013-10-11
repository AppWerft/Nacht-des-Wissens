// this sets the background color of the master UIView (when there are no windows/tab groups on it)
exports.create = function() {
	var splash = Ti.UI.createWindow({
		backgroundImage : 'Default.png'
	});
	var pb = Ti.UI.createProgressBar({
		bottom : '110dp',
		height : '50dp',
		width : '90%',
		min : 0,
		max : 6
	});
	splash.add(pb);
	pb.show();
	splash.open();
	var state = 0;
	var cron = setInterval(function() {
		splash.setBackgroundImage((state % 2) ? 'Default.png' : 'Default_.png');
		state++;
		pb.value = state;
		console.log('Info: startcounter=' + state);
	}, 200);
	var tabGroup = Ti.UI.createTabGroup();
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
		icon : '/icons/faq.png',
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
		splash.setBackgroundImage('Default.png');
		console.log('Info: conter stopped');
		tabGroup.open();
		splash.close();
		console.log('Info: tabgroup opened');
		clearInterval(cron);

	}, 900);
};
