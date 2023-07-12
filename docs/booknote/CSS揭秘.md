---
title: CSS 揭秘
author: jasonpink
date: "2023/07/05"
---

# 《CSS 揭秘》

## 背景与边框

[相关代码](https://codesandbox.io/s/border-p3m685)

### 半透明边框

```
/*初始值是border-box,背景会被元素的border-box裁剪掉*/
background-clip: padding-box;
background: #fff;
border: 10px solid hsla(0, 0%, 100%, 0.3);
```

### 多重边框

box-shadow 可以接受第四个参数（称作”扩张半径“），通过指定正值或负值，可以让投影面积加大或者减小。一个正值的扩张半径加上两个为零的偏移量以及为零的模糊值，得到的投影其实就是一到实线边框。**它支持逗号分割语法，我们可以创建任意数量的投影**

```
background: yellowgreen;
box-shadow: 0 0 0 10px #665,
            0 0 0 15px deeppink,
            0 2px 5px 15px rgba(0, 0, 0, 0.6);
```

- 投影不会影响布局，也不会受到 box-sizing 属性的影响
- box-shadow 不会响应鼠标事件，比如悬停或点击

### 条纹背景

```
background: linear-gradient(#fb3 50%, #58a 0);
background-size: 100% 30px;

/*斜向条纹*/
background: linear-gradient(
  45deg,
  #fb3 25%,
  #58a 0,
  #58a 50%,
  #fb3 0,
  #fb3 75%,
  #58a 0
);
background-size: 42.42px 42.42px;

/*更好的斜向条纹*/
background: repeating-linear-gradient(
  60deg,
  #fb3,
  #fb3 15px,
  #58a 0,
  #58a 30px
);
/*灵活的同色系条纹*/
background: #58a;
background-image: repeating-linear-gradient(
  30deg,
  hsla(0, 0%, 100%, 0.1),
  hsla(0, 0%, 100%, 0.1) 15px,
  transparent 0,
  transparent 30px
);
```

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
