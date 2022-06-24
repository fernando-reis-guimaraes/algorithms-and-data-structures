const rotate = (nums, k) => {
  if (nums.length === 0) return nums;

  for (let index = 0; index < k; index++) {
    const value = nums.pop();
    nums.unshift(value);
  }

  return nums;
};

console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3));
