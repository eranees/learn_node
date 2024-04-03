const { connect } = require("http2");

const Client = require("pg").Client
const client = new Client({
  user: "postgres",
  database: "todo_db",
  password: "aneesakbar",
  port: 5432,
  host: "localhost"
})

const connection = async () => {
  try {
    await client.connect()
    console.log("Connected");
  } catch (err) {
    console.log("Error : [Connection] ", err);
    return
  }
}

const close = async () => {
  try {
    await client.end();
  } catch (err) {
    console.log("Error : [Close] ", err);
    return
  }
}

const createTable = async (table) => {
  try {
    const res = await client.query(`CREATE TABLE IF NOT EXISTS ${table}(id int, name varchar(255))`)
    console.log("Created", res.rowCount)
  } catch (err) {
    console.log("Error : [Create Table] ", err);
    return
  }
}

const insert = async (table, id, name) => {
  try {
    const res = await client.query(`INSERT INTO ${table} (id, name) VALUES ($1, $2)`, [id, name])
    console.log(res.rows);
    console.log("Inserted", res.rowCount)
  } catch (err) {
    console.log("Error : [Insert] ", err);
    return
  }
}

const select = async (table) => {
  try {
    const res = await client.query(`SELECT * FROM ${table}`)
    console.log(res.rows);
    console.log("Affected", res.rowCount)
  } catch (err) {
    console.log("Error : [Select] ", err);
    return
  }
}

// function calls
(async () => {
  await connection()
  // await createTable("list")
  // await insert("list", 2, "learn c++")
  // await select("list")
  await close()
})()
