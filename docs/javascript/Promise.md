## 什么是 Promise

Promise 是异步编程的一种解决方案，比传统的异步解决方案【回调函数】和【事件】更合理、更强大。现已被 ES6 纳入进规范中。

## 常用 API

- Promise.resolve(): 该方法返回一个以 value 值解析后的 Promise 对象

  - 如果这个值是个 thenable（即带有 then 方法），返回的 Promise 对象会“跟随”这个 thenable 的对象，采用它的最终状态（指 resolved/rejected/pending/settled）
  - 如果传入的 value 本身就是 Promise 对象，则该对象作为 Promise.resolve 方法的返回值返回
  - 其他情况以该值为成功状态返回一个 Promise 对象

    ```
    //如果传入的 value 本身就是 Promise 对象，则该对象作为 Promise.resolve 方法的返回值返回。
    const p0 = new Promise((resolve) => {
        resolve(123)
    })
    const p1 = Promise.resolve(p0)

    console.log(p1 ===p0) // tru

    //如果传入的 value 本身就是 thenable 对象，返回的 promise 对象会跟随 thenable 对象的状态。
    const promise = Promise.resolve($.ajax('/test/test.json'));// => promise对象

    promise.then(function(value){
        console.log(value);
    });
    ```

- Promise.reject():与 resolve 唯一的不同是，返回的 promise 对象的状态为 rejected。
- Promise.prototype.then():为 Promise 注册回调函数，函数形式：fn(vlaue){}，value 是上一个任务的返回结果，then 中的函数一定要 return 一个结果或者一个新的 Promise 对象，才可以让之后的 then 回调接收
- Promise.prototype.catch():捕获异常
- Promise.race():谁跑的快，以谁为准执行回调,多个 Promise 任务同时执行，返回最先执行结束的 Promise 任务的结果，不管这个 Promise 结果是成功还是失败
- Promise.all():谁跑的慢，以谁为准执行回调,多个 Promise 任务同时执行。如果全部成功执行，则以数组的方式返回所有 Promise 任务的执行结果。 如果有一个 Promise 任务 rejected，则只返回 rejected 任务的结果

## PromiseA+ 规范

ES6 的 Promise 实现需要遵循[PromiseA+ 规范](https://promisesaplus.com/)，规范中有几个核心的关键点：

1. Promise 本质是一个状态机，且状态只能为以下三种：Pending（等待态）、Fulfilled（执行态）、Rejected（拒绝态），状态的变更是单向的，只能从 Pending -> Fulfilled 或 Pending -> Rejected，状态变更不可逆

2. then 方法接收两个可选参数，分别对应状态改变时触发的回调。then 方法返回一个 promise。then 方法可以被同一个 promise 调用多次。

## 手写 Promise

```
class myPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state === "fulfilled";
        this.value = value;
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state === "rejected";
        this.reason = reason;
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function" ? onRejected : (reason) => throw reason;

    // 返回一个新的promise
    const promise2 = new myPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.state === "rejected") {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.state === "pending") {
        // 如果 promise 还处于 pending 状态，我们需要将 onFulfilled 和 onRejected 存储起来
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  }

  cathch(onRejected) {
    return this.then(null, onRejected);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return;
    reject(new TypeError("Chaining cycle detected for promise"));
  }
  let called;

  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

Promise.resolve = (val) => {
  return new Promise((resolve, reject) => {
    resolve(val);
  });
};

Promise.reject = (val) => {
  return new Promise((resolve, reject) => {
    reject(val);
  });
};

Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
};

Promise.all = function(promises) {
  let arr = [];
  let i = 0;
  function processData(index, data) {
    arr[index] = data;
    i++;
    if (i == promises.length) {
      resolve(arr);
    }
  }
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((data) => {
        processData(i, data);
      }, reject);
    }
  });
};

```
