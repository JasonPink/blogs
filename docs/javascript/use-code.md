# 常用代码片段

## JavaScript

1.下载 excel、word、ppt 等浏览器不会默认执行预览的文件

```
function download(link, name) {
    if(!name){
            name=link.slice(link.lastIndexOf('/') + 1)
    }
    let eleLink = document.createElement('a')
    eleLink.download = name
    eleLink.style.display = 'none'
    eleLink.href = link
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
}
download('http://111.229.14.189/file/1.xlsx')
```

2. url 参数解析

```
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
```

## CSS

1. 滚动条样式

```
::-webkit-scrollbar {
  width: 7px;
  height: 5px;
  border-radius:15px;
  -webkit-border-radius:  15px;
}
::-webkit-scrollbar-track-piece {
  background-color: #fff;
  border-radius:15px;
  -webkit-border-radius:  15px;
}
::-webkit-scrollbar-thumb:vertical {
  height: 5px;
  background-color: rgba(144, 147, 153, 0.5);
  border-radius: 15px;
  -webkit-border-radius:  15px;
}
::-webkit-scrollbar-thumb:horizontal {
  width: 7px;
  background-color: rgba(144, 147, 153, 0.5);
  border-radius:  15px;
  -webkit-border-radius: 15px;
}
```

2. 自定义选中文本颜色

```
::selection {
     background: #00ff00;
}
 ::-moz-selection {
     background: #00ff00;
}
 ::-webkit-selection {
     background: #00ff00;
}
```

3. 文本溢出省略号

```
// 单行文本
.ellipsis() {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
// 多行文本
@mixin multi-ellipsis($line: 1) {
  @if $line <= 0 {
      $line: 1;
  }

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: $line;
  -webkit-box-orient: vertical;
}
```
