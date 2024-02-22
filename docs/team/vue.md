# Vue 规范

### 组件名为多个单词

组件名应该始终是多个单词的，根组件 App 以及 <transition\>、<component\> 之类的 Vue 内置组件除外。
这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的。

单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。然而，混用文件命名方式有的时候会导致大小写不敏感的文件系统的问题，这也是横线连接命名同样完全可取的原因。

```
// bad
todo.vue
VideoList.vue
videoList.vue

// good
todo-item.vue
video-list.vue
```

### 基础组件名

应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V。

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

### Prop 名大小写

在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。

```
props: {
  greetingText: String
}

<WelcomeMessage greeting-text="hi"/>
```

### 为 v-for 设置唯一可靠键值

```
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

### 避免 v-if 和 v-for 用在一起

```
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

### scoped 中的元素选择器

元素选择器应该避免在 scoped 中出现。为了给样式设置作用域，Vue 会为元素添加一个独一无二的 attribute，例如 data-v-f3f3eg9。然后修改选择器，使得在匹配选择器的元素中，只有带这个 attribute 才会真正生效 (比如 button[data-v-f3f3eg9])。

问题在于大量的元素和 attribute 组合的选择器 (比如 button[data-v-f3f3eg9]) 会比类和 attribute 组合的选择器 (比如 .btn-close[data-v-f3f3eg9]) 慢，所以应该尽可能选用类选择器。

### 参考链接

[Vue 官方风格指南](https://v2.cn.vuejs.org/v2/style-guide/index.html)
