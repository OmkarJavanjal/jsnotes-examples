//Topic- Advanced working with functions
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
