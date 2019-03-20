var e = require("../../../75803BF22546F6CF13E653F5D7E4B753.js"), t = /^1\d{10}$/, o = /^\d{6}$/, n = getApp();

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
        var t = n.getUserinfoData();
        console.log(t);
        var o = this;
        e.phone && o.setData({
            kongge_phone: e.phone
        });
    },
    userAuthentication: function() {
        var e = this;
        if (e.data.isClick) {
            e.setData({
                isClick: !1
            });
            var a = wx.getStorageSync("userid"), i = (e.data.code, e.data.kongge_phone);
            e.data.kongge_phones;
            if (!t.test(i.replace(/\s/g, ""))) return wx.showToast({
                title: "您输入的手机号码有误",
                duration: 2e3,
                icon: "none",
                mask: !0
            }), e.setData({
                isClick: !0
            }), !1;
            if (!o.test(e.data.code)) return wx.showToast({
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
                title: "保存中",
                mask: !0
            }), n.getHttpData(n.myCenter_UpdateMobile, {
                id: a,
                mobile: i.replace(/\s/g, ""),
                verificationCode: e.data.code
            }, "post", function(t) {
                200 == t.code ? (wx.showToast({
                    title: "修改手机号成功",
                    icon: "none",
                    mask: !0,
                    duration: 2e3
                }), n.updataUserInfo(setTimeout(function() {
                    wx.navigateBack({
                        delta: 2
                    });
                }, 2e3))) : (wx.hideLoading(), t.msg && (wx.showToast({
                    title: t.msg,
                    duration: 2e3,
                    icon: "none",
                    mask: !0
                }), e.setData({
                    isClick: !0
                })));
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
        var o = this;
        if (o.data.canClick) {
            o.setData({
                canClick: !1
            });
            var a = o.data.sec, i = o.data.kongge_phone;
            if (!t.test(i.replace(/\s/g, ""))) return wx.showToast({
                title: "您输入的手机号码有误",
                duration: 2e3,
                icon: "none",
                mask: !0
            }), o.setData({
                canClick: !0
            }), !1;
            o.setData({
                phone: i.replace(/\s/g, "")
            }), n.getHttpData(n.myCenter_userCodeSend, {
                type: 3,
                phone: o.data.phone
            }, "GET", function(t) {
                console.log("验证码发送", t), 200 == t.code ? (wx.showToast({
                    title: "发送成功",
                    duration: 2e3,
                    icon: "none",
                    mask: !0
                }), e.getCode(o, a)) : (o.setData({
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
        for (var t = (e += "").replace(/\s*/g, ""), o = [], n = 0; n < t.length; n++) 3 == n || 7 == n ? o.push(" " + t.charAt(n)) : o.push(t.charAt(n));
        t = o.join(""), this.setData({
            kongge_phone: t
        });
    },
    kongge_strings: function(e) {
        for (var t = (e += "").replace(/\s*/g, ""), o = [], n = 0; n < t.length; n++) 3 == n || 6 == n || 10 == n || 14 == n ? o.push(" " + t.charAt(n)) : o.push(t.charAt(n));
        t = o.join(""), this.setData({
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
    onShow: function() {}
});