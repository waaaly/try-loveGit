function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.InjectRequest = void 0;

var t = function() {
    function e(e, t) {
        var r = [], n = !0, o = !1, a = void 0;
        try {
            for (var i, u = e[Symbol.iterator](); !(n = (i = u.next()).done) && (r.push(i.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            o = !0, a = e;
        } finally {
            try {
                !n && u.return && u.return();
            } finally {
                if (o) throw a;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), r = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), n = require("../../../common/request/request.js"), o = require("../../../common/traceid.js"), a = {
    get: n.request.get,
    post: n.request.post,
    put: n.request.put,
    del: n.request.del
}, i = Symbol("bizId"), u = Symbol("operateId"), l = Symbol("emptyFn"), c = Symbol("injectFn"), s = Symbol("getOptions"), f = function() {
    function n() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        if (e(this, n), !t || !r) throw Error("params bizId and operateId cannot be empty");
        this[i] = t, this[u] = r;
    }
    return r(n, [ {
        key: s,
        value: function(e) {
            var t = n.getCurrentPage();
            return t ? (t._traiceId || (t._traiceId = (0, o.genTraceId)({
                bizId: this[i],
                operateId: this[u]
            })), t._traiceId && Object.assign(e.data, {
                traceid: t._traiceId
            }), e) : e;
        }
    }, {
        key: c,
        value: function() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "get", r = arguments.length, n = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) n[o - 1] = arguments[o];
            var i = n.pop(), u = t(i, 1)[0], c = u.url, f = void 0 === c ? "" : c, d = u.data, y = void 0 === d ? {} : d, v = u.cb, p = void 0 === v ? this[l] : v, h = this[s]({
                url: f,
                data: y
            }), g = a[e];
            if (!g) throw Error("not found function：", e);
            return g(h.url, h.data, p);
        }
    }, {
        key: "get",
        value: function() {
            for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
            return this[c]("get", t);
        }
    }, {
        key: "post",
        value: function() {
            for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
            return this[c]("post", t);
        }
    }, {
        key: "put",
        value: function() {
            for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
            return this[c]("put", t);
        }
    }, {
        key: "del",
        value: function() {
            for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
            return this[c]("del", t);
        }
    } ], [ {
        key: "getCurrentPage",
        value: function() {
            return getCurrentPages().pop();
        }
    } ]), n;
}();

exports.InjectRequest = f;