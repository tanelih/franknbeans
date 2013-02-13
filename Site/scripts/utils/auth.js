var auth = {

	user: { },

	checkSession: function(options) {
		
		// call checksession from php
		$.get('api/auth/session', function(data) {
			
			try {
				auth.user = JSON.parse(data);
				options.success();
			}
			catch(err) {
				options.error()
			}
		});
	},

	getLogin: function() {

		// collect values into a user-object
		var user  = { };
		user.name = $("#login_usr").val();
		user.pass = CryptoJS.SHA256($("#login_pwd").val()).toString();
		return user;
	},

	getRegister: function() {
		
		// collect values into a test-object
		var test   = { };
		test.name  = $("#register_name").val();
		test.passa = CryptoJS.SHA256($("#register_pwd_a").val()).toString();
		test.passb = CryptoJS.SHA256($("#register_pwd_b").val()).toString();

		// check name length
		if(test.name.length < 4 || test.name.length > 24) 
			return "Your name must be between 4 and 24 characters long.";

		// check password matching
		if(test.passa != test.passb) 
			return "Passwords don't match.";

		// return a user-object
		return { name: test.name, pass: test.passa };
	},

	hashLogin: function(user, hash) {

		// add server-generated hash to hashed user password & rehash this
		user.pass = CryptoJS.SHA256(user.pass + hash).toString();
		return user;
	},

	login: function(options) {

		// get login information
		var user = auth.getLogin();

		// get a random hash from the server
		$.get('api/auth/hash', function(data) {

			// hash user password with new randomized hash
			user = auth.hashLogin(user, data);
			
			// send login information to server
			$.get('api/auth/login', user, function(data) {
				
				// if parse throws exception, we have an error message
				try {
					auth.user = JSON.parse(data);
					options.success();
				} 
				catch(err) {
					options.error(data);
				}
			});
		});		
	},

	register: function(message) {

		// get register-info
		var user = auth.getRegister();

		// if name is undefined, user must be an error msg
		if(user.name == undefined) {
			message(user);
			return;
		}
		
		$.post('api/auth/register', user, message);
	}
}