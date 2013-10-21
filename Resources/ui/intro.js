exports.create = function() {
	var self = Ti.UI.createWindow({
		backgroundImage : '/Default.png',
		fullscreen : true,
		navBarHidden : true
	});
	self.open();
	self.progress = Ti.UI.createProgressBar({
		bottom : '25%',
		height : '40dp',
		opacity : 0.5,
		width : '90%',
		min : 0,
		max : 1
	});
	self.add(self.progress);
	self.progress.show();
	self.cron = setInterval(function() {
		self.setBackgroundImage('/Default_.png');
		setTimeout(function() {
			self.setBackgroundImage('/Default.png');
		}, 150);
	}, 500);
	self.addEventListener('androidback', function() {
		return false;
	});
	return self;
};
