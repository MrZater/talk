//nodejs引入两个网络模块
var http = require('http');
var url = require('url');
// 127.0.0.1/localhost
// http的createServer方法，创建服务
http.createServer(function (request, response) {
    // 读取请求的地址
    var pathName = url.parse(request.url).pathname;
    // 拿到请求的参数
    var query = url.parse(request.url, true).query;
    // 判断路径
    if (pathName == '/data') {
        // 拿到要返回的响应数据
        var data = require('./data.json');
        var size = 10;
        var page = query.page;
        var padding = query.cb || 'window.sug';
        // page = 2的时候  数据索引值 10 - 19 
        //        3                  20 - 29
        // 对返回的数据进行处理
        var resultData = data.filter(function (item, index) {
            return index >= (page - 1) * size && index < page * size;
        });
        // 添加响应头
        response.writeHead(200, {
            // 响应头数据
            // 允许跨域的域  * 代表所有域
            // "Access-Control-Allow-Origin": '*',
            // "Content-Type": "application/json"
        });
        // 添加响应体
        response.write(padding+'('+JSON.stringify(resultData)+')');
        // 断开连接
        response.end();
    }
    // createServer的监听端口号3333
}).listen(3333)