tinyMCEPopup.requireLangPack();var PasteTextDialog={init:function(){this.resize()},insert:function(){var b=tinyMCEPopup.dom.encode(document.getElementById("content").value),a;if(document.getElementById("linebreaks").checked){a=b.split(/\r?\n/);if(a.length>1){b="";tinymce.each(a,function(c){b+="<p>"+c+"</p>"})}}tinyMCEPopup.editor.execCommand("mceInsertClipboardContent",false,{content:b});tinyMCEPopup.close()},resize:function(){var a=tinyMCEPopup.dom.getViewPort(window),b;b=document.getElementById("content");b.style.width=(a.w-20)+"px";b.style.height=(a.h-90)+"px"}};tinyMCEPopup.onInit.add(PasteTextDialog.init,PasteTextDialog);