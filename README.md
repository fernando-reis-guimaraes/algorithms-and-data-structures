# Algorithms and Data Structures

JavaScript exercises I wrote while practicing algorithms and data structures. Each exercise is standalone. This is practice code, not a reusable library.

## Run

Node.js 18+ is sufficient. There are no dependencies to install.

```sh
node binary-search-tree/index.mjs
node --test tests/algorithms.test.mjs
```

Each folder contains an `index.mjs` with example calls. The test suite uses Node's built-in test runner.

## Exercises

| Exercise                                              | Implementation                                         |
| ----------------------------------------------------- | ------------------------------------------------------ |
| [Binary search tree](binary-search-tree/)             | Insert, lookup and remove in an unbalanced BST         |
| [Contains duplicate](contains-duplicate/)             | Check an array for repeated values                     |
| [Doubly linked list](double-linked-list/)             | Insert and remove with forward/backward links          |
| [Factorial](factorial/)                               | Iterative and recursive versions                       |
| [Fibonacci](fibonnaci/)                               | Iterative and recursive versions                       |
| [First recurring character](first-recurring-char/)    | Find the first value seen twice                        |
| [Singly linked list](linked-list/)                    | Push, unshift, insert, remove and reverse              |
| [Merge sorted arrays](merge-sorted-arrays/)           | Merge two sorted arrays                                |
| [Move zeroes](move-zeroes/)                           | Move zeroes to the end, preserving other values' order |
| [Queue](queue/)                                       | Linked FIFO queue                                      |
| [Rotate array](rotate-array/)                         | Rotate an array to the right                           |
| [Stack with arrays](stack-with-arrays/)               | Array-backed LIFO stack                                |
| [Stacks](stacks/)                                     | Linked LIFO stack                                      |
| [Common array item](two-arrays-any-member-in-commom/) | Check whether two arrays share a value                 |
| [Two sum](two-sum/)                                   | Find two distinct indices whose values sum to a target |

## Notes

Some use straightforward approaches with higher time complexity; each folder's README notes relevant trade-offs and input assumptions.

The tests cover empty inputs, boundary cases and several sequences of operations on the linked structures and binary search tree. Run them after changing any implementation.

