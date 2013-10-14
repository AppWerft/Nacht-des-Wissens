exports.catrow = {
	properties : {
		height : 95,
		backgroundColor : '#00597C',
	},
	events : {
		click : function() {
		}
	},
	childTemplates : [{
		type : 'Ti.UI.View',
		properties : {
			width : Ti.UI.FILL,
			left : "95dp",
			right : '10dp',
			layout : 'vertical',
		},
		events : {
			click : function() {
			}
		},
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'category',
			properties : {
				left : 0,
				top : 0,
				color : '#fff',
				font : {
					fontSize : '24dp',
					fontWeight : 'bold',
					fontFamily : 'PTSans-Narrow'
				},
				height : Ti.UI.SIZE,
			},
			events : {
				'click' : function() {
				}
			}
		},{
			type : 'Ti.UI.Label',
			bindId : 'count',
			properties : {
				left : 0,
				top : 0,
				color : 'yellow',
				font : {
					fontSize : '14dp',
					fontFamily : 'PTSans-Narrow'
				},
				height : Ti.UI.SIZE,
			},
			events : {
				'click' : function() {
				}
			}
		}]
	}, {
		type : 'Ti.UI.ImageView',
		bindId : 'pic',
		properties : {
			left : 0,
			top : 0,
			bottom : '5dp',
			width : '80dp',
			height : Ti.UI.SIZE
		},
		events : {
			click : function() {
			}
		}

	}]
};


exports.linerow = {
	properties : {
		height : 30,
		backgroundColor : 'black',
	},
	events : {
		click : function() {
		}
	},
	childTemplates : [{
		type : 'Ti.UI.View',
		properties : {
			width : Ti.UI.FILL,
			left : "5dp",
			right : '10dp',
			layout : 'vertical',
		},
		events : {
			click : function() {
			}
		},
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'line',
			properties : {
				left : 10,
				top : 0,
				color : '#f90',
				font : {
					fontSize : '24dp',
					fontFamily : 'Elektra'
				},
				height : Ti.UI.SIZE,
			},
			events : {
				'click' : function() {
				}
			}
		}]
	}]
};

exports.locrow = {
	properties : {
		height : 90,
		backgroundColor : '#00597C',
	},
	events : {
		click : function() {
		}
	},
	childTemplates : [ {
		type : 'Ti.UI.ImageView',
		bindId : 'pict',
		properties : {
			left : 0,
			top : '5dp',defaultImage:'',
			bottom : '5dp',
			width : '80dp',
			height : Ti.UI.SIZE
		},
		events : {
			click : function() {
			}
		}

	},{
		type : 'Ti.UI.View',
		properties : {
			width : Ti.UI.FILL,
			left : "90dp",
			right : '10dp',
			layout : 'vertical',
		},
		events : {
			click : function() {
			}
		},
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'loc',
			properties : {
				left : '5dp',
				top : '7dp',
				bottom : '5dp',
				color : '#fff',
				font : {
					fontSize : '20dp',
					fontFamily : 'PTSans-Narrow'
				},
				height : Ti.UI.SIZE,
			},
			events : {
				'click' : function() {
				}
			}
		}]
	}]
};

