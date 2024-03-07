# v-model

v-model 即可以作用在普通表单元素上，又可以作用在组件上，它其实是一个语法糖

## 普通元素 input

这两句是实现 v-model 功能的关键代码

```
addProp(el, 'value', `(${value})`)
addHandler(el, event, code, null, true)
```

通过修改 AST 元素，给 el 添加一个 prop，相当于我们在 input 上动态绑定了 value，又给 el 添加了事件处理，相当于在 input 上绑定了 input 事件，其实转换成模板如下：

```
<input v-bind:value="message" v-on:input="message=$event.target.value">
```

动态绑定了 input 的 value 指向了 messgae 变量，并且在触发 input 事件的时候去动态把 message 设置为目标值，这样实际上就完成了数据双向绑定了

## 组件

组件 v-model 也是语法糖，最终也是如上面 input 普通元素，增加 prop 以及设置 data.on 事件。但组件事件走的是另外一套逻辑。所以组件在编译阶段，不会直接设置 data.on,而是给到中转变量 el.model；在 patch 阶段的 createComponent 时，才把 el.model 转换为 prop 以及 data.on（这时的 data.on 走的是组件事件的$on/$emit）

### 编译阶段

```
export function genComponentModel (
  el: ASTElement,
  value: string,
  modifiers: ?ASTModifiers
): ?boolean {
  const { number, trim } = modifiers || {}

  const baseValueExpression = '$$v'
  let valueExpression = baseValueExpression
  if (trim) {
    valueExpression =
      `(typeof ${baseValueExpression} === 'string'` +
        `? ${baseValueExpression}.trim()` +
        `: ${baseValueExpression})`
  }
  if (number) {
    valueExpression = `_n(${valueExpression})`
  }
  const assignment = genAssignmentCode(value, valueExpression)

  el.model = {
    value: `(${value})`,
    expression: `"${value}"`,
    callback: `function (${baseValueExpression}) {${assignment}}`
  }
  // 生成el.model,在genData生成render函数有用到
}
```

在 genDirectives 之后，genData 函数中有一段逻辑如下

```
if (el.model) {
  data += `model:{value:${
    el.model.value
  },callback:${
    el.model.callback
  },expression:${
    el.model.expression
  }},`
}
```

父组件生成的 render 函数如下

```
with(this){
  return _c('div',[_c('child',{
    model:{
      value:(message),
      callback:function ($$v) {
        message=$$v
      },
      expression:"message"
    }
  }),
  _c('p',[_v("Message is: "+_s(message))])],1)
}
```

### patch 阶段

```
// src/core/vdom/create-component.js
if (isDef(data.model)) {
   transformModel(Ctor.options, data)
}

function transformModel (options, data: any) {
  // api中的options.model可配置
  const prop = (options.model && options.model.prop) || 'value'
  const event = (options.model && options.model.event) || 'input';

  // 设置组件prop和事件
  (data.props || (data.props = {}))[prop] = data.model.value
  const on = data.on || (data.on = {})
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event])
  } else {
    on[event] = data.model.callback
  }
}
```

其实就相当于我们在这样编写父组件:

```
let vm = new Vue({
  el: '#app',
  template: '<div>' +
  '<child :value="message" @input="message=arguments[0]"></child>' +
  '<p>Message is: {{ message }}</p>' +
  '</div>',
  data() {
    return {
      message: ''
    }
  },
  components: {
    Child
  }
})
```

子组件传递的 value 绑定到当前父组件的 message，同时监听自定义 input 事件，当子组件派发 input 事件的时候，父组件会在事件回调函数中修改 message 的值，同时 value 也会发生变化，子组件的 input 值被更新。

这就是典型的 Vue 的父子组件通讯模式，父组件通过 prop 把数据传递到子组件，子组件修改了数据后把改变通过 \$emit 事件的方式通知父组件，所以说组件上的 v-model 也是一种语法糖。

## 参考链接

[v-model 核心原理](https://ustbhuangyi.github.io/vue-analysis/v2/extend/v-model.html)
