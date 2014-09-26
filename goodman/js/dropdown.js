(function($){
	$.fn.setIndex = function(options){
		var defaults = {
			index:0
		};

		var userArgus = $.extend(defaults,options);

		this.each(function(){
			var curEle = $(this);
			var curli = curEle.find(".dlContent").find("li").eq(userArgus.index);
			var seletedv = curli.html();

			if (userArgus.index == 0) {
				curEle.find(".ddts").html(curEle.find(".dlTitle").html());
			}else{
				curEle.find(".ddts").html(seletedv);
			}

		});
	}
	$.fn.dropdown = function(options){
		var defaults = {
			width:150
		};
		var userArgus = $.extend(defaults,options);
		
		this.each(function(){
			var title = "";
			var curEle = $(this);
			var iskey = curEle.attr("iskey");
			var normalColor = "#1d9e74";
			var activeColor = "#1a7e34";
			if (iskey == "true") {
				normalColor = "#ff7800";
				activeColor = "#cc4500";
			}
			title = $(this).find("h3").html();
			$(this).attr("openFlag","false");
			$(this).addClass("dl");

			$(this).find("h3").html("<span class='ddts'>" + title + "</span>");
			$(this).find(".ddts").css("width", (userArgus.width - 18) + "px");
			$(this).find("h3").addClass("dlTitle");
			if (iskey == "true") {curEle.find(".dlTitle").addClass("keycolor")};
			$(this).find("ul").addClass("dlContent");
			$(this).css("width",userArgus.width + "px");
			$(this).find(".dlTitle").css("width",(userArgus.width -2) + "px")
			$(this).find("h3").click(function(){
				var parentEle = $(this).parent();
				var openFlag = parentEle.find(".dlTitle").attr("openFlag");
				if (openFlag == "true") {
					parentEle.find(".dlContent").hide();
					parentEle.find(".dlTitle").attr("openFlag","false");
				}else{
					
					$(".dl").find(".dlContent").hide();
					$(".dl").find(".dlTitle").attr("openFlag","false");
					

					parentEle.find(".dlContent").show();

					parentEle.find(".dlTitle").attr("openFlag","true");
				}
			});
			$(this).find("h3").hover(function(){

				var ele = $(this).find(".ddts");
				ele.css("color",activeColor);
			},function(){
				var ele = $(this).find(".ddts");
				ele.css("color",normalColor);
			});
			$(this).find("li").click(function(){
				var slectedIndex = $(this).parent().find("li").index($(this));
				var seletedv = $(this).html();
				var parentEle = $(this).parent().parent();
				if (slectedIndex == 0) {
					parentEle.find(".ddts").html(title);
				}else{
					parentEle.find(".ddts").html(seletedv);
				}

				parentEle.find(".dlContent").hide();
				parentEle.find(".dlTitle").attr("openFlag","false");
			});
		});
	}
})(jQuery); 