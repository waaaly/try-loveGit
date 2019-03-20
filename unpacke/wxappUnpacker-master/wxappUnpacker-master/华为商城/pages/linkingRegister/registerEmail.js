function t(t) {
    return !!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(t);
}

var e = getApp(), a = e.globalData.mp, s = require("../../plugins/xmldom/dom-parser"), o = e.globalData.config;

Page({
    data: {
        array: [ "+86(中国)" ],
        index: 0,
        disabled: !0,
        passwordFocus: !1,
        confirmFocus: !1,
        eyePasswordShow: !1,
        eyeConfirmShow: !0,
        showPassword: !1,
        showConfirm: !1,
        toastState: !1,
        toastCont: "",
        mail: "",
        pwd: "",
        pwd2: "",
        phone: "",
        smsCode: "",
        getSMSText: "获取验证码",
        getSMSClass: "upA"
    },
    onLoad: function(t) {
        this.setData({
            eyePasswordShow: !1,
            eyeConfirmShow: !1
        }), 1 == this.data.array.length && this.setData({
            disabled: !0
        });
    },
    setMail: function(t) {
        this.setData({
            mail: t.detail.value
        });
    },
    setPwd: function(t) {
        this.setData({
            pwd: t.detail.value
        });
    },
    setPwd2: function(t) {
        this.setData({
            pwd2: t.detail.value
        });
    },
    setPhone: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    setSMSCode: function(t) {
        this.setData({
            smsCode: t.detail.value
        });
    },
    getSMSAuthCode: function() {
        var t = this;
        if ("upA disabled" == t.data.getSMSClass) return !1;
        if (!t.data.phone) return t.setData({
            toastState: !0,
            toastCont: "请输入手机号码"
        }), setTimeout(function() {
            t.setData({
                toastState: !1
            });
        }, 3e3), !1;
        if (!/^[1-9]\d*$/.test(t.data.phone) || t.data.phone.length < 11) return t.setData({
            toastState: !0,
            toastCont: "请输入正确手机号码"
        }), setTimeout(function() {
            t.setData({
                toastState: !1
            });
        }, 3e3), !1;
        var e = '<?xml version="1.0" encoding="UTF-8"?><SMSAuthCodeReq><version>12011</version><accountType>6</accountType><userAccount>' + t.data.mail + "</userAccount ><languageCode>zh-CN</languageCode><reqClientType>2025</reqClientType><smsReqType>3</smsReqType><mobilePhone>" + t.data.phone + "</mobilePhone><plmn>00000</plmn></SMSAuthCodeReq >";
        t.countDown(), a.mpPostForUP(o.service.upDomain + "/AccountServer/IUserInfoMng/getSMSAuthCode", e, {
            successFunc: function(t) {
                var e = new s.DOMParser().parseFromString(t.data).getElementsByTagName("result"), a = e.length > 0 ? e[0].getAttribute("resultCode") : "";
                if ("0" == a) ; else {
                    var o = "验证码发送失败请重试!";
                    "70001201" == a && (o = "无效的用户帐号"), "70002002" == a && (o = "该用户已存在"), wx.showModal({
                        title: "提示",
                        content: o,
                        showCancel: !1
                    });
                }
            }
        });
    },
    countDown: function(t) {
        var e = this;
        if ("upA disabled" == e.data.getSMSClass) return !1;
        var a = 60, s = setInterval(function() {
            if (0 == a) return e.setData({
                getSMSText: "获取验证码",
                getSMSClass: "upA"
            }), clearInterval(s), s = null, !1;
            e.setData({
                getSMSText: "获取验证码（" + a + "）",
                getSMSClass: "upA disabled"
            }), a--;
        }, 1e3);
    },
    bindPickerChange: function(t) {
        this.setData({
            index: t.detail.value
        });
    },
    toPhone: function() {
        wx.navigateTo({
            url: "/pages/linkingRegister/registerPhone"
        });
    },
    toEmailVerify: function() {
        var s = this;
        if (!t(s.data.mail) || s.data.mail.length < 1) return s.setData({
            toastState: !0,
            toastCont: "请输入正确邮箱"
        }), setTimeout(function() {
            s.setData({
                toastState: !1
            });
        }, 3e3), !1;
        if (!s.data.pwd) return s.setData({
            toastState: !0,
            toastCont: "请输入密码"
        }), setTimeout(function() {
            s.setData({
                toastState: !1
            });
        }, 3e3), !1;
        if (s.data.pwd.length < 8) return s.setData({
            toastState: !0,
            toastCont: "密码长度不能小于8位"
        }), setTimeout(function() {
            s.setData({
                toastState: !1
            });
        }, 3e3), !1;
        if (/^[A-Za-z]+$/.test(s.data.pwd) || /^[1-9]\d*$/.test(s.data.pwd)) return s.setData({
            toastState: !0,
            toastCont: "密码必须包含字母、数字、符号中至少2种"
        }), setTimeout(function() {
            s.setData({
                toastState: !1
            });
        }, 3e3), !1;
        if (s.data.pwd != s.data.pwd2) return s.setData({
            toastState: !0,
            toastCont: "密码不一致"
        }), setTimeout(function() {
            s.setData({
                toastState: !1
            });
        }, 3e3), !1;
        if (s.data.phone) {
            if (!/^[1-9]\d*$/.test(s.data.phone) || s.data.phone.length < 11) return s.setData({
                toastState: !0,
                toastCont: "请输入正确手机号码"
            }), setTimeout(function() {
                s.setData({
                    toastState: !1
                });
            }, 3e3), !1;
            if (!s.data.smsCode) return s.setData({
                toastState: !0,
                toastCont: "请输入短信验证码"
            }), setTimeout(function() {
                s.setData({
                    toastState: !1
                });
            }, 3e3), !1;
        }
        var o = {}, n = wx.getStorageSync("upuuid") || "", i = wx.getStorageSync("uuidEncode") || "";
        n && i ? (o.uuid = n, o.uuidEncode = i, s.setData({
            encodeInfo: o
        }), a.encryptAESCBC(e, "", s.data.pwd, function(t) {
            o.pwd = t.ivbyte + ":" + t.context, s.setData({
                encodeInfo: o
            }), s.emailRegister(o);
        }, function() {
            wx.showModal({
                title: "提示",
                content: "出错了请稍后再试！",
                showCancel: !1
            });
        })) : wx.showModal({
            title: "提示",
            content: "出错了请稍后再试！",
            showCancel: !1
        });
    },
    emailRegister: function(t) {
        var e = this, n = "";
        e.data.phone && e.data.smsCode && (n = "<secAccountType>6</secAccountType><secAccount>" + e.data.phone + "</secAccount><secVerifyCode>" + e.data.smsCode + "</secVerifyCode>");
        var i = '<?xml version="1.0" encoding="UTF-8" ?><RegisterCloudAccountReq><version>12011</version><accountType>1</accountType><password>' + t.pwd + "</password><userAccount>" + e.data.mail + '</userAccount><reqClientType>2025</reqClientType><agrVers size="3"><AgrVer><id>0</id><siteC>1-CN</siteC><ver>1.04</ver></AgrVer><AgrVer><id>2</id><siteC>1-CN</siteC><ver>1.04</ver></AgrVer><AgrVer><id>12</id><siteC>1-CN</siteC><ver>12011</ver></AgrVer></agrVers><deviceInfo><deviceType>6</deviceType><deviceID>' + t.uuid + "</deviceID><terminalType>unknown</terminalType></deviceInfo><languageCode>zh-CN</languageCode><countryCode>CN</countryCode>" + n + "<uuid>" + t.uuidEncode + "</uuid></RegisterCloudAccountReq>";
        a.mpPostForUP(o.service.upDomain + "/AccountServer/IUserInfoMng/registerCloudAccount", i, {
            successFunc: function(a) {
                var o = new s.DOMParser().parseFromString(a.data).getElementsByTagName("result"), n = o.length > 0 ? o[0].getAttribute("resultCode") : "";
                if ("0" == n) wx.setStorageSync("mail", e.data.mail), wx.setStorageSync("pwd", t.pwd), 
                wx.setStorageSync("phone", e.data.phone), wx.setStorageSync("smsCode", e.data.smsCode), 
                wx.navigateTo({
                    url: "/pages/linkingRegister/registerEmailVerify"
                }); else {
                    var i = "注册失败请重试!";
                    "70001201" == n && (i = "无效的用户帐号"), "70002002" == n && (i = "该帐户已经存在"), "70002039" == n && (i = "验证码错误"), 
                    wx.showModal({
                        title: "提示",
                        content: i,
                        showCancel: !1
                    });
                }
            }
        }, {
            "content-type": "text/html;charset=utf-8"
        });
    },
    eyePasswordFocus: function() {
        this.setData({
            eyePasswordShow: !0
        });
    },
    eyePasswordBlur: function() {
        this.setData({
            eyePasswordShow: !1
        });
    },
    eyeConfirmFocus: function() {
        this.setData({
            eyeConfirmShow: !0
        });
    },
    eyeConfirmBlur: function() {
        this.setData({
            eyeConfirmShow: !1
        });
    },
    lookPassword: function(t) {
        1 == t.currentTarget.dataset.status ? this.setData({
            showPassword: !1,
            passwordFocus: !0
        }) : this.setData({
            showPassword: !0,
            passwordFocus: !0
        });
    },
    lookConfirm: function(t) {
        1 == t.currentTarget.dataset.status ? this.setData({
            showConfirm: !1,
            confirmFocus: !0
        }) : this.setData({
            showConfirm: !0,
            confirmFocus: !0
        });
    }
});