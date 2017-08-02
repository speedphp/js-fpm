var fcgi = require('node-fastcgi');
const child_process = require('child_process');
const fs = require('fs');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {

    fcgi.createServer(function (req, res) {
        if (req.method === 'GET') {
            fs.readFile("./main.js", function(err, data){
                eval(data.toString())
                res.end();
            });

        } else {
            res.writeHead(501);
            res.end();
        }
    }).listen(3000);
}


