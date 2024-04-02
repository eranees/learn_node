const User = require("../model/model")
const url = require("url")
class UserController {
  constructor() {
    this.users = []
  }

  getAllUsers(req, res) {
    if (this.users.length) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(this.users));
    } else {
      res.end("Array is empty")
    }
  }

  addUser(req, res) {
    const { name, email, age } = req.body
    const newUser = new User(this.users.length + 1, name, email, age)
    this.users.push(newUser)
    res.end("User Added Successfully")
  }

  deleteUser(req, res) {
    const u = url.parse(req.url, true)
    const id = u.path.split("/")[2];
    if (!id) {
      res.end("Error: Please pass id")
      return
    }
    if (!this.users.some(user => user.id === id)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`User with ID ${id} not found`);
      return;
    }
    this.users = this.users.filter((user) => user.id != id)
    res.end("User deleted Successfully")
  }

  updateUser(req, res) {
    const u = url.parse(req.url, true)
    const id = u.path.split("/")[2];
    if (!id) {
      res.end("Error: Please pass id")
      return
    }
    if (!this.users.some(user => user.id == id)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`User with ID ${id} not found`);
      return;
    }
    const { name, email, age } = req.body
    const newUser = new User(id, name, email, age)
    this.users.forEach((user) => {
      if (user.id == id) {
        user.name = newUser.name ?? user.name
        user.email = newUser.email ?? user.email
        user.age = newUser.age ?? user.age
      }
    })
    res.end("User Updated Successfully")
  }

}

module.exports = new UserController