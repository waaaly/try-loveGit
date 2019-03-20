var e = require("../../../75803BF22546F6CF13E653F5D7E4B753.js"), t = /^[0-9a-zA-Z]{8}$/, a = /^1\d{10}$/, o = /^\d{6}$/, i = getApp();

Page({
    data: {
        userType: "",
        canClick: !0,
        noChangeMobile: !1,
        isShowX: 3,
        shareId: "",
        isClick: !1,
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
        console.log(0xa1b01d4b1c7, !a.test("14781888649"));
        var t = i.getshareid();
        wx.setStorageSync("pageShareId", t), console.log(e.type);
        var o = this;
        e.type && (o.setData({
            lastUrl: e.type
        }), console.log(o.data.lastUrl)), new i.WeToast();
    },
    clearData: function() {
        this.setData({
            inviteNumber: "",
            inviterName: "",
            btnType: 1
        });
    },
    userAuthentication: function() {
        console.log("qwe", this.data.lastUrl);
        var e = this, t = wx.getStorageSync("userid"), n = e.data.name, s = e.data.code, r = e.data.kongge_phone;
        e.data.kongge_phones;
        if (console.log(4545, r.replace(/\s/g, "")), console.log("用户id", t), console.log("用户名", n), 
        console.log("用户电话", r), console.log("code", s), !a.test(r.replace(/\s/g, ""))) return e.wetoast.toast({
            title: "您输入的手机号码有误",
            duration: 2e3
        }), !1;
        if (!o.test(e.data.code)) return e.wetoast.toast({
            title: "您输入的验证码有误",
            duration: 2e3
        }), !1;
        if (0 == e.data.shareId && e.data.userType <= 0) return e.wetoast.toast({
            title: "邀请人不能为空",
            duration: 2e3
        }), !1;
        e.setData({
            phone: r.replace(/\s/g, "")
        }), wx.showLoading({
            title: "信息保存中",
            mask: !0
        });
        var l = "/" + e.data.code, d = {
            id: t,
            mobile: r.replace(/\s/g, ""),
            verificationCode: e.data.code
        };
        console.log(d), console.log(l), i.getHttpData(i.app_user_AppRegistAuthentications + l, {
            id: t,
            mobile: r.replace(/\s/g, ""),
            verificationCode: e.data.code,
            shareId: e.data.shareId
        }, "post", function(t) {
            if (console.log("保存信息返回", t), 200 == t.code) {
                wx.hideLoading(), e.wetoast.toast({
                    title: "认证成功",
                    duration: 2e3
                });
                var a = i.getUserinfoData();
                if (a.IsVerification = !0, e.setData({
                    identity: 1
                }), i.setUserinfoData(a), null != e.data.lastUrl) switch (e.data.lastUrl) {
                  case "1":
                    setTimeout(function() {
                        wx.switchTab({
                            url: "/pages/index/index/index"
                        });
                    }, 2e3);
                    break;

                  case "2":
                    setTimeout(function() {
                        wx.switchTab({
                            url: "/pages/vip/vipIndex/vip"
                        });
                    }, 2e3);
                    break;

                  case "3":
                    setTimeout(function() {
                        wx.switchTab({
                            url: "/pages/user/order/order"
                        });
                    }, 2e3);
                    break;

                  case "4":
                    setTimeout(function() {
                        wx.switchTab({
                            url: "/pages/user/index/index"
                        });
                    }, 2e3);
                    break;

                  case "5":
                    setTimeout(function() {
                        wx.switchTab({
                            url: "/pages/vip/giftBuy/giftBuy"
                        });
                    }, 2e3);
                    break;

                  default:
                    e.data.lastUrl;
                    setTimeout(function() {
                        wx.reLaunch({
                            url: "/pages/shop/content/content?id=" + e.data.lastUrl
                        });
                    }, 2e3);
                } else setTimeout(function() {
                    wx.switchTab({
                        url: "/pages/index/index/index"
                    });
                }, 2e3);
            } else wx.hideLoading(), t.msg && e.wetoast.toast({
                title: t.msg,
                duration: 2e3
            });
        });
    },
    seleted: function() {},
    getName: function(e) {
        this.setData({
            name: e.detail.value
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
        var t = this;
        if (t.data.canClick) {
            t.setData({
                canClick: !1
            });
            var o = t.data.sec, n = t.data.kongge_phone;
            if (console.log(4545, n.replace(/\s/g, "")), !a.test(n.replace(/\s/g, ""))) return t.wetoast.toast({
                title: "您输入的手机号码有误",
                duration: 2e3
            }), t.setData({
                canClick: !0
            }), !1;
            t.setData({
                phone: n.replace(/\s/g, "")
            }), i.getHttpData(i.myCenter_userCodeSend, {
                type: 3,
                phone: t.data.phone
            }, "GET", function(a) {
                console.log("验证码发送", a), 200 == a.code ? (t.wetoast.toast({
                    title: "发送成功",
                    duration: 2e3
                }), e.getCode(t, o)) : (t.setData({
                    canClick: !0
                }), a.msg && t.wetoast.toast({
                    title: a.msg,
                    duration: 2e3
                }));
            });
        }
    },
    kongge_string: function(e) {
        for (var t = (e += "").replace(/\s*/g, ""), a = [], o = 0; o < t.length; o++) 3 == o || 7 == o ? a.push(" " + t.charAt(o)) : a.push(t.charAt(o));
        t = a.join(""), this.setData({
            kongge_phone: t
        });
    },
    kongge_strings: function(e) {
        for (var t = (e += "").replace(/\s*/g, ""), a = [], o = 0; o < t.length; o++) 3 == o || 6 == o || 10 == o || 14 == o ? a.push(" " + t.charAt(o)) : a.push(t.charAt(o));
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
    getInviteNumber: function(e) {
        var t = this;
        t.setData({
            inviteNumber: e.detail.value,
            isClick: !1,
            shareId: 0
        }), 8 == e.detail.value.length ? t.setData({
            isShowX: 2
        }) : t.setData({
            isShowX: 1
        });
    },
    getInviterName: function() {},
    onShow: function() {
        var e = this;
        e.getShareUserInfo();
        var t = i.getUserinfoData();
        console.log("用户信息", t), console.log("是否认证", t.isVerification), e.setData({
            userInfo: t
        }), t && (t.isVerification ? (console.log(111), this.kongge_string(t.mobile), this.kongge_strings(t.cardId), 
        e.setData({
            identity: 1,
            name: t.realname
        })) : (console.log(222), e.setData({
            identity: 2
        })));
    },
    getShareUserInfo: function() {
        var e = this;
        console.log("分享者id", i.getshareid()), i.getHttpData(i.myCenter_getagentanduserinfo, {
            shareId: wx.getStorageSync("pageShareId")
        }, "get", function(t) {
            if (console.log("保存信息返回", t), 200 == t.code) {
                if (console.log(t), t.data.mobile > 0) {
                    var a = t.data.mobile;
                    e.kongge_string(a), console.log(0xa1b01d4b1c7), e.setData({
                        kongge_phones: t.data.mobile,
                        noChangeMobile: !0
                    });
                }
                t.data.shareId > 0 && e.setData({
                    isClick: !0,
                    shareId: t.data.shareId
                }), 8 == t.data.inviteCode.length && e.setData({
                    isShowX: 1
                }), console.log(t.data.shareUserName), e.setData({
                    isCanEdit: t.data.isCanEdit,
                    inviteNumber: t.data.inviteCode,
                    inviterName: t.data.shareUserName,
                    userType: t.data.userType
                }), t.data.userType > 0 && e.setData({
                    isClick: !0,
                    shareId: 0
                });
            } else t.msg && e.wetoast.toast({
                title: t.msg,
                duration: 2e3
            });
        });
    },
    lookUser: function() {
        var e = this, a = e.data.inviteNumber;
        if (!t.test(a)) return wx.showToast({
            title: "邀请码格式不正确",
            icon: "none",
            mask: !0
        }), !1;
        e.data.noClickSeleted && (e.setData({
            noClickSeleted: !1
        }), wx.showLoading({
            title: "查询中",
            mask: !0
        }), i.getHttpData(i.myCenter_IsInvitationCodeEnable, {
            invitationCode: e.data.inviteNumber
        }, "GET", function(t) {
            console.log(t), 200 == t.code ? (e.setData({
                inviterName: t.data.shareUserName,
                inviteNumber: t.data.inviteCode,
                shareId: t.data.shareId
            }), e.setData({
                noClickSeleted: !0,
                isClick: !0
            }), wx.hideLoading()) : (wx.hideLoading(), e.setData({
                noClickSeleted: !0,
                inviterName: ""
            }), t.msg ? wx.showToast({
                title: t.msg,
                icon: "none",
                mask: !0,
                duration: 2e3
            }) : wx.showToast({
                title: "未知错误",
                icon: "none",
                mask: !0,
                duration: 2e3
            }));
        }));
    }
});