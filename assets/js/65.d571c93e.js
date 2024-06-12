(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{413:function(n,t,a){"use strict";a.r(t);var e=a(1),r=Object(e.a)({},(function(){var n=this,t=n._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[t("h2",{attrs:{id:"前言"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[n._v("#")]),n._v(" 前言")]),n._v(" "),t("p",[n._v("JavaScript 中无法实现接口继承，只支持实现继承，而且实现继承主要是依靠原型链来实现的。原型链的构建是通过一个类型的实例赋值给另一个构造函数的原型实现的。")]),n._v(" "),t("hr"),n._v(" "),t("h3",{attrs:{id:"_1-原型链继承"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-原型链继承"}},[n._v("#")]),n._v(" 1.原型链继承")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("function Parent() {\n    this.name = 'Jason';\n}\n\nParent.prototype.getName = function() {\n    console.log(this.name);\n}\n\nfunction Child() {\n\n}\n\nChild.prototype = new Parent(); // 子类的原型对象指向父类的实例\n\nvar child1 = new Child();\n\nconsole.log(child1.getName()) // Jason\n")])])]),t("p",[n._v("缺点：")]),n._v(" "),t("ol",[t("li",[n._v("引用类型的属性被所有实例共享")]),n._v(" "),t("li",[n._v("无法传递参数、无法实现多继承")])]),n._v(" "),t("hr"),n._v(" "),t("h3",{attrs:{id:"_2-借用构造函数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-借用构造函数"}},[n._v("#")]),n._v(" 2.借用构造函数")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("function Parent() {\n    this.names = ['Jason', 'Pink']\n}\n\nfunction Child() {\n    Parent.call(this); // 在子类中重新运行父类的方法\n}\n\nvar child1 = new Child();\n\nchild1.names.push('Lufei');\n\nconsole.log(child1.names); // ['Jason', 'Pink', 'Lufei']\n\nvar child2 = new Child();\n\nconsole.log(child2.names); // ['Jason', 'Pink']\n")])])]),t("p",[n._v("优点：")]),n._v(" "),t("ol",[t("li",[n._v("可以传递参数，可以实现多继承")]),n._v(" "),t("li",[n._v("避免了引用类型的属性被所有实例共享")])]),n._v(" "),t("p",[n._v("缺点：")]),n._v(" "),t("ol",[t("li",[n._v("创建出来的实例只属于 Child,而不属于 Parent(instanceof)")]),n._v(" "),t("li",[n._v("只能继承 Parent 构造函数的属性和方法,无法继承 Parent.prototype 上的属性和方法")]),n._v(" "),t("li",[n._v("每次创建实例都会将构造函数上的方法创建一遍")])]),n._v(" "),t("hr"),n._v(" "),t("h3",{attrs:{id:"_3-组合继承-伪经典继承"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-组合继承-伪经典继承"}},[n._v("#")]),n._v(" 3.组合继承(伪经典继承)")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("function Parent(name) {\n    this.name = name;\n    this.fruits = ['apple', 'pear', 'peach'];\n}\n\nParent.prototype.getName = function() {\n    console.log(this.name)\n}\n\nfunction Child(name, age) {\n    this.age = age;\n    Parent.call(this, name);\n}\n\nChild.prototype = new Parent();\nChild.prototype.constructor = Child;\n\nvar child1 = new Child('Jason', 22);\n")])])]),t("p",[n._v("缺点： Parent 的构造函数被调用了两次, Parent 构造函数的属性在实例和原型中同时存在(占用内存)")]),n._v(" "),t("hr"),n._v(" "),t("h3",{attrs:{id:"_4-原型式继承-object-create"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-原型式继承-object-create"}},[n._v("#")]),n._v(" 4.原型式继承(Object.create())")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("function createObj(obj) {\n    function F() {};\n    F.prototype = obj;\n    return new F();\n}\n")])])]),t("p",[n._v("缺点： 引用类型的值始终会被共享")]),n._v(" "),t("hr"),n._v(" "),t("h3",{attrs:{id:"_5-寄生式继承"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-寄生式继承"}},[n._v("#")]),n._v(" 5.寄生式继承")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("function createObj(obj) {\n    var clone = Object(obj);\n    clone.sayHi = function () {\n        console.log('Hi')\n    };\n    return clone;\n}\n")])])]),t("hr"),n._v(" "),t("h3",{attrs:{id:"_6-寄生组合式继承"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-寄生组合式继承"}},[n._v("#")]),n._v(" 6.寄生组合式继承")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("function Parent(name) {\n    this.name = name;\n    this.fruits = ['apple', 'pear', 'peach'];\n}\n\nParent.prototype.getName = function() {\n    console.log(this.name)\n}\n\nfunction Child(name, age) {\n    this.age = age;\n    Parent.call(this, name);\n}\n\nfunction inheritPrototype(Child, Parent) {\n    var prototype = Object(Parent.prototype);\n    prototype.constructor = Child;\n    Child.prototype = prototype;\n}\n\ninheritPrototype(Child, Parent)\n\nvar child1 = new Child('Jason', 22);\n")])])]),t("p",[n._v("核心：创建一个父类原型对象的一个副本，然后将子类的 prototype 指向该副本")]),n._v(" "),t("p",[n._v("最后引用红宝书中的话：这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的\n多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承\n是引用类型最理想的继承范式")]),n._v(" "),t("hr")])}),[],!1,null,null,null);t.default=r.exports}}]);