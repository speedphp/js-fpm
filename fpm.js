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
    fcgi.createServer(function (request, response) {
        if (request.method === 'GET') {
            fs.readFile("./main.js", function(err, data){
                var cookie = require("./lib/cookie.js")
                cookie.load(response, request.headers.cookie || '')
                var session = require("./lib/session.js")
                session.load(request, cookie)
                eval(data.toString())
                response.end();
            });
        } else {
            response.writeHead(501);
            response.end();
        }
    }).listen(3000);
}


