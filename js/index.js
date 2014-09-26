$(function(){
	$(".menuA").click(function(){
		showA($(this),500,"all");
	});
	$(".menuA").hover(function(){
		if ($(this).attr("flag") == "cur") {
			return;
		}
		$(this).css({color: "#13afeb"});
	},function(){
		$(this).css({color: ""});
	});
	$(window).scroll(function(){
		if (scrolling) {	return;}
		var curTop = $(window).scrollTop() + $(".navbar").height();
		var listitem = $("#listitem"); 
		var listitemTop = listitem.offset().top ;

		var caiji = $("#caiji");
		var caijiTop = caiji.offset().top;

		var piliang = $("#piliang");
		var piliangTop = piliang.offset().top ;

		var quehuo = $("#quehuo");
		var quehuoTop = quehuo.offset().top ;

		var yingxiao = $("#yingxiao");
		var yingxiaoTop = yingxiao.offset().top ;

		var order = $("#order");
		var orderTop = order.offset().top ;

		var kuozhan = $("#kuozhan");
		var kuozhanTop = kuozhan.offset().top ;

		var download = $("#download");
		var downloadTop = download.offset().top ;

		if (curTop >= downloadTop ) {
			showA($("#t" +download.attr("id")),0,"scroll");
			return;
		}

		if (curTop >= kuozhanTop ) {
			showA($("#t" +kuozhan.attr("id")),0,"scroll");
			return;
		}

		if (curTop >= orderTop ) {
			showA($("#t" +order.attr("id")),0,"scroll");
			return;
		}

		if (curTop >= yingxiaoTop ) {
			showA($("#t" +yingxiao.attr("id")),0,"scroll");
			return;
		}

		if (curTop >= quehuoTop ) {
			showA($("#t" +quehuo.attr("id")),0,"scroll");
			return;
		}
		if (curTop >= piliangTop ) {
			showA($("#t" +piliang.attr("id")),0,"scroll");
			return;
		}
		if (curTop >= caijiTop ) {
			showA($("#t" +caiji.attr("id")),0,"scroll");
			return;
		}
		if (curTop >= listitemTop ) {
			showA($("#t" +listitem.attr("id")),0,"scroll");
			return;
		}
		
		
	});
	fixedIt(".navbar");
});
var scrolling = false;
function showA(ele,t,flag){
	if (ele.attr("flag") == "cur") {
		return false;
	}
	$(".menuA").css("color","rgb(119,119,119)");
	ele.css("color","#ffffff");
	$(".menuA").removeClass("curMenuA");
	ele.addClass("curMenuA");

	$(".menuA").removeAttr("flag");
	ele.attr("flag","cur");
	if (flag == "all") {
		var toele = ele.attr("to");
		var toTop = $("#" + toele).offset().top - $("#whiteBg").height();
		scrolling = true;
		$("html,body").animate({"scrollTop":toTop + "px"},t,function(){
			scrolling = false;
		});
	}
	
}
function fixedIt(selector){
	$(window).scroll( function() { 
		if($(window).scrollTop()>=120){//第一行tr相距top的距离为95
			if(getOs() == "MSIE"){
				$(selector).addClass("tr-fixed-ie");	
			} else{
				$(selector).addClass("tr-fixed-ff");
			}
		} else{
			if(getOs() == "MSIE"){
				$(selector).removeClass("tr-fixed-ie");	
			} else{
				$(selector).removeClass("tr-fixed-ff");
			}
		}
	});
}
