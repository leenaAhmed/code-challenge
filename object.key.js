/* we'll create a polyfill for the Object.keys() method.
 The Object.keys() method returns an array of a given object's own enumerable property names.
 Our goal is to create a function called myKeys that will implement this behavior. */

if (!Object.myKeys) {
    Object.myKeys = function (obj) {
        const keys = []
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key)
            }
        }
      return keys
    }
}


const obj = { name: "Bob", age: "1000" };
console.log(Object.myKeys(obj)); 