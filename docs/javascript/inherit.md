## 前言

JavaScript 中无法实现接口继承，只支持实现继承，而且实现继承主要是依靠原型链来实现的。原型链的构建是通过一个类型的实例赋值给另一个构造函数的原型实现的。

---

### 1.原型链继承

```
function Parent() {
    this.name = 'Jason';
}

Parent.prototype.getName = function() {
    console.log(this.name);
}

function Child() {

}

Child.prototype = new Parent(); // 子类的原型对象指向父类的实例

var child1 = new Child();

console.log(child1.getName()) // Jason
```

缺点：

1. 引用类型的属性被所有实例共享
2. 无法传递参数、无法实现多继承

---

### 2.借用构造函数

```
function Parent() {
    this.names = ['Jason', 'Pink']
}

function Child() {
    Parent.call(this); // 在子类中重新运行父类的方法
}

var child1 = new Child();

child1.names.push('Lufei');

console.log(child1.names); // ['Jason', 'Pink', 'Lufei']

var child2 = new Child();

console.log(child2.names); // ['Jason', 'Pink']
```

优点：

1. 可以传递参数，可以实现多继承
2. 避免了引用类型的属性被所有实例共享

缺点：

1. 创建出来的实例只属于 Child,而不属于 Parent(instanceof)
2. 只能继承 Parent 构造函数的属性和方法,无法继承 Parent.prototype 上的属性和方法
3. 每次创建实例都会将构造函数上的方法创建一遍

---

### 3.组合继承(伪经典继承)

```
function Parent(name) {
    this.name = name;
    this.fruits = ['apple', 'pear', 'peach'];
}

Parent.prototype.getName = function() {
    console.log(this.name)
}

function Child(name, age) {
    this.age = age;
    Parent.call(this, name);
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('Jason', 22);
```

缺点： Parent 的构造函数被调用了两次, Parent 构造函数的属性在实例和原型中同时存在(占用内存)

---

### 4.原型式继承(Object.create())

```
function createObj(obj) {
    function F() {};
    F.prototype = obj;
    return new F();
}
```

缺点： 引用类型的值始终会被共享

---

### 5.寄生式继承

```
function createObj(obj) {
    var clone = Object(obj);
    clone.sayHi = function () {
        console.log('Hi')
    };
    return clone;
}
```

---

### 6.寄生组合式继承

```
function Parent(name) {
    this.name = name;
    this.fruits = ['apple', 'pear', 'peach'];
}

Parent.prototype.getName = function() {
    console.log(this.name)
}

function Child(name, age) {
    this.age = age;
    Parent.call(this, name);
}

function inheritPrototype(Child, Parent) {
    var prototype = Object(Parent.prototype);
    prototype.constructor = Child;
    Child.prototype = prototype;
}

inheritPrototype(Child, Parent)

var child1 = new Child('Jason', 22);
```

核心：创建一个父类原型对象的一个副本，然后将子类的 prototype 指向该副本

最后引用红宝书中的话：这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的
多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承
是引用类型最理想的继承范式

---
