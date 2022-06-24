const arrayA = [0, 3, 4, 310];
const arrayB = [4, 6, 30, 50, 60];

function mergeSortedArrays(arrayA, arrayB) {
  const arrayC = [];
  let indexA = 0;
  let indexB = 0;

  while(true) {
    const itemA = arrayA[indexA];
    const itemB = arrayB[indexB];

    if (indexA === arrayA.length) {
      while(indexB < arrayB.length) {
        const nextB = arrayB[indexB];
        arrayC.push(nextB);
        indexB++;
      }

      return arrayC;
    }

    if (indexB === arrayB.length) {
      while(indexA < arrayA.length) {
        const nextA = arrayA[indexA];
        arrayC.push(nextA);
        indexA++
      }

      return arrayC;
    }

    if (itemA < itemB) {
      arrayC.push(itemA);
      indexA++;
    } else {
      arrayC.push(itemB);
      indexB++;
    }
  }
}

console.log(mergeSortedArrays(arrayA, arrayB));
