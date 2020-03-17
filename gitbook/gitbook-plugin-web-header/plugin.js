//Add header to all web site page.

require(['gitbook', 'jQuery'], function(gitbook, $) {
    gitbook.events.bind("page.change", function() {
        // Get configuration.
        var headerTitle = gitbook.state.config.pluginsConfig.webheader.headerTitle || '';

        $('.book-body').css('top', '50px');
        $('.book-summary').css('top', '50px');

        // Add customize header html.
        var $header = $('<div class="custom-header"></div>');
        var $headerWrapper = $('<div class="header-element-wrapper"></div>');
        var $headerTitle = $('<div class="header-text">' + headerTitle + '</div>');

        $headerWrapper.append($headerTitle);
        $header.append($headerWrapper);
        $('.book-summary').before($header);

        // Centering
        $('.header-element-wrapper').css('width', $('.header-text').width() + 20 + 'px');
        $('.header-element-wrapper').css('margin', '0 auto');

    });
});
