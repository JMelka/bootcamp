'use strict'


// var express = require('express');
// var app = express();

// app.use('/static', express.static(__dirname + "/public"));

// var server = app.listen(3000, function () {

//   var host = server.address().address;
//   var port = server.address().port;

//   console.log("Example app listening at http://%s:%s", host, port);

// })


// //Get User Id
// app.get('/twitter.html', function (req, res) {
//    res.sendFile( __dirname + "/" + "twitter.html" );
// })


//AJAX request
var submitButton = document.getElementById("submitButton");


submitButton.onclick = function (event) {
    //event.preventDefault();
        var name = document.getElementById("name");
        //console.log(name.value);
        login(name.value);

};

function login(name) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //console.log("Hello Joe");
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            printUserId(data);
        }
    };
    //xhttp.open("GET", "http://127.0.0.1:8081/getUser.htm?name=" + name + "&y=&plot=short&r=json", true);
    xhttp.open("GET", "/userId/" + name, true);
    xhttp.send();
}

var sr = document.getElementById("searchResults");

function printUserId(user) {
    sr.innerHTML = "<b>User Id:  </b>" + user.userId;

}




