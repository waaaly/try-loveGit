new (require("../../../bases/page.js").JDPage)({
    data: {
        title: "",
        desc1: "",
        desc2: "",
        system: "",
        sdkVersion: ""
    },
    onLoad: function(s) {
        var e = s.system, t = void 0 === e ? "" : e, a = s.sdkVersion, i = void 0 === a ? "" : a;
        t ? this.setData({
            title: "手机系统版本过低",
            desc1: "您的手机系统版本过低，无法使用当前功能",
            desc2: '请前往"系统设置-通用-软件更新"进行更新',
            system: t
        }) : this.setData({
            title: "微信版本过低",
            desc1: "您的微信版本过低，无法使用当前功能",
            desc2: "请至APP STORE/各大应用市场进行更新",
            sdkVersion: i
        });
    },
    tapOnBtn: function() {
        wx.navigateBack();
    }
});