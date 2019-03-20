App({
    globalData: {
        mp: require("/utils/util.js"),
        config: require("VmallConfig.js"),
        userInfo: null,
        defaultUserInfo: {
            nickName: "",
            avatarUrl: "../../pages/personal/imgs/icon-notAuth.png"
        },
        authorizeWords: {
            title: "欢迎来到华为商城",
            content: "请授权登录，获得完整购物体验"
        },
        paySuccess: !1,
        loginTimeOut: 3e3,
        userLoginStatus: 0
    },
    onLaunch: function(e) {
        var t = this, a = this.globalData.mp.keepIndexTipsState();
        wx.clearStorageSync();
        var n = wx.getStorageSync("logs") || [];
        n.unshift(Date.now()), wx.setStorageSync("logs", n), wx.setStorageSync("prdTipsHide", a.prdTipsHide), 
        wx.setStorageSync("maskGuideHide", a.maskGuideHide), wx.setStorageSync("isTipsHadShow", a.isTipsHadShow), 
        wx.setStorageSync("authorizeUserInfo", a.authorizeUserInfo);
        var o = wx.getStorageSync("authorizeUserInfo");
        t.globalData.userInfo = o && "undefined" != o ? o : null;
    },
    userInfoReadyCallback: function(e) {
        var t = getCurrentPages();
        t[t.length - 1].route;
    }
});