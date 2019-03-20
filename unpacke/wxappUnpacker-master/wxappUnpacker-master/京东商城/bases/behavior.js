function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function r(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.JDBehavior = void 0;

var o = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t;
    };
}(), n = function e(t, r, o) {
    null === t && (t = Function.prototype);
    var n = Object.getOwnPropertyDescriptor(t, r);
    if (void 0 === n) {
        var i = Object.getPrototypeOf(t);
        return null === i ? void 0 : e(i, r, o);
    }
    if ("value" in n) return n.value;
    var a = n.get;
    if (void 0 !== a) return a.call(o);
}, i = require("./base.js"), a = function(a) {
    function c(r) {
        e(this, c);
        var o = t(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
        return o.object = r, o.lifeCircle(), o.attachMethods(), o.behavior = Behavior(r), 
        o;
    }
    return r(c, i.Base), o(c, [ {
        key: "lifeCircle",
        value: function() {
            var e = this, t = this, r = [ "created", "attached", "ready", "moved", "detached" ], o = !0, n = !1, i = void 0;
            try {
                for (var a, c = r[Symbol.iterator](); !(o = (a = c.next()).done); o = !0) !function() {
                    var r = a.value, o = e.object[r];
                    e.object[r] = function() {
                        for (var e = arguments.length, n = Array(e), i = 0; i < e; i++) n[i] = arguments[i];
                        t[r] && (n = t[r].apply(this, n) || n), o && o.apply(this, n);
                    };
                }();
            } catch (e) {
                n = !0, i = e;
            } finally {
                try {
                    !o && c.return && c.return();
                } finally {
                    if (n) throw i;
                }
            }
        }
    }, {
        key: "created",
        value: function() {}
    }, {
        key: "attachMethods",
        value: function() {
            var e = n(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "methods", this).call(this);
            for (var t in e) {
                if ("methods" in this.object) {
                    if (this.object.methods[t]) throw new Error("Method " + t + " is already exists");
                } else this.object.methods = {};
                this.object.methods[t] = e[t];
            }
        }
    } ]), c;
}();

exports.JDBehavior = a;