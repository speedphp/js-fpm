const fs = require('fs');
var http=require('http');  
var server=new http.Server(); 

var d = function(){
    this.response = []
}

d.prototype.write = function(str){
    this.response.push(str)
}

server.on('request',function(req, res){  
    res.writeHead(200,{'Content-Type':'text/html'});  
    console.log(req.url);
    
    var uri = req.url == "/" ? "/index.jhtml" : req.url;
    
    fs.readFile('.'+uri, (err, data) => {
        if (err){
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 error! File not found.");
        }else{
        
            var da = new d
            
            var tpl = data.toString();
            
            var start_tag = new RegExp("<\\?js","igm");
            var end_tag = new RegExp("\\?>","igm");
            
            //var cookie = require("./lib/in.js");
            
            //cookie.set("hello", "world");
            
            //console.log(cookie.get("hello"))
            
            tpl = tpl.replace(start_tag, "`);");
            tpl = tpl.replace(end_tag, "da.write(`");
            
            var runcode = "da.write(`" + tpl + "`);";
            
            console.log(runcode);
            eval(runcode) 
            res.end(da.response.join("\n"));  
        }
    });
});  

server.listen(process.env.PORT);  
console.log('HTTP SERVER is LISTENING AT PORT '+argv.port);  

