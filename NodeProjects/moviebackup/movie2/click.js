/**
 * Created by admin on 9/12/2016.
 */

var textbox = document.getElementById("movie");
textbox.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        console.log(textbox.value);
        doSearch(textbox.value);
    }
});



function doSearch(title) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            updateMovie(data);
        }
    };
    xhttp.open("GET", "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json", true);
    xhttp.send();
}
var sr = document.getElementById("searchResults");

var div = document.getElementById('movieDiv');
var content = document.getElementById('movie-content');
var poster = document.getElementById('movie-poster');

function updateMovie(movieInfo) {
    sr.innerHTML = "<b>Title:  </b>" + movieInfo.Title + " <b>Movie Year: </b>" + movieInfo.Year;

    content.innerHTML = '';
    poster.innerHTML = '';
    var img = document.createElement('img');

    img.src = movieInfo.Poster;
    poster.appendChild(img);

    for (var key in movieInfo) {
        if (key !== "Poster") {
            content.innerHTML += "<b>"+key+"</b>: "+ movieInfo[key] + "<br />";
        }
    }

}



// var txt = document.getElementById('txtbox');
// var div = document.getElementById('movieDiv');

// txt.onkeypress = function (evt) {
//     if (evt.keyCode === 13) {
//         //evt.preventDefault();
//         doSearch(txt.value);
//     }
// }


// function doSearch(title) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState === 4 && this.status === 200) {
//             var data = JSON.parse(this.responseText);
//             updateMovieDiv(data);
//         }
//     };
//     xhttp.open("GET", "http://www.omdbapi.com/?t=" + title +"&y=&plot=short&r=json", true);
//     xhttp.send();    
// }

// var content = document.getElementById('movie-content');
// var poster = document.getElementById('movie-poster');

// function updateMovieDiv(movieInfo) {
//     // div.innerHTML = 'Title:' + movieInfo.Title + '<br/> Year: ' + movieInfo.Year;

//     content.innerHTML = '';
//     poster.innerHTML = '';
//     var img = document.createElement('img');

//     img.src = movieInfo.Poster;
//     poster.appendChild(img);

//     for (var key in movieInfo) {
//         if (key !== "Poster") {
//             content.innerHTML += "<b>"+key+"</b>: "+ movieInfo[key] + "<br />";
//         }
//     }

// }
