class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    if (this.root === null) {
      this.root = {
        value,
        left: null,
        right: null,
      };
      return;
    }

    let currentNode = this.root;

    while (true) {
      if (
        currentNode.left === null &&
        currentNode.right === null &&
        value < currentNode.value
      ) {
        currentNode.left = { value, left: null, right: null };
        break;
      } else if (
        currentNode.left === null &&
        currentNode.right === null &&
        value > currentNode.value
      ) {
        currentNode.right = { value, left: null, right: null };
        break;
      } else if (
        currentNode.left !== null &&
        currentNode.right === null &&
        value > currentNode.value
      ) {
        currentNode.right = { value, left: null, right: null };
        break;
      } else if (
        currentNode.left !== null &&
        currentNode.right === null &&
        value < currentNode.value
      ) {
        currentNode = currentNode.left;
      } else if (
        currentNode.right !== null &&
        currentNode.left === null &&
        value < currentNode.value
      ) {
        currentNode.left = { value, left: null, right: null };
        break;
      } else if (
        currentNode.right !== null &&
        currentNode.left === null &&
        value > currentNode.value
      ) {
        currentNode = currentNode.right;
      } else if (
        currentNode.left !== null &&
        currentNode.right !== null &&
        value > currentNode.value
      ) {
        currentNode = currentNode.right;
      } else if (
        currentNode.left !== null &&
        currentNode.right !== null &&
        value < currentNode.value
      ) {
        currentNode = currentNode.left;
      } else {
        throw new Error("it should be impossible");
      }
    }
  }
  lookup(value) {
    if (this.root === null) {
      return null;
    }

    if (this.root === value) {
      return this.root;
    }

    let currentNode = this.root;
    let previousNode = null;

    while (true) {
      if (value < currentNode.value) {
        if (currentNode.left === null) return null;
        previousNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        if (currentNode.right === null) return null;
        previousNode = currentNode;
        currentNode = currentNode.right;
      } else {
        return { currentNode, previousNode };
      }
    }
  }
  remove(value) {
    const node = this.lookup(value);

    if (node === null) return;

    let { currentNode: theNode, previousNode } = node;
    let side = "right";

    if (previousNode === null) {
      previousNode = this;
      side = "root";
    } else if (previousNode.left === theNode) {
      side = "left";
    }

    if (theNode.right === null && theNode.left === null) {
      previousNode[side] = null;
      return;
    } 
    
    if (theNode.right === null && theNode.left !== null) {
      previousNode[side] = theNode.left;
      return;
    } 
    
    if (theNode.right != null && theNode.left === null) {
      previousNode[side] = theNode.right;
      return;
    } 
    
    if (theNode.right != null && theNode.left !== null) {
      const theRight = theNode.right;
      
      if (theRight.left === null) {
        previousNode[side] = theRight;
        theRight.left = theNode.left;
        return;
      }
      
      const leftPath = [];
      let nextLeft = theRight;

      while (nextLeft.left !== null) {
        leftPath.push(nextLeft.left)
        nextLeft = nextLeft.left;
      }

      previousNode[side] = leftPath.pop();
      previousNode[side].left = theNode.left;

      let nextRight = previousNode[side];

      while (nextRight.right) {
        nextRight = nextRight.right;
      }

      while(leftPath.length > 0) {
        nextRight.right = leftPath.pop();
        nextRight.right.left = null;
        nextRight = nextRight.right;

        while (nextRight.right) {
          nextRight = nextRight.right;
        }
      }

      nextRight.right = theRight;
      nextRight.right.left = null;
    }
  }
}

const tree = new BinarySearchTree();
[50,25,75,12,36,60,100,35,40,30,39,44,37,38].forEach(num => tree.insert(num));
tree.remove(36);
console.log(JSON.stringify(traverse(tree.root), null, 2));

const tree2 = new BinarySearchTree();
[60,30,72,14,51,73,1,38,55,78,44,54,85,86,90,99].forEach(num => tree2.insert(num));
tree2.remove(51);
console.log(JSON.stringify(traverse(tree2.root), null, 2));



function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}