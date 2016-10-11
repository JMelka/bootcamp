//read a file (async) that is a list of words
//split the string by line into an array
//sort the words alphabetically
//write the sorted words to another file (async)
var fs = require('fs');



function readFile(name, encoding){
    return new Promise(
        (resolve, reject) => {

        fs.readFile(name, encodign, function (err, contents) {
    
        if (err) {
             console.log(err);
             reject(err);
            return;
        }
        console.log(contents);
        resolve(contents);
        

        })



        }
    );
}


var p = readFile('file.txt', 'utf8');

//promises 

p.then(
    (val) => {

    },
    (err) => {

    }

).then(
    (val) => {

    },
    (err) => {
        
    }

).then(
    (val) => {

    },
    (err) => {
        
    }

).then(
    null,
    (err) => {
        
    }

);
    


