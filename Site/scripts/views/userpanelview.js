var UserPanelView = Backbone.View.extend({

	el: "#container",

	initialize: function() {

		_.bindAll(this, "fetch", "render");

		this.users = new Users();
	},

	fetch: function(callback) {

		this.users.fetch({
			success: function(collection, response) { 
				callback(); 
			}
		});
	},

	render: function() {

		var self = this;

		var renderer = function() {

			$(self.el).append(templates.general.content);
			$("#content").append(templates.site.userpanel);

			self.users.each(function(user) {

				var uv = new UserView({
					parent: self,
					model:  user,
					id:     'user' + user.get('id')
				});

				$("#userHolder").append(uv.render().el);
			});

			$(self.el).fadeIn(400);
		}

		utils.fadeElement(this.el, renderer);
	}

});