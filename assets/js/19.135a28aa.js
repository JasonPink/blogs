(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{248:function(t,e,n){"use strict";n.d(e,"d",(function(){return r})),n.d(e,"a",(function(){return s})),n.d(e,"i",(function(){return a})),n.d(e,"h",(function(){return u})),n.d(e,"f",(function(){return c})),n.d(e,"g",(function(){return o})),n.d(e,"b",(function(){return l})),n.d(e,"e",(function(){return p})),n.d(e,"k",(function(){return f})),n.d(e,"l",(function(){return h})),n.d(e,"c",(function(){return d})),n.d(e,"j",(function(){return b}));n(46);const r=/#.*$/,i=/\.(md|html)$/,s=/\/$/,a=/^[a-z]+:/i;function u(t){return decodeURI(t).replace(r,"").replace(i,"")}function c(t){return a.test(t)}function o(t){return/^mailto:/.test(t)}function l(t){if(c(t))return t;const e=t.match(r),n=e?e[0]:"",i=u(t);return s.test(i)?t:i+".html"+n}function p(t,e){const n=t.hash,i=function(t){const e=t&&t.match(r);if(e)return e[0]}(e);if(i&&n!==i)return!1;return u(t.path)===u(e)}function f(t,e,n){if(c(e))return{type:"external",path:e};n&&(e=function(t,e,n){const r=t.charAt(0);if("/"===r)return t;if("?"===r||"#"===r)return e+t;const i=e.split("/");n&&i[i.length-1]||i.pop();const s=t.replace(/^\//,"").split("/");for(let t=0;t<s.length;t++){const e=s[t];".."===e?i.pop():"."!==e&&i.push(e)}""!==i[0]&&i.unshift("");return i.join("/")}(e,n));const r=u(e);for(let e=0;e<t.length;e++)if(u(t[e].regularPath)===r)return Object.assign({},t[e],{type:"page",path:l(t[e].path)});return console.error(`[vuepress] No matching page found for sidebar item "${e}"`),{}}function h(t,e,n,r){const{pages:i,themeConfig:s}=n,a=r&&s.locales&&s.locales[r]||s;if("auto"===(t.frontmatter.sidebar||a.sidebar||s.sidebar))return function(t){const e=d(t.headers||[]);return[{type:"group",collapsable:!1,title:t.title,path:null,children:e.map(e=>({type:"auto",title:e.title,basePath:t.path,path:t.path+"#"+e.slug,children:e.children||[]}))}]}(t);const u=a.sidebar||s.sidebar;if(u){const{base:t,config:n}=function(t,e){if(Array.isArray(e))return{base:"/",config:e};for(const r in e)if(0===(n=t,/(\.html|\/)$/.test(n)?n:n+"/").indexOf(encodeURI(r)))return{base:r,config:e[r]};var n;return{}}(e,u);return n?n.map(e=>function t(e,n,r,i=1){if("string"==typeof e)return f(n,e,r);if(Array.isArray(e))return Object.assign(f(n,e[0],r),{title:e[1]});{i>3&&console.error("[vuepress] detected a too deep nested sidebar group.");const s=e.children||[];return 0===s.length&&e.path?Object.assign(f(n,e.path,r),{title:e.title}):{type:"group",path:e.path,title:e.title,sidebarDepth:e.sidebarDepth,children:s.map(e=>t(e,n,r,i+1)),collapsable:!1!==e.collapsable}}}(e,i,t)):[]}return[]}function d(t){let e;return(t=t.map(t=>Object.assign({},t))).forEach(t=>{2===t.level?e=t:e&&(e.children||(e.children=[])).push(t)}),t.filter(t=>2===t.level)}function b(t){return Object.assign(t,{type:t.items&&t.items.length?"links":"link"})}},257:function(t,e,n){},271:function(t,e,n){"use strict";n.r(e);var r=n(248);function i(t,e,n,r,i){return t("router-link",{props:{to:e,activeClass:"",exactActiveClass:""},class:{active:r,"sidebar-link":!0}},[i?n.replace("- "+i,""):n,i?t("span",{class:"span-new-update"},i):null])}function s(t,e,n,a,u,c=1){return!e||c>u?null:t("ul",{class:"sidebar-sub-headers"},e.map(e=>{const o=Object(r.e)(a,n+"#"+e.slug);return t("li",{class:"sidebar-sub-header"},[i(t,"#"+e.slug,e.title,o),s(t,e.children,n,a,u,c+1)])}))}var a={functional:!0,props:["item"],render(t,{parent:{$page:e,$site:n,$route:a},props:{item:u}}){let c=null;-1!=u.title.search("- new")?c="new":-1!=u.title.search("- update")?c="update":-1!=u.title.search("- ssr")&&(c="ssr");const o=Object(r.e)(a,u.path),l="auto"===u.type?o||u.children.some(t=>Object(r.e)(a,u.basePath+"#"+t.slug)):o,p=i(t,u.path,u.title||u.path,l,c),f=null!=e.frontmatter.sidebarDepth?e.frontmatter.sidebarDepth:n.themeConfig.sidebarDepth,h=null==f?1:f;if("auto"===u.type)return[p,s(t,u.children,u.basePath,a,h)];if(l&&u.headers&&!r.d.test(u.path)){return[p,s(t,Object(r.c)(u.headers),u.path,a,h)]}return p}},u=(n(275),n(1)),c=Object(u.a)(a,void 0,void 0,!1,null,null,null);e.default=c.exports},275:function(t,e,n){"use strict";n(257)}}]);