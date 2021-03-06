var publicRels;
var publicPro;
var publicMainImageList;
var publicDetailImageList;
var publicStoreList = new Array();
var publicApp;
var publicUM;
var querying = false;
var storelistinfo;

$(function(){
	makeDia();
	relaInit();
	getRelsSetting();
	
	init();
	$(".lliTxt").Mtext();
	initDelegate();

});
function relaInit(){
	$(document).on("mouseover",".diaResDel",function(){
		$(this).css({"border-color":"#cc0033","background-color":"#f9f9f9"});
	});
	$(document).on("mouseout",".diaResDel",function(){
		$(this).css({"border-color":"","background-color":""});
	});
	$(document).on("click",".diaResDel",function(){
		var eleParent = $(this).parent();
		eleParent.fadeOut(100,function(){
			eleParent.remove();
		});
		
	});
	$("#ddlGroup").dropdown({width:150});
	$("#txtRsearch").Mtext();
	
	
}
function unsetListItem(){

	$(".proTitle").show();
	$("#llAll").hide();
	$("#info").attr("aliproid","");
}
function init(){

	publicUM = UM.getEditor('myEditor',{
        toolbar:[
        'source | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
        'insertorderedlist insertunorderedlist | selectall cleardoc paragraph fontsize']
		});
	$.ajax({
		type:"POST",
		url:"include/ajaxhttp.php",
		data:{flag:'getAppInfo'},
		success:function(res){
			publicApp = eval("(" + res + ")");
		}
	});
}

function giveMe(aliid){
	if (querying) {
		return;
	};
	querying = true;
	$.ajax({
		type:"POST",
		url:"include/ajaxhttp.php",
		data:{'flag':'get1688product','aliproid':aliid},
		success:function(res){
			if (res.substr(0,5) == "fail:") {
				alert("获取商品失败！错误信息：" + res.substr(6));
				unsetListItem();
				return;
			}else{
				if (res.substr(0,13) == '{"error_code"') {
					var obj = eval("("+res+")");
					alert("获取商品失败！错误信息：\r\n" + obj.error_message);
					unsetListItem();
					return;
				}else{
	 				var obj = eval("("+res+")");
	 				if (!obj) {
	 					alert("获取商品失败！请重试。");
	 					unsetListItem();
	 					return;
	 				};
	 				publicPro = obj;
					var showRes = showProductInfo(obj);
					if (!showRes) {
						unsetListItem();
						return;
					}
					$("#info").attr("alicateid",obj.result.toReturn[0]["postCategryId"]);
					
					
					$("#info").attr("aliproid",aliid);
				}
				
			}
			
		},
		complete:function(){
			querying = false;
		}
	});
}


function showProductInfo(obj){
	var result = obj.result;
	var toReturn = result.toReturn[0];
	var subject = toReturn.subject;
	var postCategryId = toReturn.postCategryId;
	var imageList = toReturn.imageList;
	var details = toReturn.details;
	var offerId = toReturn.offerId;



	//标题
	$("#txtCnTitle").val(subject);
	showAliInfo(toReturn);
	var findFlag = false;
	//根据1688商品类别去找对应的express类别
	$.each(publicRels["catRels"],function(){
		if (this.alicatid == postCategryId) {
			getAECateInfo(this.aecatid);
			findFlag = true;
		}
	});
	if (!findFlag) {
		selecteNewCate();
	}

	// 图片

	var showImagesRes = showImages(details,Serialize(imageList),offerId);
	if (!showImagesRes) {return false;}
}
function showAliInfo(toReturn){
	$("#shAliTitle").html(toReturn.subject);
	
	$("#shAliWeight").html("货重:" + toReturn.productUnitWeight+"KG");
	$("#shAliHuohao").html("货号:" + toReturn.memberId);
	$("#shAliPrice").html("单价:" + toReturn.priceRanges[0].price);
}
function showImages(details,imageList,proID){

	var downRes =  window.external.download(details,imageList,proID);

	var allImages = eval("(" + downRes + ")");
	publicMainImageList = allImages.res.mainRes;
	publicDetailImageList = allImages.res.detailRes;

	if (allImages.success == "false" || !allImages.success ||  publicMainImageList.length == 0 || publicDetailImageList.length == 0) {
		alert("图片下载失败");
		unsetListItem();
		return false;
	};

	
	$(".ui-widget-header").css({"background-color":"#de815c","background-image":"none"});
	$(".ui-dialog-title").css("color","#fff");
	$("#diaStores").dialog("open");
}

//如果探测不到类目 ，让用户选择类目
function selecteNewCate(){
	$("#diacall").html("");
	showSubCatesAsDDl("0");
	$("#diacall").attr("selectedcateid","");
	$("#diacall").attr("selectedcatename","");
	$("#diaCate").dialog("open");

}

