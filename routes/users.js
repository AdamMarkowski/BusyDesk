const express = require('express');
const router = express.Router();
const dbConn = require('../lib/db');

router.get('/', function (req, res, next) {
  const sql = 'SELECT * FROM users';
  dbConn.query(sql, (err, data) => {
    res.json(data);
  });
});

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const sql = 'SELECT * FROM users where email = ? AND password = ?';
  dbConn.query(sql, [email, password], (err, data) => {
    if (err || data.length === 0) {
      console.log(err)

      res.status(401)
      res.json({
        status: 'error',
        ...err
      })
    } else {
      const currentUser = Object.assign({}, data[0]);

      res.cookie('currentUser', JSON.stringify(currentUser), { encode: String })
      console.log('setting currentUser', currentUser)

      res.json({
        status: 'ok',
        user: data[0]
      })
    }
  });
})

// add a new book
router.post('/create/', function (req, res, next) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  // insert query
  dbConn.query(
    `INSERT INTO users
      (lastName, firstName, email, password)
      VALUES
      (?, ?, ?, ?)`,
    [lastName, firstName, email, password],
    function (err, result) {

      console.log('req.body: ', req.body)

      if (err) {
        console.log(err)

        res.json({
          status: 'error',
          ...err
        })
      } else {
        res.json({
          status: 'ok'
        })
      }
    })
})

// delete user
router.get('/delete/(:id)', function (req, res, next) {

  let id = req.params.id;

  dbConn.query('DELETE FROM users WHERE id = ' + id, (err, result) => {
    if (err) {
      console.log(err)

      res.json({
        status: 'error',
        ...err
      })
    } else {
      res.json({
        status: 'ok'
      })
    }
  })
})

module.exports = router;
