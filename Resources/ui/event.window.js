exports.create = function(_options) {
	var event = JSON.parse(_options);
	console.log(event);
	var self = Ti.UI.createWindow({
		fullscreen : false,
		barColor : '#ddd',
		navBarHidden : false,
		title : event.titel,
		backgroundColor : '#00597C',
	});
	var container = Ti.UI.createScrollView({
		scrollType : 'vertical',
		layout : 'vertical',
		top : 0
	});
	var event = Ti.App.NdW.getEventById(event.id);
	console.log(event);
	container.add(Ti.UI.createLabel({text:event.description}));
	self.add(container);
	return self;
};
