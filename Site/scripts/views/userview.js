var UserView = Backbone.View.extend({

	className: "user",

	events: {
		"click .validateUser": 	"clickValidate",
		"click .deleteUser": 	"clickDelete"
	},

	initialize: function() {

		_.bindAll(this, "render", "clickValidate", "clickDelete");

		this.validity = [ "invalid", "valid" ];
	},

	render: function() {

		$(this.el).html(
			_.template(templates.site.userpanel_user, {
				name:  this.model.get("name")
			})
		);

		$(this.el).addClass(this.validity[this.model.get("valid")]);

		return this;
	},

	clickValidate: function() {

		console.log("clickValidate");

		$("#user" + this.model.get("id")).removeClass(this.validity[this.model.get("valid")]);

		this.model.set("valid", 1 - this.model.get("valid"));

		$("#user" + this.model.get("id")).addClass(this.validity[this.model.get("valid")]);
		
		this.model.save({
			success: function() {
				
			},
			error: function() {
				
			}
		});

		// onclick, disable .validateUser, on succ/err enable.

		// if valid, valid = 0, mode.save, renderContent
	},

	clickDelete: function() {

		console.log("clickDelete");
	}
});