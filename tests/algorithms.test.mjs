import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createContext, runInContext } from 'node:vm';

function load(directory) {
  const source = readFileSync(new URL(`../${directory}/index.mjs`, import.meta.url), 'utf8');
  const context = createContext({ console: { log() {}, time() {}, timeEnd() {} } });
  runInContext(source, context, { timeout: 1000 });
  return expression => runInContext(expression, context, { timeout: 100 });
}

function assertList(list, values, doubly = false) {
  assert.equal(list.length, values.length);

  if (values.length === 0) {
    if (doubly) {
      assert.equal(list.head, null);
      assert.equal(list.tail, null);
    } else {
      assert.equal(list.head.value, null);
      assert.equal(list.head.next, null);
      assert.equal(list.tail, list.head);
    }
    return;
  }

  const nodes = [];
  let currentNode = list.head;
  let previousNode = null;

  while (currentNode !== null) {
    assert.ok(nodes.length < values.length);
    assert.equal(currentNode.value, values[nodes.length]);
    if (doubly) {
      assert.equal(currentNode.previous, previousNode);
    }
    nodes.push(currentNode);
    previousNode = currentNode;
    currentNode = currentNode.next;
  }

  assert.equal(nodes.length, values.length);
  assert.equal(list.tail, nodes[nodes.length - 1]);
  assert.equal(list.tail.next, null);

  if (doubly) {
    currentNode = list.tail;
    for (let index = nodes.length - 1; index >= 0; index--) {
      assert.equal(currentNode, nodes[index]);
      currentNode = currentNode.previous;
    }
    assert.equal(currentNode, null);
  }
}

function assertTree(tree, values) {
  const seen = new Set();
  const actual = [];

  function visit(node, lower, upper, parent) {
    if (node === null) return;
    assert.ok(!seen.has(node));
    seen.add(node);
    assert.ok(node.value > lower && node.value < upper);
    const result = tree.lookup(node.value);
    assert.equal(result.currentNode, node);
    assert.equal(result.previousNode, parent);
    visit(node.left, lower, node.value, node);
    actual.push(node.value);
    visit(node.right, node.value, upper, node);
  }

  visit(tree.root, -Infinity, Infinity, null);
  assert.deepEqual(actual, [...values].sort((a, b) => a - b));
}

const BinarySearchTree = load('binary-search-tree')('BinarySearchTree');

test('binary-search-tree: insertion, lookup and duplicate rejection', () => {
  const tree = new BinarySearchTree();
  assert.equal(tree.lookup(1), null);
  const values = [];
  for (const value of [0, -2, 2, -1, 1]) {
    tree.insert(value);
    values.push(value);
    assertTree(tree, values);
  }
  assert.equal(tree.lookup(3), null);
  assert.throws(() => tree.insert(0));
  assertTree(tree, values);
});

for (const [label, values, removed] of [
  ['left leaf', [2, 1, 3], 1],
  ['right leaf', [2, 1, 3], 3],
  ['left node with a left child', [5, 3, 7, 2], 3],
  ['left node with a right child', [5, 3, 7, 4], 3],
  ['right node with a left child', [5, 3, 7, 6], 7],
  ['right node with a right child', [5, 3, 7, 8], 7],
  ['left node with two children', [5, 3, 7, 2, 4], 3],
  ['right node with two children', [5, 3, 7, 6, 8], 7],
  ['successor with ancestor right subtrees', [1, 20, 10, 40, 30, 50, 25, 35, 22, 27, 26, 28, 33, 37, 23], 20],
  ['only root', [1], 1],
  ['root with a left child', [2, 1], 2],
  ['root with a right child', [1, 2], 1],
  ['root with two children', [2, 1, 3], 2],
  ['root with a deeper successor', [5, 2, 8, 6, 7, 9], 5],
]) {
  test(`binary-search-tree: remove ${label}`, () => {
    const tree = new BinarySearchTree();
    values.forEach(value => tree.insert(value));
    tree.remove(removed);
    assertTree(tree, values.filter(value => value !== removed));
    assert.equal(tree.lookup(removed), null);
  });
}

