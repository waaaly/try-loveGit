var t = function() {
    function t(t, e) {
        var n = [], i = !0, o = !1, r = void 0;
        try {
            for (var a, s = t[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value), 
            !e || n.length !== e); i = !0) ;
        } catch (t) {
            o = !0, r = t;
        } finally {
            try {
                !i && s.return && s.return();
            } finally {
                if (o) throw r;
            }
        }
        return n;
    }
    return function(e, n) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = require("../../../libs/aliLog"), n = getApp().services, i = n.User, o = n.Location, r = n.AliLog, a = n.Ubt, s = n.Host, c = require("./apis").checkNewRetailShop, u = "";

Page({
    onLoad: function(n) {
        if (n.q) {
            var i = decodeURIComponent(n.q).split("?")[1];
            i && (n = {}, i.split("&").forEach(function(e) {
                var i = e.split("="), o = t(i, 2), r = o[0], a = o[1];
                n[decodeURIComponent(r)] = decodeURIComponent(a);
            }));
        }
        u = (0, e.createUrlParams)(), this.onPostLoad(n);
        var o = getCurrentPages();
        wx.setStorageSync("ORDER_TRACE", (o[o.length - 2] || {}).route || "");
    },
    onShow: function() {
        r.sendPv(), a.sendPv();
    },
    onPostLoad: function(t) {
        var e = this, n = t.id, i = t.promotion_food, r = t.uniqueId, a = t.isTransfer, s = t.sku_id, c = (wx.getStorageSync("PLACE") || {}).geohash;
        c ? this.init(c, n, i, r, a, s) : o().then(function(t) {
            e.init(t.geohash, n, i, r, a, s);
        }).catch(function() {
            e.setData({
                pageErrorMsg: "没有能获取到您的定位。您可以删除掉小程序，并允许微信获取您的定位，或者下载 饿了么App 下单。"
            });
        });
    },
    init: function(t, e, n, i, o, r) {
        var a = this;
        o && "0" !== o && "undefined" !== o ? this.initBwm(t, e, n, i, r) : c(e).then(function(o) {
            o ? a.initBwm(t, o, n, i, r) : a.initEle(t, e, n, i);
        }).catch(function(o) {
            a.initEle(t, e, n, i);
        });
    },
    initEle: function(t, e, n, o) {
        var r = s.h5Host + "/shop/#id=" + e + "&" + u;
        t && (r += "&geohash=" + t), n && (r += "&food_id=" + n), i.id && (r += "&uid=" + i.id), 
        i.SID && (r += "&ssi=" + i.SID), o && (r += "&uniqueId=" + o + "&call_cart_modal=true"), 
        this.setData({
            url: r
        });
    },
    initBwm: function(t, e, n, o, r) {
        var a = "https://h5-newretail.faas.ele.me/static/h5_newretail/pages/shop.html?id=" + e + "&isminiprogram=1&" + u;
        t && (a += "&geohash=" + encodeURIComponent(t)), i.id && (a += "&user_id=" + encodeURIComponent(i.id)), 
        i.SID && (a += "&user_sid=" + encodeURIComponent(i.SID)), r && (a += "&sku_id=" + encodeURIComponent(r)), 
        o && (a += "&uniqueId=" + encodeURIComponent(o) + "&call_cart_modal=true"), this.setData({
            url: a
        });
    }
});