<?php
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_core.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_mysql.php";
	include_once  $_SERVER['DOCUMENT_ROOT'] . "/funs/include/const.php";
	$aliid = isset($_SESSION["aliuserid"])?$_SESSION["aliuserid"]:"";




	$db = new ezSQL_mysql();
	$res = $db->get_results("SELECT * FROM alistores where  aliuserid = '" . $aliid . "'");
	if ($res){
		$html = "";
		foreach ($res as $store) {
			$aliowner = $store->aliowner;
			$alirefreshcode = $store->alirefreshcode;
			$storeAname = $store->alistorename;
			$alistoreid = $store->alistoreid;
			$html = $html . '<li class="btnstore" alistoreid="'. $alistoreid .'" alirefreshcode="' . $alirefreshcode . '" aliowner="' . $aliowner . '" aliuserid="' . $aliid . '" alistorename="' . $storeAname . '"><i class="fa fa-home"></i><span>' . $storeAname  . '</span></li>';
		}
		echo $html;
	}
?>