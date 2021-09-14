const express = require('express');
const router = express.Router();
// const dbConn = require('../lib/db');

const Users = require('../models/Users')

router.get('/', function (req, res, next) {
  Users.list((err, data) => {
    res.json(data);
  });
});

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Users.find(email, password, (err, data) => {
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
  Users.create(
    lastName, firstName, email, password,
    (err, result) => {
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

  Users.destroy(id, (err, result) => {
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
