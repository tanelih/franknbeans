<?php
	require "libs/rb.php";

	class DatabaseHandler {

		private static $instance;

		private function __construct() {
			R::setup("mysql:host=localhost;dbname=franknbeans", "fnbadmin", "fnbadmin");
		}

		public static function getInstance() {
			if(!self::$instance)
				self::$instance = new DatabaseHandler();
			return self::$instance;
		}

		// get ALL the beans specified by params
		public function getBeans() {

		}		

		// finds a SINGLE bean by the params
		public function findBean($needle, $haystack, $where) {
			$bean = R::findOne($needle, $haystack, $where);
			return $bean;
		}

		// finds ALL the beans by the params
		public function findBeans($needle, $haystack, $where) {

		}

		public function storeBean($bean) {
			try {
				R::store($bean);
				return true;
			}
			catch(Exception $e) {
				return false;
			}
		}
	}
?>