/*
  --Closure--
    To understand closures better, we need to grasp the concept of lexical scope. 
    Lexical scope means that variables are resolved based on their position in the source code,
    at the time the code is written, rather than at runtime.
    This static scoping mechanism allows inner functions to access variables from their enclosing function, creating closures.


  --Use Cases for Closures: --
            Data Encapsulation: Closures enable encapsulating data and providing controlled access through functions. 
                                This helps in building modular and reusable code.
            Function Factories: Closures can be used to create specialized functions based on a shared template, 
                                 with each function having its own private state.
            Event Handlers: Closures are widely used in event-driven programming to preserve the context of an event handler and maintain access to relevant data.
*/


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


/*
Be mindful of memory usage: 
                Closures retain the entire lexical environment, including variables and functions,
                even if they are no longer needed.Be cautious when using closures in long - lived or recursive functions,
                as they can lead to memory leaks if not managed properly.

Minimize shared mutable state:
                Closures that share mutable state can introduce unexpected bugs and make your code harder to reason about.
                Whenever possible, strive for immutability and minimize shared mutable state within closures.

Understand scoping and variable lifetime:
                Closures can cause variables to live longer than expected if they are referenced by an active closure. 
                Be aware of variable lifetimes and ensure that your code behaves as intended.
 */



// 1. Closures Retaining the Lexical Environment

function leakyFunction() {
    let largeData = new Array(100).fill("large data for leaky function");

    function leakyRecursive(counter) {
         if (counter > 0) {
             console.log("Leaking" ,largeData[counter])
             return leakyRecursive(counter - 1);
         }
    }
    return leakyRecursive(5);
}

let func = leakyFunction(); // `largeData` is retained in memory


// solve this

function recursiveFunction(counter , data) {
    if (counter > 0) {
        console.log("solve - " ,data[counter])
        return recursiveFunction(counter - 1 , data);
    }
}

function optimizedFunction() {
    let largeData = new Array(100).fill("optimizedFunction");
    return recursiveFunction(3,largeData)
}

let func2 = optimizedFunction(); // `largeData` is not retained after function execution


// 2. Minimize Shared Mutable State


function createCounter() {
    let counter = 0;

    return {
        increment: function () {
            counter++
            return counter 
        },
        decrement: function () {
            counter--
            return counter;
        }
    }
}

const counter1 = createCounter();
console.log(counter1.increment()); // 1
console.log(counter1.increment()); // 2

const counter2 = createCounter();
console.log(counter2.decrement()); // -1, counter state is confusing if shared


// solve it

function solveCreateCounter() {
    let counter = 0;

    return {
        increment: ()=> {
            let newcounter = counter + 1;
            counter = newcounter
            return newcounter 
        },
        decrement: ()=> {
            let newcounter = counter - 1;
            counter = newcounter;
            return newcounter;
        }
    }
}

const counter3 = solveCreateCounter();
console.log(counter3.increment()); // 1
console.log(counter3.increment()); // 2

const counter4 = solveCreateCounter();
console.log(counter2.decrement()); //

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