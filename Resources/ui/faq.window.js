Array.prototype.isArray = true;
exports.create = function() {
	var faq = {
		"Wann findet die nächste Nacht des Wissens statt?" : "Am Samstag, dem 2. November 2013, um 17 Uhr beginnt die nächste Wissensnacht. Bis 24.00 Uhr können Sie das Nacht-Programm in den teilnehmenden Einrichtungen besuchen.",
		"Wer organisiert die Nacht des Wissens?" : "Die Nacht des Wissens wird von der Behörde für Wissenschaft und Forschung der Freien und Hansestadt Hamburg veranstaltet. Sie wird ermöglicht durch das große Engagement der zahlreichen beteiligten wissenschaftlichen Einrichtungen.",
		"Wo findet die nächste Nacht des Wissens statt?" : "An der Nacht des Wissens in Hamburg beteiligen sich 55 wissenschaftliche Einrichtungen aus der Metropolregion Hamburg und Norddeutschland. Die Veranstaltungsorte mit den genauen Adressen finden Sie im Programm der Nacht des Wissens, das rechtzeitig vor der Veranstaltung erscheint.",
		"Wann wird es ausführliche Programminformationen geben?" : "Sie finden das vollständige Programm der Nacht des Wissens ab Ende September im Internet. Das gedruckte Programmheft erhalten Sie ab Anfang Oktober in allen an der Nacht des Wissens beteiligten Einrichtungen, in den Kultur- und Gastronomie-Auslagen von City News, cult promotion sowie cartel x sowie in den Bücherhallen und Servicestellen der HVV.",
		"Wird es auf der Nacht des Wissens spezielle Veranstaltungen für Kinder geben?" : "Viele der Programmangebote eignen sich für große und kleine Besucher gleichermaßen. Darüber hinaus bieten zahlreiche Einrichtungen auch spezielle Kinderprogramme an. Diese werden im Programmheft und im Internet extra gekennzeichnet.",
		"Muss man für die Nacht des Wissens Eintritt bezahlen?" : "Der Eintritt in die Nacht des Wissens sowie die Nutzung der speziell eingesetzten Shuttle-Busse ist für Besucherinnen und Besucher kostenlos.",
		"Wie kann ich mich regelmäßig über die Nacht des Wissens informieren?" : "Die Homepage zur Nacht des Wissens wird ständig aktualisiert. Außerdem informieren wir Sie gern über unseren Newsletter, den Sie hier bestellen können."
	};
	var self = Ti.UI.createWindow({
		fullscreen : false,
		barImage : '/assets/rot.png',
		barColor :'#00597C',
		title : 'Häufige Fragen'
	});
	var views = [];
	for (var q in faq) {
		var view = Ti.UI.createScrollView({
			width:Ti.UI.FILL,
			layout : 'vertical',
			height : Ti.UI.FILL,
			contentHeight : Ti.UI.SIZE,
			backgroundColor : '#00597C'
		});
		var banner = Ti.UI.createView({
			backgroundImage : '/assets/rot.png',
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			top : '5dp'
		});
		banner.add(Ti.UI.createLabel({
			text : q,
			top : '7dp',
			left : '10dp',
			right : '10dp',
			bottom : '15dp',
			color : '#fff',
			height : Ti.UI.SIZE,
			font : {
				fontSize : '22dp',
				fontFamily : 'PTSans-Narrow'
			},
		}));
		view.add(banner);
		view.add(Ti.UI.createLabel({
			text : faq[q],
			color : 'silver',
			left : '10dp',
			height : Ti.UI.SIZE,
			top : '30dp',
			right : '10dp',
			font : {
				fontSize : '20dp',
				fontFamily : 'PTSans-Caption'
			},
		}));
		views.push(view);
	}
	self.scroller = Ti.UI.createScrollableView({
		views : views,
		backgroundColor : '#00597C',
		showPagingControl : true
	});
	self.add(self.scroller);

	return self;
};
