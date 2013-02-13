<?php
	
	class ThreadHandler {

		private static $instance;

		private function __construct() {

			// set up a connection with the database
			R::setup("mysql:host=localhost;dbname=franknbe_franknbeans", "franknbe_admin", "H3V0N3N0N3LUkk4");
		}

		public static function getInstance() {

			// avoid multiple instances, remain singleton
			if(!self::$instance)
				self::$instance = new ThreadHandler();
			return self::$instance;
		}

		public function getThreads() {

			$posts = R::findAll("post", " ORDER BY date DESC");

			$threads = array();

			// make threads

			foreach($posts as $post) {
				
				$thread = array(
					"post" => array(
						"id" 		=> $post->id, 
						"user_id" 	=> $post->user->id,
						"user_name" => $post->user->name, 
						"date" 		=> $post->date,
						"content" 	=> $post->content
					),
					"replies" => array()
				);

				$replies = $post->ownReply;

				foreach($replies as $reply) {

					$thread["replies"][] = array(
						"id" 		=> $reply->id,
						"post_id" 	=> $reply->post->id,
						"user_id"	=> $reply->user->id,
						"user_name" => $reply->user->name,
						"date"		=> $reply->date,
						"content"	=> $reply->content
					);
				}
				
				$threads[] = $thread;
			}

			// sort threads

			$sorter = function($threada, $threadb) {

				$datea;
				$dateb;

				if(count($threada["replies"]) > 0) {
					$last_reply = end($threada["replies"]);
					$datea 		= strtotime($last_reply["date"]);
				}
				else $datea = strtotime($threada["post"]["date"]);

				if(count($threadb["replies"]) > 0) {
					$last_reply = end($threadb["replies"]);
					$dateb 		= strtotime($last_reply["date"]);
				}
				else $dateb = strtotime($threadb["post"]["date"]);

				return $dateb - $datea;
			};

			usort($threads, $sorter);

			return $threads;
		}

		public function addThread($threadArr) {

			$post = R::dispense("post");

			$user = R::load("user", (int)$threadArr["post"]["user_id"]);

			if(!$user->id)
				return "User not found!";

			$post->date 	= ($threadArr["post"]["date"] != null) ? $threadArr["post"]["date"] : gmdate("Y-m-d H:m:s");
			$post->content 	= nl2br(strip_tags($threadArr["post"]["content"]));

			$user->ownPost[] = $post;

			R::store($user);
			R::store($post);

			$threadArr = array( "post" => $post->export(), "replies" => array() );
			$threadArr["post"]["user_name"] = $user->name;

			return json_encode($threadArr); 
		}

		public function addReply($replyArr) {

			$reply = R::dispense("reply");

			$user = R::load("user", (int)$replyArr["user_id"]);
			$post = R::load("post", (int)$replyArr["post_id"]);

			if(!$user->id)
				return "User not found!";
			if(!$post->id)
				return "Post not found!";

			$reply->date 	= ($replyArr["date"] != null) ? $replyArr["date"] : gmdate("YYYY-MM-DD HH:mm:ss");
			$reply->content = nl2br(strip_tags($replyArr["content"]));

			$user->ownReply[] = $reply;
			$post->ownReply[] = $reply;

			R::store($user);
			R::store($post);
			R::store($reply);

			$replyArr = $reply->export();
			$replyArr["user_name"] = $user->name;

			return json_encode($replyArr);
		}

		public function deleteThread($id) {

			$post = R::load("post", $id);
			R::trash($post);
			return $id;
		}

		public function deleteReply($id) {

			$reply = R::load("reply", $id);
			R::trash($reply);
			return $id;
		}
	}
?>