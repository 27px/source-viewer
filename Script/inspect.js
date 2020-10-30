function _(id)
{
  return document.getElementById(id);
}
function escapeHTML(x)
{
    return x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function getAllStyles(elem)
{
  if (!elem) return [];
  var win = document.defaultView || window, style, styleNode = [];
  if (win.getComputedStyle)
  {
    style = win.getComputedStyle(elem, '');
    for (var i=0; i<style.length; i++)
    {
      styleNode.push( style[i] + ':' + style.getPropertyValue(style[i]) );
    }
  }
  else if (elem.currentStyle)
  {
    style = elem.currentStyle;
    for (var name in style)
    {
      styleNode.push( name + ':' + style[name] );
    }
  }
  else
  {
    style = elem.style;
    for (var i=0; i<style.length; i++)
    {
      styleNode.push( style[i] + ':' + style[style[i]] );
    }
  }
  return styleNode;
}
function showCSS(x)
{
  var s="",n=x.length;
  for(let i=0;i<n;i++)
  {
    s+=x[i]+"<br>";
  }
  return s;
}
function popup(x)
{
  var p="<div style='margin-bottom:10px;font-size:25px;'><span style='color:#00FFFF;'>"+x.tagName.toLowerCase()+"</span><span style='color:#00FF00;'>";
  var t=x.classList,n=t.length;
  for(let i=0;i<n;i++)
  {
    p+="."+t[i];
  }
  if(x.getAttribute("id")!=null)
  p+="</span><span style='color:#FFFF00;'>&#35;"+x.getAttribute("id")+"</span>";
  p+="</div><div style='color:#FFFF00;'>HTML<button id='viewsourcebuttonhtml' onclick='{var txt=document.createElement(\"textarea\");txt.innerHTML=document.getElementById(\"showsourcecodehtmlcode\").innerHTML;navigator.clipboard.writeText(txt.value).then(function(){document.getElementById(\"viewsourcebuttonhtml\").style.backgroundColor=\"#00FF00\";},function(err){document.getElementById(\"viewsourcebuttonhtml\").style.backgroundColor=\"#FF0000\";});}' style='float:right;border:none;outline:none !important;'>Copy</button></div><div style='background-color:#000000;outline:1px solid #808080;margin-top:5px;padding:20px;height:150px;font-family:monospace;font-size:18px;overflow-y:auto;overflow-x:visible;word-wrap:break-word;color:#00FF00;user-select:all;' id='showsourcecodehtmlcode'>"+escapeHTML(x.outerHTML)+"</div><div><div style='color:#FFFF00;margin-top:5px;'>CSS<button style='float:right;border:none;outline:none !important;' id='viewsourcebuttoncss' onclick='{var txt=document.createElement(\"textarea\");txt.innerHTML=document.getElementById(\"showsourcecodecsscode\").innerHTML;navigator.clipboard.writeText(txt.value).then(function(){document.getElementById(\"viewsourcebuttoncss\").style.backgroundColor=\"#00FF00\";},function(err){document.getElementById(\"viewsourcebuttoncss\").style.backgroundColor=\"#FF0000\";});}'>Copy</button></div><div style='user-select:all;background-color:#000000;outline:1px solid #808080;margin-top:5px;padding:20px;height:150px;font-family:monospace;font-size:18px;overflow:auto;color:#00FF00;' id='showsourcecodecsscode'>"+showCSS(getAllStyles(x));+"</div><div></div>";
  _("sourcecodeviewerpopupupshower").innerHTML=p;
  pop=_("sourcecodeviewerpopupupshower").style.display="inline-block";
}
var b=document.body;
var children=document.getElementsByTagName("*"),n=children.length;
b.innerHTML+="<div id='sourceviewertop' style='background-color:rgba(255,255,255,0.7);border-top:2px dotted rgba(0,0,0,0.7);display:none;z-index:9999;position:fixed;top:0px;left:0px;width:100%;height:0px;'></div><div id='sourceviewerbottom' style='background-color:rgba(255,255,255,0.7);border-bottom:2px dotted rgba(0,0,0,0.7);display:none;z-index:9999;position:fixed;top:0px;left:0px;width:100%;height:0px;'></div><div id='sourceviewerleft' style='background-color:rgba(255,255,255,0.7);border-left:2px dotted rgba(0,0,0,0.7);display:none;z-index:9999;position:fixed;top:0px;left:0px;width:0px;height:100%;'></div><div id='sourceviewerright' style='background-color:rgba(255,255,255,0.7);border-right:2px dotted rgba(0,0,0,0.7);display:none;z-index:9999;position:fixed;top:0px;left:0px;width:0px;height:100%;'></div><div id='sourcecodeviewerpopupupshower' style='width:600px;height:500px;border-radius:10px;box-shadow:0px 0px 10px 1px #000000;border:1px solid #000000;z-index:9999;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background-color:#404040;color:#FFFFFF;padding:20px;display:none;overflow:auto;font-family:serif;'></div>";
var topguide=_("sourceviewertop").style;
var leftguide=_("sourceviewerleft").style;
var bottomguide=_("sourceviewerbottom").style;
var rightguide=_("sourceviewerright").style;
var ctrl=0;
b.addEventListener("keyup",function(event){
  if(event.keyCode=="27")
  {
    _("sourceviewertop").style.display="none";
    _("sourceviewerleft").style.display="none";
    _("sourceviewerbottom").style.display="none";
    _("sourceviewerright").style.display="none";
    pop=_("sourcecodeviewerpopupupshower").style.display="none";
  }
});
for(let i=0;i<n;i++)
{
  children[i].addEventListener("mousemove",function(event){
    let cgr=event.target.getBoundingClientRect();
    topguide.top=(cgr.y - 4)+"px";
    leftguide.left=(cgr.x - 4)+"px";
    bottomguide.top=(cgr.y+cgr.height+2)+"px";
    rightguide.left=(cgr.x+cgr.width+2)+"px";
    topguide.display="inline-block";
    leftguide.display="inline-block";
    bottomguide.display="inline-block";
    rightguide.display="inline-block";
  });
  children[i].addEventListener("contextmenu",function(event){
    event.preventDefault();
    event.stopPropagation();
    popup(event.target);
  });
}
