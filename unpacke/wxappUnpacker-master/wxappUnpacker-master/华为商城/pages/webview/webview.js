var t = getApp();

t.globalData.mp, t.globalData.config;

Page({
    data: {
        url: "",
        comeFrom: "",
        title: "华为商城+"
    },
    onLoad: function(t) {
        var e = this;
        if (t.url && this.setData({
            url: t.url
        }), t.cid && (wx.setStorageSync("cid", t.cid), t.wi)) {
            var a = t.wi.substr(0, 201);
            wx.setStorageSync("wi", a);
        }
        t.title && wx.setNavigationBarTitle({
            title: t.title
        }), t.comeFrom && (this.data.comeFrom = t.comeFrom), t.comeFrom && "privacyProtocol" == t.comeFrom && e.setData({
            url: e.data.url + "?version=europe#num_one"
        });
    },
    onShow: function() {
        if ("person" == this.data.comeFrom) return !1;
    },
    handleGetMessage: function(t) {
        this.setData({
            title: t.detail.data[0].title || "华为商城+"
        });
    },
    onShareAppMessage: function(t) {
        var e = this, a = "", i = "", o = "";
        return wx.getStorageSync("cid") && (a = wx.getStorageSync("cid"), wx.getStorageSync("wi") && (i = wx.getStorageSync("wi"))), 
        e.data.url && (o = e.data.url), {
            title: e.data.title,
            path: "/pages/webview/webview?url=" + o + "&cid=" + a + "&wi=" + i
        };
    }
});