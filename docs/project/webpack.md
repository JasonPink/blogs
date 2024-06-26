## webpack

是一种用于构建 JavaScript 应用程序的静态模块打包器，它能够以一种相对一致且开放的处理方式，加载应用中的所有资源文件（图片、CSS、视频、字体文件等），并将其合并打包成浏览器兼容的 Web 资源文件。

### loader

    Loader 本质上是一个函数，负责代码的转译，即对接收到的内容进行转换后将转换后的结果返回 配置 Loader 通过在 modules.rules 中以数组的形式配置

- babel-loader: 将 es6+ 转译为 es5
- file-loader: 可以指定要复制和放置资源文件的位置
- url-loader: 和 file-loader 功能相似，但是可以通过指定阈值来根据文件大小使用不同的处理方式（小于阈值则返回 base64 格式编码并将文件的 data-url 内联到 bundle 中）
- raw-loader: 加载文件原始内容
- image-webpack-loader: 加载并压缩图片资源
- cache-loader: 可以在一些开销较大的 Loader 之前添加可以将结果缓存到磁盘中，提高构建的效率
- thread-loader: 多线程打包，加快打包速度

### plugin

    Plugin 本质上是一个带有 apply(compiler)的函数，基于 tapable 这个事件流框架来监听 webpack 构建/打包过程中发布的 hooks 来通过自定义的逻辑和功能来改变输出结果。 Plugin 通过 plugins 以数组的形式配置

- define-plugin: 定义环境变量
- web-webpack-plugin: 为单页面应用输出 html
- clean-webpack-plugin: 每次打包删除上次打包的产物
- ignore-plugin: 忽略指定的文件，可以加快构建速度
- terser-webpack-plugin: 压缩 ES6 的代码（tree-shaking）
- uglifyjs-webpack-plugin: 压缩 js 代码
- mini-css-extract-plugin: 将 CSS 提取为独立文件，支持按需加载
- css-minimize-webpack-plugin: 压缩 CSS 代码
- copy-webpack-plugin: 在构建的时候，复制静态资源到打包目录
- webpack-bundle-analyzer: 可视化 webpack 输出文件大小的根据
- speed-measure-webpack-plugin: 用于分析各个 loader 和 plugin 的耗时，可用于性能分析
- splitChunkPlugin: 用于代码分割
- UnusedWebpackPlugin: 反向查找项目中没被用到的文件
- BundleAnalyzerPlugin: 性能分析插件，可以在运行后查看是否包含重复模块/不必要模块等

Loader 主要负责将代码转译为 webpack 可以处理的 JavaScript 代码，而 Plugin 更多的是负责通过接入 webpack 构建过程来影响构建过程以及产物的输出，Loader 的职责相对比较单一简单，而 Plugin 更为丰富多样

---

### 构建流程

1.  初始化参数：从配置文件和 Shell 语句中读取与合并并计算出最终的参数
2.  开始编译：用上一步得到的初始化参数初始化 Complier 对象，加载所有配置的插件，执行 compiler 对象的 run 方法开始编译流程
3.  确定入口：根据 entry 找出入口文件
4.  编译模块：从入口文件开始，根据配置的 loader 对模块进行转译，如果该模块还有依赖的模块，则递归对这些模块进行翻译，通过递归上述操作直到对所有模块都进行转译
5.  完成模块编译： 在经过 Loader 翻译完所有模块后，得到了每个模块转译后的内容以及模块之间的依赖关系图（ModuleGraph）
6.  输出资源： 根据入口和模块之间的依赖关系 生成一个个包含多个模块的 Chunk， 再把每个 Chunk 转换成一个单独的文件加入到输出列表中
7.  输出完成： 根据输出项的配置，将文件内容写到文件系统

### 模块热更新原理（HMR）

### 优化手段

- 使用高版本的 webpack 和 node
- 多进程构建：thread-loader
- 使用 tree shaking: 删除多余模块导出
- 监控产物体积
- 缩小文件搜索范围
- 代码压缩
  - 使用 terser-webpack-plugin 压缩 ES6 代码
  - 使用 ParalleUglifyPlugin 多进程压缩代码
  - 使用 css-minimize-webpack-plugin 对 css 代码进行压缩
  - 使用 html-minimizer-webpack-plugin 压缩 html 代码
- CDN 加速
- 使用缓存构建
  - 配置 cache: {type: 'systemfile'} 开启构建缓存，可以大幅提高二次构建的速度
- 使用 DllPlugin
  - DllReferencePlugin 引用 mainfext.json , 通过将一些很少变动的代码先打包成静态资源，避免重复编译来提高构建性能
- 提取公共代码
  - 使用 splitChunkPlugin 提取公共代码，减少代码体积
- 使用可视化工具来分析性能
  - 使用 UnusedWebpackPlugin 分析未被使用到的文件
  - 使用 Webpack Bundle Analyzer 分析重复的模块或者没被用到的模块
