function e(e, t) {
    for (var n = Object.create(null), r = e.split(","), o = 0; o < r.length; o++) n[r[o]] = !0;
    return t ? function(e) {
        return n[e.toLowerCase()];
    } : function(e) {
        return n[e];
    };
}

function t(e, n, o) {
    for (var i in n) o && (r(n[i]) || Array.isArray(n[i])) ? (r(n[i]) && !r(e[i]) && (e[i] = {}), 
    Array.isArray(n[i]) && !Array.isArray(e[i]) && (e[i] = []), t(e[i], n[i], o)) : void 0 !== n[i] && (e[i] = n[i], 
    0 == Object.keys(n).reverse().indexOf(i) && (Object.getOwnPropertyDescriptor(n, i).configurable || (e = Object.freeze(e))));
    return e;
}

function n(e) {
    return null !== e && "object" === (void 0 === e ? "undefined" : u(e));
}

function r(e) {
    return f.call(e) === c;
}

function o(e, t) {
    var r = n(e), o = n(t);
    return r && o ? JSON.stringify(e) === JSON.stringify(t) : !r && !o && String(e) === String(t);
}

function i(e) {
    return "function" == typeof e && /native code/.test(e.toString());
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.nextTick = exports.identity = exports.no = exports.isBuiltInTag = void 0;

var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports._toString = function(e) {
    return null == e ? "" : "object" === (void 0 === e ? "undefined" : u(e)) ? JSON.stringify(e, null, 2) : String(e);
}, exports.toNumber = function(e) {
    var t = parseFloat(e);
    return isNaN(t) ? e : t;
}, exports.makeMap = e, exports.remove = function(e, t) {
    if (e.length) {
        var n = e.indexOf(t);
        if (n > -1) return e.splice(n, 1);
    }
}, exports.hasOwn = function(e, t) {
    return a.call(e, t);
}, exports.isPrimitive = function(e) {
    return "string" == typeof e || "number" == typeof e;
}, exports.bind = function(e, t) {
    function n(n) {
        var r = arguments.length;
        return r ? r > 1 ? e.apply(t, arguments) : e.call(t, n) : e.call(t);
    }
    return !!e && (n._length = e.length, n);
}, exports.toArray = function(e, t) {
    t = t || 0;
    for (var n = e.length - t, r = new Array(n); n--; ) r[n] = e[n + t];
    return r;
}, exports.extend = t, exports.isObject = n, exports.isNotEmptyObject = function(e) {
    return null !== e && "object" === (void 0 === e ? "undefined" : u(e)) && 0 !== Object.keys(e).length;
}, exports.isUndef = function(e) {
    return void 0 === e || null === e;
}, exports.isUndefined = function(e) {
    return void 0 === e;
}, exports.isDef = function(e) {
    return void 0 !== e && null !== e;
}, exports.isTrue = function(e) {
    return !0 === e;
}, exports.isFalse = function(e) {
    return !1 === e;
}, exports.isPlainObject = r, exports.isValidArrayIndex = function(e) {
    var t = parseFloat(String(e));
    return t >= 0 && Math.floor(t) === t && isFinite(e);
}, exports.toObject = function(e) {
    for (var n = {}, r = 0; r < e.length; r++) e[r] && t(n, e[r]);
    return n;
}, exports.noop = function() {}, exports.genStaticKeys = function(e) {
    return e.reduce(function(e, t) {
        return e.concat(t.staticKeys || []);
    }, []).join(",");
}, exports.looseEqual = o, exports.looseIndexOf = function(e, t) {
    for (var n = 0; n < e.length; n++) if (o(e[n], t)) return n;
    return -1;
}, exports.once = function(e) {
    var t = !1;
    return function() {
        t || (t = !0, e());
    };
}, exports.isNative = i, exports.proxy = function(e, t, n, r, o) {
    if (!o && void 0 !== t[n]) throw new Error("实例对象中已经存在" + n + "属性，请确保methods、data、props、store.state、store.action、computed中没有同名key键，且key名不为'data'，其中store.state和store.action只在版本<v1.2.0时有以上要求");
    Object.defineProperty(t, n, {
        configurable: !0,
        enumerable: !0,
        get: function() {
            return r ? e[r][n] : e[n];
        },
        set: function(t) {
            r ? e[r][n] = t : e[n] = t;
        }
    });
}, exports.throttle = function(e, t, n) {
    var r = void 0, o = new Date();
    return function() {
        for (var i = arguments.length, u = Array(i), s = 0; s < i; s++) u[s] = arguments[s];
        var a = this, f = new Date();
        clearTimeout(r), f - o >= n ? (e.apply(a, u), o = f) : r = setTimeout(function() {
            e.apply(a, u);
        }, t);
    };
}, exports.parseQueryString = function(e) {
    var t = /([^&=]+)=([\w\W]*?)(&|$|#)/g, n = /^[^?]+\?([\w\W]+)$/.exec(e), r = {};
    if (n && n[1]) for (var o = n[1], i = void 0; null != (i = t.exec(o)); ) r[i[1]] = i[2];
    return r;
}, exports.addUrlParam = function(e, t) {
    var n = e.split("#"), r = n[1];
    e = n[0];
    for (var o in t) {
        var i = new RegExp("([?&])" + o + "=[^&]*(&|$)", "i");
        i.test(e) ? e = e.replace(i, "$1" + o + "=" + t[o] + "$2") : e += (e.indexOf("?") > -1 ? "&" : "?") + o + "=" + t[o];
    }
    return r && (e = e + "#" + r), e;
};

var s = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../libs/promise.min")), a = (exports.isBuiltInTag = e("slot,component", !0), 
Object.prototype.hasOwnProperty), f = Object.prototype.toString, c = "[object Object]";

exports.no = function() {
    return !1;
}, exports.identity = function(e) {
    return e;
}, exports.nextTick = function() {
    function e() {
        n = !1;
        var e = t.slice(0);
        t.length = 0;
        for (var r = 0; r < e.length; r++) e[r]();
    }
    var t = [], n = !1, r = void 0;
    if ("undefined" != typeof setImmediate && i(setImmediate)) r = function() {
        setImmediate(e);
    }; else if ("undefined" == typeof MessageChannel || !i(MessageChannel) && "[object MessageChannelConstructor]" !== MessageChannel.toString()) if (void 0 !== s.default && i(s.default)) {
        var o = s.default.resolve();
        r = function() {
            o.then(e);
        };
    } else r = function() {
        setTimeout(e, 0);
    }; else {
        var u = new MessageChannel(), a = u.port2;
        u.port1.onmessage = e, r = function() {
            a.postMessage(1);
        };
    }
    return function(e, o) {
        var i = void 0;
        if (t.push(function() {
            if (e) try {
                e.call(o);
            } catch (e) {
                console.error(e, o, "nextTick");
            } else i && i(o);
        }), n || (n = !0, r()), !e && void 0 !== s.default) return new s.default(function(e, t) {
            i = e;
        });
    };
}();