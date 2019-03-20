function e(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function r() {
    if (0 != l.length) {
        var e = !0, t = !1, i = void 0;
        try {
            e: for (var u, s = l[Symbol.iterator](); !(e = (u = s.next()).done); e = !0) {
                var f = function() {
                    var e = u.value, t = e.page;
                    if (!(0, o.isNotEmptyObject)(e.val)) return "break";
                    var a = (0, o.extend)({}, e.val, !0), i = t.__wxExparserNodeId__, s = t.__wxWebviewId__;
                    t.setData(e.val, function() {
                        n(t);
                    });
                    var f = !0;
                    return i == l[0].page.__wxExparserNodeId__ && s == l[0].page.__wxWebviewId__ && ((f = (0, 
                    o.looseEqual)(a, l[0].val)) || Object.keys(a).forEach(function(e) {
                        delete l[0].val[e];
                    })), f && l.shift(), r(), {
                        v: void 0
                    };
                }();
                switch (f) {
                  case "break":
                    break e;

                  default:
                    if ("object" === (void 0 === f ? "undefined" : a(f))) return f.v;
                }
            }
        } catch (e) {
            t = !0, i = e;
        } finally {
            try {
                !e && s.return && s.return();
            } finally {
                if (t) throw i;
            }
        }
    }
}

function n(e) {
    var t = e.$nextTickFn || [];
    t.length && (t.forEach(function(t) {
        t.promise ? t() : t.call(e);
    }), e.$nextTickFn = []);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, i = function() {
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
}();

exports.pushTarget = function(e) {
    s.target && f.push(s.target), s.target = e;
}, exports.popTarget = function() {
    s.target = f.pop();
};

var o = require("../util/util"), u = 0, l = [], s = function() {
    function n(e, r) {
        t(this, n), this.keyChain = e, this.key = r, this.id = u++, this.subs = [];
    }
    return i(n, [ {
        key: "addSub",
        value: function(e) {
            this.subs.push(e);
        }
    }, {
        key: "removeSub",
        value: function(e) {
            (0, o.remove)(this.subs, e);
        }
    }, {
        key: "depend",
        value: function() {
            n.target && n.target.addDep(this);
        }
    }, {
        key: "notify",
        value: function(t, n) {
            for (var a = this.subs.slice(), i = 0, u = a.length; i < u; i++) a[i].update();
            var s = l.filter(function(e) {
                return e.page.__wxExparserNodeId__ ? e.page.__wxExparserNodeId__ == t.__wxExparserNodeId__ : e.page.__wxWebviewId__ == t.__wxWebviewId__;
            });
            if (s.length) s[0] && (s[0].val[this.getKeyChain()] = n); else {
                var f = {
                    page: t,
                    val: e({}, this.getKeyChain(), n)
                };
                l.push(f);
            }
            (0, o.throttle)(r, 20, 50)();
        }
    }, {
        key: "getKeyChain",
        value: function() {
            var e = this.keyChain + "." + this.key;
            return this.keyChain ? this.key ? e : this.keyChain : this.key;
        }
    } ]), n;
}();

exports.default = s, s.target = null;

var f = [];