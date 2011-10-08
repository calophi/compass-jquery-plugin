(function($) {
  $.fn.qrcode = function(options) {
    // if options is string,
    if (typeof options === 'string') {
      options = { text: options };
    }

    // set default values
    // typeNumber < 1 for automatic calculation
    options = $.extend({}, {
      render    : "canvas",
      width    : 256,
      height    : 256,
      typeNumber  : -1,
      correctLevel  : QRErrorCorrectLevel.H
    }, options);

    var createCanvas = function() {
      // create the qrcode itself
      var qrcode = new QRCode(options.typeNumber, options.correctLevel);
      qrcode.addData(options.text);
      qrcode.make();

      // create canvas element
      var canvas = document.createElement('canvas');
      canvas.width = options.width;
      canvas.height = options.height;
      var ctx = canvas.getContext('2d');

      // compute tileW/tileH based on options.width/options.height
      var tileW = options.width / qrcode.getModuleCount();
      var tileH = options.height / qrcode.getModuleCount();

      // draw in the canvas
      for (var row = 0; row < qrcode.getModuleCount(); row++) {
        for (var col = 0; col < qrcode.getModuleCount(); col++) {
          ctx.fillStyle = qrcode.isDark(row, col) ? "#000000" : "#ffffff";
          ctx.fillRect(col * tileW, row * tileH, tileW, tileH);
        }
      }
      // return just built canvas
      return canvas;
    }

    // from Jon-Carlos Rivera (https://github.com/imbcmdth)
    var createTable = function() {
      // create the qrcode itself
      var qrcode = new QRCode(options.typeNumber, options.correctLevel);
      qrcode.addData(options.text);
      qrcode.make();

      var border_width = (options.width + options.height) / 20; // 10% of the average(width, height)


      // create table element
      var $table = $('<table></table>')
              .css("width", options.width + "px")
              .css("height", options.height + "px")
              .css("border", "0px")
              .css("border-collapse", "collapse")
        //.css("margin", border_width+"px")
              .css('background-color', "#ffffff");

      // compute tileS percentage
      var tileW = 100 / qrcode.getModuleCount();
      var tileH = 100 / qrcode.getModuleCount();

      // draw in the table
      for (var row = 0; row < qrcode.getModuleCount(); row++) {
        var $row = $('<tr></tr>').css('height', tileH + "%").appendTo($table);

        for (var col = 0; col < qrcode.getModuleCount(); col++) {
          $('<td></td>')
                  .css('width', tileW + "%")
                  .css('background-color', qrcode.isDark(row, col) ? "#000000" : "#ffffff")
                  .appendTo($row);
        }
      }
      // return just built canvas
      return $table;
    }


    return this.each(function() {
      var element = options.render == "canvas" ? createCanvas() : createTable();
      jQuery(element).appendTo(this);
    });
  };
})(jQuery);