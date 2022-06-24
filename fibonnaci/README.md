# Fibonacci

`fibonacciIterative(indexWanted)` and `fibonacciRecursive(indexWanted)` compute the value at a zero-based Fibonacci index.

Both use running previous values rather than naive repeated branching: O(n) time, with O(1) extra space for the iterative version and O(n) call-stack space for the recursive version. Negative or non-integer indices return `undefined`.

Large results eventually exceed JavaScript `Number` integer precision.

Run: `node fibonnaci/index.mjs`.
