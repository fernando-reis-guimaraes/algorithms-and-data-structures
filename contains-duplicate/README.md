# Contains duplicate

`containsDuplicate(nums)` returns `true` if a numeric array contains a repeated value, otherwise `false`.

The implementation builds an object keyed by the values and checks their recorded indices. It uses object spread inside `reduce`, so building the map can take O(n²) time; the map uses O(n) space.

Run: `node contains-duplicate/index.mjs`.
