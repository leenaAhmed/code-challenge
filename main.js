console.log("Starting");


// To solve this problem, we'll follow these steps:

// Implement the myIncludes function to iterate through the array and check if the given element exists or not.
// Create a new property called myIncludes on Array.prototype and assign the function.

/* @comme  */ 
// if (!Array.prototype.myIncludes) {
//     Array.prototype.myIncludes = function (searchElement) { 
//       for (let index = 0; index <  this.length; index++) {
//           if (this[index] === searchElement) {
//               return true;
//          }
//         }
//         return false;
//     }
// }


if (!Array.prototype.myIncludes) {
    Array.prototype.myIncludes = function (searchElement, fromIndex) { 
    let startIndex = fromIndex || 0;
        
    // Handle negative indices by calculating the actual start index
    if (startIndex < 0) {
        startIndex = Math.max(this.length + startIndex, 0);
    }
    
    for (let index = 0; index < this.length; index++) {
          if (this[index] === searchElement) {
              return true;
         }
        }
        return false;
    }
}

// test cases
const array = [1, 2, 3, 4, 5];
const fruits = ['apple', 'banana', 'mango'];

console.log(array.myIncludes(3)); // Output: true
console.log(array.myIncludes(6)); // Output: false
console.log(fruits.myIncludes('banana')); // true
console.log(fruits.myIncludes('grape'));  // false
console.log(fruits.myIncludes('mango'));  // true
console.log(fruits.myIncludes('mango'));