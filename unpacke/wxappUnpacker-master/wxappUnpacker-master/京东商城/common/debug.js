function e(e, t) {
    for (var r = ""; t > 0; ) 1 & t && (r += e), t >>= 1, e += e;
    return r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = "~!@#$%^&*-+=|:<>?/".split(""), r = __wxConfig || {}, n = 0;

exports.debug = function(o) {
    var i = e(t[n++ % t.length], 10);
    return function() {
        var e;
        if (r.debug) {
            var t = new Error(), n = new Date(), s = n.toTimeString().split(" ")[0] + " " + n.getMilliseconds();
            console.debug(i + "【" + o + "】[" + s + "]: "), (e = console).debug.apply(e, arguments), 
            console.debug(t.stack.split("\n")[2].replace("    at", ""));
        }
    };
};