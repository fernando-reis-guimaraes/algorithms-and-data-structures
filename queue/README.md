# Queue

A linked FIFO queue with `enqueue(value)`, `dequeue()`, `peek()` and `isEmpty()`.

The queue keeps references to its first and last nodes, so enqueue and dequeue take O(1) time. Both `peek` and `dequeue` return node objects containing `value`; dequeuing an empty queue returns `undefined`.

The field named `previous` links a node to the following item in queue order.

Run: `node queue/index.mjs`.
