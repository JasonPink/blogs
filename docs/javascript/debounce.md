# 防抖

在事件触发 n 秒后执行函数，如果在 n 秒内再次触发，重新计时

- 持续触发不执行
- 不触发的一段时间之后再执行

```
function debounce(fn, wait) {
    var timeout = null;
    return function() {
        if(timeout !== null)
                clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}

常用场景 window 的 scroll、resize 事件，input change事件
```

# 节流

一定时间内只触发一次函数。原理是通过判断是否到达一定时间来触发函数。

```
const throttle = function(func, delay) {
    var prev = Date.now();
    return function() {
        var context = this;
        var args = arguments;
        var now = Date.now();
        if (now - prev >= delay) {
            func.apply(context, args);
            prev = Date.now();
        }
    }
}

```

## 区别

函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触发一次函数。 比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。
