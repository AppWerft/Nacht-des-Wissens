exports.createPDFViewer = function(_pdfurl, _progresswidget) {
	if (Ti.Android) {
		if (Ti.Filesystem.isExternalStoragePresent()) {
			var filenameBase = new Date().getTime();
			var tmpFile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, filenameBase + '.pdf');
			var appFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, _pdfurl)
			tmpFile.write(appFile.read());
			if (tmpFile.exists()) {
				var intent = Ti.Android.createIntent({
					action : Ti.Android.ACTION_VIEW,
					type : "application/pdf",
					data : tmpFile.nativePath
				});
				try {
					Ti.Android.currentActivity.startActivity(intent);
				} catch(e) {
					Ti.API.debug(e);
					alert('No apps PDF apps installed!');
				}
			} else {
				Ti.API.info('starting intent tmpFile exists: ' + tmpFile.exists());
				alert('Our file disappeared!');
			}
		}
	} else {
		console.log('Info: iOS mode');
		var quickpdfreader = require('com.kuchbee.quickpdf');
		quickpdfreader.openPDF({
			file : _pdfurl.replace(/\.pdf/,''),
			password : '',
			isMailEnabled : false,
			loadFileFrom : 'ressources'
		});
		/*var doc = Ti.UI.iOS.createDocumentViewer({
		 url : _appFile.nativePath
		 });
		 doc.show();*/
	}

	return;
};
