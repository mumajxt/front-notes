# JSONP

JSONP 全称是`JSON with Padding` ，是基于JSON格式的为解决跨域请求资源而产生的解决方案。

他实现的基本原理是**利用了 HTML里 script 元素标签没有跨域限制。**

JSONP 原理就是动态插入带有跨域url的script标签，然后调用回调函数，把我们需要的 json 数据作为参数传入，通过一些逻辑把数据显示在页面上。

比如通过script访问http://www.test.com/index.html?jsonpcallback=fn, 执行完script后，会调用callback函数，参数就是获取到的数据。

```html
<html>
<head>
  <title>test</title>
  <meta charset="utf-8">
  <script type="text/javascript">
  function fn(obj) {
    alert(obj);
  }
  </script>
</head>
<body>
<script type="text/javascript" src="http://localhost/callback.php?callback=fn"></script>
</body>
</html>
```

## 安全问题
### 1. CSRF 攻击

前端构造一个恶意页面，请求 JSONP 接口，收集服务端的敏感信息。如果 JSONP 接口还涉及一些敏感操作或信息（如登陆、删除等操作）就更不安全了。

**解决办法**：验证 JSONP 的调用来源（Referer），服务端判断 Referer 是否是白名单，或者部署随机 Token 来防御；避免敏感接口使用 JSONP 方法。

### 2. XSS 漏洞

不严谨的 content-type 导致的 XSS 漏洞，如果没有严格定义好 content-type（content-type：application/json），再加上没有过滤 callback 的参数，直接当 html 解析，就是一个赤裸裸的 XSS。

**解决办法**：严格定义 content-type：application/json，然后严格过滤 callback 后的参数并限制长度（进行字符转译），这样返回的脚本内容会变成文本格式，脚本将不会执行）

