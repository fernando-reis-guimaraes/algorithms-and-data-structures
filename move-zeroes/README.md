# Move zeroes

`moveZeroes(nums)` moves zeroes to the end of an array while keeping the relative order of the other elements.

It changes the input array and returns that same array. The solution removes each zero with `splice` and appends it with `push`. Since `splice` shifts elements, worst-case time is O(n²).

Run: `node move-zeroes/index.mjs`.
