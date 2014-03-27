// VALIDATION SETTINGS FOR JSHINT.COM

// This file
/*jshint browser:true, jquery:true, strict:true, devel:false */

var ct_pattern = null; // global for console debugging

(function($) {

    "use strict"; // JSHINT - Use ECMAScript 5 Strict Mode

    ct_pattern = {

        setup_aria_tree: function(selector) {

            var $aria_controllers = $(selector + '[aria-controls]');

            $aria_controllers.on( 'click', function(e) {

                // don't follow link href
                e.preventDefault();

                var $aria_controller = $(this);
                var $aria_controller_icon = $aria_controller.children('.icon');
                var $aria_controlled = $(this).attr('aria-controls').split(' '); // space separated list of IDs, pointing to expandable and hidable containers
                var $aria_expandee = false;
                var $aria_hidee = false;
                var $target = false;

                $.each( $aria_controlled, function(i, item) {

                    $target = $('#' + item);

                    if ( $target.is('[role="treeitem"][aria-expanded]') ) {
                        $aria_expandee = $target;
                    }
                    else if ( $target.is('[role="group"][aria-hidden]') ) {
                        $aria_hidee = $target;
                    }

                    //console.log( i, $aria_expandee, $aria_hidee );
                });

                // open block if closed
                if ( $aria_expandee && $aria_expandee.attr('aria-expanded') === 'false' ) {

                    $aria_expandee.attr('aria-expanded', 'true');
                    $aria_controller_icon.removeClass('icon-plus').addClass('icon-minus');
                    $aria_hidee.attr('aria-hidden', 'false');

                }
                // close block if open
                else if ( $aria_expandee && $aria_expandee.attr('aria-expanded') === 'true' ) {

                    $aria_expandee.attr('aria-expanded', 'false');
                    $aria_controller_icon.removeClass('icon-minus').addClass('icon-plus');
                    $aria_hidee.attr('aria-hidden', 'true');

                }
            });

            // trigger a clicks to collapse the target
            $aria_controllers.trigger('click');

        }

    };

    ct_pattern.setup_aria_tree('.m-tree--expander'); // [role="tree-item"][aria-expanded] > div > a

})(jQuery);