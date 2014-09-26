(function($){
	$.fn.Mtext = function(args){


		this.each(function(){

			$(this).wrap('<span class="MCon"></span>');
			var MTxtContainer = $(this).parent();
			var userWidth = parseInt($(this).attr("w")) - 12;
			var userHeight = $(this).attr("h");
			var userTitle = $(this).attr("title");
			var fullTitle = userTitle;
			userTitle = (userTitle.length> 6)?userTitle.substr(0,6):userTitle;
			var userDefaultTxt = $(this).attr("def");
		
			MTxtContainer.css({
				"width":userWidth+"px",
				"height":userHeight+"px",
				"border":"1px solid #1d9e74",
				"padding":"1px",
				"display":"inline-block",
				"float":"left",
				"margin-right":"8px",
				"text-aligh":"left"
			});

			MTxtContainer.prepend('<span class="Mspan"></span>');
			var MTxtSpan = MTxtContainer.find(".Mspan");
			var spanPaddingTop = (userHeight - 20)/2;
			MTxtSpan.css({
				"display":"inline-block",
				"padding":spanPaddingTop + "px 5px " + spanPaddingTop + "px 0",
				"height": "20px",
				"color":"#999",
				"cursor":"pointer",
				"float":"left",
				"font-size":"12px",
				"width":"70px",
				"test-align":"right"

			});
			MTxtSpan.html(userTitle + ":");
			MTxtSpan.attr("title",fullTitle);

			var txtPaddingTop = (userHeight - 20)/2;
			$(this).val(userDefaultTxt);
			$(this).css({
				"width": (userWidth - 75) + "px",
				"height": "20px",
				"border":"0",
				"padding":txtPaddingTop + "px 0 " + txtPaddingTop + "px 0",
				"out-line":"none",
				"color":"#444444",
				"font-family":"Microsoft Yahei",
				"font-size":"14px",
				"font-weight":"bold",
				"float":"right"

			});
			
		});
	}
})(jQuery);