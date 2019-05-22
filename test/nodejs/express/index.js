const app = require('./app.js')

console.log(`file:${__filename}, dir: ${__dirname}`)

app.get('/', function(req, res) {
  console.log('req: ', req)
  res.send('hello world! hahaha!!!')
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})
