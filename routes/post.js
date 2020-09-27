var express = require('express');
var router = express.Router();

/* GET post page. */
router.get('/post', function(req, res, next) {
  res.render('post', { 
    title: 'Express',
  });
});

module.exports = router;
