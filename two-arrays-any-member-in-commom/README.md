# Common item in two arrays

`isThereAnyCommomItemInArrays(array1, array2)` returns `true` if the arrays share at least one value.

The first array is indexed in an object with no prototype, then the second is checked against it. For ordinary string/number arrays, time is O(n + m) and space is O(n). Because object keys are strings, mixed types can collide.

The function name and directory spelling are kept from the original exercise.

Run: `node two-arrays-any-member-in-commom/index.mjs`.
