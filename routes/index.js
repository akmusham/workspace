var express = require('express');
var router = express.Router();
var mongo = require('mongodb')
var assert = require('assert')

var url = "mongodb"
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-data', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

router.post('/insert', function(req, res, next) {
  res.render('index', { title: 'Express' });
  var item = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    message: req.body.message
  }

  mongo.connect(url, function (err, db) {
    assert.equal(null,err)
    db.collection('user-data')
  })
})

router.get('/update', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

router.get('/delete', function(req, res, next) {
  res.render('index', { title: 'Express' });
})


module.exports = router;
