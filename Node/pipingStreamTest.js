var fs = require("fs");

//create a readable stream
var readerStream = fs.createReadStream('test.txt');

//create a writable stream
var writerStream = fs.createWriteStream('test2.txt');

//pipe the read and write operations
//read test.txt and write data to test2.txt
readerStream.pipe(writerStream);

console.log("Program Ended");