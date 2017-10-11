const express = require('express');
const bodyParser = require('body-parser');
const session = require('session');
var pathToRegexp = require('path-to-regexp')

var sessions;

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(session)
app.use(session({
  secret : 'akjdwn27eu2nlsa238768',
  resave : false,
  saveUninitiaialized: false
})

app.get('/login', function(req, resp){
  session = req.session
  if (session.uniqueID) {
    resp.redirect('/redirect')
  }
  resp.sendFile('./files/login.html',{root: __dirname})
})

app.post('/login', function (req, resp) {
  session = req.session
  if (session.uniqueID) {
    resp.redirect('/redirect')
  }
  if (req.body.username == 'admin' && req.body.password == 'admin') {
    session.uniqueID = req.body.username
  }
  resp.redirect('/redirect')
})

app.get('/logout', function (req, resp) {
  req.session.destroy()
  resp.redirect('/login')
})

app.get('/admin', function (req, resp) {
  session = req.session
  if (session.uniqueID != 'admin') {
    resp.send('not allowed')
  }
  resp.send('you are admin <a href="/login"> ')
})

app.get('/redirect', function () {
  session = req.session
  if (session.uniqueID = 'admin') {
    console.log(session.uniqueID)
    resp.redirect('/admin')
  }else{
    resp.send('who are you? <a href="/logout">kill session <a>')
  }
})

app.listen(3000, function () {
  console.log('im listening babe');
})
