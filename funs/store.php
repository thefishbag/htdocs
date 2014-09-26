 <?php 
	include_once  $_SERVER['DOCUMENT_ROOT'] . "/funs/include/kanmenren.php";
?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="utf-8" >
	<link rel="stylesheet" type="text/css" href="css/common.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/font-awesome-ie7.min.css">
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
	<link rel="stylesheet" type="text/css" href="css/leftnav.css">
	<script src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>
	<script src="http://libs.baidu.com/jqueryui/1.10.2/jquery-ui.min.js "></script>
	<script type="text/javascript" src="js/leftnav.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/store.js"></script>
	<style type="text/css">
		#storeAll{width: 100%; height: 680px;}
		#storehad
		{
			width: 90%; height: 510px; margin: 5px auto;
		}
		.storeA{width: 128px; height: 158px; float: left; padding:0 10px 0 0; cursor: pointer;}
		.storeApic{width: 128px; height: 128px; background-image: url("css/images/home.png");}
		.storeAname{display: block; width: 128px; height: 30px; font-size: 12px; color: #666;}
		.storeAnametxt{display: none; width: 128px; height: 30px; border:1px solid #bbb; line-height: 30px; font-size: 12px; outline: none; color: #666;}
		#storecur{width: 90%; height: 150px;}
		#btnAddStore{display: block; width: 280px; height: 70px; line-height: 70px; font-size: 14px;
		 border:1px solid #ccc; margin: 5px auto; cursor: pointer; letter-spacing: 3px; color: #666666;}
		 #btnAddStore:hover{color: #222;}
		 #storeOpe{width: 100%; height: 240px;}
		 #storeNote{text-align: center; font-size: 14px; font-weight: bold; color: #ff7800; height:70px; line-height: 70px;  }
	</style>

</head>
<body>

	<?php include_once $_SERVER['DOCUMENT_ROOT'] . '/funs/leftNav.php';?>
	<div id="pagediv" page="store"></div>
	<div id="storeAll">
		<div id="storehad">
			
			<?php
				include_once $_SERVER['DOCUMENT_ROOT'] . '/funs/include/getstores.php';
			?>

		</div>
		<div id="storecur">
			<div id="storeNote">注意：店铺一旦被授权将绑定至本帐号，无法删除！</div>
			<a href="<?php echo createSignLink($APPKEY,$APPSECRET,$REDIRECT_URI);?>" id="btnAddStore">添加店铺</a>

		</div>
	</div>
	
</body>
</html>
