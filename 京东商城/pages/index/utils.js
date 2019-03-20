function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Date.now();
    /^\d{10}$/.test(e + "") && (e *= 1e3), /^\d{10}$/.test(t + "") && (t *= 1e3);
    var n = !e || (parseInt(e) == e ? r >= e : r >= Date.parse(e)), i = !t || (parseInt(t) == t ? r < t : r < Date.parse(t));
    return n && i;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.addPtag = exports.isPingouPath = exports.Shake = exports.exposureUrlPtag = exports.getActiveConfig = exports.greyScale = exports.vkGreyScale = exports.clipImg = exports.report = exports.fixUrl = exports.checkTime = exports.genErrMsg = void 0;

var r = function() {
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
}(), n = function() {
    function e(e, t) {
        var r = [], n = !0, i = !1, a = void 0;
        try {
            for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            i = !0, a = e;
        } finally {
            try {
                !n && s.return && s.return();
            } finally {
                if (i) throw a;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), i = require("../../api/Ptag/Ptag_utils"), a = require("../../common/cookie-v2/cookie.js"), o = require("../../common/utils.js"), s = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(o), u = require("../../api/Ptag/report_manager.js"), c = function() {
    function t() {
        var r = this;
        e(this, t), this.listening = !0, this.reachTop = !1, this.emit = (0, o.throttle)(this.emit, 4e3), 
        wx.onAccelerometerChange(function(e) {
            var t = e.x, n = e.y, i = e.z, a = Math.sqrt(t * t + n * n + i * i);
            !r.reachTop && a > 3 ? r.reachTop = !0 : r.reachTop && a < 1.2 && (r.reachTop = !1, 
            r.emit("shake"));
        });
    }
    return r(t, null, [ {
        key: "init",
        value: function() {
            return t.instance ? t.instance.start() : t.instance = new t(), t.instance;
        }
    } ]), r(t, [ {
        key: "on",
        value: function(e) {
            this.cb = e;
        }
    }, {
        key: "emit",
        value: function() {
            this.cb();
        }
    }, {
        key: "start",
        value: function() {
            var e = this;
            this.listening || wx.startAccelerometer({
                success: function() {
                    e.listening = !0, e.reachTop = !1;
                }
            });
        }
    }, {
        key: "stop",
        value: function() {
            this.listening && (wx.stopAccelerometer(), this.listening = !1);
        }
    } ]), t;
}();

exports.genErrMsg = function(e, t) {
    return (e || "网络繁忙，请稍候再试") + (t ? "(" + t + ")" : "");
}, exports.checkTime = t, exports.fixUrl = function(e) {
    return e.replace(/^(http:)?\/\//, "https://");
}, exports.report = function(e) {
    2 == e.split(".").length ? i.PtagUtils.addPtag("137889." + e) : i.PtagUtils.addPtag(e);
}, exports.clipImg = function(e, t, r) {
    if ("string" != typeof e) return "";
    if (0 === e.indexOf("data:image") && -1 != e.indexOf("base64")) return e;
    if (/\.gif/i.test(e)) return e;
    if (!/jfs\//.test(e) || !/(m|img\d{2})\.360buyimg\.com/.test(e) || !/\.(jpg|jpeg|png|webp)/.test(e)) return e;
    var n = "!cc_" + t + "x" + r;
    return /!cc_(\d)+x(\d)+/.test(e) ? e = e.replace(/!cc_(\d)+x(\d)+/, n) : e.endsWith(".webp") ? e = "" + (e = e.replace(/(.*).webp/, "$1")) + n + ".webp" : e += n, 
    e;
}, exports.vkGreyScale = function(e) {
    if ("string" != typeof e || !e.includes("-")) return !0;
    var t = e.split("-"), r = n(t, 2), i = r[0], o = r[1];
    if (i = parseInt(i), o = parseInt(o), 100 === i && 100 === o) return !1;
    if (isNaN(i) || isNaN(o) || i < 0 || o > 99 || i > o) return !0;
    var s = (0, a.getCookie)("visitkey"), u = parseInt(s.slice(-2));
    return !!isNaN(u) || u >= i && u <= o;
}, exports.greyScale = function(e, t) {
    if (isNaN(+e)) return !1;
    var r = (0, a.getCookie)("visitkey"), n = parseInt(r.slice(-2)) + 1, i = parseInt(e);
    if (100 === i || i > 0 && i <= 100 && n <= i) return !0;
    if (t && "string" == typeof t) {
        var o = t.split(";"), s = (0, a.getCookie)("pin") || "";
        if (o.find(function(e) {
            return e === s;
        })) return !0;
    }
    return !1;
}, exports.getActiveConfig = function(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (e && e.length) {
        var n = r.date || Date.now(), i = r.hasOwnProperty("default") ? r.default : {};
        return e.find(function(e) {
            return t(e.beginTime, e.endTime, n);
        }) || i;
    }
}, exports.exposureUrlPtag = function(e, t) {
    if (t) e && u.ReportManager.addPtagExposure(e); else {
        var r = e.split("?")[1], n = r ? (0, o.querystr)(r).query : {}, i = n.ptag || n.PTAG;
        i && u.ReportManager.addPtagExposure(i);
    }
}, exports.Shake = c, exports.isPingouPath = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    return e && (e.match(/pages\/pingou/) || e.match(/pages\/pingou_second/)) && (e = "/pages/h5/index?encode_url=" + encodeURIComponent(t)), 
    e;
}, exports.addPtag = function(e, t) {
    if (!e || !t) return e;
    if (e.match(/\?\w+/)) {
        var r = s.getUrlParam("ptag", String(e));
        e = r ? e.replace(r, t) : e + "&ptag=" + t;
    } else e = e + "?ptag=" + t;
    return e;
};