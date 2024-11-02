// Our goal is to create a function called myFlat that will implement this behavior.


if (!Array.prototype.myFlat) {
  Array.prototype.myFlat = function (depth = 1) { 
    const flatten = (arr , currentDepth) => {     
        if (currentDepth === 0 || !Array.isArray(arr)) {
            return arr
        }
       return arr.reduce((result, currentElement) => {
            if (Array.isArray(currentElement)) {
               return result.concat(flatten(currentElement , currentDepth -1 ))
            }
            return result.concat(currentElement)
        },[])   
    }
    return flatten(this , depth)  
  }
}

const array = [1, [2 ,3 , 5], [3, [3 ,5 ,3 ]]];

console.log(array.myFlat()); // Output: [1, 2, 3, [3]]
console.log("---------------");

console.log(array.myFlat(1)); // Output: [1, 2, 3, [3]]
console.log("---------------");

console.log(array.myFlat(3)); // Output: [1, 2, 3, 3]
console.log("---------------");

console.log(array.myFlat(Infinity)); // Output: [1, 2, 3, 3]