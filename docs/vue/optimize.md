## vue 项目性能优化

### 代码优化

1. v-if 和 v-show 区分使用场景：

   - v-if 是 真正 的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
   - v-show 就简单得多， 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 display 属性进行切换。

   v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景

   v-show 则适用于需要非常频繁切换条件的场景。

2. computed 和 watch 区分使用场景

   - 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
   - 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。

3. v-for 遍历必须为 item 添加 key

   - 在列表数据进行遍历渲染时，需要为每一项 item 设置唯一 key 值，方便 Vue.js 内部机制精准找到该条列表数据。当 state 更新时，新的状态值和旧的状态值对比，较快地定位到 diff

4. 长列表优化

   - Vue 会通过 Object.defineProperty 对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变。可以通过 Object.freeze 方法来冻结一个对象

5. 事件及时销毁，防止内存泄漏

```
created() {
  addEventListener('click', this.click, false)
},
beforeDestroy() {
  removeEventListener('click', this.click, false)
}

```

6. 路由懒加载

7. 图片资源懒加载

```
npm install vue-lazyload --save-dev

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: 'dist/loading.gif',
    attempt: 1
})

```

8. 第三方库按需加载
   - babel-plugin-component

### 项目资源优化

1. 开启 gzip 压缩

2. 浏览器缓存

3. CDN 加速
