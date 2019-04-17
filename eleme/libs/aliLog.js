function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createUrlParams = void 0;

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
}, r = function() {
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
}(), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./aliLogConsts")), o = require("../dave/dave.js").User, i = function(e) {
    if (!e) return "";
    var t = [];
    return Object.keys(e).forEach(function(r) {
        var n = e[r];
        n && t.push(r + "=" + n);
    }), t.join("&");
}, a = function() {
    for (var e = "", t = 0; t < 4; t++) e += "0000000".concat(Math.floor(2821109907456 * Math.random()).toString(36)).slice(-8);
    return e;
}, s = function() {
    var e = wx.getStorageSync("alilog_ssid");
    if (e) return e;
    var t = new Date(new Date().getTime() + 288e5), r = a() + "_" + [ t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate() ].join("-").replace(/\b\d\b/g, "0$&");
    return wx.setStorageSync("alilog_ssid", r), r;
}, c = [ "logtype", "title", "aplus", "cfgver", "pc_i", "ps_i", "pu_i", "_p_url", "_p_ref", "spm-cnt", "spm-url", "_p_scr", "_p_pf", "cache" ], u = {
    logtype: 1,
    aplus: "",
    cfgver: "vx.1.0",
    _p_pf: "wx"
}, l = function(e, t) {
    var r = i(t);
    return r = r ? "?" + r : "", encodeURIComponent("" + e + r);
}, p = function() {
    return Math.floor(1e6 * Math.random());
}, f = function(e, t) {
    var r = [];
    c.forEach(function(t) {
        "aplus" === t && r.push(t), e[t] && r.push(t + "=" + e[t]);
    });
    var n = "" + r.join("&"), o = i(t);
    o = o ? "&" + o : "", wx.request({
        url: "https://log.mmstat.com/vx.gif?" + n + o
    });
}, g = function(e, t, r) {
    var n = "https://wgo.mmstat.com/vx/" + e + "?" + i(t);
    r && (n += "&" + r), wx.request({
        url: n
    });
}, d = function() {
    function i() {
        e(this, i), this.scene = wx.getStorageSync("scene") || "", this.from = wx.getStorageSync("qrcode") || "";
        var t = wx.getSystemInfoSync(), r = t.windowWidth, n = t.windowHeight;
        this._p_scr = r + "*" + n, this.pc_i = s();
    }
    return r(i, [ {
        key: "sendPv",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = this.getParams(!0), n = r.common, o = r.extra;
            f(t({}, n, u), t({}, o, e));
        }
    }, {
        key: "sendGoldlog",
        value: function(e) {
            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "CLK", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", o = this.getParams(), i = o.common, a = o.extra;
            g(e, t({
                gmkey: r
            }, i, a), n);
        }
    }, {
        key: "getParams",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], r = getCurrentPages();
            console.log(r[r.length - 1]);
            var i = r[r.length - 1], a = i.route, s = i.options, c = s.preurl, u = void 0 === c ? "" : c, f = s.spm, g = void 0 === f ? "" : f;
            if (n.default[a] || !e) {
                var d = n.default[a] || {}, v = d.title, _ = void 0 === v ? "" : v, h = d.spmb, m = void 0 === h ? "" : h, y = {
                    pc_i: this.pc_i,
                    ps_i: o.SID,
                    pu_i: o.id,
                    _p_url: l(a, s),
                    _p_ref: u,
                    "spm-url": g
                };
                m && (y["spm-cnt"] = "a2ogi." + m + ".0.0");
                var w = {
                    title: encodeURIComponent(_),
                    _p_scr: this._p_scr,
                    _p_pf: "wx",
                    cache: p()
                };
                e && (y = t({}, y, w));
                var x = wx.getStorageSync("PLACE"), S = x.city_id, b = x.district_id, C = x.latitude, P = x.longitude, j = wx.getStorageSync("SOURCE");
                return {
                    common: y,
                    extra: {
                        scene: this.scene,
                        from: this.from,
                        city_id: S,
                        district_id: b,
                        user_id: o.id,
                        latitude: C,
                        longitude: P,
                        source: j
                    }
                };
            }
            console.error("当前页面无spm信息，请申请后添加到相应文件");
        }
    } ]), i;
}();

exports.default = new d(), exports.createUrlParams = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "0.0", t = getCurrentPages(), r = t[t.length - 1], o = r.route, i = r.options;
    if (n.default[o]) return "pages/shop/list/shop-list" === o && (i = {
        activity_id: i.activity_id,
        spm: i.spm,
        preurl: i.preurl
    }), "spm=a2ogi." + n.default[o].spmb + "." + e + "&preurl=" + l(o, i);
    console.error("当前页面无spm信息，请申请后添加到相应文件");
};