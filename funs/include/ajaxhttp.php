<?php
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/const.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/common.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_core.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_mysql.php";
	if(!isset($_SESSION)){
	    session_start();
	}


	$ajaxuserid = isset($_SESSION["aliuserid"])?$_SESSION["aliuserid"]:"";
	$ajaxuseremail = isset($_SESSION["aliemail"])?$_SESSION["aliemail"]:"";
	$machineCode = isset($_SESSION["jjcode"])?$_SESSION["jjcode"]:"";
	

	if ($ajaxuserid == "") {
		echo "nologin";
		die();
	}

	//get key
	$db = new ezSQL_mysql();

	$appkey = $APPKEY;
	$appSecret = $APPSECRET;
	$redirect_uri = $REDIRECT_URI;
	$aliappkey = $ALIAPPKEY;
	$aliappSecret = $ALIAPPSECRET;
	$aliredirect_uri = $ALIREDIRECT_URI;
	if ($appkey == "" || $appSecret == "" || $redirect_uri == "" || $aliappkey == "" || $aliappSecret =="" || $aliredirect_uri == "") {
		echo "fail:Wrong key!";
		die();
	}

	//get post
	$flag = isset($_POST["flag"])?$_POST["flag"]:"";
	$aliproid = isset($_POST["aliproid"])?$_POST["aliproid"]:"";
	$aliowner = isset($_POST["aliowner"])?$_POST["aliowner"]:"";
	$storeName = isset($_POST["storeName"])?$_POST["storeName"]:"";
	$aliCateID = isset($_POST["aliCateID"])?$_POST["aliCateID"]:"";
	$aeCateID = isset($_POST["aeCateID"])?$_POST["aeCateID"]:"";
	$parentCateID = isset($_POST["parentCateID"])?$_POST["parentCateID"]:"";

	if ($flag == "" || $machineCode == "") {
		echo "fail:Error arguments!";
		die();
	}
	//check machine code
	$jqRes = $db->get_row("select alilastjq from aliuserinfo");
	if (!$jqRes) {
		echo "fail:Error machine code!";
		die();
	}
	$jqCode = isset($jqRes->alilastjq)?$jqRes->alilastjq:"";
	if ($jqCode != $machineCode) {
		echo "fail:Error machine code!";
		die();
	}

	if ($flag == "get1688product" && $aliproid != "") {
		
		$fields = "offerId,detailsUrl,type,postCategryId,memberId,subject,details,qualityLevel,imageList,productFeatureList,amount,amountOnSale,retailPrice,unitPrice,productUnitWeight,priceRanges,skuArray,offerStatus";
		$arrCode = array(
			'offerId' => $aliproid,
			'returnFields' => $fields
		);
		$apiInfo = "param2/1/cn.alibaba.open/offer.get/" . $aliappkey;
		$url = "http://gw.open.1688.com/openapi/param2/1/cn.alibaba.open/offer.get/" . $aliappkey;
		$url .= '?offerId=' . $aliproid . '&returnFields=' . $fields; 
		$url .= "&_aop_signature=" . getAliSign($aliappSecret,$arrCode,$apiInfo);
		$result = httpgo($url,"" );

		/*$file1 = $_SERVER['DOCUMENT_ROOT'] . "/funs/tmp.txt";
		$fp = fopen($file1, 'w');
		fwrite($fp, "$result");
		fclose($fp);*/
		
		
		$jsonResult= $result; 
		echo $result;
		die();
	}

	
	//获取【添加店铺】时候整行的店铺html
	if ($flag == "createstorehtml" && $aliowner != "" && $storeName != "") {
		$prohtml = "<li promiseid=''>---</li>";
		$grouphtml = "<li groupid=''>---</li>";
		$shiphtml = "<li shipid=''>---</li>";
		$modulhtml = "";
		if (strlen($storeName) > 10) {
			$storeName = substr($storeName, 0,8) . " ...";
		}
		foreach ($_SESSION["stores"][$aliowner]["promises"]->templateList as $promise) {
			$prohtml .= '<li promiseid="' . $promise->id . '">' . $promise->name . '</li>';
		}

		foreach ($_SESSION["stores"][$aliowner]["groups"]->target as $group) {
			if (!isset($group->childGroup)) {
				$grouphtml  .= '<li groupid="' . $group->groupId .'">' . $group->groupName . '</li>';
			}else{
				foreach ($group->childGroup as $childg) {
					$grouphtml  .= '<li groupid="' . $childg->groupId .'">' . $childg->groupName . '</li>';
				}
			}
			
		}

		foreach ($_SESSION["stores"][$aliowner]["shipways"]->aeopFreightTemplateDTOList as $shipway) {
			$shiphtml  .= '<li isdefault="' . $shipway->default . '" shipid="' . $shipway->templateId .'">' . $shipway->templateName . '</li>';
		}
		foreach ($_SESSION["stores"][$aliowner]["moduls"]->aeopDetailModuleList as $modul) {
			$modulhtml  .= '<li  modulid="' . $modul->id .'">' . $modul->name . '</li>';
		}
		$html ='<li storeowner="' . $aliowner . '" acesstoken="' . getToken($aliowner) . '" shipid="" promiseid="" groupid="" storeName="' . $storeName . '" modulid="" id="li' . $aliowner . '" class="storeli">';
		$html .='	<span class="blockspan icospan"><i class="fa fa-home ssmaini"></i></span>';
		$html .='	<span class="blockspan namespan">' . $storeName . '</span>';
		$html .='	<span class="blockspan servicespan">';
		$html .='		<div class="myddl">';
		$html .=' 			<h3>服务模板</h3>';
		$html .=' 			<ul>';
		$html .=  $prohtml;
		$html .='			</ul></div></span>';
		$html .=' 	<span class="blockspan groupspan">';
		$html .=' 		<div class="myddl">';
		$html .=' 			<h3>商品分组</h3><ul>';
		$html .=  $grouphtml;
		$html .='			</ul></div></span>';
		$html .=' 	<span class="blockspan shipspan">';
		$html .=' 		<div class="myddl">';
		$html .=' 			<h3>运费模板</h3><ul>';
		$html .=  $shiphtml;
		$html .='			</ul></div></span>';
		$html .=' 	<span class="blockspan modelspan">';
		$html .=' 		<ul class="mulS" id="Models" modulids="">';
		$html .=' 			<h3>选择产品模块</h3><ul>';
		$html .=  $modulhtml;
		$html .='			</ul></ul></span>';
		$html .='</li>';
		echo $html;

	}
	

	//根据1688类别id获得对应的ae类别id
	if ($flag == "getAECateByAliCate" && $aliCateID != "") {
		$sql = "select aecatid from alicatr where alicatid = " . $aliCateID;
		if($res = $db->get_var($sql)){
			echo $res;
			die();
		}else{
			echo "no";
			die();
		}

	}

	

	//根据ae的类别id获取该类别的信息
	if ($flag == "getAECateinfo" && $aeCateID != "") {
		$anytoken = getToken();
		$url = "http://gw.api.alibaba.com:80/openapi/param2/1/aliexpress.open/api.getPostCategoryById/" .$appkey . "?access_token=" . $anytoken .  "&cateId=" . $aeCateID;
		$res = httpgo($url,"");
		echo  $res;
		die();
	}

	//获得指定目录下的所有子目录
	if ($flag == "getSubCates" && $parentCateID != "") {
		$anytoken = getToken();
		$url = "http://gw.api.alibaba.com:80/openapi/param2/1/aliexpress.open/api.getChildrenPostCategoryById/" . $appkey . "?access_token=" . $anytoken .  "&cateId=" . $parentCateID;
		$res = httpgo($url,"");
		echo  $res;
		die();
	}

	//获得指定AE类目所需要的属性信息
	if ($flag == "getAttrsOfCate" && $aeCateID != "") {
		$anytoken = getToken();

		$url = "http://gw.api.alibaba.com:80/openapi/param2/1/aliexpress.open/api.getAttributesResultByCateId/$appkey?access_token=$anytoken&cateId=" . $aeCateID;
		$res = httpgo($url,"");

		// $file1 = 'newfile.txt';
		// $fp = fopen($file1, 'w');
		// fwrite($fp, $res);
		// fclose($fp);


		echo  $res;
		die();
	}

	//从SESSION中获取所有属性对应关系
	if ($flag == "getRelsSetting") {
		echo json_encode($_SESSION["rels"]);
		die();
	}
	//获得1688的某个类别的信息
	if ($flag == "getAliCateInfo" && $aliCateID != "") {
		$url = "http://gw.open.1688.com/openapi/param2/1/cn.alibaba.open/offerPostFeatures.get/$aliappkey?categoryID=$aliCateID";
		$res = httpgo($url,"");
		
		echo  $res;
		die();
	}

	if($flag == "getAppInfo"){

		$res = '{"appkey":"' . $APPKEY . '",appSecret:"' . $APPSECRET . '",url:"' . $REDIRECT_URI . '"}';
		echo $res;
		die();
	}
	function getAliSign($appSecret,$pars,$apiInfo){
	    
	    $sign_str = "";
	    
	    $fpars = $pars;
	    ksort($fpars);
	    foreach ($fpars as $key=>$val)
	        $sign_str .= $key . $val;
		$sign_str = $apiInfo . $sign_str;
	    $code_sign = strtoupper(bin2hex(hash_hmac("sha1", $sign_str, $appSecret, true)));
	    return $code_sign;
	}
	function httpgo($url,$pars=""){

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1 );
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $pars);
   
        $data = curl_exec($ch);
 

        if ($data == false) {
            curl_close($ch);
        }
        @curl_close($ch);
        return $data;
	}

	function refreshAllToken(){
		
	}
?>