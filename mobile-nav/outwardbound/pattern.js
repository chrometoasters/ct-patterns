// VALIDATION SETTINGS FOR JSHINT.COM

// This file
/*jshint browser:true, jquery:true, strict:true, devel:false */
// Vendor
/*globals enquire:true */

var ct_pattern = null; // global for console debugging

(function($) {

    "use strict"; // JSHINT - Use ECMAScript 5 Strict Mode

    // Monkey patch:
    // to allow unmatch (which usually runs on breakpoint transition) to run on DOM load as well
    // https://github.com/WickyNilliams/enquire.js/issues/86#issuecomment-28665171
    enquire.registerImmediate = function(query, options) {
        options.setup = options.unmatch;
        return this.register(query, options);
    };

    ct_pattern = {

        em: function(target_px) { // based on our .scss function
            var context = 16; // basefont_size
            var target = target_px.replace('px', '');
            target = parseInt(target, 10);

            return ( target/context + 'em' );
        },

        hide: function($selector) {
            // what: replacement for $.hide() which toggles the accessible ARIA attribute
            // how: ct_pattern.show( $foo )
            $selector
                .attr('aria-hidden', true)
                .hide();
        },

        show: function($selector) {
            // what: replacement for $.show() which toggles the accessible ARIA attribute
            // how: ct_pattern.show( $foo )
            $selector
                .attr('aria-hidden', false)
                .show();
        },

        is_hidden: function($selector) {
            if ( $selector.attr('aria-hidden') === 'true' ) {
                return true;
            }
            else {
                return false;
            }
        },

        toggle: function($selector) {
            // what: replacement for $.show() which toggles the accessible ARIA attribute
            // how: build_ui.show( $foo )
            // note: aria-hidden is set to display: none in the CSS
            if ( $selector.attr('aria-hidden') === 'true' ) {
                ct_pattern.show( $selector );
                return 'visible';
            }
            else {
                ct_pattern.hide( $selector );
                return 'hidden';
            }
        },

        setup_search_form: function(primary_nav_selector) {

            var $primary_nav = $(primary_nav_selector);
            var $form_selector = $primary_nav.find('.m-form_search');
            var $form = $form_selector.find('form');
            var form_id = $form_selector.attr('id');
            var $open_button = $primary_nav.find('a[aria-controls="' + form_id + '"]');
            var close_button = '<button type="button" aria-controls="' + form_id + '"><span>Hide search form</span></button>';

            // as the search form stacks on top of the primary nav
            // there is no clean way to display it in the noscript view
            // therefore by default the search button links to the search results page,
            // where we show a search form that is hidden from javascript users.
            // so: rewrite the url for javascript users, to point to the hidden form on the current page
            $open_button.attr('href', '#' + form_id);

            ////console.log(primary_nav_selector);

            // inject the close button into the empty grid column
            $primary_nav.find('.col:empty:first').append(close_button);

            // when a form visibility control is clicked
            // TODO: if we made this an on() action we could
            // also handle the link in setup_search_results_page
            $('[aria-controls="' + form_id + '"]').click( function(evt) {

                // don't follow the link if one was clicked
                evt.preventDefault();

                // toggle the visibility of the form wrapper
                ct_pattern.toggle( $form_selector );

                // if the form is now visible, focus the input
                if ( ! ct_pattern.is_hidden( $form_selector ) ) {
                    $form_selector.find('input:text').focus();
                }
                // else if the form is now hidden, focus the search button so that the tabbing
                // continues from were the user left off
                else {
                    $open_button.focus();
                }

            });

            // when the form is submitted
            $form.submit( function() {

                // TODO: remove ID specificity, eg :not('.tt-class')
                var $textfield = $('#m-form_search--query'); // $(this).find('input:text'); // the latter also targets the typeahead field

                // if the textfield is empty
                if ( $textfield.val() === '' ) {

                    // focus the textfield
                    $textfield.focus();

                    // and do not submit the form
                    return false;
                }
            });

        },

        setup_primary_nav: function(primary_nav_selector) {


            if ( typeof enquire === 'undefined') {
                return;
            }

            var $shell = $('#shell');
            var $primary_nav_search = $(primary_nav_selector).find('.m-form_search');
            var primary_nav_open_class = 'primary_nav_open';
            var primary_nav_opener_class = 'open_primary_nav';
            var primary_nav_closer_class = 'close_primary_nav';
            var $primary_nav_control = $('#m-primary-nav--control');
            var $parent = $('body');

            // remove the duplicate noscript nav at the bottom of the page
            // TODO add and remove the noscript secondary nav
            $('#m-primary-nav_mobile_noscript').remove();

            // jquery media query
            // TODO: add polyfill for older browsers - http://wicky.nillia.ms/enquire.js/#legacy-browsers
            // TODO: optimise this code (store DOM references etc)

            // at the mobile-first breakpoint
            enquire
            .registerImmediate('screen and (max-width:' + ct_pattern.em('767px') + ')', {

                // mobile first
                match : function() {
                    //console.log('mobile query matched');

                    // stretch the off-canvas nav to the height of the page
                    $(primary_nav_selector).css( 'min-height', $shell.height() );

                    // hide search link as the search form is already visible
                    ct_pattern.hide( $(primary_nav_selector).find('li.search') );

                    // hide search form open button ??
                    ct_pattern.hide( $(primary_nav_selector).find('button[aria-controls="m-form_search"]') );

                    // hide search form close button
                    ct_pattern.hide( $('button[aria-controls="m-form_search"]') );

                    // show the search form (after JS click??)
                    ct_pattern.show( $primary_nav_search );

                    // hijack the noscript mobile first menu jump button
                    // so that it toggles the visible state of the off-canvas primary nav
                    $primary_nav_control
                        .addClass( primary_nav_opener_class )
                        .attr('href', '#m-primary-nav_desktop') // rather than #m-primary-nav_mobile
                        .attr('aria-controls', 'm-primary-nav_desktop');

                    $parent
                    .on( 'click',  '.' + primary_nav_opener_class, function(evt) {

                        evt.preventDefault(); // unsure why this is not reqd in the original script

                        // open the primary_nav
                        $parent
                            .addClass(primary_nav_open_class);

                        // TODO: shift the focus to ??
                        //$primary_nav_closer_drawer.attr('tabindex', 0).focus();

                        // update action for all primary_nav openers
                        $primary_nav_control
                            .addClass( primary_nav_closer_class )
                            .removeClass( primary_nav_opener_class );

                        $primary_nav_control.find('span').text('Hide main navigation');
                    })
                    // when the primary_nav is closed
                    .on( 'click',  '.' + primary_nav_closer_class, function(evt) {

                        evt.preventDefault(); // unsure why this is not reqd in the original script

                        // close the primary_nav
                        $parent.removeClass(primary_nav_open_class);

                        // TODO: shift the focus to ??
                        //$primary_nav_opener_primary_nav.focus();

                        // update action for all primary_nav openers
                        $primary_nav_control
                            .addClass( primary_nav_opener_class )
                            .removeClass( primary_nav_closer_class );

                        $primary_nav_control.find('span').text('Show main navigation');
                    });

                    // inject secondary nav into off canvas nav

                    var $secondary_nav = $('.block-secondary-nav');
                    var mobile_secondary_nav_id = 'secondary-nav-mobile';

                    if ( $secondary_nav.length && ! $('#' + mobile_secondary_nav_id).length ) {

                        // locate the current primary nav item
                        var $primary_nav_active = $(primary_nav_selector).find('li.active'); // requires integration

                        // clone the secondary nav list and give it an ID for later targetting
                        var $secondary_nav_active = $secondary_nav.find('ul').clone().attr('id', mobile_secondary_nav_id);

                        // inject the secondary nav block into the current primary nav item
                        $primary_nav_active.append( $secondary_nav_active );
                    }

                    // show the mobile secondary nav
                    ct_pattern.show( $('#' + mobile_secondary_nav_id) );

                    // hide the original secondary nav wrapper
                    ct_pattern.hide( $secondary_nav );

                },

                // transition from mobile first to tablet
                unmatch : function() {
                    //console.log('mobile query unmatched');

                    // unstretch the off canvas primary nav
                    $(primary_nav_selector).css( 'min-height', 0 );

                    // show search link as the search form is now hidden
                    ct_pattern.show( $(primary_nav_selector).find('li.search') );

                    // show search form close button
                    ct_pattern.show( $('button[aria-controls="m-form_search"]') );

                    // hide the search form
                    ct_pattern.hide( $primary_nav_search );

                    var $secondary_nav = $('.block-secondary-nav');
                    var mobile_secondary_nav_id = 'secondary-nav-mobile';

                    // hide the mobile secondary nav
                    ct_pattern.hide( $('#' + mobile_secondary_nav_id) );

                    // show the original secondary nav wrapper
                    ct_pattern.show( $secondary_nav );

                },

                // triggered once, when the match handler is registered.
                // the monkey patch uses the unmatch callback instead
                //setup : function() {
                //},

                // OPTIONAL, defaults to false
                // If set to true, defers execution of the setup function
                // until the first time the media query is matched
                deferSetup : false // needs to be false for the monkey patch to work

                // OPTIONAL
                // If supplied, triggered when handler is unregistered.
                // Place cleanup code here
                //destroy : function() {}

            }, false); // false == !shouldDegrade
        }
    };

    ct_pattern.setup_primary_nav('#primary-nav');

    ct_pattern.setup_search_form('.m-primary-nav_desktop');

})(jQuery);