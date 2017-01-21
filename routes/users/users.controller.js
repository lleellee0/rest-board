// DB 연결
const connection = require('../conf/db-con');

// 보안관련 설정
const security = require('../conf/security');
const salt = security.salt;
const crypto = require('crypto');

exports.loginCheck = function(req, res, next) {
  let user_id = req.query.user_id;
  let password = req.query.password;
  let nonce = req.query.nonce;

  nonce = crypto.createHash('sha256').update(nonce).digest('hex');

  connection.query('SELECT id, user_id, nickname FROM users WHERE user_id=? AND password=password(?)', [user_id, password + salt], function(err, result) {
    let row = result[0];
    row.token = nonce;
    row.token_exp = Math.floor(Date.now() / 1000) + (60 * 60);
    connection.query('INSERT INTO token (users_id, token, exp) VALUES (?, ?, ?)', [row.id, row.token, row.token_exp], function(err, result) {
      if(err) throw err;
      res.json(row);
    });
  });
}

exports.getUserInfo = function(req, res, next) {
  let id = req.params.id;

  connection.query('SELECT id, user_id, nickname FROM users WHERE id=?', id, function(err, result) {
    res.json(result);
  });
}

exports.signUp = function(req, res, next) {
  let user_id = req.body.user_id;
  let password = req.body.password;
  let nickname = req.body.nickname;

  connection.query('INSERT INTO users (user_id, password, nickname) VALUES (?, password(?), ?)', [user_id, password + salt, nickname], function(err, result) {
    if(err === null)
      res.status(201).end();
    else
      res.status(400).json({message: "insert fail"});
  });
}