//将一个类目下的所有子类目显示成一个下拉列表
function showSubCatesAsDDl(parentCateID){

	var obj = getSubCates(parentCateID);
	if (!obj) {
		return;
	}	
	var html = '<div class="myddl ddlcate" id="ddl' + parentCateID + '">';
	html += '<h3>选择类目</h3><ul>';
	html += "<li class='ddlli'>---</li>";
	var aeopPostCategoryList = obj.aeopPostCategoryList;
	$.each(aeopPostCategoryList,function(){
		var showname = (this.isleaf )?this.names.zh:this.names.zh + "   >"
		html += "<li class='ddlli' zhname='" + this.names.en + "'  isleaf='" + this.isleaf + "' cateid='" + this.id + "'>" + showname + "</li>"
	});
	html += "</ul></div>";
	$("#diacall").append(html);
	$("#ddl" + parentCateID).dropdown({width:150});
	$("#ddl" + parentCateID).css({"float":"left"});

}
function getSubCates(parentCateID){
	var obj;
	$.ajax({
		type:"POST",
		url:"include/ajaxhttp.php",
		async:false,
		data:{flag:'getSubCates',parentCateID:parentCateID},
		success:function(res){
			obj = eval("(" + res + ")");
		}
	});
	return obj;
}
function getAECateInfo(cateID){
	$.ajax({
		type:"POST",
		url:"include/ajaxhttp.php",
		data:{flag:'getAECateinfo',aeCateID:cateID},
		success:function(res){
			
			var cate = eval("("+res+")");
			
			var cateid = cate.aeopPostCategoryList[0].id;
			var cateEnName = cate.aeopPostCategoryList[0].names.en;
			var cateZhName = cate.aeopPostCategoryList[0].names.zh;
			$("#curCate").attr("cateid",cateid);
			$("#curCate").html("智能探测类目:" + cateEnName + ",感觉不合适?");

			//获取本类目的所有属性信息
			var attrsRes = getAttrsOfCate(cateid);
			//显示本类目的所有属性信息
			showAttrs(attrsRes);
			showSku(attrsRes);
		}
	});
}


function getstorehtml(owner,sName){
	var html = "";
	$.ajax({
		url:"include/ajaxhttp.php",
		async: false, 
		type:"POST",
		data:{flag:'createstorehtml',aliowner:owner,storeName:sName},
		success:function(res){
			html = res;
		}
	});
	return html;
}



//根据速卖通类目id 获取该类目需要填写的属性集合
function getAttrsOfCate(aeCateID){
	var obj;
	$.ajax({
		url:"include/ajaxhttp.php",
		async: false, 
		type:"POST",
		data:{flag:'getAttrsOfCate',aeCateID:aeCateID},
		success:function(res){
			obj = eval("("+res+")");
		}
	});
	return obj;
}
//将类目属性显示在ui上
function showAttrs(attrsRes){

	if (!attrsRes) {
		alert("获取类目属性信息失败！请重新获取该产品。");
		unsetListItem();
		return;
	}
	var attributes = attrsRes.attributes;
	if (!attributes || attributes.length <= 0) {
		alert("获取类目属性信息失败！请重新获取该产品。");
		unsetListItem();
		return;
	}

	var list_box_html = "";
	var input_html = "";
	var check_box_html = "";

	//过滤掉sku信息
	$.each(attributes,function(){

		if (this.sku == false){
			var iskey = this.keyAttribute;
			var zhname = this.names.zh;
			var enname = this.names.en;
			var values = this.values;
			var aeattrid = this.id;
			if (this.attributeShowTypeValue == "list_box") {

				list_box_html +='<div class="ddlC"><div  aeattrid="' + aeattrid + '" class="myddl" iskey="' + iskey + '"><h3>' + zhname + '</h3><ul><li>---</li>';
				$.each(values,function(){
					var litext = this.names.zh + '{' + this.names.en +'}';
					var fid = this.id;
					list_box_html += '<li class="aevalue" valuename="' + this.names.zh + '" aevalueid="' + fid + '" title="' + litext + '">' +  litext + '</li>';
				});
				
				list_box_html += '</ul></div></div>';
			}
			if (this.attributeShowTypeValue == "input") {
				var xinghao = "";
				var aliid = $("#info").attr("aliproid");
				if (zhname == "型号") {
					xinghao = "ALI" + aliid;

				}
				input_html += '<input w="340" h="40" title="' + zhname + '" class="catetxt" type="text" iskey="' + iskey + '" def="' + xinghao + '" />';

			}
			if (this.attributeShowTypeValue == "check_box") {

				check_box_html += '<div id="checkboxA"><div id="chkatxt">' + zhname + ':</div><div class="chkC">';
				$.each(this.values,function(){
					var chkid = "chk" + this.id;
					var chkname = this.names.zh;
					check_box_html += '<div pressed="false" class="chkattr" id="' + chkid + '" title="' + this.names.en + '" >' + chkname + '</div>';
				});
				
				check_box_html += '</div></div>';
			}

			

		}
		
		
	});

	$("#ddlA").html(list_box_html);
	$("#ddlA").find(".myddl").click(function(){
		$(".ddlC").css("z-index","99");
		$(this).parent().css("z-index","100");
	});
	$("#inputA").html(input_html);
	

	

	//下拉列表
	$("#ddlA").find(".myddl").dropdown({width:330});
	$.each(publicPro.result.toReturn[0].productFeatureList,function(){
		var alivaluekey = this.fid;
		var alivaluename = this.value;
		$.each(publicRels["valueRels"],function(){
			var alivalueid = "";
			var aliattrid = "";
			var aeattrid = "";
			var aevalueid = "";
			
			if (this.alivaluename == alivaluename) {
				alivalueid = this.alivalueid;
				aliattrid = this.aliattrid;
				aeattrid = this.expressattrid;
				aevalueid = this.expressvalueid;

				$("#ddlA").find(".myddl").each(function(){
					var curddl = $(this);
					var curattrid = $(this).attr("aeattrid");
					if (curattrid == aeattrid) {
						$("#ddlA").find(".myddl").find(".aevalue").each(function(){
							var curvalueid = $(this).attr("aevalueid");
							if (curvalueid == aevalueid) {
								var index = $(this).index();
								curddl.setIndex({index:index});
							}
						});
					}
				});
			}
			
		});
	});

	$("#inputA").find(".catetxt").Mtext();
	$("#inputA").find(".catetxt").parent().css("margin","10px 10px 0 0");

	$("#checkA").html(check_box_html);
	$("#checkA").find(".catetxt").Mtext();
	$(".chkattr").click(function(){
		var press = $(this).attr("pressed");
		if (press == "true") {
			$(this).removeClass("pressed");
			$(this).attr("pressed","false");
		}else{
			$(this).addClass("pressed");
			$(this).attr("pressed","true");
		}
	});
}


