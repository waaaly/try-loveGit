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
}), exports.Cache = void 0;

var n = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var n = r[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(r, t, n) {
        return t && e(r.prototype, t), n && e(r, n), r;
    };
}(), o = require("./plugin.js"), u = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}(require("../../localStorage.js")), i = function(i) {
    function a() {
        return e(this, a), r(this, (a.__proto__ || Object.getPrototypeOf(a)).apply(this, arguments));
    }
    return t(a, o.Plugin), n(a, null, [ {
        key: "request",
        value: function(e, r) {
            if (!e.expire) return r();
            u.get("Request_" + e.url).then(function(t) {
                var n = t.body, o = t.header;
                return e.cached = !0, e.code = 200, e.rawBody = JSON.stringify(n), e.body = n, e.resHeader = o, 
                r();
            }, function(e) {
                return r();
            });
        }
    }, {
        key: "response",
        value: function(e, r) {
            return e.error ? r() : e.expire ? (e.handler.clearCache = function() {
                u.remove("Request_" + e.url);
            }, r(), void (e.cached || u.set("Request_" + e.url, {
                body: e.body,
                header: e.resHeader
            }, {
                expire: e.expire
            }))) : r();
        }
    } ]), a;
}();

exports.Cache = i;