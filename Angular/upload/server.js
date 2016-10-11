var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path')

var multer = require('multer'),
    bodyParser = require('body-parser'),
    path = require('path');

app.use('/static', express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.post('/insertListing/', multer({dest: './public/photos/'}).single('file'), function (req, res) {

    console.log('body:')
    console.dir(req.body)
    console.log('File name: ' + req.file.filename); 
    console.dir(req.file)

});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/uploadFile.html');
});


app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});