var e = require("../../../75803BF22546F6CF13E653F5D7E4B753.js"), t = /^1\d{10}$/, a = /^\d{6}$/, o = getApp();

Page({
    data: {
        loadlayer: !0,
        canChange: !1,
        canClick: !0,
        mobileIs: !1,
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
        kongge_phones: ""
    },
    onLoad: function(e) {
        console.log(e.type);
        new o.WeToast();
    },
    userAuthentication: function() {
        var e = this, n = wx.getStorageSync("userid"), s = e.data.name, i = e.data.code, l = e.data.kongge_phone, g = e.data.kongge_phones;
        return console.log(4545, l.replace(/\s/g, "")), console.log("用户id", n), console.log("用户名", s), 
        console.log("用户电话", l), console.log("code", i), e.data.name.replace(/\s/g, "").length < 2 || e.data.name.replace(/\s/g, "").length > 20 ? (e.wetoast.toast({
            title: "您输入的姓名有误",
            duration: 2e3
        }), !1) : g.replace(/\s/g, "").length <= 0 ? (e.wetoast.toast({
            title: "您输入的身份证号有误",
            duration: 2e3
        }), !1) : t.test(l.replace(/\s/g, "")) ? a.test(e.data.code) ? (e.setData({
            phone: l.replace(/\s/g, "")
        }), wx.showLoading({
            title: "信息保存中",
            mask: !0
        }), void o.getHttpData(o.myCenter_userAuthentication, {
            id: n,
            realname: e.data.name,
            mobile: l.replace(/\s/g, ""),
            cardId: g.replace(/\s/g, ""),
            verificationCode: e.data.code
        }, "PUT", function(t) {
            if (console.log("保存信息返回", t), 200 == t.code) {
                wx.hideLoading(), console.log(e.data.canChange), e.data.canChange ? e.wetoast.toast({
                    title: "修改成功",
                    duration: 2e3
                }) : e.wetoast.toast({
                    title: "认证成功",
                    duration: 2e3
                });
                var a = o.getUserinfoData();
                a.IsVerification = !0, e.setData({
                    identity: 1
                }), o.setUserinfoData(a), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 2e3);
            } else wx.hideLoading(), t.msg && e.wetoast.toast({
                title: t.msg,
                duration: 2e3
            });
        })) : (e.wetoast.toast({
            title: "您输入的验证码有误",
            duration: 2e3
        }), !1) : (e.wetoast.toast({
            title: "您输入的手机号码有误",
            duration: 2e3
        }), !1);
    },
    formSubmit: function(e) {
        console.log(e);
        var n = this, s = wx.getStorageSync("userid"), i = e.detail.value.name, l = e.detail.value.phone, g = e.detail.value.idNumber, c = e.detail.value.code;
        return console.log("name", i), console.log("phone", l), console.log("idNumber", g), 
        console.log("code", c), i.replace(/\s/g, "").length < 2 || i.replace(/\s/g, "").length > 20 ? (n.wetoast.toast({
            title: "您输入的姓名有误",
            duration: 2e3
        }), !1) : g.replace(/\s/g, "").length <= 0 ? (n.wetoast.toast({
            title: "您输入的身份证号有误",
            duration: 2e3
        }), !1) : t.test(l.replace(/\s/g, "")) ? a.test(c) ? (n.setData({
            phone: l.replace(/\s/g, "")
        }), wx.showLoading({
            title: "信息保存中",
            mask: !0
        }), void o.getHttpData(o.myCenter_userAuthentication, {
            id: s,
            realname: i,
            mobile: l.replace(/\s/g, ""),
            cardId: g.replace(/\s/g, ""),
            verificationCode: n.data.code
        }, "PUT", function(e) {
            if (console.log("保存信息返回", e), 200 == e.code) {
                wx.hideLoading(), n.data.canChange ? n.wetoast.toast({
                    title: "修改成功",
                    duration: 2e3
                }) : n.wetoast.toast({
                    title: "认证成功",
                    duration: 2e3
                });
                var t = o.getUserinfoData();
                t.IsVerification = !0, n.setData({
                    identity: 1
                }), o.setUserinfoData(t), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 2e3);
            } else wx.hideLoading(), e.msg && n.wetoast.toast({
                title: e.msg,
                duration: 2e3
            });
        })) : (n.wetoast.toast({
            title: "您输入的验证码有误",
            duration: 2e3
        }), !1) : (n.wetoast.toast({
            title: "您输入的手机号码有误",
            duration: 2e3
        }), !1);
    },
    goChangePhone: function() {
        wx.navigateTo({
            url: "/pages/user/changePhone/changePhone?phone=" + this.data.kongge_phone
        });
    },
    getPhone: function(e) {
        console.log(e), this.setData({
            phone: e.detail.value
        });
    },
    getIdNumber: function(e) {
        this.setData({
            idNumber: e.detail.value
        });
    },
    getCode: function(e) {
        this.setData({
            code: e.detail.value
        });
    },
    sendCode: function() {
        var a = this;
        if (a.data.canClick) {
            a.setData({
                canClick: !1
            });
            var n = a.data.sec, s = a.data.kongge_phone;
            if (console.log(4545, s.replace(/\s/g, "")), !t.test(s.replace(/\s/g, ""))) return a.wetoast.toast({
                title: "您输入的手机号码有误",
                duration: 2e3
            }), a.setData({
                canClick: !0
            }), !1;
            a.setData({
                phone: s.replace(/\s/g, "")
            }), o.getHttpData(o.myCenter_userCodeSend, {
                type: 3,
                phone: a.data.phone
            }, "GET", function(t) {
                console.log("验证码发送", t), 200 == t.code ? (a.wetoast.toast({
                    title: "发送成功",
                    duration: 2e3
                }), e.getCode(a, n)) : (a.setData({
                    canClick: !0
                }), t.msg && a.wetoast.toast({
                    title: t.msg,
                    duration: 2e3
                }));
            });
        }
    },
    kongge_string: function(e) {
        for (var t = e.replace(/\s*/g, ""), a = [], o = 0; o < t.length; o++) 3 == o || 7 == o ? a.push(" " + t.charAt(o)) : a.push(t.charAt(o));
        t = a.join(""), this.setData({
            kongge_phone: t
        });
    },
    kongge_strings: function(e) {
        for (var t = e.replace(/\s*/g, ""), a = [], o = 0; o < t.length; o++) 3 == o || 6 == o || 10 == o || 14 == o ? a.push(" " + t.charAt(o)) : a.push(t.charAt(o));
        t = a.join(""), this.setData({
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
    onShow: function() {
        var e = this, t = o.getUserinfoData();
        setTimeout(function() {
            e.setData({
                loadlayer: !1
            });
        }, 500), console.log("用户信息", t), console.log("是否认证", t.isVerification), e.setData({
            userInfo: t
        }), t && (t.isVerification ? (console.log(111), e.kongge_string(t.mobile), e.kongge_strings(t.cardId), 
        e.setData({
            identity: 1,
            name: t.realname
        })) : (console.log(222), e.setData({
            identity: 2
        }), t.mobile && (e.setData({
            mobileIs: !0
        }), this.kongge_string(t.mobile))));
    }
});