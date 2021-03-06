/*
 * jsTree wholerow plugin
 * Makes select and hover work on the entire width of the node
 * MAY BE HEAVY IN LARGE DOM
 */
(function ($) {
  $.jstree.plugin("wholerow", {
    __init : function () {
      if (!this.data.ui) {
        throw "jsTree wholerow: jsTree UI plugin not included.";
      }
      this.data.wholerow.html = false;
      this.data.wholerow.to = false;
      this.get_container()
              .bind("init.jstree", $.proxy(function (e, data) {
        this._get_settings().core.animation = 0;
      }, this))
              .bind("open_node.jstree create_node.jstree clean_node.jstree loaded.jstree", $.proxy(function (e, data) {
        this._prepare_wholerow_span(data && data.rslt && data.rslt.obj ? data.rslt.obj : -1);
      }, this))
              .bind("search.jstree clear_search.jstree reopen.jstree after_open.jstree after_close.jstree create_node.jstree delete_node.jstree clean_node.jstree", $.proxy(function (e, data) {
        if (this.data.to) {
          clearTimeout(this.data.to);
        }
        this.data.to = setTimeout((function (t, o) {
          return function() {
            t._prepare_wholerow_ul(o);
          };
        })(this, data && data.rslt && data.rslt.obj ? data.rslt.obj : -1), 0);
      }, this))
              .bind("deselect_all.jstree", $.proxy(function (e, data) {
        this.get_container().find(" > .jstree-wholerow .jstree-clicked").removeClass("jstree-clicked " + (this.data.themeroller ? this._get_settings().themeroller.item_a : "" ));
      }, this))
              .bind("select_node.jstree deselect_node.jstree ", $.proxy(function (e, data) {
        data.rslt.obj.each(function () {
          var ref = data.inst.get_container().find(" > .jstree-wholerow li:visible:eq(" + ( parseInt((($(this).offset().top - data.inst.get_container().offset().top + data.inst.get_container()[0].scrollTop) / data.inst.data.core.li_height), 10)) + ")");
          // ref.children("a")[e.type === "select_node" ? "addClass" : "removeClass"]("jstree-clicked");
          ref.children("a").attr("class", data.rslt.obj.children("a").attr("class"));
        });
      }, this))
              .bind("hover_node.jstree dehover_node.jstree", $.proxy(function (e, data) {
        this.get_container().find(" > .jstree-wholerow .jstree-hovered").removeClass("jstree-hovered " + (this.data.themeroller ? this._get_settings().themeroller.item_h : "" ));
        if (e.type === "hover_node") {
          var ref = this.get_container().find(" > .jstree-wholerow li:visible:eq(" + ( parseInt(((data.rslt.obj.offset().top - this.get_container().offset().top + this.get_container()[0].scrollTop) / this.data.core.li_height), 10)) + ")");
          // ref.children("a").addClass("jstree-hovered");
          ref.children("a").attr("class", data.rslt.obj.children(".jstree-hovered").attr("class"));
        }
      }, this))
              .delegate(".jstree-wholerow-span, ins.jstree-icon, li", "click.jstree", function (e) {
                var n = $(e.currentTarget);
                if (e.target.tagName === "A" || (e.target.tagName === "INS" && n.closest("li").is(".jstree-open, .jstree-closed"))) {
                  return;
                }
                n.closest("li").children("a:visible:eq(0)").click();
                e.stopImmediatePropagation();
              })
              .delegate("li", "mouseover.jstree", $.proxy(function (e) {
        e.stopImmediatePropagation();
        if ($(e.currentTarget).children(".jstree-hovered, .jstree-clicked").length) {
          return false;
        }
        this.hover_node(e.currentTarget);
        return false;
      }, this))
              .delegate("li", "mouseleave.jstree", $.proxy(function (e) {
        if ($(e.currentTarget).children("a").hasClass("jstree-hovered").length) {
          return;
        }
        this.dehover_node(e.currentTarget);
      }, this));
      if (is_ie7 || is_ie6) {
        $.vakata.css.add_sheet({ str : ".jstree-" + this.get_index() + " { position:relative; } ", title : "jstree" });
      }
    },
    defaults : {
    },
    __destroy : function () {
      this.get_container().children(".jstree-wholerow").remove();
      this.get_container().find(".jstree-wholerow-span").remove();
    },
    _fn : {
      _prepare_wholerow_span : function (obj) {
        obj = !obj || obj == -1 ? this.get_container().find("> ul > li") : this._get_node(obj);
        if (obj === false) {
          return;
        } // added for removing root nodes
        obj.each(function () {
          $(this).find("li").andSelf().each(function () {
            var $t = $(this);
            if ($t.children(".jstree-wholerow-span").length) {
              return true;
            }
            $t.prepend("<span class='jstree-wholerow-span' style='width:" + ($t.parentsUntil(".jstree", "li").length * 18) + "px;'>&#160;</span>");
          });
        });
      },
      _prepare_wholerow_ul : function () {
        var o = this.get_container().children("ul").eq(0), h = o.html();
        o.addClass("jstree-wholerow-real");
        if (this.data.wholerow.last_html !== h) {
          this.data.wholerow.last_html = h;
          this.get_container().children(".jstree-wholerow").remove();
          this.get_container().append(
                  o.clone().removeClass("jstree-wholerow-real")
                          .wrapAll("<div class='jstree-wholerow' />").parent()
                          .width(o.parent()[0].scrollWidth)
                          .css("top", (o.height() + ( is_ie7 ? 5 : 0)) * -1)
                          .find("li[id]").each(
                          function () {
                            this.removeAttribute("id");
                          }).end()
          );
        }
      }
    }
  });
  $(function() {
    var css_string = '' +
            '.jstree .jstree-wholerow-real { position:relative; z-index:1; } ' +
            '.jstree .jstree-wholerow-real li { cursor:pointer; } ' +
            '.jstree .jstree-wholerow-real a { border-left-color:transparent !important; border-right-color:transparent !important; } ' +
            '.jstree .jstree-wholerow { position:relative; z-index:0; height:0; } ' +
            '.jstree .jstree-wholerow ul, .jstree .jstree-wholerow li { width:100%; } ' +
            '.jstree .jstree-wholerow, .jstree .jstree-wholerow ul, .jstree .jstree-wholerow li, .jstree .jstree-wholerow a { margin:0 !important; padding:0 !important; } ' +
            '.jstree .jstree-wholerow, .jstree .jstree-wholerow ul, .jstree .jstree-wholerow li { background:transparent !important; }' +
            '.jstree .jstree-wholerow ins, .jstree .jstree-wholerow span, .jstree .jstree-wholerow input { display:none !important; }' +
            '.jstree .jstree-wholerow a, .jstree .jstree-wholerow a:hover { text-indent:-9999px; !important; width:100%; padding:0 !important; border-right-width:0px !important; border-left-width:0px !important; } ' +
            '.jstree .jstree-wholerow-span { position:absolute; left:0; margin:0px; padding:0; height:18px; border-width:0; padding:0; z-index:0; }';
    if (is_ff2) {
      css_string += '' +
              '.jstree .jstree-wholerow a { display:block; height:18px; margin:0; padding:0; border:0; } ' +
              '.jstree .jstree-wholerow-real a { border-color:transparent !important; } ';
    }
    if (is_ie7 || is_ie6) {
      css_string += '' +
              '.jstree .jstree-wholerow, .jstree .jstree-wholerow li, .jstree .jstree-wholerow ul, .jstree .jstree-wholerow a { margin:0; padding:0; line-height:18px; } ' +
              '.jstree .jstree-wholerow a { display:block; height:18px; line-height:18px; overflow:hidden; } ';
    }
    $.vakata.css.add_sheet({ str : css_string, title : "jstree" });
  });
})(jQuery);
