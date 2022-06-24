class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }
  peek() {
    return this.first;
  }
  enqueue(value) {
    if (this.isEmpty()) {
      this.first = {
        value,
        previous: null
      }
      this.last = this.first;
      this.length++;
      return;
    }

    const newLast = {
      value,
      previous: null
    }

    this.last.previous = newLast;
    this.last = newLast;
    
    this.length++;
  }
  dequeue() {
    if (this.isEmpty()) return;

    const element = this.first;
    this.first = this.first.previous;
    this.length--;

    if (this.length === 0) {
      this.last = null;
    }

    return element;
  }
  isEmpty() {
    return this.length === 0;
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.dequeue());
console.log(queue.peek());
console.log(queue);
console.log(queue.dequeue());
console.log(queue);
console.log(queue.dequeue());
console.log(queue);
