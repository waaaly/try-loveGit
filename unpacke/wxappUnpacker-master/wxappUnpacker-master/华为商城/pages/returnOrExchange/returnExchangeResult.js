var a = getApp();

a.globalData.mp, a.globalData.config;

Page({
    data: {
        applyType: ""
    },
    onLoad: function(a) {
        this.setData({
            applyType: a.applyType
        });
    }
});