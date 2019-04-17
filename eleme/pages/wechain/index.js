Page({
    onLoad: function() {
        wx.switchTab({
            url: "/pages/index/index",
            complete: function() {
                wx.showToast({
                    title: "活动已结束",
                    icon: "none"
                });
            }
        });
    }
});