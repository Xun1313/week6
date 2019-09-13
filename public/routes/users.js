var express = require('express');
var fireDB = require('../connection/firebase-admin');
const fireAuth = require('../connection/firebase-client');
const usersRef = fireDB.ref('/users');
const { check, validationResult } = require('express-validator');
var router = express.Router();

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  console.log(req.session);
  res.send('respond with a users');
}); */



router.post('/signup', [check('email').isEmail(), check('password').isAlphanumeric()], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send({
      success: false,
      message: errors.array(),
    });
  } else {
    const { email, password } = req.body;
    fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        const uid = user.user.uid;
        usersRef
          .child(uid)
          .set({
            favorite: false,
          })
          .then(() => {
            usersRef.child(uid).update({
              uid,
            });
          });
        res.send({
          success: true,
          user: {
            email,
            password,
            uid,
          },
        });
      })
      .catch(err => {
        res.send({
          success: false,
          message: err.message,
        });
      });
  }
});


router.post('/signin', [check('email').isEmail(), check('password').isAlphanumeric()], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send({
      success: false,
      message: errors.array(),
    });
  } else {
    const { email, password } = req.body;
    fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        usersRef.child(user.user.uid).once('value', snap => {
          req.session.uid = user.user.uid; //儲存使用者
          res.locals.uid = req.session.uid;
          const { favorite, uid } = { ...snap.val() };
          res.send({
            success: true,
            uid,
            favorite: favorite === false ? [] : favorite,
          });
        });
      })
      .catch(err => {
        res.send({
          success: false,
          message: err,
        });
      });
  }
});

router.post('/signout', (req, res, next) => {
  fireAuth.signOut().then(() => {
    req.session.uid = '';
    res.send({
      success: true,
      message: '已登出',
    });
  });
});

router.delete('/:id', (req, res, next) => {
  usersRef
    .child(`${req.params.id}`)
    .remove()
    .then(() => {
      res.send('刪除');
    });
});

module.exports = router;
