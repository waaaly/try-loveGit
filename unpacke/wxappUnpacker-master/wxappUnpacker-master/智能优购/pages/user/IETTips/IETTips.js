Page({
    data: {
        wrongImg: "/images/wrong.png",
        copeUrl: "https://wallet.huaxuec.com/app/download.html"
    },
    onLoad: function(o) {},
    onReady: function() {},
    onShow: function() {},
    setCopy: function(o) {
        var n = this.data.copeUrl;
        wx.setClipboardData({
            data: "" + n,
            success: function(o) {
                wx.showToast({
                    title: "复制成功"
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});