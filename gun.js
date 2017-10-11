var express = require("express");
var myParser = require("body-parser");
var app = express();

  app.use(myParser.urlencoded({extended : true}));
  app.get('/login', function (req, res)) {
  res.sendFile( __dirname + "/" + "files/contact.html" )
  })
  app.post("/registeruser", function(request, response) {
       saveRegistrationData(request); //This is what happens when a POST request is sent to /registeruser
 });
app.listen(8080);
