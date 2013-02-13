<?php
	
	class SessionHandler {

		private static $instance;

		private function __construct() {}

		public static function getInstance() {

			// avoid multiple instances, remain singleton
			if(!self::$instance)
				self::$instance = new SessionHandler();
			return self::$instance;
		}

		public function getSession() {

			// start / resume a session
			if(!isset($_SESSION)) session_start();

			// check for session
			if(isset($_SESSION["NAME"])) {
				$uh = UserHandler::getInstance();
				$usr = $uh->getUser("name", $_SESSION["NAME"]);

				// user doesn't exist
				if(!$usr) {
					session_destroy();
					return "User does not exist!";
				}

				// user is not valid
				if(!$usr->valid) {
					session_destroy();
					return "User is not valid.";
				}

				return json_encode(array( "id" => $usr->id, "name" => $usr->name, "admin" => $usr->admin ));
			}

			return "Session doesn't exist.";
		}

		public function sessionExists() {

			// start / resume a session
			if(!isset($_SESSION)) session_start();

			// check for session
			if(isset($_SESSION["NAME"])) {
				$uh = UserHandler::getInstance();
				$usr = $uh->getUser("name", $_SESSION["NAME"]);

				// user doesn't exist
				if(!$usr) {
					session_destroy();
					return false;
				}

				// user is not valid
				if(!$usr->valid) {
					session_destroy();
					return false;
				}

				return true;
			}

			return false;
		}

		public function isAdmin() {
			
			// start / resume a session
			if(!isset($_SESSION)) session_start();
				
			// get our user
			$uh = UserHandler::getInstance();
			$usr = $uh->getUser("name", $_SESSION["NAME"]);

			if(!$usr) {
				session_destroy();
				return false;
			}

			if(!$usr->valid) {
				session_destroy();
				return false;
			}

			if(!$usr->admin) 
				return false;
			else return true;
		}

		public function isUser($id) {

			// start / resume a session
			if(!isset($_SESSION)) session_start();

			// get our user
			$uh = UserHandler::getInstance();
			$usr = $uh->getUser("id", $id);

			// bail out if user not found
			if(!$usr) {
				session_destroy();
				return false;
			}

			// check that sessionName corresponds with sent id
			if($usr->name != $_SESSION["NAME"]) {
				session_destroy();
				return false;
			}
			else return true;
		}

		public function getHash() {

			// start / resume a session 
			if(!isset($_SESSION)) session_start();

			// hash a random number & store it
			$_SESSION["HASH"] = hash("sha256", mt_rand());
			return $_SESSION["HASH"];
		}

		public function login($user) {

			// start / resume a session
			if(!isset($_SESSION)) session_start();

			// get userhandler instance & get the user
			$uh  = UserHandler::getInstance();
			$usr = $uh->getUser("name", $user["name"]);
			
			// if an user does not exist with such name
			if(!$usr) {
				session_destroy();
				return "User not found!";
			}

			// user is not valid
			if(!$usr->valid) {
				session_destroy();
				return "User is not valid.";
			}
				
			// if passwords don't match
			$dbpass = hash("sha256", $usr->password . $_SESSION["HASH"]);
			if($dbpass != $user["pass"]) {
				session_destroy();
				return "Invalid password!";
			}

			// let's save our username to session
			$_SESSION["NAME"] = $usr->name;

			// ok, let's make a nice json to return
			return json_encode(array( "id" => $usr->id, "name" => $usr->name, "admin" => $usr->admin ));
		}

		public function logout() {

			// resume our session
			if(!isset($_SESSION)) session_start();

			// unset our session variables
			$_SESSION = array();

			// destroy our session
			session_unset();
			session_destroy();
		}

		public function register($user) {

			// get userhandler instance
			$uh  = UserHandler::getInstance();
			
			// check that the user does not already exist & is valid
			if(($err = $uh->isValidUser($user)) != true) return $err;

			// add the user to database
			if($uh->addUser($user))
				return "Registration complete, you will be able to login after your account has been validated.";
			else return "Registration failed, try again later.";
		}
	}
?>