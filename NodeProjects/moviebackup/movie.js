'use strict'


var express = require('express');
var app = express();


var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);

})


//Get User Id
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
