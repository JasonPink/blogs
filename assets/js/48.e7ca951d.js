(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{393:function(n,a,t){"use strict";t.r(a);var s=t(1),l=Object(s.a)({},(function(){var n=this,a=n._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[a("h1",{attrs:{id:"《css-揭秘》"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#《css-揭秘》"}},[n._v("#")]),n._v(" 《CSS 揭秘》")]),n._v(" "),a("h2",{attrs:{id:"背景与边框"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#背景与边框"}},[n._v("#")]),n._v(" 背景与边框")]),n._v(" "),a("p",[a("a",{attrs:{href:"https://codesandbox.io/s/border-p3m685",target:"_blank",rel:"noopener noreferrer"}},[n._v("相关代码"),a("OutboundLink")],1)]),n._v(" "),a("h3",{attrs:{id:"半透明边框"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#半透明边框"}},[n._v("#")]),n._v(" 半透明边框")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("/*初始值是border-box,背景会被元素的border-box裁剪掉*/\nbackground-clip: padding-box;\nbackground: #fff;\nborder: 10px solid hsla(0, 0%, 100%, 0.3);\n")])])]),a("h3",{attrs:{id:"多重边框"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#多重边框"}},[n._v("#")]),n._v(" 多重边框")]),n._v(" "),a("p",[n._v("box-shadow 可以接受第四个参数（称作”扩张半径“），通过指定正值或负值，可以让投影面积加大或者减小。一个正值的扩张半径加上两个为零的偏移量以及为零的模糊值，得到的投影其实就是一到实线边框。"),a("strong",[n._v("它支持逗号分割语法，我们可以创建任意数量的投影")])]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("background: yellowgreen;\nbox-shadow: 0 0 0 10px #665,\n            0 0 0 15px deeppink,\n            0 2px 5px 15px rgba(0, 0, 0, 0.6);\n")])])]),a("ul",[a("li",[n._v("投影不会影响布局，也不会受到 box-sizing 属性的影响")]),n._v(" "),a("li",[n._v("box-shadow 不会响应鼠标事件，比如悬停或点击")])]),n._v(" "),a("h3",{attrs:{id:"条纹背景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#条纹背景"}},[n._v("#")]),n._v(" 条纹背景")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("background: linear-gradient(#fb3 50%, #58a 0);\nbackground-size: 100% 30px;\n\n/*斜向条纹*/\nbackground: linear-gradient(\n  45deg,\n  #fb3 25%,\n  #58a 0,\n  #58a 50%,\n  #fb3 0,\n  #fb3 75%,\n  #58a 0\n);\nbackground-size: 42.42px 42.42px;\n\n/*更好的斜向条纹*/\nbackground: repeating-linear-gradient(\n  60deg,\n  #fb3,\n  #fb3 15px,\n  #58a 0,\n  #58a 30px\n);\n/*灵活的同色系条纹*/\nbackground: #58a;\nbackground-image: repeating-linear-gradient(\n  30deg,\n  hsla(0, 0%, 100%, 0.1),\n  hsla(0, 0%, 100%, 0.1) 15px,\n  transparent 0,\n  transparent 30px\n);\n")])])]),a("h2",{attrs:{id:"根据兄弟元素的数量来设置样式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#根据兄弟元素的数量来设置样式"}},[n._v("#")]),n._v(" 根据兄弟元素的数量来设置样式")]),n._v(" "),a("p",[n._v("对于只有一个列表项的特殊场景来说，解决方案就是:only-child，这个伪类选择符就是为这种情况而设计的。")]),n._v(" "),a("p",[n._v("实际上，:only-child 等效于:first-child:last-child，如果"),a("strong",[n._v("第一项")]),n._v("同时也是"),a("strong",[n._v("最后一项")]),n._v("，那从逻辑上来说它就是唯一的那一项。:last-child 其实也是一个快捷写法，相当于:nth-last-child(1)")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("li:only-child{\n  /*只有一个列表项的样式*/\n}\n")])])]),a("p",[n._v("li:first-child:nth-last-child(4) 这个选择器在找一个需要是父元素的第一个子元素，同时还需要是从后王前数的第四个子元素，有哪个元素可以满足这个条件。答案就是，"),a("strong",[n._v("一个账号有四个列表项的列表中的第一个列表项")]),n._v("。然后我们就可以用兄弟选择符（~）来命中"),a("strong",[n._v("它之后的所有兄弟元素")]),n._v("。")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("li:first-child:nth-last-child(4),\nli:first-child:nth-last-child(4)~li{\n  /*当列表正好包含四项时，命中所有列表项*/\n}\n\n@mixin n-items($n){\n  &:first-child:nth-last-child(#{$n}),\n  &:first-child:nth-last-child(#{$n})~& {\n    @content;\n  }\n}\n\nli{\n  @include n-items(4){\n    /*自定义样式*/\n  }\n}\n\nli:first-child:nth-last-child(n+4),\nli:first-child:nth-last-child(n+4)~li{\n  /*当列表至少包含四项时，命中所有列表项*/\n}\n\nli:first-child:nth-last-child(-n+4),\nli:first-child:nth-last-child(-n+4)~li{\n  /*当列表最多包含四项时，命中所有列表项*/\n}\n\nli:first-child:nth-last-child(n+2):nth-last-child(-n+6),\nli:first-child:nth-last-child(n+2):nth-last-child(-n+6))~li{\n  /*当列表至少包含2-6项时，命中所有列表项*/\n}\n")])])])])}),[],!1,null,null,null);a.default=l.exports}}]);