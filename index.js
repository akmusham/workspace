const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session');
const mongodb = require('mongodb')
const app = express()
app.use(bodyparser.json())

// session.uniqueID = req.body.username
//connect db
mongoose.connect('mongodb://akmusham:admin123@person-shard-00-00-ckax5.mongodb.net:27017,person-shard-00-01-ckax5.mongodb.net:27017,person-shard-00-02-ckax5.mongodb.net:27017/test?ssl=true&replicaSet=person-shard-0&authSource=admin',{useMongoClient: true});
mongoose.connection.on('connected', function () {
 console.log('Mongoose default connection open to ');
});
mongoose.connection.on('error',function (err) {
 console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
 console.log('Mongoose default connection disconnected');
});
process.on('SIGINT', function() {
 mongoose.connection.close(function () {
   console.log('Mongoose default connection disconnected through app termination');
   process.exit(0);
 });
});


var schema = mongoose.Schema
var userdata = new schema({
  name : {
    type : String,
    required : 'please enter your name'
  }
})

var person = mongoose.model('userdata',userdata,'users')
const obj = {
  name : 'akhil'
}


person.insertMany([obj], function (err, person) {
  console.log(err);
})

app.get('/', function (req, res) {
  console.log('hey im ak')
  // res.send(req.body)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
