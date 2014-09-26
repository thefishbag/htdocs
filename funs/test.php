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
	<script src="js/jquery-1.9.2.js"></script>
	<script src="js/jquery-ui.min.js "></script>
	<script type="text/javascript" src="js/dropdown.js"></script>
	<script type="text/javascript" src="js/mtext.js"></script>

	<link href="editor/themes/default/css/umeditor.css" type="text/css" rel="stylesheet">
	<script type="text/javascript" charset="utf-8" src="editor/umeditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="editor/umeditor.min.js"></script>
    <script type="text/javascript" src="editor/lang/zh-cn/zh-cn.js"></script>


	<script type="text/javascript">
		$(function(){
			$(document).on("mouseover",".diaResDel",function(){
				$(this).css({"border-color":"#cc0033","background-color":"#f9f9f9"});
			});
			$(document).on("mouseout",".diaResDel",function(){
				$(this).css({"border-color":"","background-color":""});
			});
			$(document).on("click",".diaResDel",function(){
				var eleParent = $(this).parent();
				eleParent.fadeOut(500,function(){
					eleParent.remove();
				});
				
			});
			$("#ddlGroup").dropdown({width:150});
			$("#txtRsearch").Mtext();
			$(".diaRresImgA").hover(function(){
				$(this).css({"border":"1px solid #ff7800"});
				$(this).find(".diaResDel").remove();
				$(this).append('<i class="fa fa-times diaResDel"></i>');
			},function(){
				$(this).find(".diaResDel").remove();
				$(this).css({"border":"1px solid #bbbbbb"});
			});
			$("#diaRelation").dialog({
				width:1100,
				height:670
			});
		});
	</script>
</head>
<body>
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