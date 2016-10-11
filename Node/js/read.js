//read a file (async) that is a list of words
//split the string by line into an array
//sort the words alphabetically
//write the sorted words to another file (async)
var fs = require('fs');


//var data = '';

fs.readFile('words.txt', 'utf8', function (err, contents) {
    
    if (err) {
        console.log(err);
        return;
    }
    console.log(contents);

     //read file into array  
    var array = contents.toString().split("\n"); 

    //sort the array    
    array.sort();    
    for(i in array) {        
        console.log(array[i]);    
    }  

    //write to a file    
    fs.writeFile("./outfile2.txt", array, function(error){        
         console.log("written file");    
    });
    

})
    

console.log('after calling');

/*

var fs = require('fs');

var crlf = "\r\n";

console.log("Starting Program");

fs.readFile('data.txt', 'utf-8', function(err, contents) {    
    if (err)    {        
        console.log("There was an error reading the file: " + err);    
    }    
    else    {        
        var arr = contents.split(crlf);        
        arr.sort(function(a, b) {            
            if (typeof(a) === 'string' && typeof(b) === 'string')            {               
                 a = a.toLowerCase();                
                 b = b.toLowerCase();           
                 }            
                 
                 if (a > b)            {               
                      return 1;            }            
                else if (a < b)            {                
                    return -1;            }            
                    else            {                
                        return 0;            }        });                
                 
fs.writeFile('out.txt', arr.join(crlf), function(err) {            
    if (err)            {                
        console.log("There was an error writing the file: " + err);            
    }        
});    

}});

*/

/*
var fs = require('fs');

fs.readFile('files.txt','utf8', function(err, contents) {      
    if (err) {        
        console.log(err);        
        return;    
    }    
    
    //read file into array    
    var array = contents.toString().split("\n");    
    
    //sort the array    
    array.sort();    
    for(i in array) {        
        console.log(array[i]);    
    }      
    //write to a file    
    fs.writeFile("./outfile.txt", array, function(error){        
         console.log("written file");    
    });
});
*/


/*
//Using Promises

var fs = require('fs');
var os = require('os');

function readFile(name, encoding) {    
    return new Promise(        
        (resolve, reject) => {            
            fs.readFile(name, encoding, function (err, contents) {                
                if (err) {                    
                    reject(err);                    
                    return;                
                }                
                
                resolve(contents);            
            });        
        }    
        );
}
        
function writeFile(name, contents){    
    return new Promise(        
        (resolve, reject) => {            
            fs.writeFile(name, contents, function (err) {                
                if (err){                    
                    reject(err);                    
                    return;                
                }               
                
                resolve('success');            
            });        
        }    
    )}
        
var p = readFile('file.txt', 'utf8');

p.then(    
    (val) => {        
        var array = val.split("\n");        
        array.sort();        
        var success = writeFile('out.txt', array.join(os.EOL));        
        return success;    
    }
).then(    
    (val) => {        
        console.log(val);              
    }
).catch(    
    (err) => {        
        console.log(err);        
        // handle all possible problems    
    }
);


*/