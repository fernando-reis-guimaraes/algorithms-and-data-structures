class LinkedList {
  constructor() {
    this.head = {
      value: null,
      next: null,
    };
    this.tail = this.head;
    this.length = 0;
  }
  push(...values) {
    const pushOne = (value) => {
      const newTail = {
        value,
        next: null,
      };

      if (this.length === 0) {
        this.head = newTail;
        this.tail = newTail;
        this.length++;
        return;
      }

      this.tail.next = newTail;
      this.tail = newTail;
      this.length++;
    };

    values.forEach(pushOne);
  }
  unshift(...values) {
    const unshiftOne = (value) => {      
      const newHead = {
        value,
        next: this.head,
      };

      if (this.length === 0) {
        newHead.next = null;
        this.head = newHead;
        this.tail = newHead;
        this.length = 1;
        return;
      }

      this.head = newHead;
      this.length++;
    };

    values.forEach(unshiftOne);
  }
  itemAt(index) {
    if (index < 1) {
      const { value: firstItem } = this.head;
      return firstItem;
    }

    if (index >= this.length) {
      return;
    }

    let previousNode = this.head;
    let currentNode = this.head.next;
    let currentIndex = 1;

    while (currentIndex < index) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }

    if (currentNode === null) {
      return;
    }

    const { value: item } = currentNode;
    return item;
  }
  insertAt(index, value) {
    if (index < 1) {
      return this.unshift(value);
    }

    if (index >= this.length) {
      return this.push(value);
    }

    let previousNode = this.head;
    let currentNode = this.head.next;
    let currentIndex = 1;

    while (currentIndex < index) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }

    const newNode = {
      value,
      next: currentNode,
    };

    previousNode.next = newNode;
    this.length++;
  }
  shift() {
    const { value: firstItem } = this.head;
    this.removeAt(0);
    return firstItem;
  }
  pop() {
    if (this.length === 0 ) {
      return;
    }

    if (this.length === 1) {
      const { value: onlyItem } = this.head;
      this.head.value = null;
      this.length = 0;
      return onlyItem;
    }

    let previousNode = this.head;
    let currentNode = this.head.next;
    let currentIndex = 1;

    while (currentIndex < this.length - 1) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }

    if (currentNode === null) {
      return;
    }

    const { value: lastItem } = currentNode;

    previousNode.next = null;
    this.length--;

    this.tail = previousNode;

    return lastItem;
  }
  removeAt(index) {
    if (index < 1) {
      if (this.length === 0) return;

      if (this.length === 1) {
        this.head.value = null;
      } else {
        this.head = this.head.next;
      }

      this.length--;
      return;
    }

    if (index >= this.length) {
      throw new Error("index out of range");
    }

    let previousNode = this.head;
    let currentNode = this.head.next;
    let currentIndex = 1;

    while (currentIndex < index) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }

    previousNode.next = currentNode.next;
    if (currentNode === this.tail) {
      this.tail = previousNode;
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

    console.log(label, ': ', array.join(" > "));
  }
  reverse() {
    let a = this.head;
    let b = this.head.next;
    this.tail = this.head;
    while (b) {
      let c = b.next;
      b.next = a;
      a = b;
      b = c;
    }
    this.head.next = null;
    this.head = a;
  }
}

const { log } = console;

let myLinkedList = new LinkedList();
myLinkedList.push(10)
myLinkedList.printList(1);

myLinkedList.push(5);
myLinkedList.printList(2);

myLinkedList.push(16, 1666);
myLinkedList.printList(3);

log(myLinkedList.shift());
myLinkedList.printList(4);

log('---');
log(myLinkedList.pop());
log('size: ', myLinkedList.length, myLinkedList.head, myLinkedList.tail);

log('---');
log(myLinkedList.pop());
log('size: ', myLinkedList.length, myLinkedList.head, myLinkedList.tail);

log('---');
log(myLinkedList.pop());
log('size: ', myLinkedList.length, myLinkedList.head, myLinkedList.tail);

log('---');
log(myLinkedList.pop());
log('size: ', myLinkedList.length, myLinkedList.head, myLinkedList.tail);

log('---');
myLinkedList.push(1);
log('size: ', myLinkedList.length, myLinkedList.head, myLinkedList.tail);

log('---');
myLinkedList.push(2);
log('size: ', myLinkedList.length, myLinkedList.head, myLinkedList.tail);
