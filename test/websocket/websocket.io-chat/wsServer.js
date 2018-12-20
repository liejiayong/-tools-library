var app = require('http').createServer();
var io = require('socket.io')(app);

const PORT = 3000;

let clientCount = 0;
app.listen(PORT);

io.on('connection', function (socket) {
  clientCount++;
  socket.nickname = 'user' + clientCount;
  socket.emit('enter', socket.nickname + ' comes in');
  
  // 监听传过来的信息
  socket.on('message', function (str) {
    io.emit('message', socket.nickname + ' says:' + str);
  });

  // 关闭连接
  socket.on('disconnet', function() {
    io.emit('leave', socket.nickname + ' left');
  });
});

console.log("websocket server listening on port" + PORT)
