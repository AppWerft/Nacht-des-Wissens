Array.prototype.isArray = true;
exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : false,
		barColor : '#ddd',
		backgroundColor : '#00597C',
		title : 'Meine Nachttour'
	});

	var updateList = function() {
		var favs = Ti.App.NdW.getFavs();
		if (favs.length == 0) {
			alert('Hier werden die von Dir vorgemerkten Ereignisse angezeigt. Du kannst Sie mit dem Stern auf dr Ereignisseite vormerken.')
		}
		return;
	};

	self.addEventListener('focus', updateList)
	return self;
};
