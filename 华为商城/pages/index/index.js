var t = getApp();

t.globalData.mp, t.globalData.config;

Page({
    data: {
        url: "https://msale.vmall.com/xcxhome.html",
        title: "华为商城+"
    },
    onLoad: function(t) {
        if (t.url && this.setData({
            url: t.url
        }), t.cid && (wx.setStorageSync("cid", t.cid), t.wi)) {
            var a = t.wi.substr(0, 201);
            wx.setStorageSync("wi", a);
        }
    },
    onShow: function() {},
    handleGetMessage: function(t) {
        this.setData({
            title: t.detail.data[0].title || "华为商城+"
        });
    },
    onShareAppMessage: function(t) {
        var a = this, e = "", i = "", l = "";
        return wx.getStorageSync("cid") && (e = wx.getStorageSync("cid"), wx.getStorageSync("wi") && (i = wx.getStorageSync("wi"))), 
        a.data.url && (l = a.data.url), {
            title: a.data.title,
            path: "/pages/index/index?url=" + l + "&cid=" + e + "&wi=" + i
        };
    }
});