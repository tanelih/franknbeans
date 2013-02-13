var utils = {
	
	showLoader: function(element, size) {
		
		var loader = { };

		switch(size) {
			case "small":
				loader = { dia: 20 };
				break;
			case "big":
				loader = { dia: 200, margin: 256 };
				break;
			default:
				console.log("please specify either small / big loader.");
				break;
		}
		
		// fade out container & show a nice loader-animation
		$(element).fadeOut(200, function() {
			$(element).empty();
			$(element).append(templates.general.loader);
			
			var lo = new CanvasLoader("loader");
			lo.setColor("#370702");
			lo.setShape("spiral");
			lo.setDiameter(loader.dia);
			lo.setDensity(12);
			lo.setSpeed(1);
			lo.setFPS(24);
			lo.show();

			if(loader.margin) $("#loader").css("margin", loader.margin);

			$(element).fadeIn(200);
		});
	},

	fadeElement: function(el, callback, params) {
		
		// fade out element & invoke callback with parameters
		$(el).fadeOut(400, function() {
			$(el).empty();
			if(callback) callback(params);
		});
	},

	error: function(el, message) {

		var showMessage = function(message) {
			$(el).append(_.template(templates.general.error, {
				msg: message
			}));
			$(el).fadeIn(400);
		}	

		utils.fadeElement(el, showMessage, message);
	},

	getTime: function() {

		var utcTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
		return utcTime;
	},

	makeTime: function(dateTimeStr) {

		var utcTime = moment.utc(dateTimeStr, 'YYYY-MM-DD HH:mm:ss');		
		return utcTime.local().fromNow();
	}
}