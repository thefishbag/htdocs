$(function(){
	regu();
	
});

function regu(){

	//get current page name.
	var curpage = $("#pagediv").attr("page");

	
	$("#lnlogin").attr("action",curpage + ".php");

	//clear href of A tag for current page.
	$("#ln" + curpage).removeAttr("href");
}