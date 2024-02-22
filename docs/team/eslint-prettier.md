## VSCode 安装插件

- ESLint VSCode 插件， 主要的作用是会将有错的地方进行标记，方便我们知道哪些文件、哪些代码是有问题的
- Prettier VSCode 插件，主要作用是代码格式化的时候按照项目约定的规范进行代码美化

---

## 安装 ESlint

```
# 全局安装 ESLint
$ npm install -g eslint

# 初始化 ESLint 配置
$ eslint --init
```

经过一系列一问一答的环节后，你会发现在你文件夹的根目录生成了一个 .eslintrc.js，文件配置如下

```
module.exports = {
	env: {// 环境
		browser: true,
		es2021: true,
	},
	extends: [// 拓展
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser', // 解析器，本解析器支持Ts
	parserOptions: {// 解析器配置选项
		ecmaVersion: 2020, // 指定es版本
		sourceType: 'module', // 代码支持es6，使用module
	},
	plugins: [// 插件
		'@typescript-eslint',
	],
	rules: {
		// 规则
	},
};
```

1.  parserOptions-解析器选项
    - ecmaVersion
      - 你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本
    - sourceType
      - 设置为 script (默认) 或 module（如果你的代码是 ECMAScript 模块)
    - parser
      - babel-eslint (主要用于将 ECMAScript 2015+(es6+) 版本的代码转换为向后兼容的 JavaScript 语法)
      - @typescript-eslint/parser (该解析器将 TypeScript 转换成与 estree 兼容的形式， 允许 ESLint 验证 TypeScript 源代码)
    - ecmaFeatures (这是个对象，表示你想使用的额外的语言特性)
      - jsx - 启用 JSX
2.  env 和 golbals - 环境和全局变量

    - ESLint 会检测未声明的变量，并发出警告，但是有些变量是我们引入的库声明的，这里就需要提前在配置中声明

    ```
    {
        "env": {
            "browser": true,
            "es2021": true,
            "jquery": true // 环境中开启jquery，表示声明了jquery相关的全局变量，无需在globals二次声明
        }
    }

    ```

3.  rules - 规则

    - off 或 0：关闭规则
    - warn 或 1：开启规则，warn 级别的错误 (不会导致程序退出)
    - error 或 2：开启规则，error 级别的错误(当被触发的时候，程序会退出)

4.  plugins - 插件
    - 我们要在项目中使用 TypeScript，需要将解析器改为@typescript-eslint/parser，同时需要安装@typescript-eslint/eslint-plugin 插件来拓展规则,**添加的 plugins 中的规则默认是不开启的**
5.  extends - 拓展 - extends 可以理解为一份配置好的 plugin 和 rules

    ````
    {
        "extends": [
            "eslint:recommended", // 官方拓展
            "plugin:@typescript-eslint/recommended", // 插件拓展
            "standard", // npm 包，开源社区流行的配置方案，比如：eslint-config-airbnb、eslint-config-standard
        ],
        "rules": {
            "indent": ["error", 4], // 拓展或覆盖 extends 配置的规则
            "no-console": "off",
        }
    };

        ```
    ````

---

## 安装 Prettier

```
$ npm install --save-dev --save-exact prettier

$ yarn add --dev --exact prettier

npx prettier --write . #格式化所有文件

```

配置文件支持多种形式

- 根目录创建.prettierrc 文件，能够写入 YML、JSON 的配置格式，并且支持.yaml、.yml、.json、.js 后缀
- 根目录创建.prettier.config.js 文件，并对外 export 一个对象
- 在 package.json 中新建 Prettier 属性

---

## 与 ESLint 配合使用

    解决思路是在 ESLint 的规则配置文件上做文章，安装特定的 plugin，把其配置到规则的尾部，实现 Prettier 规则对 ESLint 规则的覆盖

```
    $ npm install --save-dev eslint-plugin-prettier
    {
        "extends": [
            ...,
            "已经配置的规则",
        +   "plugin:prettier/recommended"
        ],
        "rules": {
            "prettier/prettier": "error",
        }
    }
```

## Prettier 配置

```
module.exports = {
	printWidth: 80, // 80 每行代码长度
    tabWidth: 2, // 2 每个 tab 相当于多少个空格
    useTabs: true, // false 是否使用 tab 进行缩进
    singleQuote: true, // false 使用单引号
    semi: false, // true 声明结尾使用分号
    trailingComma: 'none', // none 多行抵用拖尾逗号
    bracketSpacing: true, // true 对象字面量的大括号间使用空格
    jsxSingleQuote: false,
    jsxBracketSameLine: false, // false 多行 jsx 中的 > 放在最后一行，而不是另起一行
    arrowParens: 'avoid', // avoid 只有一个参数是否带圆括号
    vueIndentScriptAndStyle: true, // vue文件的script标签和Style标签下的内容需要缩进
    singleAttributePerLine: false, // 在 HTML、Vue 和 JSX 中每行强制执行单个属性
    embeddedLanguageFormatting: 'auto', // 控制 Prettier 是否格式化文件中嵌入的引用代码
};

```

## 打开 vscode 配置文件 setting.json

1. 设置代码在保存的时候自动格式化
   ```
   "editor.formatOnSave": true
   ```
2. 设置 .js .ts .jsx .tsx .less .css .json 格式的文件都采用 prettier-vscode 插件进行格式化
   ```
       "[javascript]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[typescript]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[javascript|react]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[typescript|react]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[less]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[css]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "[json]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        }
   ```
3. 配置 prettier 插件读取项目中哪个配置文件，默认是根目录下的 .prettierrc 文件，如果你的项目下不是这个文件就需要修改为你的配置文件，比如很多项目为 .prettierrc.js 或者 .prettierrc.ts

   ```
   "prettier.configPath": ".prettierrc.js",
   ```

---
