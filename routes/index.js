const express = require('express');
const router = express.Router();

const mysql = require('mysql2');
const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;
const db = mysql.createConnection({
    host:  DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
})
db.connect();

const pool = mysql.createPool({
    host:  DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
});

const promisePool = pool.promise();

/* GET home page. */
router.get('/', function(req, res, next) {
   const sql = 'SELECT * FROM user';
   db.query(sql, (err,data) => {
     res.json(data);
   });
});

module.exports = router;
