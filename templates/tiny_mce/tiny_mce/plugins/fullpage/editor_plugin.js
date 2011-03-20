(function(){tinymce.create("tinymce.plugins.FullPagePlugin",{init:function(e,d){var f=this;f.editor=e;e.addCommand("mceFullPageProperties",function(){e.windowManager.open({file:d+"/fullpage.htm",width:430+parseInt(e.getLang("fullpage.delta_width",0)),height:495+parseInt(e.getLang("fullpage.delta_height",0)),inline:1},{plugin_url:d,head_html:f.head})});e.addButton("fullpage",{title:"fullpage.desc",cmd:"mceFullPageProperties"});e.onBeforeSetContent.add(f._setContent,f);e.onSetContent.add(f._setBodyAttribs,f);e.onGetContent.add(f._getContent,f)},getInfo:function(){return{longname:"Fullpage",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/fullpage",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_setBodyAttribs:function(v,z){var i,w,t,q,y,o,k,s=this.head.match(/body(.*?)>/i),r="",x,u=this.head.match(/<html([^>]*?)>/i);if(s&&s[1]){i=s[1].match(/\s*(\w+\s*=\s*".*?"|\w+\s*=\s*'.*?'|\w+\s*=\s*\w+|\w+)\s*/g);if(i){for(w=0,t=i.length;w<t;w++){q=i[w].split("=");y=q[0].replace(/\s/,"");o=q[1];if(o){o=o.replace(/^\s+/,"").replace(/\s+$/,"");k=o.match(/^["'](.*)["']$/);if(k){o=k[1]}if(y=="dir"){r=o}}else{o=y}v.dom.setAttrib(v.getBody(),"style",o)}}}if(r==""&&u&&u[1]){x=u[1].match(/dir\s*=\s*["']([^"']*)["']/i);if(x&&x[1]){r=x[1]}}bd=v.getBody();bd.setAttribute("dir",r)},_createSerializer:function(){return new tinymce.dom.Serializer({dom:this.editor.dom,indent:true,apply_source_formatting:true,indent_before:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,li,area,title,meta,head",indent_after:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,li,area,title,meta,head"})},_setContent:function(p,q){var l=this,r,c,n=q.content,m,k="";if(q.format=="raw"&&l.head){return}if(q.source_view&&p.getParam("fullpage_hide_in_source_view")){return}n=n.replace(/<(\/?)BODY/gi,"<$1body");r=n.indexOf("<body");if(r!=-1){r=n.indexOf(">",r);l.head=n.substring(0,r+1);c=n.indexOf("</body",r);if(c==-1){c=n.length}q.content=n.substring(r+1,c);l.foot=n.substring(c);function o(a){return a.replace(/<\/?[A-Z]+/g,function(b){return b.toLowerCase()})}l.head=o(l.head);l.foot=o(l.foot)}else{l.head="";if(p.getParam("fullpage_default_xml_pi")){l.head+='<?xml version="1.0" encoding="'+p.getParam("fullpage_default_encoding","ISO-8859-1")+'" ?>\n'}l.head+=p.getParam("fullpage_default_doctype",'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');l.head+="\n<html>\n<head>\n<title>"+p.getParam("fullpage_default_title","Untitled document")+"</title>\n";if(m=p.getParam("fullpage_default_encoding")){l.head+='<meta http-equiv="Content-Type" content="'+m+'" />\n'}if(m=p.getParam("fullpage_default_font_family")){k+="font-family: "+m+";"}if(m=p.getParam("fullpage_default_font_size")){k+="font-size: "+m+";"}if(m=p.getParam("fullpage_default_text_color")){k+="color: "+m+";"}l.head+="</head>\n<body"+(k?' style="'+k+'"':"")+">\n";l.foot="\n</body>\n</html>"}},_getContent:function(e,f){var d=this;if(!f.source_view||!e.getParam("fullpage_hide_in_source_view")){f.content=tinymce.trim(d.head)+"\n"+tinymce.trim(f.content)+"\n"+tinymce.trim(d.foot)}}});tinymce.PluginManager.add("fullpage",tinymce.plugins.FullPagePlugin)})();