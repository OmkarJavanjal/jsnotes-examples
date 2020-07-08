
//**************************************************************

//Topic- Advanced working with functions

//---------------------------------------------------------------//
//6.1- Recursion and stack

function pow(x, n) {
  let result = 1;

  // multiply result by x n times in the loop
  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

console.log( pow(2, 3) ); // 8

//Recursive thinking: simplify the task and call self:
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}

console.log( pow(2, 3) ); // 8

//shorter way
function pow(x, n) {
  return (n == 1) ? x : (x * pow(x, n - 1));
}

//When a function makes a nested call, the following happens:
// The current function is paused.
// The execution context associated with it is remembered in a special data structure called execution context stack.
// The nested call executes.
// After it ends, the old execution context is retrieved from the stack, and the outer function is resumed from where it stopped.

//Recursive traversals
let company = { // the same object, compressed for brevity
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// The function to do the job
function sumSalaries(department) {
  if (Array.isArray(department)) { // case (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
  } else { // case (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
    }
    return sum;
  }
}

console.log(sumSalaries(company));

//Linked list
// The “delete element” and “insert element” operations are expensive. For instance, arr.unshift(obj) operation has to renumber all elements to make room for a new obj, and if the array is big, it takes time. Same with arr.shift().

// The only structural modifications that do not require mass-renumbering are those that operate with the end of array: arr.push/pop. So an array can be quite slow for big queues, when we have to work with the beginning.

// Alternatively, if we really need fast insertion/deletion, we can choose another data structure called a linked list.

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;

//Tasks:
//Sum all numbers till the given one
// Make 3 solution variants:

// Using a for loop.
// Using a recursion, cause sumTo(n) = n + sumTo(n-1) for n > 1.
// Using the arithmetic progression formula.

function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

console.log( sumTo(100) );

function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

console.log( sumTo(100) );

function sumTo(n) {
  return n * (n + 1) / 2;
}

console.log( sumTo(100) );

//Calculate factorial
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

console.log( factorial(5) ); // 120
//OR
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

console.log( factorial(5) ); // 120

//Fibonacci numbers
//returns last element-
var looping = function(n) {
  var a =0, b=1,f=1;
  for(var i=2; i<=n; i++) {
    f=a+b;
    a=b;
    b=f;
  }
  return f;
}
console.log(looping(3)); //returns 2. fib starts like 1,1,2,3,5...

function fib(n){  //returns fib series
  let arr = [0,1];
  for (let i = 2; i < n + 1; i++){
    arr.push(arr[i - 2] + arr[i -1])
  }
 return arr
}
console.log(fib(4));//returns [0,1,1,2,3] //array series starts with 0 like [0,1,1,2,]

function fib(n){  //returns fib series
  let arr = [1,1];
  for (let i = 2; i < n ; i++){
    arr.push(arr[i - 2] + arr[i -1])
  }
 return arr
}
console.log(fib(4)); //returns [1,1,2,3]

function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log( fib(3) ); // 2
console.log( fib(7) ); // 13

function fib2(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

console.log( fib2(3) ); // 2
console.log( fib2(7) ); // 13

//Output a single-linked list
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) { //recursion
  console.log(list.value); // output the current item
  if (list.next) {
    printList(list.next); // do the same for the rest of the list
  }
}

printList(list);

//or
function printList2(list) {
 while(list) {
  console.log(list.value); // output the current item
  list=list.next;
 }
}

printList2(list);

//prints in reverse order
function printList(list) { //recursion
  
  if (list.next) {
    printList(list.next); // do the same for the rest of the list
  }
  console.log(list.value); // output the current item
}