var net = require('net');
var client = net.connect({port: 8080}, function() {
   console.log('John Melka client connected to server!');  
});
client.on('data', function(data) {
   console.log(data.toString());
   client.end();
});
client.on('end', function() { 
   console.log('John Melka client disconnected from server');
});