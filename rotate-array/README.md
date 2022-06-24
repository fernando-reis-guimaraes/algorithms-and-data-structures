# Rotate array

`rotate(nums, k)` rotates an array to the right by `k` positions. It modifies and returns the input array.

The implementation repeats `pop()` and `unshift()` for each rotation. It takes O(k × n) time and is intended for non-negative integer `k`; large rotation counts are not reduced modulo the array length.

An empty array is returned unchanged.

Run: `node rotate-array/index.mjs`.
