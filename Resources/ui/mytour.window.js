Array.prototype.isArray = true;
exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : false,
		barColor : '#ddd',
		backgroundColor : '#00597C',
		title : 'Meine Nachttour'
	});
	return self;
};
