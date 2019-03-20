var a = getApp();

a.globalData.mp, a.globalData.config;

Page({
    data: {
        userIcon: "",
        userName: ""
    },
    onLoad: function(n) {
        a.globalData.userInfo && a.globalData.userInfo.avatarUrl ? this.setData({
            userIcon: a.globalData.userInfo.avatarUrl,
            userName: a.globalData.userInfo.nickName
        }) : this.setData({
            userIcon: a.globalData.defaultUserInfo.avatarUrl,
            userName: a.globalData.defaultUserInfo.nickName
        });
    },
    onReady: function() {
        var a = this;
        wx.getSystemInfo({
            success: function(n) {
                a.setData({
                    windowHeight: .667 * n.windowWidth
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    toConnect: function() {
        wx.navigateTo({
            url: "/pages/linkingAccount/linkingAccount"
        });
    },
    toRegister: function() {
        wx.navigateTo({
            url: "/pages/linkingRegister/registerRule"
        });
    }
});