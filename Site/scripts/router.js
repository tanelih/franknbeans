var FrankRouter = Backbone.Router.extend({
	
	initialize: function() {
		
		this.topbarView 	= new TopbarView();
		this.authView   	= new AuthView();
		this.forumView  	= new ForumView();
		this.userPanelView 	= new UserPanelView();
	},
	
	routes: {
		"site/about": 		"about",
		"site/auth": 		"auth",
		"site/forum": 		"forum",
		"site/thread/:id": 	"thread",
		"site/userpanel": 	"userpanel"
	},

	about: function() {

		var callback = function() {
			
			$("#container").load("about.html", function() {
				$("#container").fadeIn(800);
			});
		}

		utils.showLoader("#container", "big");
		utils.fadeElement("#topbar", function() {
			utils.fadeElement("#container", callback);
		});
		
	},

	auth: function() {

		var self = this;

		var success = function() {
			window.location.hash = "site/forum";
		}

		utils.showLoader("#container", "big");
		auth.checkSession({ success: success, error: this.authView.render });
	},

	forum: function() {
		
		var self = this;

		var success = function() {

			if($("#topbar").is(":hidden"))
				self.topbarView.render();
			self.forumView.fetch(self.forumView.renderAll);
		}

		var error = function() {
			window.location.hash = "site/auth";
		}

		utils.showLoader("#container", "big");
		auth.checkSession({ success: success, error: error });
	},

	thread: function(id) {

		var self = this;
		var id   = id;

		var success = function() {

			if($("#topbar").is(":hidden"))
				self.topbarView.render();
			self.forumView.fetch(self.forumView.renderOne, id);
		}

		var error = function() {
			window.location.hash = "site/auth";
		}

		utils.showLoader("#container", "big");
		auth.checkSession({ success: success, error: error });
	},

	userpanel: function() {

		var self = this;

		var success = function() {

			if(!auth.user.admin) {
				utils.error("#container", "you are not an admin.");
				return;
			}

			if($("#topbar").is(":hidden"))
				self.topbarView.render();
			self.userPanelView.fetch(self.userPanelView.render);
		}

		var error = function() {
			window.location.hash = "site/auth";
		}

		auth.checkSession({ success: success, error: error });
	}
});