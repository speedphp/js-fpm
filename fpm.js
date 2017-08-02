const fs = require('fs');
var http=require('http');
var server=new http.Server();

server.on('request',function(req, res){
    res.writeHead(200,{'Content-Type':'text/html'});
    console.log(req.url);
    (function(res){
        fs.readFile("./main.js", function(err, data){
            eval(data)
            res.end();
        });
    })(res);

}).listen(3000);



