'use strict'


//AJAX request
var submitButton = document.getElementById("submitButton");
var submitMessage = document.getElementById("submitMessage");
var submitGetTweets = document.getElementById("submitGetTweets");

//var name = document.getElementById("name");
//var password = document.getElementById("password");
//var userName = document.getElementById("userName");
//var userId = document.getElementById("userId");
//var message = document.getElementById("message");

submitButton.onclick = function (event) {
    //event.preventDefault();
    var name = document.getElementById("name");
    var password = document.getElementById("password");
    //login(name.value);
    //console.log(name.value);

    createUser(name.value, password.value);

};

submitLogin.onclick = function (event) {
    //event.preventDefault();
    var name = document.getElementById("loginname");
    var password = document.getElementById("loginpassword");
    login(name.value);
    //getTweetFeed(id.)
    //console.log(name.value);

    //createUser(name.value, password.value);

};

submitMessage.onclick = function (event) {
    //event.preventDefault();
    var userName2 = document.getElementById("userName");
    var message = document.getElementById("message");
    //console.log(message.value);
    //login(name.value);
    insertTweet(userName2.value, message.value);

};

submitGetTweets.onclick = function (event) {
    //event.preventDefault();
    var userId = document.getElementById("loginResults");
    getTweetFeed(userId);

};

function createUser(name, password) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);

        }
    };

    xhttp.open("POST", "/insertUser/" + name + "/" + password, true);
    xhttp.send();

    login(name);
}

function login(name) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log("login test");
            printUserId(data, name);
        }
    };

    xhttp.open("GET", "/userId/" + name, true);
    xhttp.send();
}

function printUserId(user, name) {
    var sr = document.getElementById("searchResults");
    var lr = document.getElementById("loginResults");
    var userName = document.getElementById("userName");
    console.log("Print User Id: " + user.userId);
    if (user.length === 0) {
        userName.value = "User not found";
    } else {
        sr.innerHTML = "<b>User Id:  </b>" + user.userId;
        lr.innerHTML = "<b>User Id:  </b>" + user.userId;
        userName.value = name;

        getTweetFeed(user.userId);
    }

}

function showNotAUserError() {
    var lr = document.getElementById("loginResults");

    lr.innerHTML += "Not a User";

}



function insertTweet(name, message) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);

        }
    };

    xhttp.open("POST", "/insertTweet/" + name + "/" + message, true);
    xhttp.send();

    login(name); 
    //getTweetFeed(user.userId);
}

function getTweetFeed(id) {
    console.log("TweetFeed id: " + id);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            
            console.log(data);
            printTweets(data);
        } 

    };

    xhttp.open("GET", "/getTweets/" + id, true);
    xhttp.send();
}

function printTweets(tweets) {
    var tweetArea = document.getElementById("tweetArea");;
    if (tweets.length === 0) {
        tweetArea.innerHTML = "No Tweets";
    } else {
        for (var tweet of tweets) {
            tweetArea.innerHTML += "<b>Tweet Id:  </b>" + tweet.Id + " <b>Message:  </b>" + tweet.Msg + " <b>Date:  </b>" + tweet.Date + "<br>";
        }
    }
    

}

function printNoTweets() {
    var tweetArea = document.getElementById("tweetArea");;
    tweetArea.innerHTML += "None."
}

// function printNewUser(user) {
//     sr.innerHTML = "<b>User Id:  </b>" + user.userId;

// }




