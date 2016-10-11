var cat = document.getElementById('cat');

cat.style.width = '300px';
cat.style.height = '400px';

var main = document.getElementById('main');

var a = document.createElement('a');
a.setAttribute('href', 'http://wikipedia.org');
a.innerHTML = 'go to wikipedia';
main.appendChild(a);

a.onclick = function (evt) {
    evt.preventDefault();
    console.log('got clicked');
};


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
    }
};
xhttp.open("GET", "http://www.omdbapi.com/?t=batman&y=&plot=short&r=json", true);
xhttp.send();
