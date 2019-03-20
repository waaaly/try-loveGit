var t = getApp().globalData.mp;

Page({
    data: {
        logs: []
    },
    onLoad: function() {
        this.setData({
            logs: (wx.getStorageSync("logs") || []).map(function(a) {
                return t.formatTime(new Date(a));
            })
        });
    }
});