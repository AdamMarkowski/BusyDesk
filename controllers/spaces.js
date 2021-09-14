const express = require('express');
const router = express.Router();
const dbConn = require('../lib/db');

const Spaces = require('../models/Spaces')

router.get('/', function (req, res, next) {
  Spaces.list((err, data) => {
    res.json(data);
  });
});

router.post('/create/', function (req, res, next) {
  const name = req.body.name;

  Spaces.create(name, (err, result) => {
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

module.exports = router;
