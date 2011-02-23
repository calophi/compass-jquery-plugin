//quick & dirty theme switcher, written to potentially work as a bookmarklet
(function($) {
    $.themeswitcher = function() {
        if ($('[data-url=themeswitcher]').length) {
            return;
        }
        var
                themesDir = '/stylesheets/compiled/jquery/mobile/',
                themes = ['default','valencia'],
                currentPage = $.mobile.activePage,
                menuPage = $('<div data-url="themeswitcher" data-role=\'dialog\' data-theme=\'a\'>' +
                        '<div data-role=\'header\' data-theme=\'b\'>' +
                        '<div class=\'ui-title\'>Switch Theme:</div>' +
                        '</div>' +
                        '<div data-role=\'content\' data-theme=\'c\'><ul data-role=\'listview\' data-inset=\'true\'></ul></div>' +
                        '</div>')
                        .appendTo($.mobile.pageContainer),
                menu = menuPage.find('ul');

        //menu items
        $.each(themes, function(i) {
            $('<li><a href="#" data-rel="back">' + themes[ i ].charAt(0).toUpperCase() + themes[ i ].substr(1) + '</a></li>')
                    .click(function() {
                addTheme(themes[i]);
                return false;
            })
                    .appendTo(menu);
        });

        //remover, adder
        function addTheme(theme) {
            $('head').append('<link rel=\'stylesheet\' href=\'' + themesDir + theme + '.css\' />');
        }

        //create page, listview
        menuPage.page();

    };
})(jQuery);
