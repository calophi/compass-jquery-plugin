(function() {
    var a = tinymce.dom.Event,c = tinymce.each,b = tinymce.DOM;
    tinymce.create("tinymce.plugins.ContextMenu", {init:function(d) {
        var g = this,h,e;
        g.editor = d;
        g.onContextMenu = new tinymce.util.Dispatcher(this);
        e = d.onContextMenu.add(function(i, j) {
            if (!j.ctrlKey) {
                if (h) {
                    i.selection.setRng(h)
                }
                g._getMenu(i).showMenu(j.clientX || j.pageX, j.clientY || j.pageX);
                a.add(i.getDoc(), "click", function(k) {
                    f(i, k)
                });
                a.cancel(j)
            }
        });
        d.onRemove.add(function() {
            if (g._menu) {
                g._menu.removeAll()
            }
        });
        function f(i, j) {
            h = null;
            if (j && j.button == 2) {
                h = i.selection.getRng();
                return
            }
            if (g._menu) {
                g._menu.removeAll();
                g._menu.destroy();
                a.remove(i.getDoc(), "click", f)
            }
        }

        d.onMouseDown.add(f);
        d.onKeyDown.add(f);
        d.onKeyDown.add(function(i, j) {
            if (j.shiftKey && !j.ctrlKey && !j.altKey && j.keyCode === 121) {
                a.cancel(j);
                e(i, j)
            }
        })
    },getInfo:function() {
        return{longname:"Contextmenu",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/contextmenu",version:tinymce.majorVersion + "." + tinymce.minorVersion}
    },_getMenu:function(h) {
        var l = this,f = l._menu,i = h.selection,e = i.isCollapsed(),d = i.getNode() || h.getBody(),g,k,j;
        if (f) {
            f.removeAll();
            f.destroy()
        }
        k = b.getPos(h.getContentAreaContainer());
        j = b.getPos(h.getContainer());
        f = h.controlManager.createDropMenu("contextmenu", {offset_x:k.x + h.getParam("contextmenu_offset_x", 0),offset_y:k.y + h.getParam("contextmenu_offset_y", 0),constrain:1,keyboard_focus:true});
        l._menu = f;
        f.add({title:"advanced.cut_desc",icon:"cut",cmd:"Cut"}).setDisabled(e);
        f.add({title:"advanced.copy_desc",icon:"copy",cmd:"Copy"}).setDisabled(e);
        f.add({title:"advanced.paste_desc",icon:"paste",cmd:"Paste"});
        if ((d.nodeName == "A" && !h.dom.getAttrib(d, "name")) || !e) {
            f.addSeparator();
            f.add({title:"advanced.link_desc",icon:"link",cmd:h.plugins.advlink ? "mceAdvLink" : "mceLink",ui:true});
            f.add({title:"advanced.unlink_desc",icon:"unlink",cmd:"UnLink"})
        }
        f.addSeparator();
        f.add({title:"advanced.image_desc",icon:"image",cmd:h.plugins.advimage ? "mceAdvImage" : "mceImage",ui:true});
        f.addSeparator();
        g = f.addMenu({title:"contextmenu.align"});
        g.add({title:"contextmenu.left",icon:"justifyleft",cmd:"JustifyLeft"});
        g.add({title:"contextmenu.center",icon:"justifycenter",cmd:"JustifyCenter"});
        g.add({title:"contextmenu.right",icon:"justifyright",cmd:"JustifyRight"});
        g.add({title:"contextmenu.full",icon:"justifyfull",cmd:"JustifyFull"});
        l.onContextMenu.dispatch(l, f, d, e);
        return f
    }});
    tinymce.PluginManager.add("contextmenu", tinymce.plugins.ContextMenu)
})();