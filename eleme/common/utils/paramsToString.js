module.exports = function(e) {
    var n = [];
    return Object.keys(e).forEach(function(o) {
        var t = e[o];
        t && n.push(encodeURIComponent(o) + "=" + encodeURIComponent(t));
    }), n.join("&");
};