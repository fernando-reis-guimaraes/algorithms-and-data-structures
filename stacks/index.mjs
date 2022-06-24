
class MyStack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }
  push(value) {
    if (this.isEmpty()) {
      this.top = {
        value,
        next: null
      }
      this.bottom = this.top;
      this.length = 1;
      return;        
    }

    const newNode = {
      value,
      next: this.top
    }

    this.top = newNode;
    this.length++;
  }
  pop() {
    if (this.isEmpty()) return;

    const topNode = this.top;
    this.top = this.top.next;
    this.length--;

    if (this.length === 0) {
      this.bottom = null;
    }

    return topNode;
  }
  peek() {
    return this.top;
  }
  isEmpty() {
    return this.length === 0;
  }
}

const myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.push(3);


console.log(myStack.pop());
console.log(myStack.peek());
console.log(myStack.pop());
console.log(myStack.pop());
