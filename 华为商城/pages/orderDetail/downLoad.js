var t = getApp();

t.globalData.mp, t.globalData.config;

Page({
    data: {
        downloadUrl: ""
    },
    onLoad: function(t) {
        var a = this, o = decodeURIComponent(t.downloadUrl);
        o.startsWith("https") || (o = o.replace("http", "https")), a.setData({
            showImage: t.type,
            downloadUrl: o || ""
        }), wx.hideShareMenu();
    },
    handleError: function() {
        wx.showModal({
            title: "提示",
            content: "发票信息还未生成，请稍后再试！",
            showCancel: !1,
            success: function(t) {
                t.confirm && wx.navigateBack({
                    delta: 1
                });
            }
        });
    }
});