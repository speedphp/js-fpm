var kv = [];
exports.setValue = function (key, value) {
    kv[key] = value
}
exports.getValue = function (key) {
    return kv[key]
}

