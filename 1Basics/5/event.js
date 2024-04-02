const EventEmitter = require("node:events")

const eventEmitter = new EventEmitter()
eventEmitter.on('start', (num1, num2) => {
  console.log(`sum is ${num1 + num2}`);
})

eventEmitter.emit("start", 2, 3)