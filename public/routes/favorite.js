var express = require('express');
var fireDB = require('../connection/firebase-admin');
const fireAuth = require('../connection/firebase-client');
const usersRef = fireDB.ref('/users');
const { check, validationResult } = require('express-validator');
var router = express.Router();

router.post('/', (req, res, next) => {
  if (req.session.uid) {
    const favoritePath = usersRef.child(`${req.session.uid}/favorite`);
    favoritePath
      .once('value', snap => {
        if (snap.val() === false) {
          favoritePath.push({ id: req.body.id }).then(() => {
            res.json({
              success: true,
              message: '已加入最愛',
            });
          });
        } else {
          favoritePath
            .orderByChild('id')
            .equalTo(req.body.id)
            .once('value', snapEqual => {
              snapEqual.forEach(e => {
                e.val() ? '' : favoritePath.push({ id: req.body.id });
              })
            }).then(()=>{
              res.send({
                success: true,
                message: '已加入最愛',
              });
            })
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.send({
      success: false,
      message: '未登入',
    });
  }
});

router.delete('/:id', (req, res, next) => {
  if (req.session.uid) {
    const favoritePath = usersRef.child(`${req.session.uid}/favorite`);
    favoritePath
      .orderByChild('id')
      .equalTo(req.params.id)
      .once('value', snapEqual => {
        snapEqual.forEach(e => {
          if (e.val()) {
            favoritePath
              .child(e.key)
              .remove()
              .then(() => {
                res.send({
                  success: true,
                  message: '已刪除',
                });
              });
          } else {
            res.send({
              success: false,
              message: '無此id',
            });
          }
        });
      })
      .catch(err => {
        res.send({
          success: false,
          err,
        });
      });
  } else {
    res.send({
      success: false,
      message: '未登入',
    });
  }
});

module.exports = router;
