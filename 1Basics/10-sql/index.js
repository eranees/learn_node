const mysql = require("mysql")

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_db"
})

con.connect((err) => {
  if (err) {
    console.log("Error : ", err)
    throw err
  }
  console.log("Connected")
  // Create database
  // con.query("CREATE DATABASE todo_db", (err, result) => {
  //   if (err) {
  //     console.log("Error while creating database")
  //     throw err
  //   }
  //   console.log("Created")
  //   console.log(result)
  // })

  // Create table
  // con.query("CREATE TABLE list (id int, name varchar(255))", (err, result) => {
  //   if (err) {
  //     console.log("Error : ", err);
  //     throw err
  //   }
  //   console.log("Table Created");
  //   console.log(result)
  // })

  // Insert into table 
  // (one) record
  // con.query("INSERT INTO list (id, name) VALUES (1, 'learn mysql')", (err, result) => {
  //   if (err) {
  //     console.log("Error : ", err);
  //     throw err
  //   }
  //   console.log("1 Inserted ", result.insertId);
  // })

  // (Multiple record)
  // const values = [
  //   [2, 'learn html'],
  //   [3, 'learn css'],
  //   [4, 'learn js']
  // ]
  // con.query("INSERT INTO list (id, name) VALUES ?", [values], (err, result) => {
  //   if (err) {
  //     console.log("Error : ", err);
  //     throw err
  //   }
  //   console.log("Inserted count ", result.affectedRows);
  // })

  // select data
  // con.query("SELECT * FROM list", (err, result, fields) => {
  //   if (err) {
  //     console.log("Error : ", err);
  //     throw err
  //   }
  //   console.log(result);
  //   console.log(fields);
  // })

  // Where and escape (sql injection)
  // const id = 1
  // con.query("SELECT * FROM list WHERE id = " + mysql.escape(id), (err, result, fields) => {
  //   if (err) {
  //     console.log("Error : ", err);
  //     throw err
  //   }
  //   console.log(result);
  // })

  // PLACEHOLDER
  // const id = 1
  // con.query("SELECT * FROM list WHERE id = ?", [id], (err, result, fields) => {
  //   if (err) {
  //     console.log("Error : ", err);
  //     throw err
  //   }
  //   console.log(result);
  // })



  // close the connection
  con.end((err) => {
    if (err) {
      console.error('Error closing MySQL connection:', err);
      return;
    }
    console.log('MySQL connection closed.');
  });
})