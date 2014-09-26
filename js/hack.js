
//判断浏览器的脚本，直接修改别人的代码，拿来主义哈哈。
function getOs()
{
   var OsObject = "";
   if(navigator.userAgent.indexOf("MSIE")>0) {
        return "MSIE";
   }
   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
        return "Firefox";
   }
  
}

