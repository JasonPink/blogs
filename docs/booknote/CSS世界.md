---
title: CSS 揭秘
author: jasonpink
date: "2023/07/05"
---

# 《CSS 世界》

## 为何 height：100%无效

如果包含块的高度没有显示指定(即高度由内容决定)，并且该元素不是绝对定位，则计算值为 auto。一句话总结就是：因为解释成了 auto，auto 与百分比计算，肯定是算不了的。那么如何让元素支持 height：100%的效果呢？

1. 设置显式的高度值
2. 使用绝对定位

## min-width/max-width

min-width/min-height 的初始值都是 auto，max-width/max-height 的初始值是 none

超越!important 指的是 max-width 会覆盖 width，覆盖!important

## 温和的 padding 属性

- 内联元素的 padding 在垂直方向同样会影响布局，影响视觉表现。
- padding 百分比值无论是水平方向还是垂直方向都是相对于宽度计算。(可以利用这个特性实现自适应的等比例矩形效果)

## 激进的 margin 属性
