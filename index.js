
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

//------------------------------------------------------------------------//
//6.2 - Rest parameters and spread syntax

// Rest parameters ...
//****The rest parameters must be at the end

function sumAll(...args) { // args is the name for the array
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}
console.log( sumAll(1, 2, 3) ); // 6

function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // the rest go into titles array
  // i.e. titles = ["Consul", "Imperator"]
  console.log( titles[0] ); // Consul
  console.log( titles[1] ); // Imperator
  console.log( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");

//The “arguments” variable
//There is also a special array-like object named arguments that contains all arguments by their index.
//****Arrow functions do not have "arguments"
function showName() {
  console.log( arguments.length );
  console.log( arguments[0] );
  console.log( arguments[1] );

  // it's iterable
  // for(let arg of arguments) alert(arg);
}

// shows: 2, Julius, Caesar
showName("Julius", "Caesar");

// shows: 1, Ilya, undefined (no second argument)
showName("Ilya");

//Spread syntax
let arr = [3, 5, 1];
alert( Math.max(...arr) ); // 5 (spread turns array into a list of arguments)

let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];
alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25

let arr = [3, 5, 1];
let arr2 = [8, 9, 15];
let merged = [0, ...arr, 2, ...arr2];
alert(merged); // 0,3,5,1,2,8,9,15 (0, then arr, then 2, then arr2)

//***The spread syntax internally uses iterators to gather elements, the same way as for..of does.
//**In the examples above we used an array to demonstrate the spread syntax, but any iterable will do. 
let str = "Hello";
alert( [...str] ); // H,e,l,l,o

let str = "Hello";
alert( Array.from(str) ); // H,e,l,l,o // Array.from converts an iterable into an array
//** */ Array.from operates on both array-likes and iterables.
//** The spread syntax works only with iterables.

//Get a new copy of an array/object
let arr = [1, 2, 3];
let arrCopy = [...arr]; // spread the array into a list of parameters
                        // then put the result into a new array
// do the arrays have the same contents?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true
// are the arrays equal?
alert(arr === arrCopy); // false (not same reference)
// modifying our initial array does not modify the copy:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3

//Note that it is possible to do the same thing to make a copy of an object:
let obj = { a: 1, b: 2, c: 3 };
let objCopy = { ...obj }; // spread the object into a list of parameters
                          // then return the result in a new object
// do the objects have the same contents?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true
// are the objects equal?
alert(obj === objCopy); // false (not same reference)
// modifying our initial object does not modify the copy:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}

//----------------------------------------------------------------------------------//
//6.3- Variable scope
//Code blocks
//If a variable is declared inside a code block {...}, it’s only visible inside that block.
{
  // do some job with local variables that should not be seen outside
  let message = "Hello"; // only visible in this block
  alert(message); // Hello
}
alert(message); // Error: message is not defined


{
  // show message
  let message = "Hello";
  alert(message);
}
{
  // show another message
  let message = "Goodbye";
  alert(message);
}

//***Please note, without separate blocks there would be an error, if we use let with the existing variable name: */
// show message
let message = "Hello";
alert(message);
// show another message
let message = "Goodbye"; // Error: variable already declared
alert(message);

//For if, for, while and so on, variables declared in {...} are also only visible inside:
if (true) {
  let phrase = "Hello!";
  alert(phrase); // Hello!
}
alert(phrase); // Error, no such variable!

//Nested functions
// A function is called “nested” when it is created inside another function.
// It is easily possible to do this with JavaScript.
function makeCounter() {
  let count = 0;
  return function() {
    return count++;
  };
}
let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1

//Task
function Counter() {
  let count = 0;
  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}
let counter = new Counter();
alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1


/*let phrase = "Hello";
if (true) {
  let user = "John";
  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}
sayHi();
The result is an error.
The function sayHi is declared inside the if, so it only lives inside it. There is no sayHi outside.
*/

function sum(a) {
  return function(b) {
    return a + b; // takes "a" from the outer lexical environment
  };
}
alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4

/*
let x = 1;

function func() {
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
  let x = 2;
}
func();
 */

function inBetween(a, b) {
  return function(x) {
    return x >= a && x <= b;
  };
}
let arr = [1, 2, 3, 4, 5, 6, 7];
alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6


function inArray(arr) {
  return function(x) {
    return arr.includes(x);
  };
}

let arr = [1, 2, 3, 4, 5, 6, 7];
alert( arr.filter(inArray([1, 2, 10])) ); // 1,2



let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
function byField(fieldName){
  return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
}
users.sort(byField('name'));
users.sort(byField('age'));



function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // shooter function
      alert( i ); // should show its number
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // the shooter number 0 shows 10
army[5](); // and number 5 also outputs 10...
// ... all shooters show 10 instead of their 0, 1, 2, 3...

