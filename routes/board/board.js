const express = require('express');
const router = express.Router();
const boardCtrl = require('./board.controller');

// 보안관련 require
const security = require('../conf/security');
const securityApi = require('../api/securityApi');

router.post('/', boardCtrl.getUsersIdByToken, boardCtrl.writeArticle);

// 쿼리에 맞는 페이징 해주기
// 글번호(id), 글쓴이(users_id로 nickname 조회), 글 작성시간(write_time)
// ex) ?offset=100&limit=25 => 100번째부터 125번째까지
// ref. http://bcho.tistory.com/954
router.get('/list', boardCtrl.getList);

// 단일 게시글 조회 (path variable을 사용)
router.get('/:id', boardCtrl.getArticle);
router.get('/:id/viewer', boardCtrl.getArticleWithViewer);
router.put('/:id', securityApi.authCheckByToken, boardCtrl.updateArticle);
router.delete('/:id', securityApi.authCheckByToken, boardCtrl.deleteArticle);

module.exports = router;
