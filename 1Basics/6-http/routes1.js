const http = require("node:http")

http.createServer((req, res) => {
  if (req.url == "/about") {
    res.statusCode = 200
    res.end("About")
  } else if (req.url == "/contact") {
    res.statusCode = 200
    res.end("Contact")
  } else if (req.url === '/add' && req.method === "POST") {
    res.statusCode = 201
    res.end("Added new")
  }
  else {
    res.statusCode = 200
    res.end("Home")
  }
}).listen("8080", () => {
  console.log("Server is listening on port: 8080");
})