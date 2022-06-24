# Factorial

Two implementations: `findFactorialRecursive(number)` and `findFactorialIterative(number)`.

Both accept non-negative integers, return `1` for `0!`, and return `undefined` for invalid inputs. They take O(n) time. The iterative version uses O(1) extra space; the recursive version uses O(n) call-stack space.

Results use JavaScript `Number`, so large factorials lose integer precision and eventually overflow.

Run: `node factorial/index.mjs`.
