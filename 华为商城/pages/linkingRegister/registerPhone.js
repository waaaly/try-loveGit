var t = getApp(), e = t.globalData.mp, a = t.globalData.config, o = require("../../plugins/xmldom/dom-parser"), n = {
    HmacSHA256: require("../../plugins/crypto-js/hmac-sha256.js"),
    enc: {
        Hex: require("../../plugins/crypto-js/enc-hex.js")
    }
};

Page({
    data: {
        array: [ "+86(中国)" ],
        index: 0,
        disabled: !0,
        phone: "",
        smsCode: "",
        pwd: "",
        getSMSText: "获取验证码",
        getSMSClass: "upA",
        passwordFocus: !1,
        confirmFocus: !1,
        eyePasswordShow: !1,
        eyeConfirmShow: !0,
        showPassword: !1,
        showConfirm: !1,
        toastState: !1,
        toastCont: ""
    },
    onLoad: function(t) {
        this.setData({
            eyePasswordShow: !1,
            eyeConfirmShow: !1
        }), 1 == this.data.array.length && this.setData({
            disabled: !0
        });
    },
    onUnload: function() {},
    bindPickerChange: function(t) {
        this.setData({
            index: t.detail.value
        });
    },
    toEmail: function() {
        wx.navigateTo({
            url: "/pages/linkingRegister/registerEmail"
        });
    },
    toRegisterRule: function() {
        wx.navigateTo({
            url: "/pages/linkingRegister/registerRule"
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
        var n = '<?xml version="1.0" encoding="UTF-8"?><SMSAuthCodeReq><version>12011</version><accountType>2</accountType><userAccount>' + t.data.phone + "</userAccount><languageCode>zh-CN</languageCode><reqClientType>2025</reqClientType><smsReqType>4</smsReqType><mobilePhone>" + t.data.phone + "</mobilePhone><plmn>00000</plmn></SMSAuthCodeReq >";
        t.countDown(), e.mpPostForUP(a.service.upDomain + "/AccountServer/IUserInfoMng/getSMSAuthCode", n, {
            successFunc: function(t) {
                var e = new o.DOMParser().parseFromString(t.data).getElementsByTagName("result"), a = e.length > 0 ? e[0].getAttribute("resultCode") : "";
                if ("0" == a) ; else {
                    var n = "验证码发送失败请重试!";
                    "70001201" == a && (n = "无效的用户帐号"), "70002002" == a && (n = "该用户已存在"), wx.showModal({
                        title: "提示",
                        content: n,
                        showCancel: !1
                    });
                }
            }
        });
    },
    setPhone: function(t) {
        this.setData({
            phone: t.detail.value
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
    setSMSCode: function(t) {
        this.setData({
            smsCode: t.detail.value
        });
    },
    countDown: function(t) {
        var e = this;
        if ("upA disabled" == e.data.getSMSClass) return !1;
        var a = 60, o = setInterval(function() {
            if (0 == a) return e.setData({
                getSMSText: "获取验证码",
                getSMSClass: "upA"
            }), clearInterval(o), o = null, !1;
            e.setData({
                getSMSText: "获取验证码（" + a + "）",
                getSMSClass: "upA disabled"
            }), a--;
        }, 1e3);
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
    },
    toRegisterPassword: function() {
        var a = this;
        if (!a.data.phone) return a.setData({
            toastState: !0,
            toastCont: "请输入手机号码"
        }), setTimeout(function() {
            a.setData({
                toastState: !1
            });
        }, 3e3), !1;
        if (!/^[1-9]\d*$/.test(a.data.phone) || a.data.phone.length < 11) return a.setData({
            toastState: !0,
            toastCont: "请输入正确手机号码"
        }), setTimeout(function() {
            a.setData({
                toastState: !1
            });
        }, 3e3), !1;
        if (!a.data.smsCode) return a.setData({
            toastState: !0,
            toastCont: "请输入短信验证码"
        }), setTimeout(function() {
            a.setData({
                toastState: !1
            });
        }, 3e3), !1;
        if (!a.data.pwd) return a.setData({
            toastState: !0,
            toastCont: "请输入密码"
        }), setTimeout(function() {
            a.setData({
                toastState: !1
            });
        }, 3e3), !1;
        if (a.data.pwd.length < 8) return a.setData({
            toastState: !0,
            toastCont: "密码长度不能小于8位"
        }), setTimeout(function() {
            a.setData({
                toastState: !1
            });
        }, 3e3), !1;
        if (/^[A-Za-z]+$/.test(a.data.pwd) || /^[1-9]\d*$/.test(a.data.pwd)) return a.setData({
            toastState: !0,
            toastCont: "密码必须包含字母、数字、符号中至少2种"
        }), setTimeout(function() {
            a.setData({
                toastState: !1
            });
        }, 3e3), !1;
        if (a.data.pwd != a.data.pwd2) return a.setData({
            toastState: !0,
            toastCont: "密码不一致"
        }), setTimeout(function() {
            a.setData({
                toastState: !1
            });
        }, 3e3), !1;
        var o = {}, n = wx.getStorageSync("upuuid") || "", s = wx.getStorageSync("uuidEncode") || "";
        n && s ? (o.uuid = n, o.uuidEncode = s, a.setData({
            encodeInfo: o
        }), e.encryptAESCBC(t, "", a.data.pwd, function(t) {
            o.pwd = t.ivbyte + ":" + t.context, a.setData({
                encodeInfo: o
            }), a.phoneRegister(o);
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
    phoneRegister: function(t) {
        var n = this, s = '<?xml version="1.0" encoding="UTF-8" ?><RegisterCloudAccountReq><version>12011</version><accountType>2</accountType><password>' + t.pwd + "</password><userAccount>" + n.data.phone + "</userAccount><authCode>" + n.data.smsCode + '</authCode><reqClientType>2025</reqClientType><agrVers size="3"><AgrVer><id>0</id><siteC>1-CN</siteC><ver>1.04</ver></AgrVer><AgrVer><id>2</id><siteC>1-CN</siteC><ver>1.04</ver></AgrVer><AgrVer><id>12</id><siteC>1-CN</siteC><ver>12011</ver></AgrVer></agrVers><deviceInfo><deviceType>6</deviceType><deviceID>' + t.uuid + "</deviceID><terminalType>unknown</terminalType></deviceInfo><languageCode>zh-CN</languageCode><countryCode>CN</countryCode><uuid>" + t.uuidEncode + "</uuid></RegisterCloudAccountReq>";
        e.mpPostForUP(a.service.upDomain + "/AccountServer/IUserInfoMng/registerCloudAccount", s, {
            successFunc: function(e) {
                var a = new o.DOMParser().parseFromString(e.data).getElementsByTagName("result"), s = a.length > 0 ? a[0].getAttribute("resultCode") : "";
                if ("0" == s) n.loginHWAccount(t); else {
                    var r = "注册失败请重试!";
                    "70001201" == s && (r = "无效的用户帐号"), "70002002" == s && (r = "该用户已存在"), "70002070" == s && (r = "密码过于简单"), 
                    "70002039" == s && (r = "短信验证码无效"), wx.showModal({
                        title: "提示",
                        content: r,
                        showCancel: !1
                    });
                }
            }
        }, {
            "content-type": "text/html;charset=utf-8"
        });
    },
    loginHWAccount: function(t) {
        var o = this, n = "acT=0&ac=" + o.data.phone + "&pw=" + t.pwd + "&dvT=6&dvID=" + t.uuid + "&tmT=unknown&clT=26&app=com.vmall.client&ver=12011&uuid=" + t.uuidEncode + "&dS=0";
        e.mpPostForUP(a.service.upDomain + "/AccountServer/IUserInfoMng/loginV2", n, {
            successFunc: function(t) {
                var a = e.urlParamToObject(t.data);
                if (a.cookie = t.header["Set-Cookie"] || t.header["set-cookie"], "0" == a.resultCode) o.bindHWAccount(a); else {
                    var n = "帐号绑定失败请重试!";
                    "70001201" == resultCode && (n = "无效的用户帐号"), wx.showModal({
                        title: "提示",
                        content: n,
                        showCancel: !1
                    });
                }
            }
        }, {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8"
        });
    },
    bindHWAccount: function(t) {
        var s = this, r = "<BindThird2AcctReq><version>12011</version><userID>" + t.userID + "</userID><reqClientType>2025</reqClientType><accountType>22</accountType><userAccount>" + wx.getStorageSync("thirdOpenID") + "</userAccount><thirdAccessToken>" + wx.getStorageSync("thirdAccessToken") + "</thirdAccessToken><thirdOpenID>" + wx.getStorageSync("thirdOpenID") + "</thirdOpenID><password>" + s.data.encodeInfo.pwd + "</password></BindThird2AcctReq>", i = e.mpFormatTime(new Date()) + ":" + e.getRandom(999999999, 1e8), u = t.TGC, c = i + ":bindThird2Acct", d = n.HmacSHA256(c, u).toString(n.enc.Hex).toUpperCase();
        e.mpPostForUP(a.service.upDomain + "/AccountServer/IUserInfoMng/bindThird2Acct", r, {
            successFunc: function(t) {
                var n = new o.DOMParser().parseFromString(t.data), s = n.getElementsByTagName("result"), r = n.getElementsByTagName("userID").length > 0 ? n.getElementsByTagName("userID")[0].firstChild.nodeValue : "";
                if ("0" == (s.length > 0 ? s[0].getAttribute("resultCode") : "")) {
                    e.mpGet(a.service.openApiDomain + "/mcp/account/mpBindUpAccount", {
                        mpUid: r
                    }, {
                        successFunc: function(t) {}
                    });
                    var i = e.mpGetIndexByPages(getCurrentPages());
                    wx.showModal({
                        title: "提示",
                        content: "帐号绑定成功!",
                        success: function(t) {
                            t.confirm && (wx.setStorageSync("needReLoad", !0), "personal" == i.flag ? wx.switchTab({
                                url: "/pages/personal/personal"
                            }) : "orderConfirm" != i.flag && "IntegrationCenter" != i.flag && "inviteGift" != i.flag || wx.navigateBack({
                                delta: getCurrentPages().length - 1 - i.index
                            }));
                        }
                    });
                } else wx.showModal({
                    title: "提示",
                    content: "绑定失败，请稍后重试",
                    showCancel: !1
                });
            }
        }, {
            Authorization: "user=" + t.userID + ",nonce=" + i + ",response=" + d,
            Cookie: t.cookie.split(";")[0]
        });
    }
});