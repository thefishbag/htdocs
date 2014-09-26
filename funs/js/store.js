$(function(){
	$(".storeAname").click(function(){
		$(".storeAnametxt").fadeOut(function(){
			$(this).parent().find(".storeAname").fadeIn();
		});
		$(this).hide(function(){
			$(this).next().fadeIn();
		});
	});

	$(".storeAnametxt").keypress(function(event){
		if(event.keyCode == "13") {
			chageName($(this));
		}
	});

	//update new store name when text box blur.
	$(".storeAnametxt").blur(function(){

		chageName($(this));


	});
});

function chageName(txt){
	var parentele = txt.parent();
	var sp = parentele.find(".storeAname");

	var newName = txt.val();
	var storeid = parentele.attr("alistoreid");

	if (newName == "") { 
		txt.fadeOut(function(){
			sp.fadeIn();
		});
		return;
	}
	$.ajax({
		url:"include/ws.php",
		type:"POST",
		data:{flag:'chagestorename',newStoreName:newName,storeID:storeid},
		success:function(res){

			if (res =="ok") {
		
				sp.html(newName);
			}
			txt.fadeOut(function(){
				sp.fadeIn();
			});

		}
	});
}