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
	<link rel="stylesheet" type="text/css" href="css/dropdown.css">
	<link rel="stylesheet" type="text/css" href="css/Mtext.css">
	<link rel="stylesheet" type="text/css" href="css/listitem.css">
	<script src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>
	<script src="http://libs.baidu.com/jqueryui/1.10.2/jquery-ui.min.js "></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/leftnav.js"></script>
	<script type="text/javascript" src="js/dropdown.js"></script>
	<script type="text/javascript" src="js/Mtext.js"></script>
	<script type="text/javascript" src="js/mulselect.js"></script>
	

	<link href="editor/themes/default/css/umeditor.css" type="text/css" rel="stylesheet">
	<script type="text/javascript" charset="utf-8" src="editor/umeditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="editor/umeditor.min.js"></script>
    <script type="text/javascript" src="editor/lang/zh-cn/zh-cn.js"></script>

    <script type="text/javascript" src="js/listitem.js"></script>
</head>
<body>

	<?php include_once $_SERVER['DOCUMENT_ROOT'] . '/funs/leftNav.php';?>
	<div id="pagediv" page="listitem">
		
	</div>
	
	<div class="proTitle height50" >
		<input maxlength="15" class="ltxt" id="txtAliid" placeholder="1688商品ID" value="37267611976" />
	</div>

	<div id="llAll">
		<div id="llope">
			<div id="llAliInfo">
				<div id="shAliTitle"></div>
				<div id="aliInfoTop">
					<div id="aliMainImg"><img id="curaliimg" src=""></div>
					<div id="aliMainInfo">
						<span id="shAliPrice"></span>
						<span id="shAliWeight"></span>
						<span id="shAliHuohao"></span>
						
					</div>
				</div>
				<div id="aliInfoBottom"></div>
			</div><!-- 1688商品区 end-->
			<div id="dashboard">
			

				<div cname="diaBasic" class="widget wbasic">
					<div class="widget-head">
						<i class="fa fa-fw fa-chevron-right"></i> <strong>基本信息</strong>
					</div>
					<div class="widget-Content">
						<i class="fa fa-bookmark-o"></i>
					</div>
				</div>


				<div cname="diaSku" class="widget wsku">
					<div class="widget-head">
						<i class="fa fa-fw fa-chevron-right"></i> <strong>商品SKU</strong>
					</div>
					<div class="widget-Content">
						<i class="fa fa-th-list"></i>
					</div>
				</div>


				<div cname="diaAttr" class="widget wattr">
					<div class="widget-head">
						<i class="fa fa-fw fa-chevron-right"></i> <strong>商品属性</strong>
					</div>
					<div class="widget-Content">
						<i class="fa fa-table"></i>
					</div>
				</div>



				<div cname="diaDetail" class="widget wdetail">
					<div class="widget-head">
						<i class="fa fa-fw fa-chevron-right"></i> <strong>详细信息</strong>
					</div>
					<div class="widget-Content">
						<i class="fa fa-code"></i>
					</div>
				</div>
			</div><!-- dashboard end -->
		</div>
		<div id="lifooter">
			<div id="curCate"></div>
			<div id="info">
				<div id="btnList">上货</div>
				<div id="btnAbort">放弃</div>
			</div>
		</div>
	</div>	

	<div class="dia" title="添加目标店铺" id="diaStores">
		<ul id="storeList">
			<?php
				include $_SERVER['DOCUMENT_ROOT'] . "/funs/include/getstoreslist.php";
			?>
		</ul>
		<ul id="selectedStore">
			
		</ul>
		<div id="storeNote"></div>
	</div>
	<div class="dia" title="商品基本信息" id="diaBasic">
		<li class="basicli">
			<input w="550" h="40" def="" title="中文标题" class="lliTxt" type="text" id="txtCnTitle" />
			<input w="550" h="40" def="" title="英文标题" class="lliTxt" type="text" id="txtEnTitle" />
		</li>
		<li class="basicli">
			<input w="200" h="40" def="" title="主关键词" class="lliTxt" type="text" id="txtPKey" />
			<input w="450" h="40" def="" title="关键词1" class="lliTxt" type="text" id="txtKey1" />
			<input w="450" h="40" def="" title="关键词2" class="lliTxt" type="text" id="txtKey2" />
		</li>
		<li class="basicli">
			<input w="220" h="40" def="" title="售价$" class="lliTxt" type="text" id="txtPrice" />
			<input w="220" h="40" def="2" title="起批个数" class="lliTxt" type="text" id="txtWstart" />
			<input w="220" h="40" def="5" title="批发折扣%" class="lliTxt" type="text" id="txtWdiscount" />
			<input w="220" h="40" def="1" title="起购量" class="lliTxt" type="text" id="txtMinBuy" />
			<input w="220" h="40" def="12" title="备货期" class="lliTxt" type="text" id="txtShipStart" />
		</li>
	</div>
	<div class="dia" title="设置SKU信息" id="diaSku"></div>
	<div class="dia" title="商品基本信息" id="diaAttr">
		<div id="ddlA"></div>
		<div id="inputA"></div>
		<div id="checkA"></div>
	</div>
	<div class="dia" title="商品详细信息" id="diaDetail">
		<div id="diaDetailTitle">
			<div id="diaDetailNote">请不要向商品细节中加入其他图片，这些图片将不能正常显示！</div>
			<div id="btnRestDetails">恢复初始值</div>
			<div id="btnRelation">关联营销</div>
		</div>
		<script type="text/plain" id="myEditor" >
    	
		</script>

	</div>
	<div class="dia" title="请指定目标商品类目" id="diaCate">
		<div selectedcateid="" selectedcatename="" id="diacall">
			
		</div>
	</div>
	<div class="dia" title="关联营销" id="diaRelation">
		<div id="diaRtitle">
			<div id="diaRddlA">
				<div id="ddlGroup">
					<h3>商品分组</h3>
				
					<ul>
						<li>1111</li>
						<li>1111</li>
						<li>1111</li>
						<li>1111</li>
					</ul>
				</div>
			</div>
			
			
			<input w="550" h="40" def="" title="标题" type="text" id="txtRsearch" />
			<div id="btnDRsearch">搜索</div>
		</div>
		<div id="diaRshow">
			<div id="diaRSpros"></div>
			<div id="diaRSpageInfo">
				<div id="pageSpanA">
					<span class="pageSpan">|<</span>
					<span class="pageSpan"><</span>
					<span class="pageSpan">></span>
					<span class="pageSpan">>|</span>
					<input type="text" id="txtPageIndex" />
					<div id="btnPageSearch">搜索</div>
				</div>
				
			</div>
		</div>
		<div id="diaRres">
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			<div class="diaRresImgA"><img class="diaRresImg" src="css/images/bigfish.png"></div>
			
		</div>
	</div>
		
</body>
</html>
