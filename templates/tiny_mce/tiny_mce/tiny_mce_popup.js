var tinymce=null,tinyMCEPopup,tinyMCE;tinyMCEPopup={init:function(){var d=this,e,f;e=d.getWin();tinymce=e.tinymce;tinyMCE=e.tinyMCE;d.editor=tinymce.EditorManager.activeEditor;d.params=d.editor.windowManager.params;d.features=d.editor.windowManager.features;d.dom=d.editor.windowManager.createInstance("tinymce.dom.DOMUtils",document);if(d.features.popup_css!==false){d.dom.loadCSS(d.features.popup_css||d.editor.settings.popup_css)}d.listeners=[];d.onInit={add:function(a,b){d.listeners.push({func:a,scope:b})}};d.isWindow=!d.getWindowArg("mce_inline");d.id=d.getWindowArg("mce_window_id");d.editor.windowManager.onOpen.dispatch(d.editor.windowManager,window)},getWin:function(){return(!window.frameElement&&window.dialogArguments)||opener||parent||top},getWindowArg:function(f,d){var e=this.params[f];return tinymce.is(e)?e:d},getParam:function(c,d){return this.editor.getParam(c,d)},getLang:function(c,d){return this.editor.getLang(c,d)},execCommand:function(g,h,f,a){a=a||{};a.skip_focus=1;this.restoreSelection();return this.editor.execCommand(g,h,f,a)},resizeToInnerSize:function(){var b=this;setTimeout(function(){var a=b.dom.getViewPort(window);b.editor.windowManager.resizeBy(b.getWindowArg("mce_width")-a.w,b.getWindowArg("mce_height")-a.h,b.id||window)},10)},executeOnLoad:function(s){this.onInit.add(function(){eval(s)})},storeSelection:function(){this.editor.windowManager.bookmark=tinyMCEPopup.editor.selection.getBookmark(1)},restoreSelection:function(){var b=tinyMCEPopup;if(!b.isWindow&&tinymce.isIE){b.editor.selection.moveToBookmark(b.editor.windowManager.bookmark)}},requireLangPack:function(){var c=this,d=c.getWindowArg("plugin_url")||c.getWindowArg("theme_url");if(d&&c.editor.settings.language&&c.features.translate_i18n!==false&&c.editor.settings.language_load!==false){d+="/langs/"+c.editor.settings.language+"_dlg.js";if(!tinymce.ScriptLoader.isDone(d)){document.write('<script type="text/javascript" src="'+tinymce._addVer(d)+'"><\/script>');tinymce.ScriptLoader.markDone(d)}}},pickColor:function(c,d){this.execCommand("mceColorPicker",true,{color:document.getElementById(d).value,func:function(a){document.getElementById(d).value=a;try{document.getElementById(d).onchange()}catch(b){}}})},openBrowser:function(e,f,d){tinyMCEPopup.restoreSelection();this.editor.execCallback("file_browser_callback",e,document.getElementById(e).value,f,window)},confirm:function(d,e,f){this.editor.windowManager.confirm(d,e,f,window)},alert:function(d,e,f){this.editor.windowManager.alert(d,e,f,window)},close:function(){var d=this;function c(){d.editor.windowManager.close(window);tinymce=tinyMCE=d.editor=d.params=d.dom=d.dom.doc=null}if(tinymce.isOpera){d.getWin().setTimeout(c,0)}else{c()}},_restoreSelection:function(){var b=window.event.srcElement;if(b.nodeName=="INPUT"&&(b.type=="submit"||b.type=="button")){tinyMCEPopup.restoreSelection()}},_onDOMLoaded:function(){var f=tinyMCEPopup,i=document.title,h,j,g;if(f.domLoaded){return}f.domLoaded=1;if(f.features.translate_i18n!==false){j=document.body.innerHTML;if(tinymce.isIE){j=j.replace(/ (value|title|alt)=([^"][^\s>]+)/gi,' $1="$2"')}document.dir=f.editor.getParam("directionality","");if((g=f.editor.translate(j))&&g!=j){document.body.innerHTML=g}if((g=f.editor.translate(i))&&g!=i){document.title=i=g}}if(!f.editor.getParam("browser_preferred_colors",false)||!f.isWindow){f.dom.addClass(document.body,"forceColors")}document.body.style.display="";if(tinymce.isIE){document.attachEvent("onmouseup",tinyMCEPopup._restoreSelection);f.dom.add(f.dom.select("head")[0],"base",{target:"_self"})}f.restoreSelection();f.resizeToInnerSize();if(!f.isWindow){f.editor.windowManager.setTitle(window,i)}else{window.focus()}if(!tinymce.isIE&&!f.isWindow){tinymce.dom.Event._add(document,"focus",function(){f.editor.windowManager.focus(f.id)})}tinymce.each(f.dom.select("select"),function(a){a.onkeydown=tinyMCEPopup._accessHandler});tinymce.each(f.listeners,function(a){a.func.call(a.scope,f.editor)});if(f.getWindowArg("mce_auto_focus",true)){window.focus();tinymce.each(document.forms,function(a){tinymce.each(a.elements,function(b){if(f.dom.hasClass(b,"mceFocus")&&!b.disabled){b.focus();return false}})})}document.onkeyup=tinyMCEPopup._closeWinKeyHandler},_accessHandler:function(b){b=b||window.event;if(b.keyCode==13||b.keyCode==32){b=b.target||b.srcElement;if(b.onchange){b.onchange()}return tinymce.dom.Event.cancel(b)}},_closeWinKeyHandler:function(b){b=b||window.event;if(b.keyCode==27){tinyMCEPopup.close()}},_wait:function(){if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);tinyMCEPopup._onDOMLoaded()}});if(document.documentElement.doScroll&&window==window.top){(function(){if(tinyMCEPopup.domLoaded){return}try{document.documentElement.doScroll("left")}catch(b){setTimeout(arguments.callee,0);return}tinyMCEPopup._onDOMLoaded()})()}document.attachEvent("onload",tinyMCEPopup._onDOMLoaded)}else{if(document.addEventListener){window.addEventListener("DOMContentLoaded",tinyMCEPopup._onDOMLoaded,false);window.addEventListener("load",tinyMCEPopup._onDOMLoaded,false)}}}};tinyMCEPopup.init();tinyMCEPopup._wait();