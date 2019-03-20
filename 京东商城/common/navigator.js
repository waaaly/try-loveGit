function e(e) {
    if (e && e.__esModule) return e;
    var a = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (a[n] = e[n]);
    return a.default = e, a;
}

function a(e, a, n) {
    return a in e ? Object.defineProperty(e, a, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = n, e;
}

function n(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, f = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    "/pages/pingou/item/item" == e && (e = "/pages/item/pingou/pingou"), c = 2 == r.getCookie("wxapp_type");
    var x = [ "/pages/pingou/index/index", "/pages/pingou_second/miandanindex/index", "/pages/pingou/rule/index", "/pages/pingou/cate/cate", "/pages/pingou_second/miandanrule/index", "/pages/pingou_second/search/search", "/pages/pingou/my/my", "/pages/pingou/brand/index", "/pages/pingou_second/brand/index", "/pages/pingou/brand/detail", "/pages/pingou_second/brand/detail", "/pages/pingou_second/index_sectab/index_sectab", "/pages/pingou_second/promote/index", "/pages/pingou_second/bipin/index", "/pages/pingou/ziying/ziying", "pages/pingou_second/ziying/ziying" ], l = e.split("?")[0];
    if (!c && x.includes(l) && f.skipSwitchUrl && (f.skipSwitchUrl = !1), "string" == typeof n) {
        var y = [ n, {} ];
        f = y[0], n = y[1];
    }
    "string" == typeof f && (f = {
        method: f
    });
    var m = f.method || "navigateTo", v = [ {
        url: "/pages/my/frozenaccount/frozenaccount",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/my_pages/frozenaccount/frozenaccount",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/my/account/account",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/my_pages/account/account",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/cate/cate",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/my/ecard/bind/bind",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/my_pages/ecard/bind/bind",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/item/detail/detail",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/my/index/index",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/my_pages/coupon/coupon",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    }, {
        url: "/pages/shop/index/index",
        appId: "wx91d27dbf599dff74",
        source: "app_pingou"
    } ], b = v.findIndex(function(a) {
        return 0 == e.indexOf(a.url);
    }), _ = (getApp() || {}).appId, w = -1 != b ? v[b].appId : _, h = -1 != b ? v[b].source : "";
    if (_ == w || -1 == b) {
        if (d.Pretreatment.onNavigate(e, n), /^(https?:)?\/\//i.test(e) && (n.url = e, e = "/pages/h5/index"), 
        !f.skipSwitchUrl) {
            var I = t.switchUrl(e, n);
            e = I.url, n = I.params;
        }
        var P = [ "/pages/pingou_second/tuan99v2/tuan99v2", "/pages/pingou_second/yiyuanxinren/yiyuanxinren", "/pages/pingou_second/laoyaoxin/laoyaoxin" ];
        if (!c && P.findIndex(function(a) {
            return 0 == e.indexOf(a);
        }) >= 0) {
            o.addPr(e, n);
            for (var T in n) null !== n[T] && "object" === i(n[T]) && (n[T] = JSON.stringify(n[T]));
            var j = e + "?" + p.querystring(n);
            wx.navigateToMiniProgram({
                appId: "wxca1fe42a16552094",
                path: j,
                envVersion: "release",
                extraData: f.extraData ? f.extraData : {}
            });
        } else {
            o.addPr(e, n), console.info("================="), console.info(e, n);
            var O = p.getRandomID("Px");
            n.navStart = new Date(), n.referer = p.getPageUrl().vurl, s.set(O, n), n = p.querystring(a({}, g, O));
            var S = c ? [ "/pages/pingou/index/index", "/pages/pingou/cate/cate", "/pages/pingou/account/index" ] : [ "/pages/index/index", "/pages/cate/cate", "/pages/cart/cart/index", "/pages/my/index/index" ];
            "/pages/cart/cart/cart" == e ? m = "navigateTo" : c || -1 == S.findIndex(function(a) {
                return a == e;
            }) || (m = "switchTab"), 0 !== e.indexOf("/pages/index/index") && 0 !== e.indexOf("/pages/pingou/index/index") || (getApp().navigateToIndexByCode = !0), 
            c || "switchTab" != m || getApp().event.emit("wxapp:switchTab");
            var k = getCurrentPages();
            "navigateTo" == m && k.length >= u - 3 && (m = "redirectTo"), "navigateToByForce" == m && (m = "navigateTo"), 
            "navigateTo" == m && k.length == u && (m = "redirectTo"), wx[m]({
                url: e + "?" + n
            });
        }
    } else {
        o.addPr(e, n), h && (n.source = h);
        for (var q in n) null !== n[q] && "object" === i(n[q]) && (n[q] = JSON.stringify(n[q]));
        var z = e + "?" + p.querystring(n);
        wx.navigateToMiniProgram({
            appId: w,
            path: z,
            envVersion: "release",
            extraData: f.extraData ? f.extraData : {}
        });
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getParams = exports.gotoItem = exports.goto = void 0;

var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, p = e(require("./utils.js")), t = e(require("./h5jump.js")), o = e(require("./pr.js")), r = e(require("./cookie-v2/cookie")), d = require("./pretreatment"), s = new Map(), g = "__pid", u = 10, c = 2 == r.getCookie("wxapp_type");

exports.goto = n, exports.gotoItem = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (a.isPingou) return n("/pages/item/pingou/pingou", e, a);
    if (a.useH5) {
        var i = "https://wqitem.jd.com/item/view?sku=" + e.sku;
        return n("/pages/h5/index", Object.assign({}, e, {
            url: i
        }), Object.assign({}, a, {
            skipSwitchUrl: !0
        }));
    }
    return a.isJx ? n("/pages/item/featured/featured", e, a) : n("/pages/item/detail/detail", e, a);
}, exports.getParams = function(e) {
    if (e && e[g]) {
        var a = e[g];
        e = s.get(a) || {}, s.delete(a);
    }
    return e;
};