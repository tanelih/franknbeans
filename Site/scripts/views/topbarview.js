var TopbarView = Backbone.View.extend({

	el: "#topbar",

	events: {
		"topbar:render": 	"render",
		"click #about": 	"clickAbout",
		"click #forum":  	"clickForum",
		"click #userpanel": "clickUserPanel",
		"click #options": 	"clickOptions",
		"click #logout": 	"clickLogout"
	},

	initialize: function() {

		_.bindAll(this, "render", "clickAbout", "clickForum", 
			"clickUserPanel", "clickOptions", "clickLogout");		
	},

	render: function() {

		// pick templates
		this.topbar_opts = (parseInt(auth.user.admin)) ? 
			templates.site.admin.topbar_opts : templates.site.user.topbar_opts;
		
		var user = auth.user;

		$(this.el).append(_.template(templates.site.topbar, {
			options: _.template(
				this.topbar_opts, 
				{ user: "welcome " + user.name }
			)
		}));
		$(this.el).fadeIn(400);
	},

	clickAbout: function() {

		window.location.hash = "site/about";
	},

	clickForum: function() {

		window.location.hash = "site/forum";
	},

	clickUserPanel: function() {
		window.location.hash = "site/userpanel";
	},

	clickOptions: function() {

	},

	clickLogout: function() {

		var onfade = function() {
			window.location.hash = "site/auth";		
		}

		$.get('api/auth/logout', function() {
			utils.fadeElement("#topbar", onfade);
			utils.fadeElement("#container");
		});
	}
});