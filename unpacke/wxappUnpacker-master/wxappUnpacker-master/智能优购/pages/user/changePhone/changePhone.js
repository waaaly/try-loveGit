var e = require("../../../75803BF22546F6CF13E653F5D7E4B753.js"), t = /^1\d{10}$/, n = /^\d{6}$/, a = getApp();

Page({
    data: {
        canClick: !0,
        noChangeMobile: !1,
        isShowX: 3,
        shareId: "",
        isClick: !0,
        noClickSeleted: !0,
        btnType: "",
        isCanEdit: "0",
        userInfo: "",
        identity: "",
        btntext: "获取验证码",
        isShow: !1,
        sec: "60",
        phone: "",
        code: "",
        idNumber: "",
        name: "",
        kongge_phone: "",
        kongge_phones: "",
        errType: "您输入的手机号码有误，请重新输入",
        lastUrl: null
    },
    onLoad: function(e) {
        var t = this;
        e.phone && t.setData({
            kongge_phone: e.phone
        });
    },
    userAuthentication: function() {
        var e = this;
        if (e.data.isClick) {
            e.setData({
                isClick: !1
            });
            var o = wx.getStorageSync("userid"), i = (e.data.code, e.data.kongge_phone);
            e.data.kongge_phones;
            if (!t.test(i.replace(/\s/g, ""))) return wx.showToast({
                title: "您输入的手机号码有误",
                duration: 2e3,
                icon: "none",
                mask: !0
            }), e.setData({
                isClick: !0
            }), !1;
            if (!n.test(e.data.code)) return wx.showToast({
                title: "您输入的验证码有误",
                duration: 2e3,
                icon: "none",
                mask: !0
            }), e.setData({
                isClick: !0
            }), !1;
            e.setData({
                phone: i.replace(/\s/g, "")
            }), wx.showLoading({
                title: "认证手机号中",
                mask: !0
            }), a.getHttpData(a.myCenter_VerificationCode, {
                id: o,
                mobile: i.replace(/\s/g, ""),
                verificationCode: e.data.code
            }, "post", function(t) {
                if (200 == t.code) {
                    e.setData({
                        code: "",
                        isShow: !1
                    });
                    var n = getCurrentPages();
                    n[n.length - 2].setData({
                        canChange: !0
                    }), setTimeout(function() {
                        wx.hideLoading(), wx.navigateBack({});
                    }, 2e3);
                } else wx.hideLoading(), t.msg && (wx.showToast({
                    title: t.msg,
                    duration: 2e3,
                    icon: "none",
                    mask: !0
                }), e.setData({
                    isClick: !0
                }));
            });
        }
    },
    getPhone: function(e) {
        console.log(e), this.setData({
            phone: e.detail.value
        });
    },
    getCode: function(e) {
        this.setData({
            code: e.detail.value
        });
    },
    sendCode: function() {
        var n = this;
        if (n.data.canClick) {
            n.setData({
                canClick: !1
            });
            var o = n.data.sec, i = n.data.kongge_phone;
            if (!t.test(i.replace(/\s/g, ""))) return wx.showToast({
                title: "您输入的手机号码有误",
                duration: 2e3,
                icon: "none",
                mask: !0
            }), n.setData({
                canClick: !0
            }), !1;
            n.setData({
                phone: i.replace(/\s/g, "")
            }), a.getHttpData(a.myCenter_userCodeSend, {
                type: 3,
                phone: n.data.phone
            }, "GET", function(t) {
                console.log("验证码发送", t), 200 == t.code ? (wx.showToast({
                    title: "发送成功",
                    duration: 2e3,
                    icon: "none",
                    mask: !0
                }), e.getCode(n, o)) : (n.setData({
                    canClick: !0
                }), t.msg && wx.showToast({
                    title: t.msg,
                    duration: 2e3,
                    icon: "none",
                    mask: !0
                }));
            });
        }
    },
    kongge_string: function(e) {
        for (var t = (e += "").replace(/\s*/g, ""), n = [], a = 0; a < t.length; a++) 3 == a || 7 == a ? n.push(" " + t.charAt(a)) : n.push(t.charAt(a));
        t = n.join(""), this.setData({
            kongge_phone: t
        });
    },
    kongge_strings: function(e) {
        for (var t = (e += "").replace(/\s*/g, ""), n = [], a = 0; a < t.length; a++) 3 == a || 6 == a || 10 == a || 14 == a ? n.push(" " + t.charAt(a)) : n.push(t.charAt(a));
        t = n.join(""), this.setData({
            kongge_phones: t
        });
    },
    top_phone_input: function(e) {
        var t = e.detail.value;
        console.log(t), this.kongge_string(t);
    },
    top_phone_inputs: function(e) {
        var t = e.detail.value;
        console.log(t), this.kongge_strings(t);
    },
    onShow: function() {},
    onHide: function() {
        this.setData({
            sec: 60,
            isClick: !0
        });
    }
});