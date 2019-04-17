var e = require("../../../libs/aliLog"), i = getApp().services, s = i.User, t = i.AliLog, a = i.Ubt;

Page({
    onLoad: function() {
        var i = (0, e.createUrlParams)();
        if (s.id) {
            var t = wx.getStorageSync("SOURCE") || "", a = "https://h5.ele.me/checkout/#/?ssi=" + s.SID + "&uid=" + s.id + "&union_id=" + s.union_id + "&come_from=mp&" + i;
            t && (a = a + "&mp_source=" + t), this.setData({
                url: a
            });
        } else wx.navigateTo({
            url: "/pages/auth/index?successUrl=/pages/checkout/index/index&" + i
        });
    },
    onShow: function() {
        t.sendPv(), a.sendPv();
    }
});