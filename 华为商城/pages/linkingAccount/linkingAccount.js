function e(e) {
    return !!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e);
}

var t = getApp(), a = t.globalData.mp, o = t.globalData.config, n = require("../../plugins/xmldom/dom-parser"), c = {
    HmacSHA256: require("../../plugins/crypto-js/hmac-sha256.js"),
    enc: {
        Hex: require("../../plugins/crypto-js/enc-hex.js")
    }
};

Page({
    data: {
        account: "",
        accountType: 1,
        userIcon: "",
        setAgree: !1,
        smsCode: "",
        pwd: "",
        encodeInfo: {},
        toastState: !1,
        toastCont: "",
        secondAuthTypeArray: [],
        secondAuthAccountTypeArray: [],
        secondAuthTypeIndex: 0,
        secondAuthShow: !1,
        secondAuthCode: "",
        getSMSText: "获取验证码",
        getSMSClass: "upA",
        loginCookie: ""
    },
    onLoad: function(e) {
        t.globalData.userInfo && t.globalData.userInfo.avatarUrl ? this.setData({
            userIcon: t.globalData.userInfo.avatarUrl
        }) : this.setData({
            userIcon: t.globalData.defaultUserInfo.avatarUrl
        });
    },
    goToRule: function() {
        wx.navigateTo({
            url: "/pages/AccountRule/AccountRule"
        });
    },
    setAccount: function(e) {
        this.setData({
            account: e.detail.value
        });
    },
    setPwd: function(e) {
        this.setData({
            pwd: e.detail.value
        });
    },
    setSecondAuthCode: function(e) {
        this.setData({
            secondAuthCode: e.detail.value
        });
    },
    closeSecondAuthDialog: function() {
        this.setData({
            secondAuthShow: !1
        });
    },
    setAgree: function(e) {
        this.setData({
            setAgree: !this.data.setAgree
        });
    },
    toUserAgreement: function() {
        wx.navigateTo({
            url: "/pages/accountAgreement/userProtocol"
        });
    },
    connectHWAccount: function() {
        var t = this;
        return "" == t.data.account ? (t.setData({
            toastState: !0,
            toastCont: "帐号不能为空"
        }), setTimeout(function() {
            t.setData({
                toastState: !1
            });
        }, 3e3), !1) : /^[1-9]\d*$/.test(t.data.account) || e(t.data.account) ? "" == t.data.pwd ? (t.setData({
            toastState: !0,
            toastCont: "密码不能为空"
        }), setTimeout(function() {
            t.setData({
                toastState: !1
            });
        }, 3e3), !1) : t.data.setAgree ? void (t.data.setAgree && "" != t.data.account && "" != t.data.pwd && t.loginHWAccount()) : (t.setData({
            toastState: !0,
            toastCont: "需同意用户协议"
        }), setTimeout(function() {
            t.setData({
                toastState: !1
            });
        }, 3e3), !1) : (t.setData({
            toastState: !0,
            toastCont: "请输入正确帐号"
        }), setTimeout(function() {
            t.setData({
                toastState: !1
            });
        }, 3e3), !1);
    },
    loginHWAccount: function() {
        var e = this, o = {}, n = wx.getStorageSync("upuuid") || "", c = wx.getStorageSync("uuidEncode") || "";
        n && c ? (o.uuid = n, o.uuidEncode = c, e.setData({
            encodeInfo: o
        }), a.encryptAESCBC(t, "", e.data.pwd, function(t) {
            o.pwd = t.ivbyte + ":" + t.context, e.setData({
                encodeInfo: o
            }), e.login();
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
    login: function() {
        var t = this, n = t.data.encodeInfo, c = "";
        /^[1-9]\d*$/.test(t.data.account) && 11 == t.data.account.length && (c = "acT=0", 
        t.setData({
            accountType: 2
        })), e(t.data.account) && (c = "acT=1", t.setData({
            accountType: 1
        }));
        var s = c + "&ac=" + t.data.account + "&pw=" + n.pwd + "&dvT=6&dvID=" + n.uuid + "&tmT=unknown&clT=26&app=com.vmall.client&ver=12011&uuid=" + n.uuidEncode + "&dS=0";
        a.mpPostForUP(o.service.upDomain + "/AccountServer/IUserInfoMng/loginV2", s, {
            successFunc: function(e) {
                var o = a.urlParamToObject(e.data);
                if (o.cookie = e.header["Set-Cookie"] || e.header["set-cookie"], "0" == o.resultCode) t.bindHWAccount(o); else if ("70002072" == o.resultCode || "70012072" == o.resultCode || "70002080" == o.resultCode) {
                    if (o.errorDesc) {
                        var n = JSON.parse(decodeURIComponent(o.errorDesc));
                        if (n.authCodeSentList && n.authCodeSentList.length > 0) {
                            var c = [], s = [];
                            n.authCodeSentList.forEach(function(e, t) {
                                c.push(e.name), s.push(e.accountType);
                            }), t.setData({
                                secondAuthTypeArray: c,
                                secondAuthAccountTypeArray: s,
                                secondAuthShow: !0,
                                loginCookie: o.cookie
                            });
                        }
                    }
                } else {
                    var u = "帐号关联失败请重试!";
                    "70001201" == o.resultCode && (u = "无效的用户帐号"), wx.showModal({
                        title: "提示",
                        content: u,
                        showCancel: !1
                    });
                }
            }
        }, {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
            Cookie: t.data.loginCookie.split(";")[0] + ";Path=/AccountServer/;HttpOnly"
        });
    },
    bindHWAccount: function(e) {
        var t = this, s = "<BindThird2AcctReq><version>12011</version><userID>" + e.userID + "</userID><reqClientType>2025</reqClientType><accountType>22</accountType><userAccount>" + wx.getStorageSync("thirdOpenID") + "</userAccount><thirdAccessToken>" + wx.getStorageSync("thirdAccessToken") + "</thirdAccessToken><thirdOpenID>" + wx.getStorageSync("thirdOpenID") + "</thirdOpenID><password>" + t.data.encodeInfo.pwd + "</password></BindThird2AcctReq>", u = a.mpFormatTime(new Date()) + ":" + a.getRandom(999999999, 1e8), r = e.TGC, i = u + ":bindThird2Acct", d = c.HmacSHA256(i, r).toString(c.enc.Hex).toUpperCase();
        a.mpPostForUP(o.service.upDomain + "/AccountServer/IUserInfoMng/bindThird2Acct", s, {
            successFunc: function(e) {
                var t = new n.DOMParser().parseFromString(e.data), c = t.getElementsByTagName("result"), s = t.getElementsByTagName("userID").length > 0 ? t.getElementsByTagName("userID")[0].firstChild.nodeValue : "";
                if ("0" == (c.length > 0 ? c[0].getAttribute("resultCode") : "")) {
                    a.mpGet(o.service.openApiDomain + "/mcp/account/mpBindUpAccount", {
                        mpUid: s
                    }, {
                        successFunc: function(e) {}
                    });
                    var u = a.mpGetIndexByPages(getCurrentPages());
                    wx.showModal({
                        title: "提示",
                        content: "帐号绑定成功!",
                        success: function(e) {
                            e.confirm && (wx.setStorageSync("needReLoad", !0), "personal" == u.flag ? wx.switchTab({
                                url: "/pages/personal/personal"
                            }) : "orderConfirm" != u.flag && "IntegrationCenter" != u.flag && "inviteGift" != u.flag || wx.navigateBack({
                                delta: getCurrentPages().length - 1 - u.index
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
            Authorization: "user=" + e.userID + ",nonce=" + u + ",response=" + d,
            Cookie: e.cookie.split(";")[0]
        });
    },
    bindAuthTypePickerChange: function(e) {
        this.setData({
            secondAuthTypeIndex: e.detail.value
        });
    },
    getSecondAuthCode: function() {
        var e = this;
        if ("upA disabled" == e.data.getSMSClass) return !1;
        var t = e.data.secondAuthTypeArray[e.data.secondAuthTypeIndex];
        if (-1 == t.indexOf("@")) {
            var c = '<?xml version="1.0" encoding="UTF-8"?><SMSAuthCodeReq><version>12011</version><mobilePhone>' + t + "</mobilePhone><smsReqType>6</smsReqType><languageCode>zh-CN</languageCode><reqClientType>26</reqClientType><accountType>" + e.data.accountType + "</accountType><userAccount>" + e.data.account + "</userAccount></SMSAuthCodeReq>";
            e.countDown(), a.mpPostForUP(o.service.upDomain + "/AccountServer/IUserInfoMng/getSMSCodeAfterAuth", c, {
                successFunc: function(e) {
                    var t = new n.DOMParser().parseFromString(e.data).getElementsByTagName("result");
                    if ("0" == (t.length > 0 ? t[0].getAttribute("resultCode") : "")) ; else {
                        wx.showModal({
                            title: "提示",
                            content: "验证码发送失败请重试!",
                            showCancel: !1
                        });
                    }
                }
            }, {
                Cookie: e.data.loginCookie.split(";")[0]
            });
        } else {
            var s = '<?xml version="1.0" encoding="UTF-8"?><GetEMailAuthCodeReq><version>12011</version><email>' + t + "</email><emailReqType>6</emailReqType><languageCode>zh-CN</languageCode><reqClientType>26</reqClientType><accountType>" + e.data.accountType + "</accountType><userAccount>" + e.data.account + "</userAccount></GetEMailAuthCodeReq>";
            e.countDown(), a.mpPostForUP(o.service.upDomain + "/AccountServer/IUserInfoMng/getEMailCodeAfterAuth", s, {
                successFunc: function(e) {
                    var t = new n.DOMParser().parseFromString(e.data).getElementsByTagName("result");
                    if ("0" == (t.length > 0 ? t[0].getAttribute("resultCode") : "")) ; else {
                        wx.showModal({
                            title: "提示",
                            content: "验证码发送失败请重试!",
                            showCancel: !1
                        });
                    }
                }
            }, {
                Cookie: e.data.loginCookie.split(";")[0]
            });
        }
    },
    countDown: function(e) {
        var t = this;
        if ("upA disabled" == t.data.getSMSClass) return !1;
        var a = 60, o = setInterval(function() {
            if (0 == a) return t.setData({
                getSMSText: "获取验证码",
                getSMSClass: "upA"
            }), clearInterval(o), o = null, !1;
            t.setData({
                getSMSText: "获取验证码（" + a + "）",
                getSMSClass: "upA disabled"
            }), a--;
        }, 1e3);
    },
    secondAuthLogin: function() {
        var e = this, t = e.data.encodeInfo, n = "", c = e.data.secondAuthTypeArray[e.data.secondAuthTypeIndex], s = e.data.secondAuthAccountTypeArray[e.data.secondAuthTypeIndex], u = e.data.secondAuthCode;
        if ("" == u) return e.setData({
            toastState: !0,
            toastCont: "验证码不能为空"
        }), setTimeout(function() {
            e.setData({
                toastState: !1
            });
        }, 3e3), !1;
        2 == e.data.accountType && (n = "acT=0"), 1 == e.data.accountType && (n = "acT=1");
        var r = n + "&ac=" + e.data.account + "&pw=" + t.pwd + "&dvT=6&dvID=" + t.uuid + "&tmT=unknown&clT=26&app=com.vmall.client&ver=12011&uuid=" + t.uuidEncode + "&dS=0&vCode=" + u + "&vAcT=" + s + "&vAc=" + c;
        a.mpPostForUP(o.service.upDomain + "/AccountServer/IUserInfoMng/loginV2", r, {
            successFunc: function(t) {
                var o = a.urlParamToObject(t.data);
                if (o.cookie = t.header["Set-Cookie"] || t.header["set-cookie"], "0" == o.resultCode) e.bindHWAccount(o); else {
                    var n = "帐号关联失败请重试!";
                    "70001201" == o.resultCode && (n = "无效的用户帐号"), wx.showModal({
                        title: "提示",
                        content: n,
                        showCancel: !1
                    });
                }
            }
        }, {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
            Cookie: e.data.loginCookie.split(";")[0] + ";Path=/AccountServer/;HttpOnly"
        });
    }
});