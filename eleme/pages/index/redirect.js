var e = function() {
    function e(e, r) {
        var n = [], o = !0, t = !1, i = void 0;
        try {
            for (var s, a = e[Symbol.iterator](); !(o = (s = a.next()).done) && (n.push(s.value), 
            !r || n.length !== r); o = !0) ;
        } catch (e) {
            t = !0, i = e;
        } finally {
            try {
                !o && a.return && a.return();
            } finally {
                if (t) throw i;
            }
        }
        return n;
    }
    return function(r, n) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return e(r, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), r = getApp().services, n = r.Location, o = r.paramsToString, t = {
    0: "/pages/pullNewUser/shopHongbao/index",
    newUser: "/pages/pullNewUser/shopHongbao/index",
    1: "/pages/pullNewUser/shop/index",
    newUserShop: "/pages/pullNewUser/shop/index",
    2: "/pages/shop/shop/index",
    share: "/pages/share/index",
    ka: "/pages/ka/index"
}, i = function(r) {
    var n = r.scene;
    if (!n) return {};
    var o = {};
    return (n = decodeURIComponent(n)).split("*").forEach(function(r) {
        var n = r.split("!"), t = e(n, 2), i = t[0], s = t[1];
        o[i] = s;
    }), o;
}, s = function(e) {
    var r = {};
    return r.id = e.shopId || e.s || e.brandId || e.b, r.isExchange = /e/.test(r.id), 
    r.promotion_food = (r.id.match(/f.*$/) || [ "f" ])[0].substr(1), r.id = r.id.replace(/e|f.*/, ""), 
    r.type = void 0 !== e.shopId || void 0 !== e.s ? "shop" : "grand", void 0 !== e.p && (r.promoter_id = e.p), 
    o(r);
}, a = function(e, r) {
    wx.redirectTo({
        url: t[r] + "?" + s(e)
    });
};

module.exports = function(e) {
    var r = i(e), o = r.nav || r.n;
    r.source && wx.setStorageSync("SOURCE", r.source), void 0 !== o && (wx.getStorageSync("PLACE") ? a(r, o) : n().then(a(r, o)));
};