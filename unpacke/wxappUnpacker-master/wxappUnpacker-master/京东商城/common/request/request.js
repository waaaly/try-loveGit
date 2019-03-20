function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
    if (!/^https:\/\//.test(t.url)) {
        var r = /^(http:)?\/\//;
        if (!r.test(t.url)) throw new Error("Invalid Url: " + t.url);
        t.url = t.url.replace(r, "https://");
    }
    return new u.default(function(r, o) {
        (0, s.default)(t, function(t, n) {
            return t ? (e && e(t), o(t)) : (e && e(null, n), r(n));
        });
    });
}

function r(t, e, r) {
    "function" == typeof e && (r = e);
    var o = {};
    return "object" === (void 0 === e ? "undefined" : n(e)) ? Object.assign(o, {
        data: e
    }, {
        url: t
    }) : "string" == typeof t ? Object.assign(o, {
        url: t
    }) : Object.assign(o, t), {
        options: o,
        cb: r
    };
}

function o() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "GET";
    return function(o, n, u) {
        var s = r(o, n, u), p = s.options, i = s.cb;
        return p.method = t, e(p, i);
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.del = exports.put = exports.post = exports.get = exports.request = void 0;

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, u = t(require("../../libs/promise.min.js")), s = t(require("./process.js"));

e.get = o("GET"), e.post = o("POST"), e.put = o("PUT"), e.del = o("DELETE"), exports.request = e;

exports.get = o("GET"), exports.post = o("POST"), exports.put = o("PUT"), exports.del = o("DELETE");