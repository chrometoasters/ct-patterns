# Patterns: Tree navigation 0.2

*As used @ [coming soon].*

Demo: <http://chrometoasters.github.io/ct-patterns/tree/branz-build/index.html>

__Please note: this pattern is optimised for internal Chrometoaster use. YMMV.__

## By default, when JavaScript is not available

* Each expander:
    1. `aria-controls` a parent block with `[role="treeitem"][expanded="true"]`.
    1. `aria-controls` a sibling block with `[role="group"][aria-hidden="false"]`.
    1. anchor links to a sibling block with `[role="group"][aria-hidden="false"]`. Clicking the expander jumps the page down to the top of the anchor-linked block.

## When JavaScript is available

* Each expander:
    1. `aria-controls` a parent block with `[role="treeitem"][expanded="false"]`. Clicking the expander expands the block via `[aria-expanded="true"]`.
    1. `aria-controls` a sibling block with `[role="group"][aria-hidden="true"]`. Clicking the expander displays the block via `[aria-hidden="false"]`.



