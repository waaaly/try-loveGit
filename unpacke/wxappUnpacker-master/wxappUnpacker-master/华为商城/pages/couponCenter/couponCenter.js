var t = getApp(), a = t.globalData.mp, o = t.globalData.config;

Page({
    data: {
        coupNavDataList: [],
        toNavView: "nav0",
        toTabView: "tab0",
        currentTab: 0,
        showNoData: !1,
        totalPage: 1,
        currPage: 1,
        pageNum: 50,
        isNeedGetData: !0,
        couponRequestList: [],
        couponStateList: [],
        isFromLoginOut: !1,
        loginOutEventObj: null,
        isLoadingData: !1,
        isBtnClicked: !1,
        isLogin: !1,
        offsetTopList: [],
        moveStartPos: 0,
        offsetTop: 0,
        isFirstShowLoading: !0,
        isShowAuthModal: !1,
        wxModalIsShow: !1,
        authOptionFlag: 0,
        isOnLoad: !0,
        couponEvent: {},
        authWords: t.globalData.authorizeWords,
        isDoingAuth: !1,
        isNeedOpenType: !0
    },
    onLoad: function() {
        var t = this;
        t.getCouponData(function() {
            t.data.authOptionFlag = 1, a.mpCheckUserAuthStatus(function(a) {
                t.setData({
                    isShowAuthModal: !1,
                    isNeedOpenType: !1
                }), t.initUserInfo();
            }, function(a) {
                t.setData({
                    isShowAuthModal: !0,
                    isNeedOpenType: !0
                }), t.data.showNoData || t.setData({
                    coupNavDataList: t.data.coupNavDataList
                });
            });
        }), t.data.isOnLoad = !0;
    },
    onReady: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    windowHeight: a.windowHeight
                });
            }
        });
    },
    onShow: function() {
        var a = this;
        a.data.isBtnClicked && a.setData({
            isBtnClicked: !1
        }), a.data.isOnLoad || (a.data.authOptionFlag = 1, t.globalData.userInfo ? a.initUserInfo() : a.data.isShowAuthModal || a.setData({
            isShowAuthModal: !0
        }));
    },
    onHide: function() {
        var t = this;
        t.data.isOnLoad = !1, t.data.wxModalIsShow || t.setData({
            isShowAuthModal: !1
        });
    },
    navMap: function(t) {
        this.setData({
            currentTab: t.currentTarget.dataset.current,
            toNavView: "nav" + t.currentTarget.dataset.current,
            toTabView: "tab" + t.currentTarget.dataset.current
        });
    },
    coupScroll: function(t) {
        var a = this, o = this.data.offsetTopList, e = t.detail.scrollTop;
        a.data.offsetTop = e, e > a.data.moveStartPos ? (a.setData({
            moveStartPos: e
        }), o.forEach(function(t, o) {
            Math.abs(e - t.top) < 20 && a.data.currentTab < o && a.setData({
                currentTab: o,
                toNavView: "nav" + o
            });
        })) : e < a.data.moveStartPos && (a.setData({
            moveStartPos: e
        }), o.forEach(function(t, o) {
            if (e < t.top - 20 && a.data.currentTab >= o) {
                var i = a.data.currentTab = o ? o - 1 : o;
                a.setData({
                    currentTab: i,
                    toNavView: "nav" + i
                });
            }
        }));
    },
    doScrollToUp: function(t) {
        var a = this;
        setTimeout(function() {
            a.setData({
                currentTab: 0,
                toNavView: "nav0"
            });
        }, 500);
    },
    getCouponData: function(t) {
        wx.showLoading({
            mask: !0,
            title: "加载中..."
        });
        var e = this;
        a.mpGet(o.service.openApiDomain + "/mcp/coupon/queryCouponFloorInfo", {}, {
            successFunc: function(o) {
                wx.hideLoading(), o.data.couponFloorInfoList && o.data.couponFloorInfoList.length > 0 ? (o.data.couponFloorInfoList.forEach(function(t, a) {
                    t.id = a, t.isShow = !0, t.couponDetailList && t.couponDetailList.length > 0 && t.couponDetailList.forEach(function(t, o) {
                        t.state = 1, t.id = a + "-" + o, t.beginTime = t.beginTime.split(" ")[0].replace(/-/g, "."), 
                        t.endTime = t.endTime.split(" ")[0].replace(/-/g, ".");
                    });
                }), e.data.coupNavDataList = o.data.couponFloorInfoList, e.setData({
                    showNoData: !1
                }, function() {
                    t && a.mpIsFunction(t) && t();
                })) : (e.setData({
                    showNoData: !0
                }, function() {
                    t && a.mpIsFunction(t) && t();
                }), o.data.success ? wx.hideLoading() : wx.showToast({
                    title: "优惠券数据请求失败！",
                    icon: "none"
                }));
            },
            failFunc: function(o) {
                e.setData({
                    showNoData: !0
                }, function() {
                    t && a.mpIsFunction(t) && t();
                }), wx.showToast({
                    title: "优惠券数据请求失败！",
                    icon: "none"
                });
            }
        });
    },
    refreshStateByAMS: function() {
        var t = this;
        if (t.data.couponRequestList = [], !(t.data.coupNavDataList.length > 0)) return t.data.isFromLoginOut = !1, 
        !1;
        t.data.coupNavDataList.forEach(function(a, o) {
            a.couponDetailList && a.couponDetailList.length > 0 && a.couponDetailList.forEach(function(a, o) {
                var e = {};
                e.activityCode = a.activityCode, e.batchCode = a.batchCode, t.data.couponRequestList.push(e);
            });
        });
        var a = t.data.couponRequestList.length;
        a <= t.data.pageNum ? (t.data.totalPage = 1, t.data.currPage = 1) : (a % t.data.pageNum == 0 ? t.data.totalPage = a / t.data.pageNum : t.data.totalPage = Math.floor(a / t.data.pageNum) + 1, 
        t.data.currPage = 1), t.data.isLoadingData || t.getStatesByAMS();
    },
    getStatesByAMS: function() {
        var t = this, e = [];
        if (!t.data.isNeedGetData) return t.data.isFromLoginOut = !1, !1;
        if (t.data.isLoadingData = !0, 1 == t.data.totalPage) e = t.data.couponRequestList; else if (t.data.totalPage > 1) {
            var i = (t.data.currPage - 1) * t.data.pageNum, n = t.data.pageNum;
            t.data.couponRequestList.length % t.data.pageNum != 0 && t.data.currPage == t.data.totalPage && (n = t.data.couponRequestList.length - (t.data.currPage - 1) * t.data.pageNum);
            for (var s = i, u = 0; u < n; s++, u++) e.push(t.data.couponRequestList[s]);
        }
        a.mpGet(o.service.openApiDomain + "/ams/coupon/queryCouponStates", {
            listQueryCouponStateReqs: e
        }, {
            successFunc: function(a) {
                t.data.isLoadingData = !1, a.data.couponStateData && a.data.couponStateData.length > 0 && (t.data.couponStateList = t.data.couponStateList.concat(a.data.couponStateData)), 
                t.getStatesByPageNum();
            },
            failFunc: function(a) {
                t.data.isLoadingData = !1, t.getStatesByPageNum();
            }
        });
    },
    getStatesByPageNum: function() {
        var t = this;
        1 == t.data.totalPage ? (t.data.isNeedGetData = !1, t.refreshPageCouponStates()) : t.data.totalPage > 1 && (t.data.currPage == t.data.totalPage ? (t.data.isNeedGetData = !1, 
        t.refreshPageCouponStates()) : t.data.currPage < t.data.totalPage ? (t.data.currPage++, 
        t.getStatesByAMS()) : (t.data.isNeedGetData = !1, t.refreshPageCouponStates()));
    },
    refreshPageCouponStates: function() {
        var t = this;
        t.data.coupNavDataList.length > 0 && t.data.couponStateList.length > 0 ? (t.data.coupNavDataList.forEach(function(a, o) {
            a.couponDetailList && a.couponDetailList.length > 0 && a.couponDetailList.forEach(function(a, o) {
                t.data.couponStateList.forEach(function(t, o) {
                    a.activityCode == t.activityCode && a.batchCode == t.batchCode && (a.state = t.receiveStates);
                });
            });
        }), t.refreshFloorShowOrHide(), t.data.isFromLoginOut && (t.getCouponAction(t.data.loginOutEventObj), 
        t.data.isFromLoginOut = !1)) : (wx.hideLoading(), t.data.coupNavDataList.length > 0 ? (t.setData({
            showNoData: !1,
            coupNavDataList: t.data.coupNavDataList
        }), setTimeout(function() {
            e(t);
        }, 200)) : t.setData({
            showNoData: !0
        }));
    },
    refreshFloorShowOrHide: function() {
        var t = this, a = [];
        t.data.coupNavDataList.length > 0 && t.data.coupNavDataList.forEach(function(t, o) {
            if (t.couponDetailList && t.couponDetailList.length > 0) {
                var e = !1;
                t.couponDetailList.forEach(function(t, a) {
                    1 != t.state && 2 != t.state && -1 != t.state || (e = !0);
                }), t.isShow = e;
            } else t.isShow = !1;
            t.isShow && a.push(t);
        }), t.data.isFirstShowLoading && (t.data.isFirstShowLoading = !1, wx.hideLoading()), 
        a.length > 0 ? (t.setData({
            showNoData: !1,
            coupNavDataList: a
        }), setTimeout(function() {
            e(t);
        }, 200), t.data.currentTab + 1 > a.length && (t.data.currentTab = a.length - 1)) : t.setData({
            showNoData: !0
        });
    },
    getCouponByAuth: function(a) {
        var o = this;
        if (o.data.isDoingAuth) return !1;
        o.data.authOptionFlag = 2, o.data.couponEvent = a, t.globalData.userInfo && o.getCouponAction(a);
    },
    getCouponAction: function(e) {
        var i = this, n = e.currentTarget.dataset.activitycode, s = e.currentTarget.dataset.batchcode, u = e.currentTarget.dataset.idx;
        return i.data.isLogin || !i.stopDoubleClick() || i.data.isFromLoginOut ? !(a.stopRepeatClick(e, 3e3) && !i.data.isFromLoginOut) && (i.data.loginOutEventObj = e, 
        void a.mpGet(o.service.openApiDomain + "/mcp/user/queryUserLoginStatus", {}, {
            successFunc: function(o) {
                o.data.login ? (i.getReceiveRes(n, s, u), i.data.isFromLoginOut = !1) : a.mpLogin(t, function(t) {
                    i.getUserStatusAndRefresh();
                });
            },
            failFunc: function(o) {
                a.mpLogin(t, function(t) {
                    i.getUserStatusAndRefresh();
                });
            }
        })) : (i.data.isLogin = !0, !1);
    },
    getUserStatusAndRefresh: function() {
        var t = this;
        a.mpGet(o.service.openApiDomain + "/mcp/user/queryUserLoginStatus", {}, {
            successFunc: function(a) {
                a.data.login ? (t.data.isFromLoginOut = !0, t.refreshStateByAMS()) : (t.data.isFromLoginOut = !1, 
                wx.showToast({
                    title: "数据请求失败!",
                    icon: "none"
                }));
            },
            failFunc: function(a) {
                t.data.isFromLoginOut = !1, wx.showToast({
                    title: "数据请求失败!",
                    icon: "none"
                });
            }
        });
    },
    getReceiveRes: function(t, e, i) {
        var n = this;
        a.getCsrf(function(s) {
            a.mpPost(o.service.openApiDomain + "/ams/coupon/receive", {
                activityCode: t,
                batchCode: e,
                receiveChannel: 1
            }, {
                successFunc: function(t) {
                    t.data.success ? (wx.showToast({
                        title: "优惠券领取成功！",
                        icon: "none"
                    }), n.data.coupNavDataList.forEach(function(a, o) {
                        a.couponDetailList.forEach(function(a, o) {
                            a.id == i && (a.state = t.data.state);
                        });
                    }), n.refreshFloorShowOrHide()) : wx.showToast({
                        title: t.data.errorTip || "优惠券领取失败，请稍后重试",
                        icon: "none"
                    });
                },
                failFunc: function(t) {
                    wx.showToast({
                        title: "请求发送失败！",
                        icon: "none"
                    });
                }
            }, {
                CsrfToken: s
            });
        }, function() {
            wx.showToast({
                title: "请求发送失败！",
                icon: "none"
            });
        });
    },
    gotoCouponList: function() {
        var a = this;
        if (a.data.isDoingAuth) return !1;
        if (a.data.authOptionFlag = 3, t.globalData.userInfo) {
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
    },
    onAuthSelect: function(o) {
        var e = this;
        if (t.globalData.userInfo) return !1;
        o && (o.detail && o.detail.userInfo || o.type && "authSelect" == o.type) && (e.data.isDoingAuth = !0, 
        e.setData({
            isNeedOpenType: !1
        }), wx.showLoading({
            mask: !0,
            title: "正在登录..."
        }), 1 == e.data.authOptionFlag || 3 == e.data.authOptionFlag ? a.mpAuthorizeAndLogin(function() {
            wx.hideLoading(), e.data.isLogin = !0, e.refreshAfterLogin();
        }, function() {
            e.setData({
                isLogin: !1,
                isDoingAuth: !1
            }), wx.showToast({
                title: "登录失败，请稍后重试",
                icon: "none"
            });
        }) : 2 == e.data.authOptionFlag && a.mpCheckUserAuthStatus(function(t) {
            wx.hideLoading(), e.refreshAfterLogin(), e.data.isLogin = !0, e.setData({
                isNeedOpenType: !1
            });
        }, function(t) {
            e.setData({
                isLogin: !1,
                isDoingAuth: !1,
                isNeedOpenType: !0
            }), wx.showToast({
                title: "登录失败，请稍后重试",
                icon: "none"
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
    refreshAfterLogin: function() {
        var t = this;
        1 == t.data.authOptionFlag ? (t.refreshStateByAMS(), t.data.isDoingAuth = !1) : 2 == t.data.authOptionFlag ? (t.getCouponAction(t.data.couponEvent), 
        t.data.isDoingAuth = !1) : 3 == t.data.authOptionFlag ? (t.refreshStateByAMS(), 
        wx.navigateTo({
            url: "../couponList/couponList",
            complete: function() {
                t.data.isDoingAuth = !1;
            }
        })) : t.data.isDoingAuth = !1, t.data.authOptionFlag = 0;
    },
    initUserInfo: function() {
        var o = this;
        a.mpQueryUserStatus(function() {
            o.data.isLogin = !0, o.refreshAfterLogin();
        }, function() {
            wx.showLoading({
                mask: !0,
                title: "正在登录..."
            }), a.mpLogin(t, function(t) {
                t && t.data && t.data.success ? (wx.hideLoading(), o.data.isLogin = !0, o.refreshAfterLogin()) : (wx.showToast({
                    title: "登录失败，请稍后重试",
                    icon: "none"
                }), o.data.isLogin = !1);
            }, !1);
        });
    }
});

var e = function(t) {
    var a = 30, o = [];
    wx.createSelectorQuery().select(".coup-nav").boundingClientRect(function(e) {
        e && e.height && (a = e.height), wx.createSelectorQuery().selectAll(".coup-tab").boundingClientRect(function(e) {
            e.forEach(function(e, i) {
                o.push({
                    top: e.top - a + t.data.offsetTop
                }), t.setData({
                    offsetTopList: o
                });
            });
        }).exec();
    }).exec();
};