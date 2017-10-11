const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

var sessions;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(Sessions({
  secret : 'akjdwn27eu2nlsa238768'
}))

app.get('/',function(req, resp) {
  resp.end('wow')
})

app.listen(1337, function () {
  console.log('yeah!!');
})
