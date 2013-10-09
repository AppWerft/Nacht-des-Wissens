// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundImage('default.png');
var state = 0;
var cron = setInterval(function() {
	Ti.UI.setBackgroundImage((state % 2) ? 'default.png' : 'default_.png');
	state++;
}, 150);

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({
	title : 'Tab 1',
	backgroundColor : '#fff'
});
var tab1 = Titanium.UI.createTab({
	icon : 'KS_nav_views.png',
	title : 'Busse',
	window : win1
});

var mapcontainer = Ti.UI.createScrollView({
	scrollType : 'horizontal'
});

mapcontainer.add(Ti.UI.createImageView({
	image : '/icons/route.png',
	width : Ti.UI.FILL
}));
win1.add(mapcontainer);
//
// create controls tab and root window

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
	icon : 'KS_nav_ui.png',
	title : 'FAQ',
	window : require('ui/faq.window').create()
});

//
//  add tabs
//
tabGroup.addTab(tab2);
tabGroup.addTab(tab1);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);

setTimeout(function() {
	clearInterval(cron);
	Ti.UI.setBackgroundImage('default.png');
	tabGroup.open();
}, 1200);
