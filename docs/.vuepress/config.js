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
  base: "/blogs/",
  plugins: [
    "@vuepress/medium-zoom",
    ["code-copy", true],
    "reading-progress",
    "flowchart",
    ["@vuepress/google-analytics", { ga: "UA-154622307-1" }],
  ],
  theme: "vuesax",
  nav: [
    { text: "首页", link: "/" },
    // {
    //   text: "codinglin 的博客",
    //   items: [
    //     { text: "掘金", link: "https://juejin.cn/user/726107228492253" },
    //     { text: "Github", link: "https://github.com/coding-lin" },
    //   ],
    // },
  ],
  themeConfig: {
    backToTop: true,
    sidebarDepth: 0,
    // repo: "https://github.com/lq782655835/blogs",
    // docsRepo: "https://github.com/lq782655835/blogs",
    docsDir: "docs",
    docsBranch: "master",
    sidebar: [
      {
        title: "欢迎学习",
        path: "/",
        collapsable: false, // 是否折叠
        children: [{ title: "博客简介", path: "/" }],
      },
      {
        title: "JS",
        path: "/javascript/1",
        collapsable: true,
        children: [
          {
            title: "for...in与for...of",
            path: "/javascript/for...in与for...of",
          },
          { title: "第二篇", path: "/javascript/2" },
        ],
      },
      {
        title: "Vue",
        path: "/javascript/1",
        collapsable: true,
        children: [
          { title: "第一篇", path: "/javascript/1" },
          { title: "第二篇", path: "/javascript/2" },
        ],
      },
      {
        title: "React",
        path: "/javascript/1",
        collapsable: true,
        children: [
          { title: "第一篇", path: "/javascript/1" },
          { title: "第二篇", path: "/javascript/2" },
        ],
      },
    ],
    lastUpdated: "最后更新时间",
  },
};
