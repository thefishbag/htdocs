<?php
	include_once  $_SERVER['DOCUMENT_ROOT'] . "/funs/include/const.php";
	include_once  $_SERVER['DOCUMENT_ROOT'] . "/funs/include/httpope.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_core.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_mysql.php";
	if(!isset($_SESSION)){
	    session_start();
	}
	$tmpCode = isset($_GET["code"])?$_GET["code"]:"" ;
	$userid = isset($_SESSION["aliuserid"])?$_SESSION["aliuserid"]:"" ;
	if ($userid == "") {
		header("Location:http://$SERVICE_HOST/funs/main.php?info=needlogin");
		die();
	}
	if ($tmpCode != "") {
		$redirect = "urn:ietf:wg:oauth:2.0:oob";

		$url = "https://gw.api.alibaba.com/openapi/http/1/system.oauth2/getToken/$APPKEY";
		$pars = "grant_type=authorization_code&need_refresh_token=true&client_id=$APPKEY&client_secret=$APPSECRET&redirect_uri=$redirect&code=$tmpCode";

		$result = http_request($url,$pars );
		

	    $jsonResult= json_decode($result);    
	    $aliowner=$jsonResult->resource_owner;
	    $accessToken = $jsonResult->access_token;   
	    $refresh_token = $jsonResult->refresh_token;
	    $aliId = $jsonResult->aliId; 
	   	
	   	if (!isset($accessToken) || $accessToken == "") {
	   		header("Location:http://$SERVICE_HOST/funs/store.php?info=failgetaccess");
			die();
	   	}
	   	$db = new ezSQL_mysql();
		$res = $db->get_row("SELECT *  FROM alistores where  aliowner = '" . $aliowner . "'");
	
		if (count($res) > 0){
			if ($res->aliuserid == $userid) {
				$updatesql = "update alistores set alirefreshcode = '".$refresh_token."',alicuracccode='".$accessToken."',aliaccexpire= date_add(now(), interval 9 hour) where  aliowner = '" . $aliowner . "'";
				$updateRes = $db->query($updatesql);
				
				header("Location:http://$SERVICE_HOST/funs/store.php?info=norepeataddstore");
				die();
			}else{
				header("Location:http://$SERVICE_HOST/funs/store.php?info=othersstore");
				die();
			}
			
				
		}else{
			$storeName = $aliowner;
			//获取该账号已经托管的店铺个数
			$SCres = $db->get_var("SELECT count(*) FROM alistores where  aliuserid = '" . $userid . "'");
			if ($SCres < 5) {
				$insertsql = "INSERT INTO `alifishdb`.`alistores` (`alistoreid`, `aliuserid`, `alistorename`, `aliowner`, `alirefreshcode`, `aliid`, `alicuracccode`) VALUES (NULL, '";
				$insertsql .= $userid . "', '" . $storeName . "', '" . $aliowner . "', '" . $refresh_token . "', '" . $aliId . "', '" . $accessToken . "');";
				$addStoreRes = $db->query($insertsql);
				if (!$addStoreRes) {
					header("Location:http://$SERVICE_HOST/funs/store.php?info=erroraddstore");
					die();
				}
				//将当前店铺的信息写入session
				include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/storesession.php";
				
				header("Location:http://$SERVICE_HOST/funs/store.php?info");
				die();
			}else{
				header("Location:http://$SERVICE_HOST/funs/store.php?info=fullstores");
				die();
			}
			
		}


	}

	
?>  