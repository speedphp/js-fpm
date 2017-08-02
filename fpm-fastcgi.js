var fcgi = require('node-fastcgi');
const cluster = require('cluster');
const child_process = require('child_process');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    fcgi.createServer(function (req, res) {
        if (req.method === 'GET') {
            console.log(req.url)
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            var cmd = child_process.fork('./main.js', [], {silent: true});
            cmd.stdout.on('data', function (data) {
                res.write(data.toString() + "\n");
            });
            cmd.stdout.on('end', function () {
                res.end();
            })
            cmd = null;
        } else {
            res.writeHead(501);
            res.end();
        }
    }).listen(3000);
}

