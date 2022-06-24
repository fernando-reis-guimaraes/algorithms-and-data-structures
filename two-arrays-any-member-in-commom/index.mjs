const array1 = ["a", "b", "c", "x"];
const array2 = ["z", "y", "x"];

function isThereAnyCommomItemInArrays(array1, array2) {
  const objectA = Object.create(null);

  for (let itemA of array1) {
    objectA[itemA] = true;
  }

  for (let itemB of array2) {
    if (objectA[itemB]) {
      return true;
    }
  }

  return false;
}

console.time('datalgo');
console.log(isThereAnyCommomItemInArrays(array1, array2));
console.timeEnd('datalgo');
