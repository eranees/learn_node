const url = require("url")
const adr = 'http://localhost:8080/default.htm?year=2017&month=february';

const adrObject = url.parse(adr, true)
console.log(adrObject.query.year);