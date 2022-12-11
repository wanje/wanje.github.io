const WebSocket = require('ws');   // 导入WebSocket模块，这里导出的WebSocket对象实际也是对原生WebSocket的实现，可当做客户端使用直接在node环境下执行而不必在浏览器环境中用原生(主要用于测试服务端WebSocket代码)
const WebSocketServer = WebSocket.Server;  // 引用Server类

// 实例化
const wsServer = new WebSocketServer({
  port: 3000
});

// wsServer对象可以响应connection事件来处理请求接入的WebSocket
// 该connection事件回调中会传入一个WebSocket实例，表示当前的WebSocket连接
wsServer.on('connection', function (ws) {
  console.log('建立连接了');
  // WebSocket实例的`message`事件响应接收消息
  ws.on('message', function (msg) {
    console.log(`接收到消息了：${msg}`);
    // send()方法发送消息
    ws.send(`ECHO: ${msg}`, (err) => {
      if (err) {
        console.log(`[SERVER] error: ${err}`);
      }
    });
  })
});