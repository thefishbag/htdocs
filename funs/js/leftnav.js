$(function () {
	

	$.ajax({
		url:"include/ws.php",
		type:"POST",
		data:{flag:'getjjcodebysession'},
		success:function(res){
			if (res== "no") {
				jj = window.external.mm();

				$.ajax({
					url:"http://121.199.50.236/funs/include/ws.php",
					type:"POST",
					data:{flag:'setjjcodetosession',jjcode:jj}
				});
			}
		}
	});

	$(".lnA").hover(function(){
		$(this).css({"background-color":"#f9f9f9","color":"#000"});
		
	},function(){
		$(this).css({"background-color":"#ffffff","color":"#666"});
	});

	$("#lnControl").click(function(){

		var curLnControl = $(this);
		var flag = curLnControl.attr("openflag");
		if (flag == "true") {
			$("#leftNav").animate({left:"-221px"},500,function(){
				curLnControl.attr("openflag","false");
			});
			

		}else{
			$("#leftNav").animate({left:"0px"},500,function(){
				curLnControl.attr("openflag","true");
			});
			
		}
	});

	
	$("#btnlogin").click(function(){

		$("#leftNav").animate({left:"-221px"},500,function(){
			$("#lnControl").attr("openflag","false");
			$("#lnlogin").fadeIn(500);
		});
	});

	//dialog
	$("#dia").dialog({
		autoOpen: false,
		width:530
	});
	
})