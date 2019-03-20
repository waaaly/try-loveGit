Page({
    data: {},
    onLoad: function(o) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    toUserAgreement: function() {
        wx.navigateTo({
            url: "/pages/webview/webview?title=华为消费者业务隐私声明&url=https://hwid1.vmall.com/CAS/portal/agreements/userPrivacyPolicy/zh-cn_userPrivacyPolicy.html&comeFrom=privacyProtocol"
        });
    }
});