## 解构的原理

解构是 ES6 提供的语法糖，内在是针对**可迭代对象**的 **Iterator** 接口，通过遍历器按顺序获取对应的值进行赋值

这里有两个重要的概念：

- Iterator
- 可迭代对象

## Iterator

Iterator 是一种机制，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作

Iterator 的遍历过程是这样的

1. 创建一个指针对象，指向当前数据结构的起始位置，遍历器对象本质上就是一个指针对象
2. 第一次调用指针对象的**next**方法，可以将指针指向数据结构的第一个成员
3. 第二次调用指针对象的**next**方法，指针就指向数据结构的第二个成员
4. 不断调用指针对象的**next**方法，直到它指向数据结构的结束位置

每一次调用 next 方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含 value 和 done 两个属性的对象。其中，value 属性是当前成员的值，done 属性是一个布尔值，表示遍历是否结束。

```
function makeIterator(array) {
    var nextIndex = 0
    return {
      next: function() {
        return nextIndex < array.length ?
            {value: array[nextIndex++]} :
            {done: true}
        }
    };
  }


var it = makeIterator([0, 1, 2])

console.log(it.next().value) // 0
console.log(it.next().value) // 1
console.log(it.next().value) // 2

```

## 可迭代对象

一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）.默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是“可遍历的”（iterable）

原生具备 Iterator 接口的数据结构如下。

- Array
- Map
- Set
- String
- TypedArray +函数的 arguments 对象
- NodeList 对象

```
// 自定义可迭代对象
let obj = {
    [Symbol.iterator] : function() {
        return{
            next: function() {
                return { value: 1, done: true }
            }
        }
    }
}
for (let item of obj) {
    console.log(item) // 不会报错，因为obj已经是可迭代对象
}

```

## 参考文章

[阮一峰 ECMAScript 6](https://es6.ruanyifeng.com/#docs/iterator)
