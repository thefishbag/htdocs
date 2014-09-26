<?php
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_core.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_mysql.php";
	if(!isset($_SESSION)){
	    session_start();
	}
	$flag = isset($_POST["flag"])?$_POST["flag"]:"";

	$jjcode = isset($_POST["jjcode"])?$_POST["jjcode"]:"";
	$newStoreName = isset($_POST["newStoreName"])?$_POST["newStoreName"]:"";
	$storeID = isset($_POST["storeID"])?$_POST["storeID"]:"";
	

	if ($flag == "setjjcodetosession" && $jjcode != "") {
		$_SESSION["jjcode"] = $jjcode;
		die();
	}
	if ($flag == "getjjcodebysession") {
		$tmpjj = isset($_SESSION["jjcode"])?$_SESSION["jjcode"]:"";
		if ($tmpjj == "") {
			echo "no";
		}else{
			echo $tmpjj;
		}
		die();
	}
	if ($flag == "chagestorename" && $newStoreName != "" && $storeID != "") {
		$db = new ezSQL_mysql();
		$res = $db->query("update alistores set alistorename = '" . $newStoreName . "' where 1=1 and alistoreid = " . $storeID );
		if ($res) {
			echo "ok";
		}else{
			echo "fail";
		}
		die();
	}
	
?> 