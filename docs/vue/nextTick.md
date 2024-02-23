<!--
 * @Descripttion:
 * @Author: JasonPink
 * @Date: 2020-06-10 17:02:29
 * @LastEditors: Joker
 * @LastEditTime: 2024-02-23 17:12:00
-->

## 异步更新队列

下面这段话是来自 Vue 的官网，通过这段话我们大概已经了解了 Vue 异步更新队列的原理了。

> Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 Watcher 被多次触发，只会推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

---

### 这里介绍 3 个 nextTick 定义的变量

- callbacks: 用来存储所以需要执行的回调的数组
- pending: 用来标识是否正在执行回调函数
- timerFunc: 用来触发执行回调函数

### 前面两个都比较简单，下面介绍一下 timerFunc

- 首先判断当前环境支不支持 Promise,如果支持，采用 Promise 方式触发回调。
- 判断支不支持 MutationObserver，如果支持 MutationObserver，则实例化一个观察者对象，观察文本节点发生变化时，触发执行所有回调函数。
- 判断支不支持 setImmediate，采用 setImmediate
- 如果以上都不支持，最后采用 setTimeout

---

### 接下来我们用代码的方式来模拟实现一下，加深一下理解

```
let callbacks = [];
let pending = false;

function flushCallbacks () {
  pending = false;

  // 这里拷贝的原因是：
  // 有的cb 执行过程中又会往callbacks中加入内容
  // 比如 $nextTick的回调函数里还有$nextTick
  // 后者的应该放到下一轮的nextTick 中执行
  // 所以拷贝一份当前的，遍历执行完当前的即可，避免无休止的执行下去
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for(let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

function nextTick(cb) {
  callbacks.push(cb);

  if(!pending) {
    pending = true;
    setTimeout(flushCallbacks, 0);
  }
}

//Watcher需要一个id标识唯一性，避免重复添加
let uid = 0;

class Watcher {
  constructor() {
    this.id = ++uid;
  }

  update() {
    queueWatcher(this); //将当前Watcher添加至队列中，等待更新
  }

  run() {
    console.log(`watch${this.id}视图更新了`)
  }
}

//使用一个has的map,里面存放id-> true(false)形式，用来判断是否存在相同的Watcher，提高效率
let has = {}
let queue = [];
let waiting = false;

function queueWatcher(watcher) {
  const id = watcher.id;

  if(has.id == null) {
    has.id = true;
    queue.push(watcher);

    if(!waiting) {
      waiting = true;

      nextTick(flushSchedulerQueue)
    }
  }
}

//逐一调用各个Watcher的run方法，更新视图
function flushSchedulerQueue() {
  let watcher, id;

  for(let index = 0; index < queue.length; i++) {
    watcher = queue[i];
    id = watcher.id;
    has[id] = null;

    watcher.run();
  }

  waiting = fasle;
}
```
