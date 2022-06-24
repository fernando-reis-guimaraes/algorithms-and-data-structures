// Given a number N return the index value of the Fibonacci sequence, where the sequence is:

// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ...
// the pattern of the sequence is that each value is the sum of the 2 previous values, that means that for N=5 → 2+3

//For example: fibonacciRecursive(6) should return 8

function fibonacciIterative(indexWanted) {
  if (!Number.isInteger(indexWanted) || indexWanted < 0) return;

  if (indexWanted < 2) {
    return indexWanted;
  }

  let lastIndex = 1,
    lastFibonacci = 1,
    lastButOneFibonacci = 0;

  while (true) {
    if (indexWanted === lastIndex + 1) {
      return lastButOneFibonacci + lastFibonacci;
    }

    const currentFibonacci = lastButOneFibonacci + lastFibonacci;

    lastIndex = lastIndex + 1;
    lastButOneFibonacci = lastFibonacci;
    lastFibonacci = currentFibonacci;
  }
}

let index = 4;
while (index < 10) console.log(fibonacciIterative(index++));

function fibonacciRecursive(indexWanted, { lastIndex = 1, lastFibonacci = 1, lastButOneFibonacci = 0 } = {}) {
  if (!Number.isInteger(indexWanted) || indexWanted < 0) return;

  if (indexWanted < 2) {
    return indexWanted;
  }

  if (indexWanted === lastIndex + 1) {
    return lastButOneFibonacci + lastFibonacci;
  }

  const currentFibonacci = lastButOneFibonacci + lastFibonacci;

  return fibonacciRecursive(indexWanted, {
    lastIndex: lastIndex + 1,
    lastButOneFibonacci: lastFibonacci,
    lastFibonacci: currentFibonacci,
  });
}

index = 0;
while (index < 10) console.log(fibonacciRecursive(index++));
