exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : false,
		barColor : '#ddd',
		navBarHidden : true,
		backgroundColor : '#00597C'
	});
	self.search = Titanium.UI.createSearchBar({
	 barColor : '#00597C',
	 showCancel : false,
	 value : '#nachtdeswissens',
	 height : '50dp',
	 top : 0,
	 });
	 self.search.addEventListener('return', function(_e) {
	 });
	
	return self;
};

