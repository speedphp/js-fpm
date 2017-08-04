var fcgi = require('node-fastcgi');
var logger = require('tracer').console({
    format : "[{{title}}] {{timestamp}} {{file}}:{{line}} ({{method}}) {{message}}",
    dateformat : "yyyy-mm-dd HH:MM:ss",
    preprocess :  function(data){
        data.title = data.title.toUpperCase();
    }
});

fcgi.createServer(function (req, res) {
    if (req.method !== 'GET' && req.method !== 'POST') {
        res.writeHead(501);
        res.end();
    } else {
        var response = require("./lib/response.js");
        var autoInject = require("async/autoInject");
        response.load(res);
        autoInject({
            cookie: function (callback) {
                var cookie = require("./lib/cookie.js")
                cookie.load(response, req.headers.cookie || '')
                callback(null, cookie);
            },
            session: function (cookie, callback) {
                var session = require("./lib/session.js")
                session.load(req, cookie)
                callback(null, session)
            },
            get_query: function (callback) {
                var query = require('url').parse(req.url, true).query;
                callback(null, query)
            },
            formdata: function (callback) {
                if (req.method === 'POST') {
                    var formidable = require('formidable');
                    var form = new formidable.IncomingForm();
                    form.parse(req, function (err, fields, files) {
                        callback(err, fields, files)
                    });
                } else {
                    callback(null, {})
                }
            }
        }, function (err, results) {
            require('fs').readFile("./main.js", function (err, data) {
                $cookie = results["cookie"]
                $session = results["session"]
                $get = results["get_query"]
                $post = results["formdata"][0]
                $files = results["formdata"][1]
                eval(data.toString())
                response.end();
            });
        });
    }
}).listen(3000);
logger.info("Server start at 3000")


