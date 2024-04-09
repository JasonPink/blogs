## 微前端实践

### 主应用

微应用通过一个 component 来承载，可以统一将微应用路由归并到这个组件路由来

通过正则匹配路由，只要是微应用的路由都可以匹配进来,路由配置

```
{
    path: '/:micro(micro-vue|micro-clouds|xxx):endPath(.*)',
    name: 'MicroApp',
    meta: { title: '微前端应用' },
    component: () => import(/* webpackChunkName: "qiankun" */'@/views/qiankun/MicroApp.vue')
}
```

微应用配置

```
import useUserStore from '../../store/user';
import router from '@/router/index';

const userStore = useUserStore();

export const microApps = [
  {
    name: 'question-answering',
    entry: process.env.VUE_APP_MICRO_QUESTION,
    activeRule: '/question-answering',
    container: '#subapp', // 子应用挂载的div
    props: {
      container: '#subapp',
      routerBase: '/question-answering',
      token: localStorage.getItem('main_token'),
      userInfo: userStore.userInfo,
      loginOut: userStore.loginOut,
      mainRouter: router
    }
  }
];
```

### 微应用

微应用不需要额外安装任何其他依赖即可接入 qiankun 主应用，这里我们以 vue 技术栈为例

1. 新增 public-path.js 文件，用于修改运行时的 publicPath
2. 微应用建议使用 history 模式的路由，需要设置路由 base，值和它的 activeRule 是一样的。**用于主应用匹配微应用的路由前缀**,因为可能存在多个微应用，所以每个微应用最好配置一个唯一前缀

3. 在入口文件最顶部引入 public-path.js，修改并导出三个生命周期钩子函数
   微应用需要在自己的入口 js (通常就是你配置的 webpack 的 entry js) 导出 bootstrap、mount、unmount 三个生命周期钩子，以供主应用在适当的时机调用。

```
   export async function bootstrap() {
        console.log('[vue] vue app bootstraped');
   }

   export async function mount(props) {
        console.log('[vue] props from main framework', props);
        render(props);
   }

   export async function unmount() {
        instance.$destroy();
        instance.$el.innerHTML = '';
        instance = null;
        router = null;
   }
```

4. 配置微应用的打包工具

```
const packageName = require('./package.json').name;

module.exports = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${packageName}`, //webpack v5
    jsonpFunction: `webpackJsonp_${packageName}`, //webpack v4
  },
};
```

### 问题解决

1. 子应用路由跳转后，再点击主应用路由出错

   可以将主应用的路由实例通过 props 传递给子应用，所有路由跳转统一使用主应用传递的实例

2. 样式隔离

   为防止各个应用间样式冲突，可以设置组件框架前缀,elementPlus 修改组件框架前缀

- 设置 ElConfigProvider

```
<template>
 <el-config-provider namespace="unique_app_name">
   <router-view></router-view>
 </el-config-provider>
</template>
```

- 设置 SCSS 和 CSS 变量

```
@forward "element-plus/theme-chalk/src/mixins/config.scss" with (
  $namespace: "unique_app_name"
);
```

- 在 vue.config.jss 中导入 styles/element/index.scss

```
const AutoImport = require('unplugin-auto-import/webpack').default;
const Components = require('unplugin-vue-components/webpack').default;
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const ElementPlus = require('unplugin-element-plus/webpack');
plugins: [
    AutoImport({
        resolvers: [
            ElementPlusResolver({
            importStyle: 'sass'
            })
        ]
    }),
    Components({
        resolvers: [
            ElementPlusResolver({
            importStyle: 'sass'
            })
        ]
    }),
    ElementPlus({
        useSource: true
    })
]
```

- 解决 "使用了 element-plus 自定义命名空间之后导致 ElMessage 等通过 api 调用的组件无法获取到样式" 问题

```
// main.js
import "element-plus/theme-chalk/src/message.scss";
import "element-plus/theme-chalk/src/message-box.scss";
import "element-plus/theme-chalk/src/dialog.scss";
```

- 全局替换业务代码里的 ".el-" 为 ".xx-"
