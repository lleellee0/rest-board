var express = require('express');
var router = express.Router();

var mysql = require('mysql');
let connection = mysql.createConnection({
  user: 'root',
  password: 'mysql123',
  database: 'first_rest'
});

let salt = 'ssssaalllltt!';


// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');
var fs = require('fs');

// sign with RSA SHA256
var cert = fs.readFileSync('private.key');  // get private key

// sign asynchronously
// jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, function(err, token) {
//   console.log(token);
// });

// DB 연결
connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

// 전체 조회
router.get('/all', function(req, res, next) {
  connection.query('SELECT id, user_id, nickname FROM users', function(err, result) {
    res.json(result);
  });
});

// 로그인 체크 (Query String으로 데이터 전달 필요)
// parameter : ?user-id=유저아이디&password=유저비밀번호
router.get('/login-check', function(req, res, next) {
  let user_id = req.query.user_id;
  let password = req.query.password;

  connection.query('SELECT id, user_id, nickname FROM users WHERE user_id=? AND password=password(?)', [user_id, password + salt], function(err, result) {
    jwt.sign(result[0], cert, { algorithm: 'RS256' }, function(err, token) {
      result[0].token = token;
      result[0].token_exp = Math.floor(Date.now() / 1000) + (60 * 60);
      res.json(result[0]);
    });
  });
});

// 단일 회원 조회 (path variable을 사용)
router.get('/:id', function(req, res, next) {
  let id = req.params.id;

  connection.query('SELECT id, user_id, nickname FROM users WHERE id=?', id, function(err, result) {
    res.json(result);
  });
});

// 회원 가입 (JSON 데이터 전달 필요)
// parameter : {"user_id":"유저아이디","password":"유저비밀번호","nickname":"유저닉네임"}
// return : {"message":"결과"}
router.post('/', function(req, res, next) {
  let user_id = req.body.user_id;
  let password = req.body.password;
  let nickname = req.body.nickname;

  connection.query('INSERT INTO users (user_id, password, nickname) VALUES (?, password(?), ?)', [user_id, password + salt, nickname], function(err, result) {
    if(err === null)
      res.json({message: "insert ok"});
    else
      res.json({message: "insert fail"});
  });
});

// 아래 두 메소드는 user에서는 아직 구현하지 않겠음.
// router.put('/:id', function(req, res, next) {
//
// });
//
// router.delete('/:id', function(req, res, next) {
//
// });

module.exports = router;
