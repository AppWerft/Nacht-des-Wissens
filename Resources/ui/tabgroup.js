// this sets the background color of the master UIView (when there are no windows/tab groups on it)
exports.create = function() {
	var intro = require('ui/intro').create();
	Ti.App.NdW.init({
		onprogress : function(_progress) {
			intro.progress.setValue(_progress);
		},
		onconnect : function() {
			clearInterval(intro.cron);
			Ti.App.NdW.getLastMod();
			var tabGroup = Ti.UI.createTabGroup({
				exitOnClose : true,
				navBarHidden : true
			});
			tabGroup.addTab(Ti.UI.createTab({
				icon : '/icons/route.png',
				title : 'Shuttles',
				window : require('ui/linesandlocations.window').create()
			}));
			tabGroup.addTab(Ti.UI.createTab({
				icon : '/icons/notepad.png',
				title : 'Suche',
				window : require('ui/categories.window').create()
			}));
			tabGroup.addTab(Ti.UI.createTab({
				title : 'Fragen',
				icon : '/icons/faq.png',
				window : require('ui/faq.window').create()
			}));
			tabGroup.addTab(Ti.UI.createTab({
				icon : '/icons/twitterbird.png',
				title : 'Twitter',
				window : require('ui/twitter.window').create()
			}));
			tabGroup.addTab(Ti.UI.createTab({
				title : 'Meine Nacht',
				icon : 'icons/person.png',
				visible : false,
				window : require('ui/eventsbyfavs.window').create()
			}));
			tabGroup.open();
			console.log('Info: tabgroup opened');
			setTimeout(function() {
				intro.close();
				console.log('Info: intro closed');
			}, 1000);
		}
	});
};
