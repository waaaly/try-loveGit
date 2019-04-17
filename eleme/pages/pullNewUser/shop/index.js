var a = getApp().services.HashToUrl, t = require("../shopHongbao/api.js"), e = function(a) {
    return a.message || a.data && a.data.errMsg || a.data && a.data.message || "网络错误，请重试";
}, s = null, o = "shop", n = "饿了么商户";

Page({
    data: {
        loading: !0,
        shop: {}
    },
    onLoad: function(i) {
        var p = this, r = i.id, h = i.type;
        s = r, o = h, t.getPageMeta({
            id: r,
            type: "grand" === h ? 0 : 1
        }).then(function(t) {
            var e = t.data, s = e.shop_name, o = e.shop_logo, i = {};
            n = s.replace(/[(（[【].*/, ""), i.image_path = a(o, 122, 122), p.setData({
                shop: i,
                loading: !1
            });
        }).catch(function(a) {
            wx.showToast({
                title: e(a)
            });
        });
    },
    onShareAppMessage: function(a) {
        return {
            title: n + "给你撒钱啦",
            path: "/pages/pullNewUser/shopHongbao/index?id=" + s + "&type=" + o,
            success: function(a) {
                wx.showToast({
                    title: "分享成功"
                });
            },
            fail: function(a) {
                wx.showToast({
                    title: "分享失败"
                });
            }
        };
    }
});