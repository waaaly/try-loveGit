function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Storage = void 0;

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("./localStorage.js"));

exports.Storage = function() {
    function r() {
        e(this, r);
    }
    return t(r, null, [ {
        key: "putStorageSync",
        value: function(e, t) {
            n.setSync(e, t);
        }
    }, {
        key: "putStorage",
        value: function(e, t) {
            n.set(e, t);
        }
    }, {
        key: "getStorage",
        value: function(e, t) {
            return n.getSync(e) || t;
        }
    } ]), r;
}();