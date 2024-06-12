## commonjs

在 commonjs 规范中，每个 js 文件都是一个单独的模块可以称之为 module。

- 该模块中包含 commonjs 规范的核心变量：exports、module.exports、require,
- exports、module.exports 可以负责对模块中的内容进行导出,
- require 函数可以帮助我们导入其他模块（核心模块、自定义模块、第三方库模块）中的内容

### commonjs 实现原理

每个模块文件上存在 module,exports,require 三个变量，这三个变量是没有被定义的，但我们却可以直接使用。在 nodejs 中还存在其它两个变量\_\_filename 和\_\_dirname 变量。

在编译的过程中，实际 commonjs 对 js 代码进行了首尾包装，包装后的样子如下：

```
(function(exports,require,module,__filename,__dirname){
   const sayName = require('./hello.js')
    module.exports = function say(){
        return {
            name:sayName(),
            author:'jason'
        }
    }
})
```

### require 加载原理

require 的源码大致如下，从代码中可以分析得出：

- require 会接收一个参数-文件标识符，然后分析定位文件，从 Module 上查找是否有缓存，如果有缓存直接返回缓存的内容（避免重复加载）
- 如果没有缓存，会创建一个 module 对象，缓存到 Module 上，然后执行文件，加载完文件，将 loaded 属性设置为 true,然后返回 module.exports 对象
- **exports 和 module.exports 持有相同引用**，因为最后导出的是 module.exports， 所以对 exports 进行赋值会导致 exports 操作的不再是 module.exports 的引用

```
 // id 为路径标识符
function require(id) {
   /* 查找  Module 上有没有已经加载的 js  对象*/
   const  cachedModule = Module._cache[id]

   /* 如果已经加载了那么直接取走缓存的 exports 对象  */
  if(cachedModule){
    return cachedModule.exports
  }

  /* 创建当前模块的 module  */
  const module = { exports: {} ,loaded: false , ...}

  /* 将 module 缓存到  Module 的缓存属性中，路径标识符作为 id */
  Module._cache[id] = module
  /* 加载文件 */
  runInThisContext(wrapper('module.exports = "123"'))(module.exports, require, module, __filename, __dirname)
  /* 加载完成 *//
  module.loaded = true
  /* 返回值 */
  return module.exports
}

```

require 本质上就是一个函数，可以再任何上下文中执行，所以支持动态导入

## ES Module

从 ES6 开始，JavaScript 才真正意义上有自己的模块化规范

```
// a.js
const name = 'jason'
const year = 20

export {name, year}

export const say = function(){
    console.log('hello')
}

export default {
    name,
    year,
    say
}

import {name, year, say} from './a.js' // 具名导出
import main from './a.js' // 默认导出
import main, {name, year,say} // 混合导出
import main, * as main2 // 混合导出
import {name as name2, year as yeaer, say} from './a.js' // 重命名导出

// 重定向导出
export * from './a.js'
export {name, year, say} from './a.js'
export {name as name2, year as yeaer, say} from './a.js'

// 无需导入模块，只运行模块
import 'module'
```

### es6 module 特性

- 静态语法：es6 module 的引入导出都是静态的，import 会自动提升到代码的顶层，import export 不能放在块级作用域或条件语句中
- 执行特性：与 commonjs 不同，commonjs 同步加载并执行模块代码，**es6 模块提前加载并执行模块文件**，es6 模块在预处理阶段分析模块依赖，在执行阶段执行模块，两个阶段都采用深度优先遍历

```
// main.js
console.log('main.js开始执行')
import say from './a'
import say1 from './b'
console.log('main.js执行完毕')

// a.js
import b from './b'
console.log('a模块加载')
export default  function say (){
    console.log('hello , world')
}


// b.js
console.log('b模块加载')
export default function sayhello(){
    console.log('hello,world')
}

// b模块加载
// a模块加载
// main.js开始执行
// main.js执行完毕
```

- 使用 import 被导入的模块运行在严格模式下
- 使用 import 被导入的变量是只读的，可以理解为 const ,无法被赋值
- 使用 import 被导入的变量是与原变量绑定/引用的，可以理解为 import 导入的变量无论是否为基本类型都是引用传递

## 总结

- CommonJs 模块由 JS 运行时实现
- CommonJs 是单个值导出，本质上导出的就是 exports 属性
- CommonJS 是可以动态加载的，对每一个加载都存在缓存，可以有效的解决循环引用问题。
- CommonJS 模块同步加载并执行模块文件。

* ES6 Module 静态的，不能放在块级作用域内，代码发生在编译时。
* ES6 Module 的值是动态绑定的，可以通过导出方法修改，可以直接访问修改结果。
* ES6 Module 可以导出多个属性和方法，可以单个导入导出，混合导入导出。
* ES6 模块提前加载并执行模块文件，
* ES6 Module 导入模块在严格模式下。
* ES6 Module 的特性可以很容易实现 Tree Shaking 和 Code Splitting。
