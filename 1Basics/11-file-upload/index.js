const http = require("http");
const formidable = require("formidable");
const fs = require("fs");

const uploadDir = "./uploads";

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

http.createServer(function (req, res) {
  if (req.url === "/upload" && req.method === "POST") {
    handleUpload(req, res);
  }
}).listen(8080, () => {
  console.log("Server is running");
});

function handleUpload(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error while parsing form:", err);
      res.end("Error while uploading file");
      return;
    }

    const oldPath = files.filetoupload[0].filepath;
    const newFilename = sanitizeFilename(files.filetoupload[0].originalFilename);
    const newPath = `${uploadDir}/${Date.now()}${newFilename}`;

    fs.rename(oldPath, newPath, function (err) {
      if (err) {
        console.error("Error while moving file:", err);
        res.end("Error while moving file");
      } else {
        console.log("File uploaded and moved successfully");
        res.end("File uploaded and moved successfully");
      }
    });
  });
}

function sanitizeFilename(filename) {
  return filename.replace(/\s+/g, "").trim();
}
