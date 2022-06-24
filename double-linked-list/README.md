# Doubly linked list

A linked list whose nodes have `next` and `previous` references.

`new LinkedList(value)` starts with one node. It supports `append`, `prepend`, `insert(index, value)`, `remove(index)` and printing in either direction. After removing every node, the list is empty and can be reused.

Appending and prepending are O(1). Indexed insertions and removals are O(n). An insertion beyond the end appends; removal past the end throws.

Run: `node double-linked-list/index.mjs`.
