const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {req: req});
});

router.get('/board', function(req, res, next) {
  res.render('board', {req: req});
});

router.get('/users', function(req, res, next) {
  res.render('users', {req: req});
});

router.get('/about', function(req, res, next) {
  res.render('about', {req: req});
});

module.exports = router;
