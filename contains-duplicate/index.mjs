const containsDuplicate = (nums) => {
  const map = nums.reduce((previousValue, currentValue, currentIndex, array) => ({
    ...previousValue,
    [currentValue]: currentIndex
  }), {});

  return nums.some((num, index) => map[num] && map[num] !== index)
};

console.log(containsDuplicate([1,2,3,1]));
