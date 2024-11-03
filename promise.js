const deleyPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
       resolve("Promise resolved")
    }, 100);

})

deleyPromise.then((res) => {
  console.log(res)
}).catch((err) => {
    console.log("error: ", err)
}).finally(() => {
    console.log("done")
})

// promise all

const promise1 = Promise.resolve(2)
const promise3 = new Promise((resolve) => setTimeout(() => resolve("async"), 1000))
const promise2 = Promise.resolve(true)

Promise.all([promise1, promise3, promise2])
    .then((values) => console.log(values)) // [ 2, 'async', true ]
    .catch((error) => console.error(error))
    .finally(() => console.log('done'));

// Promise Race
// Returns a single promise that resolves or rejects as soon as the first promise in the array settles.
// Useful for cases where you want the first result available and don’t need to wait for the others.

const promise4 = new Promise((resolve) => setTimeout(resolve, 400, 'first Promise Race'));
const promise5 = new Promise((resolve, reject) => setTimeout(reject, 300, 'second Promise Race'));

Promise.race([promise5,promise4]).then((value) => {
    console.log(value);
}).catch((error) => console.error(error))

/** Promise.any */

const promises = [
    Promise.reject('Error 1'),
    Promise.resolve('Success 1'),
    Promise.reject('Error 2'),
  ];
  
  Promise.any(promises)
  .then((result) => {
    console.log(result); // "Success 1"
  })
  .catch((error) => {
    console.error(error); // AggregateError: All Promises were rejected
  });

// The Promise.allSettled()
// method returns a Promise that resolves with an array of objects representing the status of each input Promise
  
Promise.allSettled(promises)
  .then((results) => {
    console.log(results);
});


// Question
/*
  Write a function promiseTimeout that takes an asynchronous operation represented
  a Promise and rejects it after a specific time if it hasn't been resolved yet. 
*/

function promiseTimeout(promise, timeout) {
    //  solution 
    const resolvePromise = new Promise((resolve, reject) => {
        promise.then(resolve).catch(reject);
    }); 
    const rejectPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
           reject(new Error(`timeout error occurred at ${timeout}`))
       }, timeout);
    })
    
    return Promise.race([resolvePromise, rejectPromise])

    // another solution 
    // return new Promise(function (resolve, reject) {
    //     promise.then(resolve).catch(reject);

    //     setTimeout(() => {
    //         reject(new Error(`timeout error occurred at ${timeout}`))
    //     }, timeout);
    // })
}
  
// Simulating an asynchronous operation 
const delayBy2000 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: 'John Doe', age: 30 });
    }, 2000);  
});
  
const timeout = 1500;  
const promiseWithTimeout = promiseTimeout(delayBy2000, timeout);
  
promiseWithTimeout
    .then((data) => {
      console.log('Promise resolved:', data);
    })
    .catch((error) => {
      console.error('Promise rejected:', error.message);
    });


// Question
// Write a function retryAsyncOperation that takes an asynchronous operation represented as
//  a Promise and retries it a certain number of times before rejecting the Promise.

function retryAsyncOperation(asyncfun, retryCount,deley) {
    return new Promise((resolve, reject) => {
        function attemptsOperation(attemptsLeft) {
            asyncfun().then(resolve).catch((error) => {
                if (attemptsLeft > 0) {
                    setTimeout(() => attemptsOperation(attemptsLeft - 1), deley)
                } else {
                    reject(error)
                }
            })
        }
        attemptsOperation(retryCount)
    })
}

function simulateAsyncOperation() {
    return new Promise((resolve, reject) => {
        const success = Math.random() < 0.5;
        setTimeout(() => {
            if (success) {
                resolve("success");
            }
            else {
                reject("failed");
            }
        }, 1000);
    })
}
 
retryAsyncOperation(simulateAsyncOperation, 3, 1000)
    .then(result => console.log("Result:", result))
    .catch(error => console.error("All attempts failed:", error));