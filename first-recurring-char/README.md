# First recurring character

`firstRecurringChar(array)` returns the first item encountered for a second time, or `undefined` when no item repeats.

It uses an object with no prototype to track previously seen values. For ordinary string/number arrays the algorithm takes O(n) time and O(n) space. As with object-keyed maps, values of different types can share the same string key.

Run: `node first-recurring-char/index.mjs`.
