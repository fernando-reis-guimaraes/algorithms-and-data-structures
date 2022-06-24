class MyStack {
  constructor() {
    this.array = [];
    this.length = 0;
    
    this.top = this.array[this.array.length - 1];
    this.bottom = this.array[0];
  }
  push(value) {
    this.array.push(value);
    this.top = value;
    this.bottom = this.array[0];
    this.length = this.array.length;
  }
  pop(value) {
    const element = this.array.pop(value);
    this.length = this.array.length;

    this.top = this.array[this.array.length - 1];
    this.bottom = this.array[0];
    return element;
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
