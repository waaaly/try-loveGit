function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function o(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.JDComponent = void 0;

var r = function() {
    function t(t, e) {
        for (var o = 0; o < e.length; o++) {
            var r = e[o];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, o, r) {
        return o && t(e.prototype, o), r && t(e, r), e;
    };
}(), n = function t(e, o, r) {
    null === e && (e = Function.prototype);
    var n = Object.getOwnPropertyDescriptor(e, o);
    if (void 0 === n) {
        var i = Object.getPrototypeOf(e);
        return null === i ? void 0 : t(i, o, r);
    }
    if ("value" in n) return n.value;
    var a = n.get;
    if (void 0 !== a) return a.call(r);
}, i = require("./base.js"), a = function(a) {
    function c() {
        var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        t(this, c);
        var r = e(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
        return r.object = o, r.attachMethods(), r.attachActions(), r.mergeModel(), r.lifeCircle(), 
        Component(o), r;
    }
    return o(c, i.Base), r(c, [ {
        key: "lifeCircle",
        value: function() {
            var t = this, e = this, o = [ "created", "attached", "ready", "moved", "detached" ], r = !0, n = !1, i = void 0;
            try {
                for (var a, c = o[Symbol.iterator](); !(r = (a = c.next()).done); r = !0) !function() {
                    var o = a.value, r = t.object[o];
                    t.object[o] = function() {
                        for (var t = arguments.length, n = Array(t), i = 0; i < t; i++) n[i] = arguments[i];
                        e[o] && (n = e[o].apply(this, n) || n), r && r.apply(this, n);
                    };
                }();
            } catch (t) {
                n = !0, i = t;
            } finally {
                try {
                    !r && c.return && c.return();
                } finally {
                    if (n) throw i;
                }
            }
        }
    }, {
        key: "mergeModel",
        value: function() {
            if (this.object.hasOwnProperty("model")) {
                var t = this.object.model();
                for (var e in t) void 0 === this.object.data[e] && (this.object.data[e] = t[e]);
            }
        }
    }, {
        key: "created",
        value: function() {
            var t = n(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "plugins", this).call(this);
            for (var e in t) {
                if (this[e]) throw new Error("Prop " + e + " is already exists");
                this[e] = t[e];
            }
        }
    }, {
        key: "attachMethods",
        value: function() {
            this.object.methods || (this.object.methods = {});
            var t = n(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "methods", this).call(this);
            for (var e in t) {
                if (this.object.methods[e]) throw new Error("Method " + e + " is already exists");
                this.object.methods[e] = t[e];
            }
        }
    }, {
        key: "attachActions",
        value: function() {
            if (this.object.hasOwnProperty("actions")) {
                var t = this.object.actions;
                for (var e in t) {
                    if (this.object.methods[e]) throw new Error("Method " + e + " is already exists");
                    this.object.methods[e] = t[e];
                }
            }
        }
    } ]), c;
}();

exports.JDComponent = a;