test('binary-search-tree: absent values and consecutive removals', () => {
  const tree = new BinarySearchTree();
  tree.remove(1);
  assertTree(tree, []);
  const values = [5, 3, 7, 2, 4, 6, 8];
  values.forEach(value => tree.insert(value));
  tree.remove(99);
  assertTree(tree, values);
  for (const value of [5, 2, 7, 3, 8, 4, 6]) {
    tree.remove(value);
    values.splice(values.indexOf(value), 1);
    assertTree(tree, values);
  }
  tree.remove(5);
  tree.insert(0);
  assertTree(tree, [0]);
});

test('binary-search-tree: every insertion and removal order for five values', () => {
  function permutations(values) {
    if (values.length === 0) return [[]];
    const result = [];
    for (const value of values) {
      for (const remaining of permutations(values.filter(item => item !== value))) {
        result.push([value, ...remaining]);
      }
    }
    return result;
  }

  const orders = permutations([1, 2, 3, 4, 5]);
  for (const inserted of orders) {
    for (const removed of orders) {
      const tree = new BinarySearchTree();
      inserted.forEach(value => tree.insert(value));
      const remaining = [...inserted];
      for (const value of removed) {
        tree.remove(value);
        remaining.splice(remaining.indexOf(value), 1);
        assertTree(tree, remaining);
      }
    }
  }
});

const DoubleLinkedList = load('double-linked-list')('LinkedList');

test('double-linked-list: middle insertion tracks length and both links', () => {
  const list = new DoubleLinkedList(1);
  list.append(3);
  list.insert(1, 2);
  assertList(list, [1, 2, 3], true);
});

for (const [label, index, expected] of [
  ['head', 0, [2, 3]],
  ['middle', 1, [1, 3]],
  ['tail', 2, [1, 2]],
]) {
  test(`double-linked-list: remove ${label}`, () => {
    const list = new DoubleLinkedList(1);
    list.append(2);
    list.append(3);
    list.remove(index);
    assertList(list, expected, true);
  });
}

for (const method of ['append', 'prepend', 'insert']) {
  test(`double-linked-list: empty removal and reuse with ${method}`, () => {
    const list = new DoubleLinkedList(1);
    list.remove(0);
    assertList(list, [], true);
    list.remove(0);
    assertList(list, [], true);
    if (method === 'insert') {
      list.insert(0, 2);
    } else {
      list[method](2);
    }
    assertList(list, [2], true);
  });
}

test('double-linked-list: consecutive operations and boundary indices', () => {
  const list = new DoubleLinkedList(2);
  list.insert(-1, 1);
  assertList(list, [1, 2], true);
  list.insert(20, 3);
  assertList(list, [1, 2, 3], true);
  list.insert(3, 3);
  assertList(list, [1, 2, 3, 3], true);
  assert.throws(() => list.remove(4), /index out of range/);
  assertList(list, [1, 2, 3, 3], true);
  for (const index of [1, 2, -1, 0]) {
    list.remove(index);
    if (index === 1) assertList(list, [1, 3, 3], true);
    if (index === 2) assertList(list, [1, 3], true);
    if (index === -1) assertList(list, [3], true);
    if (index === 0) assertList(list, [], true);
  }
});

const LinkedList = load('linked-list')('LinkedList');

test('linked-list: unshift on an empty list', () => {
  const list = new LinkedList();
  list.unshift(1);
  assertList(list, [1]);
  list.unshift(2, 3);
  assertList(list, [3, 2, 1]);
});

test('linked-list: insertion at zero increments length once', () => {
  const list = new LinkedList();
  list.insertAt(0, 1);
  assertList(list, [1]);
  list.insertAt(0, 2);
  assertList(list, [2, 1]);
});

