# 响应式原理

## Object.defineProperty

Vue2 实现响应式的核心是利用了 ES5 的 Object.defineProperty，给数据添加 getter 和 setter，目的是为了在我们读取数据和操作数据的时候自动执行一些逻辑

### 模拟代码

```
const Observer = function(data) {
  // 循环修改为每个属性添加get set
  for (let key in data) {
    defineReactive(data, key);
  }
}

const defineReactive = function(obj, key) {
  // 局部变量dep，用于get set内部调用
  const dep = new Dep();
  // 获取当前值
  let val = obj[key];
  Object.defineProperty(obj, key, {
    // 设置当前描述属性为可被循环
    enumerable: true,
    // 设置当前描述属性可被修改
    configurable: true,
    get() {
      console.log('in get');
      // 调用依赖收集器中的addSub，用于收集当前属性与Watcher中的依赖关系
      dep.depend();
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      val = newVal;
      // 当值发生变更时，通知依赖收集器，更新每个需要更新的Watcher，
      // 这里每个需要更新通过什么断定？dep.subs
      dep.notify();
    }
  });
}

const observe = function(data) {
  return new Observer(data);
}

const Vue = function(options) {
  const self = this;
  // 将data赋值给this._data，源码这部分用的Proxy所以我们用最简单的方式临时实现
  if (options && typeof options.data === 'function') {
    this._data = options.data.apply(this);
  }
  // 挂载函数
  this.mount = function() {
    new Watcher(self, self.render);
  }
  // 渲染函数
  this.render = function() {
    with(self) {
      _data.text;
    }
  }
  // 监听this._data
  observe(this._data);
}

const Watcher = function(vm, fn) {
  const self = this;
  this.vm = vm;
  // 将当前Dep.target指向自己
  Dep.target = this;
  // 向Dep方法添加当前Wathcer
  this.addDep = function(dep) {
    dep.addSub(self);
  }
  // 更新方法，用于触发vm._render
  this.update = function() {
    console.log('in watcher update');
    fn();
  }
  // 这里会首次调用vm._render，从而触发text的get
  // 从而将当前的Wathcer与Dep关联起来
  this.value = fn();
  // 这里清空了Dep.target，为了防止notify触发时，不停的绑定Watcher与Dep，
  // 造成代码死循环
  Dep.target = null;
}

const Dep = function() {
  const self = this;
  // 收集目标
  this.target = null;
  // 存储收集器中需要通知的Watcher
  this.subs = [];
  // 当有目标时，绑定Dep与Wathcer的关系
  this.depend = function() {
    if (Dep.target) {
      // 这里其实可以直接写self.addSub(Dep.target)，
      // 没有这么写因为想还原源码的过程。
      Dep.target.addDep(self);
    }
  }
  // 为当前收集器添加Watcher
  this.addSub = function(watcher) {
    self.subs.push(watcher);
  }
  // 通知收集器中所的所有Wathcer，调用其update方法
  this.notify = function() {
    for (let i = 0; i < self.subs.length; i += 1) {
      self.subs[i].update();
    }
  }
}

const vue = new Vue({
  data() {
    return {
      text: 'hello world'
    };
  }
})

vue.mount(); // in get
vue._data.text = '123'; // in watcher update /n in get

```

### 总结

1. 在 new Vue()时，init 会数据监听，会把 data/props 数据递归放在 Object.defineProperty 中代理，同时依赖收集 Watcher
2. 在 app.\$mount(el)时,会执行 new Watcher()，Watcher 构造函数中
   1. 会去执行 updateComponent,即先 vm_render()拿到 VNode，vm.\_update()虚拟 DOM 对比，并更新到真实 DOM。vm_render()又会解析模板，模板中又会使用到 data/props（this.key 会触发 data.key 的 getter 函数）。此时会使用到第一步的数据监听部分（终于把两者串联了），因为 Object.defineProperty 作用就是在拿到 data.key 的同时，还能做一些额外的逻辑（通过 getter/setter）。
   2. getter 中做依赖收集。具体是每个 data.key 都有个 Dep 对象，在 getter 函数中，把当前 Watcher（Dep.target）增加到 Dep 对象
   3. 会把当前 Watcher 作为 Dep.target
3. 当数据变化时，触发 data.key 的 setter 方法，收集的 Watcher 执行回调。
   1. watcher 队列概念。派发更新的时候，并不会每次数据改变都触发 watcher 的回调，而是在 nextTick 后执行。
   2. watcher 队列执行有规则。1. 先把父组件排在子组件前（根据 id），因为父组件创建过程要先于子组件。2. 用户自定义 watcher 优先于渲染 watcher。

![响应式数据](../assets/reactive.png "响应式数据")

## Proxy
