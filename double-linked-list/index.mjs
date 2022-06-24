class LinkedList {
  constructor(value) {
    this.head = {
      value: value,
      next: null,
      previous: null
    };
    this.tail = this.head;
    this.length = 1;
  }
  append(value) {
    const newTail = {
      value,
      next: null,
      previous: this.tail,
    }

    if (this.length === 0) {
      this.head = newTail;
    } else {
      this.tail.next = newTail;
    }
    this.tail = newTail;
    this.length++;
  }
  prepend(value) {
    const newHead = {
      value,
      next: this.head,
      previous: null,
    }

    if (this.length === 0) {
      this.tail = newHead;
    } else {
      this.head.previous = newHead;
    }
    this.head = newHead;
    this.length++;
  }
  insert(index, value) {
    if (index < 1) {
      return this.prepend(value);
    }

    if (index >= this.length) {
      return this.append(value);
    }
        
    let previousNode = this.head;
    let currentNode = this.head.next;
    let currentIndex = 1;

    while(currentIndex < index) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }

    const newNode = {
      value,
      next: currentNode,
      previous: previousNode,
    }

    previousNode.next = newNode;    
    currentNode.previous = newNode;
    this.length++;
  }
  remove(index) {
    if (index < 1) {
      if (this.length === 0) return;

      this.head = this.head.next;
      this.length--;

      if (this.length === 0) {
        this.tail = null;
      } else {
        this.head.previous = null;
      }
      return;
    }

    if (index >= this.length) {
      throw new Error('index out of range');
    }
        
    let previousNode = this.head;
    let currentNode = this.head.next;
    let currentIndex = 1;

    while(currentIndex < index) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }

    previousNode.next = currentNode.next;
    if (currentNode.next === null) {
      this.tail = previousNode;
    } else {
      currentNode.next.previous = previousNode;
    }
    this.length--;
  }
  printList(label = 0) {
    const array = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }

    console.log(label, array.join(' > '));
  }
  printListReverse(label = 0) {
    const array = [];
    let currentNode = this.tail;

    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.previous;
    }

    console.log(label, array.join(' < '));
  }
}
// 1 > 10 > 5 > 16
// 1 > 10 > 99 > 5 > 16

let myLinkedList = new LinkedList(10);
myLinkedList.printList(1);

myLinkedList.append(5);
myLinkedList.printList(2);
myLinkedList.printListReverse(2);
console.log('');

myLinkedList.append(16);
myLinkedList.printList(3);
myLinkedList.printListReverse(3);
console.log('');

myLinkedList.prepend(1);
myLinkedList.printList(4);
myLinkedList.printListReverse(4);
console.log('');

myLinkedList.append(99);
myLinkedList.printList(5);
myLinkedList.printListReverse(5);
console.log('');

myLinkedList.insert(2, 99);
myLinkedList.printList(6);
myLinkedList.printListReverse(6);
console.log('');

myLinkedList.insert(20, 88);
myLinkedList.printList(7);
myLinkedList.printListReverse(7);
console.log('');

myLinkedList.insert(0, -1);
myLinkedList.printList(8);
myLinkedList.printListReverse(8);
console.log('');

myLinkedList.remove(0);
myLinkedList.printList(9);
myLinkedList.printListReverse(9);
console.log('');

myLinkedList.remove(2);
myLinkedList.printList(0);
myLinkedList.printListReverse(0);
console.log('');