test('linked-list: removing the tail permits another push', () => {
  const list = new LinkedList();
  list.push(1, 2);
  list.removeAt(1);
  assertList(list, [1]);
  list.push(3);
  assertList(list, [1, 3]);
});

test('linked-list: empty and singleton shift preserve head, tail and length', () => {
  const list = new LinkedList();
  assert.equal(list.shift(), null);
  assertList(list, []);
  list.push(1);
  assert.equal(list.shift(), 1);
  assertList(list, []);
  list.removeAt(0);
  assertList(list, []);
  list.unshift(2);
  assertList(list, [2]);
});

test('linked-list: itemAt, pop and reverse after consecutive operations', () => {
  const list = new LinkedList();
  assert.equal(list.itemAt(0), null);
  assert.equal(list.itemAt(1), undefined);
  assert.equal(list.pop(), undefined);
  list.reverse();
  assertList(list, []);
  list.push(1, 2, 2, 3);
  assertList(list, [1, 2, 2, 3]);
  list.reverse();
  assertList(list, [3, 2, 2, 1]);
  assert.equal(list.itemAt(-1), 3);
  assert.equal(list.itemAt(3), 1);
  assert.equal(list.itemAt(4), undefined);
  list.insertAt(2, 4);
  assertList(list, [3, 2, 4, 2, 1]);
  list.insertAt(20, 5);
  assertList(list, [3, 2, 4, 2, 1, 5]);
  assert.throws(() => list.removeAt(6), /index out of range/);
  list.removeAt(2);
  assertList(list, [3, 2, 2, 1, 5]);
  const values = [3, 2, 2, 1, 5];
  while (values.length > 0) {
    assert.equal(list.pop(), values.pop());
    assertList(list, values);
  }
  assertList(list, []);
  list.reverse();
  assertList(list, []);
  list.push(9);
  list.reverse();
  assertList(list, [9]);
});

test('queue: empty dequeue and consecutive operations', () => {
  const Queue = load('queue')('Queue');
  const queue = new Queue();
  assert.equal(queue.dequeue(), undefined);
  assert.equal(queue.length, 0);
  assert.equal(queue.first, null);
  assert.equal(queue.last, null);
  const values = [];
  for (const value of [0, 1, 1]) {
    queue.enqueue(value);
    values.push(value);
    assert.equal(queue.length, values.length);
    let currentNode = queue.first;
    for (let index = 0; index < values.length; index++) {
      assert.equal(currentNode.value, values[index]);
      if (index === values.length - 1) assert.equal(currentNode, queue.last);
      currentNode = currentNode.previous;
    }
    assert.equal(currentNode, null);
  }
  while (values.length > 0) {
    assert.equal(queue.dequeue().value, values.shift());
    assert.equal(queue.length, values.length);
    if (values.length > 0) {
      assert.equal(queue.peek().value, values[0]);
      assert.equal(queue.last.value, values[values.length - 1]);
      assert.equal(queue.last.previous, null);
    }
  }
  assert.equal(queue.first, null);
  assert.equal(queue.last, null);
  assert.equal(queue.dequeue(), undefined);
  assert.equal(queue.isEmpty(), true);
  queue.enqueue(2);
  assert.equal(queue.length, 1);
  assert.equal(queue.first, queue.last);
  assert.equal(queue.dequeue().value, 2);
  assert.equal(queue.length, 0);
  assert.equal(queue.first, null);
  assert.equal(queue.last, null);
});

