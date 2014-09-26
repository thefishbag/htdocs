<?php
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/const.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_core.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_mysql.php";
	if(!isset($_SESSION)){
	    session_start();
	}

	$anytoken="bb55c6b6-b9d0-45a6-bcca-7d4f7c2d9319";

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
	$aliCategoryid = isset($_POST["aliCategoryid"])?$_POST["aliCategoryid"]:"";
	$aeCategoryName = isset($_POST["aeCategoryName"])?$_POST["aeCategoryName"]:"";
	$aliCategoryName = isset($_POST["aliCategoryName"])?$_POST["aliCategoryName"]:"";

	$aeAttrid = isset($_POST["aeAttrid"])?$_POST["aeAttrid"]:"";
	$aliAttrid = isset($_POST["aliAttrid"])?$_POST["aliAttrid"]:"";
	$aeAttributeName = isset($_POST["aeAttributeName"])?$_POST["aeAttributeName"]:"";
	$aliAttributeName = isset($_POST["aliAttributeName"])?$_POST["aliAttributeName"]:"";

	$aevalueid = isset($_POST["aevalueid"])?$_POST["aevalueid"]:"";
	$alivalueid = isset($_POST["alivalueid"])?$_POST["alivalueid"]:"";
	$aevalueName = isset($_POST["aevalueName"])?$_POST["aevalueName"]:"";
	$alivalueName = isset($_POST["alivalueName"])?$_POST["alivalueName"]:"";

	$parentCateID = isset($_POST["parentCateID"])?$_POST["parentCateID"]:"";

	//获得指定目录下的所有子目录
	if ($flag == "getSubCates" && $parentCateID != "") {
		
		$url = "http://gw.api.alibaba.com:80/openapi/param2/1/aliexpress.open/api.getChildrenPostCategoryById/" . $appkey . "?access_token=" . $anytoken .  "&cateId=" . $parentCateID;
		$res = httpgo($url,"");
		echo  $res;
		die();
	}

	//获得指定1688目录下的所有子目录
	if ($flag == "getaliSubCates" && $parentCateID != "") {
		
		$url = "http://gw.open.1688.com/openapi/param2/1/cn.alibaba.open/category.getCatListByParentId/$aliappkey?parentCategoryID=$parentCateID";
		$res = httpgo($url,"");
		/*$file1 = 'newfile.txt';
		$fp = fopen($file1, 'w');
		fwrite($fp, $res);
		fclose($fp);*/
		echo  $res;
		die();
	}

	//获得指定AE类目所需要的属性信息
	if ($flag == "getAttrsOfCate" && $aeCateID != "") {
	
		$url = "http://gw.api.alibaba.com:80/openapi/param2/1/aliexpress.open/api.getAttributesResultByCateId/$appkey?access_token=$anytoken&cateId=" . $aeCateID;
		$res = httpgo($url,"");
		echo  $res;
		die();
	}


	//获得1688的某个类别的信息
	if ($flag == "getAliCateInfo" && $aliCateID != "") {
		$url = "http://gw.open.1688.com/openapi/param2/1/cn.alibaba.open/offerPostFeatures.get/$aliappkey?categoryID=$aliCateID";
		$res = httpgo($url,"");
		
		echo  $res;
		die();
	}

	//更新类目、属性、值对应关系进入数据库3
	if ($flag == "updateR3" && $aeCateID != "" && $aliCategoryid != "" && $aeAttrid != "" && $aliAttrid != "" && $aevalueid != "" && $alivalueid != "" && $aevalueName != ""  && $alivalueName != "" && $aeCategoryName != "" && $aliCategoryName != "" && $aeAttributeName != "" && $aliAttributeName !== "") {
		//查找有没有ali类目的信息，如果有，更新；如果没有，插入
		$res = $db->get_row("select * from alicatr where alicatid = $aliCategoryid");
		if (!$res) {
			$sql = "insert into alicatr (alicatrid,aecatid,alicatid,alicatname,aecatname) values(null,$aeCateID,$aliCategoryid,'$aliCategoryName','$aeCategoryName')";
		}else{
			$sql = "update alicatr set aecatid=$aeCateID, alicatname = '$aliCategoryName',aecatname = '$aeCategoryName' where alicatid = $aliCategoryid";
		}
		$resF = $db->query($sql);

		//查找属性对应，根据aliAttrid
		$res = $db->get_row("select * from aliattrs where aliattrid = $aliAttrid");
		if (!$res) {
			$sql = "insert into aliattrs (id,expressattrid,aliattrid,aliattrname,expressattrname) values(null,$aeAttrid,$aliAttrid,'$aliAttributeName','$aeAttributeName')";
		}else{
			$sql = "update aliattrs set expressattrid=$aeAttrid,aliattrname='$aliAttributeName',expressattrname='$aeAttributeName' where aliattrid = $aliAttrid";
		}
		$resF = $db->query($sql);

		//查找值对应，根据alivalueid
		$res = $db->get_row("select * from alivaluer where alivalueid = $alivalueid");
		if (!$res) {
			$sql = "insert into alivaluer (id,expressvalueid,alivalueid,expressvaluename,alivaluename,aliattrid,expressattrid) values(null,$aevalueid,$alivalueid,'$aevalueName','$alivalueName',$aliAttrid,$aeAttrid)";
		}else{
			$sql = "update alivaluer set expressvalueid=$aevalueid,alivalueid=$alivalueid,expressvaluename='$aevalueName',alivaluename='$alivalueName',aliattrid=$aliAttrid,expressattrid=$aeAttrid where alivalueid = $alivalueid";
		}
		$resF = $db->query($sql);
		echo "ok";
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