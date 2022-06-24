# Linked stack

A LIFO stack implemented with linked nodes. It provides `push(value)`, `pop()`, `peek()` and `isEmpty()`.

The `top` and `bottom` properties point to nodes. `peek` and `pop` return node objects containing `value`; an empty `pop` returns `undefined`. Push and pop are O(1).

Run: `node stacks/index.mjs`.
