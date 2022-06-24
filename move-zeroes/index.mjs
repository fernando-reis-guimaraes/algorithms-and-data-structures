const moveZeroes = (nums) => {
  let zerosMoved = 0;

  for (let index = 0; index < nums.length; index++) {
    if (nums.length - zerosMoved === index) {
      break;
    }

    if (nums[index] === 0) {
      nums.splice(index, 1);
      nums.push(0);
      index--;
      zerosMoved++;
    }
  }

  return nums;
};

console.log(moveZeroes([0, 0, 1, 0, 3, 12]));
