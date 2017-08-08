# A FastCGI Process Manager for NodeJS

## How to install

```
npm install js-fpm
```

## How to use

This package support the fastcgi mode, so you may config a nginx serve to access fastcgi mode to this.

nginx configuration(in server)

```
	location / {
		root html;
		index index.html index.htm;
		try_files $uri $uri/ @node;
	}

	location @node {
		fastcgi_pass 127.0.0.1:3000;
		fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
		include        fastcgi_params;
	}
```

next to start:

```
var fpm = require("js-fpm")
fpm.run();
```

so, you may write so script in main.js.

## Feature

fastcgi mode to serve the script(main.js)

session and cookie

file upload

etc...

## Configuration

```
var fpm = require("js-fpm")
var options = {
    "mode" : "fastcgi", // or "http"
    "port" : "3000", // or "80"
    "ip" : "localhost", // or IP
    "main" : require("path").resolve("./main.js")
}
fpm.run(options);
```

### options.mode
fastcgi or http
fastcgi support the fastcgi protocol.
http support the standard http protocol

### options.port options.ip 
port and ip

### options.main
the execute file path

