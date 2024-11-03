
const obj = {
    count: 0,
    increment() {
      this.count++;
    },
  };
  
const increments = obj.increment;
increments();
console.log(obj.count); //0


const obj2 = {
    count: 0,
    increment() {
      this.count++;
    },
  };
  
const increment2 = obj2.increment.bind(obj2);
increment2();
console.log(obj2.count); // 1



const obj3 = {
    name: 'Alice',
    age: 30,
    sayHello: function() {
      setTimeout(() => {
        console.log(`Hello, I'm ${this.name} and I'm ${this.age} years old.`);
      }, 1000);
    },
  };
  
obj3.sayHello(); 



function createCounter() {
    return {
      count: 0,
      increment: function () {
        this.count++;
      },
  
      getCount: function () {
        console.log(this.count);
      },
    };
  }
  
const counter = createCounter();
const incrementFn = counter.increment;

// const incrementFn2 = counter.increment.bind(counter);

incrementFn();
incrementFn();

// incrementFn2()
console.log(counter.getCount())


