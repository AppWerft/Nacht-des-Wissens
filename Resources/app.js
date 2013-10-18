(function() {
	Ti.UI.setBackgroundImage('/default.png');
	
	
	Ti.App.CloudPush = require('ti.cloudpush');
	 Ti.App.CloudPush.setEnabled(true);
	Ti.App.CloudPush.retrieveDeviceToken({
		success : function deviceTokenSuccess(e) {
			Ti.App.Cloud =  require('ti.cloud');
	Ti.App.Cloud.PushNotifications.subscribe({
                    channel: 'alert',
                    device_token: e.deviceToken,
                    type: 'gcm'
               });
			Ti.API.info('Device Token: ' + e.deviceToken);
		},
		error : function deviceTokenError(e) {
			alert('Probleme bei der PushServiceAnmeldung! ' + e.error);
		}
	});
	var TwitterApp = require('model/twitter_adapter');
	Ti.App.Twitter = new TwitterApp();

	var NdW = require('model/ndw');
	Ti.App.NdW = new NdW();

	require('ui/tabgroup').create();
})();


var Codebird3 = require("codebird");
 
var cb3 = new Codebird3();
 
cb3.setConsumerKey('correctTokenHere', 'AndHere');
 
function setTweet(){
       var tweet = 'I have just scored '+ globalPts +' points playing Clash of the Classics. Test your knowledge of the classic hits and see if you can beat my score. https://www.facebook.com/ClassicHits4FM/app_199377276878657';
        cb3.__call(
            "statuses_update",
                {"status": tweet },
                    function (reply) {
                    alert('In here');
                    function inspeccionar(obj){
                        alert('in reply part');
                        var msg = '';
                        for (var property in obj){
                            if (typeof obj[property] == 'function')
                            {
                                var inicio = obj[property].toString().indexOf('function');
                                var fin = obj[property].toString().indexOf(')')+1;
                                var propertyValue=obj[property].toString().substring(inicio,fin);
                                msg +=(typeof obj[property])+' '+property+' : '+propertyValue+' ;\n';
                            }
                            else if (typeof obj[property] == 'unknown')
                            {
                                msg += 'unknown '+property+' : unknown ;\n';
                            }
                            else
                                {
                                    msg +=(typeof obj[property])+' '+property+' : '+obj[property]+' ;\n';
                                }
                        }
                        return msg;
                        }
 
                        alert(inspeccionar(reply)); 
                        alert(reply.httpstatus);
 
                        if(reply.httpstatus == 200){
                                alert("Tweet sent!");
                                twitterBtn.setBackgroundImage('twitterShare_blue.png');
 
                         }
                         else{
                                alert(reply.errors);
                                //alert('Connection lost');
                         }
                }
        );
 
}




