var write_body = [];
var write_header = {};
var write_status = 200;
var response;
var is_end = false;

exports.load = load;
exports.write = write;
exports.writeHead = writeHead;
exports.setHeader = setHeader;
exports.redirect = redirect;
exports.end = end;

function load(in_response) {
    response = in_response;
}

function write(data) {
    write_body.push(data)
}

function setHeader(key, value) {
    write_header[key] = value;
}

function writeHead(status, headers) {
    for (var key in headers) {
        setHeader(key, headers[key])
    }
    write_status = status;
}

function redirect(url) {
    response.writeHead(301, {"Location": url});
    write_body = [];
    write_header = {};
    response.end();
    is_end = true;
}

function end() {
    if (!is_end) {
        response.writeHead(write_status, write_header);
        for (var body in write_body) {
            response.write(write_body[body])
        }
        write_body = [];
        write_header = {};
        response.end();
    }
}