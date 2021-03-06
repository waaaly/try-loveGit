function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function r(e, r) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !r || "object" != typeof r && "function" != typeof r ? e : r;
}

function t(e, r) {
    if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function, not " + typeof r);
    e.prototype = Object.create(r && r.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.SetCookie = void 0;

var o = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(r, t, o) {
        return t && e(r.prototype, t), o && e(r, o), r;
    };
}(), n = require("./plugin.js"), i = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}(require("../../cookie-v2/cookie.js")), u = [], a = function(a) {
    function f() {
        return e(this, f), r(this, (f.__proto__ || Object.getPrototypeOf(f)).apply(this, arguments));
    }
    return t(f, n.Plugin), o(f, null, [ {
        key: "response",
        value: function(e, r) {
            if (r(), e.resHeader) {
                var t = e.resHeader["set-cookie"] || e.resHeader["Set-Cookie"] || [];
                if ("string" == typeof t && (t = t.split(/,\s?/)), !Array.isArray(t)) return;
                t.map(function(e) {
                    return e.trim();
                });
                var o = t.filter(function(e) {
                    for (var r = 0, t = u.length; r < t; r++) if (~e.indexOf(u[r])) return !0;
                    return !1;
                });
                e.resHeader["set-cookie"] = o;
            }
            i.setCookieInHeader({
                header: e.resHeader
            });
        }
    } ]), f;
}();

exports.SetCookie = a;