//显示SKU信息
function showSku(attrsRes){

	if (!attrsRes) {
		alert("获取类目属性信息失败！请重新获取该产品。");
		unsetListItem();
		return;
	}
	var attributes = attrsRes.attributes;
	if (!attributes || attributes.length <= 0) {
		alert("获取类目属性信息失败！请重新获取该产品。");
		unsetListItem();
		return;
	}

	//创建SKU区域
	var htmlArea = "";
	var skuArray = new Array();
	var tmpIndex = 0;
	$.each(attributes,function(){

		
		
		if (this.sku == true){
			skuArray[tmpIndex] = this;
			tmpIndex++;
		}
	});

	if (skuArray.length == 0) {return;}

	var sortArr = skuArray.sort(function(a,b){
		if (a.spec > b.spec) {return 1;}
		if (a.spec < b.spec) {return -1;}
		return 0;
	});
	$.each(sortArr,function(){
		var enName = this.names.en;
		var zhName = this.names.zh;
		var skuid = this.id;
		var skuStyleValue = this.skuStyleValue;
		var showtype = (skuStyleValue == "colour_atla")?"color":"text";
		
		var showName = "-" + zhName + "{" + enName +"}-";
		htmlArea += '<div showType="' + showtype + '" customizedName="' + this.customizedName + '" customizedPic="'+ this.customizedPic + '" id=skuA"' + enName + '" skuid="' + skuid + '" skuenname="' + enName + '" skuzhname="' + zhName + '" class="skuArea"><div class="skuAreaTitle">' + showName + '</div>';
		$.each(this.values,function(){
			var chkid = "chk" + enName + this.id;
			var chkname = (enName == "Size")?this.names.en:this.names.zh;
			var colorClass = (skuStyleValue == "colour_atla")?"color-" + this.id:"";
			var color = (enName == "Color")?this.names.en:"";
			htmlArea += '<div pressed="false" colorClass="' + colorClass + '" color="' + color + '" showType="' + showtype + '" valueid="' + this.id + '" valueenname="' + this.names.en + '" valuezhname="' + this.names.zh + '" class="skuchkC">' + chkname + '</div>';
		});
		htmlArea += "</div>";
		
	});

	htmlArea += '<div id="skuTmp"></div>';
	
	$("#diaSku").html(htmlArea);
	$(".inputToChk").button();
	
	
	$(".skuchkC").click(function(){
		
		var skuArr;

		var press = $(this).attr("pressed");
		if (press == "true") {
			$(this).removeClass("pressed");
			$(this).attr("pressed","false");
		}else{
			$(this).addClass("pressed");
			$(this).attr("pressed","true");
		}

		if (sortArr.length ==2) {
			skuArr = make2SkuArr($(this));
		}
		if (sortArr.length ==1) {
			skuArr = make1SkuArr($(this));
		}
		if (sortArr.length ==3) {
			skuArr = make3SkuArr($(this));
		}
		makeSkuList(skuArr);
	});
}
function makeSkuList(arr){
	var fHtml = "";
	$.each(arr,function(){
		var skuname = this["skuname"];
		var TcusNameHtml = "";
		var cusNameHtml = "";
		var TuploadHtml = "";
		var uploadHtml = "";
		var colCount = 1;
		var customizedName = this["customizedName"];
		var customizedPic = this["customizedPic"];
		var showType = this["showType"];

		if (customizedName == 'true') {
			var lastspan ="";
			if (customizedPic != "true") {
				lastspan="lastCusName";
			}
			TcusNameHtml='<span class="tmpskuspan tmpCusName '+ lastspan + '">自定义名称</span>';
			cusNameHtml='<span class="tmpskuspan tmpCusName '+ lastspan + '"><input maxlength="20" type="text" /></span>';
			colCount++;
		}else{
			TcusNameHtml="";
			cusNameHtml = "";
		}
		
		if (customizedPic == "true") {
			TuploadHtml = '<span class="tmpskuspan tmpUpload lastCusPic">上传文件</span>';
			uploadHtml = '<span class="tmpskuspan tmpUpload lastCusPic"><div class="btnSkuUpload">Upload Image</div></span>';
			colCount++;
		}else{
			TuploadHtml = '';
			uploadHtml = "";
		}

	
		
		var tmpHtml1 = '';
		var linshiCount = 0;
		$.each(this["values"],function(){
			
			if (linshiCount == 0) {
				tmpHtml1 = '<ul id="tmp' + skuname + '" class="tmpul col' + colCount + '"><li class="skutmpli headli"><span class="tmpskuspan tmpSkuname">' + skuname + '</span>' + TcusNameHtml + TuploadHtml + '</li>'
				linshiCount = 1;
			}

			tmpHtml1 += '<li class="skutmpli">';

			if (showType == "color") {
				tmpHtml1 += '<span class="tmpskuspan tmpSkuname"><span class="'+ this["colorClass"] + '" style="display: block;width: 14px; height: 14px; margin: 11px auto; border:1px solid #f9f9f9;"></span></span>';
			}else{
				tmpHtml1 += '<span class="tmpskuspan tmpSkuname"><span class="skunamespan">' +this["valuezhname"] + '</span></span>';
			}
			

			if (customizedName == 'true') {
				tmpHtml1 += cusNameHtml;
			}
			if (customizedPic == "true") {
				tmpHtml1 += uploadHtml;
			}
			tmpHtml1 += '</li>';
		});
		tmpHtml1 += '</ul>';

		fHtml += tmpHtml1;	
	});
	
	$("#skuTmp").html(fHtml);

}



