// VALIDATION SETTINGS FOR JSHINT.COM

// This file
/*jshint browser:true, jquery:true, strict:true, devel:false */

var ct_pattern = null; // global for console debugging

(function($) {

    "use strict"; // JSHINT - Use ECMAScript 5 Strict Mode

    ct_pattern = {

        // TODO: refactor to match aria-hidden controller
        setup_expand_buttons: function(selector) {

            // hook up expanded buttons:

            var $aria_expanders = $(selector);

            $aria_expanders.on( 'click', function(e) {

                // don't follow link href
                e.preventDefault();

                var $aria_expander = $(this);

                var $aria_block = $aria_expander.parents('[aria-expanded]').eq(0);

                // open block if closed
                if ( $aria_block.attr('aria-expanded') === 'false' ) {
                    $aria_block.attr('aria-expanded', 'true');
                    $aria_expander.find('.icon').removeClass('icon-plus-sign-alt').addClass('icon-minus-sign-alt');
                }
                // close block if open
                else {
                    $aria_block.attr('aria-expanded', 'false');
                    $aria_expander.find('.icon').removeClass('icon-minus-sign-alt').addClass('icon-plus-sign-alt');
                }
            });

        },

        collapse_expandable_containers: function() {

            var $expanded = $('[aria-expanded="true"]');

            // close block if open
            $expanded.attr('aria-expanded', 'false');
            $expanded.find('.m-tree--expander').find('.icon').removeClass('icon-minus-sign-alt').addClass('icon-plus-sign-alt');

            // .m-tree--l1 is always present,
            // by default it appears expanded, to show the contained group,
            // when js is enabled it appears collapsed, to save space

            // .m-tree--l2 is always present,
            // by default it appears expanded, to show the contained .m-tree--l2-group (except the tabbed multimedia content)
            // when js is enabled it appears collapsed, to save space

            // .m-tree--l2-group is always present,
            // by default it appears expanded, to show each contained .m-tree--l3
            // when js is enabled it appears collapsed, to save space
            // when js is enabled, the multimedia content is Ajaxed in when the block is expanded for the first time
        },

    };

    ct_pattern.collapse_expandable_containers();
    ct_pattern.setup_expand_buttons('.m-tree--expander'); // [role="tree-item"][aria-expanded] > div > a

})(jQuery);