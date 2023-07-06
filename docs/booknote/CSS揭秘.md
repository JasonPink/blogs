---
title: CSS 揭秘
author: jasonpink
date: "2023/07/05"
---

# 《CSS 揭秘》

## 根据兄弟元素的数量来设置样式

对于只有一个列表项的特殊场景来说，解决方案就是:only-child，这个伪类选择符就是为这种情况而设计的。

实际上，:only-child 等效于:first-child:last-child，如果**第一项**同时也是**最后一项**，那从逻辑上来说它就是唯一的那一项。:last-child 其实也是一个快捷写法，相当于:nth-last-child(1)

```
li:only-child{
  /*只有一个列表项的样式*/
}
```

li:first-child:nth-last-child(4) 这个选择器在找一个需要是父元素的第一个子元素，同时还需要是从后王前数的第四个子元素，有哪个元素可以满足这个条件。答案就是，**一个账号有四个列表项的列表中的第一个列表项**。然后我们就可以用兄弟选择符（~）来命中**它之后的所有兄弟元素**。

```
li:first-child:nth-last-child(4),
li:first-child:nth-last-child(4)~li{
  /*当列表正好包含四项时，命中所有列表项*/
}

@mixin n-items($n){
  &:first-child:nth-last-child(#{$n}),
  &:first-child:nth-last-child(#{$n})~& {
    @content;
  }
}

li{
  @include n-items(4){
    /*自定义样式*/
  }
}

li:first-child:nth-last-child(n+4),
li:first-child:nth-last-child(n+4)~li{
  /*当列表至少包含四项时，命中所有列表项*/
}

li:first-child:nth-last-child(-n+4),
li:first-child:nth-last-child(-n+4)~li{
  /*当列表最多包含四项时，命中所有列表项*/
}

li:first-child:nth-last-child(n+2):nth-last-child(-n+6),
li:first-child:nth-last-child(n+2):nth-last-child(-n+6))~li{
  /*当列表至少包含2-6项时，命中所有列表项*/
}
```
