function findFactorialRecursive(number) {
  if (!Number.isInteger(number) || number < 0) return;
  if (number === 0 || number === 1) return 1;
  return number * findFactorialRecursive(number - 1);
}

function findFactorialIterative(number) {
  if (!Number.isInteger(number) || number < 0) return;
  if (number === 0) return 1;

  let result = number;

  for (let current = number - 1; current > 0; current--) {
    result = result * current;
  }

  return result;
}

console.log(findFactorialRecursive(5));
console.log(findFactorialIterative(5));
