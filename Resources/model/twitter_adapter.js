var Twitter = function(_options) {
	this.init(_options);
	return this;
};

Twitter.prototype.init = function(_options) {
	var Codebird = require("vendor/codebird");
	this.cb = new Codebird();
	console.log('Info: codebird created');
	this.cb.setConsumerKey(Ti.App.Properties.getString('twitter.consumerkey'), Ti.App.Properties.getString('twitter.consumersecret'));
	console.log('Info: consumer setted');
	var bearerToken = Ti.App.Properties.getString('TwitterBearerToken', null);
	var self = this;
	if (bearerToken == null) {
		console.log('Info: bearertoken missing => fetching one');
		this.fetch('oauth2_token', {}, function(reply) {
			var bearer_token = reply.access_token;
			console.log('Info: bearertoken =' + bearer_token);
			self.cb.setBearerToken(bearer_token);
			Ti.App.Properties.setString('TwitterBearerToken', bearer_token);
		});
	} else {
		console.log('Info: bearertoken always in system');
		this.cb.setBearerToken(bearerToken);
	}

};

Twitter.prototype.fetch = function(_action, _needle, _callback) {
	this.cb.__call(_action, {
		count : 100,
		src : 'typd',
		q : Ti.Network.encodeURIComponent(_needle)
	}, function(reply) {
		if (reply.httpstatus == 200)
			_callback && _callback(reply);
	}, true);
};

module.exports = Twitter;
