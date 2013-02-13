<?php

	class UserHandler {
		
		private static $instance;

		private function __construct() {
			
			// set up a connection with the database
			R::setup("mysql:host=localhost;dbname=franknbe_franknbeans", "franknbe_admin", "H3V0N3N0N3LUkk4");
		}

		public static function getInstance() {

			// avoid multiple instances, remain singleton
			if(!self::$instance)
				self::$instance = new UserHandler();
			return self::$instance;
		}

		public function getUser($identifier, $id) {

			// return the user or false if one does not exist by that name
			$usr = R::findOne("user", " $identifier LIKE BINARY ?", array($id));
			return ($usr == NULL) ? false : $usr;
		}

		public function getUsers() {

			$users = R::findAll("user", " ORDER BY name DESC");
			
			$userArr = array();

			foreach($users as $user) {

				// nay for admins
				if($user->admin)
					continue;

				// yay otherwise
				$userArr[] = array( 
					"id"    => $user->id,
					"name"  => $user->name,
					"valid" => $user->valid
				);
			}

			return $userArr;
		}

		public function addUser($user) {
			
			// get a bean from redbean
			$usr = R::dispense("user");

			// set unique-columns & typecasts
			$usr->setMeta("buildcommand.unique", array(array("name")));
			
			// set attributes
			$usr->name  	= $user["name"];
			$usr->password 	= $user["pass"];
			$usr->admin     = 0;
			$usr->valid     = 0;
			
			// store our user
			try {
				R::store($usr);
				return true;
			}
			catch(Exception $e) {
				return false;
			}
		}

		public function isValidUser($user) {
			
			// validate name & email
			if(strlen($user["name"]) < 4 || strlen($user["name"]) > 24)
				return "Your name must be between 4 and 24 characters long.";

			// find out if there is an user with that name 
			$usr = R::findOne("user", " name = ?", array($user["name"]));
			if($usr != NULL) 
				return "User with that name already exists.";
			
			// user is valid
			return true;
		}
	}
?>