var http = require('http')
http.createServer(function (req, res) {
  res.writeHead(200, { "content-type": "text/html" })
  res.end(JSON.stringify({ "key": "value" }))
}).listen(8080)

console.log("Running")