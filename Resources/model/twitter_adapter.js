/*
 *
 *
 * Example: https://gist.github.com/Rogichi/5905010
 *
 *
 */
var Twitter = function(_options) {
	//this.init(_options);
	return this;
};

Twitter.prototype.init = function(_options) {
	var Codebird = require("vendor/codebird");
	this.cb = new Codebird();
	this.cb.setConsumerKey(Ti.App.Properties.getString('twitter.consumerkey'), Ti.App.Properties.getString('twitter.consumersecret'));
	this.accessToken = null;
	this.accessTokenSecret = null;
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


Twitter.prototype.loadAccessToken = function(pService) {
	if (!Ti.App.Properties.hasProperty(pService) || !Ti.App.Properties.getString(pService))
		return;
	var config = undefined;
	try {
		config = JSON.parse(Ti.App.Properties.getString(pService));
	} catch(ex) {
		return;
	}
	if (!config) {
		return;
	}
	if (config.accessToken) {
		this.accessToken = config.accessToken;
	}
	if (config.accessTokenSecret) {
		this.accessTokenSecret = config.accessTokenSecret;
	}

	Ti.API.info('Info: Loading access token: done [accessToken:' + this.accessToken + '][accessTokenSecret:' + accessTokenSecret + '].');
};
///////////SAVE ACCESS TOKEN
Twitter.prototype.saveAccessToken = function(pService) {
	Ti.App.Properties.setString(pService, JSON.stringify({
		accessToken : this.accessToken,
		accessTokenSecret : this.accessTokenSecret
	}));
	Ti.API.info('Info: Saving access token: done.');
};

Twitter.prototype.clearAccessToken = function(pService) {
	Ti.App.Properties.setString(pService, JSON.stringify({
		accessToken : null,
		accessTokenSecret : null
	}));
	this.accessToken = null;
	this.accessTokenSecret = null;
};


Twitter.prototype.tweet = function(_tweet) {
	//this.clearAccessToken('twitter');
	this.loadAccessToken('twitter');
	if (this.accessTokenSecret != null && this.accessToken != null) {
		this.cb.setToken(this.accessToken, this.accessTokenSecret);
		///  setTweet();
	}
	else {
		var self = this;
		this.cb.__call("oauth_requestToken", {
			oauth_callback : "oob"
		}, function(reply) {
			// stores it
			self.cb.setToken(reply.oauth_token, reply.oauth_token_secret);

			// gets the authorize screen URL
			self.cb.__call("oauth_authorize", {}, function(auth_url) {

				//window.codebird_auth = window.open(auth_url);
				console.log('Info: oauth_authorize comes with ' + auth_url);
				// ...
				var win = Ti.UI.createWindow({
					modal : true
				});
				var webView = Ti.UI.createWebView({
					url : auth_url
				});
				closeLabel = Ti.UI.createLabel({
					textAlign : 'right',
					font : {
						fontWeight : 'bold',
						fontSize : '12pt'
					},
					text : '(X)',
					top : 0,
					right : 0,
					height : 14
				});
				webView.add(closeLabel);
				closeLabel.addEventListener('click', function(e) {
					win.remove(webView)
				});
				var destroyAuthorizeUI = function() {
					Ti.API.info('destroyAuthorizeUI');
					// remove the UI
					try {
						win.removeEventListener('load', authorizeUICallback);
						win.remove(webView);
						webView = null;
					} catch(ex) {
						Ti.API.info('Cannot destroy the authorize UI. Ignoring.');
					}
				};
				var authorizeUICallback = function(e) {
					Ti.API.info('authorizeUILoaded');
					//alert('authorizeUILoaded');

					//var val = window.evalJS('document.getElementById("PINFIELD").value');
					var val = webView.evalJS('window.document.querySelector(\'kbd[aria-labelledby="code-desc"] > code\').innerHTML');
					Ti.API.info(val);

					//alert(window.html);
					if (val) {
						destroyAuthorizeUI();
						self.cb.__call("oauth_accessToken", {
							oauth_verifier : val
						}, function(reply) {
							// store the authenticated token, which may be different from the request token (!)
							self.cb.setToken(reply.oauth_token, reply.oauth_token_secret);
							Ti.API.info(reply);
							//setTweet();
							self.accessToken = reply.oauth_token;
							self.accessTokenSecret = reply.oauth_token_secret;
							self.saveAccessToken('twitter');
						});
					}
				};
				webView.addEventListener('load', authorizeUICallback);
				win.add();
			});
		});
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
