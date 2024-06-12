(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{437:function(e,a,n){"use strict";n.r(a);var t=n(1),s=Object(t.a)({},(function(){var e=this,a=e._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"v-model"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#v-model"}},[e._v("#")]),e._v(" v-model")]),e._v(" "),a("p",[e._v("v-model 即可以作用在普通表单元素上，又可以作用在组件上，它其实是一个语法糖")]),e._v(" "),a("h2",{attrs:{id:"普通元素-input"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#普通元素-input"}},[e._v("#")]),e._v(" 普通元素 input")]),e._v(" "),a("p",[e._v("这两句是实现 v-model 功能的关键代码")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("addProp(el, 'value', `(${value})`)\naddHandler(el, event, code, null, true)\n")])])]),a("p",[e._v("通过修改 AST 元素，给 el 添加一个 prop，相当于我们在 input 上动态绑定了 value，又给 el 添加了事件处理，相当于在 input 上绑定了 input 事件，其实转换成模板如下：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('<input v-bind:value="message" v-on:input="message=$event.target.value">\n')])])]),a("p",[e._v("动态绑定了 input 的 value 指向了 messgae 变量，并且在触发 input 事件的时候去动态把 message 设置为目标值，这样实际上就完成了数据双向绑定了")]),e._v(" "),a("h2",{attrs:{id:"组件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#组件"}},[e._v("#")]),e._v(" 组件")]),e._v(" "),a("p",[e._v("组件 v-model 也是语法糖，最终也是如上面 input 普通元素，增加 prop 以及设置 data.on 事件。但组件事件走的是另外一套逻辑。所以组件在编译阶段，不会直接设置 data.on,而是给到中转变量 el.model；在 patch 阶段的 createComponent 时，才把 el.model 转换为 prop 以及 data.on（这时的 data.on 走的是组件事件的$on/$emit）")]),e._v(" "),a("h3",{attrs:{id:"编译阶段"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#编译阶段"}},[e._v("#")]),e._v(" 编译阶段")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("export function genComponentModel (\n  el: ASTElement,\n  value: string,\n  modifiers: ?ASTModifiers\n): ?boolean {\n  const { number, trim } = modifiers || {}\n\n  const baseValueExpression = '$$v'\n  let valueExpression = baseValueExpression\n  if (trim) {\n    valueExpression =\n      `(typeof ${baseValueExpression} === 'string'` +\n        `? ${baseValueExpression}.trim()` +\n        `: ${baseValueExpression})`\n  }\n  if (number) {\n    valueExpression = `_n(${valueExpression})`\n  }\n  const assignment = genAssignmentCode(value, valueExpression)\n\n  el.model = {\n    value: `(${value})`,\n    expression: `\"${value}\"`,\n    callback: `function (${baseValueExpression}) {${assignment}}`\n  }\n  // 生成el.model,在genData生成render函数有用到\n}\n")])])]),a("p",[e._v("在 genDirectives 之后，genData 函数中有一段逻辑如下")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("if (el.model) {\n  data += `model:{value:${\n    el.model.value\n  },callback:${\n    el.model.callback\n  },expression:${\n    el.model.expression\n  }},`\n}\n")])])]),a("p",[e._v("父组件生成的 render 函数如下")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("with(this){\n  return _c('div',[_c('child',{\n    model:{\n      value:(message),\n      callback:function ($$v) {\n        message=$$v\n      },\n      expression:\"message\"\n    }\n  }),\n  _c('p',[_v(\"Message is: \"+_s(message))])],1)\n}\n")])])]),a("h3",{attrs:{id:"patch-阶段"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#patch-阶段"}},[e._v("#")]),e._v(" patch 阶段")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// src/core/vdom/create-component.js\nif (isDef(data.model)) {\n   transformModel(Ctor.options, data)\n}\n\nfunction transformModel (options, data: any) {\n  // api中的options.model可配置\n  const prop = (options.model && options.model.prop) || 'value'\n  const event = (options.model && options.model.event) || 'input';\n\n  // 设置组件prop和事件\n  (data.props || (data.props = {}))[prop] = data.model.value\n  const on = data.on || (data.on = {})\n  if (isDef(on[event])) {\n    on[event] = [data.model.callback].concat(on[event])\n  } else {\n    on[event] = data.model.callback\n  }\n}\n")])])]),a("p",[e._v("其实就相当于我们在这样编写父组件:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("let vm = new Vue({\n  el: '#app',\n  template: '<div>' +\n  '<child :value=\"message\" @input=\"message=arguments[0]\"></child>' +\n  '<p>Message is: {{ message }}</p>' +\n  '</div>',\n  data() {\n    return {\n      message: ''\n    }\n  },\n  components: {\n    Child\n  }\n})\n")])])]),a("p",[e._v("子组件传递的 value 绑定到当前父组件的 message，同时监听自定义 input 事件，当子组件派发 input 事件的时候，父组件会在事件回调函数中修改 message 的值，同时 value 也会发生变化，子组件的 input 值被更新。")]),e._v(" "),a("p",[e._v("这就是典型的 Vue 的父子组件通讯模式，父组件通过 prop 把数据传递到子组件，子组件修改了数据后把改变通过 $emit 事件的方式通知父组件，所以说组件上的 v-model 也是一种语法糖。")]),e._v(" "),a("h2",{attrs:{id:"参考链接"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考链接"}},[e._v("#")]),e._v(" 参考链接")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://ustbhuangyi.github.io/vue-analysis/v2/extend/v-model.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("v-model 核心原理"),a("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=s.exports}}]);