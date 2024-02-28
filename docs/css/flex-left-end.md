# flex 布局最后一行列表左对齐的 N 种方法

在 CSS flex 布局中，justify-content 属性可以控制列表的水平对齐方式，例如 space-between 值可以实现两端对齐。

但是，如果最后一行的列表的个数不满，则就会出现最后一行没有完全垂直对齐的问题。

## 每一行列数固定

1. 模拟 space-between 和间隙

```
.list:not(:nth-child(4n)) {
    margin-right: calc(4% / 3);
}
```

2. 根据个数最后一个元素动态 margin

```
/* 如果最后一行是3个元素 */
.list:last-child:nth-child(4n - 1) {
    margin-right: calc(24% + 4% / 3);
}
/* 如果最后一行是2个元素 */
.list:last-child:nth-child(4n - 2) {
    margin-right: calc(48% + 8% / 3);
}
```

## 每一行列数不固定

使用足够的空白标签进行填充占位，具体的占位数量是由最多列数的个数决定的，例如这个布局最多 7 列，那我们可以使用 7 个空白标签进行填充占位，最多 10 列，那我们需要使用 10 个空白标签。

```
<div class="container">
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <i></i><i></i><i></i><i></i><i></i>
</div>

.container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-right: -10px;
}
.list {
    width: 100px; height:100px;
    background-color: skyblue;
    margin: 15px 10px 0 0;
}
/* 和列表一样的宽度和margin值 */
.container > i {
    width: 100px;
    margin-right: 10px;
}
```

## 每一项宽度不固定

1. 最后一项 margin-right:auto

```
/* 最后一项margin-right:auto */
.list:last-child {
    margin-right: auto;
}
```

2. 创建伪元素并设置 flex:auto 或 flex:1

```
/* 使用伪元素辅助左对齐 */
.container::after {
    content: '';
    flex: auto;    /* 或者flex: 1 */
}
```

## 列数不固定 HTML 又不能调整

使用 Grid 布局,Grid 布局天然有 gap 间隙，且天然格子对齐排布，因此，实现最后一行左对齐可以认为是天生的效果

```
.container {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-gap: 10px;
}
.list {
    width: 100px; height:100px;
    background-color: skyblue;
    margin-top: 5px;
}
```

# 参考文章

[让 CSS flex 布局最后一行列表左对齐的 N 种方法](https://www.zhangxinxu.com/wordpress/2019/08/css-flex-last-align/)
