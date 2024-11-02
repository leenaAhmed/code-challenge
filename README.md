*Lexical Scope in JavaScript*
 
Lexical scope refers to the way JavaScript determines variable accessibility based on where functions and variables are declared in the code, rather than where or how they are called during execution.

*Key Points*

Scope Determination at Write Time:
 - Lexical scope is set when you write the code, not when you execute it. This means that variable accessibility is based on the code’s structure.
  
Accessing Variables in Nested Scopes:
 - Functions have access to variables in their own scope as well as any variables declared in their outer (or enclosing) scope, known as their lexical environment.
  JavaScript functions “inherit” the scope in which they are written, meaning that inner functions can access variables from their outer functions.

Static vs. Dynamic Scope:
 - JavaScript uses lexical (or static) scoping, meaning that a function’s variable access is based on the physical code structure, rather than the calling context.
   
Lexical Scope Enables Closures:
 - Lexical scope allows functions to “remember” variables in their outer environment even after the outer function has completed. This property enables closures, where an inner function retains access to variables from its containing (outer) function.
