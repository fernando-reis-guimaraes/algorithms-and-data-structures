# Binary search tree

An unbalanced binary search tree with `insert(value)`, `lookup(value)` and `remove(value)`.

- `lookup` returns `{ currentNode, previousNode }` or `null`.
- Inserting a duplicate value throws an error.
- Removing a value that is not present does nothing.
- Removal handles leaves, one-child nodes, two-child nodes and the root.

Operations depend on the tree height: O(h), up to O(n) for an unbalanced tree. This is not a self-balancing BST.

Run: `node binary-search-tree/index.mjs`.
