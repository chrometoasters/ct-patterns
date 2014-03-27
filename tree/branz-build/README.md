# Patterns: Tree navigation

*As used @ [coming soon].*

Demo: <http://chrometoasters.github.io/ct-patterns/tree/branz-build/index.html>

__Please note: this pattern is optimised for internal Chrometoaster use. YMMV.__

## By default, when JavaScript is not available

* Each expander is anchor-linked to a block with `role="treeitem"`. The expander's parent has `aria-expanded="true"`, which causes the nested block with `role="group"` to be visible.
* Clicking the expander jumps the page down to the top of the anchor-linked block.

## When JavaScript is available

* Each expander is anchor-linked to a block with `role="treeitem"`. The expander's parent has `aria-expanded="false"`,  which causes the nested block with `role="group"` to be hidden.
* Clicking the expander changes the expander's parent to `aria-expanded="true"`, which causes the nested block with `role="group"` to become visible. The page does not jump.




