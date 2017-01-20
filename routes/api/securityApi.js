var express = require('express');

// DB 연결
const connection = require('../conf/db-con');

exports.authCheckByToken = (req, res, next) => {
  let id = req.params.id;
  let token = req.query.access_token;

  console.log(Math.floor(Date.now() / 1000));
  connection.query('SELECT * FROM token WHERE token = ? AND exp > ?', [token, Math.floor(Date.now() / 1000)], function(err, result) {
    if(result[0] === undefined) {
      res.status(401).send();
      throw err;
    }

    console.log('** ' + result[0].users_id);
    req.body.users_id = result[0].users_id;

    next();
  });
};
