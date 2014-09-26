(function($){
	$.fn.mulselect = function(argus){
		
		var defaultArgus = {
			maxSelected:2,
			width:300,
			height:60
		}

		var finalArgus = $.extend(defaultArgus,argus);
		this.each(function(){
			var curele = $(this);
			var ul = $(this).find("ul");
			var h3 = $(this).find("h3");
			var li = $(this).find("li");
			var isOpen = false;
			var title = h3.html();
			li.attr("select","false");
			ul.append('<div>确定选择</div>');
			curele.attr("seletedCount","0");
			var div =ul.find("div");
			curele.css({
				"width":(finalArgus.width - 4) + "px",
				"height":finalArgus.height - 4 + "px",
				"border":"1px solid #1d9e74",
				"cursor":"pointer",
				"position":"relative",
				"display":"inline-block",
				"background-color":"fdfee4",
				"float":"right",
				"color":"#1d9e74"
			});

			var h3PaddingTop = (finalArgus.height - 20) / 2;
			h3.css({
				"width":"100%",
				"display":"inline-block",
				"height":"20px",
				"line-height":"20px",
				"padding":h3PaddingTop + "px 0 " + h3PaddingTop + "px 0",
				"text-align":"center",
				"font-size":"12px",
				"font-weight":"bold"
			});
			li.css({
				"height":"40px",
				"line-height":"40px",
				"font-size":"12px",
				"color":"#222222",
				"padding":"0 0 0 8px",
				"text-align":"center",
				"color":"#1d9e74"
			});
			ul.css({
				"width":(defaultArgus.width - 6) + "px",
				"position":"absolute",
				"background-color":"#ffffff",
				"border":"2px solid #999",
				"padding":"1px",
				"left":"0"
			});
			div.css({
				"height":"20px",
				"width":"90%",
				"margin":"5px auto",
				"border":"1px solid #bbb",
				"line-height":"20px;",
				"padding":"10px 0 10px 0",
				'background-color':"#e6e6e6"
			});
	
			ul.hide();
			ul.sortable();
			li.click(function(){
				var curSel = $(this).attr("select");
				var selectedCount = 0;
				li.each(function(){
					if ($(this).attr("select") == "true") {
						selectedCount++;
					}
				});
				if (curSel == "true") {
					$(this).attr("select","false");
					$(this).css({
						"background-color":"#ffffff",
						"color":"#1d9e74",
						"font-weight":"normal"
					});
				}else{
					if (selectedCount >= finalArgus.maxSelected) {return false;}
					$(this).attr("select","true");
					$(this).css({
						"background-color":"#f39814",
						"color":"#ffffff",
						"font-weight":"bold"
					});
				}
				return false;
			});
			h3.click(function(){
				if (isOpen) {return;}
				ul.show();
				isOpen = true;
				return false;
			});
		
			div.click(function(){
				var modulids = "";
				var selectedTxt = "";
				var selectedCount = 0;
				curele.find("li").each(function(){
					if ($(this).attr("select") == "true") {
						
						selectedTxt += "[" + $(this).html().replace(/(^\s*)|(\s*$)/g, "") + "],";
						modulids += $(this).attr("modulid") + ",";
						selectedCount++;
					}

				});
				if (selectedTxt == "") {
					h3.html(title);
				}else{
					selectedTxt = selectedTxt.substr(0,selectedTxt.length - 1);
					modulids = modulids.substr(0,modulids.length - 1);
					var txtlen = selectedTxt.length;
					selectedTxt = (txtlen > 35)?selectedTxt.substr(0,32) + " ...":selectedTxt;
					h3.html(selectedTxt);
					curele.attr("modulids",modulids);
					
				}
				curele.attr("seletedCount",selectedCount);
				
				ul.hide();
				isOpen = false;
				return false;
			});
		});
	}
})(jQuery);