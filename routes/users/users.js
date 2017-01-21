const express = require('express');
const router = express.Router();
const usersCtrl = require('./users.controller')

// 전체 조회
router.get('/all', function(req, res, next) {
  connection.query('SELECT id, user_id, nickname FROM users', function(err, result) {
    res.json(result);
  });
});

// 로그인 체크 (Query String으로 데이터 전달 필요)
// parameter : ?user-id=유저아이디&password=유저비밀번호
router.get('/login-check', usersCtrl.loginCheck);

// 단일 회원 조회 (path variable을 사용)
router.get('/:id', usersCtrl.getUserInfo);

// 회원 가입 (JSON 데이터 전달 필요)
// parameter : {"user_id":"유저아이디","password":"유저비밀번호","nickname":"유저닉네임"}
// return : {"message":"결과"}
router.post('/', usersCtrl.signUp);

// 아래 두 메소드는 user에서는 아직 구현하지 않겠음.
// router.put('/:id', function(req, res, next) {
//
// });
//
// router.delete('/:id', function(req, res, next) {
//
// });

module.exports = router;
