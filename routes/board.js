var express = require('express');
var router = express.Router();

const async = require('async');

// DB 연결
const connection = require('./conf/db-con');

// 보안관련 require
const security = require('./conf/security');
const securityApi = require('./api/securityApi');

router.post('/', function(req, res, next) {
  let title = req.body.title;
  let content = req.body.content;
  let token = req.query.access_token;
  async.waterfall([
    function(callback) {
      connection.query('SELECT * FROM token WHERE token = ? ORDER BY exp DESC', [token], function(err, result) {
        callback(null, result[0].users_id);
      });
    }],
    function(err, users_id) {
      connection.query('INSERT INTO board (users_id, title, content) VAlUES (?, ?, ?)', [users_id, title, content], (err) => {
        if (err) throw err;
        res.status(201).end();  // 글쓰기 성공
      });
    });
});

// 쿼리에 맞는 페이징 해주기
// 글번호(id), 글쓴이(users_id로 nickname 조회), 글 작성시간(write_time)
// ex) ?offset=100&limit=25 => 100번째부터 125번째까지
// ref. http://bcho.tistory.com/954
router.get('/list', function(req, res, next) {
  connection.query('SELECT board.id, board.title, board.title, users.nickname, board.write_time ' +
                  'FROM board ' +
                  'LEFT JOIN users ON board.users_id = users.id ' +
                  'ORDER BY board.id DESC', function(err, result) {
                    if(err) throw err;
                    let jsonObject = {};
                    jsonObject.result_list = result;
                    res.json(jsonObject);
                  });
});

// 단일 게시글 조회 (path variable을 사용)
router.get('/:id', function(req, res, next) {
  let id = req.params.id;

  connection.query('SELECT * FROM board WHERE id = ?', id, function(err, result) {
    res.json(result[0]);
  });
});

router.put('/:id', securityApi.authCheckByToken, function(req, res, next) {
  let id = req.params.id;
  let title = req.body.title;
  let content = req.body.content;
  let token = req.query.access_token;
  let users_id = req.body.users_id;
  connection.query('DELETE FROM board WHERE id = ? AND users_id = ?', [id, users_id], function(err, result) {
    if(err) throw error;
    if(result.affectedRows === 1)
      res.status(200).send();
      else
      res.status(403).send();
  });
});

router.delete('/:id', securityApi.authCheckByToken, function(req, res, next) {
  let id = req.params.id;
  let token = req.query.access_token;
  let users_id = req.body.users_id;
  connection.query('DELETE FROM board WHERE id = ? AND users_id = ?', [id, users_id], function(err, result) {
    if(err) throw error;
    if(result.affectedRows === 1)
      res.status(200).send();
      else
      res.status(403).send();
  });
});


module.exports = router;
