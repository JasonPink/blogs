## requestAnimationFrame

window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

若你想在浏览器下次重绘之前继续更新下一帧动画，那**么回调函数自身必须再次调用 requestAnimationFrame()**。requestAnimationFrame() 是一次性的。

为了提高性能和电池寿命，在大多数浏览器里，当 requestAnimationFrame() 运行在后台标签页或者隐藏的 iframe 里时，requestAnimationFrame() 会被**暂停调用**以提升性能和电池寿命。

```
(() => {
    function test(){
        console.log('test')
        requestAnimationFrame(test)
    }
    requestAnimationFrame(test)
})()
```

回调函数会被传入 DOMHighResTimeStamp 参数，DOMHighResTimeStamp 指示当前被 requestAnimationFrame() 排序的回调函数被触发的时间。

```
(() => {
    function test(timestamp){
        console.log('test',timestamp)
        requestAnimationFrame(test)
    }
    requestAnimationFrame(test)
})()
```

当浏览器刷新的时候，会执行所有 requestAnimationFrame 回调，并且回调参数是一致的

```
(() => {
  function test1(timestamp) {
    console.log('test1',timestamp)
    requestAnimationFrame(test1)
  }
  function test2(timestamp) {
    console.log('test2',timestamp)
    requestAnimationFrame(test2)
  }
  requestAnimationFrame(test1)
  requestAnimationFrame(test2)

})()

```

requestAnimationFrame 返回值是一个 long 整数，请求 ID，是回调列表中唯一的标识。是个非零值，没有别的意义。你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数请求

```
let id = null
function test(timestamp){
    console.log('test',timestamp)
    id = requestAnimationFrame(test)
}

id = requestAnimationFrame(test)
cancelAnimationFrame(id)
```

## requestIdleCallback

requestIdleCallback 允许我们在浏览器空闲时执行低优先级的任务，避免阻塞主线程，提升用户体验。与 setTimeout 不同的是，requestIdleCallback 只会在浏览器真正空闲时调用回调，不会影响高优先级的任务。

### 使用场景

- 执行非关键任务：如日志记录、预加载数据或资源、统计分析等
- 懒加载和预加载：在空闲时间进行资源的预加载
- 渐进增强：在初次加载时只加载核心功能，其他增强功能可以再空闲时间加载

### 实际应用

有个简单任务连续执行 2w 次，全部执行完毕需要 2s 左右时间，这期间主线程一直被占用，页面被卡住

```
function singleTask() {
  const now = performance.now()
  while (performance.now() - now < 0.001) { } // 模拟耗时操作，每次任务耗时约0.001ms
}

const data = new Array(20000).fill(1)

function normarlRun() {
  for (let i = 0; i < data.length; i++) {
    // 2w个任务连续执行
    singleTask(data[i])
  }
  result('done')
}
```

对其使用 requestIdleCallback 进行拆分，只在空闲时间执行部分任务，若当前帧的空闲时间结束，则暂停批量任务，让出主线程

```
function ridRun() {
  let i = 0
  let option = { timeout: 200 } // 任务超时时间

  function handler(idleDeadline) {
    // 每次执行任务前，判断当前帧是否还有空闲时间
    while ((idleDeadline.timeRemaining() > 0 || idleDeadline.didTimeout) && i < data.length) {
      // 当前帧有剩余时间，或任务已等待超时强制执行
      singleTask(data[i++])
    }


    if (i < data.length) {
      window.requestIdleCallback(handler, option) // 任务未执行完，继续等待下次空闲时间执行
    } else {
      result('done')
    }
  }

  window.requestIdleCallback(handler, option)
}

```
