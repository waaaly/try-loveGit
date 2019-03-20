Page({
    data: {},
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    toUserProtocol: function() {
        wx.navigateTo({
            url: "/pages/accountAgreement/userProtocol"
        });
    },
    toPrivacyProtocol: function() {
        wx.navigateTo({
            url: "/pages/accountAgreement/privacyProtocol"
        });
    },
    toPersonal: function() {
        wx.navigateTo({
            url: "/pages/linkingAccount/linkingSelect"
        });
    },
    toRegisterPhone: function() {
        wx.navigateTo({
            url: "/pages/linkingRegister/registerPhone"
        });
    }
});