test('stacks: empty pop and top, bottom, length after consecutive operations', () => {
  const MyStack = load('stacks')('MyStack');
  const stack = new MyStack();
  assert.equal(stack.pop(), undefined);
  assert.equal(stack.length, 0);
  assert.equal(stack.top, null);
  assert.equal(stack.bottom, null);
  const values = [];
  for (const value of [0, 1, 1]) {
    stack.push(value);
    values.unshift(value);
    assert.equal(stack.length, values.length);
    let currentNode = stack.top;
    for (let index = 0; index < values.length; index++) {
      assert.equal(currentNode.value, values[index]);
      if (index === values.length - 1) assert.equal(currentNode, stack.bottom);
      currentNode = currentNode.next;
    }
    assert.equal(currentNode, null);
  }
  while (values.length > 0) {
    assert.equal(stack.pop().value, values.shift());
    assert.equal(stack.length, values.length);
    if (values.length > 0) {
      assert.equal(stack.peek().value, values[0]);
      assert.equal(stack.bottom.value, values[values.length - 1]);
      assert.equal(stack.bottom.next, null);
    }
  }
  assert.equal(stack.top, null);
  assert.equal(stack.bottom, null);
  assert.equal(stack.pop(), undefined);
  assert.equal(stack.isEmpty(), true);
  stack.push(2);
  assert.equal(stack.length, 1);
  assert.equal(stack.top, stack.bottom);
  assert.equal(stack.pop().value, 2);
  assert.equal(stack.length, 0);
  assert.equal(stack.top, null);
  assert.equal(stack.bottom, null);
});

test('stack-with-arrays: bottom, top and length after consecutive operations', () => {
  const MyStack = load('stack-with-arrays')('MyStack');
  const stack = new MyStack();
  assert.equal(stack.pop(), undefined);
  for (const value of [0, 1, 1]) {
    stack.push(value);
    assert.equal(stack.bottom, 0);
    assert.equal(stack.top, value);
    assert.equal(stack.length, stack.array.length);
  }
  for (const value of [1, 1, 0]) {
    assert.equal(stack.pop(), value);
    assert.equal(stack.length, stack.array.length);
    assert.equal(stack.top, stack.array[stack.array.length - 1]);
    assert.equal(stack.bottom, stack.array[0]);
  }
  assert.equal(stack.isEmpty(), true);
  assert.equal(stack.pop(), undefined);
  stack.push(2);
  assert.equal(stack.bottom, 2);
  assert.equal(stack.peek(), 2);
});

const factorial = load('factorial');
for (const name of ['findFactorialRecursive', 'findFactorialIterative']) {
  for (const [input, expected] of [[0, 1], [1, 1], [2, 2], [5, 120]]) {
    test(`factorial: ${name}(${input})`, () => {
      assert.equal(factorial(`${name}(${input})`), expected);
    });
  }
  for (const input of ['-1', '1.5', 'NaN', 'Infinity', 'undefined', '"2"']) {
    test(`factorial: ${name} rejects ${input}`, () => {
      assert.equal(factorial(`${name}(${input})`), undefined);
    });
  }
}

const fibonacci = load('fibonnaci');
for (const name of ['fibonacciIterative', 'fibonacciRecursive']) {
  test(`fibonnaci: ${name} valid indices`, () => {
    const values = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    values.forEach((value, index) => assert.equal(fibonacci(`${name}(${index})`), value));
  });
  for (const input of ['-1', '2.5', 'NaN', 'Infinity', 'undefined', '"2"']) {
    test(`fibonnaci: ${name} rejects ${input}`, () => {
      assert.equal(fibonacci(`${name}(${input})`), undefined);
    });
  }
}

for (const item of ['toString', 'constructor', '__proto__']) {
  test(`first-recurring-char: prototype key ${item}`, () => {
    const firstRecurringChar = load('first-recurring-char')('firstRecurringChar');
    assert.equal(firstRecurringChar([item]), undefined);
    assert.equal(firstRecurringChar([item, item]), item);
  });
  test(`two-arrays-any-member-in-commom: prototype key ${item}`, () => {
    const common = load('two-arrays-any-member-in-commom')('isThereAnyCommomItemInArrays');
    assert.equal(common([], [item]), false);
    assert.equal(common([item], [item]), true);
    assert.equal(common([item], ['other']), false);
  });
}

