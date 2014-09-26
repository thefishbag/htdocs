<?php
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_core.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_mysql.php";
	$aliuserid = isset($_SESSION["aliuserid"])?$_SESSION["aliuserid"]:"";
	if(!isset($_SESSION)){
	    session_start();
	}
	if ($aliuserid == "") {
		die();
	}

	$db = new ezSQL_mysql();

	$rels = array();

	$catRes = $db->get_results("select * from alicatr");
	$rels["catRels"] = $catRes;

	$attrRes = $db->get_results("select * from aliattrs");
	$rels["attrRels"] = $catRes;

	$valuesRes = $db->get_results("select * from alivaluer");
	$rels["valueRels"] = $valuesRes;

	$skusRes = $db->get_results("select * from aliskurs");
	$rels["skuRels"] = $skusRes;

	$_SESSION["rels"] = $rels;
	
?>