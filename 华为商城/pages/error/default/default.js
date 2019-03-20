var t = getApp();

t.globalData.mp, t.globalData.config;

Page({
    data: {
        toastState: !1,
        toastCont: "自定义toast组件"
    },
    onLoad: function(t) {
        this.setData({
            toastState: !0,
            toastCont: "手机号有误，请重新输入"
        });
    }
});