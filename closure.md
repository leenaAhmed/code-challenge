
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

``
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
``


**To Solve This**
`` 
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
 
``
3. **Understanding Scoping and Variable Lifetime**

Closures can cause variables to remain in memory if referenced by an active closure.

``
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
``

**TO solve it**
 - 
``
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
``
