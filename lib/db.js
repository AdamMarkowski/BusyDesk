// var mysql = require('mysql');
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

// var connection = createConnection({
// 	host:'localhost',
// 	user:'USERNAME_HERE',
// 	password:'PASSWORD_HERE',
// 	database:'DATABASE_NAME_HERE'
// });
// connection.connect(function(error){
// 	if(!!error) {
// 		console.log(error);
// 	} else {
// 		console.log('Connected..!');
// 	}
// });

// export default connection;

// export default db;

module.exports = db;
