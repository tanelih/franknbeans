var AuthView = Backbone.View.extend({

	el: "#container",
	
	events: {
		"click #login_submit": 		"login",
		"click #register_submit": 	"register",
		"click #login_link" : 		"renderForm",
		"click #register_link" : 	"renderForm"
	},
	
	initialize: function() {
		
		// bind functions to 'this' view
		_.bindAll(this, "render", "renderForm", "login", "register");
	},

	render: function() {

		// preserve 'this'
		var self = this;
		
		// callback to render contents of authView
		var renderer = function() {

			$(self.el).append(templates.general.content);
			$("#content").append(
				_.template(templates.auth.content, {
					footer: _.template(templates.general.text, { txt: templates.general.disclaimer })
				})
			);
			$(self.el).fadeIn(400);
			
			self.renderForm(undefined, "login");
		}

		// fade #container & call renderer(form)
		utils.fadeElement(this.el, renderer);
	},
	
	renderForm: function(event, form) {

		if(event != undefined) form = $(event.currentTarget).html();

		// callback to render either register / login form
		var render = function(form) {
			$("#authform").append(templates.auth[form]);
			$("#authform").fadeIn(400);
		}
		utils.fadeElement("#authform", render, form);
		utils.fadeElement("#authinfo");
	},
	
	login: function() {

		// disable button
		$("#login_submit").attr('disabled', 'disabled');

		// loader
		utils.showLoader(".form_loader", "small");

		var self = this;
		
		// callback for success
		var success = function() {
			
			// enable button
			$("#login_submit").removeAttr('disabled');
			
			var callback = function() {

				if($("#topbar").is(":hidden"))
					$("#topbar").trigger("topbar:render");
				
				window.location.hash = "site/forum";
			}
			utils.fadeElement(self.el, callback);
		}

		// callback for errors
		var error = function(response) {
				
			// enable button
			$("#login_submit").removeAttr('disabled');
			
			var callback = function(msg) {
				$("#authinfo").append(_.template(templates.general.centertext, { txt: msg }));
				$("#authinfo").fadeIn(400);
			}
			utils.fadeElement("#authinfo", callback, response);
			utils.fadeElement(".form_loader");
		}

		auth.login({ success: success, error: error });
	},
	
	register: function() {

		// disable button
		$("#register_submit").attr('disabled', 'disabled');
		
		// show loader
		utils.showLoader(".form_loader", "small");

		// preserve 'this' to be used later on
		var self = this;

		// message callback
		var message = function(response) {
			
			var callback = function(msg) {
				
				$("#register_submit").removeAttr('disabled');
				$("#authinfo").append(_.template(templates.general.centertext, { txt: msg }));
				$("#authinfo").fadeIn(400);
			}
			utils.fadeElement("#authinfo", callback, response);
			utils.fadeElement(".form_loader");
		}

		auth.register(message);
	}
});