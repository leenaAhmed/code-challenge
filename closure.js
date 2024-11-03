// Memoization
/* 

 SON.stringify(args): Converts the arguments to a string, creating a unique key for each set of arguments. 
 This way, even if different objects or arrays are used as arguments, they can be uniquely identified in the cache.
*/

function memoize(fn) {

    let cache = {}
    // return inner fn
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key]
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    }
}

// The Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the previous two.
function fibonacci(n) {
    if (n <= 1) {
      return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  
  
const memoizedFibonacci = memoize(fibonacci(5));


// Write a function called once that takes a function as an argument and returns a new function.
// The new function should only call the original function once and return its result for subsequent calls.

function once(fn) {
    let isCalled = false;
    let result;
    return function (...args) {
        if (!isCalled) {
            result = fn.call(this, ...args);
            isCalled = true
        }
        return result;
    }
}
   
function expensiveOperation() {
     console.log("Executing expensive operation...");
     return "Result";
}
   
const executeOnce = once(expensiveOperation);
console.log(executeOnce()); 
console.log(executeOnce()); // Result


//  Limit api calls

/*
    Create a function called limitCalls that takes a function and a maximum number of calls as arguments. 
   The function should return a closure that only invokes the original function up to the specified maximum number of times.
*/

function limitCalls(fn, maximum) {
    let count = 0;
    return function (...args) {
        if (count < maximum) {
            ++count
            return fn.apply(this, args);
        }
        else if (count <= maximum) {
             console.log("Maximum number of calls reached!")
        }
    }
}
function logMessage(message) {
    console.log(message);
}
  
  const limitedLogMessage = limitCalls(logMessage, 3);
  
limitedLogMessage('Hello'); // Output: Hello
limitedLogMessage('World'); // Output: World
limitedLogMessage('OpenAI'); // Output: OpenAI
limitedLogMessage('Extra call'); // Output: Maximum number of calls reached!
  


/*
 Write a function called compose that accepts multiple functions as arguments and returns a new function.
 The new function should apply the input functions in reverse order, 
 passing the result of each function call as an argument to the next.
 
 */

 function compose(...fun) {
     return function (number) { 
         // acc = 10 , func = double  =>  acc = 20
         // acc = 20 , func = square => acc = 400
         // acc = 400 , func = increment => acc = 401
         return fun.reduceRight((acc, func) => {
             console.log(func(acc))
            return func(acc)
         }, number);
    }
 }

 function double(x) {
    return x * 2; //1: 20 
  }
  function square(x) {
    return x * x; // 2: 400
  }  
  
  function increment(x) {
    return x + 1; //3:  401
  }
  
const composedFunction = compose(increment, square, double);
const result = composedFunction(10);  
console.log(result);


function outer() {
    var x = 10;
  
    function inner() {
      console.log(x); // 10
    }
  
    x = 20;
    return inner; //20
  }
  
  var closureFunc = outer();
closureFunc(); // 20
  

