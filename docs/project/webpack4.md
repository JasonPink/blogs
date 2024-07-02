## Webpack4 配置

安装 webpack、webpack-cli，安装好之后运行 npx webpack -v 可以查看安装的版本

npx 是 Node 附带的一个工具,npx 会执行 bin 里的文件

```
// webpack4 分成了两个包方便管理
npm i webpack@4 webpack-cli@4 webpack-dev-server@4 -D
```

### 1. mode

Webpack 4 引入了 mode 这个选项，选项的值可以是 development 或者 production（默认值）。设置了 mode 之后会把 process.env.NODE_ENV 也设置为对应值

### 2. entry

默认的入口文件为 src/index.js，也可以写成数组或对象的形式来实现多入口打包

```
// 真正实现多入口和多出口需要写成对象的方式
entry: {
    index: './src/index.js',
    login: './src/login.js'
},
```

### 3. module

- 遇到非 js 结尾的模块，webpack 会去 module 中找相应的规则，匹配到了对于的规则，然后去求助于对应的 loader
- loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL
- 常用 loader:
  - babel-loader: 将 es6+ 转译为 es5
  - css-loader: 处理 CSS 文件中的 @import 和 url() 等语句
  - style-loader: 将 CSS 代码注入到 DOM 中的 <style\> 标签中
  - sass-loader: 将 Sass/SCSS 文件编译为 CSS 文件
  - file-loader: 处理文件的加载（如图片、字体），并输出到指定目录
  - url-loader: 与 file-loader 类似，但可以将小文件转换为 base64 URL，以减少 HTTP 请求
  - raw-loader: 将文件以字符串形式导入

```
module: {
    rules: [
        {
            test: /\.css$/,     // 解析css
            exclude: '',
            include: '',
            use: ['style-loader', 'css-loader'] // 从右向左解析
            use: [
                {loader: 'style-loader'},
                {
                    loader: 'css-loader',
                    options:{
                        modules: true
                    }
                }
            ] // 也可以这样写，这种方式方便写一些配置参数
        },
        {
            {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit : 102400  //100KB
                }
            }

        }
    ]
}

// 可以在 import 语句或任何 等同于 "import" 的方法 中指定 loader。
使用 ! 将资源中的 loader 分开。每个部分都会相对于当前目录解析

import Styles from 'style-loader!css-loader?modules!./styles.css';
```

### 4. plugins

可以在 webpack 运行到某个时刻的时候,帮你做一些事情

```
npm install --save-dev html-webpack-plugin

const HtmlWebpackPlugin = require('html-webpack-plugin');

plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html'  // 以src/目录下的index.html为模板打包
    }
)],
```

### 5. 完整例子

```
const path = require("path");
const webpack = require("webpack");
// 插件都是一个类，所以我们命名的时候尽量用大写开头
const HtmlWebpackPlugin = require("html-webpack-plugin"); //打包html
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取出来css
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 压缩打包后的js
const HappyPack = require("happypack"); // 多线程构建
const happyThreadPool = HappyPack.ThreadPool({ size: 5 }); // 构造出共享进程池，进程池中包含5个子进程
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 最大化压缩css

// 解决css 分离后图片引入路径不正确问题
if (process.env.type == "build") {
  // 判断package.json里面是build还是dev命令
  // 开发
  var website = {
    publicPath: "/",
  };
} else {
  // 生产
  var website = {
    publicPath: "/",
  };
}

module.exports = {
  mode: "development", // 模式配置
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "bundle.[chunkhash:6].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: website.publicPath, // 解决css 分离后图片引入路径不正确问题
  },
  module: {
    rules: [
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "[name]_[hash:7].[ext]",
              outputPath: "static/images/",
            },
          },
        ],
      },
      {
        test: /\.(htm|html)$/,
        use: "html-withimg-loader",
      },
      // babel 解析es7 es6 jsx
      {
        test: /\.(jsx|js)$/,
        include: [path.resolve(__dirname, "src")],
        use: ["babel-loader"],
        /*
                    如果开启多线程进行构建
                    use:['happypack/loader?id=js'],
                    loader这样写 匹配下面注释的插件
                */
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // 打包html
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      hash: true,
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[chunkhash:8].css",
      chunkFilename: "[id].css",
    }),
    new UglifyJsPlugin({
      parallel: true,
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify("DEV"),
    }),
    // 多线程构建 匹配上面的loader
    // new HappyPack({
    //     id: 'js',
    //     //threads: 4,
    //     loaders: ['babel-loader'],
    //     threadPool: happyThreadPool, // 使用共享进程池中的子进程去处理任务
    // }),
  ],
  // 提取公共代码
  optimization: {
    minimizer: [
      // 自定义js优化配置，将会覆盖默认配置 最大化压缩成js
      new UglifyJsPlugin({
        exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
        cache: true,
        parallel: true, // 开启并行压缩，充分利用cpu
        sourceMap: false,
        extractComments: false, // 移除注释
        uglifyOptions: {
          compress: {
            unused: true,
            warnings: false,
            drop_debugger: true,
          },
          output: {
            comments: false,
          },
        },
      }),
      // 用于优化css文件 最大化压缩成css 并且去掉注释掉的css
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true },
          mergeLonghand: false,
          discardComments: {
            removeAll: true, // 移除注释
          },
        },
        canPrint: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: "initial",
          name: "vendor", // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10,
        },
        // utils: { // 抽离自己写的公共代码，utils这个名字可以随意起 (css/js公用的都会单独抽离出来生成一个单独的文件)
        //     chunks: 'initial',
        //     name: 'utils',  // 任意命名
        //     minSize: 0    // 只要超出0字节就生成一个新包
        // }
      },
    },
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
  },
  // externals: {
  //     jquery: "jQuery",
  // },
  resolve: {
    // alias 别名配置，它能够将导入语句里的关键字替换成你需要的路径
    alias: {
      // 比如我们就可以直接写 import Nav from '@/Nav'
      "@": "./app/component",
    },
    // 省略后缀
    extensions: [".js", ".jsx", ".less", ".json", ".css"],
  },
  performance: {
    hints: false, // 选项可以控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」
  },
};

```

### 参考文章

[webpack4 配置](https://juejin.cn/post/6859888538004783118?searchId=202406242117369C4C1F4FA2233357CFFF#heading-18)
