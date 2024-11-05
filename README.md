## Lexical Scope in JavaScript 
 
**Lexical scope** refers to the way JavaScript determines variable accessibility based on where functions and variables are declared in the code, rather than where or how they are called during execution.

### Key Points

**Scope Determination at Write Time :** 
 - Lexical scope is set when writing the code, not executing it. This means that variable accessibility is based on the code’s structure.
  
**Accessing Variables in Nested Scopes:**
 - Functions have access to variables in their own scope as well as any variables declared in their outer (or enclosing) scope, known as their lexical environment.
  JavaScript functions “inherit” the scope in which they are written, meaning that inner functions can access variables from their outer functions.

**Static vs. Dynamic Scope:**
 - JavaScript uses lexical (or static) scoping, meaning that a function’s variable access is based on the physical code structure, rather than the calling context.
   
**Lexical Scope Enables Closures:**
 - Lexical scope allows functions to “remember” variables in their outer environment even after the outer function has been completed. This property enables closures, where an inner function retains access to variables from its containing (outer) function.

____



## Closures 
 
Closures are a powerful feature in JavaScript that allows a function to access variables from its outer (enclosing) function, 
even after the outer function has finished execution. This is possible due to the static scoping (lexical scoping) mechanism in JavaScript.

### How Closures Work :

When a function is defined inside another function, it retains a reference to its lexical environment, including all variables 
in the outer scope. This inner function, along with its reference to the surrounding state, is what we call a "closure".

__

## Key Considerations

1. **Memory Usage**:
        Closures retain the entire lexical environment, including variables and functions, even if they are no longer needed. 
        This can lead to increased memory usage, especially in long-lived or recursive functions. Be cautious to avoid memory 
        leaks by managing closures responsibly and releasing unneeded references.

2. **Minimize Shared Mutable State**:
        Closures that share mutable states can introduce unexpected bugs and make code harder to reason about. 
        Whenever possible, strive to keep the state immutable, or avoid sharing mutable states within closures.

3. **Variable Lifetime**:
        Closures extend the lifetime of variables referenced within the inner function. Variables can outlive their intended scope, 
        which may lead to bugs if not managed carefully. Always be aware of variable lifetimes in your closures to ensure expected behavior.

## Use Cases for Closures: 


1. **Data Encapsulation**:
        Closures enable encapsulating data by providing controlled access through functions and hiding implementation details. 
        This supports building modular and reusable code, which can be particularly useful in larger applications.


        ```
            function createCounter() {
                let count = 0;
                return function() {
                    return ++count;
                };
            }
            const counter = createCounter();
            console.log(counter()); // 1
            console.log(counter()); // 2
        ```

2. **Function Factories**:
        Closures allow you to create specialized functions based on a shared template, with each function having its own private state.
        This is useful for generating variations of functions with similar behavior.

        Example:
        ```
            function multiplier(factor) {
                return function(number) {
                    return number * factor;
                };
            }
            const double = multiplier(2);
            const triple = multiplier(3);
            console.log(double(5)); // 10
            console.log(triple(5)); // 15
        ```

4. **Event Handlers**:
        Closures are widely used in event-driven programming to preserve the context of an event handler and maintain access to relevant data.

        Example:
        ```javascript

            function setupButton(name) {
                document.getElementById("myButton").addEventListener("click", function() {
                    alert("Hello, " + name);
                });
            }
            setupButton("Alice"); // "Hello, Alice" when button is clicked

        ```
Closures are a fundamental concept in JavaScript that allows for 
      - *encapsulating data*, 
      - *creating specialized functions*, 
      - *maintaining state across function calls.*

However, be mindful of memory usage and shared mutable state to avoid bugs and potential memory leaks.


## Use Cases to avoid bugs and potential memory leaks: 


1. **Closures Retaining the Lexical Environment**

 ```
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
 ```


**To Solve This**
``` 
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
 
```
3. **Understanding Scoping and Variable Lifetime**

Closures can cause variables to remain in memory if referenced by an active closure.

 ```
    function createFunctions() {
      let functions = [];
      for (let i = 0; i < 3; i++) {
        functions.push(function () {
          console.log(i);
        });
      }
      return functions;
    }

    const funcs = createFunctions();
    funcs[0](); // 3
    funcs[1](); // 3
    funcs[2](); // 3
 ```

**TO solve it**
 
 ```
  function createFunctions() {
    let functions = [];
    for (let i = 0; i < 3; i++) {
      functions.push(((j) => () => console.log(j))(i));
    }
    return functions;
  }

  const funcs = createFunctions();
  funcs[0](); // 0
  funcs[1](); // 1
  funcs[2](); // 2
  
 ```


3. **A Case Where Shared Mutable State Can Cause Issues**

 - The concept of minimizing shared mutable state in the context of closures mainly applies when multiple functions or objects share access to the same variable, particularly when those functions are allowed to modify it.

 ``` 
   let sharedCounter = 0;

  function createCounter() {
      return {
          increment: function () {
              sharedCounter++;
              return sharedCounter;
          },
          decrement: function () {
              sharedCounter--;
              return sharedCounter;
          }
      };
  }

  const counter1 = createCounter();
  const counter2 = createCounter();

  console.log(counter1.increment()); // 1
  console.log(counter2.increment()); // 2 (affects sharedCounter)
  console.log(counter1.decrement()); // 1 (still affects sharedCounter)

 ```


