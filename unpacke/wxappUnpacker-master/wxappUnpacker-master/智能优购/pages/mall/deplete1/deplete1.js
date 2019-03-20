var t = getApp();

Page({
    data: {
        dataset: [],
        loadlayer: !0
    },
    onPullDownRefresh: function() {
        this.onLoad();
    },
    onLoad: function() {
        var a = this;
        new t.WeToast(), t.getHttpData(t.domain + "/deplete/get", null, "GET", function(t) {
            wx.stopPullDownRefresh(), console.log(t), a.setData({
                dataset: t
            }), a.setData({
                loadlayer: !1
            });
        });
    },
    onShow: function() {}
});