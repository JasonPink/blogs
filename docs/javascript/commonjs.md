## Commonjs

1. CommonJS 模块由 JS 运行时实现
2. CommonJs 是单个值导出，本质上导出的就是 exports 属性。
3. CommonJS 是可以动态加载的，对每一个加载都存在缓存，可以有效的解决循环引用问题。
4. CommonJS 模块同步加载并执行模块文件。

---

## ES Module

1. ES6 Module 静态的，不能放在块级作用域内，代码发生在编译时
2. ES6 Module 的值是动态绑定的，可以通过导出方法修改，可以直接访问修改结果。
3. ES6 Module 可以导出多个属性和方法，可以单个导入导出，混合导入导出。
4. ES6 模块提前加载并执行模块文件
5. ES6 Module 导入模块在严格模式下。
6. ES6 Module 的特性可以很容易实现 Tree Shaking 和 Code Splitting。
