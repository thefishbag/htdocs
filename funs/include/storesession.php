<?php
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_core.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_mysql.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/httpope.php";

	$aliuserid = isset($_SESSION["aliuserid"])?$_SESSION["aliuserid"]:"";

	if ($aliuserid == "") {
		die();
	}

	$db = new ezSQL_mysql();

	$stores = $db->get_results("select * from alistores where aliuserid = " . $aliuserid);
	$storesSession = array();
	if (!$stores) {
		
	}else{
		foreach ($stores as $store) {
			$refresh_token = $store->alirefreshcode ;

			$alistorename = $store->alistorename;


			$redirect = urlencode("http://$SERVICE_HOST/funs/callback.php");
			$url = "https://gw.api.alibaba.com/openapi/param2/1/system.oauth2/getToken/$APPKEY";
			$pars = "grant_type=refresh_token&client_id=$APPKEY&client_secret=$APPSECRET&refresh_token=$refresh_token";

			$result = http_request($url,$pars );
			if (!isset($result)) {
				header("Location:http://$SERVICE_HOST/funs/main.php?info=failrefreshtoken");
				die();
			}
			//echo "$result";
			 
		    $jsonResult= json_decode($result);   
		    if (isset($jsonResult->error)) {
		    	header("Location:http://$SERVICE_HOST/funs/main.php?info=wrongrefreshtoken");
				die();
		    }
		    $aliowner=$jsonResult->resource_owner;
		    $accessToken = $jsonResult->access_token;   
		    $aliId = $jsonResult->aliId; 

			
		    

		    $groups = getGroupInfo($accessToken,$APPKEY);
		    $promises = getPromise($accessToken,$APPKEY);
		    $shipways = getShipWay($accessToken,$APPKEY);
		    $moduls = getAEModules($accessToken,$APPKEY);

			


		    if (!$shipways || !$groups || !$promises || !$moduls) {
		    	header("Location:http://$SERVICE_HOST/funs/main.php?info=wrongmodels");
				die();
		    }
		    $storesSession[$aliowner] = array(
		    	'aliowner' => $aliowner,
		    	'accessToken' => $accessToken,
		    	'refresh_token' => $refresh_token,
		    	'groups' => $groups,
		    	'promises' => $promises,
		    	'shipways' => $shipways,
		    	'moduls' => $moduls,
		    	'expiretime' => strtotime("+10 hour"),
		    	'alistorename' => $alistorename
		    );
		    
		}
		$_SESSION["stores"] = $storesSession;
	}
	

	
	function getShipWay($token,$appkey){
		$url = "http://gw.api.alibaba.com:80/openapi/param2/1/aliexpress.open/api.listFreightTemplate/" .$appkey . "?access_token=" . $token;
		$result = http_request($url);

		

		$shipways = json_decode($result);

		if (!isset($shipways) || !isset($shipways->success)) {
			return false;
		}
		return $shipways;
	}
	function getPromise($token,$appkey){
		$url = "http://gw.api.alibaba.com:80/openapi/param2/1/aliexpress.open/api.queryPromiseTemplateById/" .$appkey . "?access_token=" . $token . "&templateId=-1";
		$result = http_request($url);
		$promises = json_decode($result);

		if (!isset($promises) || !isset($promises->templateList)) {
			return false;
		}
		return $promises;
	}
	function getGroupInfo($token,$appkey){
		$url = "http://gw.api.alibaba.com:80/openapi/param2/1/aliexpress.open/api.getProductGroupList/" . $appkey . "?access_token=" . $token;
		$result = http_request($url);

		
		

		$groups = json_decode($result);

		if (!isset($groups) || !isset($groups->timeStamp)) {
			return false;
		}
		return $groups;
	}
	function getAEModules($token,$appkey){
		$url = "http://gw.api.alibaba.com:80/openapi/param2/1/aliexpress.open/api.findAeProductDetailModuleListByQurey/" . $appkey . "?access_token=" . $token . "&moduleStatus=approved&pageIndex=1";
		$result = http_request($url);
		$moduls = json_decode($result);

		if (!isset($moduls) || !isset($moduls->success)) {
			return false;
		}
		return $moduls;
	}

?>