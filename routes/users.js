const express = require('express');
const router = express.Router();
const dbConn = require('../lib/db');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function (req, res, next) {
  // const sql = 'SELECT * FROM user ORDER BY id DESC';
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

        res.cookie('currentUser', encodeURIComponent(JSON.stringify(currentUser)))
        console.log('setting currentUser', currentUser)
        console.log('setting currentUser s', JSON.stringify(currentUser))
        console.log('setting currentUser s', encodeURIComponent(JSON.stringify(currentUser)))
        // res.cookie('currentUser', data[0])

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
  // let errors = false;

  // if (name.length === 0 || author.length === 0) {
  //   errors = true;

  //   // set flash message
  //   req.flash('error', "Please enter name and author");
  //   // render to add.ejs with flash message
  //   res.render('books/add', {
  //     name: name,
  //     author: author
  //   })
  // }

  // if no error
  // if (!errors) {

    var form_data = {
      FirstName: firstName,
      LastName: lastName,
      pass: password
    }

    // insert query
    dbConn.query(
      `INSERT INTO users
      (lastName, firstName, email, password)
      VALUES
      (?, ?, ?, ?)`,
      [lastName, firstName, email, password],
      function (err, result) {
      //if(err) throw err

      console.log('req.body: ', req.body)

      if (err) {
        // req.flash('error', err)

        // render to add.ejs
        // res.render('books/add', {
        //   name: form_data.firstName,
        //   author: form_data.lastName
        // })
        console.log(err)

        res.json({
          status: 'error',
          ...err
        })
      } else {
        // req.flash('success', 'Book successfully added');
        // res.redirect('/books');
        res.json({
          status: 'ok'
        })
      }
    })
  // }
})

// // display edit book page
// router.get('/edit/(:id)', function (req, res, next) {

//   let id = req.params.id;

//   dbConn.query('SELECT * FROM books WHERE id = ' + id, function (err, rows, fields) {
//     if (err) throw err

//     // if user not found
//     if (rows.length <= 0) {
//       req.flash('error', 'Book not found with id = ' + id)
//       res.redirect('/books')
//     }
//     // if book found
//     else {
//       // render to edit.ejs
//       res.render('books/edit', {
//         title: 'Edit Book',
//         id: rows[0].id,
//         name: rows[0].name,
//         author: rows[0].author
//       })
//     }
//   })
// })

// // update book data
// router.post('/update/:id', function (req, res, next) {

//   let id = req.params.id;
//   let name = req.body.name;
//   let author = req.body.author;
//   let errors = false;

//   if (name.length === 0 || author.length === 0) {
//     errors = true;

//     // set flash message
//     req.flash('error', "Please enter name and author");
//     // render to add.ejs with flash message
//     res.render('books/edit', {
//       id: req.params.id,
//       name: name,
//       author: author
//     })
//   }

//   // if no error
//   if (!errors) {

//     var form_data = {
//       name: name,
//       author: author
//     }
//     // update query
//     dbConn.query('UPDATE books SET ? WHERE id = ' + id, form_data, function (err, result) {
//       //if(err) throw err
//       if (err) {
//         // set flash message
//         req.flash('error', err)
//         // render to edit.ejs
//         res.render('books/edit', {
//           id: req.params.id,
//           name: form_data.name,
//           author: form_data.author
//         })
//       } else {
//         req.flash('success', 'Book successfully updated');
//         res.redirect('/books');
//       }
//     })
//   }
// })

// // delete book
// router.get('/delete/(:id)', function (req, res, next) {

//   let id = req.params.id;

//   dbConn.query('DELETE FROM books WHERE id = ' + id, function (err, result) {
//     //if(err) throw err
//     if (err) {
//       // set flash message
//       req.flash('error', err)
//       // redirect to books page
//       res.redirect('/books')
//     } else {
//       // set flash message
//       req.flash('success', 'Book successfully deleted! ID = ' + id)
//       // redirect to books page
//       res.redirect('/books')
//     }
//   })
// })

module.exports = router;
