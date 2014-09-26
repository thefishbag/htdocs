$(function(){
	$("#btnValue").click(function(){
		var aeCateid = $("#aeCateA").attr("selectedcateid");
		var aliCateid = $("#aliCateA").attr("selectedcateid");
		var aeCateName = $("#aliCateA").attr("selectedcatename");
		var aliCateName = $("#aliCateA").attr("selectedcatename");

		var aeAttrid = $("#aeAttrsA").attr("selectedattrid");
		var aliAttrid = $("#aliAttrsA").attr("selectedattrid");
		var aeAttrName = $("#aeAttrsA").attr("selectedattrname");
		var aliAttrName = $("#aliAttrsA").attr("selectedattrname");

		var aevalueid = $("#aeValuesA").attr("selectedvalueid");
		var alivalueid = $("#aliValuesA").attr("selectedvalueid");
		var aevalueName = $("#aeValuesA").attr("selectedvaluename");
		var alivalueName = $("#aliValuesA").attr("selectedvaluename");
		if (
			
			aeCateid == "" ||
			aliCateid == "" ||
			aeCateName == "" ||
			aliCateName == "" ||
			aeAttrid == "" ||
			aliAttrid == "" ||
			aeAttrName == "" ||
			aliAttrName == "" ||
			aevalueid == "" ||
			alivalueid == "" ||
			aevalueName == "" ||
			alivalueName == ""
			) {
			return;
		}
		$.ajax({
			type:"POST",
			url:"include/ajaxhttp.php",
			data:{
				flag:'updateR3',
				aeCateID:aeCateid,
				aliCategoryid:aliCateid,
				aeCategoryName:aeCateName,
				aliCategoryName:aliCateName,
				aeAttrid:aeAttrid,
				aliAttrid:aliAttrid,
				aeAttributeName:aeAttrName,
				aliAttributeName:aliAttrName,
				aevalueid:aevalueid,
				alivalueid:alivalueid,
				aevalueName:aevalueName,
				alivalueName:alivalueName
			},
			success:function(res){
				alert(res);
			}
		})
	});

	$(document).on("click",".myddl",function(){
		var parent = $(this).parent();
		$(".myddl").parent().css({"z-index":"99"});
		parent.css({"z-index":"100"});
	});
	$(document).on("click",".ddlli",function(){

		var ddl = $(this).parent().parent().parent();
		var ddlIndex = ddl.index();
		var curIndex =$(this).index();
		var isleaf = $(this).attr("isleaf");
		$(".ddlC:gt(" + ddlIndex + ")").remove();

		var curid = $(this).attr("cateid");
		var curName = $(this).attr("zhname");
		$("#aeCateA").attr("selectedcateid","");
		$("#aeCateA").attr("selectedcatename","");
		$("#aeAttrsA").html("");
		$("#aeValuesA").html("");
		if (isleaf == "true") {
			$("#aeCateA").attr("selectedcateid",curid);
			$("#aeCateA").attr("selectedcatename",curName);
			$("#aeAttrsA").attr("selectedattrid","");
			$("#aeAttrsA").attr("selectedattrname","");
			$("#aeValuesA").attr("selectedvalueid","");
			$("#aeValuesA").attr("selectedvaluename","");
			
			if (curid != "") {
	
				showAEAttrs(curid);
				
			}
			return;
		}

		
		if (curIndex == 0) {
			
			return;
		}
		
	
		showSubCatesAsDDl(curid);
	});
	showSubCatesAsDDl("0");
	


	$(document).on("click",".aliddlli",function(){

		var ddl = $(this).parent().parent().parent();
		var ddlIndex = ddl.index();
		var curIndex =$(this).index();
		var isleaf = $(this).attr("isleaf");
		$(".aliddlC:gt(" + ddlIndex + ")").remove();

		var curid = $(this).attr("cateid");
		var curName = $(this).attr("zhname");
		$("#aliCateA").attr("selectedcateid","");
		$("#aliCateA").attr("selectedcatename","");
		$("#aliAttrsA").html("");
		$("#aliValuesA").html("");
		if (isleaf == "true") {
			$("#aliCateA").attr("selectedcateid",curid);
			$("#aliCateA").attr("selectedcatename",curName);
			$("#aliAttrsA").attr("selectedattrid","");
			$("#aliAttrsA").attr("selectedattrname","");
			$("#aliValuesA").attr("selectedvalueid","");
			$("#aliValuesA").attr("selectedvaluename","");
			
			if (curid != "") {
	
				showAliAttrs(curid);
			
			}
			return;
			
		}
		
		if (curIndex == 0) {
			
			return;
		}
		
	
		showaliSubCatesAsDDl(curid);
	});
	showaliSubCatesAsDDl("0");
	

});