//solution to this is 
function makeArmy() {

  let shooters = [];

  for(let i = 0; i < 10; i++) {
    let shooter = function() { // shooter function
      alert( i ); // should show its number
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5

//or

function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let j = i;
    let shooter = function() { // shooter function
      alert( j ); // should show its number
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5


//-----------------------------------------------------------------------------------//
//The old "var"
//***“var” has no block scope
if (true) {
  var test = true; // use "var" instead of "let"
}
alert(test); // true, the variable lives after if

if (true) {
  let test = true; // use "let"
}
alert(test); // Error: test is not defined

//***The same thing for loops: var cannot be block- or loop-local:
for (var i = 0; i < 10; i++) {
  // ...
}
alert(i); // 10, "i" is visible after loop, it's a global variable

//***If a code block is inside a function, then var becomes a function-level variable: */
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // works
}

sayHi();
//alert(phrase); // Error: phrase is not defined (Check the Developer Console)


//**“var” tolerates redeclarations */
let user;
let user; // SyntaxError: 'user' has already been declared


var user = "Pete";
var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error
alert(user); // John

//***“var” variables can be declared below their use */
function sayHi() {
  phrase = "Hello";
  alert(phrase);
  var phrase;
}
sayHi();

//…Or even as this (remember, code blocks are ignored):
function sayHi() {
  phrase = "Hello"; // (*)
  if (false) {
    var phrase;
  }
  alert(phrase);
}
sayHi()

//**Declarations are hoisted, but assignments are not.
function sayHi() {
  alert(phrase);  //undefined
  var phrase = "Hello";
}
sayHi();

//IIFE
/***As in the past there was only var, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called “immediately-invoked function expressions” (abbreviated as IIFE). */

(function() {

  let message = "Hello";

  alert(message); // Hello

})();
// Ways to create IIFE

(function() {
  alert("Parentheses around the function");
})();

(function() {
  alert("Parentheses around the whole thing");
}());

!function() {
  alert("Bitwise NOT operator starts the expression");
}();

+function() {
  alert("Unary plus starts the expression");
}();


//----------------------------------------------------------------//
//6.5- Global object
//**All properties of the global object can be accessed directly:
alert("Hello");
// is the same as
window.alert("Hello");

//**In a browser, global functions and variables declared with var (not let/const!) become the property of the global object: */
var gVar = 5;
alert(window.gVar); // 5 (became a property of the global object)

let gLet = 5;
alert(window.gLet); // undefined (doesn't become a property of the global object)

//**If a value is so important that you’d like to make it available globally, write it directly as a property:
// make current user information global, to let all scripts access it
window.currentUser = {
  name: "John"
};
// somewhere else in code
alert(currentUser.name);  // John
// or, if we have a local variable with the name "currentUser"
// get it from window explicitly (safe!)
alert(window.currentUser.name); // John


//-----------------------------------------------------------------//

//6.6- Function object, NFE

//***The “name” property
//a function’s name is accessible as the “name” property:

let sayHi = function() {
  alert("Hi");
};
alert(sayHi.name); // sayHi (there's a name!)

// The “length” property
//*** */ There is another built-in property “length” that returns the number of function parameters, for instance:
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}
alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2


//Custom properties
//We can also add properties of our own.
function makeCounter() {
  // instead of:
  // let count = 0
  function counter() {
    return counter.count++;
  };
  counter.count = 0;
  return counter;
}
let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1


function makeCounter() {
  function counter() {
    return counter.count++;
  };
  counter.count = 0;
  return counter;
}
let counter = makeCounter();
counter.count = 10;
alert( counter() ); // 10


//Named Function Expression
//ordinary Function Expression:
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};

//Named Function Expression
let sayHi = function func(who) {
  alert(`Hello, ${who}`);
};

/***
 * There are two special things about the name func, that are the reasons for it:
It allows the function to reference itself internally.
It is not visible outside of the function.
 */
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // use func to re-call itself
  }
};
sayHi(); // Hello, Guest
// But this won't work:
func(); // Error, func is not defined (not visible outside of the function)


//**We can do this also
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    sayHi("Guest");
  }
};

//but the issue is if we change sayHI in further code it may give error:
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    sayHi("Guest"); // Error: sayHi is not a function
  }
};
let welcome = sayHi;
sayHi = null;
welcome(); // Error, the nested sayHi call doesn't work any more!


//now it is fine
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // Now all fine
  }
};
let welcome = sayHi;
sayHi = null;
welcome(); // Hello, Guest (nested call works)


//Tasks

/**
 * Set and decrease for counter
 * Modify the code of makeCounter() so that the counter can also decrease and set the number:

counter() should return the next number (as before).
counter.set(value) should set the counter to value.
counter.decrease() should decrease the counter by 
 */
function makeCounter() {
  let count = 0;

  function counter() {
    return count++;
  }
  counter.set = value => count = value;
  counter.decrease = () => count--;
  return counter;
}

//Sum with an arbitrary amount of brackets
function sum(a) {
  let currentSum = a;
  function f(b) {
    currentSum += b;
    return f;
  }
  f.toString = function() {
    return currentSum;
  };
  return f;
}
alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6

//or
function sum(a) {
let total = b => b ? sum(a+b): a;
total.toString = () => a;
return total;
}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6

//if we add additional bracket at the end
function sum(a) {
let total = b => b ? sum(a+b): a;
return total;
}
alert( sum(1)(2)() ); // 3
alert( sum(5)(-1)(2)() ); // 6

//--------------------------------------------------------------------------//
//6.6- The "new Function" SyntaxError
let func = new Function ([arg1, arg2, ...argN], functionBody);

let sum = new Function('a', 'b', 'return a + b');
alert( sum(1, 2) ); // 3



