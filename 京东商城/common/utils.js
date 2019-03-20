function t(e) {
    return e.reduce(function(e, r) {
        var n = [].concat(r).some(Array.isArray);
        return e.concat(n ? t(r) : r);
    }, []);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, r = function() {
    function t(t, e) {
        var r = [], n = !0, o = !1, i = void 0;
        try {
            for (var s, a = t[Symbol.iterator](); !(n = (s = a.next()).done) && (r.push(s.value), 
            !e || r.length !== e); n = !0) ;
        } catch (t) {
            o = !0, i = t;
        } finally {
            try {
                !n && a.return && a.return();
            } finally {
                if (o) throw i;
            }
        }
        return r;
    }
    return function(e, r) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), n = Object.prototype.toString, o = void 0;

exports.getImg = function(t, e) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e;
    if (!t) return "";
    if (0 === t.indexOf("data:image") && -1 != t.indexOf("base64")) return t;
    var n = (t = (t = t.replace(/\s+/g, "")).replace(/^(https?:)?\/\//i, "http://")).match(/(\S*(jpg|jpeg|png|webp|gif))\s*/g);
    if (!n) return t;
    if (t = n[0], /^http/i.test(t) || (t = "http://img10.360buyimg.com/img/" + t), /\.gif/i.test(t)) return t;
    if (!/jfs\//.test(t) || !/(m|img\d{1,2})\.360buyimg\.com/.test(t) || !/\.(jpg|jpeg|png|webp)/.test(t)) return t;
    if (e && (t = t.replace(/(\/)(?:s\d+x\d+_)?(jfs\/)/, "$1s" + e + "x" + r + "_$2")), 
    void 0 === o ? o = getApp().webpSupport : o && /\.(jpg|jpeg|png)/.test(t) && !/\.webp/.test(t) && (t += ".webp"), 
    /\.(jpg|jpeg)/.test(t)) {
        var i = {
            wifi: 80,
            "4g": 60,
            "3g": 40,
            "2g": 20
        }[getApp().networkType];
        i && (t = t.replace(/(\.(jpg|jpeg))(!q\d{1,2})?/, "$1!q" + i));
    }
    var s = [ 10, 11, 12, 13, 14, 20, 30 ], a = (parseInt(t.substr(t.lastIndexOf("/") + 1, 8), 36) || 0) % s.length;
    return t = t.replace(/(\/\/img)\d{1,2}(\.360buyimg\.com)/, "$1" + s[a] + "$2");
}, exports.querystring = function(t) {
    var e = [];
    for (var r in t) void 0 !== t[r] && ("string" == typeof t[r] && (t[r] = t[r].replace(/%/g, "%25"), 
    t[r] = t[r].replace(/&/g, "%26"), t[r] = t[r].replace(/\?/g, "%3F"), t[r] = t[r].replace(/=/g, "%3D")), 
    e.push(r + "=" + t[r]));
    return e.join("&");
}, exports.querystr = function(t, e, o) {
    if ("[object Object]" == n.call(t)) {
        var i = [];
        for (var s in t) if (void 0 !== t[s]) {
            if ("string" == typeof t[s]) {
                var a = o ? s.toLowerCase() : s;
                e && e[s] ? t[a] = t[s] : t[a] = encodeURIComponent(t[s]);
            }
            i.push(s + "=" + t[s]);
        }
        return i.join("&");
    }
    if ("[object String]" == n.call(t)) {
        var u = t.split("#"), p = r(u, 2), l = p[0], c = p[1], f = {}, g = {
            hash: ""
        };
        return c && (g.hash = c), l && l.split("&").forEach(function(t) {
            var e = t.split("="), n = r(e, 2), i = n[0], s = n[1], a = o ? i.toLowerCase() : i;
            f[a] = decodeURIComponent(s);
        }), g.query = f, g;
    }
    return t;
}, exports.throttle = function(t, e) {
    var r = 0;
    return function() {
        var n = Date.now();
        if (!(n - r < e)) return r = n, t.apply(this, arguments);
    };
}, exports.debounce = function(t, e) {
    var r = null;
    return function() {
        var n = this, o = arguments;
        r && clearTimeout(r), r = setTimeout(function() {
            r = null, t.apply(n, o);
        }, e);
    };
}, exports.decode = function(t) {
    try {
        return decodeURIComponent(t);
    } catch (e) {
        return t;
    }
}, exports.isMobile = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments[1], r = t, n = t.substring(0, 3), o = t.substring(0, 4);
    return t = !!/^1\d{10}$/.test(t) && ("130,131,132,155,156,185,186,145,176,166,175".indexOf(n) >= 0 ? "联通" : "133,153,180,181,189,177,173,170,199".indexOf(n) >= 0 ? "电信" : "1349" == o ? "电信" : "134,135,136,137,138,139,150,151,152,157,158,159,187,188,147,182,183,184,178,171,198".indexOf(n) >= 0 ? "移动" : "未知"), 
    e || t || !/^1\d{2}\*{4}\d{4}$/.test(r) || (t = !0), t;
}, exports.getUrlParam = function(t, e) {
    var r = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"), n = e.substr(e.indexOf("?") + 1).match(r);
    return null != n ? n[2] : "";
}, exports.getRandomID = function() {
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + Math.random().toString(36).substring(2, 15);
}, exports.checkTime = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Date.now();
    /^\d{10}$/.test(t + "") && (t *= 1e3), /^\d{10}$/.test(e + "") && (e *= 1e3);
    var n = !t || (parseInt(t) == t ? r >= t : r >= Date.parse(t)), o = !e || (parseInt(e) == e ? r < e : r < Date.parse(e));
    return n ? o ? 0 : 1 : -1;
}, exports.formatTime = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now();
    if (t) {
        var e = new Date(t);
        return e.getFullYear() + "." + (e.getMonth() + 1) + "." + e.getDate();
    }
}, exports.formatDate = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(), e = arguments[1], r = new Date();
    r.setTime(t);
    var n = {
        "M+": r.getMonth() + 1,
        "d+": r.getDate(),
        "h+": r.getHours(),
        "m+": r.getMinutes(),
        "s+": r.getSeconds(),
        "q+": Math.floor((r.getMonth() + 3) / 3),
        "S+": r.getMilliseconds()
    };
    /(y+)/i.test(e) && (e = e.replace(RegExp.$1, (r.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var o in n) new RegExp("(" + o + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? n[o] : ("00" + n[o]).substr(("" + n[o]).length)));
    return e;
}, exports.genErrMsg = function(t, e) {
    return t && e ? t + "(" + e + ")" : t || e || "网络繁忙，请稍后再试";
}, exports.getPageUrl = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
    if (!t) {
        var e = getCurrentPages();
        t = e[e.length - 1];
    }
    var r = t && (t.route || t.__route__) || "app.js";
    return {
        route: r,
        vurl: "http://wq.jd.com/wxapp/" + r
    };
}, exports.fixProtocol = function(t) {
    return t && (t = t.replace(/^(http:\/\/|\/\/)/, "https://")), t;
}, exports.only = function(t, e) {
    return t = t || {}, "string" == typeof e && (e = e.split(/ +/)), e.reduce(function(e, r) {
        return null == t[r] ? e : (e[r] = t[r], e);
    }, {});
}, exports.flatten = t, exports.chunk = function(t, e) {
    if ("number" != typeof e) throw new TypeError("size is not number");
    if (!Array.isArray(t)) throw new TypeError("arr is not array");
    for (var r = [], n = 0; n < t.length; ) r.push(t.slice(n, n += e));
    return r;
}, exports.canGetActiveCoupon = function(t) {
    var e = !1, r = !1, n = !1;
    return t && (t.DailyBingos < t.MaxDailyBingos && (e = !0), t.HourBingos < t.MaxHourBingos && (r = !0), 
    t.TotalBingos < t.MaxBingos && (n = !0)), e && r && n;
}, exports.handleQueryScene = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.scene;
    if ("string" == typeof e && 0 !== e.indexOf("shop/")) {
        var r = decodeURIComponent(e).replace(/@/g, "%");
        if (/=|&/.test(r)) {
            var n = {};
            r.split("&").forEach(function(t) {
                var e = t.split("=");
                if (2 == e.length) {
                    var r = decodeURIComponent(e[0]), o = decodeURIComponent(e[1]);
                    n[r] = o;
                }
            }), delete t.scene, Object.assign(t, n);
        }
    }
}, exports.deepExtend = function t(r) {
    var n = void 0;
    if (null == r || "object" != (void 0 === r ? "undefined" : e(r))) return r;
    if (r instanceof Date) return (n = new Date()).setTime(r.getTime()), n;
    if (r instanceof Array) {
        n = [];
        for (var o = 0, i = r.length; o < i; o++) n[o] = t(r[o]);
        return n;
    }
    if (r instanceof Object) {
        n = {};
        for (var s in r) r.hasOwnProperty(s) && (n[s] = t(r[s]));
        return n;
    }
    console.warn("Unable to copy obj! Its type isn't supported.");
}, exports.isObject = function(t) {
    var r = void 0 === t ? "undefined" : e(t);
    return null != t && ("object" == r || "function" == r);
}, exports.nth = function(t, e) {
    return Array.isArray(t) && t.length > e ? t[e] : null;
}, exports.compareVersion = function(t, e) {
    t = t.split("."), e = e.split(".");
    for (var r = Math.max(t.length, e.length); t.length < r; ) t.push("0");
    for (;e.length < r; ) e.push("0");
    for (var n = 0; n < r; n++) {
        var o = parseInt(t[n]), i = parseInt(e[n]);
        if (o > i) return 1;
        if (o < i) return -1;
    }
    return 0;
};

exports.isWx = null, exports.isQQ = null, exports.isJDAPP = null, exports.isJdJrApp = null, 
exports.isTjjApp = null;