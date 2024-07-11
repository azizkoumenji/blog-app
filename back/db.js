import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "258745",
  database: "blog",
});

export default db;
