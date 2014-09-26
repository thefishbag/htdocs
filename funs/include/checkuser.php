<?php
	if(!isset($_SESSION)){
	    session_start();
	}	
	if (!isset($_SESSION["aliemail"]) || $_SESSION["aliemail"] == "") {
		echo '<li><span id="btnlogin">登入</span></li>';
	}else{
		echo '<li>当前用户:' . $_SESSION["aliusernickname"] . '</li>';
		echo '<li>用户类型:' . $_SESSION["aliusertype"] . '</li>';
		echo  '<li>账户余额:' . $_SESSION["aliaccount"] . '</li>';
		echo '<li><a href="#">个人中心</a></li>';
	}
	 
?> 