var User = Backbone.Model.extend({
	
	defaults: {
		id: 		undefined,
		name: 		"",
		valid: 		0
	}
});

var Users = Backbone.Collection.extend({
	
	model: 			User,
	url: 			'api/users'
});

var Thread = Backbone.Model.extend({

	defaults: {
		post: 		{ },
		replies: 	[ ]
	}
});

var Threads = Backbone.Collection.extend({

	model: 			Thread,
	url: 			'api/threads'
});

var Post = Backbone.Model.extend({
	
	defaults: {
		id: 		undefined,
		user_id: 	undefined,
		user_name:  undefined,
		date: 		undefined,
		content: 	undefined
	},

	urlRoot: 		'api/thread'
});

var Reply = Backbone.Model.extend({
	
	defaults: {
		id: 		undefined,
		post_id: 	undefined,
		user_id: 	undefined,
		user_name: 	undefined,
		date: 		undefined,
		content: 	undefined
	}, 

	urlRoot: 		'api/replies'
});

var Replies = Backbone.Collection.extend({

	model: 			Reply,
	url: 			'api/replies'	
});