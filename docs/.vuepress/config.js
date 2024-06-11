module.exports = {
  title: "jasonpink's blog",
  base: "/blogs/",
  head: [
    [
      "meta",
      {
        "http-equiv": "cache-control",
        content: "no-cache, no-store, must-revalidate",
      },
    ],
    ["meta", { "http-equiv": "pragma", content: "no-cache" }],
    ["meta", { "http-equiv": "expires", content: "0" }],
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "script",
      {},
      "(function(h,o,t,j,a,r){\n                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};\n                h._hjSettings={hjid:1650620,hjsv:6};\n                a=o.getElementsByTagName('head')[0];\n                r=o.createElement('script');r.async=1;\n                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;\n                a.appendChild(r);\n            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');",
    ],
  ],
  plugins: [
    "@vuepress/medium-zoom",
    ["code-copy", true],
    "reading-progress",
    "flowchart",
    ["@vuepress/google-analytics", { ga: "UA-154622307-1" }],
  ],
  theme: "vuesax",
  nav: [{ text: "首页", link: "/" }],
  themeConfig: {
    backToTop: true,
    sidebarDepth: 0,
    // repo: "https://github.com/lq782655835/blogs",
    // docsRepo: "https://github.com/lq782655835/blogs",
    docsDir: "docs",
    docsBranch: "master",
    sidebar: [
      {
        title: "开发规范",
        path: "/team/Eslint+Prettier",
        collapsable: true,
        children: [
          {
            title: "Git规范",
            path: "/team/git",
          },
          {
            title: "Vue规范",
            path: "/team/vue",
          },
          {
            title: "Eslint+Prettier",
            path: "/team/eslint-prettier",
          },
          {
            title: "Javascript风格指南",
            path: "/team/js-style-guide",
          },
        ],
      },
      {
        title: "Project",
        path: "/project/performance",
        collapsable: true,
        children: [
          {
            title: "http协议",
            path: "/project/http",
          },
          {
            title: "前端性能优化",
            path: "/project/performance",
          },
          {
            title: "微前端实践",
            path: "/project/qiankun",
          },
          {
            title: "webpack",
            path: "/project/webpack",
          },
          {
            title: "IntersectionObserver",
            path: "/project/IntersectionObserver",
          },
        ],
      },
      {
        title: "CSS",
        path: "/CSS/block",
        collapsable: true,
        children: [
          {
            title: "BFC",
            path: "/css/bfc",
          },
          {
            title: "flex布局最后一行左对齐方案",
            path: "/css/flex-left-end",
          },
          {
            title: "层叠上下文",
            path: "/css/stacking-context",
          },
          {
            title: "你不知道的包含块",
            path: "/css/block",
          },
        ],
      },
      {
        title: "JS",
        path: "/javascript/1",
        collapsable: true,
        children: [
          {
            title: "0.1+0.2 !== 0.3",
            path: "/javascript/0.1+0.2",
          },
          {
            title: "async与defer",
            path: "/javascript/async-defer",
          },
          {
            title: "Commonjs",
            path: "/javascript/commonjs",
          },
          {
            title: "Promise",
            path: "/javascript/Promise",
          },
          {
            title: "JavaScript中的继承",
            path: "/javascript/inherit",
          },
          {
            title: "JavaScript中的执行上下文",
            path: "/javascript/context",
          },
          {
            title: "ES6解构的本质",
            path: "/javascript/ES6解构的本质",
          },
          {
            title: "防抖与节流",
            path: "/javascript/debounce",
          },
          {
            title: "for...in与for...of",
            path: "/javascript/for...in与for...of",
          },
          {
            title: "hash与history模式",
            path: "/javascript/hash与history模式",
          },
          {
            title: "事件循环机制",
            path: "/javascript/eventloop",
          },
          {
            title: "输入url发生了什么",
            path: "/javascript/url",
          },
          {
            title: "浏览器如何渲染页面",
            path: "/javascript/browser",
          },
          {
            title: "浏览器缓存机制",
            path: "/javascript/cache",
          },
          {
            title: "常用代码片段",
            path: "/javascript/use-code",
          },
        ],
      },
      {
        title: "前端工程化",
        path: "/engineer/deploy",
        collapsable: true,
        children: [
          { title: "node发布脚本", path: "/engineer/deploy" },
          { title: "github aciton", path: "/engineer/action" },
        ],
      },
      {
        title: "Vue",
        path: "/vue/nextTick",
        collapsable: true,
        children: [
          { title: "响应式原理", path: "/vue/reactive" },
          { title: "diff算法解析", path: "/vue/diff" },
          { title: "v-model原理", path: "/vue/v-model" },
          { title: "nextTick原理", path: "/vue/nextTick" },
        ],
      },
      {
        title: "React",
        path: "/react/redux",
        collapsable: true,
        children: [
          { title: "ref", path: "/react/ref" },
          { title: "useCallback", path: "/react/useCallback与useMemo" },
          { title: "高阶组件HOC", path: "/react/高阶组件HOC" },
          { title: "常见问题", path: "/react/1" },
          { title: "Redux", path: "/react/redux" },
        ],
      },
      {
        title: "读书笔记",
        path: "/booknote/CSS揭秘",
        children: [
          {
            title: "《CSS揭秘》",
            path: "/booknote/CSS揭秘",
          },
          {
            title: "《CSS世界》",
            path: "/booknote/CSS世界",
          },
        ],
      },
    ],
    lastUpdated: "最后更新时间",
  },
};
