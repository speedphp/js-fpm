var cookie = require('cookie');

var cookies = {};
var response;

exports.load = load;
exports.set = set;
exports.get = get;
exports.remove = remove;

function load(in_response, in_cookies) {
    response = in_response;
    cookies = cookie.parse(in_cookies || '');
}

function set(key, value, options) {
    response.setHeader('Set-Cookie', cookie.serialize(key, String(value), options));
}

function get(key) {
    return cookies[key]
}

function remove(key) {
    set(key, '', {
        maxAge: 0,
        expire: 'Thu, 01-Jan-1970 00:00:01 GMT'
    })
}