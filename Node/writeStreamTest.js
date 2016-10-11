var fs = require("fs");
var data = 'The John Write Test!';
//create a writable stream
var writerStream = fs.createWriteStream('test1.txt');

//write the data to stream
//set the encoding to be utf8. 
writerStream.write(data,'UTF8');

//mark the end of file
writerStream.end();

//handle stream events
writerStream.on('finish', function() {
    console.log("Write completed.");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});
console.log("Program Ended");
