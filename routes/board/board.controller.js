// DB 연결
const connection = require('../conf/db-con');



exports.getUsersIdByToken = function(req, res, next) {
  let token = req.query.access_token;
  connection.query('SELECT * FROM token WHERE token = ? ORDER BY exp DESC', [token], function(err, result) {
    let now = Math.floor(Date.now() / 1000);
    if(result[0].exp < now) {
      res.status(403).end('session expired.');
      return;
    }

    req.body.users_id = result[0].users_id;
    next();
  });
}

exports.writeArticle = function(req, res, next) {
  let title = req.body.title;
  let content = req.body.content;
  let token = req.query.access_token;
  let users_id = req.body.users_id;
  connection.query('INSERT INTO board (users_id, title, content) VAlUES (?, ?, ?)', [users_id, title, content], (err) => {
    if (err) throw err;
    res.status(201).end();  // 글쓰기 성공
  });
}

exports.getList = function(req, res, next) {
  connection.query('SELECT board.id, board.title, board.title, users.nickname, DATE_FORMAT(board.write_time, "%Y-%m-%d %T") AS write_time ' +
                  'FROM board ' +
                  'LEFT JOIN users ON board.users_id = users.id ' +
                  'ORDER BY board.id DESC', function(err, result) {
                    if(err) throw err;
                    let jsonObject = {};
                    jsonObject.result_list = result;
                    res.json(jsonObject);
                  });
}

exports.getArticle = function(req, res, next) {
  let id = req.params.id;

  connection.query('SELECT id, title, content, DATE_FORMAT(board.write_time, "%Y-%m-%d %T") AS write_time FROM board WHERE id = ?', id, function(err, result) {
    res.json(result[0]);
  });
}

exports.getArticleWithViewer = function(req, res, next) {
  let id = req.params.id;

  connection.query('SELECT id, title, content, DATE_FORMAT(board.write_time, "%Y-%m-%d %T") AS write_time FROM board WHERE id = ?', id, function(err, result) {
    res.render('board', {req: req, isViewer: true, title: result[0].title, content: result[0].content});
  });
}

exports.updateArticle = function(req, res, next) {
  let id = req.params.id;
  let title = req.body.title;
  let content = req.body.content;
  let token = req.query.access_token;
  let users_id = req.body.users_id;
  connection.query('UPDATE board SET title = ?, content = ? WHERE id = ? AND users_id = ?', [title, content, id, users_id], function(err, result) {
    if(err) throw error;
    if(result.affectedRows === 1)
      res.status(200).send();
      else
      res.status(403).send();
  });
}

exports.deleteArticle = function(req, res, next) {
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
}
