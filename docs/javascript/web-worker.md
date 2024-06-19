## Web Worker

为 Web 内容在后台线程中运行脚本提供了一种简单的方法。线程可以执行任务而不干扰用户界面。意义在于可以将一些耗时的数据处理操作从主线程中剥离，使主线程更加专注于页面渲染和交互。

Web Worker 分为两种类型，专用线程和共享线程，专用线程仅能被创建它的脚本所使用（一个专用线程对应一个主线程），而共享线程能够在不同的脚本中使用（一个共享线程对应多个主线程）。

### 特性

1. 并行执行：Web Worker 允许在主线程之外创建多个线程，进行并行计算。这样可以避免在主线程执行大量计算，造成用户界面的卡顿
2. 独立上下文：Web Worker 有自己独立的上下文，不能直接操作 DOM。主线程和 Web Worker 之间通过消息传递进行通信
3. 限制和特性：
   - Web Worker 不能访问主线程的 JavaScript 对象和 DOM
   - 可以使用部分 web api,如 XMLHttpRequest、Fetch、setTimeout/setInterval 等。
   - 不支持 alert、confirm、prompt 等阻塞性操作

## 使用方法

专用线程由 Worker()方法创建，可以接收两个参数，path 和 options 。共享线程使用 Shared Worker() 方法创建，同样支持两个参数，用法与 Worker() 一致。

- path:有效的 js 脚本的地址，必须遵守同源策略。
- options.type: 可选，用以指定 worker 类型。该值可以是 classic 或 module。 如未指定，将使用默认值 classic
- options.credentials: 可选，用以指定 worker 凭证。该值可以是 omit, same-origin，或 include。如果未指定，或者 type 是 classic，将使用默认值 omit (不要求凭证)
- options.name:可选，在 DedicatedWorkerGlobalScope 的情况下，用来表示 worker 的 scope 的一个 DOMString 值，主要用于调试目的。 |

Web Worker 提供了 importScripts() 方法，能够将外部脚本文件加载到 Worker 中，通过此方法加载的 js 文件不受同源策略约束！

```
// mainjs
var worker = new Worker('worker.js')

worker.addEventListener('message', e => {
    console.log(e.data); // worker线程发送的消息
});

worker.onmessage = e => {
    console.log(e.data) // worker线程发送的消息
}

worker.postMessage('主线程发动消息')

worker.terminate() // 关闭线程

// workerjs

//self 和 this 都代表子线程的全局对象，以下写法都是有效的

importScripts('script1.js') // 加载外部脚本

self.addEventListener('message', function (e) {})
this.addEventListener('message', function (e) {})
addEventListener('message', function (e) {})
onmessage = function (e) {}

self.close() // 关闭线程


var sharedWorker = new SharedWorker('shared-worker.js')
```

ESMoudle 模式

```
// main.js（主线程）
const worker = new Worker('/worker.js', {
    type: 'module'  // 指定 worker.js 的类型
});

// worker.js（worker线程）
import add from './utils.js'; // 导入外部js

self.addEventListener('message', e => {
    postMessage(e.data);
});

add(1, 2); // log 3

export default self; // 只需把顶级对象self暴露出去即可

```

可以在主线程中使用 terminate() 方法或在 Worker 线程中使用 close() 方法关闭 worker。这两种方法是等效的，但比较推荐的用法是使用 close()，防止意外关闭正在运行的 Worker 线程。Worker 线程一旦关闭 Worker 后 Worker 将不再响应。

### SharedWorker

SharedWorker 是一种特殊类型的 Worker，可以被多个浏览上下文访问，比如多个 windows，iframes 和 workers，但这些浏览上下文必须同源。它们实现于一个不同于普通  worker 的接口，具有不同的全局作用域：SharedWorkerGlobalScope ，但是继承自 WorkerGlobalScope

SharedWorker 线程的创建和使用跟 worker 类似，事件和方法也基本一样。 不同点在于，主线程与 SharedWorker 线程是通过 MessagePort 建立起链接，数据通讯方法都挂载在 SharedWorker.port 上。如果采用 onmessage 方法，则默认开启端口，不需要再手动调用 SharedWorker.port.start()方法

```
// main.js（主线程）
const myWorker = new SharedWorker('./sharedWorker.js');

myWorker.port.start(); // 开启端口

myWorker.port.addEventListener('message', msg => {
    console.log(msg.data);
})

myWorker.port.onmessage = msg => {
    console.log(msg.data);
};

```

### 实际案例

图片灰度处理

```
// mainjs
const uploadInput = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);

        const worker = new Worker('imageWorker.js');
        worker.postMessage(imageData);

        worker.onmessage = (event) => {
        ctx.putImageData(event.data, 0, 0);
        };
    };
    };

    reader.readAsDataURL(file);
});

// workerjs
self.onmessage = function(event) {
  const imageData = event.data;
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }

  self.postMessage(imageData);
};
```
