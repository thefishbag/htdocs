<?php
	if(!isset($_SESSION)){
	    session_start();
	}
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/const.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/common.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_core.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_mysql.php";



	//login
	$postemail = isset($_POST["email"])?$_POST["email"]:"";
	$postpwd = isset($_POST["pwd"])?$_POST["pwd"]:"";
	$postjj = isset($_SESSION["jjcode"])?$_SESSION["jjcode"]:"";

	if ($postemail != "" && $postpwd != "" && $postjj != ""){
		$db = new ezSQL_mysql();
		$res = $db->get_row("SELECT * FROM aliuserinfo where aliemail='" . $postemail . "' and alimima='" . $postpwd . "'");
		if (count($res) == 1) 
		{ 
			if ($res->alilastjq != $postjj) {
				$js = '<script>';
				$js .='function diait(msg){$("#dia").dialog("open");$("#dia").html(msg);}';
				$js .= 'var showmsg = "检测到其他电脑可能已经登陆了本账号，会导致该电脑下线，一个账号同时只能在一台电脑上使用！";';
				$js .= 'setTimeout("diait(showmsg)",200);</script>';
		

				echo $js;
			}
			
			$_SESSION['aliusernickname']=$res->aliusernickname; 
			$_SESSION['aliusertype']=$res->aliusertype; 
			$_SESSION['aliaccount']=$res->aliaccount; 
			$_SESSION['aliemail']=$res->aliemail; 
			$_SESSION['aliuserid']=$res->aliuserid; 
			$db->query("update aliuserinfo set alilastjq = '" . $postjj . "' where aliuserid=" . $res->aliuserid);
			
			//将所有店铺的accessToken,发货模板,服务模板,产品模块,商品分组写入session
			include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/storesession.php";
			
			//读取各种配置
			include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/readsetting.php";
		}
	}

	//show error
	$showinfo = isset($_GET["info"])?$_GET["info"]:"";
	if ($showinfo != "") {
		$diaMsg = createShowMsg($showinfo);
		$js = '<script>';
		$js .='function diait(msg){$("#dia").dialog("open");$("#dia").html(msg);}';
		$js .= 'var showmsg = "'.$diaMsg.'";';
		$js .= 'setTimeout("diait(showmsg)",200);</script>';
		echo $js;
	}
	
	function createShowMsg($info){
		if ($info == "otherlogin") {
			return "有人在其他电脑登陆本帐号！本电脑将下线，一个账号同时只能在一台电脑上使用！";
		}
		if ($info == "needlogin") {
			return "登录已超时，请重新登录！";
		}
		if ($info == "norepeataddstore") {
			return "该店铺已经被阿里鱼托管，请不要重复添加！";
		}
		if ($info == "failgetaccess") {
			return "获取授权码失败，请重试，如果该错误反复出现，请联系软件供应商获取更多帮助！";
		}
		if ($info == "fullstores") {
			return "每个账号最多托管5个店铺！";
		}
		if ($info == "erroraddstore") {
			return "添加店铺失败，请重试，如果该错误反复出现，请联系软件供应商获取更多帮助！！";
		}
		if ($info == "othersstore") {
			return "该店铺已被其它账号绑定托管，如您已经忘记该账号，请联系软件供应商获取更多帮助！！";
		}
		if ($info == "failrefreshtoken") {
			clearlogin("failrefreshtoken");
			return "获取店铺授权失败，请联系软件供应商获取更多帮助！ ";
			
		}
		if ($info == "wrongrefreshtoken") {
			clearlogin("wrongrefreshtoken");
			return "获取店铺授权失败，错误的Refresh Code，请联系软件供应商获取更多帮助！ ";
			
		}
		if ($info == "efailrefreshtoken") {
			return "获取店铺授权失败，请联系软件供应商获取更多帮助！ ";
			
		}
		if ($info == "ewrongrefreshtoken") {
			return "获取店铺授权失败，错误的Refresh Code，请联系软件供应商获取更多帮助！ ";
			
		}
		if ($info == "wrongmodels") {
			return "获取店铺服务模板、货运模板、商品分组失败！ ";
		}
	}

	function clearlogin($flag){
		session_destroy();
		header("Location:http://$SERVICE_HOST/funs/main.php?info=e" . $flag);
		die();
	}
?>

<div id="leftNav">
		<span id="bibi" jj=""></span>
		<span id="lnControl" openflag="false"><i class="fa fa-cogs"></i></span>
		<span id="lnTitle">功能列表</span>
		<div id="lnFunA">
			<a id="lnsotre" href="store.php" class="lnA" href="store"><i class="fa fa-home"></i>店铺管理</a>
			<a id="lnlistitem" href="listitem.php" class="lnA"><i class="fa fa-bolt"></i>单品上货</a>
			<a id="lncaiji" href="caiji.php" class="lnA"><i class="fa fa-crosshairs"></i>采集数据</a>
			<a id="lnpiliang" href="piliang.php" class="lnA"><i class="fa fa-upload"></i>批量上货</a>
			<a id="lnquehuo" href="quehuo.php" class="lnA"><i class="fa fa-unlink"></i>缺货扫描</a>
			<a id="lnzhitongche" href="zhitongche.php" class="lnA"><i class="fa fa-car"></i>营销管理</a>
			<a id="lncsv" href="csv.php" class="lnA"><i class="fa fa-list-alt"></i>生成CSV</a>
		</div>
		<ul id="lnuser">

			<?php
				include_once  $_SERVER['DOCUMENT_ROOT'] . "/funs/include/checkuser.php";
			?>
			<form id="lnlogin" action="" method="post">
				<li><span>Email:</span><input name="email" maxlength="40" class="lntxt" value="66927785@qq.com" type="text" id="lntxtemail" /></li>
				<li><span>Pass word:</span><input name="pwd" maxlength="20" class="lntxt" value="goodman" type="password" id="lntxtpwd" /></li>
				<li class="highli"><input type="submit" id="lntxtsubmit" value="Login..." /></li>
			</form>
		</ul>
		
		
	
</div>
<div id="dia" title="阿里鱼 - 更懂卖家"></div>