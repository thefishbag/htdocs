<?php
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_core.php";
	include_once $_SERVER['DOCUMENT_ROOT'] . "/funs/include/ez_sql_mysql.php";
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
	<link rel="stylesheet" type="text/css" href="funs/css/jquery-ui.min.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/font-awesome-ie7.min.css">
	<script type="text/javascript" src="funs/js/jquery-1.9.2.js"></script>
	<script type="text/javascript" src="funs/js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="funs/js/dropdown.js"></script>
	<script type="text/javascript" src="funs/js/listitem.js"></script>
	<link rel="stylesheet" type="text/css" href="funs/css/common.css">
	<link rel="stylesheet" type="text/css" href="funs/css/dropdown.css">
	<link rel="stylesheet" type="text/css" href="funs/css/listitem.css">

</head>
<body>
	<?php
		$db = new ezSQL_mysql();
		$res = $db->get_row("select * from aliuserinfo");
		echo "$res->aliuserid";
	
	?>
</body>
</html>