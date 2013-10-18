exports.init = function() {
	var CloudPush = require('ti.cloudpush');
	CloudPush.debug = true;
	CloudPush.enabled = true;
	CloudPush.showTrayNotificationsWhenFocused = true;
	CloudPush.focusAppOnPush = false;

	var deviceToken;
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	CloudPush.retrieveDeviceToken({
		success : function deviceTokenSuccess(e) {
			
			console.log('Device Token: ' + e.deviceToken);
		},
		error : function deviceTokenError(e) {
			console.log('Error: Probleme bei der PushServiceAnmeldung! ' + e.error);
		}
	});
};