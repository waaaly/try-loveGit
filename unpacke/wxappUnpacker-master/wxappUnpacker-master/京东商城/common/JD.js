function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}

function t(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

function n(e) {
    throw new Error("注意，" + e + "函数在小程序并不支持，请检查代码！");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = require("request/request"), a = e(require("fe_report/usability")), o = require("./logger.js"), i = e(require("./cookie-v2/cookie")), g = e(require("./fe_helper")), u = require("../api/Ptag/report_manager"), c = require("../api/Ptag/Ptag_utils"), p = e(require("./url_utils")), s = e(require("./navigator")), l = null, f = null, d = null, m = {}, y = {}, v = {}, x = {}, w = {}, P = {}, h = {}, k = {};

l = function(e, t) {
    (0, r.request)({
        url: e,
        method: "GET",
        success: function() {
            t.onLoad.apply(t, arguments);
        },
        fail: function() {
            t.onLoad.apply(t, arguments);
        }
    });
}, f = function() {
    n("sendJs");
}, d = function() {
    n("sendJsByDomain");
}, function() {
    var e = {};
    try {
        e = wx.getSystemInfoSync();
    } catch (t) {
        e = {};
    }
    m.retina = e.pixelRatio >= 1.5, m.sticky = e.system && -1 !== e.system.indexOf("iOS"), 
    m.scene = "wxapp", m.webp = !!getApp().webpSupport, m.getNetwork = function(e) {
        var t = i.getCookie("network");
        t && -1 !== "2g,3g,4g,wifi".indexOf(t.toLowerCase()) ? e && e(t) : wx.getNetworkType({
            success: function(t) {
                i.setCookie({
                    data: {
                        network: {
                            value: t.networkType,
                            maxAge: 3600
                        }
                    }
                }), e && e(t.networkType);
            },
            fail: function() {
                e && e("unknown");
            }
        });
    }, m.getNetwork();
}(), y.useScaleImg = function() {
    var e = w.getCookie("network"), t = m.retina;
    return "wifi" !== e || !t;
}, y.getScaleImg = g.getImg, v.useScaleImg = y.useScaleImg, v.getScaleImg = y.getScaleImg, 
v.getImgUrl = y.getScaleImg, x.itil = !1, x.rd = function(e) {
    e && (e = "[object Object]" === Object.prototype.toString.call(e) ? e : {
        ptag: e
    }, c.PtagUtils.addPtag(e.ptag));
}, x.badJs = function() {
    n("badJs");
}, x.umpBiz = function() {
    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    a.umpBiz.apply(a, t);
}, x.umpStart = function() {
    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    return a.start.apply(a, t);
}, x.umpReport = function() {
    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    a.umpReport.apply(a, t);
}, x.imageLoadError = function(e) {
    console.error("imageLoadError已经过期");
}, x.pv = u.ReportManager.setCurrentPageAndAddPv, w.get = function(e) {
    return i.getCookie(e);
}, w.set = function(e, n, r, a, o, g) {
    i.setCookie({
        data: t({}, e, {
            value: n,
            maxAge: 60 * r
        })
    });
}, w.del = function(e, t, n, r) {
    i.removeCookie([ e ]);
}, P.setHash = function() {
    n("setHash");
}, P.getHash = function() {
    n("getHash");
}, P.getHashParam = function() {
    n("getHashParam");
}, P.getUrlParam = p.getUrlParam, P.parseUrl = p.parseURL, P.addUrlParam = function(e, t) {
    for (var n in t) {
        var r = new RegExp("([?&])" + n + "=[^&]*(&|$)", "i");
        r.test(e) ? (e = e.replace(r, "$1" + n + "=" + t[n] + "$2"), delete t[n]) : e = p.addUrlParam(e, t);
    }
    return e;
}, P.addRd = function(e, t) {
    return P.addUrlParam(e, {
        PTAG: t
    });
}, P.getValidImageDomain = function() {
    n("getValidImageDomain");
}, P.getPageUrl = function() {
    n("getPageUrl");
}, P.getImageUrl = function() {
    n("getImageUrl");
}, P.getCgiUrl = function() {
    n("getCgiUrl");
}, P.getStaticDisRec = function() {
    n("getStaticDisRec");
}, h.listen = function(e, t) {
    getApp().event.on(e, t);
}, h.one = function(e, t) {
    getApp().event.once(e, t);
}, h.trigger = function(e) {
    for (var t, n = arguments.length, r = Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) r[a - 1] = arguments[a];
    (t = getApp().event).emit.apply(t, [ e ].concat(r));
}, h.remove = function(e) {
    getApp().event.off(e);
}, function() {
    var e = {
        index: "/pages/index/index",
        detail: "/pages/item/detail/detail",
        my: "/pages/my/index/index",
        cart: "/pages/cart/cart/cart",
        search: "/pages/search/list/list",
        buy: "/pages/pay/index/index",
        account: "/pages/my_pages/account/account",
        pgitem: "/pages/pingou/item/item",
        pgdetail: "/pages/pingou/detail/index",
        shop: "/pages/store/index/index",
        gwqpage: "/pages/gwq/index",
        category: "/pages/cate/cate",
        coupon: "/pages/my/coupon/coupon",
        proxy: "/pages/union/proxy/proxy"
    };
    k.urls = e, k.isWxapp = function(e) {
        e(!0);
    }, k.goto = function(e, t) {
        s.goto(e, {}, {
            method: t
        });
    };
}(), exports.default = {
    send: l,
    sendJs: f,
    sendJsByDomain: d,
    device: m,
    performance: y,
    img: v,
    report: x,
    cookie: w,
    url: P,
    events: h,
    wxapp: k,
    log: o.Logger
};