var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const mongo = require('mongodb');
const assert = require('assert');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//connect db
var url = 'mongodb://akmusham:admin123@person-shard-00-00-ckax5.mongodb.net:27017,person-shard-00-01-ckax5.mongodb.net:27017,person-shard-00-02-ckax5.mongodb.net:27017/test?ssl=true&replicaSet=person-shard-0&authSource=admin'
// mongoose.connect('mongodb://akmusham:admin123@person-shard-00-00-ckax5.mongodb.net:27017,person-shard-00-01-ckax5.mongodb.net:27017,person-shard-00-02-ckax5.mongodb.net:27017/test?ssl=true&replicaSet=person-shard-0&authSource=admin',{ useMongoClient: true });
// mongoose.connection.on('connected', function () {
//  console.log('Mongoose default connection open to ');
// });
// mongoose.connection.on('error',function (err) {
//  console.log('Mongoose default connection error: ' + err);
// });
// mongoose.connection.on('disconnected', function () {
//  console.log('Mongoose default connection disconnected');
// });
// process.on('SIGINT', function() {
//  mongoose.connection.close(function () {
//    console.log('Mongoose default connection disconnected through app termination');
//    process.exit(0);
//  });
// });

app.use(express.static('public'));
// /login form route
app.get('/login', function (req, res) {
  res.sendFile(__dirname + "/" + "files/login1.html")
})

// contact us form route
app.get('/contact', function (req, res) {
   res.sendFile( __dirname + "/" + "files/contact.html" )
})

// post values for login
app.post('/get_values',urlencodedParser, function (req, res) {
  x = {
    username: req.body.username,
    password: req.body.password
  }
  console.log(req.body.username);
  res.end(JSON.stringify(x));
})
app.get('/admin', function (req, res) {
  res.sendFile(__dirname + "/" + "files/admin.html")
})

var Schema = mongoose.Schema
var contactSchema = new Schema({
    name: String,
    email: String,
    age: Number,
    message: String
})
app.get('/get_data', function (req, res) {
  var resultArray = []
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('users').find()
    cursor.forEach(function(doc, err) {
      assert.equal(null, err)
      resultArray.push(doc)
    }, function() {
      db.close()
      console.log(resultArray);
      // res.render('get_values', {response: resultArray})
      // res.sendFile(__dirname + "/" + "files/admin.html")
    })
  })
})

app.post('/process_post', urlencodedParser, function (req, res) {

   var response = {
     name: req.body.name,
     email: req.body.email,
     age: req.body.age,
     message: req.body.message
   }

   mongo.connect(url,function (err, db) {
     assert.equal(null, err)
     db.collection('users').insertOne(response, function (err, result) {
       assert.equal(null, err)
       console.log('inserted')
       db.close()
     })
   })
   console.log(response)
   // Prepare output in JSON format
   res.end(JSON.stringify(response));
})

app.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/login')
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("babe listening at http://%s:%s", host, port)

})