function showSubCatesAsDDl(parentCateID){

	var obj = getSubCates(parentCateID);

	if (!obj) {
		return;
	}	
	var html = '<div class="ddlC"><div class="myddl ddlcate" id="ddl' + parentCateID + '">';
	html += '<h3>AE Cate</h3><ul>';
	html += "<li cateid='' class='ddlli'>---</li>";
	var aeopPostCategoryList = obj.aeopPostCategoryList;
	$.each(aeopPostCategoryList,function(){
		var showname = (this.isleaf )?this.names.zh:this.names.zh + "   >"
		html += "<li class='ddlli' zhname='" + this.names.en + "'  isleaf='" + this.isleaf + "' cateid='" + this.id + "'>" + showname + "</li>"
	});
	html += "</ul></div></div>";
	$("#aeCateA").append(html);
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


/*ali类目*/
function showaliSubCatesAsDDl(parentCateID){

	var obj = getaliSubCates(parentCateID);

	if (!obj) {
		return;
	}	
	var html = '<div class="aliddlC"><div class="myddl ddlcate" id="aliddl' + parentCateID + '">';
	html += '<h3>1688 Cate</h3><ul>';
	html += "<li cateid='' class='aliddlli'>---</li>";
	var aeopPostCategoryList = obj.result.toReturn;
	$.each(aeopPostCategoryList,function(){
		var showname = (this.leaf )?this.catsName:this.catsName + "   >"
		html += "<li class='aliddlli' zhname='" + this.catsName + "'  isleaf='" + this.leaf + "' cateid='" + this.catsId + "'>" + showname + "</li>"
	});
	html += "</ul></div></div>";
	$("#aliCateA").append(html);
	$("#aliddl" + parentCateID).dropdown({width:150});
	$("#aliddl" + parentCateID).css({"float":"left"});

}

function getaliSubCates(parentCateID){
	var obj;
	$.ajax({
		type:"POST",
		url:"include/ajaxhttp.php",
		async:false,
		data:{flag:'getaliSubCates',parentCateID:parentCateID},
		success:function(res){

			obj = eval("(" + res + ")");
		}
	});
	return obj;
}

function showAliAttrs(aliCateId){
	$.ajax({
		type:"POST",
		url:"include/ajaxhttp.php",
		async:false,
		data:{flag:'getAliCateInfo',aliCateID:aliCateId},
		success:function(res){
		
			obj = eval("(" + res + ")");
			var html = '<div class="aliAttrsddlC"><div class="myddl ddlcate" id="aliAttrsddl' + aliCateId + '">';
			html += '<h3>1688 attr</h3><ul>';
			html += "<li attrid='' class='aliAttrddlli'>---</li>";
			var aeopPostCategoryList = obj.result.toReturn;
			$.each(aeopPostCategoryList,function(){
				if (this.inputType == "1") {
					html += "<li class='aliAttrddlli' attrname='" + this.name + "'  attrid='" + this.fid + "'>" + this.name + "</li>";
				}
				
			});
			html += "</ul></div></div>";
			$("#aliAttrsA").html(html);
			$("#aliAttrsddl" + aliCateId).dropdown({width:550});
			$("#aliAttrsddl" + aliCateId).css({"float":"left"});
			$(".aliAttrddlli").click(function(){
				var attrid = $(this).attr("attrid");
				var attrname = $(this).attr("attrname");
				$("#aliValuesA").attr("selectedvalueid","");
				$("#aliValuesA").attr("selectedvaluename","");
				if (attrid == "") {
					$("#aliValuesA").html("");
				}else{
					$("#aliAttrsA").attr("selectedattrid",attrid);
					$("#aliAttrsA").attr("selectedattrname",attrname);
					showAliValues(attrid,res);
				}
				
			});
		}
	});
}
function showAEAttrs(aeCateId){

	$.ajax({
		type:"POST",
		url:"include/ajaxhttp.php",
		async:false,
		data:{flag:'getAttrsOfCate',aeCateID:aeCateId},
		success:function(res){

			obj = eval("(" + res + ")");
			var html = '<div class="aeAttrsddlC"><div class="myddl ddlcate" id="aeAttrsddl' + aeCateId + '">';
			html += '<h3>AE Attr</h3><ul>';
			html += "<li attrid='' class='aeAttrddlli'>---</li>";
			var aeopPostCategoryList = obj.attributes;
			$.each(aeopPostCategoryList,function(){
				if (this.attributeShowTypeValue == "list_box") {
					html += "<li class='aeAttrddlli' attrname='" + this.names.zh + "' attrid='" + this.id + "'>" + this.names.zh + "</li>";
				}
			});
			html += "</ul></div></div>";
			$("#aeAttrsA").html(html);
			$("#aeAttrsddl" + aeCateId).dropdown({width:550});
			$("#aeAttrsddl" + aeCateId).css({"float":"left"});
			$(".aeAttrddlli").click(function(){
				var attrid = $(this).attr("attrid");
				var attrname = $(this).attr("attrname");
				$("#aeValuesA").attr("selectedvalueid","");
				$("#aeValuesA").attr("selectedvaluename","");
				if (attrid == "") {
					$("#aeValuesA").html("");
				}else{
					$("#aeAttrsA").attr("selectedattrid",attrid);
					$("#aeAttrsA").attr("selectedattrname",attrname);
					showAEvalues(attrid,res);
				}
				
			});
		}
	});
}
function showAEvalues(attrid,res){

	var html = '<div class="aeValuesddlC"><div class="myddl ddlcate" id="aeValuesddl">';
	html += '<h3>AE Values</h3><ul>';
	html += "<li valueid='' class='aeValueddlli'>---</li>";
	var obj = eval("(" + res + ")");
	var aeopPostCategoryList = obj.attributes;
	$.each(aeopPostCategoryList,function(){
		if (this.id == attrid) {
			$.each(this.values,function(){
				html += "<li class='aeValueddlli' valuename='" + this.names.zh + "' valueid='" + this.id + "'>" + this.names.zh + "</li>";
			});
		}
		
		
	});
	html += "</ul></div></div>";
	$("#aeValuesA").html(html);
	$("#aeValuesddl").dropdown({width:550});
	$("#aeValuesddl").css({"float":"left"});
	$(".aeValueddlli").click(function(){
		var valueid = $(this).attr("valueid");
		var valuename = $(this).attr("valuename");
		if (valueid != "") {
			$("#aeValuesA").attr("selectedvalueid",valueid);
			$("#aeValuesA").attr("selectedvaluename",valuename);
		}else{
			$("#aeValuesA").attr("selectedvalueid","");
			$("#aeValuesA").attr("selectedvaluename","");
		}
	});
}
function showAliValues(attrid,res){

	var html = '<div class="aliValuesddlC"><div class="myddl ddlcate" id="aliValuesddl">';
	html += '<h3>AE Values</h3><ul>';
	html += "<li valueid='' class='aliValueddlli'>---</li>";
	var obj = eval("(" + res + ")");
	var aeopPostCategoryList = obj.result.toReturn;
	$.each(aeopPostCategoryList,function(){
		if (this.fid == attrid) {
			$.each(this.featureIdValues,function(){
				html += "<li class='aliValueddlli' valuename='" + this.value + "'  valueid='" + this.vid + "'>" + this.value + "</li>";
			});
		}
		
		
	});
	html += "</ul></div></div>";
	$("#aliValuesA").html(html);
	$("#aliValuesddl").dropdown({width:550});
	$("#aliValuesddl").css({"float":"left"});
	$(".aliValueddlli").click(function(){
		var valueid = $(this).attr("valueid");
		var valuename = $(this).attr("valuename");
		if (valueid != "") {
			$("#aliValuesA").attr("selectedvalueid",valueid);
			$("#aliValuesA").attr("selectedvaluename",valuename);
		}else{
			$("#aliValuesA").attr("selectedvalueid","");
			$("#aliValuesA").attr("selectedvaluename","");
		}
	});
}