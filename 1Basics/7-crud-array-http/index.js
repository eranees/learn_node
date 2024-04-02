const http = require("node:http")
const user = require("./controller/controller")
const PORT = 8080
const server = http.createServer((req, res) => {
  if (req.url === "/create" && req.method === "POST") {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      req.body = JSON.parse(body)
      user.addUser(req, res)
    })
  } else if (req.url === '/users' && req.method === "GET") {
    user.getAllUsers(req, res)
  } else if (req.url.startsWith('/user/') && req.method === "DELETE") {
    user.deleteUser(req, res)
  } else if (req.url.startsWith('/user/') && req.method === "PUT") {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      req.body = JSON.parse(body)
      user.updateUser(req, res)
    })
  }
  else {
    res.end("Welcome to my application")
  }
})

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})