var http = require('http')
var fs = require('fs')
function serverCallback(req, res) {
    var readStream = fs.createReadStream('./file1.txt')
    res.writeHead(200, {'Content-type': 'text/html'})
    readStream.pipe(res)
}
http.createServer(serverCallback).listen(8080)
