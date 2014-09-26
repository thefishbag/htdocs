<?php
	if(!isset($_SESSION)){
	    session_start();
	}
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_core.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_mysql.php";
	//check machine code if in session
	$userid = isset($_SESSION["aliuserid"])?$_SESSION["aliuserid"]:"";
	$useremail = isset($_SESSION["aliemail"])?$_SESSION["aliemail"]:"";
	if ($userid == "") {
		gohome();
	}

	$kmrjj = isset($_SESSION["jjcode"])?$_SESSION["jjcode"]:"";


	$db = new ezSQL_mysql();
	$res = $db->get_row("SELECT alilastjq FROM aliuserinfo where aliuserid='" . $userid . "'");
	if (!$res) 
	{ 
		gohome();
	}
	if ($kmrjj == "" ||  $kmrjj != $res->alilastjq) {
		gohome("other");
	}

	function gohome($flag=""){
		unset($_SESSION['aliusernickname']);
		unset($_SESSION['aliusertype']);
		unset($_SESSION['aliaccount']);
		unset($_SESSION['aliemail']);
		unset($_SESSION['aliuserid']);
		unset($_SESSION["stores"]);
		
		if ($flag == "other") {
			header("Location:http://121.199.50.236/funs/main.php?info=otherlogin");
		}else{
			header("Location:http://121.199.50.236/funs/main.php?info=needlogin");
		}
		die();
	}
?>