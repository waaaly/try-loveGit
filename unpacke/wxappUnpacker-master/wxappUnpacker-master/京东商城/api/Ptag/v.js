function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    return e.default = t, e;
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

function i(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function n(t) {
    switch (t) {
      case "wifi":
        l = 1;
        break;

      case "2g":
      case "3g":
        l = 2;
        break;

      default:
        l = 3;
    }
}

function r(t, e) {
    for (var o = a.getCookie("PPRD_P") || "", i = "", n = o.split("-"), r = 0; r < n.length; r++) 0 != n[r].length && (i.length > 0 && (i += "-"), 
    "LOGID." == n[r].substr(0, 6) ? i += "LOGID." + t.logid : i += n[r]);
    o.match(/LOGID\.(\d+\.\d+)/) || (i.length > 0 && (i += "-"), i += "LOGID." + t.logid), 
    a.setCookie({
        data: {
            PPRD_P: {
                value: i,
                decode: !0
            }
        }
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.UserShareV = exports.GuessyouLikeV = exports.ItemExposureV = exports.SearchExposureV = exports.PageV = exports.ClickV = void 0;

var s = function() {
    function t(t, e) {
        for (var o = 0; o < e.length; o++) {
            var i = e[o];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, o, i) {
        return o && t(e.prototype, o), i && t(e, i), e;
    };
}();

exports.initAppReport = function() {
    var t = new p.default(function(t, e) {
        wx.getNetworkType({
            success: function(e) {
                t(e.networkType);
            },
            fail: function(e) {
                t("2g");
            }
        });
    });
    return f ? h ? p.default.resolve(h) : f : f = new p.default(function(e, o) {
        var i = c.get("fristSplash", Date.now()), n = c.get("thisSplash", Date.now()), r = c.get("splashCount", 0), s = c.get("lastSplash", Date.now());
        p.default.all([ i, n, s, r, t ]).then(function(t) {
            h = {
                firstSplash: t[0],
                thisSplash: t[1],
                lastSplash: t[2],
                splashCount: ++t[3],
                networkType: t[4]
            }, c.set("fristSplash", h.firstSplash), c.set("splashCount", h.splashCount), e(h);
        });
    });
};

var a = t(require("../../common/cookie-v2/cookie.js")), p = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../libs/promise.min.js")), u = t(require("../../common/user_info")), c = t(require("../../common/localStorage")), l = 3, h = null, f = null, d = function() {
    function t() {
        i(this, t), this._strings_ = [];
    }
    return s(t, [ {
        key: "append",
        value: function(t) {
            this._strings_.push(t);
        }
    }, {
        key: "toString",
        value: function() {
            return this._strings_.join("");
        }
    } ]), t;
}(), g = function() {
    function t(e, o, r) {
        i(this, t), n(r.networkType || "wifi"), this.vurl = o, this.chan_type = 5, this.wid = u.gUserData().wid, 
        this.openid = u.gUserData().open_id;
        var s = u.gUserData().pin;
        this.pinid = s || "-", this.wq_unionid = u.gUserData().unionid, this.unpl = a.getCookie("unpl"), 
        this.net_type = l, this.wxapp_type = a.getCookie("wxapp_type") || "1";
        var p = (a.getCookie("__wga") || "").split(".");
        p.length >= 6 ? (this.fst = p[3], this.pst = p[2], this.vct = p[1], this.visit_times = p[5]) : (this.fst = r.firstSplash || Date.now(), 
        this.pst = r.lastSplash || Date.now(), this.vct = r.thisSplash || Date.now(), this.visit_times = r.splashCount || 1);
        var c = a.getCookie("PPRD_P") || "", h = c.match(/LOGID\.(\d+\.\d+)/);
        h && (this.logid = h[1]), this.cookie_ptag = "";
        for (var f = [ "EA", "IA", "CT", "PD" ], d = 0; d < f.length; d++) {
            var g = c.match(f[d] + "\\.(\\d+)\\.(\\d+)\\.(\\d+)");
            g && (this.cookie_ptag && (this.cookie_ptag += "-"), this.cookie_ptag += g[0]);
        }
        this.jdv = a.getCookie("__jdv");
    }
    return s(t, [ {
        key: "toString",
        value: function() {
            var t = new d();
            for (var e in this) if (this.hasOwnProperty(e)) {
                if ("function" == typeof this[e]) continue;
                t.append(e), t.append("="), this[e] && t.append(this[e]), t.append("$");
            }
            var o = t.toString();
            return o.substring(0, o.length - 1);
        }
    } ]), t;
}();

exports.ClickV = function(t) {
    function n(t, o, r, s) {
        i(this, n);
        var p = e(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, t, o, s)), u = wx.getSystemInfoSync();
        p.screen = u.windowWidth + "x" + u.windowHeight, p.color = "32-bit", p.os = "weixin_" + u.version, 
        p.device_type = u.model;
        var c = a.getCookie("PPRD_P") || "", l = [ "firstSplash", "lastSplash", "thisSplash", "splashCount", "networkType" ];
        p.cookie_ptag = "";
        for (var h = [ "EA", "IA", "CT", "PD" ], f = 0; f < h.length; f++) {
            var d = c.match(h[f] + "\\.(\\d+)\\.(\\d+)\\.(\\d+)");
            d && (p.cookie_ptag && (p.cookie_ptag += "-"), p.cookie_ptag += d[0]);
        }
        var g = p.jdv.split("|");
        if (g.length > 4 ? (p.usc = g[1], p.ucp = g[2], p.umd = g[3], p.uct = g[4]) : (p.usc = "direct", 
        p.ucp = "-", p.umd = "none", p.uct = "-"), p.target = r, s) for (var _ in s) -1 == l.indexOf(_) && (p[_] = s[_]);
        return p;
    }
    return o(n, g), n;
}(), exports.PageV = function(t) {
    function n(t, o, s, p) {
        i(this, n);
        var u = e(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, t, o, p)), c = getCurrentPages().length, l = getCurrentPages()[c - 1].pvTime || {};
        l.end = Date.now(), l.loadTime ? u.load_sec = l.loadTime : (l.loadTime = l.end - l.start, 
        u.load_sec = l.loadTime, l.needRefresh = !0);
        var h = wx.getSystemInfoSync();
        u.screen = h.windowWidth + "x" + h.windowHeight, u.color = "32-bit", u.os = "weixin_" + h.version, 
        u.logid = Date.now() + "." + Math.round(2147483647 * Math.random()), u.device_type = h.model;
        var f = a.getCookie("PPRD_P") || "", d = [ "firstSplash", "lastSplash", "thisSplash", "splashCount", "networkType" ];
        u.cookie_ptag = "";
        for (var g = [ "EA", "IA", "CT", "PD" ], _ = 0; _ < g.length; _++) {
            var v = f.match(g[_] + "\\.(\\d+)\\.(\\d+)\\.(\\d+)");
            v && (u.cookie_ptag && (u.cookie_ptag += "-"), u.cookie_ptag += v[0]);
        }
        var w = u.jdv.split("|");
        if (w.length > 4 ? (u.usc = w[1], u.ucp = w[2], u.umd = w[3], u.uct = w[4]) : (u.usc = "direct", 
        u.ucp = "-", u.umd = "none", u.uct = "-"), u.target = s, r(u), p) for (var y in p) -1 == d.indexOf(y) && (u[y] = p[y]);
        return u;
    }
    return o(n, g), n;
}(), exports.SearchExposureV = function(t) {
    function n(t, o, r) {
        i(this, n);
        var s = e(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, t, o, r));
        return r = r || {}, s.v = r, s;
    }
    return o(n, g), n;
}(), exports.ItemExposureV = function(t) {
    function n(t, o, r, s) {
        i(this, n);
        var a = e(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, t, o, s)), p = wx.getSystemInfoSync();
        a.screen = p.windowWidth + "x" + p.windowHeight, a.color = "32-bit", a.os = "weixin_" + p.version, 
        a.device_type = p.model, a.target = r;
        var u = [ "firstSplash", "lastSplash", "thisSplash", "splashCount", "networkType" ];
        if (s) for (var c in s) -1 == u.indexOf(c) && (a[c] = s[c]);
        return a;
    }
    return o(n, g), n;
}(), exports.GuessyouLikeV = function(t) {
    function n(t, o, r) {
        i(this, n);
        var s = e(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, t, o, r)), a = wx.getSystemInfoSync(), p = [ "firstSplash", "lastSplash", "thisSplash", "splashCount", "networkType" ];
        if (s.os = "weixin_" + a.version, s.user_type = "-" !== s.pinid ? 1 : 0, s.chan_type = 6, 
        r) for (var u in r) -1 === p.indexOf(u) && (s[u] = r[u]);
        return s;
    }
    return o(n, g), n;
}(), exports.UserShareV = function(t) {
    function n(t, o, r) {
        i(this, n);
        var s = e(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, t, o, r));
        s.cookie_ptag = "";
        for (var p = a.getCookie("PPRD_P") || "", u = [ "EA", "IA", "CT", "PD" ], c = 0; c < u.length; c++) {
            var l = p.match(u[c] + "\\.(\\d+)\\.(\\d+)\\.(\\d+)");
            l && (s.cookie_ptag && (s.cookie_ptag += "-"), s.cookie_ptag += l[0]);
        }
        var h = [ "firstSplash", "lastSplash", "thisSplash", "splashCount", "networkType" ];
        if (r) for (var f in r) -1 === h.indexOf(f) && (s[f] = r[f]);
        return s;
    }
    return o(n, g), n;
}();