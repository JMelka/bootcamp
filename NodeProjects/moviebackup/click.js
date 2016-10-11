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

function updateMovie(movieInfo) {
    sr.innerHTML = "<b>Title:  </b>" + movieInfo.Title + " <b>Movie Year: </b>" + movieInfo.Year;

}

