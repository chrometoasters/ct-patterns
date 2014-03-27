# Patterns: Mobile-first primary navigation

*As used @ <http://outwardbound.co.nz>. Note that the engagement bar code has been stripped as this is not related to the demo.*

Demo: <http://chrometoasters.github.io/ct-patterns/mobile-nav/outwardbound/index.html>

__Please note: this pattern is optimised for internal Chrometoaster use. YMMV.__

## By default, when media queries are supported but JavaScript is not available:

1. The 'real' primary nav at the top of the page is hidden off-canvas, except for a toggle control which is displayed. Clicking the toggle control jumps the user down to the primary nav clone in the footer.
1. The search form precedes the primary nav in the hidden off-canvas block
1. The search icon follows the primary nav in the hidden off-canvas block, and is linked to the search results page
1. The secondary nav is displayed below the primary nav
1. A clone of the primary nav is displayed in the footer, including a search icon which links to the search results page.

## By default, when media queries are supported and JavaScript is available:

1. The 'real' primary nav at the top of the page is hidden off-canvas, except for a toggle control which is displayed. Clicking the toggle control displays the off-canvas nav on screen
1. The search form precedes the primary nav in the hidden off-canvas block
1. The search icon which follows the primary nav in the hidden off-canvas block, is hidden via JavaScript, and the link is rewritten to point to the search form anchor
1. The (tablet+) search form close button is injected into the empty column at the start of the primary nav
1. The secondary nav is nested within the current primary nav item, via JavaScript
1. The primary nav clone in the footer is removed via JavaScript

## At the tablet breakpoint, when media queries are supported but JavaScript is not available:

1. The 'real' primary nav at the top of the page is displayed, in a more compacted view; the toggle control is hidden via CSS
1. The search icon is displayed in the primary nav, and clicking this links the user to the search page
1. The secondary nav is displayed below the primary nav
1. The primary nav clone in the footer is hidden via CSS

## At the tablet breakpoint, when media queries are supported and JavaScript is available:

1. The 'real' primary nav at the top of the page is displayed, in a more compacted view; the toggle control is hidden via CSS
1. The search icon is displayed in the primary nav, and clicking the link displays the search form (incl close button) on top of the primary nav and focusses the search field
1. The secondary nav is displayed below the primary nav
1. The primary nav clone in the footer is hidden via CSS

## At the desktop breakpoint, in MSIE8-, when media queries are not supported and JavaScript is not available:

1. The layout breaks because the HTML5 shiv is not applied to style the HTML5 nav element

## At the desktop breakpoint, in MSIE8-, when media queries are not supported and JavaScript is available:

1. TODO: the nav should display at the table breakpoint but this is currently not the case in this demo

## At the desktop breakpoint, when media queries are supported but JavaScript is not available:

1. As per tablet breakpoint, when JavaScript is not available, except the primary nav is in its full rather than compacted view

## At the desktop breakpoint, when media queries are supported and JavaScript is available:

1. As per tablet breakpoint, when JavaScript is available, except the primary nav is in its full rather than compacted view