**To solve it**
 
 - One way to avoid this is to make sure each function or object has its own independent state. 

 ```
    function createCounter() {
        let counter = 0;  // Not shared between instances

        return {
            increment: function () {
                counter++;
                return counter;
            },
            decrement: function () {
                counter--;
                return counter;
            }
        };
    }

    const counter1 = createCounter();
    console.log(counter1.increment()); // 1
    console.log(counter1.increment()); // 2

    const counter2 = createCounter();
    console.log(counter2.decrement()); // -1 (independent from counter1)
 ```
___

## Asynchronous
 - JavaScript is single-threaded, which means it executes one operation at a time. 
 - Asynchronous programming allows us to execute tasks concurrently without blocking the main thread, ensuring that our applications remain responsive.
 - setTimeout and setInterval are built-in JavaScript functions that allow you to delay the execution of code or repeat it at specified intervals.


## Promise:
 - A Promise is a special object in JavaScript that represents the eventual completion or failure of an asynchronous operation, and its resulting value. 
 - It provides a clean and structured way to handle asynchronous tasks and avoid deeply nested callback structures.  

 **Promise.all() and Promise.race():** 
  These utility methods allow for aggregating the results of multiple promises or waiting for the first promise to resolve or reject, respectively.
  This is beneficial when dealing with multiple asynchronous tasks and helps in optimizing performance.

  **Parallel Execution** :
   - `Promise.all()` takes an array of promises and returns a single promise that fulfills when all of the promises in the array have been fulfilled. If any promise in the array rejects, `Promise.all()` immediately rejects with that reason.
  - Use `Promise.all()` when you need all promises to complete successfully before continuing with the next operation.

  **First Fulfilled Promise**
   - `Promise.race()` takes an array of promises but returns a single promise that fulfills or rejects as soon as the first promise in the array settles (fulfills or rejects).

  - Use `Promise.race()` when you are interested in the result of the first promise to settle, regardless of  whether it resolves or rejects.
  - Useful for cases where you want the first result available and don’t need to wait for the others.

 **First Successful Execution**
  - `Promise.any()` function that resolves with the result of the first resolved Promise, ignoring any rejections.
  - This way, we ensure that the chain continues with the result of the first resolved Promise.

___

## Concurrency model

  - **The concurrency model** is a design approach in programming and computer science that allows multiple tasks, operations, or processes to be managed and executed "concurrently" (i.e., at the same time or interleaved in time) within a single program.
  - This model is essential for handling asynchronous operations, multitasking, and efficient resource management, especially in environments where multiple processes need to work together or respond to real-time events, like user interactions, network calls, or input/output operations.

### Key Concepts in the Concurrency Model

  1. **Single-Threaded vs. Multi-Threaded:** 
   - single-threaded Some environments(like JavaScript in the browser) which means that it can  execute one piece of code at a time.
   - multi-threaded environments (such as Java or Python with certain configurations) can execute multiple tasks simultaneously by using multiple threads.

  2. **Event Loop:**
   - Many concurrency models, like JavaScript's, rely on an event loop.
    The event loop continuously checks if the call stack is empty and then decides which tasks to execute. 
    This allows single-threaded languages to handle asynchronous operations by queueing tasks and executing them when resources are available.
 3. **Task Queues:**
   - Macrotask Queue: 
        Stores tasks like setTimeout, setInterval, and event callbacks. 
        Tasks in the macrotask queue are executed after the current code and microtasks are complete.
   - Microtask Queue: 
       Used for high-priority tasks, such as Promise callbacks and process.nextTick in Node.js.
       Microtasks are processed immediately after synchronous code and before macrotasks.

### Benefits of a Concurrency Model 
   1. Improved Performance: Reduces blocking and allows other tasks to proceed, leading to faster overall execution.

   2. Better Resource Utilization: Maximizes the use of available resources by handling multiple tasks in an organized way.

   3. Responsive Applications: Helps create smooth, non-blocking applications, such as user interfaces that remain responsive during long-running operations.

## Event Loop Phases

### The call stack
  - A call stack is a simple data structure that records where in the code we are currently. So if we step into a function that is a function invocation it is pushed to the call stack. When we return from a function it is popped out of the stack.
  - LIFO => Last in frist out 

### Web APIs:
  - Web APIs are provided by the browser or the environment in which JavaScript runs. They include features like setTimeout, setInterval, DOM events (click, scroll, etc.), fetch .
  -Heap: It’s mostly the place where objects are allocated. 

### Callback Queue:
  - It’s a data structure that stores all the callbacks. Since it’s a queue, the elements are processed based on FIFO which is First in First Out.

### What is the Event Loop?
 - The event loop is a critical component of JavaScript's runtime environment that enables asynchronous behaviour without blocking the main thread

 - It continuously checks the message queue for pending tasks and processes them one by one, ensuring that your application remains responsive.

 - The event loop simply checks the call stack, and if it is empty (which means there are no functions in the stack) it takes the oldest callback from the callback queue and pushes it into the call stack which eventually executes the callback.


### Example: JavaScript Concurrency Model:

```
   console.log("Start");  //1: start ,  synchronous code

    setTimeout(() => {
    console.log("Macrotask: setTimeout"); // 4. Macrotask: setTimeout ,run after all synchronous code and microtasks are complete
    }, 0);

    Promise.resolve().then(() => {
    console.log("Microtask: Promise");  //3.  Microtask: Promise , processed right after the main code execution.
    });

    console.log("End"); // 2 : end,  synchronous code
```