//生成大数组数据

function make1SkuArr(ele){
	var resArr = new Array();
	
	var ele1 = $(".skuArea").eq(0);
	
	var arr1 = new Array();

	arr1["skuname"] = ele1.attr("skuenname");


	arr1["showType"] = ele1.attr("showType");


	arr1["customizedName"] = ele1.attr("customizedName");

	arr1["customizedPic"] = ele1.attr("customizedPic");

	arr1["values"] = new Array();

	var tmpCount = 0;
	var tmpArr = new Array();
	$.each($(".skuArea").eq(0).find(".skuchkC"),function(){
		var isSelected = $(this).attr("pressed");
		
		if (isSelected == "true") {
			tmpArr[tmpCount] = new Array();
			tmpArr[tmpCount]["skuennname"] = $(this).attr("valueenname");
			tmpArr[tmpCount]["valuezhname"] = $(this).attr("valuezhname");
			tmpArr[tmpCount]["valueid"] = $(this).attr("valueid");
			tmpArr[tmpCount]["colorClass"] = $(this).attr("colorClass");
			tmpCount++;
		}
	});
	arr1["values"] = tmpArr;


	resArr[0] = arr1;

	return resArr;
}
function make2SkuArr(ele){
	var resArr = new Array();
	
	var ele1 = $(".skuArea").eq(0);
	var ele2 = $(".skuArea").eq(1);
	
	var arr1 = new Array();
	var arr2 = new Array();

	arr1["skuname"] = ele1.attr("skuenname");
	arr2["skuname"] = ele2.attr("skuenname");


	arr1["showType"] = ele1.attr("showType");
	arr2["showType"] = ele1.attr("showType");


	arr1["customizedName"] = ele1.attr("customizedName");
	arr2["customizedName"] = ele2.attr("customizedName");

	arr1["customizedPic"] = ele1.attr("customizedPic");
	arr2["customizedPic"] = ele2.attr("customizedPic");

	arr1["values"] = new Array();
	arr2["values"] = new Array();

	var tmpCount = 0;
	var tmpArr = new Array();
	$.each($(".skuArea").eq(0).find(".skuchkC"),function(){
		var isSelected = $(this).attr("pressed");
		
		if (isSelected == "true") {
			tmpArr[tmpCount] = new Array();
			tmpArr[tmpCount]["skuennname"] = $(this).attr("valueenname");
			tmpArr[tmpCount]["valuezhname"] = $(this).attr("valuezhname");
			tmpArr[tmpCount]["valueid"] = $(this).attr("valueid");
			tmpArr[tmpCount]["colorClass"] = $(this).attr("colorClass");
			tmpCount++;
		}
	});
	arr1["values"] = tmpArr;

	tmpCount = 0;
	tmpArr = new Array();
	$.each($(".skuArea").eq(1).find(".skuchkC"),function(){
		var isSelected = $(this).attr("pressed");
		if (isSelected == "true") {
			tmpArr[tmpCount] = new Array();
			tmpArr[tmpCount]["skuennname"] = $(this).attr("valueenname");
			tmpArr[tmpCount]["valuezhname"] = $(this).attr("valuezhname");
			tmpArr[tmpCount]["valueid"] = $(this).attr("valueid");
			tmpCount++;
		}
	});
	arr2["values"] = tmpArr;
	resArr[0] = arr1;
	resArr[1] = arr2;

	return resArr;
}
function make3SkuArr(ele){
	var resArr = new Array();
	
	var ele1 = $(".skuArea").eq(0);
	var ele2 = $(".skuArea").eq(1);
	var ele3 = $(".skuArea").eq(2);

	var arr1 = new Array();
	var arr2 = new Array();
	var arr3 = new Array();

	arr1["skuname"] = ele1.attr("skuenname");
	arr2["skuname"] = ele2.attr("skuenname");
	arr3["skuname"] = ele2.attr("skuenname");

	arr1["showType"] = ele1.attr("showType");
	arr2["showType"] = ele1.attr("showType");
	arr3["showType"] = ele1.attr("showType");

	arr1["customizedName"] = ele1.attr("customizedName");
	arr2["customizedName"] = ele2.attr("customizedName");
	arr3["customizedName"] = ele2.attr("customizedName");

	arr1["customizedPic"] = ele1.attr("customizedPic");
	arr2["customizedPic"] = ele2.attr("customizedPic");
	arr3["customizedPic"] = ele2.attr("customizedPic");

	arr1["values"] = new Array();
	arr2["values"] = new Array();
	arr3["values"] = new Array();

	var tmpCount = 0;
	var tmpArr = new Array();
	$.each($(".skuArea").eq(0).find(".skuchkC"),function(){
		var isSelected = $(this).attr("pressed");
		
		if (isSelected == "true") {
			tmpArr[tmpCount] = new Array();
			tmpArr[tmpCount]["skuennname"] = $(this).attr("valueenname");
			tmpArr[tmpCount]["valuezhname"] = $(this).attr("valuezhname");
			tmpArr[tmpCount]["valueid"] = $(this).attr("valueid");
			tmpArr[tmpCount]["colorClass"] = $(this).attr("colorClass");
			tmpCount++;
		}
	});
	arr1["values"] = tmpArr;

	tmpCount = 0;
	tmpArr = new Array();
	$.each($(".skuArea").eq(1).find(".skuchkC"),function(){
		var isSelected = $(this).attr("pressed");
		if (isSelected == "true") {
			tmpArr[tmpCount] = new Array();
			tmpArr[tmpCount]["skuennname"] = $(this).attr("valueenname");
			tmpArr[tmpCount]["valuezhname"] = $(this).attr("valuezhname");
			tmpArr[tmpCount]["valueid"] = $(this).attr("valueid");
			tmpCount++;
		}
	});
	arr2["values"] = tmpArr;

	tmpCount = 0;
	tmpArr = new Array();
	$.each($(".skuArea").eq(2).find(".skuchkC"),function(){
		var isSelected = $(this).attr("pressed");
		if (isSelected == "true") {
			tmpArr[tmpCount] = new Array();
			tmpArr[tmpCount]["skuennname"] = $(this).attr("valueenname");
			tmpArr[tmpCount]["valuezhname"] = $(this).attr("valuezhname");
			tmpArr[tmpCount]["valueid"] = $(this).attr("valueid");
			tmpCount++;
		}
	});
	arr3["values"] = tmpArr;


	resArr[0] = arr1;
	resArr[1] = arr2;
	resArr[2] = arr3;
	return resArr;
}
//从session中获取属性对应关系
function getRelsSetting(){
	$.ajax({
		type:"POST",
		url:"include/ajaxhttp.php",
		async:false,
		data:{'flag':'getRelsSetting'},
		success:function(res){
			obj = eval("(" + res + ")");
			if (!obj) {
				alert("获取属性对应关系失败,请重试！");
				unsetListItem();
				return false;
			}
			if (!obj["catRels"]) {
				alert("获取属性对应关系失败,请重试！");
				unsetListItem();
				return false;
			}
			publicRels = obj;
		}
	});
}

