tinyMCEPopup.requireLangPack();var doc;var defaultDocTypes='XHTML 1.0 Transitional=<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">,XHTML 1.0 Frameset=<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">,XHTML 1.0 Strict=<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">,XHTML 1.1=<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">,HTML 4.01 Transitional=<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">,HTML 4.01 Strict=<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">,HTML 4.01 Frameset=<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">';var defaultEncodings="Western european (iso-8859-1)=iso-8859-1,Central European (iso-8859-2)=iso-8859-2,Unicode (UTF-8)=utf-8,Chinese traditional (Big5)=big5,Cyrillic (iso-8859-5)=iso-8859-5,Japanese (iso-2022-jp)=iso-2022-jp,Greek (iso-8859-7)=iso-8859-7,Korean (iso-2022-kr)=iso-2022-kr,ASCII (us-ascii)=us-ascii";var defaultMediaTypes="all=all,screen=screen,print=print,tty=tty,tv=tv,projection=projection,handheld=handheld,braille=braille,aural=aural";var defaultFontNames="Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;Georgia=georgia,times new roman,times,serif;Tahoma=tahoma,arial,helvetica,sans-serif;Times New Roman=times new roman,times,serif;Verdana=verdana,arial,helvetica,sans-serif;Impact=impact;WingDings=wingdings";var defaultFontSizes="10px,11px,12px,13px,14px,15px,16px";function init(){var n=document.forms.fullpage,c=n.elements,o,k,b,d,q,l,g,r,m=tinyMCEPopup.editor,j=tinyMCEPopup.dom,a;d=m.getParam("fullpage_doctypes",defaultDocTypes).split(",");for(k=0;k<d.length;k++){b=d[k].split("=");if(b.length>1){addSelectValue(n,"doctypes",b[0],b[1])}}r=m.getParam("fullpage_fonts",defaultFontNames).split(";");for(k=0;k<r.length;k++){b=r[k].split("=");if(b.length>1){addSelectValue(n,"fontface",b[0],b[1])}}r=m.getParam("fullpage_fontsizes",defaultFontSizes).split(",");for(k=0;k<r.length;k++){addSelectValue(n,"fontsize",r[k],r[k])}l=m.getParam("fullpage_media_types",defaultMediaTypes).split(",");for(k=0;k<l.length;k++){b=l[k].split("=");if(b.length>1){addSelectValue(n,"element_style_media",b[0],b[1]);addSelectValue(n,"element_link_media",b[0],b[1])}}q=m.getParam("fullpage_encodings",defaultEncodings).split(",");for(k=0;k<q.length;k++){b=q[k].split("=");if(b.length>1){addSelectValue(n,"docencoding",b[0],b[1]);addSelectValue(n,"element_script_charset",b[0],b[1]);addSelectValue(n,"element_link_charset",b[0],b[1])}}document.getElementById("bgcolor_pickcontainer").innerHTML=getColorPickerHTML("bgcolor_pick","bgcolor");document.getElementById("link_color_pickcontainer").innerHTML=getColorPickerHTML("link_color_pick","link_color");document.getElementById("visited_color_pickcontainer").innerHTML=getColorPickerHTML("visited_color_pick","visited_color");document.getElementById("active_color_pickcontainer").innerHTML=getColorPickerHTML("active_color_pick","active_color");document.getElementById("textcolor_pickcontainer").innerHTML=getColorPickerHTML("textcolor_pick","textcolor");document.getElementById("stylesheet_browsercontainer").innerHTML=getBrowserHTML("stylesheetbrowser","stylesheet","file","fullpage");document.getElementById("link_href_pickcontainer").innerHTML=getBrowserHTML("link_href_browser","element_link_href","file","fullpage");document.getElementById("script_src_pickcontainer").innerHTML=getBrowserHTML("script_src_browser","element_script_src","file","fullpage");document.getElementById("bgimage_pickcontainer").innerHTML=getBrowserHTML("bgimage_browser","bgimage","image","fullpage");if(isVisible("stylesheetbrowser")){document.getElementById("stylesheet").style.width="220px"}if(isVisible("link_href_browser")){document.getElementById("element_link_href").style.width="230px"}if(isVisible("bgimage_browser")){document.getElementById("bgimage").style.width="210px"}j.add(document.body,"iframe",{id:"documentIframe",src:'javascript:""',style:{display:"none"}});doc=j.get("documentIframe").contentWindow.document;h=tinyMCEPopup.getWindowArg("head_html");h=h.replace(/<script>/gi,'<script type="text/javascript">');h=h.replace(/type=([\"\'])?/gi,"type=$1-mce-");h=h.replace(/(src=|href=)/g,"data-mce-$1");doc.write(h+"</body></html>");doc.close();xmlVer=getReItem(/<\?\s*?xml.*?version\s*?=\s*?"(.*?)".*?\?>/gi,h,1);xmlEnc=getReItem(/<\?\s*?xml.*?encoding\s*?=\s*?"(.*?)".*?\?>/gi,h,1);docType=getReItem(/<\!DOCTYPE.*?>/gi,h.replace(/\n/g,""),0).replace(/ +/g," ");n.langcode.value=getReItem(/lang="(.*?)"/gi,h,1);g=getReItem(/dir\s*=\s*["']([^"']*)["']/i,h,1);if(doc.body.hasAttribute("dir")&&(doc.body.getAttribute("dir")!="")){g=doc.body.getAttribute("dir")}if(o=doc.getElementsByTagName("title")[0]){c.metatitle.value=o.textContent||o.text}tinymce.each(doc.getElementsByTagName("meta"),function(p){var f=(p.getAttribute("name",2)||"").toLowerCase(),i=p.getAttribute("content",2),e=p.getAttribute("httpEquiv",2)||"";o=c["meta"+f];if(f=="robots"){selectByValue(n,"metarobots",tinymce.trim(i),true,true);return}switch(e.toLowerCase()){case"content-type":tmp=getReItem(/charset\s*=\s*(.*)\s*/gi,i,1);if(tmp!=""){xmlEnc=tmp}return}if(o){o.value=i}});selectByValue(n,"doctypes",docType,true,true);selectByValue(n,"docencoding",xmlEnc,true,true);selectByValue(n,"langdir",g,true,true);if(xmlVer!=""){c.xml_pi.checked=true}tinymce.each(doc.getElementsByTagName("link"),function(f){var e=f.getAttribute("media",2)||"",i=f.getAttribute("type",2)||"";if(i=="-mce-text/css"&&(e==""||e=="screen"||e=="all")&&(f.getAttribute("rel",2)||"")=="stylesheet"){n.stylesheet.value=f.getAttribute("data-mce-href",2)||"";return false}});tinymce.each(doc.getElementsByTagName("style"),function(e){var f=parseStyleElement(e);for(x=0;x<f.length;x++){if(f[x].rule.indexOf("a:visited")!=-1&&f[x].data.color){n.visited_color.value=f[x].data.color}if(f[x].rule.indexOf("a:link")!=-1&&f[x].data.color){n.link_color.value=f[x].data.color}if(f[x].rule.indexOf("a:active")!=-1&&f[x].data.color){n.active_color.value=f[x].data.color}}});n.textcolor.value=tinyMCEPopup.dom.getAttrib(doc.body,"text");n.active_color.value=tinyMCEPopup.dom.getAttrib(doc.body,"alink");n.link_color.value=tinyMCEPopup.dom.getAttrib(doc.body,"link");n.visited_color.value=tinyMCEPopup.dom.getAttrib(doc.body,"vlink");n.bgcolor.value=tinyMCEPopup.dom.getAttrib(doc.body,"bgcolor");n.bgimage.value=tinyMCEPopup.dom.getAttrib(doc.body,"background");a=tinyMCEPopup.dom.parseStyle(tinyMCEPopup.dom.getAttrib(doc.body,"style"));if(a["font-family"]){selectByValue(n,"fontface",a["font-family"],true,true)}else{selectByValue(n,"fontface",m.getParam("fullpage_default_fontface",""),true,true)}if(a["font-size"]){selectByValue(n,"fontsize",a["font-size"],true,true)}else{selectByValue(n,"fontsize",m.getParam("fullpage_default_fontsize",""),true,true)}if(a.color){n.textcolor.value=convertRGBToHex(a.color)}if(a["background-image"]){n.bgimage.value=a["background-image"].replace(new RegExp("url\\('?([^']*)'?\\)","gi"),"$1")}if(a["background-color"]){n.bgcolor.value=a["background-color"]}if(a.margin){tmp=a.margin.replace(/[^0-9 ]/g,"");tmp=tmp.split(/ +/);n.topmargin.value=tmp.length>0?tmp[0]:"";n.rightmargin.value=tmp.length>1?tmp[1]:tmp[0];n.bottommargin.value=tmp.length>2?tmp[2]:tmp[0];n.leftmargin.value=tmp.length>3?tmp[3]:tmp[0]}if(a["margin-left"]){n.leftmargin.value=a["margin-left"].replace(/[^0-9]/g,"")}if(a["margin-right"]){n.rightmargin.value=a["margin-right"].replace(/[^0-9]/g,"")}if(a["margin-top"]){n.topmargin.value=a["margin-top"].replace(/[^0-9]/g,"")}if(a["margin-bottom"]){n.bottommargin.value=a["margin-bottom"].replace(/[^0-9]/g,"")}n.style.value=tinyMCEPopup.dom.serializeStyle(a);updateColor("textcolor_pick","textcolor");updateColor("bgcolor_pick","bgcolor");updateColor("visited_color_pick","visited_color");updateColor("active_color_pick","active_color");updateColor("link_color_pick","link_color")}function getReItem(d,b,a){var e=d.exec(b);if(e&&e.length>a){return e[a]}return""}function updateAction(){var m=document.forms[0],a,g,j,o,q,n,k,c,e,d=true,p;n=doc.getElementsByTagName("head")[0];a=doc.getElementsByTagName("script");for(g=0;g<a.length;g++){if(tinyMCEPopup.dom.getAttrib(a[g],"data-mce-type")==""){a[g].setAttribute("mce-type","text/javascript")}}a=doc.getElementsByTagName("link");for(g=0;g<a.length;g++){c=a[g];e=tinyMCEPopup.dom.getAttrib(c,"media");if(tinyMCEPopup.dom.getAttrib(c,"data-mce-type")=="text/css"&&(e==""||e=="screen"||e=="all")&&tinyMCEPopup.dom.getAttrib(c,"rel")=="stylesheet"){d=false;if(m.stylesheet.value==""){c.parentNode.removeChild(c)}else{c.setAttribute("data-mce-href",m.stylesheet.value)}break}}if(m.stylesheet.value!=""){c=doc.createElement("link");c.setAttribute("type","text/css");c.setAttribute("data-mce-href",m.stylesheet.value);c.setAttribute("rel","stylesheet");n.appendChild(c)}setMeta(n,"keywords",m.metakeywords.value);setMeta(n,"description",m.metadescription.value);setMeta(n,"author",m.metaauthor.value);setMeta(n,"copyright",m.metacopyright.value);setMeta(n,"robots",getSelectValue(m,"metarobots"));setMeta(n,"Content-Type",getSelectValue(m,"docencoding"));b(doc.body,"dir",getSelectValue(m,"langdir"));doc.body.style.cssText=m.style.value;function b(l,f,i){i=""+i;if(i.length>0){l.setAttribute(f,i)}else{l.removeAttribute(f,i)}}b(doc.body,"vLink",m.visited_color.value);b(doc.body,"link",m.link_color.value);b(doc.body,"text",m.textcolor.value);b(doc.body,"aLink",m.active_color.value);doc.body.style.fontFamily=getSelectValue(m,"fontface");doc.body.style.fontSize=getSelectValue(m,"fontsize");doc.body.style.backgroundColor=m.bgcolor.value;if(m.leftmargin.value!=""){doc.body.style.marginLeft=m.leftmargin.value+"px"}if(m.rightmargin.value!=""){doc.body.style.marginRight=m.rightmargin.value+"px"}if(m.bottommargin.value!=""){doc.body.style.marginBottom=m.bottommargin.value+"px"}if(m.topmargin.value!=""){doc.body.style.marginTop=m.topmargin.value+"px"}k=doc.getElementsByTagName("html")[0];b(k,"lang",m.langcode.value);b(k,"xml:lang",m.langcode.value);if(m.bgimage.value!=""){doc.body.style.backgroundImage="url('"+m.bgimage.value+"')"}else{doc.body.style.backgroundImage=""}p=tinyMCEPopup.editor.plugins.fullpage._createSerializer();p.setRules("-title,meta[http-equiv|name|content],base[href|target],link[href|rel|type|title|media],style[type],script[type|language|src],html[lang|xml::lang|xmlns],body[style|dir|vlink|link|text|alink],head");j=p.serialize(doc.documentElement);j=j.substring(0,j.lastIndexOf("</body>"));if(j.indexOf("<title>")==-1){j=j.replace(/<head.*?>/,"$&\n<title>"+tinyMCEPopup.dom.encode(m.metatitle.value)+"</title>")}else{j=j.replace(/<title>(.*?)<\/title>/,"<title>"+tinyMCEPopup.dom.encode(m.metatitle.value)+"</title>")}if(o=m.langcode.value){htmlt='<html lang="'+o+'" xml:lang="'+o+'">'}else{htmlt="<html>"}j=j.replace(/<html.*?>/,htmlt);if((o=getSelectValue(m,"doctypes"))!=""){j=o+"\n"+j}if(m.xml_pi.checked){q='<?xml version="1.0"';if((o=getSelectValue(m,"docencoding"))!=""){q+=' encoding="'+o+'"'}q+="?>\n";j=q+j}j=j.replace(/type=\"\-mce\-/gi,'type="');tinyMCEPopup.editor.plugins.fullpage.head=j;tinyMCEPopup.editor.plugins.fullpage._setBodyAttribs(tinyMCEPopup.editor,{});tinyMCEPopup.close()}function changedStyleField(a){}function setMeta(f,d,c){var b,e,a;b=f.getElementsByTagName("meta");for(e=0;e<b.length;e++){if(d=="Content-Type"&&tinyMCEPopup.dom.getAttrib(b[e],"http-equiv")==d){if(c==""){b[e].parentNode.removeChild(b[e])}else{b[e].setAttribute("content","text/html; charset="+c)}return}if(tinyMCEPopup.dom.getAttrib(b[e],"name")==d){if(c==""){b[e].parentNode.removeChild(b[e])}else{b[e].setAttribute("content",c)}return}}if(c==""){return}a=doc.createElement("meta");if(d=="Content-Type"){a.httpEquiv=d}else{a.setAttribute("name",d)}a.setAttribute("content",c);f.appendChild(a)}function parseStyleElement(f){var a=f.innerHTML;var d,b,c;a=a.replace(/<!--/gi,"");a=a.replace(/-->/gi,"");a=a.replace(/[\n\r]/gi,"");a=a.replace(/\s+/gi," ");c=[];d=a.split(/{|}/);for(b=0;b<d.length;b+=2){if(d[b]!=""){c[c.length]={rule:tinymce.trim(d[b]),data:tinyMCEPopup.dom.parseStyle(d[b+1])}}}return c}function serializeStyleElement(e){var b,c,a;c="<!--\n";for(b=0;b<e.length;b++){c+=e[b].rule+" {\n";a=tinyMCE.serializeStyle(e[b].data);if(a!=""){a+=";"}c+=a.replace(/;/g,";\n");c+="}\n";if(b!=e.length-1){c+="\n"}}c+="\n-->";return c}tinyMCEPopup.onInit.add(init);