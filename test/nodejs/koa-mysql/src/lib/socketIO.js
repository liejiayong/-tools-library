module.exports = function (server) {
  const io = require('socket.io')(server)
  io.on('connection', socket => {
    console.log('user connnet')
    socket.emit('tess', 'nodejs  connection')
    socket.on('test', () => {
      console.log('test msg')
      socket.emit('getest', 'getest')
    })
  })
}