var net = require('net');
var fastcgi = require('fastcgi-stream');
var server = net.createServer();
server.listen(3000);
server.on('connection', function (sock) {
    console.log('connection');
    var fcgiStream = new fastcgi.FastCGIStream(sock);

    fcgiStream.on('record', function(requestId, record) {

        console.log(record.TYPE)
        if(record.TYPE == fastcgi.records.StdIn.TYPE) {
            console.log(sock)
        }
    });
});

