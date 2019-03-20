var a = getApp(), e = (a.globalData.mp, a.globalData.config);

Page({
    data: {
        paPath: e.service.webViewDomain + "/mcp/hwysxy.html"
    },
    onLoad: function() {},
    onShareAppMessage: function(a) {
        return {
            title: "华为隐私协议",
            path: "/pages/privacyAgreement/privacyAgreement"
        };
    }
});