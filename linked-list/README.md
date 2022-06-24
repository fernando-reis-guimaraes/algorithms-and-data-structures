# Singly linked list

A singly linked list with `push`, `unshift`, `itemAt`, `insertAt`, `shift`, `pop`, `removeAt` and `reverse`.

`push` and single-value `unshift` take O(1). Index-based operations, `pop` and `reverse` are O(n). When empty, the implementation keeps a placeholder head node with a `null` value.

One intentional difference from `Array.unshift`: passing several values to `unshift` prepends them one by one, so `unshift(1, 2)` puts `2` first.

Run: `node linked-list/index.mjs`.
