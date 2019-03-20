var t = getApp(), e = t.globalData.mp, a = t.globalData.config, o = require("../../plugins/xmldom/dom-parser");

Page({
    data: {
        userName: "帐号登录",
        loginImage: "./imgs/not_login.png",
        hideClass: "hide",
        isLogin: !1,
        isLink: !1,
        isLinkText: "关联华为帐号",
        linkAccShow: !1,
        secondAuthTypeArray: [],
        secondAuthAccountTypeArray: [],
        secondAuthTypeIndex: 0,
        secondAuthShow: !1,
        secondAuthCode: "",
        getSMSText: "获取验证码",
        getSMSClass: "upA",
        loginCookie: "",
        isStopClickedObj: {},
        timerObj: {},
        isShowAuthModal: !1,
        wxModalIsShow: !1,
        authOptionFlag: 0,
        isOnLoad: !0,
        authWords: t.globalData.authorizeWords,
        isDoingAuth: !1,
        isShowHWAccount: !1,
        hxAccountText: "",
        isShowWXTips: !1,
        isShowHWTips: !1,
        showGuideInfo: !1,
        showToastInfo: !1,
        isHadInit: !1,
        isNeedOpenType: !0
    },
    onLoad: function() {
        var t = this;
        e.mpReport(400050001, {
            load: "1"
        }), t.data.authOptionFlag = 1, e.mpCheckUserAuthStatus(function(e) {
            t.setData({
                isShowAuthModal: !1,
                isNeedOpenType: !1
            }), t.initUserInfo();
        }, function(e) {
            t.setData({
                isShowAuthModal: !0,
                isNeedOpenType: !0
            });
        }), t.data.isOnLoad = !0;
    },
    onShow: function() {
        var a = this;
        a.data.isOnLoad || (a.data.authOptionFlag = 1, t.globalData.userInfo ? (a.setData({
            isShowAuthModal: !1
        }), wx.getStorageSync("needReLoad") ? (wx.setStorageSync("needReLoad", !1), a.optionStorage(), 
        e.mpLogin(t, function(t) {
            t && t.data && t.data.success ? a.initUserInfo() : wx.showToast({
                title: "帐号切换失败，请稍后重试",
                icon: "none"
            });
        }, !1)) : a.initUserInfo()) : a.data.isShowAuthModal || a.setData({
            isShowAuthModal: !0
        })), e.repeatTap.reset(), e.mpReport(400000201, {
            type: "1",
            load: "1"
        });
    },
    onHide: function() {
        var t = this;
        t.data.isOnLoad = !1, t.data.wxModalIsShow || t.setData({
            isShowAuthModal: !1
        }), t.setData({
            showGuideInfo: !1
        });
    },
    onShareAppMessage: function() {
        return {
            title: "我的",
            path: "/pages/personal/personal"
        };
    },
    onUnload: function() {
        e.repeatTap.reset();
    },
    closeGuideInfo: function() {
        this.setData({
            showGuideInfo: !1
        }), wx.setStorageSync("maskGuideHide", !0);
    },
    openMaskTips: function() {
        this.setData({
            showGuideInfo: !0
        });
    },
    logIn: function() {
        var e = this;
        if (e.data.isDoingAuth) return !1;
        e.data.authOptionFlag = 2, t.globalData.userInfo && e.initUserInfo();
    },
    logOut: function() {
        var t = this;
        t.optionStorage(), t.setUserName();
    },
    optionStorage: function() {
        var t = e.keepIndexTipsState();
        wx.clearStorageSync(), wx.setStorageSync("prdTipsHide", t.prdTipsHide), wx.setStorageSync("maskGuideHide", t.maskGuideHide), 
        wx.setStorageSync("isTipsHadShow", t.isTipsHadShow), wx.setStorageSync("authorizeUserInfo", t.authorizeUserInfo);
    },
    initUserInfo: function() {
        var a = this;
        e.mpQueryUserStatus(function() {
            a.setUserNameBySucc(), a.setUserLinkingButton(), a.data.isHadInit || (a.data.isHadInit = !0, 
            wx.getStorageSync("maskGuideHide") ? a.setData({
                showGuideInfo: !1
            }) : a.setData({
                showGuideInfo: !0
            }), wx.getStorageSync("maskGuideHide") && (wx.getStorageSync("isTipsHadShow") || a.setData({
                showToastInfo: !0
            }, function() {
                setTimeout(function() {
                    a.setData({
                        showToastInfo: !1
                    }), wx.setStorageSync("isTipsHadShow", !0);
                }, 3e3);
            }))), a.data.authOptionFlag > 2 && a.gotoPageByFlag();
        }, function() {
            wx.showLoading({
                mask: !0,
                title: "正在登录..."
            }), e.mpLogin(t, function(t) {
                t && t.data && t.data.success ? (wx.hideLoading(), a.setUserNameBySucc(), a.setUserLinkingButton(), 
                a.data.isHadInit || (a.data.isHadInit = !0, wx.getStorageSync("maskGuideHide") ? a.setData({
                    showGuideInfo: !1
                }) : a.setData({
                    showGuideInfo: !0
                }), wx.getStorageSync("maskGuideHide") && (wx.getStorageSync("isTipsHadShow") || a.setData({
                    showToastInfo: !0
                }, function() {
                    setTimeout(function() {
                        a.setData({
                            showToastInfo: !1
                        }), wx.setStorageSync("isTipsHadShow", !0);
                    }, 3e3);
                }))), a.data.authOptionFlag > 2 && a.gotoPageByFlag()) : (a.setUserNameByFail(), 
                wx.showToast({
                    title: "登录失败，请稍后重试",
                    icon: "none"
                })), 2 == a.data.authOptionFlag && e.mpReport(400000201, {
                    type: "1",
                    load: "1"
                }), a.data.authOptionFlag = 0;
            }, !1);
        });
    },
    setUserName: function() {
        var t = this;
        e.mpGet(a.service.openApiDomain + "/mcp/user/queryUserLoginStatus", {}, {
            successFunc: function(e) {
                e.data.login ? t.setUserNameBySucc() : t.setData({
                    userName: "帐号登录",
                    loginImage: "./imgs/not_login.png",
                    hideClass: "hide",
                    isLogin: !1,
                    isShowHWAccount: !1
                }), t.setUserLinkingButton(), wx.hideLoading();
            },
            failFunc: function() {
                t.setUserNameByFail(), wx.hideLoading();
            }
        });
    },
    setUserNameByFail: function() {
        this.setData({
            userName: "帐号登录",
            loginImage: "./imgs/not_login.png",
            hideClass: "hide",
            isLogin: !1,
            linkAccShow: !1,
            isShowHWAccount: !1
        });
    },
    setUserNameBySucc: function() {
        var e = this;
        if (1 == t.globalData.userLoginStatus) t.globalData.userInfo ? e.setData({
            userName: t.globalData.userInfo.nickName || "",
            loginImage: t.globalData.userInfo.avatarUrl || "./imgs/has_login.png",
            hideClass: "",
            isLogin: !0,
            isShowHWAccount: !1
        }) : e.setData({
            userName: t.globalData.defaultUserInfo.nickName || "",
            loginImage: "./imgs/has_login.png",
            hideClass: "",
            isLogin: !0,
            isShowHWAccount: !1
        }); else if (2 == t.globalData.userLoginStatus) {
            var a = "", o = "", n = wx.getStorageSync("userId");
            n && n.length > 5 && (a = n.substring(0, 3) + "***" + n.substring(n.length - 3, n.length)), 
            o = t.globalData.userInfo ? t.globalData.userInfo.nickName || "" : t.globalData.defaultUserInfo.nickName || "", 
            e.setData({
                userName: o,
                tmpFlag: !1,
                loginImage: "./imgs/has_login.png",
                hideClass: "",
                isLogin: !0,
                isShowHWAccount: !0,
                hxAccountText: a
            });
        }
    },
    setUserLinkingButton: function() {
        var e = this, a = wx.getStorageSync("openId") || "", o = wx.getStorageSync("unionId") || "";
        (o = a == o) ? e.setData({
            linkAccShow: !1
        }) : 1 == t.globalData.userLoginStatus ? e.setData({
            linkAccShow: !0,
            isLinkText: "切换到华为帐号"
        }) : 2 == t.globalData.userLoginStatus ? e.setData({
            linkAccShow: !0,
            isLinkText: "切换到微信帐号"
        }) : e.setData({
            linkAccShow: !1
        });
    },
    gotoPageByFlag: function() {
        var t = this;
        3 == t.data.authOptionFlag ? (wx.navigateTo({
            url: "/pages/orderList/orderList",
            complete: function() {
                t.data.isDoingAuth = !1;
            }
        }), e.mpReport(400050101, {
            click: "1"
        })) : 4 == t.data.authOptionFlag ? wx.navigateTo({
            url: "/pages/addressManage/addressManage",
            complete: function() {
                t.data.isDoingAuth = !1;
            }
        }) : 5 == t.data.authOptionFlag ? (wx.navigateTo({
            url: "/pages/couponList/couponList",
            complete: function() {
                t.data.isDoingAuth = !1;
            }
        }), e.mpReport(400050102, {
            click: "1"
        })) : 6 == t.data.authOptionFlag ? wx.navigateTo({
            url: "/pages/orderSpellList/orderSpellList",
            complete: function() {
                t.data.isDoingAuth = !1;
            }
        }) : 7 == t.data.authOptionFlag ? wx.navigateTo({
            url: "/pages/returnOrExchange/returnOrExchange",
            complete: function() {
                t.data.isDoingAuth = !1;
            }
        }) : 8 == t.data.authOptionFlag ? wx.navigateTo({
            url: "/pages/IntegrationCenter/IntegrationCenter",
            complete: function() {
                t.data.isDoingAuth = !1;
            }
        }) : t.data.isDoingAuth = !1, t.data.authOptionFlag = 0;
    },
    toMyOrderList: function(a) {
        var o = this;
        if (o.data.isDoingAuth) return !1;
        if (o.data.authOptionFlag = 3, t.globalData.userInfo) {
            if (e.repeatTap.stop(o, a)) return !1;
            o.initUserInfo();
        }
    },
    toAddressManage: function(a) {
        var o = this;
        if (o.data.isDoingAuth) return !1;
        if (o.data.authOptionFlag = 4, t.globalData.userInfo) {
            if (e.repeatTap.stop(o, a)) return !1;
            o.initUserInfo();
        }
    },
    toMyCouponList: function(a) {
        var o = this;
        if (o.data.isDoingAuth) return !1;
        if (o.data.authOptionFlag = 5, t.globalData.userInfo) {
            if (e.repeatTap.stop(o, a)) return !1;
            o.initUserInfo();
        }
    },
    toOrderSpellList: function(a) {
        var o = this;
        if (o.data.isDoingAuth) return !1;
        if (o.data.authOptionFlag = 6, t.globalData.userInfo) {
            if (e.repeatTap.stop(o, a)) return !1;
            o.initUserInfo();
        }
    },
    toReturnOrExchange: function(a) {
        var o = this;
        if (o.data.isDoingAuth) return !1;
        if (o.data.authOptionFlag = 7, t.globalData.userInfo) {
            if (e.repeatTap.stop(o, a)) return !1;
            o.initUserInfo();
        }
    },
    toInviteGift: function(t) {
        var a = this;
        if (e.repeatTap.stop(a, t)) return !1;
        wx.navigateTo({
            url: "../../packageActivity/pages/inviteGift/inviteGift"
        });
    },
    toMyIntegration: function(a) {
        var o = this;
        if (o.data.isDoingAuth) return !1;
        if (o.data.authOptionFlag = 8, t.globalData.userInfo) {
            if (e.repeatTap.stop(o, a)) return !1;
            o.initUserInfo();
        }
    },
    toUserAgreement: function(t) {
        var o = this;
        if (e.repeatTap.stop(o, t)) return !1;
        wx.navigateTo({
            url: "/pages/webview/webview?url=" + a.service.webViewDomain + "/mcp/hwyhxy.html&title=华为商城用户协议&comeFrom=person"
        }), e.mpReport(400050104, {
            click: "1"
        });
    },
    toPrivacyAgreement: function(t) {
        var a = this;
        if (e.repeatTap.stop(a, t)) return !1;
        wx.navigateTo({
            url: "/pages/privacyAgreement/privacyAgreement"
        }), e.mpReport(400050103, {
            click: "1"
        });
    },
    toConnect: function(a) {
        var o = this;
        if (e.repeatTap.stop(o, a)) return !1;
        1 == t.globalData.userLoginStatus ? o.setData({
            isShowHWTips: !0
        }) : 2 == t.globalData.userLoginStatus && o.setData({
            isShowWXTips: !0
        });
    },
    hideWXTips: function(t) {
        var a = this;
        if (e.repeatTap.stop(a, t)) return !1;
        a.setData({
            isShowWXTips: !1
        });
    },
    onWXTipsConfirm: function(a) {
        var o = this;
        if (e.repeatTap.stop(o, a)) return !1;
        wx.showLoading({
            mask: !0,
            title: ""
        }), o.setData({
            isShowWXTips: !1
        }), e.mpLogin(t, function(t) {
            t && t.data && t.data.success ? (o.data.authOptionFlag = 1, o.initUserInfo()) : wx.showToast({
                title: "帐号切换失败，请稍后重试",
                icon: "none"
            }), wx.hideLoading();
        }, !1, "0");
    },
    hideHWTips: function(t) {
        var a = this;
        if (e.repeatTap.stop(a, t)) return !1;
        a.setData({
            isShowHWTips: !1
        });
    },
    onHWTipsConfirm: function(a) {
        var o = this;
        if (e.repeatTap.stop(o, a)) return !1;
        o.setData({
            isShowHWTips: !1
        }), wx.showLoading({
            mask: !0,
            title: ""
        });
        var n = wx.getStorageSync("mpUid");
        e.mpIsEmpty(n) ? o.getBindStatus() : e.mpLogin(t, function(t) {
            t && t.data && t.data.success ? (wx.hideLoading(), o.data.authOptionFlag = 1, o.initUserInfo()) : wx.showToast({
                title: "帐号切换失败，请稍后重试",
                icon: "none"
            });
        }, !1, "1");
    },
    getBindStatus: function() {
        var o = this;
        wx.login({
            success: function(n) {
                if (n.code) {
                    var i = wx.getStorageSync("upuuid") || "", s = wx.getStorageSync("uuidEncode") || "";
                    if (i && s) {
                        var r = e.mpBuildAuthReqParam(n.code, i, s);
                        e.mpPostForUP(a.service.upDomain + "/AccountServer/IUserInfoMng/userThirdAuthV2", r, {
                            successFunc: function(t) {
                                var e = t.header["Set-Cookie"] || t.header["set-cookie"];
                                o.setData({
                                    loginCookie: e
                                }), o.showConectedStatus(t, !1);
                            }
                        });
                    } else {
                        var u = e.uuid();
                        e.encryptAESCBC(t, "", u, function(t) {
                            wx.setStorageSync("upuuid", u), wx.setStorageSync("uuidEncode", t.ivbyte + ":" + t.context);
                            var i = e.mpBuildAuthReqParam(n.code, u, t.ivbyte + ":" + t.context);
                            e.mpPostForUP(a.service.upDomain + "/AccountServer/IUserInfoMng/userThirdAuthV2", i, {
                                successFunc: function(t) {
                                    var e = t.header["Set-Cookie"] || t.header["set-cookie"];
                                    o.setData({
                                        loginCookie: e
                                    }), o.showConectedStatus(t, !1);
                                }
                            });
                        }, function() {
                            wx.hideLoading(), wx.showModal({
                                title: "提示",
                                content: "出错了请稍后再试！",
                                showCancel: !1
                            });
                        });
                    }
                }
            }
        });
    },
    showConectedStatus: function(n, i) {
        var s = this, r = new o.DOMParser().parseFromString(n.data), u = r.getElementsByTagName("result"), c = r.getElementsByTagName("errorDesc").length > 0 ? r.getElementsByTagName("errorDesc")[0].firstChild.nodeValue : "", d = u.length > 0 ? u[0].getAttribute("resultCode") : "";
        if (i && this.setData({
            secondAuthShow: !1
        }), "0" == d) {
            var g = r.getElementsByTagName("userID")[0].firstChild.nodeValue;
            "-1" == g ? wx.navigateTo({
                url: "/pages/linkingAccount/linkingSelect",
                complete: function() {
                    wx.hideLoading();
                }
            }) : (wx.setStorageSync("checkBindStatus", !0), wx.setStorageSync("mpUid", g), e.mpGet(a.service.openApiDomain + "/mcp/account/mpBindUpAccount", {
                mpUid: g
            }, {
                successFunc: function(t) {}
            }), s.optionStorage(), e.mpLogin(t, function(t) {
                t && t.data && t.data.success ? (wx.hideLoading(), s.data.authOptionFlag = 1, s.initUserInfo()) : wx.showToast({
                    title: "帐号切换失败，请稍后重试",
                    icon: "none"
                });
            }, !1)), s.setData({
                hideClass: s.data.isLogin ? "" : "hide"
            });
            var l = r.getElementsByTagName("thirdAccessToken").length > 0 ? r.getElementsByTagName("thirdAccessToken")[0].firstChild.nodeValue : "", h = r.getElementsByTagName("thirdOpenID").length > 0 ? r.getElementsByTagName("thirdOpenID")[0].firstChild.nodeValue : "";
            l ? (wx.setStorageSync("thirdAccessToken", l), wx.setStorageSync("thirdOpenID", h)) : wx.showModal({
                title: "提示",
                content: "无法获取数据，请稍后重试",
                showCancel: !1
            });
        } else if (wx.hideLoading(), "70002072" != d && "70012072" != d && "70002080" != d || !c || i) wx.showModal({
            title: "提示",
            content: "无法获取数据，请稍后重试",
            showCancel: !1
        }); else {
            var p = JSON.parse(c);
            if (p.authCodeSentList && p.authCodeSentList.length > 0) {
                var f = [], S = [];
                p.authCodeSentList.forEach(function(t, e) {
                    f.push(t.name), S.push(t.accountType);
                }), s.setData({
                    secondAuthTypeArray: f,
                    secondAuthAccountTypeArray: S,
                    secondAuthShow: !0
                });
            }
        }
    },
    bindAuthTypePickerChange: function(t) {
        this.setData({
            secondAuthTypeIndex: t.detail.value
        });
    },
    getSecondAuthCode: function() {
        var t = this;
        if ("upA disabled" == t.data.getSMSClass) return !1;
        var n = t.data.secondAuthTypeArray[t.data.secondAuthTypeIndex], i = e.strToHexCharCode(wx.getStorageSync("unionId") || "");
        if (-1 == n.indexOf("@")) {
            var s = '<?xml version="1.0" encoding="UTF-8"?><SMSAuthCodeReq><version>12011</version><mobilePhone>' + n + "</mobilePhone><smsReqType>6</smsReqType><languageCode>zh-CN</languageCode><reqClientType>26</reqClientType><accountType>22</accountType><userAccount>" + i + "</userAccount></SMSAuthCodeReq>";
            t.countDown(), e.mpPostForUP(a.service.upDomain + "/AccountServer/IUserInfoMng/getSMSCodeAfterAuth", s, {
                successFunc: function(t) {
                    var e = new o.DOMParser().parseFromString(t.data).getElementsByTagName("result");
                    if ("0" == (e.length > 0 ? e[0].getAttribute("resultCode") : "")) ; else {
                        wx.showModal({
                            title: "提示",
                            content: "验证码发送失败请重试!",
                            showCancel: !1
                        });
                    }
                }
            }, {
                Cookie: t.data.loginCookie.split(";")[0]
            });
        } else {
            var r = '<?xml version="1.0" encoding="UTF-8"?><GetEMailAuthCodeReq><version>12011</version><email>' + n + "</email><emailReqType>6</emailReqType><languageCode>zh-CN</languageCode><reqClientType>26</reqClientType><accountType>22</accountType><userAccount>" + i + "</userAccount></GetEMailAuthCodeReq>";
            t.countDown(), e.mpPostForUP(a.service.upDomain + "/AccountServer/IUserInfoMng/getEMailCodeAfterAuth", r, {
                successFunc: function(t) {
                    var e = new o.DOMParser().parseFromString(t.data).getElementsByTagName("result");
                    if ("0" == (e.length > 0 ? e[0].getAttribute("resultCode") : "")) ; else {
                        wx.showModal({
                            title: "提示",
                            content: "验证码发送失败请重试!",
                            showCancel: !1
                        });
                    }
                }
            }, {
                Cookie: t.data.loginCookie.split(";")[0]
            });
        }
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
    setSecondAuthCode: function(t) {
        this.setData({
            secondAuthCode: t.detail.value
        });
    },
    closeSecondAuthDialog: function() {
        this.setData({
            secondAuthShow: !1
        });
    },
    secondUserThirdAuthV2: function(t) {
        var o = this, n = o.data.secondAuthTypeArray[o.data.secondAuthTypeIndex], i = o.data.secondAuthAccountTypeArray[o.data.secondAuthTypeIndex], s = o.data.secondAuthCode;
        return !e.repeatTap.stop(o, t, 2e3) && ("" == s ? (o.setData({
            toastState: !0,
            toastCont: "验证码不能为空"
        }), setTimeout(function() {
            o.setData({
                toastState: !1
            });
        }, 3e3), !1) : void wx.login({
            success: function(t) {
                if (t.code) {
                    var r = wx.getStorageSync("upuuid") || "", u = wx.getStorageSync("uuidEncode") || "";
                    if (r && u) {
                        var c = e.mpBuildAuthSecondReqParam(t.code, r, u, s, i, n);
                        e.mpPostForUP(a.service.upDomain + "/AccountServer/IUserInfoMng/userThirdAuthV2", c, {
                            successFunc: function(t) {
                                o.showConectedStatus(t, !0);
                            }
                        }, {
                            Cookie: o.data.loginCookie.split(";")[0]
                        });
                    }
                }
            }
        }));
    },
    onAuthSelect: function(a) {
        var o = this;
        if (t.globalData.userInfo) return !1;
        a && (a.detail && a.detail.userInfo || a.type && "authSelect" == a.type) && (o.data.isDoingAuth = !0, 
        o.setData({
            isNeedOpenType: !1
        }), wx.showLoading({
            mask: !0,
            title: "正在登录..."
        }), e.mpAuthorizeAndLogin(function() {
            wx.hideLoading(), o.setUserNameBySucc(), o.setUserLinkingButton(), o.data.isHadInit || (o.data.isHadInit = !0, 
            wx.getStorageSync("maskGuideHide") ? o.setData({
                showGuideInfo: !1
            }) : o.setData({
                showGuideInfo: !0
            })), o.data.authOptionFlag > 2 ? o.gotoPageByFlag() : o.data.isDoingAuth = !1;
        }, function() {
            o.setUserNameByFail(), wx.showToast({
                title: "登录失败，请稍后重试",
                icon: "none"
            }), 2 == o.data.authOptionFlag && e.mpReport(400000201, {
                type: "1",
                load: "1"
            }), o.data.isDoingAuth = !1, o.data.authOptionFlag = 0;
        }));
    },
    onCloseModal: function(t) {
        var e = this;
        t && "closeModal" == t.type && e.setData({
            isShowAuthModal: !1,
            wxModalIsShow: !1
        });
    },
    onShowWXModal: function(t) {
        var e = this;
        t && "showWXModal" == t.type && e.setData({
            wxModalIsShow: !0
        });
    }
});