test('first-recurring-char: empty, singleton and repeated values', () => {
  const firstRecurringChar = load('first-recurring-char')('firstRecurringChar');
  for (const values of [[], [1], [1, 2, 3]]) assert.equal(firstRecurringChar(values), undefined);
  assert.equal(firstRecurringChar([0, 0]), 0);
  assert.equal(firstRecurringChar([2, 1, 1, 2]), 1);
});

test('two-arrays-any-member-in-commom: empty, disjoint and repeated values', () => {
  const common = load('two-arrays-any-member-in-commom')('isThereAnyCommomItemInArrays');
  assert.equal(common([], []), false);
  assert.equal(common([0], []), false);
  assert.equal(common([1], [2]), false);
  assert.equal(common([0], [0]), true);
  assert.equal(common([1, 1, 2], [3, 2]), true);
});

for (const [label, nums, target, expected] of [
  ['numeric indices', [2, 7], 9, [0, 1]],
  ['index zero is a different element', [3, 2, 4], 6, [1, 2]],
  ['singleton cannot match itself', [3], 6, undefined],
  ['nonzero index cannot match itself', [1, 3], 6, undefined],
  ['duplicate values', [3, 3], 6, [0, 1]],
  ['zero values', [0, 0], 0, [0, 1]],
  ['negative values', [-1, -2, -3], -5, [1, 2]],
  ['empty array', [], 0, undefined],
  ['no solution', [1, 2], 10, undefined],
]) {
  test(`two-sum: ${label}`, () => {
    const twoSum = load('two-sum')('twoSum');
    const result = twoSum(nums, target);
    if (expected === undefined) {
      assert.equal(result, undefined);
    } else {
      assert.deepEqual(Array.from(result), expected);
      assert.notEqual(result[0], result[1]);
      assert.equal(nums[result[0]] + nums[result[1]], target);
    }
  });
}

test('contains-duplicate: empty, singleton, zero, negative and duplicate values', () => {
  const containsDuplicate = load('contains-duplicate')('containsDuplicate');
  for (const nums of [[], [0], [-1, 0, 1]]) assert.equal(containsDuplicate(nums), false);
  for (const nums of [[0, 0], [1, 1], [-1, 0, -1], [1, 2, 3, 1]]) {
    assert.equal(containsDuplicate(nums), true);
  }
});

test('merge-sorted-arrays: empty, singleton, duplicates and negative values', () => {
  const mergeSortedArrays = load('merge-sorted-arrays')('mergeSortedArrays');
  for (const [a, b] of [[[], []], [[1], []], [[], [1]], [[1], [1]], [[-3, 0, 4], [-2, 0, 5]]]) {
    const originalA = [...a];
    const originalB = [...b];
    assert.deepEqual(Array.from(mergeSortedArrays(a, b)), [...a, ...b].sort((x, y) => x - y));
    assert.deepEqual(a, originalA);
    assert.deepEqual(b, originalB);
  }
});

test('move-zeroes: empty, singleton, consecutive zeroes and stable order', () => {
  const moveZeroes = load('move-zeroes')('moveZeroes');
  for (const [nums, expected] of [
    [[], []], [[0], [0]], [[1], [1]], [[0, 0], [0, 0]],
    [[1, 0, 0], [1, 0, 0]], [[0, 1, 0, -1, 2, 0], [1, -1, 2, 0, 0, 0]],
  ]) {
    assert.equal(moveZeroes(nums), nums);
    assert.deepEqual(nums, expected);
  }
});

for (const [nums, k, expected] of [
  [[], 1, []], [[], 0, []], [[1], 5, [1]], [[1, 2, 3], 0, [1, 2, 3]],
  [[1, 2, 3], 3, [1, 2, 3]], [[1, 2, 3], 4, [3, 1, 2]], [[1, 1, 2], 2, [1, 2, 1]],
]) {
  test(`rotate-array: ${JSON.stringify(nums)}, k=${k}`, () => {
    const rotate = load('rotate-array')('rotate');
    assert.equal(rotate(nums, k), nums);
    assert.deepEqual(nums, expected);
  });
}
