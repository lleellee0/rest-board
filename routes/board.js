var express = require('express');
var router = express.Router();

// DB 연결
const connection = require('./conf/db-con');

// 보안관련 설정
const security = require('./conf/security');
const privateKey = security.privateKey;
const publicKey = security.publicKey;

// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
