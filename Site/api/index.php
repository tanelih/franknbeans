<?php

	error_reporting(0);

	require 'libs/Slim.php';
	require 'libs/rb.php';
	require 'utils/userhandler.php';
	require 'utils/threadhandler.php';
	require 'utils/sessionhandler.php';

	$app = new Slim();

	// Authentication

	$app->get('/auth/session', function() {
		
		$sh = SessionHandler::getInstance();
		
		echo $sh->getSession();
	});
	
	$app->get('/auth/hash', function() {
		
		$sh = SessionHandler::getInstance();
		
		echo $sh->getHash();
	});

	$app->get('/auth/login', function() {
		
		$sh  = SessionHandler::getInstance();
		$app = Slim::getInstance();

		$usr = $app->request()->get();
		echo $sh->login($usr);
	});

	$app->get('/auth/logout', function() {
		
		$sh = SessionHandler::getInstance();
		
		$sh->logout();
	});

	$app->post('/auth/register', function() {
		
		$app = Slim::getInstance();
		$sh  = SessionHandler::getInstance();
		
		$user = $app->request()->post();
		echo $sh->register($user);
	});

	// Threads, Posts, Replies

	$app->get('/threads', function() {
		
		$th = ThreadHandler::getInstance();
		$sh = SessionHandler::getInstance();
		
		if(!$sh->sessionExists()) {
			echo "You are not logged in.";
			return;
		}
		
		header('content-type: application/json');
		echo json_encode($th->getThreads());
	});

	$app->post('/threads', function() {

		$th  = ThreadHandler::getInstance();
		$sh  = SessionHandler::getInstance();
		$app = Slim::getInstance();

		$threadStr 	= $app->request()->getBody();
		$thread 	= json_decode($threadStr, true);

		if(!$sh->sessionExists() || !$sh->isUser($thread["post"]["user_id"])) {
			echo "Session does not exist or is invalid.";
			return;
		}

		header('content-type: application/json');
		echo $th->addThread($thread);
	});

	$app->delete('/thread/:id', function($id) {
		
		$th = ThreadHandler::getInstance();
		$sh = SessionHandler::getInstance();

		if(!$sh->isAdmin()) {
			echo "You are not an administrator.";
			return;
		}
			
		echo $th->deleteThread($id);
	});

	$app->post('/replies', function() {
		
		$th  = ThreadHandler::getInstance();
		$sh  = SessionHandler::getInstance();
		$app = Slim::getInstance();

		$replyStr 	= $app->request()->getBody();
		$reply 		= json_decode($replyStr, true);

		if(!$sh->sessionExists() || !$sh->isUser($reply["user_id"])) {
			echo "Session does not exist or is invalid.";
			return;
		}

		header('content-type: application/json');
		echo $th->addReply($reply);
	});

	$app->delete('/replies/:id', function($id) {

		$th = ThreadHandler::getInstance();
		$sh = SessionHandler::getInstance();

		if(!$sh->isAdmin()) {
			echo "You are not an administrator.";
			return;
		}
			
		echo $th->deleteReply($id);
	});

	// Users

	$app->get('/users', function() {

		$sh = SessionHandler::getInstance();
		$uh = UserHandler::getInstance();

		if(!$sh->isAdmin()) {
			echo "You are not an administrator.";
			return;
		}

		header('content-type: application/json');
		echo json_encode($uh->getUsers());
	});

	$app->put('/users/:id', function($id) {
		echo $id;
	});

	$app->run();
?>