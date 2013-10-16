(function() {
	Ti.UI.setBackgroundImage('/default.png');

	var TwitterApp = require('model/twitter_adapter');
	Ti.App.Twitter = new TwitterApp();

	var NdW = require('model/ndw');
	Ti.App.NdW = new NdW();

	require('ui/tabgroup').create();
})(); 