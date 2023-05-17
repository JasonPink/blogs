---
title: Hello VuePress
author: jasonpink
date: "2023/05/17"
---

# for...in 与 for...of

## for in

**for...in 语句以任意顺序迭代一个对象的除 Symbol 以外的可枚举属性，包括继承的可枚举属性。**

```
Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // logs 0, 1, 2, "foo"
  }
}
```

需要注意的一点是，用它循环对象，循环出来的**属性顺序并不可靠**，所以不要在 for...in 中做依赖对象属性的逻辑判断,例如下面这段代码最终遍历出来值的顺序与对象定义的顺序不太一样

```
const obj = {
  '88': 'jack',
  '12':'david',
  "23": 'jason',
  "1":'tom',
}

for(let i in obj) {
  console.log(obj[i]) // tom, david, jason, jack
}
```

为什么会这样呢？简单来讲就是：先遍历出整数属性（按照升序），然后其他属性按照创建时候的顺序遍历出来
那么什么又是整数属性，我们可以用下面这段代码判断整数属性,如果判断为 true，prop 就是整数属性

```
String(Math.trunc(Number(prop)) === prop
```

## for of

**for...of 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句**

```
Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i of iterable) {
  console.log(i); // logs 3, 5, 7
}
```

**for...of 可以中断循环**

```
var arr = [3, 5, 7];

for (let value of arr) {
  console.log(value);
  if (value == 5) {
    break;
  }
}
// 结果是：3,5
```
