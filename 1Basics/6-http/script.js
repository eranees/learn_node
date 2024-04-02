const http = require("node:http")
const PORT = 8080
const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/text' })
  res.write("Hello! World\n")
  res.end("URL :- " + req.url)
})

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})