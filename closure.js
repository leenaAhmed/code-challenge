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