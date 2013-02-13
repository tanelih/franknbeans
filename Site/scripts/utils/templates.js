var templates = {
	
	general: {
			
		content:
			"<div id='content'></div>",
			
		loader:
			"<div id='loader'></div>",
			
		centertext:
			"<div class='text' style='text-align:center'><%= txt %></div>",

		text:
			"<div class='text'><%= txt %></div>",
			
		disclaimer:
			"<p>If you are new here, please see <a href='#site/about'>about</a> first. " +
			"You can then <span id='register_link'>register</span> or <span id='login_link'>login</span> " +
			" and start posting!</p>" +
			"<p>Please note that this site does not have anything to do with the similarly " +
			"named <a href='http://franknbeansonline.com/'>band</a>. If you happen to have " +
			"any questions, please redirect them to frank@franknbeans.net.</p>",

		error:
			"<div class='error'>" +
				"<%= msg %>" +
				"<div class='text'><a href='#site/forum'>back to forum</a></div>" +
			"</div>",
	},
	
	auth: {
		
		content:
			"<div id='logo'><img src='img/franknbeans.png' /></div>" +
			"<div id='authform'></div>" +
			"<div id='authinfo'></div>" +
			"<div id='footer'><%= footer %></div>",
				
		login:
			"<form>" +
				"<div class='label'>username</div>" +
				"<div class='textbox'>" +
					"<input id='login_usr' type='text' />" +
				"</div>" +
				"<div class='label'>password</div>" +
				"<div class='textbox'>" +
					"<input id='login_pwd' type='password' />" +
				"</div>" +
				"<div class='button'>" +
					"<input id='login_submit' type='button' value='login' />" +
				"</div>" +
				"<div class='form_loader'></div>" +
			"</form>",
			
		register:
			"<form>" +
				"<div class='label'>username</div>" +
				"<div class='textbox'>" +
					"<input id='register_name' type='text' />" +
				"</div>" +
				"<div class='label'>password</div>" +
				"<div class='textbox'>" +
					"<input id='register_pwd_a' type='password' />" +
				"</div>" +
				"<div class='label'>password again</div>" +
				"<div class='textbox'>" +
					"<input id='register_pwd_b' type='password' />" +
				"</div>" +
				"<div class='button'>" +
					"<input id='register_submit' type='button' value='register' />" +
				"</div>" +
				"<div class='form_loader'></div>" +
			"</form>",
	},
	
	site: {
		
		topbar:
			"<div id='topbar_header'>" +
				"<div title='about us' id='about' class='icon'><img src='img/dummy.png' /></div>" +
				"<div class='topbar_text'><span>Frank N' Beans</span></div>" +
			"</div>" +
			"<div id='topbar_options'>" +
				"<%= options %>" +
			"</div>",

		threads:
			"<div id='threads'></div>",

		thread:
			"<%= replyfield %>" +
			"<div class='post'>" +
				"<div class='post_header'>" +
					"<div class='left'>" +
						"<div class='icon'><img src='img/dummy.png' /></div>" +
						"<div class='header_text'><span><%= user %></span></div>" +
					"</div>" +
					"<div class='right'>" +
						"<div class='header_text'><span><%= date %></span></div>" +
						"<%= options %>" +
						"<div class='icon'><img title='reply to thread' class='reply_thread' src='img/dummy.png' /></div>" +
					"</div>" +
				"</div>" +
				"<div class='post_content'>" +
					"<%= content %>" +
				"</div>" +
			"</div>" +
			"<%= hidden %>" +
			"<div class='replies'><%= replies %></div>",

		reply:
			"<div id='reply<%= id %>' class='reply'>" +
				"<div class='reply_header' data-id='<%= id %>'>" +
					"<div class='left'>" +
						"<div class='icon'><img src='img/dummy.png' /></div>" +
						"<div class='header_text'><span><%= user %></span></div>" +
					"</div>" +
					"<div class='right'>" +
						"<div class='header_text'><span><%= date %></span></div>" +
						"<%= options %>" +
					"</div>" +
				"</div>" +
				"<div class='reply_content'>" +
					"<%= content %>" +
				"</div>" +
			"</div>",

		replyfield:
			"<div id='replyfield'>" +
				"<div class='text'>replying to thread</div>" +
				"<textarea id='replytext'></textarea>" +
				"<div class='controls'>" +
					"<input id='replyfield_submit' type='button' value='reply'/>" +
					"<input id='replyfield_cancel' type='button' value='cancel'/>" +
				"</div>" +
			"</div>",

		threadfield:
			"<div id='threadfield'>" +
				"<div class='text'>post a new thread</div>" +
				"<textarea id='threadtext'></textarea>" +
				"<div class='controls'>" +
					"<input id='threadfield_submit' type='button' value='post'/>" +
				"</div>" +
			"</div>",

		omitted:
			"<div class='omitted'><span><%= omitted %> replies hidden!</span></div>",

		userpanel:
			"<div id='errorHolder'></div>" +
			"<div id='userHolder'></div>",

		userpanel_user:
			"<div class='username'><%= name %></div>" +
			"<div class='controls'>" +
				"<div class='icon'><img title='validate' class='validateUser' src='img/dummy.png' /></div>" +
				"<div class='icon'><img title='delete' class='deleteUser' src='img/dummy.png' /></div>" +
			"</div>",

		user: {

			topbar_opts:
				"<div class='topbar_text'><span><%= user %></span></div>" +
				"<div title='forum' id='forum' class='icon'><img src='img/dummy.png' /></div>" +
				"<div title='options' id='changepw' class='icon'><img src='img/dummy.png' /></div>" +
				"<div title='logout' id='logout' class='icon'><img src='img/dummy.png' /></div>",
				

			thread_opts: 
				"",

			reply_opts:
				""
		},

		admin: {
			
			topbar_opts:
				"<div class='topbar_text'><span><%= user %></span></div>" +
				"<div title='forum' id='forum' class='icon'><img src='img/dummy.png' /></div>" +
				"<div title='userpanel' id='userpanel' class='icon'><img src='img/dummy.png' /></div>" +
				"<div title='options' id='options' class='icon'><img src='img/dummy.png' /></div>" +
				"<div title='logout' id='logout' class='icon'><img src='img/dummy.png' /></div>",
				
			thread_opts:
				"<div class='icon'><img title='delete thread' class='delete_thread' src='img/dummy.png' /></div>",

			reply_opts:
				"<div class='icon'><img title='delete reply' class='delete_reply' src='img/dummy.png' /></div>",
		}
	}
}