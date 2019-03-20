var a = getApp();

Page({
    data: {
        dataset: [],
        siteName: "",
        loadlayer: !0
    },
    bindShareTap: function() {
        wx.navigateTo({
            url: "/pages/index/share/share"
        });
    },
    bindScoreTap: function() {
        wx.switchTab({
            url: "/pages/mall/index/index"
        });
    },
    bindCashTap: function() {
        wx.navigateTo({
            url: "/pages/user/apply/apply"
        });
    },
    onLoad: function() {
        this.setData({
            siteName: a.name
        });
        var e = this;
        a.getHttpData(a.domain + "/user/helpinfo", null, "GET", function(a) {
            e.setData({
                dataset: a
            }), e.setData({
                loadlayer: !1
            });
        });
    }
});