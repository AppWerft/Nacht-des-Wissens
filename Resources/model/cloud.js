exports.init = function() {
	if (!Ti.Android || Ti.Platform.Android.API_LEVEL < 13 || Ti.Network.online == false) {
		Ti.UI.createNotification({
			backgroundColor : 'red',
			message : 'Dieses Gerät kann zur Zeit keine Kurzbenachrichtigungen empfangen'
		}).show();
		return;
	}
	var CloudPush = require('ti.cloudpush');
	var deviceToken = null;
	var options = {
		showTrayNotificationsWhenFocused : true,
		showTrayNotification : true,
		focusAppOnPush : false,
		debug : false
	};
	for (var key in options) {
		CloudPush[key] = options[key];
	}
	CloudPush.clearStatus();
	CloudPush.retrieveDeviceToken({
		success : deviceTokenSuccess,
		error : deviceTokenError
	});
	var Cloud = require('ti.cloud');
	Cloud.debug = false;
	var deviceToken = null;

	function deviceTokenError(e) {
		Ti.UI.createNotification({
			backgroundColor : 'red',
			message : 'Problem bei der Anmeldung zum Benachichtigungsdienst'
		}).show();
		console.log('Error: Probleme bei der PushServiceAnmeldung! ' + e.error);
	}

	function deviceTokenSuccess(e) {
		deviceToken = e.deviceToken;
		Cloud.Users.login({
			login : 'dummy',
			password : 'dummy'
		}, function(e) {
			if (e.success) {
				Cloud.PushNotifications.subscribe({
					channel : 'alert',
					device_token : deviceToken,
					type : 'gcm'
				}, function(e) {
					if (e.success) {
						Ti.UI.createNotification({
							message : 'Anmeldung zum Benachrichtigungsdienst war erfolgreich.'
						}).show();
					} else {
					}
				});
			} else {
				Ti.UI.createNotification({
					backgroundColor : 'red',
					message : ''
				}).show();
			}
		});
	}


	CloudPush.addEventListener('callback', function(evt) {
		var message = JSON.parse(evt.payload).android;
		console.log(message);
		if (message.alert)
			Ti.UI.createAlertDialog({
				message : message.alert,
				ok : 'Okay',
				title : message.tile || 'Meldung'
			}).show();
		Ti.Media.createSound({
			url : "/assets/sound/hymne.mp3"
		}).play();
	});
	CloudPush.addEventListener('trayClickLaunchedApp', function(evt) {
		Ti.API.info('Tray Click Launched App (app was not running)');
	});
	CloudPush.addEventListener('trayClickFocusedApp', function(evt) {
		Ti.API.info('Tray Click Focused App (app was already running)');
	});
};

