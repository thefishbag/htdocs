<?php

	function getToken($owner=""){
		include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/const.php";
		include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/httpope.php";
		if (!isset($_SESSION["stores"])) {
			header("Location:http://$SERVICE_HOST/funs/main.php?info=needlogin");
			die();
		}
		$keys = array_keys($_SESSION["stores"]);
		$me = $keys[0];
		$tokenCode = isset($_SESSION["stores"][$me]["accessToken"])?$_SESSION["stores"][$me]["accessToken"]:"";
		$expireTime = isset($_SESSION["stores"][$me]["expiretime"])?$_SESSION["stores"][$me]["expiretime"]:"";
		$refresh_token = isset($_SESSION["stores"][$me]["refresh_token"])?$_SESSION["stores"][$me]["refresh_token"]:"";

		$returnres = "";
		if ($expireTime - time() < 60) {
			$redirect = urlencode("http://$SERVICE_HOST/funs/callback.php");
			$url = "https://gw.api.alibaba.com/openapi/param2/1/system.oauth2/getToken/$APPKEY";
			$pars = "grant_type=refresh_token&client_id=$APPKEY&client_secret=$APPSECRET&refresh_token=$refresh_token";

			$result = http_request($url,$pars );
			if (!isset($result)) {
				header("Location:http://$SERVICE_HOST/funs/main.php?info=failrefreshtoken");
				die();
			}
			$jsonResult= json_decode($result);   
		    if (isset($jsonResult->error)) {
		    	header("Location:http://$SERVICE_HOST/funs/main.php?info=wrongrefreshtoken");
				die();
		    }
		    $_SESSION["stores"][$me]["accessToken"] = $jsonResult->access_token;
		    $_SESSION["stores"][$me]["expiretime"] = strtotime("+10 hour");
		    $returnres = $jsonResult->access_token;
		}else{
			$returnres = $tokenCode;
		}

		


		return $returnres;
	}


?>