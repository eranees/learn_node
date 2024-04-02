const MongoClient = require("mongodb").MongoClient

let client;
let db;
const connection = async (uri) => {
  try {
    client = new MongoClient(uri)
    await client.connect()
    db = client.db("todo_db")
    console.log("Connected")
  } catch (err) {
    console.error("Error [Database] : ", err);
    return
  } finally {
  }
}

const collection = async (collectionName) => {
  try {
    await db.createCollection(collectionName)
    console.log("Collection Created")
  } catch (err) {
    console.error("Error [Collection] : ", err);
    return
  }
}

const insert = async (collection, data) => {
  try {
    await db.collection(collection).insertOne(data)
    console.log("1 Inserted")
  } catch (err) {
    console.log("Error : [Insert]", err)
  }
}

const find = async (collection, search) => {
  try {
    const result = await db.collection(collection).findOne(search)
    console.log(result)
  } catch (err) {
    console.error("Error : [Find] ", err);
    return
  }
}

const findAll = async (collectionName, query) => {
  try {
    const cursor = await db.collection(collectionName).find(query)
    await cursor.forEach(doc => {
      console.log(doc);
    });
  } catch (err) {
    console.error("Error : [Findall] ", err);
    return
  }
}

const sort = async (collectionName, order) => {
  try {
    const cursor = await db.collection(collectionName).find().sort(order)
    await cursor.forEach(doc => {
      console.log(doc);
    });
  } catch (err) {
    console.error("Error : [Findall] ", err);
    return
  }
}

const deleteOne = async (collectionName, query) => {
  try {
    await db.collection(collectionName).deleteOne(query)
    console.log("1 Deleted");
  } catch (err) {
    console.error("Error : [Delete] ", err);
    return
  }
}

const deleteAll = async (collectionName, query) => {
  try {
    await db.collection(collectionName).deleteMany(query)
    console.log("All Deleted");
  } catch (err) {
    console.error("Error : [Delete All] ", err);
    return
  }
}

const update = async (collectionName, query, newValues) => {
  try {
    await db.collection(collectionName).updateOne(query, newValues)
    console.log("1 Updated");
  } catch (err) {
    console.error("Error : [Delete All] ", err);
    return
  }
}

const updateAll = async (collectionName, query, newValues) => {
  try {
    const res = await db.collection(collectionName).updateMany(query, newValues)
    console.log(`${res.modifiedCount} document(s) updated`);
  } catch (err) {
    console.error("Error : [Delete All] ", err);
    return
  }
}

const findAllLimit = async (collectionName, limit) => {
  try {
    const cursor = await db.collection(collectionName).find().limit(limit)
    await cursor.forEach((doc) => {
      console.log(doc);
    })
  } catch (err) {
    console.error("Error : [Limit] ", err);
  }
}

const join = async (collectionName) => {
  const db = client.db("sms");
  try {
    const cursor = await db.collection(collectionName).aggregate([
      {
        $lookup:
        {
          from: "students",
          localField: "std_id",
          foreignField: "_id",
          as: "student"
        }
      }
    ])//.toArray();
    // console.log(cursor);
    await cursor.forEach((doc) => {
      console.log(doc)
      // console.log(doc.student[0].hobbies);
    })
  } catch (err) {
    console.log("Error : [JOIN] ", err);
    return;
  }
};


const close = async () => {
  try {
    await client.close()
  } catch (err) {
    console.log("Error : [Close] ", err)
  }
}
// function calls
(async () => {
  // await connection("mongodb://localhost:27017/todo_db");
  // await collection("list");
  // await insert("list", { id: 1, name: "Learn html" })
  // await find("list", {})
  // await findAll("list", {})
  // await findAll("list", { name: "Learn C" })
  // await findAll("list", { id: 1 })
  /*
  { name: 1 } // ascending
  { name: -1 } // descending
  */
  // await sort("list", { name: -1 })
  // await deleteOne("list", { name: "C" })
  // await deleteOne("list", { id: 1 })
  // await deleteAll("list", { id: 1 })
  // await update("list", { name: "Learn C" }, { $set: { name: "Learn C++" } })
  // await updateAll("list", { id: 1 }, { $set: { name: "Learn C" } })
  // await findAllLimit("list", 1)

  await connection("mongodb://localhost:27017/sms");
  await join("marksCard")
  await close();
})();