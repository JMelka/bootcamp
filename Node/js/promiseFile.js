var fs = require('fs');

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
         });
        }
        
var p = readFile('file.txt', 'utf8');

p.then(    
    (val) => {        
        return 3;    
}).then(    
    (val) => {        
        console.log(val);  // 3        
        return 5;    
}).then(    
    (val) => {        
        console.log(val);  // 5  
}).then(    
    (val) => {        
        console.log(val);   
}).catch(    
    (err) => {       
         console.log(err); // handle all possible problems    
});


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

var p1 = writeFile("./outfile4.txt", '1, 2, 3, 4, 5');

p1.then(    
    (val) => {        
        return 3;    
}).then(    
    (val) => {        
        console.log(val);  // 3        
        return 5;    
}).then(    
    (val) => {        
        console.log(val);  // 5  
}).then(    
    (val) => {        
        console.log(val);   
}).catch(    
    (err) => {       
         console.log(err); // handle all possible problems    
});

exports.readFile = readFile;
exports.writeFile = writeFile;

/*
var fs = require('fs');var os = require('os');console.log("Starting Program");function readFile(fileName, encoding){    return new Promise(function(resolve, reject) {        fs.readFile(fileName, encoding, function(err, contents) {            if (err) reject(err);            else resolve(contents);        });    });}function writeFile(fileName, contents) {    return new Promise(function(resolve, reject) {        fs.writeFile(fileName, contents, function(err) {            if (err) reject(err);            else resolve();        });    });};var p = readFile("data.txt", "utf-8").then(function(contents) {    var arr = contents.split(os.EOL);        arr.sort(function(a, b) {        if (typeof(a) === 'string' && typeof(b) === 'string')        {            a = a.toLowerCase();            b = b.toLowerCase();        }        if (a > b)        {            return 1;        }        else if (a < b)        {            return -1;        }        else        {            return 0;        }    });        return writeFile('out.txt', arr.join(os.EOL));}, function(err) {    console.log("There was an error reading the file: " + err);}).then(function() {    // No action necessary}, function(err) {    console.log("There was an error writing the file: " + err);});console.log("Ending Program");
*/
        