//根据上传好的ae图片来显示详细信息
function showDetails(storeListInfo){
	var html = "";
	$.each(storeListInfo[0].detailRes,function(){
		html += '<p><img src="' + this.aePath + '" /></p>'
		
	});
	publicUM.setContent(html);
}


//弹出选择关联商品界面
function showRelation(){
	$("#diaRelation").dialog("open");
}
var hefaguanbi = false;
function makeDia(){
	$("#diaStores").dialog({
		width:940,
		height:650,
		modal:true,
		beforeClose: function( event, ui ) {
			if (!hefaguanbi) {
				return false;
			}
			
		},
		buttons:{
			"确定":function(){
				var isfail = false;
				if ($(".storeli").length < 1) {
					$("#storeNote").html("请告诉阿里鱼你要将商品上货到哪个店铺！");
					return;
				}
				$.each($(".storeli"),function(){
					var accessCode = $(this).attr("acesstoken");
					var promiseid = $(this).attr("promiseid");
					var groupid = $(this).attr("groupid");
					var shipid = $(this).attr("shipid");
					var modulids = $(this).find(".mulS").attr("modulids");
					var storeName = $(this).attr("storeName");
					var storeowner = $(this).attr("storeowner");
				
				
					if (accessCode == "" || promiseid == "" || groupid == "" || shipid == "" || modulids == "") {
						$("#storeNote").html("请选择完整的店铺信息！");
						isfail = true;
						return;
					}
					publicStoreList[accessCode] = new Object();
					publicStoreList[accessCode].accessCode = accessCode;
					publicStoreList[accessCode].promiseid = promiseid;
					publicStoreList[accessCode].groupid = groupid;
					publicStoreList[accessCode].shipid = shipid;
					publicStoreList[accessCode].modulids = modulids;
					publicStoreList[accessCode].storeName = storeName;
					publicStoreList[accessCode].storeowner = storeowner;
				});
				if (isfail) {
					return;
				}
			

				var strMain = Serialize(publicMainImageList);
				var strDetail = Serialize(publicDetailImageList);
				var strStoreInfo = Serialize(publicStoreList);
				var strpublicApp= Serialize(publicApp);
				strMain = strMain.replace(/\\/g,"\\\\");
				strDetail = strDetail.replace(/\\/g,"\\\\");
				hefaguanbi = true;
				$("#diaStores").dialog("close");
				var downRes =  window.external.uploadImages(strMain,strDetail,publicPro.result.toReturn[0]["offerId"],strStoreInfo,strpublicApp);

				var upRes = eval("(" + downRes + ")");
				if (upRes.success == "false" || upRes.success == false) {
					alert("上传图片失败，错误信息：" + allImages.errorMsg);
					unsetListItem();
					return;
				}

				storeListInfo = upRes.res.finalImages;
				$("#curaliimg").attr("src",storeListInfo[0].mainRes[0].aePath);
				$.each(storeListInfo,function(){
					
				});
				$(".proTitle").hide();
				$("#llAll").show();

				showDetails(storeListInfo);
				

				
			}
		},
		autoOpen:false
	});
	
	$("#diaBasic").dialog({
		width:1200,
		height:640,
		modal:true,
		buttons:{
			"确定":function(){
				$("#diaBasic").dialog("close");
			}
		},
		autoOpen:false
	});

	$("#diaSku").dialog({
		width:1260,
		height:650,
		modal:true,
		buttons:{
			"确定":function(){
				$("#diaSku").dialog("close");
			}
		},
		autoOpen:false
	});

	$("#diaAttr").dialog({
		width:1140,
		height:670,
		modal:true,
		buttons:{
			"确定":function(){
				$("#diaAttr").dialog("close");
			}
		},
		autoOpen:false
	});

	$("#diaRelation").dialog({
		width:1200,
		height:670,
		modal:true,
		buttons:{
			"确定":function(){
				$("#diaRelation").dialog("close");
			}
		},
		autoOpen:false
	});


	$("#diaDetail").dialog({
		width:1140,
		height:660,
		modal:true,
		buttons:{
			"确定":function(){
				$("#diaDetail").dialog("close");
			}
		},
		autoOpen:false
	});

	$("#diaCate").dialog({
		width:1000,
		height:600,
		modal:true,
		buttons:{
			"确定":function(){
				
				var curCateid = $("#diacall").attr("selectedcateid");
				var curCatename =$("#diacall").attr("selectedcatename");
				if (curCateid == "" || curCatename == "") {
					return;
				}
				$("#curCate").attr("cateid",curCateid);
				$("#curCate").html("智能探测类目:" + curCatename + ",感觉不合适?");
				$("#diaCate").dialog("close");
				var alicateid = $("#info").attr("alicateid");
				
				var attrsRes = getAttrsOfCate(curCateid);
				showAttrs(attrsRes);
				showSku(attrsRes);
			},
			"取消":function(){
				$("#diaCate").dialog("close");
			}
		},
		autoOpen:false
	});
	$("#diaCate").parent().css("overflow","visible");
	$(".ui-dialog-titlebar *").css("font-size","12px");
	$(".ui-button-text").css("font-size","12px");
}


