function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var r = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var i = t[r];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, r, i) {
        return r && e(t.prototype, r), i && e(t, i), t;
    };
}(), i = e(require("./lib/ApiCreater")), u = e(require("./lib/pay")), n = e(require("./lib/user")), a = e(require("./lib/ubt")), o = e(require("./lib/config")), l = e(require("./lib/hashToUrl")), f = e(require("./lib/location")), s = function() {
    function e() {
        t(this, e), this.ApiCreater = i.default, this.User = n.default, this.Pay = u.default, 
        this.HashToUrl = l.default, this.Ubt = a.default, this.Location = f.default;
    }
    return r(e, [ {
        key: "config",
        value: function(e) {
            var t = e.apiHost, r = e.fussHost;
            o.default.apiHost = t, o.default.fussHost = r;
        }
    } ]), e;
}();

module.exports = new s();