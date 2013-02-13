(function($) {

	// initialize our router
	new FrankRouter();

	// start our history
	Backbone.history.start();

	// we want to see the forum first!
	window.location.hash = window.location.hash || "site/forum";

})(jQuery);