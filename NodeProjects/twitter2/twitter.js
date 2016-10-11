'use strict'


var express = require('express');
var app = express();

app.use('/static', express.static(__dirname + "/public"));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);

})


//Get User Id
app.get('/twitter.html', function (req, res) {
   res.sendFile( __dirname + "/" + "twitter.html" );
})
