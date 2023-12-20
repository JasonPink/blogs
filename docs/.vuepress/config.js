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
        title: "JS",
        path: "/javascript/1",
        collapsable: true,
        children: [
          {
            title: "0.1+0.2",
            path: "/javascript/0.1+0.2",
          },
          {
            title: "ES6解构的本质",
            path: "/javascript/ES6解构的本质",
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
            title: "代码片段",
            path: "/javascript/常用代码片段",
          },
        ],
      },
      {
        title: "团队规范",
        path: "/team/Eslint+Prettier",
        collapsable: true,
        children: [
          {
            title: "Eslint+Prettier",
            path: "/team/Eslint+Prettier",
          },
        ],
      },
      {
        title: "Vue",
        path: "/vue/nextTick",
        collapsable: true,
        children: [{ title: "nextTick原理", path: "/vue/nextTick" }],
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
