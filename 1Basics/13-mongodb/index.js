const MongoClient = require("mongodb").MongoClient
var uri = "mongodb://localhost:27017/";
let client;
async function connection() {
  client = new MongoClient(uri)
  const dbName = "sms"
  client.connect((err) => {
    if (err) {
      console.error("Error : ", err)
      return
    }
    console.log("Connected");
  })
  const db = client.db(dbName)
  const coll = await db.createCollection("newcoll")
  await coll.insertOne({ id: 'shaista' })
  client.close()
}

connection()