var express = require('express');

// DB 연결
const connection = require('../conf/db-con');

// 해당 토큰의 유효성을 검사한다.
// expire time과 현재 시간을 비교하여 만료된 토큰의 경우 401 에러를 보내준다.
// 추가로 해당 토큰의 주인의 users_id를 req.body.users_id에 넣어 전달한다.
exports.authCheckByToken = (req, res, next) => {
  let id = req.params.id;
  let token = req.query.access_token;

  connection.query('SELECT * FROM token WHERE token = ? AND exp > ?', [token, Math.floor(Date.now() / 1000)], function(err, result) {
    if(result[0] === undefined) {
      res.status(401).send();
      throw err;
    }
    req.body.users_id = result[0].users_id;
    next();
  });
};
