var ForumView = Backbone.View.extend({

	el: "#container",

	events: {
		"click #threadfield_submit": 	"addThread",
		"thread:delete": 				"deleteThread"
	},

	initialize: function() {
		
		_.bindAll(this, "fetch", "renderAll", "renderOne", "addThread", "deleteThread");
		this.threads = new Threads();
	},

	fetch: function(callback, params) {

		this.threads.fetch({
			success: function(collection, response) { 
				callback(params); 
			}
		});
	},

	renderAll: function() {

		// preserve this
		var self = this;

		// callback for fade
		var renderer = function() {

			// append general content
			$(self.el).append(templates.general.content);

			// append the new_thread field & threads-div
			$("#content").append(templates.site.threadfield);
			$("#content").append(templates.site.threads);

			// append each thread
			self.threads.each(function(thread) {
				var tv = new ThreadView({
					parent: self,
					model: thread, 
					id: "thread" + thread.get('post').id 
				});
				$("#threads").append(tv.renderPreview().el);
			});

			// fade in container
			$(self.el).fadeIn(400);
		}
		utils.fadeElement(this.el, renderer);
	},

	renderOne: function(id) {

		// preserve this
		var self = this;
		var id   = id;

		// find the thread
		var thread = _.find(this.threads.models, function(thread) {
			return thread.get('post').id == id;
		});

		// throw error if thread is not found
		if(thread == undefined) {
			utils.error(this.el, "Thread not found.");
			return;
		}

		// callback for fade
		var renderer = function() {

			// append general content
			$(self.el).append(templates.general.content);
			$("#content").append(templates.site.threads);
			
			var tv = new ThreadView({
				parent: self,
				model: thread, 
				id: "thread" + thread.get('post').id 
			});

			// append thread & fade in container
			$("#threads").append(tv.renderThread().el);
			$(self.el).fadeIn(400);
		}
		utils.fadeElement(this.el, renderer);
	},

	addThread: function() {

		$("#threadfield_submit").attr('disabled', 'disabled');

		var self = this;

		var thread = {
			post: {
				user_id: 	auth.user.id,
				content: 	$("#threadtext").val(),
				date: 		utils.getTime()
			},
			replies: [ ]
		};

		this.threads.create(thread, {
			success: function(collection, response) {

				$("#threadtext").val("");
				$("#threadfield_submit").removeAttr('disabled');

				var thread = new Thread(response);

				var tv = new ThreadView({
					parent: self,
					model: 	thread,
					id: 	"thread" + thread.get('post').id
				});

				$(tv.renderPreview().el).hide().prependTo("#threads").fadeIn(800);
			},
			error: function(collection, response) {

				$("#threadtext").val("");
				$("#threadfield_submit").removeAttr('disabled');
				utils.error("#container", response.responseText);
			},
			wait: true
		});
	},

	deleteThread: function(events, id) {

		var thread = _.find(this.threads.models, function(thread) {
			return thread.get('post').id == id;
		});

		var post = new Post(thread.get('post'));

		post.destroy({
			success: function(collection, response) {
				utils.fadeElement("#thread" + id);
			},
			error: function(collection, response) {
				utils.error("#container", response.responseText);
			}
		});
	}
});