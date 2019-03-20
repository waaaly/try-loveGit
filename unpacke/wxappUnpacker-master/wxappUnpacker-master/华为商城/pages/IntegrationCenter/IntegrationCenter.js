var e = getApp(), t = e.globalData.mp, a = e.globalData.config, i = require("../../plugins/xmldom/dom-parser"), o = [ "E", "A", "C", "AUTHMEMBER", "FIRSTADDRESS", "PORTALSIGN", "COUPON", "PRICODE", "DPRIZE", "C_TASK" ];

Page({
    data: {
        pageSize: 10,
        currentPage: 1,
        pointHisDetail: [],
        isComplete: !0,
        isShowReload: !1,
        isHuaweiNum: !1,
        isEmpty: !0,
        isLoadMore: !0,
        isSwitchup: !1,
        loadComplete: !1,
        isHuaweiLogin: !1,
        isSwitchAccount: !1,
        secondAuthTypeIndex: 0,
        shouldReload: !1
    },
    onLoad: function(e) {},
    onShow: function() {
        var a = this;
        wx.getStorageSync("needReLoad") ? (wx.setStorageSync("needReLoad", !1), a.optionStorage(), 
        t.mpLogin(e, function(e) {
            e && e.data && e.data.success ? a.refreshPage() : wx.showToast({
                title: "帐号切换失败，请稍后重试",
                icon: "none"
            });
        }, !1)) : a.refreshPage();
    },
    refreshPage: function() {
        var t = this, a = t.data.isHuaweiNum;
        if (t.setData({
            currentPage: 1,
            loadComplete: !1
        }), t.data.pointHisDetail = [], "1" == e.globalData.userLoginStatus) {
            var i = wx.getStorageSync("openId") || "", o = wx.getStorageSync("unionId") || "";
            return (o = i == o) ? t.setData({
                isHuaweiLogin: !1
            }) : t.setData({
                isHuaweiLogin: !0
            }), wx.hideLoading(), !1;
        }
        if ("2" == e.globalData.userLoginStatus ? (t.setData({
            isHuaweiLogin: !1
        }), a = !0) : t.setData({
            isShowReload: !0
        }), !a) return t.setData({
            loadComplete: !1
        }), wx.hideLoading(), !1;
        t.setData({
            isHuaweiNum: a
        }), this.initList();
    },
    initList: function() {
        var e = this;
        wx.showLoading({
            mask: !0,
            title: ""
        }), e.setData({
            isComplete: !1
        }), t.mpPromiseGet(getApp().globalData.config.service.openApiDomain + "/mcp/queryUserPointBalanceDetail", {
            country: "CN",
            ifHisDetail: 1,
            lang: "zh-CN",
            pageNum: e.data.currentPage,
            pageSize: e.data.pageSize
        }).then(function(t) {
            var a = t.data;
            if (!a.success) {
                if ("1" == e.data.currentPage) return e.setData({
                    isShowReload: !0
                }), wx.hideLoading(), !1;
                e.setData({
                    shouldReload: !0
                }), wx.showToast({
                    title: "数据加载失败",
                    icon: "none"
                });
            }
            (!a.pointHisDetail || a.pointHisDetail.length <= 0) && "1" == e.data.currentPage || 0 == a.pointBlance ? e.setData({
                isEmpty: !0
            }) : e.setData({
                isEmpty: !1
            }), 1 == a.pageCount && e.setData({
                isLoadMore: !1
            }), a.pointHisDetail && (a.pointHisDetail.forEach(function(t) {
                t.createTime = t.createTime.split(":")[0] + ":" + t.createTime.split(":")[1], e.notShowCode(t.actCode) && (t.orderCode, 
                t.orderCode = "");
            }), e.setData({
                pointHisDetail: e.data.pointHisDetail.concat(a.pointHisDetail),
                totalPage: a.pageCount,
                currentPage: e.data.currentPage,
                pointinfo: {
                    pointBlance: a.pointBlance,
                    pointAmount: a.pointAmount,
                    lastPointValue: a.lastExpirePointValue,
                    lastExpireTime: a.lastExpireTime.substring(2)
                },
                isComplete: !0,
                loadComplete: !0,
                shouldReload: !1,
                isShowReload: !1
            }), a.pointHisDetail.length < 10 && e.setData({
                isLoadMore: !1
            }), setTimeout(function() {
                e.queryHeight();
            }, 300)), wx.hideLoading();
        }).catch(function() {
            "1" == e.data.currentPage ? (e.setData({
                isShowReload: !0
            }), wx.hideLoading()) : (e.setData({
                shouldReload: !0
            }), wx.showToast({
                title: "数据加载失败！",
                icon: "none"
            }));
        });
    },
    notShowCode: function(e) {
        return o.filter(function(t, a) {
            return t == e;
        })[0] || "";
    },
    onReachBottom: function() {
        var e = this;
        return !!e.data.isComplete && (e.data.currentPage == e.data.totalPage ? (e.setData({
            isLoadMore: !1
        }), !1) : (e.data.shouldReload ? e.setData({
            currentPage: e.data.currentPage,
            isLoadMore: !0
        }) : e.setData({
            currentPage: e.data.currentPage + 1,
            isLoadMore: !0
        }), void e.initList()));
    },
    toReload: function() {
        var e = this;
        e.setData({
            currentPage: 1,
            pointHisDetail: [],
            isComplete: !0
        }, function() {
            e.initList();
        });
    },
    queryHeight: function() {
        var e = this, t = 0, a = e.data.pointHisDetail;
        wx.createSelectorQuery().selectAll("#code_father").boundingClientRect(function(i) {
            i.forEach(function(e) {
                e.height && (t = e.height);
            }), wx.createSelectorQuery().selectAll(".code_height").boundingClientRect(function(i) {
                i.forEach(function(e, i) {
                    e.height > t ? a[i].isShowUp = !0 : a[i].isShowUp = !1, a[i].isSwitchup = !1;
                }), e.setData({
                    pointHisDetail: a
                });
            }).exec();
        }).exec();
    },
    switchUp: function(e) {
        var t = this, a = e.currentTarget.dataset.idx, i = t.data.pointHisDetail;
        i.forEach(function(e, t) {
            t == a && e.isShowUp && (e.isSwitchup = !e.isSwitchup);
        }), t.setData({
            pointHisDetail: i
        });
    },
    goToRules: function(e) {
        var a = this;
        if (t.repeatTap.stop(a, e)) return !1;
        wx.navigateTo({
            url: "../webview/webview?url=https://msale.vmall.com/point/rules.html"
        });
    },
    showSwitchAccount: function() {
        var e = this;
        e.setData({
            isSwitchAccount: !e.data.isSwitchAccount
        });
    },
    loginHuawei: function(a) {
        var i = this;
        if (t.repeatTap.stop(i, a)) return !1;
        wx.showLoading({
            mask: !0,
            title: ""
        }), i.setData({
            isSwitchAccount: !1
        }), wx.getStorageSync("mpUid") ? t.mpLogin(e, function(e) {
            e && e.data && e.data.success ? (i.setData({
                isHuaweiLogin: !1
            }), i.refreshPage()) : wx.showToast({
                title: "帐号切换失败，请稍后重试",
                icon: "none"
            });
        }, !1, "1") : i.getBindStatus();
    },
    getBindStatus: function() {
        var a = this;
        wx.login({
            success: function(i) {
                if (i.code) {
                    var o = wx.getStorageSync("upuuid") || "", n = wx.getStorageSync("uuidEncode") || "";
                    if (o && n) a.ThirdAuth(i.code, o, n); else {
                        var s = t.uuid();
                        t.encryptAESCBC(e, "", s, function(e) {
                            wx.setStorageSync("upuuid", s), wx.setStorageSync("uuidEncode", e.ivbyte + ":" + e.context), 
                            a.ThirdAuth(i.code, s, e.ivbyte + ":" + e.context);
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
    ThirdAuth: function(e, i, o) {
        var n = this, s = t.mpBuildAuthReqParam(e, i, o);
        t.mpPostForUP(a.service.upDomain + "/AccountServer/IUserInfoMng/userThirdAuthV2", s, {
            successFunc: function(e) {
                var t = e.header["Set-Cookie"] || e.header["set-cookie"];
                n.setData({
                    loginCookie: t
                }), n.showConectedStatus(e, !1);
            }
        });
    },
    showConectedStatus: function(o, n) {
        var s = this, r = new i.DOMParser().parseFromString(o.data), c = r.getElementsByTagName("result"), u = r.getElementsByTagName("errorDesc").length > 0 ? r.getElementsByTagName("errorDesc")[0].firstChild.nodeValue : "", d = c.length > 0 ? c[0].getAttribute("resultCode") : "";
        if (n && this.setData({
            secondAuthShow: !1
        }), "0" == d) {
            var h = r.getElementsByTagName("userID")[0].firstChild.nodeValue;
            "-1" == h ? wx.navigateTo({
                url: "../linkingAccount/linkingSelect",
                complete: function() {
                    wx.hideLoading();
                }
            }) : (wx.setStorageSync("checkBindStatus", !0), wx.setStorageSync("mpUid", h), t.mpGet(a.service.openApiDomain + "/mcp/account/mpBindUpAccount", {
                mpUid: h
            }, {
                successFunc: function(a) {
                    s.optionStorage(), t.mpLogin(e, function(e) {
                        e && e.data && e.data.success ? (s.data.authOptionFlag = 1, s.setData({
                            isHuaweiLogin: !1
                        }), s.refreshPage()) : wx.showToast({
                            title: "帐号切换失败，请稍后重试",
                            icon: "none"
                        });
                    }, !1);
                }
            }));
            var l = r.getElementsByTagName("thirdAccessToken").length > 0 ? r.getElementsByTagName("thirdAccessToken")[0].firstChild.nodeValue : "", g = r.getElementsByTagName("thirdOpenID").length > 0 ? r.getElementsByTagName("thirdOpenID")[0].firstChild.nodeValue : "";
            l ? (wx.setStorageSync("thirdAccessToken", l), wx.setStorageSync("thirdOpenID", g)) : wx.showModal({
                title: "提示",
                content: "无法获取数据，请稍后重试",
                showCancel: !1
            });
        } else if (wx.hideLoading(), "70002072" != d && "70012072" != d && "70002080" != d || !u || n) wx.showModal({
            title: "提示",
            content: "无法获取数据，请稍后重试",
            showCancel: !1
        }); else {
            var p = JSON.parse(u);
            if (p.authCodeSentList && p.authCodeSentList.length > 0) {
                var w = [], S = [];
                p.authCodeSentList.forEach(function(e, t) {
                    w.push(e.name), S.push(e.accountType);
                }), s.setData({
                    secondAuthTypeArray: w,
                    secondAuthAccountTypeArray: S,
                    secondAuthShow: !0
                });
            }
        }
    },
    nextStep: function(e) {
        var t = this;
        t.data.secondAuthCode = e.detail.secondAuthCode, t.secondUserThirdAuthV2();
    },
    secondUserThirdAuthV2: function() {
        var e = this, i = e.data.secondAuthTypeArray[e.data.secondAuthTypeIndex], o = e.data.secondAuthAccountTypeArray[e.data.secondAuthTypeIndex], n = e.data.secondAuthCode;
        if ("" == n) return e.setData({
            toastState: !0,
            toastCont: "验证码不能为空"
        }), setTimeout(function() {
            e.setData({
                toastState: !1
            });
        }, 3e3), !1;
        wx.login({
            success: function(s) {
                if (s.code) {
                    var r = wx.getStorageSync("upuuid") || "", c = wx.getStorageSync("uuidEncode") || "";
                    if (r && c) {
                        var u = t.mpBuildAuthSecondReqParam(s.code, r, c, n, o, i);
                        t.mpPostForUP(a.service.upDomain + "/AccountServer/IUserInfoMng/userThirdAuthV2", u, {
                            successFunc: function(t) {
                                e.showConectedStatus(t, !0);
                            }
                        }, {
                            Cookie: e.data.loginCookie.split(";")[0]
                        });
                    }
                }
            }
        });
    },
    toUserAgreement: function(e) {
        var i = this;
        if (t.repeatTap.stop(i, e)) return !1;
        wx.navigateTo({
            url: "/pages/webview/webview?url=" + a.service.webViewDomain + "/mcp/hwyhxy.html&title=华为商城用户协议&comeFrom=person"
        }), t.mpReport(400050104, {
            click: "1"
        });
    },
    toPrivacyAgreement: function(e) {
        var a = this;
        if (t.repeatTap.stop(a, e)) return !1;
        wx.navigateTo({
            url: "/pages/privacyAgreement/privacyAgreement"
        }), t.mpReport(400050103, {
            click: "1"
        });
    },
    optionStorage: function() {
        var e = t.keepIndexTipsState();
        wx.clearStorageSync(), wx.setStorageSync("prdTipsHide", e.prdTipsHide), wx.setStorageSync("maskGuideHide", e.maskGuideHide), 
        wx.setStorageSync("isTipsHadShow", e.isTipsHadShow), wx.setStorageSync("authorizeUserInfo", e.authorizeUserInfo);
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {}
});