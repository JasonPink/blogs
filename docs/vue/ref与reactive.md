### reactive

reactive 用于将对象转换为响应式数据(默认都是深层响应式)，包括复杂的嵌套对象和数组。使用 reactive 定义的数据可以直接访问和修改属性。

- 仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的原始类型无效。
- 因为 Vue 的响应式系统是通过属性访问进行追踪的，如果我们直接“替换”一个响应式对象，这会导致对初始引用的响应性连接丢失
- 将响应式对象的属性赋值或解构至本地变量，或是将该属性传入一个函数时，会失去响应性

### ref

ref 用于将基本类型的数据（如字符串、数字，布尔值等）和引用数据类型(对象) 转换为响应式数据。使用 ref 定义的数据可以通过 .value 属性访问和修改。

```
const count = ref(0)

const info = ref({
    name:'ye',
    age: 18
})

count.value++

const {name, age} = toRefs(info) // 解构/展开返回的对象而不会失去响应性：
```

### shallowReactive

创建一个 浅层响应式对象 ，让它仅在顶层具有响应性，这时候可以使用 shallowReactive()

```
const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 状态自身的属性是响应式的
state.foo++

// 下层嵌套对象不是响应式的，不会按期望工作
state.nested.bar++
```

### toRef

toRef 是基于响应式对象上的一个属性，创建一个对应的 ref 的方法。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值

```
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

// 更改源属性会更新该 ref
state.foo++
console.log(fooRef.value) // 2

// 更改该 ref 也会更新源属性
fooRef.value++
console.log(state.foo) // 3

```

### toRefs

将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref

```
const state = reactive({
  foo: 1,
  bar: 2
})

// 相当于
// const stateAsRefs = {
//   foo: toRef(state, 'foo'),
//   bar: toRef(state, 'bar')
// }
const stateAsRefs = toRefs(state)

state.foo++
console.log(stateAsRefs.foo.value) // 2

stateAsRefs.foo.value++
console.log(state.foo) // 3

```