function Serialize(obj){
    switch(obj.constructor){
        case Object:
            var str = "{";
            for(var o in obj){
                str += o + ":" + Serialize(obj[o]) +",";
            }
            if(str.substr(str.length-1) == ",")
                str = str.substr(0,str.length -1);
            return str + "}";
            break;
        case Array:            
            var str = "[";
            for(var o in obj){
                str += Serialize(obj[o]) +",";
            }
            if(str.substr(str.length-1) == ",")
                str = str.substr(0,str.length -1);
            return str + "]";
            break;
        case Boolean:
            return "\"" + obj.toString() + "\"";
            break;
        case Date:
            return "\"" + obj.toString() + "\"";
            break;
        case Function:
            break;
        case Number:
            return "\"" + obj.toString() + "\"";
            break; 
        case String:
            return "\"" + obj.toString() + "\"";
            break;    
    }
}
function searchAEprosByTitle(title,groupid,currentPage,owner){

	$.ajax({
		url:"include/ajaxhttp.php",
		data:{flag:'searchAEprosByTitle',aliowner:owner,title:title,currentPage:currentPage},
		type:"POST",
		success:function(res){
			alert(res);
			var obj = eval("(" + res + ")");
			if (!obj) {
				alert("查询失败！");
				return;
			}
			showAEsearchRes(obj);
		}
	});
}

