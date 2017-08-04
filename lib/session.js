const uuidv4 = require('uuid/v4');

var sessions = {}
var request;

exports.load = load;
exports.set = set;
exports.get = get;
exports.destroy = destroy;

function load(in_request, cookie){
    var session_id = cookie.get("PHPSESSID") || '';
    if(typeof session_id != "string" || session_id.length !== 26){
        session_id = uuidv4().replace(/-/g, "").substring(0, 26);
    }
    in_request.session_id = session_id;
    request = in_request;
    if(undefined == sessions[request.session_id]){
        sessions[request.session_id] = {}
    }
    cookie.set("PHPSESSID", session_id);
}

function get(key){
    if(undefined == sessions[request.session_id][key]){
        return "";
    }
    return sessions[request.session_id][key]
}

function set(key, value){
    sessions[request.session_id][key] = value;
}

function destroy(key){
    sessions[request.session_id][key] = null;
}

