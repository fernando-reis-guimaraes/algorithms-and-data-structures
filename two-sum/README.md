# Two sum

`twoSum(nums, target)` returns two distinct numeric indices whose values add up to `target`, or `undefined` if there is no match.

It indexes the numeric array by value, then searches for a complement. The map is built using object spread in `reduce`, making the construction O(n²) in the worst case, with O(n) additional space.

Run: `node two-sum/index.mjs`.
