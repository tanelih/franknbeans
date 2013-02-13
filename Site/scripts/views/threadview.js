var ThreadView = Backbone.View.extend({ 

	className: "thread",

	events: {
		"click .reply_thread": 		"clickReply",
		"click .delete_thread": 	"clickDeleteThread",
		"click .delete_reply": 		"clickDeleteReply",
		"click #replyfield_submit": "addReply",
		"click #replyfield_cancel": "clickCancel"
	},

	initialize: function(opts) {

		_.bindAll(this, "render", "renderPreview", "clickReply", "clickCancel",
			"clickDeleteThread", "clickDeleteReply", "addReply");

		// reference to parent, creator omnipotent
		this.parent = opts.parent;
		this.model  = opts.model;
		this.id 	= opts.id;

		// make models & collection
		var post 	= this.model.get('post');
		var replies = this.model.get('replies');

		this.post    = new Post(post);
		this.replies = new Replies();

		// populate this.replies
		var self = this;
		_.each(replies, function(reply) {
			self.replies.add(reply);
		});

		// pick options based on user-level
		this.post_opts = (auth.user.admin) ? 
			templates.site.admin.thread_opts : templates.site.user.thread_opts;
		this.reply_opts = (auth.user.admin) ?
			templates.site.admin.reply_opts : templates.site.user.reply_opts;
	},

	render: function(opts) {

		var self		= this;
		var reply_html 	= "";

		var options = (opts != undefined) ? opts : 
			{ hidden: "", replies: this.replies, replyfield: "" };

		options.replies.each(function(reply) {
			reply_html += _.template(templates.site.reply, {
				id: 		reply.get('id'),
				user: 		reply.get('user_name'),
				date: 		utils.makeTime(reply.get('date')),
				options: 	self.reply_opts,
				content: 	reply.get('content')
			})
		});

		$(this.el).html(_.template(templates.site.thread, {
			replyfield: options.replyfield,
			user: 		this.post.get('user_name'),
			date: 		utils.makeTime(this.post.get('date')),
			options: 	this.post_opts,
			content: 	this.post.get('content'),
			hidden: 	options.hidden,
			replies: 	reply_html
		}));

		return this;
	},

	renderPreview: function() {

		var filter_amnt 	= 5;

		if(this.replies.length < filter_amnt)
			return this.render();

		var options 		= { };
		var omitted			= this.replies.length - filter_amnt;
		var temp_replies 	= _.rest(this.replies.models, omitted);

		options.hidden 		= _.template(templates.site.omitted, { omitted: omitted });
		options.replies 	= new Replies(temp_replies);
		options.replyfield 	= "";

		return this.render(options);
	},

	renderThread: function() {

		var options = { };
		options.hidden 		= "";
		options.replies 	= this.replies;
		options.replyfield 	= templates.site.replyfield;

		return this.render(options);
	},

	clickReply: function() {
		
		// take us there!
		window.location.hash = "site/thread/" + this.post.get('id');
	},

	clickCancel: function() {

		// kate we have to go back
		window.location.hash = "site/forum";
	},

	clickDeleteReply: function(event) {

		// data-id contained @ .reply_header 
		var id = $(event.currentTarget).parent().parent().parent().data('id');

		var reply = this.replies.get(id);
		
		reply.destroy({
			success: function(collection, response) {
				utils.fadeElement("#reply" + id);
			},
			error: function(collection, response) {
				utils.error("#container", response.responseText);
			}
		});
	},

	clickDeleteThread: function() {
		
		$(this.parent.el).trigger("thread:delete", this.post.get('id'));
	},

	addReply: function() {

		$("#replyfield_submit").attr('disabled', 'disabled');

		var reply = { 
			post_id: 	this.post.get('id'),
			user_id: 	auth.user.id,
			content: 	$("#replytext").val(),
			date: 		utils.getTime()
		};

		this.replies.create(reply, {
			
			success: function(collection, response) {

				$("#replyfield_submit").removeAttr('disabled');
				window.location.hash = "site/forum";
			},
			error: function(collection, response) {

				$("#replyfield_submit").removeAttr('disabled');
				utils.error("#container", response.responseText);
			},
			wait: true
		});
	}
});