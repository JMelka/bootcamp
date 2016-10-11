var express = require('express');
var app = express();

var db = require('./db');

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.delete('/tweet/:tweetid', function(req, res) {
    var id = req.params.tweetid;
    db.removeTweet(id).then(
        (val) => {
            res.send();
        }
    ).catch(
        (err) => {
            // TODO check for bad request
            res.status(500);
            res.send('we blew up');
        }
    );   
});


app.get('/userfeed/:userid', function(req, res) {
    var id = req.params.userid;
    db.allFollowingTweets(id).then(
        (tweets) => {
            res.send(tweets);
        }
    ).catch(
        (err) => {
            res.status(500);
            res.send('we blew up');
        }
    );
});


app.listen(3000, function () {
    console.log("Server running on port: ", 3000);
});
