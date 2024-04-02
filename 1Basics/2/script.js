const { log } = require("console")
var fs = require("fs")
const str = "the quick brown fox jumps over the lazy dog."
function writeToFile(data) {
  fs.writeFile('file.txt', data, function (err) {
    if (err) {
      throw err
    }
    console.log("Saved")
  })
}

function readFromFile() {
  fs.readFile('file.txt', function (err, data) {
    if (err) {
      throw err
    }
    console.log(data.toString())
  })
}

function updateFileData() {
  fs.readFile('file.txt', function (err, data) {
    if (err) {
      throw err
    }
    updateData(data.toString(), "brown")
  })
}

function updateData(data, filter) {
  const content = data.split(" ").filter((d) => d !== filter).join(" ")
  writeToFile(content)
}

// writeToFile(str)
// readFromFile()
updateFileData()
