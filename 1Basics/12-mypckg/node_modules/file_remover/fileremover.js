const fs = require("fs")
const path = require("path")

function fileRemover(directory, fileType) {
  fs.opendir(directory, (err, dir) => {
    if (err) {
      throw err
    }

    filenames = fs.readdirSync(dir.path)
    filenames.forEach(element => {
      let extension = path.extname(element).substring(1);
      if (extension === fileType) {
        fs.unlink(`${dir.path}/${element}`, (err) => {
          if (err) {
            console.log("Error while deleting the file")
            return
          }
          console.log(`${element} -- File Deleted Successfully`)
        })
      }
    });

    dir.closeSync()
  })
}

// removeFiles("../3", "jpg")

module.exports = fileRemover