const twoSum = (nums, target) => {
  const map = nums.reduce(
    (previousValue, currentValue, currentIndex) => ({
      ...previousValue,
      [currentValue]: currentIndex,
    }),
    {}
  );

  for (const index in nums) {
    const num = nums[index];
    const partB = target - num;

    if (map[partB] !== undefined && map[partB] !== Number(index)) {
      const otherIndex = map[partB];
      return [Number(index), otherIndex];
    }
  }
};

console.log(twoSum([1, 11, 15, 2, 7, 99], 9));
