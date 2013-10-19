exports.init = function() {
	if (Ti.Platform.Android.API_LEVEL < 13) {
		Ti.UI.createNotification({
			backgroundColor : 'red',
			message : 'Dieses Gerät kann keine Kurzbenachrichtigungen empfangen'
		}).show();
		return;
	}
	var CloudPush = require('ti.cloudpush');
	var deviceToken = null;
	var options = {
		enabled : true,
		showTrayNotificationsWhenFocused : true,
		showTrayNotification : true,
		focusAppOnPush : false
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
	Cloud.debug = true;
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
					message : '.....'
				}).show();
			}
		});
	}
	CloudPush.addEventListener('callback', function(evt) {
		var message = JSON.parse(evt.payload);
		if (message.alert)
			alert(message.alert);
		Ti.Media.createSound({
			url : "/assets/sound/hymne.wav"
		}).play();
	});
	CloudPush.addEventListener('trayClickLaunchedApp', function(evt) {
		Ti.API.info('Tray Click Launched App (app was not running)');
	});
	CloudPush.addEventListener('trayClickFocusedApp', function(evt) {
		Ti.API.info('Tray Click Focused App (app was already running)');
	});
};

