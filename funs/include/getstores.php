<?php
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_core.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_mysql.php";
	include_once  $_SERVER['DOCUMENT_ROOT'] . "/funs/include/httpope.php";
	$aliid = isset($_SESSION["aliuserid"])?$_SESSION["aliuserid"]:"";


	$db = new ezSQL_mysql();
	$res = $db->get_results("SELECT * FROM alistores where  aliuserid = '" . $aliid . "'");
	if ($res){

		foreach ($res as $store) {

			$html = "";
			$aliowner = $store->aliowner;
			$alirefreshcode = $store->alirefreshcode;
			$storeAname = $store->alistorename;
			$alistoreid = $store->alistoreid;
			$html = $html . '<div class="storeA" alistoreid="'. $alistoreid .'" alirefreshcode="' . $alirefreshcode . '" aliowner="owner" aliuserid="userid" alistorename="storename" aliid="aliid">';
			$html = $html . '	<div class="storeApic"></div>';
			$html = $html . '<span class="storeAname">' . $storeAname . '</span>';
			$html = $html . '<input maxlength="20" class="storeAnametxt" value="'.$storeAname.'"/>';
			$html = $html . '</div>';
			echo $html;
		}
	}
			 

	
	function createSignLink($appKey,$appSecret,$redirect_uri){
		$pars = array(
			'site' => 'aliexpress', 
			'redirect_uri' => $redirect_uri,
			'state' => 'json'
		);
		$res = "http://gw.api.alibaba.com/auth/authorize.htm?client_id=";
		$res = $res.$appKey;
		$res = $res."&site=aliexpress";
		$res = $res."&redirect_uri=".$redirect_uri;
		$res = $res. "&state=json&_aop_signature=" . getAESign($appKey,$appSecret,$pars);
		
		// $fh = fopen("test.txt", "w");
		// fwrite($fh, $res);
		// fclose($fh);

		return $res;
	}
	
?>
