var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("libs/aliLog.js")), n = require("common/services/hosts"), t = require("dave/dave.js"), r = require("common/utils/api.js"), i = require("./common/utils/util.js").sameDay;

t.config({
    apiHost: n.apiHost,
    fussHost: n.fuss10
});

var s = t.User, c = t.Pay, a = t.ApiCreater, u = t.Ubt, f = t.HashToUrl, l = t.Location, h = require("common/services/cart.js"), y = function(e) {
    if (console.log("------- Set scene and qrcode -----------"), console.log(e), e) {
        var o = e.query.qrcode;
        o && (wx.setStorageSync("qrcode", o), u.from = o);
        var n = e.scene;
        wx.setStorageSync("scene", n), u.scene = n;
    }
}, d = function() {
    var e = wx.getStorageSync("LAST_RISK_LOGIN");
    i(new Date(e), new Date()) || wx.login({
        success: function(e) {
            wx.setStorageSync("LAST_RISK_LOGIN", new Date()), r.riskLogin({
                authcode: e.code,
                unionid: s.union_id,
                user_id: s.id
            });
        }
    });
}, m = function(e) {
    return s.login(e).then(function(e) {
        return d(), e;
    });
};

Object.assign = Object.assign || require("./libs/object-assign"), Array.prototype.find = Array.prototype.find || require("./libs/array-find"), 
App({
    extend: function(o) {
        var n = this, t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = {};
        return o.forEach(function(o) {
            for (var i in o) {
                var s;
                !function(i) {
                    o.hasOwnProperty(i) && (r.hasOwnProperty(i) && !t ? "object" === e(r[i]) && "object" === e(o[i]) ? "[object Array]" !== Object.prototype.toString.call(o[i]) && "[object Array]" !== Object.prototype.toString.call(r[i]) && (r[i] = n.extend([ r[i], o[i] ])) : "function" == typeof r[i] && "function" == typeof o[i] && [ "onLoad", "onReady", "onShow", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom" ].indexOf(i) > -1 && (s = r[i], 
                    r[i] = function(e) {
                        s.call(this, e), o[i].call(this, e);
                    }) : r[i] = o[i]);
                }(i);
            }
        }), r;
    },
    overwrite: function(e, o) {
        return o.forEach(function(o) {
            for (var n in o) o.hasOwnProperty(n) && (e[n] = o[n]);
        }), e;
    },
    checkSession: function() {
        return new Promise(function(e, o) {
            wx.checkSession({
                success: e,
                fail: o
            });
        });
    },
    onLaunch: function(e) {
        y(e), s.id ? this.checkSession().then(d).catch(function() {}) : wx.login({
            success: function(e) {
                m({
                    authcode: e.code
                }).catch(function() {});
            }
        });
    },
    onShow: function(e) {
        s.SID || wx.login({
            success: function(e) {
                m({
                    authcode: e.code
                }).catch(function() {});
            }
        }), wx.setStorageSync("sharedUserId", e.query.sharedUserId), y(e);
    },
    services: {
        User: s,
        Ubt: u,
        Pay: c,
        ApiCreater: a,
        HashToUrl: f,
        Location: l,
        AliLog: o.default,
        Cart: new h(),
        Geohash: require("./common/utils/geohash.js"),
        Promise: require("./libs/promise.js"),
        imageHash: require("./common/utils/image-hash.js"),
        paramsToString: require("./common/utils/paramsToString.js"),
        webCart: require("./libs/web-cart.js").default,
        Base64: require("./libs/base64.js"),
        API: r,
        Host: n,
        weixinAPIs: require("./common/services/weixinAPIs.js"),
        loginWithRisk: m
    }
});