//显示
function showAEsearchRes(obj){
	var productCount = obj.productCount;
	var currentPage = obj.currentPage;
	var totalPage = obj.totalPage;
	var aeopAEProductDisplayDTOList = obj.aeopAEProductDisplayDTOList;
	$("#diaRSpros").html("");
	var html = "";
	$.each(aeopAEProductDisplayDTOList,function(){
		var subject = this.subject;
		var imageURLs = this.imageURLs;
		var productMinPrice = this.productMinPrice;
		var arrImageURL = imageURLs.split(';');
		var productId = this.productId;
		html +='<div productId="' + productId + '" proImg="' + arrImageURL[0] + '" subject="'+subject+'" isSelected="false" class="product_item"><img src="' + arrImageURL[0] + '" /></div>';

	});
	$("#diaRSpros").html(html);
	$(".product_item").hover(function(){
		var isSelected = $(this).attr("isSelected");
		if (isSelected == "true") {
			return;
		}
		$(this).find("img").css("border","1px solid #ff7800");
	},function(){
		var isSelected = $(this).attr("isSelected");
		if (isSelected == "true") {
			return;
		}
		$(this).find("img").css("border","");
	});
}

function clickRelaPro(ele){
	var isSelected = ele.attr("isSelected");
	var productId = ele.attr("productId");
	var proImg = ele.attr("proImg");
	var subject = ele.attr("subject");
	if (isSelected == "true") {
		ele.attr("isSelected","false");
		var resID = "diaRresImgA" + productId;
		$("#" + resID).remove();
	}else{
		var html = '<div id="diaRresImgA' + productId + '" title="' + subject + '" subject="' + subject + '" productId="' + productId + '" proImg="' + proImg + '" class="diaRresImgA"><img class="diaRresImg" src="' + proImg +'"></div>';
		$("#diaRres").append(html);
		$(".diaRresImgA").hover(function(){
			$(this).css({"border":"1px solid #ff7800"});
			$(this).find(".diaResDel").remove();
			$(this).append('<i class="fa fa-times diaResDel"></i>');
		},function(){
			$(this).find(".diaResDel").remove();
			$(this).css({"border":"1px solid #bbbbbb"});
		});
		ele.attr("isSelected","true");
	}
}
function initDelegate(){
	$("#curCate").click(function(){
		selecteNewCate();
	});
	$("#btnAbort").click(function(){
		unsetListItem();
	});
	$(document).on("click",".ddlli",function(){

		var ddl = $(this).parent().parent();
		var ddlIndex = ddl.index();
		var curIndex =$(this).index();
		var isleaf = $(this).attr("isleaf");
		$(".ddlcate:gt(" + ddlIndex + ")").remove();

		var curid = $(this).attr("cateid");
		var curName = $(this).attr("zhname");
		$("#diacall").attr("selectedcateid","");
		$("#diacall").attr("selectedcatename","");
		if (isleaf == "true") {
			$("#diacall").attr("selectedcateid",curid);
			$("#diacall").attr("selectedcatename",curName);
			return;
		}

		
		if (curIndex == 0) {
			
			return;
		}
		
	
		showSubCatesAsDDl(curid);
	});
	$("#txtAliid").keypress(function(event){
		if(event.keyCode == "13") {
			var aliid = $("#txtAliid").val();
			if (aliid == "") {return;}
			giveMe(aliid);
		}
	});

	$(".widget").hover(function(){
		$(this).animate({"top":"0","left":"0"},100);

	},function(){
		$(this).animate({"top":"1px","left":"1px"},100);
	})

	$(".widget").click(function(){

		var cname = $(this).attr("cname");
		var curBKColor = $(this).find(".widget-head").css("background-color");
		$(".ui-widget-header").css({"background-color":curBKColor,"background-image":"none"});
		$(".ui-dialog-title").css("color","#fff");
		$("#" + cname).dialog("open");
	});

	$(".btnstore").hover(function(){
		var selectFlag = $(this).attr("select");
		if (selectFlag == "true") {
			return;
		}
		$(this).find("i").css({"color":"#de815c"});
		$(this).find("span").css({"color":"#de815c"});
	},function(){
		var selectFlag = $(this).attr("select");
		if (selectFlag == "true") {
			return;
		}
		$(this).find("i").css({"color":"#454e59"});
		$(this).find("span").css({"color":"#454e59"});
	});
	$(".btnstore").attr("select","false");
	$(".btnstore").click(function(){
		var select = $(this).attr("select");
		var aliowner = $(this).attr("aliowner");
		if (select == "false") {
			
			var storeName = $(this).attr("alistorename");
			//暂时只允许选择一个店铺
			var curSelectedStoreCount = $("#selectedStore").find(".storeli").length;
			if (curSelectedStoreCount >= 1) {
				$("#storeNote").html("当前版本只支持向一个店铺上传商品.");
				return;
			}
			var lihtml = getstorehtml(aliowner,storeName);
			$("#selectedStore").append(lihtml);

			//将当前商品分组信息写入【详细信息】的下拉列表中
			var curStoreGroupHtml = '<div aliowner="' + aliowner + '" groupid="" id="ddlGroup">';
			curStoreGroupHtml += $("#selectedStore").find(".storeli").find(".groupspan").find(".myddl").html();
			curStoreGroupHtml += '</div>';

			$("#diaRelation").find("#diaRddlA").html(curStoreGroupHtml);
			$("#ddlGroup").dropdown({width:150});

			var curli= $("#li" + aliowner);
			curli.find(".myddl").dropdown({
				width:150
			});

			curli.find(".mulS").mulselect({width:270,height:38});
			curli.css("z-index",9999 - curli.index());
			$(this).attr("select","true");
			$(this).find("i").css({"color":"#de815c"});
			$(this).find("span").css({"color":"#de815c"});
		}else{
			$("#li" + aliowner).remove();
			$(this).attr("select","false");
		}
	});

	//对用户的店铺设置进行数据采集
	$(document).on('click',".servicespan .myddl li",function(){
		var promiseid = $(this).attr("promiseid");
		if (promiseid == "") {return;}
		$(this).parent().parent().parent().parent().attr("promiseid",promiseid);
	});

	$(document).on('click',".groupspan .myddl li",function(){
		var groupid = $(this).attr("groupid");
		if (groupid == "") {return;}
		$(this).parent().parent().parent().parent().attr("groupid",groupid);
	});
	$(document).on('click',"#diaRddlA li",function(){
		var groupid = $(this).attr("groupid");
		if (groupid == "") {return;}
		$("#ddlGroup").attr("groupid",groupid);
	});

	$(document).on('click',".shipspan .myddl li",function(){
		var shipid = $(this).attr("shipid");
		if (shipid == "") {return;}
		$(this).parent().parent().parent().parent().attr("shipid",shipid);
	});

	//重置细节
	$("#btnRestDetails").click(function(){
		showDetails(storeListInfo);
	});

	$("#btnRelation").click(function(){
		showRelation();
	});

	//关联营销中，点击商品分组
	$(document).on("click",$("#ddlGroup li"),function(){
		var groupid = $(this).attr("groupid");
		$("#ddlGroup").attr("groupid",groupid);
	});
	
	$(document).on("click",".product_item",function(){
		//html +='<div productId="' + productId + '" proImg="' + arrImageURL[0] + '" subject="'+subject+'" isSelected="false" class="product_item"><img src="' + arrImageURL[0] + '" /></div>';

		clickRelaPro($(this));

	});


	//搜索商品
	$("#btnDRsearch").click(function(){
		var title = $("#txtRsearch").val();
		var groupid = $("#ddlGroup").attr("groupid");
		var aliowner = $("#ddlGroup").attr("aliowner");
	
		if (title == "" && groupid == "") {
			return;
		}
		searchAEprosByTitle(title,groupid,1,aliowner);
	});
}