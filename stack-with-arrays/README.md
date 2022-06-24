# Stack with arrays

An array-backed LIFO stack with `push`, `pop`, `peek` and `isEmpty`.

The `top` and `bottom` properties store values, not node objects. `peek` returns the top value; `pop` returns and removes it, or returns `undefined` if empty.

Push is amortized O(1), pop and peek are O(1), and storage grows with the number of items.

Run: `node stack-with-arrays/index.mjs`.
