getApp();

Page({
    data: {
        datas: {}
    },
    onLoad: function(t) {
        var a = this;
        console.log(t), a.setData({
            datas: t
        });
    },
    sendCode: function() {
        var t = this;
        console.log(111);
        var a = 60;
        t.setData({
            btntext: "60s后重新发送"
        });
        var n = setInterval(function() {
            t.setData({
                btntext: --a + "s后重新获取"
            }), -1 == a && (clearInterval(n), t.setData({
                btntext: "获取验证码",
                disabled: !1
            }));
        }, 1e3);
    },
    goInformation: function() {
        wx.navigateTo({
            url: "/pages/vip/information/information"
        });
    },
    onShow: function() {}
});