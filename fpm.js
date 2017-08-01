const fs = require('fs');
var http=require('http');  
var server=new http.Server();
var mime = require('mime-types')
var path = require("path");
var d = function(){
    this.response = []
}

d.prototype.write = function(str){
    this.response.push(str)
}
d.prototype.join = function (pattern) {
    return this.response.join(pattern)
}
function include(path){
    var file = fs.realpathSync(path);
    return fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
}

server.on('request',function(req, res){  
    res.writeHead(200,{'Content-Type':'text/html'});  
    console.log(req.url);
    
    var uri = req.url == "/" ? "/index.jhtml" : req.url;
    
    fs.readFile('.'+uri, function(err, data) {
        if (err){
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 error! File not found.");
        }else{
            var file = fs.realpathSync('.'+uri);
            if(".jhtml" != path.extname(file)){
                var type = mime.lookup(file) || 'application/octet-stream';
                res.writeHead(200, { "Content-Type": type });
                var readStream = fs.createReadStream(file);
                readStream.pipe(res);
            }else{
                var da = new d
                var tpl = data.toString();
                var start_tag = new RegExp("<\\?js","igm");
                var end_tag = new RegExp("\\?>","igm");
                // var invalue = require("./lib/in.js");
                // invalue.setValue("hello", "world");
                // console.log(invalue.getValue("hello"))
                tpl = tpl.replace(start_tag, "`);");
                tpl = tpl.replace(end_tag, "da.write(`");
                eval("da.write(`" + tpl + "`);")
                res.end(da.join("\n"));
            }
        }
    });
}).listen(3000);

