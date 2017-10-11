const express = require('express')
const bodyParser = require('body-parser')
var path = require('path')
const sessions = require('express-session')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

var session;

var app = express()
app.use('cssFiles', express.static(__dirname + '/assets'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/static', express.static('public/stylesheets/mystyle.css'))

var urlencodedParser = bodyParser.urlencoded({ extended: true })

app.use(sessions({
  secret: 'akjdwn27eu2nlsa238768',
  resave: false,
  saveUninitialized: false
}))
// Compile model from schema
// var contact = mongoose.model('contact', contactSchema )

mongoose.connect('mongodb://akmusham:admin123@person-shard-00-00-ckax5.mongodb.net:27017,person-shard-00-01-ckax5.mongodb.net:27017,person-shard-00-02-ckax5.mongodb.net:27017/test?ssl=true&replicaSet=person-shard-0&authSource=admin',{useMongoClient: true})
mongoose.connection.on('connected', function () {
 console.log('Mongoose connected')
})
mongoose.connection.on('error',function (err) {
 console.log('Mongoose default connection error: ' + err)
})
mongoose.connection.on('disconnected', function () {
 console.log('Mongoose default connection disconnected')
});
process.on('SIGINT', function() {
 mongoose.connection.close(function () {
   console.log('Mongoose default connection disconnected through app termination')
   process.exit(0)
 })
})
app.get('',function (req, res) {
  res.send('welcome')
})
app.get('/login', function (req, res) {
  session = req.session
  if (session.uniqueID) {
    res.redirect('/redirects')
  }
  res.sendFile('./files/blah.html', {root: __dirname})

  // app.use('/static', express.static(path.join(__dirname, 'public')))

})
app.get('/count', function (req, res) {

  res.sendFile('./files/contact.html',{root: __dirname})

  if (req.session.page_views) {
    req.session.page_views++
    res.send("you visited this page" + req.session.page_views + "times")
  }else {
    req.session.page_views = 1
    res.send('welcome')
  }

})

app.get('/home', function (req, res) {
  res.sendFile('./files/index.html',{root: __dirname})
})

app.get('/about', function (req, res) {
  res.sendFile('./files/about.html',{root: __dirname})
})


app.post('/login', function (req, res) {
  // res.end(JSON.stringify(req.body))
  session = req.session
  console.log(req.body)
  if (session.uniqueID) {
    res.redirect('/redirects')
  }
  //if (req.body.username == 'admin' && req.body.password == 'admin') {
    session.uniqueID = req.body.username
  //}
  res.redirect('/redirects')

})
app.get('/admin', function (req, res) {
  session = req.session
  if (session.uniqueID != 'admin') {
    res.send('not allowed <a href="/login">please login<a>')



  }else {
    res.sendFile('./files/contact.html', {root: __dirname})
  }
})

app.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/login')
})

app.get('/redirects', function (req, resp) {
  session = req.session
  if (session.uniqueID == 'admin') {
    console.log(session.uniqueID);
    resp.redirect('/admin')
  }else {
    resp.send('username: ' + req.session.uniqueID +', not found in the database, please try again with correct username <a href="/logout">click here to go back </a>')
  }
})


app.listen(1337, function () {
  console.log('babe im listening');
})
