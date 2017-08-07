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

next to start by cmd:

```
node fpm.js
```

so, you may write so script in main.js.

## Feature

fastcgi mode to serve the script(main.js)

session and cookie

file upload

etc