const { log } = require("console")
const http = require("http")
var url = require("url")
const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" })
  var query = url.parse(req.url, true).query
  console.log(query);
  res.end(`<h1>Server url <i>${req.url}</i></h1>`)
})

console.log("server is listening on port 8080")
server.listen("8080")