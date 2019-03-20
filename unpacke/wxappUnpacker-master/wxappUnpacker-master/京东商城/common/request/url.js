function t() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = r.exec(t);
    if (e) return {
        source: e[0],
        protocol: e[1],
        slash: e[2],
        host: e[3],
        port: e[4],
        path: e[5],
        query: e[6],
        hash: e[7]
    };
}

function e() {
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/^(http(s)?:)?\/\//i, "/");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/, o = [ "wxa.jd.com" ];

exports.parse = t, exports.toSocketURI = e, exports.toProxyURI = function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", n = arguments[1], s = t(r);
    if (!s) return r;
    if (-1 != o.findIndex(function(t) {
        return t == s.host;
    })) return r;
    var u = e(r);
    return "GBK" == n ? "https://wxa.jd.com/g2u" + u : "https://wxa.jd.com" + u;
};