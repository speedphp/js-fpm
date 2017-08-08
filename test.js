var fpm = require("js-fpm")
var options = {
    "mode" : "fastcgi", // or "http"
    "port" : "3000", // or "80"
    "ip" : "localhost", // or IP
    "main" : require("path").resolve("./main.js")
}
fpm.run(options);