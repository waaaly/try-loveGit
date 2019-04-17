var a = getApp().services, t = a.API, e = a.imageHash, h = require("../../common/services/hosts.js").h5Host;

Page({
    data: {
        canIUse: wx.canIUse("web-view"),
        hongbaoUrl: "",
        shareData: {
            title: "",
            path: "/pages/hongbao/index?",
            imageUrl: ""
        }
    },
    onLoad: function(a) {
        wx.hideShareMenu && wx.hideShareMenu(), this.getShareData(a.theme_id, a.sn);
        var t = h + "/hongbao/#", e = Object.keys(a).map(function(t) {
            return t + "=" + a[t];
        }).join("&");
        this.setData({
            hongbaoUrl: t + e,
            "shareData.path": this.data.shareData.path + e
        }), this.getHbConfig();
    },
    getHbConfig: function() {
        var a = this;
        t.getHbConfig().then(function(t) {
            var e = t.data;
            e.imageUrl && a.setData({
                "shareData.imageUrl": e.imageUrl
            });
        }).catch(function(a) {});
    },
    onShareAppMessage: function() {
        return {
            title: this.data.shareData.title,
            imageUrl: this.data.shareData.imageUrl || e.hongbao_share,
            path: this.data.shareData.path
        };
    },
    getShareData: function(a, e) {
        var h = this;
        t.getHongbaoTheme(a, e).then(function(a) {
            var t = a.data;
            wx.showShareMenu && wx.showShareMenu(), h.setData({
                "shareData.title": t.title
            });
        }).catch(function() {});
    }
});