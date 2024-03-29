## 从输入 URL 到页面展示，发生了什么

1. 用户输入 url 回车，浏览器进程检查 url,组装协议,构成完整的 url
2. 浏览器进程通过进程间通信（IPC）把 url 请求发送给网络进程
3. 网络进程收到 url 请求后，检查本地是否有缓存该请求资源，如果有则将该资源返回给浏览器进程
4. 如果没有，网络进程向 web 服务器发起 http 请求，过程如下
   1. DNS 域名解析，获取 URL 对应的真实 IP 地址
   2. 与服务器 IP 地址建立 TCP 链接
   3. 构建请求头信息
   4. 发送请求头信息
   5. 服务器响应后，网络进程接收响应头和响应信息，并解析响应内容
5. 网络进程解析响应流程
   1. 检查状态码，如果是 301/302，则需要重定向，从 Location 自动中读取地址，重新进行第 3 步，如果是 200，继续处理请求
   2. 检查响应类型 Content-Type,如果是字节流类型，则将该请求提交给下载管理器，该导航结束，如果是 html 类型，则浏览器进程通知渲染进程准备渲染
6. 准备渲染进程,浏览器进程检查当前 URL 是否和之前打开的渲染进程根域名相同，如果相同则复用原来的渲染进程，否则开启新的渲染进程
7. 传输数据，更新状态
   1. 渲染进程准备好后，浏览器进程向渲染进程发起“提交文档”的消息，渲染进程收到消息后和网络进程建立传输数据的管道
   2. 渲染进程接收完数据后，向浏览器进程发送“确认提交”
   3. 浏览器进程收到确认消息后更新浏览器界面状态：安全、地址栏 url、前进后退的历史状态、更新 web 页面。

---

---

## JS 和 CSS 都有可能阻塞 DOM 解析

当我在 JavaScript 中访问了某个元素的样式，那么这时候就需要等待这个样式被下载完成才能继续往下执行，所以在这种情况下，CSS 也会阻塞 DOM 的解析。

```
<html>
    <head>
        <style type="text/css" src = "theme.css" />
    </head>
    <body>
        <p>极客时间</p>
        <script>
            let e = document.getElementsByTagName('p')[0]
            e.style.color = 'blue'
        </script>
    </body>
</html>
```

---

## 一个完整的渲染流程可总结为如下

- [浏览器的渲染流程](./browser.md)

1. 渲染引擎将 HTML 内容转换为能够读懂的 DOM 数结构
2. 渲染引擎将 CSS 样式表转换为浏览器可以理解的 stlyeSheets,计算出 DOM 节点的样式
3. 创建布局树,并计算元素的布局信息
4. 对布局树进行分层，并生成分层树
5. 为每个图层生成绘制列表，并将其提交到合成线程
6. 合成线程将图层分成图块，并在光栅化线程池中将图块转换成位图
7. 合成线程发送绘制图块命令 DrawQuad 给浏览器进程
8. 浏览器进程根据 DrawQuad 消息生成页面，并显示到显示器上
