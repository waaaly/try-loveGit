var t = getApp(), a = t.globalData.mp, e = t.globalData.config;

Page({
    data: {
        activityCode: "",
        activetyShow: !1,
        sbomCodeList: [],
        userName: "",
        share: "share",
        from: "",
        avatarUrl: "",
        myAvatarUrl: "",
        myName: "",
        defAvatarUrl: "imgs/defaultface_user.png",
        closeBox: !0,
        activityPic: !1,
        isCreateClicked: !1,
        orderdetailtimer: "",
        showCutDownTime: !0,
        redUrl: "",
        redColor: "",
        shareTitle: "",
        isShowAuthModal: !1,
        wxModalIsShow: !1,
        isOnLoad: !0,
        isLogin: !1,
        authOptionFlag: 0,
        eventObj: {},
        isBtnClicked: !1,
        authWords: t.globalData.authorizeWords,
        isDoingAuth: !1,
        cdnPath: "",
        isNeedOpenType: !0
    },
    onLoad: function(t) {
        var o = this;
        o.setData({
            cdnPath: e.service.cdnPath
        }), t.activityCode && o.setData({
            activityCode: t.activityCode
        }), t.aggregationId ? o.setData({
            aggregationId: t.aggregationId
        }) : o.setData({
            aggregationId: ""
        }), a.mpReport(400010001, {
            load: "1"
        }), o.getRedEnvelopeInfo(), o.data.authOptionFlag = 1, a.mpCheckUserAuthStatus(function(t) {
            o.setData({
                isShowAuthModal: !1,
                isNeedOpenType: !1
            }), o.initUserInfo();
        }, function(t) {
            o.setData({
                isLogin: !1,
                isShowAuthModal: !0,
                isNeedOpenType: !0
            }), o.IsJoinCallUp();
        }), o.data.isOnLoad = !0;
    },
    onShow: function() {
        var a = this;
        a.data.isOnLoad || (a.data.authOptionFlag = 1, t.globalData.userInfo ? a.initUserInfo() : (a.IsJoinCallUp(), 
        a.data.isShowAuthModal || a.setData({
            isShowAuthModal: !0
        }))), a.setData({
            isBtnClicked: !1
        });
    },
    onHide: function() {
        var t = this;
        clearInterval(t.data.orderdetailtimer), t.data.isOnLoad = !1, t.data.wxModalIsShow || t.setData({
            isShowAuthModal: !1
        });
    },
    onReady: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    windowHeight: a.windowHeight,
                    windowWidth: a.windowWidth
                });
            }
        });
    },
    setPersonalInfo: function() {
        var a = this;
        t.globalData.userInfo ? a.setData({
            myAvatarUrl: t.globalData.userInfo.avatarUrl || "./imgs/defaultface_user.png",
            myName: t.globalData.userInfo.nickName || ""
        }) : a.setData({
            myAvatarUrl: "./imgs/defaultface_user.png",
            myName: ""
        });
    },
    refreshSpecialContent: function(t) {
        var a = this;
        t ? (wx.setStorageSync("specialContent", t), wx.setNavigationBarTitle({
            title: t.activityTitle || "红包集结令"
        }), a.setData({
            redUrl: t.activityBgPath ? a.data.cdnPath + t.activityBgPath : "imgs/bg_envelopes.jpg",
            redColor: t.activityBgColor || "#e23141"
        })) : (wx.setNavigationBarTitle({
            title: "红包集结令"
        }), a.setData({
            redUrl: "imgs/bg_envelopes.jpg",
            redColor: "#e23141"
        }));
    },
    toSetDefaultBg: function() {
        this.setData({
            redUrl: "imgs/bg_envelopes.jpg",
            redColor: "#e23141"
        });
    },
    getRedEnvelopeInfo: function() {
        var t = this;
        a.mpPromiseGet(e.service.openApiDomain + "/mcp/promotion/queryRedGiftConfig", {
            activityCode: t.data.activityCode
        }).then(function(a) {
            if (!a.data || !a.data.success || !a.data.redGiftConfig) throw new Error();
            t.refreshSpecialContent(a.data.redGiftConfig);
        }).catch(function() {
            wx.setNavigationBarTitle({
                title: "红包集结令"
            }), t.setData({
                redUrl: "imgs/bg_envelopes.jpg",
                redColor: "#e23141"
            });
        });
    },
    onShareAppMessage: function() {
        var t = this, a = wx.getStorageSync("specialContent");
        return a ? t.setData({
            shareTitle: a.shareTitle || "红包集结令",
            sharePic: a.sharePicPath ? t.data.cdnPath + a.sharePicPath : ""
        }) : (wx.setNavigationBarTitle({
            title: "红包集结令"
        }), t.setData({
            shareTitle: "红包集结令",
            sharePic: ""
        })), {
            title: t.data.shareTitle,
            imageUrl: t.data.sharePic,
            path: "/pages/redEnvelopesCreat/redEnvelopesCreat?activityCode=" + t.data.activityCode + "&aggregationId=" + t.data.aggregationId,
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "转发失败",
                    showCancel: !1
                });
            }
        };
    },
    IsJoinCallUp: function() {
        var t = this;
        a.mpGet(e.service.openApiDomain + "/ams/aggregation/getAggregation", {
            activityCode: t.data.activityCode,
            aggregationId: t.data.aggregationId
        }, {
            successFunc: function(a) {
                var e = a.data.user;
                if (wx.hideLoading(), t.redEnvelopInfo(t, e), a.data.success) {
                    var o = !1;
                    t.setData({
                        aggregationState: a.data.aggregationState,
                        aggregationId: a.data.aggregationId,
                        isCurrentUserAggregated: a.data.isCurrentUserAggregated
                    }), t.setData({
                        isCurrentUserReceiveCoupon: a.data.isCurrentUserReceiveCoupon
                    }), a.data.user && a.data.user.length > 0 ? (t.setData({
                        user: e,
                        friendsMount: a.data.aggregationNumber - e.length
                    }), e.length == a.data.aggregationNumber ? (t.setData({
                        showDetail: !0,
                        callUp: !1,
                        showEnvelopCreat: !1
                    }), -1 == a.data.isCurrentUserAggregated && wx.showToast({
                        title: "参与人数已满啦，还可以发起活动哦",
                        icon: "none",
                        mask: !0
                    }), o = !0) : 1 == a.data.isCurrentUserAggregated ? (a.data.user.forEach(function(t, a) {
                        t.userId == wx.getStorageSync("userId") && (o = 1 != t.isOriginate);
                    }), t.setData({
                        showDetail: !0,
                        callUp: !1,
                        showEnvelopCreat: !1
                    })) : (o = !0, t.setData({
                        showDetail: !1,
                        callUp: !1,
                        showEnvelopCreat: !0
                    })), t.setData({
                        isCurrentUserReceiveCoupon: a.data.isCurrentUserReceiveCoupon,
                        friendsMount: a.data.aggregationNumber - t.data.user.length,
                        aggregationState: a.data.aggregationState,
                        aggregationId: a.data.aggregationId,
                        isCurrentUserAggregated: a.data.isCurrentUserAggregated,
                        buildMyActivity: o
                    })) : t.setData({
                        showEnvelopCreat: !0,
                        showDetail: !1,
                        callUp: !0,
                        user: [ {
                            isOriginate: 1,
                            displayName: t.data.myName,
                            headUrl: t.data.myAvatarUrl
                        } ]
                    });
                } else "9100" == a.data.code ? t.setData({
                    showEnvelopCreat: !0,
                    showDetail: !1,
                    callUp: !0,
                    user: [ {
                        isOriginate: 1,
                        displayName: t.data.myName,
                        headUrl: t.data.myAvatarUrl
                    } ]
                }) : "9102" != a.data.code && "9103" != a.data.code && "9104" != a.data.code && "9105" != a.data.code || t.setData({
                    showWidown: !0,
                    activitys: "活动状态",
                    activityState: a.data.msg,
                    urlContent: "去华为商城逛逛",
                    url: "../index/index",
                    isUrl: !0,
                    closeBox: !1
                });
            },
            failFunc: function(t) {
                wx.hideLoading(), wx.showModal({
                    title: "提示",
                    content: "出错了请稍后再试",
                    showCancel: !1
                });
            }
        });
    },
    redEnvelopInfo: function(t, i) {
        a.mpGet(e.service.openApiDomain + "/ams/aggregation/queryAggregationActivityInfo", {
            activityCode: t.data.activityCode
        }, {
            successFunc: function(e) {
                if (e.data.success) {
                    if (e.data.aggregationActivityInfo) {
                        if (t.setData({
                            endTime: a.formatTimeNumber(e.data.aggregationActivityInfo.endTime, "Y-M-D h:m"),
                            peopleMounts: e.data.aggregationActivityInfo.singleAggregationNumber,
                            showCutDownTime: !0
                        }), e.data.aggregationActivityInfo.couponInfo) {
                            t.setData({
                                allAmount: e.data.aggregationActivityInfo.couponInfo.allAmount || ""
                            });
                            var i = e.data.aggregationActivityInfo.couponInfo, n = i.sbomCodeList ? i.sbomCodeList : [];
                            t.setData({
                                allAmount: i.allAmount || "",
                                batchCode: i.batchCode,
                                batchName: i.batchName,
                                sbomCodeList: n,
                                actCode: i.activityCode,
                                ticketAmt: i.allAmount / t.data.peopleMounts
                            });
                        }
                        var s = e.data.aggregationActivityInfo.cutdownTime;
                        if (o(s, t) ? s -= 1e3 : s = 0, t.data.orderdetailtimer = setInterval(function() {
                            o(s, t) ? s -= 1e3 : (t.setData({
                                showCurrentTime: !1
                            }), clearInterval(t.data.orderdetailtimer), orderdetailtimer = null);
                        }, 1e3), !t.data.isLogin) {
                            for (var r = [], d = 0; d < t.data.peopleMounts; d++) r.push({
                                isOriginate: 0,
                                displayName: "",
                                headUrl: ""
                            });
                            t.setData({
                                showDetail: !0,
                                showEnvelopCreat: !1,
                                user: r,
                                friendsMount: 0
                            });
                        }
                    }
                } else "9102" == e.data.code || "9103" == e.data.code || "9104" == e.data.code || "9105" == e.data.code ? t.setData({
                    showWidown: !0,
                    activitys: "活动状态",
                    activityState: e.data.msg,
                    urlContent: "去华为商城逛逛",
                    url: "../index/index",
                    isUrl: !0,
                    closeBox: !1,
                    showCutDownTime: !0
                }) : (t.data.isLogin || t.setData({
                    showDetail: !0,
                    showEnvelopCreat: !1,
                    showCutDownTime: !1,
                    user: [ {
                        isOriginate: 0,
                        displayName: "",
                        headUrl: ""
                    } ],
                    friendsMount: t.data.peopleMounts - 1
                }), e.data.msg && wx.showModal({
                    title: "提示",
                    content: e.data.msg
                }));
            }
        });
    },
    createCallUp: function(o) {
        var i = this;
        return !a.stopRepeatClick(o, 3e3) && (o && o.detail && a.mpIsFormIdValid(o.detail.formId) && a.mpReportFormId(t, e, {
            formid: o.detail.formId,
            source: 1
        }), !i.data.isDoingAuth && (i.data.eventObj = o, i.data.authOptionFlag = 2, void (t.globalData.userInfo && i.initUserInfo())));
    },
    saveAggregation4CreateCallUp: function(o) {
        var i = this;
        a.getCsrf(function(n) {
            a.mpPost(e.service.openApiDomain + "/ams/aggregation/saveAggregation", {
                activityCode: i.data.activityCode,
                headUrl: t.globalData.userInfo.avatarUrl || "",
                formId: o.detail.formId
            }, {
                successFunc: function(t) {
                    t.data.success ? (i.setData({
                        showEnvelopCreat: !1,
                        showDetail: !0,
                        aggregationId: t.data.aggregationId
                    }), i.callUpDetail(i)) : "9105" == t.data.code ? i.setData({
                        showWidown: !0,
                        activitys: "活动状态",
                        activityState: t.data.msg,
                        urlContent: "去华为商城逛逛",
                        url: "../index/index",
                        isUrl: !0,
                        closeBox: !1
                    }) : t.data.msg && wx.showModal({
                        title: "提示",
                        content: t.data.msg
                    });
                }
            }, {
                CsrfToken: n
            });
        }, function() {
            wx.showModal({
                title: "提示",
                content: "操作失败，请稍后重试"
            });
        });
    },
    helpCallUp: function(o) {
        var i = this;
        return !a.stopRepeatClick(o, 3e3) && (o && o.detail && a.mpIsFormIdValid(o.detail.formId) && a.mpReportFormId(t, e, {
            formid: o.detail.formId,
            source: 1
        }), !i.data.isDoingAuth && (i.data.eventObj = o, i.data.authOptionFlag = 3, void (t.globalData.userInfo && i.initUserInfo())));
    },
    modifyAggregation4HelpCallUp: function(o) {
        var i = this;
        a.getCsrf(function(n) {
            a.mpPost(e.service.openApiDomain + "/ams/aggregation/modifyAggregationState", {
                activityCode: i.data.activityCode,
                aggregationId: i.data.aggregationId,
                headUrl: t.globalData.userInfo.avatarUrl || "",
                formId: o.detail.formId
            }, {
                successFunc: function(t) {
                    t.data.success ? (i.setData({
                        showEnvelopCreat: !1,
                        showDetail: !0
                    }), i.callUpDetail(i)) : "9105" == t.data.code || "9104" == t.data.code ? i.setData({
                        showWidown: !0,
                        activitys: "活动状态",
                        activityState: t.data.msg,
                        urlContent: "去华为商城逛逛",
                        url: "../index/index",
                        isUrl: !0,
                        closeBox: !1
                    }) : "false" == o.currentTarget.dataset.callup && "9139" == t.data.code ? i.setData({
                        showWidown: !0,
                        activitys: "活动状态",
                        activityState: t.data.msg,
                        isUrl: !1,
                        closeBox: !1
                    }) : "9118" == t.data.code ? i.setData({
                        showWidown: !0,
                        activityState: t.data.msg,
                        activitys: "活动状态",
                        urlContent: "查看我参与的活动",
                        url: "../redEnvelopesList/redEnvelopesList?activityCode=" + i.data.activityCode,
                        isUrl: !0,
                        closeBox: !1
                    }) : "9138" == t.data.code ? wx.showModal({
                        title: "提示",
                        content: "红包已过期"
                    }) : t.data.msg && wx.showModal({
                        title: "提示",
                        content: t.data.msg
                    });
                }
            }, {
                CsrfToken: n
            });
        }, function() {
            wx.showModal({
                title: "提示",
                content: "操作失败，请稍后重试",
                showCancel: !1
            });
        });
    },
    creactMyActivity: function() {
        var a = this;
        if (a.data.isDoingAuth) return !1;
        a.data.authOptionFlag = 6, t.globalData.userInfo && a.initUserInfo();
    },
    getCoupon: function(a) {
        var e = this;
        return !e.data.isCreateClicked && (e.setData({
            isCreateClicked: !0
        }), setTimeout(function() {
            e.setData({
                isCreateClicked: !1
            });
        }, 3e3), !e.data.isDoingAuth && (e.data.eventObj = a, e.data.authOptionFlag = 4, 
        void (t.globalData.userInfo && e.initUserInfo())));
    },
    receiveCouponOption: function(t) {
        var o = this;
        -1 == o.data.isCurrentUserReceiveCoupon && a.getCsrf(function(t) {
            a.mpPost(e.service.openApiDomain + "/ams/coupon/receive", {
                activityCode: o.data.actCode,
                batchCode: o.data.batchCode
            }, {
                successFunc: function(t) {
                    if (t.data.success) {
                        var i = {
                            activityCode: o.data.activityCode,
                            aggregationId: o.data.aggregationId - 0,
                            batchCode: o.data.batchCode,
                            batchName: o.data.batchName
                        };
                        a.getCsrf(function(t) {
                            a.mpPost(e.service.openApiDomain + "/ams/aggregation/modifyAggregationReceive", i, {
                                successFunc: function(t) {
                                    if (t.data.success) {
                                        o.setData({
                                            showWidown: !0,
                                            activitys: "获得优惠券",
                                            activityState: "恭喜您获得【" + o.data.batchName + "】一张，稍后将发放至优惠券中心",
                                            urlContent: "查看我的优惠券",
                                            url: "../couponList/couponList",
                                            isUrl: !0,
                                            isCurrentUserReceiveCoupon: 1,
                                            closeBox: !1
                                        });
                                    } else t.data.msg && wx.showModal({
                                        title: "提示",
                                        content: t.data.msg
                                    });
                                }
                            }, {
                                CsrfToken: t
                            });
                        }, function() {
                            wx.showModal({
                                title: "提示",
                                content: "操作失败，请稍后重试",
                                showCancel: !1
                            });
                        });
                    } else if ("9212" == t.data.code) {
                        o.setData({
                            showWidown: !0,
                            activitys: "已获得优惠券",
                            activityState: "您已领取过优惠券了哟",
                            urlContent: "查看我的优惠券",
                            url: "../couponList/couponList",
                            isUrl: !0,
                            closeBox: !1
                        });
                    } else t.data.msg && wx.showModal({
                        title: "提示",
                        content: t.data.msg
                    });
                }
            }, {
                CsrfToken: t
            });
        }, function() {
            wx.showModal({
                title: "提示",
                content: "操作失败，请稍后重试",
                showCancel: !1
            });
        });
    },
    callUpFriends: function() {
        var t = this;
        "" == t.data.share ? wx.showModal({
            title: "提示",
            content: "活动已结束"
        }) : t.onShareAppMessage();
    },
    callUpDetail: function(t) {
        a.mpGet(e.service.openApiDomain + "/ams/aggregation/getAggregation", {
            activityCode: t.data.activityCode,
            aggregationId: t.data.aggregationId
        }, {
            successFunc: function(a) {
                if (a.data.success) {
                    var e = !1;
                    a.data.user && a.data.user.length > 0 && (1 == a.data.isCurrentUserAggregated ? a.data.user.forEach(function(t, a) {
                        t.userId == wx.getStorageSync("userId") && (e = 1 != t.isOriginate);
                    }) : e = !0, t.setData({
                        user: a.data.user
                    })), 1 == a.data.isCurrentUserAggregated && t.setData({
                        isCurrentUserReceiveCoupon: a.data.isCurrentUserReceiveCoupon
                    }), t.setData({
                        friendsMount: a.data.aggregationNumber - t.data.user.length,
                        aggregationState: a.data.aggregationState,
                        aggregationId: a.data.aggregationId,
                        isCurrentUserAggregated: a.data.isCurrentUserAggregated,
                        buildMyActivity: e
                    });
                } else "9102" == json.data.code || "9103" == json.data.code || "9104" == json.data.code || "9105" == json.data.code ? t.setData({
                    showWidown: !0,
                    activitys: "活动状态",
                    activityState: json.data.msg,
                    urlContent: "去华为商城逛逛",
                    url: "../index/index",
                    isUrl: !0,
                    closeBox: !1
                }) : a.data.msg && wx.showModal({
                    title: "提示",
                    content: a.data.msg
                });
            }
        });
    },
    closeWindown: function() {
        this.setData({
            showWidown: !1
        });
    },
    goToSeeRelatedPrd: function() {
        var a = this;
        return !a.data.isCreateClicked && (a.setData({
            isCreateClicked: !0
        }), setTimeout(function() {
            a.setData({
                isCreateClicked: !1
            });
        }, 3e3), !a.data.isDoingAuth && (a.data.authOptionFlag = 5, void (t.globalData.userInfo && a.initUserInfo())));
    },
    onAuthSelect: function(e) {
        var o = this;
        if (t.globalData.userInfo) return !1;
        e && (e.detail && e.detail.userInfo || e.type && "authSelect" == e.type) && (o.data.isDoingAuth = !0, 
        o.setData({
            isNeedOpenType: !1
        }), wx.showLoading({
            mask: !0,
            title: "正在登录..."
        }), a.mpAuthorizeAndLogin(function() {
            wx.hideLoading(), o.setData({
                isLogin: !0
            }), o.setPersonalInfo(), o.refreshAfterLogin();
        }, function() {
            1 == o.data.authOptionFlag && o.refreshAfterLogin(), wx.showToast({
                title: "登录失败，请稍后重试",
                icon: "none"
            }), o.setData({
                isLogin: !1,
                authOptionFlag: 0,
                isDoingAuth: !1
            });
        }));
    },
    onCloseModal: function(t) {
        var a = this;
        t && "closeModal" == t.type && a.setData({
            isShowAuthModal: !1,
            wxModalIsShow: !1
        });
    },
    onShowWXModal: function(t) {
        var a = this;
        t && "showWXModal" == t.type && a.setData({
            wxModalIsShow: !0
        });
    },
    openAuthModal4Btn: function() {
        var a = this;
        if (a.data.isDoingAuth) return !1;
        a.data.authOptionFlag = 1, t.globalData.userInfo && a.initUserInfo();
    },
    initUserInfo: function() {
        var e = this;
        a.mpQueryUserStatus(function() {
            e.setData({
                isLogin: !0
            }), e.setPersonalInfo(), e.refreshAfterLogin();
        }, function() {
            wx.showLoading({
                mask: !0,
                title: "正在登录..."
            }), a.mpLogin(t, function(t) {
                t && t.data && t.data.success ? (wx.hideLoading(), e.setData({
                    isLogin: !0
                }), e.setPersonalInfo(), e.refreshAfterLogin()) : (e.setData({
                    isLogin: !1
                }), 1 == e.data.authOptionFlag && e.refreshAfterLogin(), e.data.authOptionFlag = 0, 
                wx.showToast({
                    title: "登录失败，请稍后重试",
                    icon: "none"
                }));
            }, !1);
        });
    },
    refreshAfterLogin: function() {
        var t = this;
        switch (t.data.authOptionFlag) {
          case 1:
            t.IsJoinCallUp(), t.data.isDoingAuth = !1;
            break;

          case 2:
            t.saveAggregation4CreateCallUp(t.data.eventObj), t.data.isDoingAuth = !1;
            break;

          case 3:
            t.modifyAggregation4HelpCallUp(t.data.eventObj), t.data.isDoingAuth = !1;
            break;

          case 4:
            t.receiveCouponOption(t.data.eventObj), t.data.isDoingAuth = !1;
            break;

          case 5:
            t.setData({
                showWidown: !1
            }), wx.navigateTo({
                url: t.data.url,
                complete: function() {
                    t.data.isDoingAuth = !1;
                }
            });
            break;

          case 6:
            t.setData({
                showEnvelopCreat: !0,
                showDetail: !1,
                showWidown: !1,
                callUp: !0,
                isDoingAuth: !1
            });
            break;

          case 7:
            wx.navigateTo({
                url: "../redEnvelopesList/redEnvelopesList?activityCode=" + t.data.activityCode,
                complete: function() {
                    t.data.isDoingAuth = !1;
                }
            });
            break;

          default:
            t.data.isDoingAuth = !1;
        }
        t.data.authOptionFlag = 0;
    },
    gotoMyActivity: function() {
        var a = this;
        if (a.data.isDoingAuth) return !1;
        if (a.data.authOptionFlag = 7, t.globalData.userInfo) {
            if (a.stopDoubleClick()) return !1;
            a.initUserInfo();
        }
    },
    stopDoubleClick: function() {
        var t = this;
        return !!t.data.isBtnClicked || (t.setData({
            isBtnClicked: !0
        }), setTimeout(function() {
            t.setData({
                isBtnClicked: !1
            });
        }, 3e3), !1);
    }
});

var o = function(t, e) {
    if (t >= 1e3) {
        var o = Math.floor(t / 1e3), i = Math.floor(o / 3600), n = parseInt(i / 24), s = 0;
        n > 0 && (s = i % 24);
        var r = Math.floor((o - 60 * i * 60) / 60), d = o - 60 * i * 60 - 60 * r;
        return i = a.formatNumber(i), s = a.formatNumber(s), r = a.formatNumber(r), d = a.formatNumber(d), 
        n <= 0 ? e.setData({
            daysold: "",
            hoursold: i,
            minsold: r,
            seconds: d
        }) : e.setData({
            daysold: n + "天",
            hoursold: s,
            minsold: r,
            seconds: d
        }), e.setData({
            share: "share"
        }), !0;
    }
    return e.setData({
        seconds: "00",
        share: ""
    }), !1;
};