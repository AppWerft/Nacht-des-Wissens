exports.create = function() {
	var self = Ti.UI.createScrollView({
		bottom : 0,
		height : '60dp',
		scrollType : 'horizontal',
		contentHeight : '60dp',
		showHorizontalScrollIndicator : true,
		width : Ti.UI.FILL,
		backgroundColor : '#00597C',
		contentWidth : Ti.UI.SIZE
	});
	for (var i = 0; i < 80; i++) {
		var thumb = Ti.UI.createImageView({
			height : Ti.UI.FILL,
			width : Ti.UI.SIZE,
			left : i*30 + 'dp',
			top : 0,
			image : '/assets/thumbs/ndw-' + i + '.png' // output of imagemagick
		});
		self.add(thumb);
	}
	self.addEventListener('click', function() {
		console.log('Info: click on pdf thumb gallery received');
		var progresswidget = require('ui/progress.widget').create();
		self.add(progresswidget);
		require('ui/remotepdfviewer').createPDFViewer('http://nachtdeswissens.hamburg.de/Nacht-des-Wissens-2013.pdf', progresswidget);
	});
	return self;
};
