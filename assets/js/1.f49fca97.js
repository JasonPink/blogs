(window.webpackJsonp=window.webpackJsonp||[]).push([[1,10,11,14,18,26,30,32,42],{248:function(t,e,n){"use strict";n.d(e,"d",(function(){return s})),n.d(e,"a",(function(){return r})),n.d(e,"i",(function(){return o})),n.d(e,"h",(function(){return a})),n.d(e,"f",(function(){return u})),n.d(e,"g",(function(){return l})),n.d(e,"b",(function(){return c})),n.d(e,"e",(function(){return h})),n.d(e,"k",(function(){return p})),n.d(e,"l",(function(){return f})),n.d(e,"c",(function(){return d})),n.d(e,"j",(function(){return g}));n(46);const s=/#.*$/,i=/\.(md|html)$/,r=/\/$/,o=/^[a-z]+:/i;function a(t){return decodeURI(t).replace(s,"").replace(i,"")}function u(t){return o.test(t)}function l(t){return/^mailto:/.test(t)}function c(t){if(u(t))return t;const e=t.match(s),n=e?e[0]:"",i=a(t);return r.test(i)?t:i+".html"+n}function h(t,e){const n=t.hash,i=function(t){const e=t&&t.match(s);if(e)return e[0]}(e);if(i&&n!==i)return!1;return a(t.path)===a(e)}function p(t,e,n){if(u(e))return{type:"external",path:e};n&&(e=function(t,e,n){const s=t.charAt(0);if("/"===s)return t;if("?"===s||"#"===s)return e+t;const i=e.split("/");n&&i[i.length-1]||i.pop();const r=t.replace(/^\//,"").split("/");for(let t=0;t<r.length;t++){const e=r[t];".."===e?i.pop():"."!==e&&i.push(e)}""!==i[0]&&i.unshift("");return i.join("/")}(e,n));const s=a(e);for(let e=0;e<t.length;e++)if(a(t[e].regularPath)===s)return Object.assign({},t[e],{type:"page",path:c(t[e].path)});return console.error(`[vuepress] No matching page found for sidebar item "${e}"`),{}}function f(t,e,n,s){const{pages:i,themeConfig:r}=n,o=s&&r.locales&&r.locales[s]||r;if("auto"===(t.frontmatter.sidebar||o.sidebar||r.sidebar))return function(t){const e=d(t.headers||[]);return[{type:"group",collapsable:!1,title:t.title,path:null,children:e.map(e=>({type:"auto",title:e.title,basePath:t.path,path:t.path+"#"+e.slug,children:e.children||[]}))}]}(t);const a=o.sidebar||r.sidebar;if(a){const{base:t,config:n}=function(t,e){if(Array.isArray(e))return{base:"/",config:e};for(const s in e)if(0===(n=t,/(\.html|\/)$/.test(n)?n:n+"/").indexOf(encodeURI(s)))return{base:s,config:e[s]};var n;return{}}(e,a);return n?n.map(e=>function t(e,n,s,i=1){if("string"==typeof e)return p(n,e,s);if(Array.isArray(e))return Object.assign(p(n,e[0],s),{title:e[1]});{i>3&&console.error("[vuepress] detected a too deep nested sidebar group.");const r=e.children||[];return 0===r.length&&e.path?Object.assign(p(n,e.path,s),{title:e.title}):{type:"group",path:e.path,title:e.title,sidebarDepth:e.sidebarDepth,children:r.map(e=>t(e,n,s,i+1)),collapsable:!1!==e.collapsable}}}(e,i,t)):[]}return[]}function d(t){let e;return(t=t.map(t=>Object.assign({},t))).forEach(t=>{2===t.level?e=t:e&&(e.children||(e.children=[])).push(t)}),t.filter(t=>2===t.level)}function g(t){return Object.assign(t,{type:t.items&&t.items.length?"links":"link"})}},249:function(t,e,n){},250:function(t,e,n){"use strict";n.r(e);var s={name:"SidebarGroup",methods:{setHeight(t){t.style.height=t.scrollHeight+"px"},unsetHeight(t){t.style.height=""}}},i=(n(251),n(1)),r=Object(i.a)(s,(function(){return(0,this._self._c)("transition",{attrs:{name:"dropdown"}},[this._t("default")],2)}),[],!1,null,null,null);e.default=r.exports},251:function(t,e,n){"use strict";n(249)},252:function(t,e,n){},253:function(t,e,n){"use strict";n.r(e);var s=n(248),i={props:{item:{required:!0}},computed:{link(){return Object(s.b)(this.item.link)}},methods:{isExternal:s.f,isMailto:s.g}},r=n(1),o=Object(r.a)(i,(function(){var t=this,e=t._self._c;return t.isExternal(t.link)?e("a",{staticClass:"nav-link",attrs:{href:t.link,target:t.isMailto(t.link)?null:"_blank",rel:t.isMailto(t.link)?null:"noopener noreferrer"}},[t._v(t._s(t.item.text))]):e("router-link",{staticClass:"nav-link",attrs:{to:t.link,exact:"/"===t.link}},[t._v(t._s(t.item.text))])}),[],!1,null,null,null);e.default=o.exports},256:function(t,e,n){},258:function(t,e,n){"use strict";n(252)},259:function(t,e,n){"use strict";n.r(e);n(258);var s=n(1),i=Object(s.a)({},(function(t,e){return t("svg",{staticClass:"icon outbound",attrs:{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15"}},[t("path",{attrs:{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}}),e._v(" "),t("polygon",{attrs:{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"}})])}),[],!0,null,null,null);e.default=i.exports},263:function(t,e,n){},264:function(t,e,n){},267:function(t,e,n){},274:function(t,e,n){"use strict";n(256)},279:function(t,e,n){"use strict";n.r(e);n(248);var s=n(253),i=n(250),r={components:{NavLink:s.default,DropdownTransition:i.default},data:()=>({open:!1}),props:{item:{required:!0}},methods:{toggle(){this.open=!this.open}}},o=(n(274),n(1)),a=Object(o.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"dropdown-wrapper",class:{open:t.open}},[e("a",{staticClass:"dropdown-title",on:{click:t.toggle}},[e("span",{staticClass:"title"},[t._v(t._s(t.item.text))]),t._v(" "),e("span",{staticClass:"arrow",class:t.open?"down":"right"})]),t._v(" "),e("DropdownTransition",[e("ul",{staticClass:"nav-dropdown"},t._l(t.item.items,(function(n){return e("li",{key:n.link,staticClass:"dropdown-item"},["links"===n.type?e("h4",[t._v(t._s(n.text))]):t._e(),t._v(" "),"links"===n.type?e("ul",{staticClass:"dropdown-subitem-wrapper"},t._l(n.items,(function(t){return e("li",{key:t.link,staticClass:"dropdown-subitem"},[e("NavLink",{attrs:{item:t}})],1)})),0):e("NavLink",{attrs:{item:n}})],1)})),0)])],1)}),[],!1,null,null,null);e.default=a.exports},284:function(t,e,n){"use strict";n(263)},285:function(t,e,n){"use strict";n(264)},290:function(t,e,n){"use strict";n(267)},291:function(t,e,n){},295:function(t,e,n){"use strict";n.r(e);n(46);var s={data:()=>({query:"",focused:!1,focusIndex:0}),computed:{showSuggestions(){let t=this.focused&&this.suggestions&&this.suggestions.length;return this.$parent.activeSuggestion=t,t},suggestions(){const t=this.query.trim().toLowerCase();if(!t)return;const{pages:e,themeConfig:n}=this.$site,s=n.searchMaxSuggestions||5,i=this.$localePath,r=e=>e.title&&e.title.toLowerCase().indexOf(t)>-1,o=[];for(let t=0;t<e.length&&!(o.length>=s);t++){const n=e[t];if(this.getPageLocalePath(n)===i)if(r(n))o.push(n);else if(n.headers)for(let t=0;t<n.headers.length&&!(o.length>=s);t++){const e=n.headers[t];r(e)&&o.push(Object.assign({},n,{path:n.path+"#"+e.slug,header:e}))}}return o},alignRight(){return(this.$site.themeConfig.nav||[]).length+(this.$site.repo?1:0)<=2}},methods:{returnTitle:t=>t.replace("\x3c!--#new--\x3e","").replace("\x3c!--#update--\x3e",""),getPageLocalePath(t){for(const e in this.$site.locales||{})if("/"!==e&&0===t.path.indexOf(e))return e;return"/"},onUp(){this.showSuggestions&&(this.focusIndex>0?this.focusIndex--:this.focusIndex=this.suggestions.length-1)},onDown(){this.showSuggestions&&(this.focusIndex<this.suggestions.length-1?this.focusIndex++:this.focusIndex=0)},go(t){this.$router.push(this.suggestions[t].path),this.query="",this.focusIndex=0},focus(t){this.focusIndex=t},unfocus(){this.focusIndex=-1}}},i=(n(284),n(1)),r=Object(i.a)(s,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"search-box"},[e("input",{attrs:{"aria-label":"Search",placeholder:"Search",autocomplete:"off",spellcheck:"false"},domProps:{value:t.query},on:{input:function(e){t.query=e.target.value},focus:function(e){t.focused=!0},blur:function(e){t.focused=!1},keyup:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.go(t.focusIndex)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:t.onUp.apply(null,arguments)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:t.onDown.apply(null,arguments)}]}}),t._v(" "),e("transition",{attrs:{name:"suggestionsx"}},[t.showSuggestions?e("ul",{staticClass:"suggestions",class:{"align-right":t.alignRight},on:{mouseleave:t.unfocus}},t._l(t.suggestions,(function(n,s){return e("li",{staticClass:"suggestion",class:{focused:s===t.focusIndex},on:{mousedown:function(e){return t.go(s)},mouseenter:function(e){return t.focus(s)}}},[e("a",{attrs:{href:n.path},on:{click:function(t){t.preventDefault()}}},[e("span",{staticClass:"page-title"},[t._v(t._s(t.returnTitle(n.title)||n.path))]),t._v(" "),n.header?e("span",{staticClass:"header"},[t._v("> "+t._s(n.header.title))]):t._e()])])})),0):t._e()])],1)}),[],!1,null,null,null);e.default=r.exports},296:function(t,e,n){"use strict";n.r(e);var s=n(259),i=n(279),r=n(248),o=n(253),a={components:{OutboundLink:s.default,NavLink:o.default,DropdownLink:i.default},computed:{userNav(){return this.$themeLocaleConfig.nav||this.$site.themeConfig.nav||[]},nav(){const{locales:t}=this.$site;if(t&&Object.keys(t).length>1){let e=this.$page.path;const n=this.$router.options.routes,s=this.$site.themeConfig.locales||{},i={text:this.$themeLocaleConfig.selectText||"Languages",items:Object.keys(t).map(i=>{const r=t[i],o=s[i]&&s[i].label||r.lang;let a;return r.lang===this.$lang?a=e:(a=e.replace(this.$localeConfig.path,i),n.some(t=>t.path===a)||(a=i)),{text:o,link:a}})};return[...this.userNav,i]}return this.userNav},userLinks(){return(this.nav||[]).map(t=>Object.assign(Object(r.j)(t),{items:(t.items||[]).map(r.j)}))},repoLink(){const{repo:t}=this.$site.themeConfig;if(t)return/^https?:/.test(t)?t:"https://github.com/"+t},repoLabel(){if(!this.repoLink)return;if(this.$site.themeConfig.repoLabel)return this.$site.themeConfig.repoLabel;const t=this.repoLink.match(/^https?:\/\/[^/]+/)[0],e=["GitHub","GitLab","Bitbucket"];for(let n=0;n<e.length;n++){const s=e[n];if(new RegExp(s,"i").test(t))return s}return"Source"}}},u=(n(285),n(1)),l=Object(u.a)(a,(function(){var t=this._self._c;return this.userLinks.length||this.repoLink?t("nav",{staticClass:"nav-links"},this._l(this.userLinks,(function(e){return t("div",{key:e.link,staticClass:"nav-item"},["links"===e.type?t("DropdownLink",{attrs:{item:e}}):t("NavLink",{attrs:{item:e}})],1)})),0):this._e()}),[],!1,null,null,null);e.default=l.exports},297:function(t,e,n){"use strict";n.r(e);var s=n(248);function i(t,e,n,s,i){return t("router-link",{props:{to:e,activeClass:"",exactActiveClass:""},class:{active:s,"sidebar-link":!0}},[i?n.replace("- "+i,""):n,i?t("span",{class:"span-new-update"},i):null])}function r(t,e,n,o,a,u=1){return!e||u>a?null:t("ul",{class:"sidebar-sub-headers"},e.map(e=>{const l=Object(s.e)(o,n+"#"+e.slug);return t("li",{class:"sidebar-sub-header"},[i(t,"#"+e.slug,e.title,l),r(t,e.children,n,o,a,u+1)])}))}var o={functional:!0,props:["item"],render(t,{parent:{$page:e,$site:n,$route:o},props:{item:a}}){let u=null;-1!=a.title.search("- new")?u="new":-1!=a.title.search("- update")?u="update":-1!=a.title.search("- ssr")&&(u="ssr");const l=Object(s.e)(o,a.path),c="auto"===a.type?l||a.children.some(t=>Object(s.e)(o,a.basePath+"#"+t.slug)):l,h=i(t,a.path,a.title||a.path,c,u),p=null!=e.frontmatter.sidebarDepth?e.frontmatter.sidebarDepth:n.themeConfig.sidebarDepth,f=null==p?1:p;if("auto"===a.type)return[h,r(t,a.children,a.basePath,o,f)];if(c&&a.headers&&!s.d.test(a.path)){return[h,r(t,Object(s.c)(a.headers),a.path,o,f)]}return h}},a=(n(290),n(1)),u=Object(a.a)(o,void 0,void 0,!1,null,null,null);e.default=u.exports},308:function(t,e,n){"use strict";n(291)},313:function(t,e,n){},331:function(t,e,n){"use strict";n.r(e);var s=n(297),i=n(250),r={name:"SidebarGroup",props:["item","first","open","collapsable"],components:{SidebarLink:s.default,DropdownTransition:i.default}},o=(n(308),n(1)),a=Object(o.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"sidebar-group",class:{first:t.first,collapsable:t.collapsable}},[e("p",{staticClass:"sidebar-heading",class:{open:t.open},on:{click:function(e){return t.$emit("toggle")}}},[e("span",[t._v(t._s(t.item.title))])]),t._v(" "),e("DropdownTransition",[t.open||!t.collapsable?e("ul",{ref:"items",staticClass:"sidebar-group-items"},t._l(t.item.children,(function(t){return e("li",[e("SidebarLink",{attrs:{item:t}})],1)})),0):t._e()])],1)}),[],!1,null,null,null);e.default=a.exports},335:function(t,e,n){"use strict";n(313)},377:function(t,e,n){"use strict";n.r(e);var s=n(331),i=n(297),r=n(296),o=n(295),a=n(248);var u={components:{SidebarGroup:s.default,SidebarLink:i.default,NavLinks:r.default,SearchBox:o.default},props:["items"],data:()=>({openGroupIndex:0,activeSuggestion:!1}),created(){this.refreshIndex()},watch:{$route(){this.refreshIndex()}},methods:{refreshIndex(){const t=function(t,e){for(let n=0;n<e.length;n++){const s=e[n];if("group"===s.type&&s.children.some(e=>Object(a.e)(t,e.path)))return n}return-1}(this.$route,this.items);t>-1&&(this.openGroupIndex=t)},toggleGroup(t){this.openGroupIndex=t===this.openGroupIndex?-1:t},isActive(t){return Object(a.e)(this.$route,t.path)}}},l=(n(335),n(1)),c=Object(l.a)(u,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"sidebar",class:{activeSuggestion:t.activeSuggestion}},[e("div",{staticClass:"c-sidebar"},[t._t("top"),t._v(" "),!1!==t.$site.themeConfig.search?e("SearchBox"):t._e(),t._v(" "),e("NavLinks"),t._v(" "),t.items.length?e("ul",{staticClass:"sidebar-links"},t._l(t.items,(function(n,s){return e("li",["group"===n.type?e("SidebarGroup",{attrs:{item:n,first:0===s,open:!0,collapsable:n.collapsable},on:{toggle:function(e){return t.toggleGroup(s)}}}):e("SidebarLink",{attrs:{item:n}})],1)})),0):t._e(),t._v(" "),t._t("bottom")],2)])}),[],!1,null,null,null);e.default=c.exports}}]);