function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function r(e, r) {
    e.__proto__ = r;
}

function t(e, r, t) {
    for (var n = 0, a = t.length; n < a; n++) {
        var i = t[n];
        (0, l.def)(e, i, r[i]);
    }
}

function n(e, r, t) {
    if ((0, c.isObject)(e)) {
        var n = void 0;
        return (0, c.hasOwn)(e, "__ob__") && e.__ob__ instanceof d ? n = e.__ob__ : p.shouldConvert && (Array.isArray(e) || (0, 
        c.isPlainObject)(e)) && Object.isExtensible(e) && !e._isWqVue && (n = new d(e, r, t)), 
        n;
    }
}

function a(e, r, t, a, o) {
    var u = new s.Dep(a, r), l = Object.getOwnPropertyDescriptor(e, r);
    if (!l || !1 !== l.configurable) {
        var c = l && l.get, f = l && l.set, p = u.getKeyChain(), d = n(t, p, o);
        Object.defineProperty(e, r, {
            enumerable: !0,
            configurable: !0,
            get: function() {
                var r = c ? c.call(e) : t;
                return s.Dep.target && (u.depend(), d && (d.dep.depend(), Array.isArray(r) && i(r))), 
                r;
            },
            set: function(r) {
                var a = c ? c.call(e) : t;
                r === a || r !== r && a !== a || (f ? f.call(e, r) : t = r, d = n(r, p, o), u.notify(o, t));
            }
        });
    }
}

function i(e) {
    for (var r, t = 0, n = e.length; t < n; t++) (r = e[t]) && r.__ob__ && r.__ob__.dep.depend(), 
    Array.isArray(r) && i(r);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Observer = exports.observerState = void 0;

var o = function() {
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
}();

exports.observe = n, exports.defineReactive = a, exports.set = function(e, r, t, n) {
    if (Array.isArray(e) && (0, c.isValidArrayIndex)(r)) return e.length = Math.max(e.length, r), 
    e.splice(r, 1, t), t;
    if ((0, c.hasOwn)(e, r)) return e[r] = t, t;
    var i = e.__ob__;
    return e._isWqVue ? (console.warn("Avoid adding reactive properties to a WqVue instance or its root $data at runtime - declare it upfront in the data option."), 
    t) : i ? (a(i.value, r, t, i.keyChain, n), i.dep.key || (i.dep.key = r), i.dep.notify(n, t), 
    t) : (e[r] = t, t);
}, exports.del = function(e, r, t) {
    if (Array.isArray(e) && (0, c.isValidArrayIndex)(r)) e.splice(r, 1); else {
        var n = e.__ob__;
        e._isWqVue ? console.warn("Avoid deleting properties on a Vue instance or its root $data - just set it to null.") : (0, 
        c.hasOwn)(e, r) && (delete e[r], n && (delete e[r], n.dep.notify(t, e)));
    }
};

var s = require("./dep"), u = require("./array"), l = require("../util/lang"), c = require("../util/index"), f = Object.getOwnPropertyNames(u.arrayMethods), p = exports.observerState = {
    shouldConvert: !0
}, d = exports.Observer = function() {
    function i(n, a, o) {
        e(this, i), this.value = n, this.dep = new s.Dep(a), this.keyChain = a, this.pageObj = o, 
        (0, l.def)(n, "__ob__", this), Array.isArray(n) ? ((c.hasProto && c.canConfigArrayPrototype ? r : t)(n, u.arrayMethods, f), 
        this.observeArray(n)) : this.walk(n);
    }
    return o(i, [ {
        key: "walk",
        value: function(e) {
            for (var r = Object.keys(e), t = 0; t < r.length; t++) a(e, r[t], e[r[t]], this.keyChain, this.pageObj);
        }
    }, {
        key: "observeArray",
        value: function(e) {
            for (var r = 0, t = e.length; r < t; r++) n(e[r], this.keyChain + "[" + r + "]", this.pageObj);
        }
    } ]), i;
}();