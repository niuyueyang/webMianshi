//跨域场景
/*
* URL                                      说明                    是否允许通信
http://www.domain.com/a.js
http://www.domain.com/b.js         同一域名，不同文件或路径           允许
http://www.domain.com/lab/c.js

http://www.domain.com:8000/a.js
http://www.domain.com/b.js         同一域名，不同端口                不允许

http://www.domain.com/a.js
https://www.domain.com/b.js        同一域名，不同协议                不允许

http://www.domain.com/a.js
http://192.168.4.12/b.js           域名和域名对应相同ip              不允许

http://www.domain.com/a.js
http://x.domain.com/b.js           主域相同，子域不同                不允许
http://domain.com/c.js

http://www.domain1.com/a.js
http://www.domain2.com/b.js        不同域名                         不允许
* */

//跨域解决方案
/*
*
1、 通过jsonp跨域
2、 document.domain + iframe跨域
3、 location.hash + iframe
4、 window.name + iframe跨域
5、 postMessage跨域
6、 跨域资源共享（CORS）
7、 nginx代理跨域
8、 nodejs中间件代理跨域
9、 WebSocket协议跨域
* */

/*
* jsonp解决方案
* 通常为了减轻web服务器的负载，我们把js、css，img等静态资源分离到另一台独立域名的服务器上，
* 在html页面中再通过相应的标签从不同域名下加载静态资源，而被浏览器允许，基于此原理，
* 我们可以通过动态创建script，再请求一个带参网址实现跨域通信。
* 【原生方案】
* <script>
    var script = document.createElement('script');
    script.type = 'text/javascript';
    // 传参并指定回调执行函数为onBack
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
    document.head.appendChild(script);

    // 回调执行函数
    function onBack(res) {
        alert(JSON.stringify(res));
    }
 </script>
 【jquery】
 $.ajax({
    url: 'http://www.domain2.com:8080/login',
    type: 'get',
    dataType: 'jsonp',  // 请求方式为jsonp
    jsonpCallback: "onBack",    // 自定义回调函数名
    data: {}
});
  【vue】
  this.$http.jsonp('http://www.domain2.com:8080/login', {
    params: {},
    jsonp: 'onBack'
}).then((res) => {
    console.log(res);
})
  【node】
  var querystring = require('querystring');
  var http = require('http');
  var server = http.createServer();
  server.on('request', function(req, res) {
      var params = qs.parse(req.url.split('?')[1]);
      var fn = params.callback;

      // jsonp返回设置
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(fn + '(' + JSON.stringify(params) + ')');

      res.end();
  });

  server.listen('8080');
  console.log('Server is running at port 8080...');
  jsonp缺点：只能实现get一种请求。

*
* 通过node中间件
*
var express = require("express");
var proxy = require("http-proxy-middleware");
var app = express();
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
app.use("/", proxy({ target: "https://api.hbwlife.com", changeOrigin: true }));
app.listen(3000);

通过nginx
root   "D:\webproject\hpl\4thmeirongdahui";
location / {  # 设置匹配url
  #rewrite ^/api/(.*)$ /$1 break;  # 测试环境uri添加/api标记
  proxy_pass https://api.hbwlife.com; # 代理地址
}

* websocket
*WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现。
*
*
* */


//http2特点
/*
* 所有数据都以二进制方式传输
* 同一个tcp连接里面可以发送多个请求，同时不必按照顺序来
* 头部信息压缩以及推送，提高效率
* */

//http三次握手【规避因网络延时而导致的不必要的开销】
/*
*客户端向服务端发送tcp连接请求，在此连接上可以发送多个http请求，SYN=1【标志位】，SEQ=x;
* 服务端收到后，向客户端发送socket端口，SYN=1，ACK=x+1,SEQ=Y
* 客户端向服务端发送ACK=Y+1,SEQ=z，确认已连接
* */

//http方法
/*
* get 获取数据
* post 创建数据
* put 修改数据
* delete 删除数据
* */

//http code
/*
* 100-199 操作需要持续进行
* 200-299 操作成功
* 300-399 操作需要重定向，用别的方式获取数据
* 400-499 操作有问题，例如401是没有经过认证
* 500-599 服务器问题
* */

//服务端跨域解决
/*
* Access-Control-Allow-Origin:'*'
* Access-Control-Allow-Headers:'X-Test-Cors'
* Access-Control-Allow-Methods:'Post,Put,Delete'
* Access-Control-Max-Age:'1000'  //1000秒之内无需再次发起预请求
* */

//可缓存性
/*
* public 在请求经过的任何节点都可以缓存
* private 只有发起请求的浏览器可进行缓存
* no-cache 任何节点都不缓存
* */

//max-age="1000" 1000秒后缓存失效
//s-maxage="1000" 只有在代理服务器上有效
//max-stale="1000" 如果max-age失效后，只要max-stale没有失效，可以使用失效缓存
//在后端通过设置headers里面的{'Cache-Control':'max-age=20,public'}，保证前端可以缓存

//Cache-Control:'max-age=1000'

//http长连接
/*
*在使用长连接的情况下，当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭，
* 客户端再次访问这个服务器时，会继续使用这一条已经建立的连接。Keep-Alive不会永久保持连接，它有一个保持时间，
* 可以在不同的服务器软件（如Apache）中设定这个时间。实现长连接需要客户端和服务端都支持长连接。
* */

//Last-Modified与Etag
/*
* 为了配合Cache-Control中no-cache，在server端我们还需要加上头Last-Modified、Etag。收到带Last-Modified这个头，
* 下次浏览器发送request就会带上If-Modified-Since或者If-Unmodified-Since，服务器收到这个request的If-Modified-Since后，
* 通过读取它的值对比资源存在的地方的Last-Modified，服务器就告诉浏览器是否可以使用缓存。Etag是一个更加严格的验证，
* 它是根据文件的内容生成Etag（数据签名，最常用做法是对资源内容进行哈希计算），收到带Etag这个头，
* 下次浏览器发送request就会带上If-Match或者If-Non-Match，服务器收到这个request的上If-Match或者If-Non-Match后，
* 通过读取它的值对比资源存在的地方的Etag，服务器就告诉浏览器是否可以使用缓存。
* */

//服务端代码[Etag验证]
/*
  http.createServer((request,response)=>{
    if(request.url=='/'){
    const html=fs.readFileSync('test.html','utf8');
    response.writeHead(200,{
      'Content-Type':'text/html'
    })
    response.end(html);
  }
   if(request.url=='/script.js'){
      var js=fs.readFileSync('script.js','utf8');
      var etag=request.headers['if-none-match'];
      if(etag=='abcdefghi'){
         response.writeHead(304,{
           'Content-Type':'text/javascript',
           'Cache-Control':'no-cache,max-age=2000000',
           'Last-Modified':'20190403',
           'Etag':'abcdefghi'
         })
         response.end('');
      }
      else{
       response.writeHead(200,{
           'Content-Type':'text/javascript',
           'Cache-Control':'no-cache,max-age=2000000',
           'Last-Modified':'20190403',
           'Etag':'abcdefghi'
         })
         response.end(js);
      }
   }
  }).listen(3000);
*
*
*
* */



