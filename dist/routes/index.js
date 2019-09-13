var express = require('express');
const { check, validationResult } = require('express-validator');
var router = express.Router();
var fireDB = require('../connection/firebase-admin');
const home = fireDB.ref('/home');
//首頁的圖片
router.get('/rooms', function(req, res, next) {
  const send = {
    item: [],
  };
  home
    .once('value', snap => {
      for (const key in snap.val()) {
        const item = snap.val()[key];
        const room = {
          id: item.id,
          ...item['rooms-detail'],
        };
        send.item.push(room);
      }
    })
    .then(() => {
      res.send(send);
    });
});

router.get('/room/:id', function(req, res, next) {
  let send = {
    room: [],
    booking: [],
  };
  home
    .child(req.params.id)
    .once('value', snap => {
      const item = snap.val();
      const { imageUrl, ...rest1 } = item['rooms-detail'];
      const { booking, ...rest2 } = item['room-detail'];
      send.room.push({
        id: item.id,
        ...rest1,
        ...rest2,
      });
      send.booking = booking === false ? [] : booking;
    })
    .then(() => {
      res.send(send);
    });
});

router.post(
  '/room/:id',
  [
    check('tel')
      .trim()
      .isNumeric(),
    check('date')
      .isArray()
      .not()
      .isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    const typeResult = req.body.date.every(e => {
      return typeof e === 'string';
    });
    if (!errors.isEmpty() || !typeResult) {
      res.send({
        success: false,
        message: errors.array(),
      });
    } else {
      const bookingPath = home.child(`${req.params.id}/room-detail/booking`);
      bookingPath
        .once('value', snap => {
          bookingPath.push(req.body);
          //snap.val() === false ? bookingPath.push({ ...req.body }) : bookingPath.set([...snap.val(), req.body]);
        })
        .then(() => {
          const homeId = home.child(`${req.params.id}`);
          let description = '';
          homeId.child(`/room-detail/description`).once('value', snap => {
            description = snap.val();
          });
          homeId.child(`/rooms-detail`).once('value', snap => {
            res.send({
              room: {
                success: true,
                ...snap.val(),
                description,
                id: req.params.id,
              },
              booking: [req.body],
            });
          });
        });
    }
  },
);

router.delete('/room/:id', function(req, res, next) {
  const bookingPath = home.child(`${req.params.id}/room-detail/booking`);
  bookingPath.set(false).then(() => {
    res.send('刪除');
  });
});

/* router.post('/', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var nickname = req.body.nickname;
  fireAuth
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      fireDB
        .ref(`/users/${user.user.uid}`)
        .set({
          email: email,
          nickname: nickname,
          uid: user.user.uid,
        })
        .then(() => {
          res.send('good');
        });
    })
    .catch(error => {
      res.send(error);
    });
}); */

module.exports = router;
