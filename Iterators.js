// Creating Custom Iterators

const range = {
    start: 1,
    end: 5,
    [Symbol.iterator]() {
        return {
         next:()=> {
          if (this.start <= this.end) {
            return {value: this.start++, done: false};
          }
          else {
            return {done: true};
          }
         }
        }
    }
}

for (const element of range) {
    console.log(element)
}