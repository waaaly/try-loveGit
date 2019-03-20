var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = getApp(), e = a.globalData.mp, s = a.globalData.config, o = require("../../plugins/wxParse/wxParse.js"), i = 0;

Array.prototype.equals = function(t) {
    if (!t) return !1;
    if (this.length != t.length) return !1;
    for (var a = 0, e = this.length; a < e; a++) if (this[a] instanceof Array && t[a] instanceof Array) {
        if (!this[a].equals(t[a])) return !1;
    } else if (this[a] != t[a]) return !1;
    return !0;
}, Object.defineProperty(Array.prototype, "equals", {
    enumerable: !1
}), Page({
    data: {
        defaultSkuCode: "",
        goods: !0,
        goodsTab: !0,
        details: !1,
        param: !1,
        evaluate: !1,
        windowHeight: 0,
        windowWidth: 0,
        imgIndex: 1,
        currentIndex: 0,
        imgLarge: 1,
        openIcon: !1,
        packing: "",
        custServicename: "",
        bigImg: "",
        current_skuId: "",
        majorSpecificationList: [],
        scrollTop: 0,
        scrollHeight: 0,
        defaultAttrSkuid: "",
        relatedProductList: [],
        skuList: [],
        remarkLabel: [],
        imgdetailsrc: "",
        prdId: "",
        firstIndex: -1,
        deal_skuAttrValueList: [],
        currAllSkuList: [],
        orgin_skuAttrValueList: [],
        attrValueList: [],
        amount: 1,
        index: 1,
        scaleWidth: "",
        scaleHeight: "",
        showRed: 0,
        inventory: 1,
        limitedQuantity: 0,
        toastState: !1,
        toastCont: "",
        giftCodesList: [],
        giftsUsefulList: [],
        showProDown: !1,
        buttonClass: "1-big-disabled",
        buttonText: "",
        buttonAreaClass: "hide",
        showPrice: "null",
        showSalePrice: "",
        totalList: !1,
        loading: !1,
        loadMore: !1,
        pageSize: 20,
        comments: [],
        topCommentObj: {},
        commentsShowFlag: 0,
        totalRow: "",
        totalPage: "",
        prdTipsShow: !0,
        nowBuy: {
            itemId: "",
            itemType: "S0",
            qty: 1,
            gifts: []
        },
        numDelClass: "",
        numAddClass: "",
        skuLimitQty: "1",
        pageNum: 1,
        getgoodImg: !1,
        getparm: !1,
        getRemarkFlag: !1,
        isCreateClicked: !1,
        supportClickedFlag: !1,
        showPromWord: !0,
        teamBuyInfo: {},
        TeamBuyOrderReqArg: {
            teamBuyId: "",
            headUrl: "",
            name: "",
            openId: "",
            formId: ""
        },
        openTeamBuyArr: [],
        openTeamBuyArrOnly: [],
        showOpenTeamInfo: !1,
        openIsOnly: !0,
        cutDownDay: "0",
        cutDownHour: "00",
        cutDownMinute: "00",
        cutDownSeconds: "00",
        activeTimer: null,
        openTeamsTimer: null,
        isBtnClicked: !1,
        isBtnClicked4Sku: !1,
        isLoadingCommentData: !1,
        isImgLoading: !1,
        isParamLoading: !1,
        isGiftSelected: !1,
        isOnLoad: !0,
        isOpenTeamTimerActive: !1,
        currentTab: 0,
        isNewPeopleTeam: !1,
        buttonMode: "1",
        buttonShowMode: "1",
        rushBuyActiveStatus: "1",
        skuRushBuyInfo: {},
        showRushBuyAddressFloat: !1,
        showRushBuySelectFloat: !1,
        showRushBuyPriceArea: !1,
        rushBuyTimer: null,
        currentSkuSelectName: "",
        userIsAllowBuy: !0,
        rushBuyParamsStr: "",
        rushPriceInfo: {},
        productType: "",
        balanceStartTime: "",
        balanceEndTime: "",
        showDepositRules: !1,
        showFixedTimer: !1,
        fixedMonth: "",
        fixedDay: "",
        fixedHour: "",
        fixedMinute: "",
        fixedTimeInfo: {},
        fixedTimer: null,
        depositPrice: "",
        showDepositArea: !1,
        currRequestDeposit: 0,
        isContinueReq: !1,
        isShowShareModel: !1,
        skuPriceInfo: {},
        isShowPoster: !1,
        detailRules: [],
        showRules: !1,
        mpWapDetailRuleUrl: "",
        teamBuyFlowUrl: "",
        isLogin: !1,
        authOptionFlag: 0,
        authEvent: {},
        isHiddenPoster: !0,
        isHiddenAll: !1,
        isSurePrice: "",
        currentSkuInfo: {},
        rushWatchTimer: null,
        isDoingAuth: !1,
        isCanclick: !1,
        hasTimerPromWord: !1,
        timerPromWord: "",
        timerPromLink4Wechat: "",
        promoRuleList: [],
        promoRuleListA: [],
        promoRuleListB: [],
        showPromRule: !1,
        showPromArrow: !1,
        promTimer: null,
        promListHeight: "750rpx",
        isPromClicked: !1,
        promListTop: 0,
        currSbomCode4RB: "",
        isNeedOpenType: !0
    },
    onLoad: function(t) {
        var e = this;
        if (t.skuCode && this.setData({
            defaultSkuCode: t.skuCode
        }), this.setData({
            prdId: t.prdId,
            cdnPath: s.service.cdnPath
        }), a.globalData.userInfo ? e.setData({
            isNeedOpenType: !1
        }) : e.setData({
            isNeedOpenType: !0
        }), t.cid && (wx.setStorageSync("cid", t.cid), t.wi)) {
            var o = t.wi.substr(0, 201);
            wx.setStorageSync("wi", o);
        }
        if (wx.getStorageSync("prdTipsHide") && e.setData({
            prdTipsShow: !1
        }), t.scene) {
            var i = decodeURIComponent(t.scene).toString().split("#"), n = i[0], u = i[1] || "", c = i[2] || "";
            c && wx.setStorageSync("cid", c), e.setData({
                prdId: n || "",
                defaultSkuCode: u || ""
            });
        }
        d(this), r(this), b(this), e.data.isOnLoad = !0;
    },
    onUnload: function() {
        var t = this;
        clearInterval(t.data.activeTimer), t.data.activeTimer = null, clearInterval(t.data.openTeamsTimer), 
        t.data.openTeamsTimer = null, clearInterval(t.data.fixedTimer), t.data.fixedTimer = null;
    },
    onShow: function() {
        var t = this;
        t.data.isBtnClicked && (t.data.isBtnClicked = !1), t.data.isCreateClicked && (t.data.isCreateClicked = !1), 
        t.data.isOnLoad || "16" != t.data.buttonShowMode && "21" != t.data.buttonShowMode || t.data.teamBuyInfo && t.data.teamBuyInfo.state && ("3" != t.data.teamBuyInfo.state && t.getTeamBuyInfoBySbom(t.data.current_skuId), 
        t.getOpenTeam4CutDown()), t.data.isOnLoad || "8" != t.data.buttonShowMode || (t.data.buttonClass = "1-big-disabled", 
        t.data.buttonText = "正在加载", t.getRushBuyActiveInfo(), clearTimeout(t.data.rushWatchTimer), 
        t.data.rushWatchTimer = null, t.data.rushWatchTimer = setTimeout(function() {
            "正在加载" == t.data.buttonText && (4 == t.data.productType ? t.data.buttonText = "支付订金" : t.data.buttonText = "立即申购", 
            t.setData({
                buttonClass: "1-big",
                buttonText: t.data.buttonText,
                buttonAreaClass: "",
                showRushBuyAddressFloat: !1,
                showRushBuySelectFloat: !0
            }));
        }, 3e3));
    },
    getOpenTeam4CutDown: function() {
        var t = this;
        t.data.showOpenTeamInfo && t.data.isOpenTeamTimerActive && "21" != t.data.buttonMode && t.getOpenTeamBuyInfoBySbom(t.data.teamBuyInfo.activityCode, t.data.current_skuId);
    },
    stopDoubleProm: function() {
        var t = this;
        return !!t.data.isPromClicked || (t.setData({
            isPromClicked: !0
        }), setTimeout(function() {
            t.setData({
                isPromClicked: !1
            });
        }, 200), !1);
    },
    handlePromList: function() {
        var t = this;
        if (t.stopDoubleProm() || t.data.supportClickedFlag) return !1;
        t.data.showPromRule = !t.data.showPromRule, t.data.showPromRule ? t.setData({
            showPromRule: !0
        }, function() {
            t.setData({
                promListHeight: "0",
                promListTop: 0
            });
        }) : (t.setData({
            promListHeight: "750rpx"
        }), setTimeout(function() {
            t.setData({
                showPromRule: !1,
                promListTop: 0
            });
        }, 200));
    },
    goPromWordLink: function() {
        var t = this;
        if (t.stopDoubleClick()) return !1;
        t.data.timerPromLink4Wechat && (t.data.timerPromLink4Wechat.startsWith("http") ? wx.navigateTo({
            url: "/pages/webview/webview?url=" + t.data.timerPromLink4Wechat
        }) : "/pages/index/index" == t.data.timerPromLink4Wechat || "/pages/classify/classify" == t.data.timerPromLink4Wechat || "/pages/personal/personal" == t.data.timerPromLink4Wechat ? wx.switchTab({
            url: t.data.timerPromLink4Wechat
        }) : wx.navigateTo({
            url: t.data.timerPromLink4Wechat
        }));
    },
    handlePromArrow: function() {
        var t = 0, a = this;
        wx.createSelectorQuery().select("#prom-box").boundingClientRect(function(e) {
            t = e.height, wx.createSelectorQuery().select("#prom-content").boundingClientRect(function(e) {
                e.height > t && a.setData({
                    showPromArrow: !0
                });
            }).exec();
        }).exec();
    },
    openText: function() {
        var t = this;
        t.setData({
            openIcon: !t.data.openIcon
        });
    },
    onHide: function() {
        var t = this;
        t.data.isOnLoad = !1, clearTimeout(t.data.rushWatchTimer), t.data.rushWatchTimer = null, 
        "16" == t.data.buttonShowMode ? (t.data.teamBuyInfo && t.data.teamBuyInfo.state && clearInterval(t.data.activeTimer), 
        t.data.showOpenTeamInfo && clearInterval(t.data.openTeamsTimer)) : "8" == t.data.buttonShowMode && t.data.rushBuyTimer && (clearTimeout(t.data.rushBuyTimer), 
        t.data.rushBuyTimer = null), t.data.promTimer && clearInterval(t.data.promTimer);
    },
    onReady: function(t) {
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    windowHeight: t.windowHeight,
                    windowWidth: t.windowWidth
                });
            }
        }), a.data.isCanclick = !0;
    },
    onShareAppMessage: function(t) {
        var a = this, e = "", s = "", o = "", i = "", n = a.data.sbomAbbr || a.data.name;
        if (a.setData({
            isShowShareModel: !1
        }), i = a.data.unitPrice ? "¥" + a.data.unitPrice : a.data.orderPrice ? "¥" + a.data.orderPrice : "暂无报价", 
        wx.getStorageSync("cid") && (e = wx.getStorageSync("cid"), wx.getStorageSync("wi") && (s = wx.getStorageSync("wi"))), 
        "16" == a.data.buttonMode || "21" == a.data.buttonMode) {
            var u = a.data.teamBuyInfo.teamBuyPrice ? a.data.teamBuyInfo.teamBuyPrice : a.data.orderPrice ? a.data.orderPrice : "暂无报价", r = a.data.teamBuyInfo.teamBuyNumber;
            o = r ? r + "人拼仅需" + u + "元，" + n : i + "|" + n;
        } else o = "8" == a.data.buttonMode && "4" == a.data.productType ? (i = "¥" + a.data.depositPrice) + "|" + n : "8" == a.data.buttonMode ? "1" == a.data.buttonShowMode && a.data.unitPrice ? (i = "¥" + a.data.unitPrice) + "|" + n : (i = a.data.orderPrice ? "¥" + a.data.orderPrice : "暂无报价") + "|" + n : i + "|" + n;
        return {
            title: o,
            path: "/pages/goodsDetail/goodsDetail?prdId=" + a.data.prdId + "&skuCode=" + a.data.defaultSkuCode + "&cid=" + e + "&wi=" + s,
            imageUrl: a.data.cdnPath + a.data.mainPhoto.photoPath + "428_428_" + a.data.mainPhoto.photoName,
            fail: function(t) {
                wx.showModal({
                    title: "提示",
                    content: "转发失败",
                    showCancel: !1
                });
            }
        };
    },
    closePrdTips: function() {
        var t = this;
        wx.setStorageSync("prdTipsHide", !0), t.setData({
            prdTipsShow: !1
        });
    },
    selectGood: function(t) {
        var a = this, e = t.currentTarget.dataset;
        return "0" != e.status && "2" != e.status && (!a.stopDoubleClick4Sku() && (this.setData({
            defaultAttrSkuList: e.skuidlist,
            imgIndex: 1,
            currentIndex: 0
        }), m(this, e), w(this.data.current_skuId, this), this.data.nowBuy.itemId = this.data.current_skuId, 
        void this.setData({
            nowBuy: this.data.nowBuy
        })));
    },
    selectGift: function(t) {
        var a = this;
        a.data.isGiftSelected = !0, this.data.nowBuy.gifts = [], this.data.giftList[t.currentTarget.dataset.listidx].forEach(function(t, a) {
            t.selected = !1;
        }), this.data.giftList[t.currentTarget.dataset.listidx][t.currentTarget.dataset.coloridx].selected = !0, 
        this.data.giftList.forEach(function(t, e) {
            t.forEach(function(t, e) {
                t.selected && a.data.nowBuy.gifts.push({
                    sbomCode: t.sbomCode
                });
            });
        }), this.setData({
            nowBuy: a.data.nowBuy
        }), this.setData({
            giftList: this.data.giftList
        });
    },
    refreshGiftsForBuy: function() {
        var t = this;
        t.data.nowBuy.gifts = [], t.data.giftList && t.data.giftList.length > 0 && (t.data.giftList.forEach(function(a, e) {
            a.forEach(function(a, e) {
                a.selected && t.data.nowBuy.gifts.push({
                    sbomCode: a.sbomCode
                });
            });
        }), t.setData({
            nowBuy: t.data.nowBuy
        }));
    },
    changIndex: function(t) {
        this.setData({
            imgIndex: t.detail.current + 1
        });
    },
    previewLargeImg: function(t) {
        var a = this, e = [];
        a.data.large = t.currentTarget.dataset.large, a.data.bigImages = t.currentTarget.dataset.bigimages, 
        a.data.bigImages.forEach(function(t) {
            e.push(t.large);
        }), wx.previewImage({
            current: a.data.large,
            urls: e
        });
    },
    doSwitchTab: function(t) {
        var a = this, e = t.detail.current;
        1 != e || a.data.getgoodImg || a.data.isImgLoading ? 2 != e || a.data.getparm || a.data.isParamLoading ? 3 != e || a.data.getRemarkFlag || a.data.isLoadingCommentData || n(a) : g(a) : p(a), 
        a.setData({
            currentTab: e
        });
    },
    goToGoods: function() {
        this.setData({
            currentTab: 0,
            scrollTop: 0
        });
    },
    goToDetails: function() {
        this.data.getgoodImg || p(this), this.setData({
            currentTab: 1,
            scrollTop: 0
        });
    },
    goToParam: function() {
        this.data.getparm || g(this), this.setData({
            currentTab: 2,
            scrollTop: 0
        });
    },
    goToEvaluate: function() {
        this.data.getRemarkFlag || n(this), this.setData({
            currentTab: 3,
            scrollTop: 0
        });
    },
    addNum: function(t) {
        var a = this, e = this.data.amount;
        e < a.data.skuLimitQty ? (a.data.nowBuy.qty = e + 1, a.setData({
            amount: e + 1,
            nowBuy: a.data.nowBuy
        }), a.data.amount == a.data.skuLimitQty && 2 == a.data.amount ? (a.data.numAddClass = "disabled", 
        a.data.numDelClass = "") : a.data.amount == a.data.skuLimitQty && (a.data.numAddClass = ""), 
        e + 1 == a.data.skuLimitQty && (a.data.numAddClass = "disabled"), a.setData({
            numAddClass: a.data.numAddClass,
            numDelClass: ""
        })) : (a.data.nowBuy.qty = e, a.setData({
            amount: e,
            nowBuy: a.data.nowBuy
        }), a.setData({
            toastState: !0,
            toastCont: "哎哟，购买数达上限啦",
            numAddClass: "disabled"
        }), setTimeout(function() {
            a.setData({
                toastState: !1
            });
        }, 3e3));
    },
    reduceNum: function(t) {
        var a = this.data.amount;
        if (a <= 1) return !1;
        2 == a && a == this.data.skuLimitQty ? this.setData({
            numAddClass: "",
            numDelClass: "disabled"
        }) : a == this.data.skuLimitQty ? a == this.data.skuLimitQty && this.setData({
            numAddClass: ""
        }) : a < this.data.skuLimitQty && 2 == a && this.setData({
            numDelClass: "disabled"
        }), this.data.nowBuy.qty = a - 1, this.setData({
            numDelClass: this.data.numDelClass,
            numAddClass: "",
            amount: a - 1,
            nowBuy: this.data.nowBuy
        });
    },
    openGetCoupon: function(t) {
        var a = this, e = a.data.windowWidth / 750;
        if (a.data.supportClickedFlag) return !1;
        a.setData({
            supportClickedFlag: !0
        }), setTimeout(function() {
            a.setData({
                supportClickedFlag: !1
            });
        }, 400);
        var s = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = s, s.translateY(750 * e || 400).step(), 1 == t.currentTarget.dataset.status ? (this.setData({
            animationData: s.export(),
            showGetCoupon: !0
        }), setTimeout(function() {
            s.translateY(0).step(), this.setData({
                animationData: s.export()
            });
        }.bind(this), 1)) : 0 == t.currentTarget.dataset.status && (this.setData({
            animationData: s.export()
        }), setTimeout(function() {
            s.translateY(0).step(), this.setData({
                animationData: s.export(),
                showGetCoupon: !1
            });
        }.bind(this), 200));
    },
    openSupport: function(t) {
        var a = this;
        if (a.data.supportClickedFlag || a.stopDoubleProm()) return !1;
        a.setData({
            supportClickedFlag: !0
        }), setTimeout(function() {
            a.setData({
                supportClickedFlag: !1
            });
        }, 400);
        var e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = e, e.translateY(300).step(), 1 == t.currentTarget.dataset.status ? (this.setData({
            animationData: e.export(),
            showsupport: !0
        }), setTimeout(function() {
            e.translateY(0).step(), this.setData({
                animationData: e.export()
            });
        }.bind(this), 1)) : 0 == t.currentTarget.dataset.status && (this.setData({
            animationData: e.export()
        }), setTimeout(function() {
            e.translateY(0).step(), this.setData({
                animationData: e.export(),
                showsupport: !1
            });
        }.bind(this), 200));
    },
    loadMoreParam: function() {
        this.goToParam();
    },
    loadMoreEvaluate: function() {
        this.goToEvaluate();
    },
    loadCommentMore: function() {
        var t = this;
        return 1 != t.data.totalPage && "" != t.data.totalPage && t.data.pageNum - 1 != t.data.totalPage && (!t.data.isLoadingCommentData && void n(t));
    },
    beforeReceive: function(t) {
        var e = this;
        if (e.data.isDoingAuth) return !1;
        if (e.setData({
            authOptionFlag: 5,
            authEvent: t
        }), a.globalData.userInfo) {
            if (e.stopDoubleClick()) return !1;
            e.initUserInfo();
        }
    },
    getCouponAction: function(t) {
        var a = this, o = t.currentTarget.dataset.activitycode, i = t.currentTarget.dataset.batchcode, n = t.currentTarget.dataset.idx;
        e.getCsrf(function(t) {
            e.mpPost(s.service.openApiDomain + "/ams/coupon/receive", {
                activityCode: o,
                batchCode: i,
                receiveChannel: 2
            }, {
                successFunc: function(t) {
                    if (t.data.success) {
                        a.setData({
                            toastState: !0,
                            toastCont: "优惠券领取成功"
                        }), setTimeout(function() {
                            a.setData({
                                toastState: !1
                            });
                        }, 1500);
                        var e = a.data.couponCodeList;
                        e[n].state = t.data.state, a.setData({
                            couponCodeList: e
                        });
                    } else a.setData({
                        toastState: !0,
                        toastCont: t.data.errorTip || "优惠券领取失败，请稍后重试"
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 1500);
                    a.data.isDoingAuth = !1;
                },
                failFunc: function(t) {
                    a.setData({
                        toastState: !0,
                        toastCont: "请求发送失败！"
                    }), setTimeout(function() {
                        a.setData({
                            toastState: !1
                        });
                    }, 1500), a.data.isDoingAuth = !1;
                }
            }, {
                CsrfToken: t
            });
        }, function() {
            a.setData({
                isDoingAuth: !1,
                toastState: !0,
                toastCont: "请求发送失败！"
            }), setTimeout(function() {
                a.setData({
                    toastState: !1
                });
            }, 3e3);
        });
    },
    toBuy: function(t) {
        var o = this;
        if (o.data.isCreateClicked) return !1;
        if (o.setData({
            isCreateClicked: !0
        }), setTimeout(function() {
            o.setData({
                isCreateClicked: !1
            });
        }, 3e3), t && t.detail && e.mpIsFormIdValid(t.detail.formId) && e.mpReportFormId(a, s, {
            formid: t.detail.formId,
            source: 3
        }), "1-big-disabled" == o.data.buttonClass) return !1;
        if ("提前登录" == t.currentTarget.dataset.button && "8" == o.data.buttonShowMode) {
            if (o.data.isDoingAuth) return !1;
            o.setData({
                authOptionFlag: 4
            }), a.globalData.userInfo && o.initUserInfo();
        } else if ("立即申购" != t.currentTarget.dataset.button && "支付订金" != t.currentTarget.dataset.button || "8" != o.data.buttonShowMode) {
            if ("立即购买" == t.currentTarget.dataset.button || "21" == o.data.buttonMode) {
                if (o.data.isGiftSelected || o.refreshGiftsForBuy(), o.data.isDoingAuth) return !1;
                o.setData({
                    authOptionFlag: 1
                }), a.globalData.userInfo && o.initUserInfo();
            }
        } else o.gotoQueue();
    },
    gotoQueue: function() {
        var t = this, a = "";
        t.setData({
            buttonClass: "1-big-disabled",
            buttonText: "正在加载"
        }), t.data.skuList.length > 0 && t.data.skuList.forEach(function(e, s) {
            e.sbomCode == t.data.current_skuId && e.sbomId && (a = e.sbomId);
        }), wx.navigateTo({
            url: "/packageRushBuy/pages/queue/queue?nowTime=" + (t.data.skuRushBuyInfo.currentTime || "") + "&skuId=" + (a || "") + "&activityId=" + (t.data.skuRushBuyInfo.activityId || "") + "&qid=" + (t.data.skuRushBuyInfo.qids || ""),
            complete: function() {
                t.data.isDoingAuth = !1;
            }
        });
    },
    toOpenTeam: function(t) {
        var o = this;
        return !o.stopDoubleClick() && (t && t.detail && e.mpIsFormIdValid(t.detail.formId) && e.mpReportFormId(a, s, {
            formid: t.detail.formId,
            source: 3
        }), "1-big-disabled" != o.data.buttonClass && "team-disabled" != o.data.buttonClass && ("1" == o.data.teamBuyInfo.state && (o.data.isGiftSelected || o.refreshGiftsForBuy(), 
        !o.data.isDoingAuth && (o.setData({
            authOptionFlag: 2
        }), void (a.globalData.userInfo && o.initUserInfo())))));
    },
    gotoJoinTeam: function(t) {
        var e = this;
        if (e.data.isDoingAuth) return !1;
        if (e.setData({
            authOptionFlag: 3,
            authEvent: t
        }), a.globalData.userInfo) {
            if (e.stopDoubleClick()) return !1;
            e.initUserInfo();
        }
    },
    showNumAddDel: function(t) {
        if (t.data.numAddClass = "", 0 == t.data.limitedQuantity && t.data.inventory <= 0) t.data.numAddClass = "disabled", 
        t.data.skuLimitQty = 0; else if (0 == t.data.limitedQuantity && t.data.inventory > 0) 1 == t.data.inventory ? t.data.numAddClass = "disabled" : t.data.numAddClass = "", 
        t.data.skuLimitQty = t.data.inventory; else if (t.data.limitedQuantity > 0 && t.data.inventory > 0) {
            var a = [ parseInt(t.data.limitedQuantity, 10), t.data.inventory ].sort(function(t, a) {
                return t - a;
            })[0];
            t.data.skuLimitQty = a, t.data.numAddClass = 1 == a ? "disabled" : "";
        } else t.data.limitedQuantity > 0 && t.data.inventory <= 0 && (t.data.skuLimitQty = 0, 
        t.data.numAddClass = "disabled");
        t.data.numDelClass = "disabled", t.setData({
            numAddClass: t.data.numAddClass,
            numDelClass: t.data.numDelClass,
            skuLimitQty: t.data.skuLimitQty
        });
    },
    showButtonType: function(t, a) {
        if (4 == t.data.productType) "8" == t.data.buttonMode ? (t.data.buttonClass = "1-big-disabled", 
        t.data.isContinueReq && (t.data.buttonText = "正在加载", t.getRushBuyActiveInfo(), clearTimeout(t.data.rushWatchTimer), 
        t.data.rushWatchTimer = null, t.data.rushWatchTimer = setTimeout(function() {
            "正在加载" == t.data.buttonText && t.setData({
                buttonClass: "1-big",
                buttonText: "支付订金",
                buttonAreaClass: "",
                showRushBuyAddressFloat: !1,
                showRushBuySelectFloat: !0
            });
        }, 3e3))) : (t.data.buttonClass = "1-big-disabled", t.data.buttonText = "暂时缺货"); else switch (Number(t.data.buttonMode)) {
          case 1:
            t.data.buttonShowMode = "1", t.data.inventory > 0 ? (t.data.buttonClass = "1-big", 
            t.data.buttonText = "立即购买") : (t.data.buttonClass = "1-big-disabled", t.data.buttonText = "暂时缺货");
            break;

          case 16:
            t.data.inventory > 0 ? t.getTeamBuyInfoBySbom(a) : (t.data.buttonShowMode = "1", 
            t.data.buttonClass = "1-big-disabled", t.data.buttonText = "暂时缺货");
            break;

          case 21:
            t.data.inventory > 0 ? t.getTeamBuyInfoBySbom(a) : (t.data.buttonShowMode = "1", 
            t.data.buttonClass = "1-big-disabled", t.data.buttonText = "名额已满");
            break;

          case 8:
            t.data.buttonClass = "1-big-disabled", t.data.buttonText = "正在加载", t.getRushBuyActiveInfo(), 
            clearTimeout(t.data.rushWatchTimer), t.data.rushWatchTimer = null, t.data.rushWatchTimer = setTimeout(function() {
                "正在加载" == t.data.buttonText && t.setData({
                    buttonClass: "1-big",
                    buttonText: "立即申购",
                    buttonAreaClass: "",
                    showRushBuyAddressFloat: !1,
                    showRushBuySelectFloat: !0
                });
            }, 3e3);
            break;

          case 9:
            t.data.buttonShowMode = "1", t.data.buttonClass = "1-big-disabled", t.data.buttonText = "暂未开售";
            break;

          case 10:
            var e = new Date().getTime();
            if (t.data.buttonShowMode = "10", e < t.data.fixedStartTime) {
                t.data.fixedTimeInfo.duration = t.data.fixedStartTime - e;
                var s = t.dealCountDownTime(t.data.fixedTimeInfo.duration);
                t.data.fixedTimeInfo.duration > 0 && t.setData({
                    "fixedTimeInfo.fixDay": s[0],
                    "fixedTimeInfo.fixHour": s[1],
                    "fixedTimeInfo.fixMinute": s[2],
                    "fixedTimeInfo.fixSecond": s[3]
                }), t.data.fixedTimer = setInterval(t.refreshFixedTimer, 1e3), t.data.buttonClass = "1-big-disabled", 
                t.data.buttonText = "活动即将开始";
                var o = new Date(t.data.fixedStartTime);
                t.setData({
                    showFixedTimer: !0,
                    fixedMonth: o.getMonth() + 1,
                    fixedDay: o.getDate(),
                    fixedHour: o.getHours(),
                    fixedMinute: o.getMinutes() > 9 ? o.getMinutes() : "0" + o.getMinutes()
                });
            } else e > t.data.fixedStartTime && e < t.data.fixedEndTime ? t.data.inventory > 0 ? (t.data.buttonClass = "1-big", 
            t.data.buttonText = "立即购买") : (t.data.buttonClass = "1-big-disabled", t.data.buttonText = "暂时缺货") : (t.data.buttonClass = "1-big-disabled", 
            t.data.buttonText = "活动已结束");
            break;

          default:
            t.data.buttonShowMode = "1", t.data.buttonClass = "1-big-disabled", t.data.buttonText = "抱歉，暂未开放此功能";
        }
        t.setData({
            buttonClass: t.data.buttonClass,
            buttonText: t.data.buttonText,
            buttonAreaClass: "",
            buttonShowMode: t.data.buttonShowMode
        });
    },
    refreshFixedTimer: function() {
        var t = this, a = t.dealCountDownTime(t.data.fixedTimeInfo.duration);
        t.data.fixedTimeInfo.duration > 0 ? (t.setData({
            "fixedTimeInfo.fixDay": a[0],
            "fixedTimeInfo.fixHour": a[1],
            "fixedTimeInfo.fixMinute": a[2],
            "fixedTimeInfo.fixSecond": a[3]
        }), t.data.fixedTimeInfo.duration -= 1e3) : (clearInterval(t.data.fixedTimer), t.data.inventory > 0 ? (t.data.buttonClass = "1-big", 
        t.data.buttonText = "立即购买") : (t.data.buttonClass = "1-big-disabled", t.data.buttonText = "暂时缺货"), 
        t.setData({
            showFixedTimer: !1,
            buttonClass: t.data.buttonClass,
            buttonText: t.data.buttonText
        }));
    },
    getGiftInventory: function(t) {
        var a = this;
        e.mpGet(s.service.openApiDomain + "/mcp/querySkuInventory", {
            skuCodes: t
        }, {
            successFunc: function(t) {
                t.data.inventoryReqVOs && t.data.inventoryReqVOs.length > 0 && (a.data.giftsUsefulList = [], 
                t.data.inventoryReqVOs.forEach(function(t, e) {
                    t.inventoryQty > 0 && t.skuCode != a.data.current_skuId && a.data.giftsUsefulList.push(t.skuCode), 
                    t.skuCode == a.data.current_skuId && (a.setData({
                        inventory: t.inventoryQty
                    }), a.showNumAddDel(a));
                }), a.setData({
                    giftsUsefulList: a.data.giftsUsefulList
                })), a.data.giftsUsefulList.length > 0 ? a.setData({
                    showGifts: !0
                }) : a.setData({
                    showGifts: !1
                });
                var e = a.data.tempGiftList, s = [];
                a.data.nowBuy.gifts = [], e.forEach(function(t, e) {
                    var o = [];
                    t.forEach(function(t, e) {
                        -1 != a.data.giftsUsefulList.indexOf(t.sbomCode) && (a.data.nowBuy.gifts.push({
                            sbomCode: t.sbomCode
                        }), o.push(t));
                    }), o.length > 0 && s.push(o);
                }), s.forEach(function(t, a) {
                    return t[0].selected = !0, t;
                }), a.setData({
                    nowBuy: a.data.nowBuy,
                    giftList: s
                }), a.showButtonType(a, a.data.current_skuId);
            },
            failFunc: function(t) {
                a.setData({
                    toastState: !0,
                    toastCont: "请求发送失败！"
                }), setTimeout(function() {
                    a.setData({
                        toastState: !1
                    });
                }, 3e3);
            }
        });
    },
    getSkuInventory: function(t) {
        var a = this;
        e.mpGet(s.service.openApiDomain + "/mcp/querySkuInventory", {
            skuCodes: t
        }, {
            successFunc: function(e) {
                var s = 0;
                e.data && e.data.inventoryReqVOs && e.data.inventoryReqVOs.length > 0 && (s = e.data.inventoryReqVOs[0].inventoryQty), 
                a.setData({
                    inventory: s
                }), a.showNumAddDel(a), a.showButtonType(a, t);
            },
            failFunc: function(t) {
                a.setData({
                    toastState: !0,
                    toastCont: "请求发送失败！"
                }), setTimeout(function() {
                    a.setData({
                        toastState: !1
                    });
                }, 3e3);
            }
        });
    },
    gotoConfirmByTeamBuy: function() {
        var t = this;
        t.data.TeamBuyOrderReqArg.openId = wx.getStorageSync("openId"), "21" == t.data.buttonMode ? t.data.nowBuy.itemType = "LD" : t.data.nowBuy.itemType = "T", 
        a.globalData && a.globalData.userInfo && (t.data.TeamBuyOrderReqArg.headUrl = a.globalData.userInfo.avatarUrl || "", 
        a.globalData.userInfo.nickName && (t.data.TeamBuyOrderReqArg.name = a.globalData.userInfo.nickName)), 
        wx.navigateTo({
            url: "../orderConfirm/orderConfirm?nowBuy=" + JSON.stringify([ t.data.nowBuy ]) + "&teamBuyInfo=" + JSON.stringify(t.data.TeamBuyOrderReqArg),
            complete: function() {
                t.data.isDoingAuth = !1;
            }
        });
    },
    getTeamBuyInfoBySbom: function(t) {
        var a = this;
        e.mpGet(s.service.openApiDomain + "/ams/teamBuy/queryTeamBuyInfoBySbom", {
            sbomCode: t
        }, {
            successFunc: function(t) {
                if (t.data.success && t.data.teamBuyInfo && t.data.teamBuyInfo.state) {
                    var e = [];
                    a.data.isOnLoad || (e = a.data.teamBuyInfo);
                    var s = t.data.teamBuyInfo, o = s.state;
                    if (a.setData({
                        teamBuyInfo: s
                    }), s.mpWapDetailRuleUrl && a.setData({
                        mpWapDetailRuleUrl: s.mpWapDetailRuleUrl
                    }), s.detailRules) {
                        var i = s.detailRules.split("\n");
                        a.setData({
                            detailRules: i
                        });
                    }
                    if (2 == s.gbType && s.prizeTeamBuyFlowUrl && a.setData({
                        teamBuyFlowUrl: s.prizeTeamBuyFlowUrl
                    }), 2 != s.gbType && s.commonTeamBuyFlowUrl && a.setData({
                        teamBuyFlowUrl: s.commonTeamBuyFlowUrl
                    }), 8 == s.gbType ? a.setData({
                        isNewPeopleTeam: !0
                    }) : a.setData({
                        isNewPeopleTeam: !1
                    }), 2 == s.gbType && o) switch (Number(o)) {
                      case 1:
                        a.data.buttonText = "¥" + a.data.teamBuyInfo.teamBuyPrice + " 我要开团", a.data.buttonClass = "1-big";
                        break;

                      case 2:
                        a.data.buttonText = "¥" + a.data.teamBuyInfo.teamBuyPrice + " 我要开团", a.data.buttonClass = "1-big-disabled";
                        break;

                      case 3:
                        a.data.buttonText = "¥" + a.data.teamBuyInfo.teamBuyPrice + " 活动结束", a.data.buttonClass = "1-big-disabled";
                        break;

                      default:
                        a.data.buttonText = "活动即将开始", a.data.buttonClass = "1-big-disabled";
                    }
                    if ((1 == s.gbType || 8 == s.gbType) && o) switch (a.data.buttonText = "我要开团", Number(o)) {
                      case 1:
                        a.data.buttonClass = "team";
                        break;

                      case 2:
                      case 3:
                      default:
                        a.data.buttonClass = "team-disabled";
                    }
                    a.setData({
                        buttonText: a.data.buttonText,
                        buttonClass: a.data.buttonClass
                    }), s.gbType && 2 == s.gbType ? a.setData({
                        buttonShowMode: "21"
                    }) : a.setData({
                        buttonShowMode: "16"
                    }), o && ("1" == o ? (a.doSpellingOption(), !a.data.isOnLoad && (a.data.isOnLoad || a.data.showOpenTeamInfo) || "21" == a.data.buttonMode || a.getOpenTeamBuyInfoBySbom(a.data.teamBuyInfo.activityCode, a.data.current_skuId)) : "2" == o ? a.doBeforeSpellOption() : "3" == o && (a.data.isOnLoad || "3" != e.state && a.setData({
                        cutDownDay: "0",
                        cutDownHour: "00",
                        cutDownMinute: "00",
                        cutDownSeconds: "00"
                    })));
                } else a.data.isOnLoad && ("21" == a.data.buttonMode ? (a.data.buttonText = "活动即将开始", 
                a.data.buttonClass = "1-big-disabled") : (a.data.buttonText = "立即购买", a.data.buttonClass = "1-big"), 
                a.data.buttonShowMode = "1", a.setData({
                    buttonClass: a.data.buttonClass,
                    buttonText: a.data.buttonText,
                    buttonAreaClass: "",
                    buttonShowMode: a.data.buttonShowMode,
                    teamBuyInfo: {}
                })), a.setData({
                    isNewPeopleTeam: !1
                });
            },
            failFunc: function() {
                a.data.isOnLoad && (a.data.buttonClass = "1-big", a.data.buttonText = "立即购买", a.data.buttonShowMode = "1", 
                a.setData({
                    buttonClass: a.data.buttonClass,
                    buttonText: a.data.buttonText,
                    buttonAreaClass: "",
                    buttonShowMode: a.data.buttonShowMode
                })), a.setData({
                    isNewPeopleTeam: !1
                });
            }
        });
    },
    doSpellingOption: function() {
        var t = this, a = new Date(t.data.teamBuyInfo.serverTime).getTime(), e = new Date(t.data.teamBuyInfo.endTime).getTime() - a, s = function() {
            var a = t.dealCountDownTime(e);
            4 == a.length ? (t.setData({
                cutDownDay: a[0],
                cutDownHour: a[1],
                cutDownMinute: a[2],
                cutDownSeconds: a[3]
            }), e -= 1e3) : ("21" == t.data.buttonMode && (t.data.buttonText = "¥" + t.data.teamBuyInfo.teamBuyPrice + " 活动结束", 
            t.data.buttonClass = "1-big-disabled", t.setData({
                buttonText: t.data.buttonText,
                buttonClass: t.data.buttonClass
            })), t.data.teamBuyInfo.state = "3", t.setData({
                cutDownDay: "0",
                cutDownHour: "00",
                cutDownMinute: "00",
                cutDownSeconds: "00",
                teamBuyInfo: t.data.teamBuyInfo
            }), clearInterval(t.data.activeTimer), t.data.activeTimer = null);
        };
        t.data.isOnLoad && s(), clearInterval(t.data.activeTimer), t.data.activeTimer = null, 
        t.data.activeTimer = setInterval(s, 1e3);
    },
    doBeforeSpellOption: function() {
        var t = this, a = new Date(t.data.teamBuyInfo.serverTime).getTime(), e = new Date(t.data.teamBuyInfo.startTime).getTime() - a, s = function() {
            var a = t.dealCountDownTime(e);
            4 == a.length ? (t.setData({
                cutDownDay: a[0],
                cutDownHour: a[1],
                cutDownMinute: a[2],
                cutDownSeconds: a[3]
            }), e -= 1e3) : (t.data.teamBuyInfo.state = "1", t.data.teamBuyInfo.serverTime = t.data.teamBuyInfo.startTime, 
            "21" == t.data.buttonMode && (t.data.buttonText = "¥" + t.data.teamBuyInfo.teamBuyPrice + " 我要开团", 
            t.data.buttonClass = "1-big", t.setData({
                buttonText: t.data.buttonText,
                buttonClass: t.data.buttonClass
            })), t.setData({
                teamBuyInfo: t.data.teamBuyInfo
            }), clearInterval(t.data.activeTimer), t.data.activeTimer = null, t.doSpellingOption(), 
            "21" != t.data.buttonMode && t.getOpenTeamBuyInfoBySbom(t.data.teamBuyInfo.activityCode, t.data.current_skuId));
        };
        t.data.isOnLoad && s(), clearInterval(t.data.activeTimer), t.data.activeTimer = null, 
        t.data.activeTimer = setInterval(s, 1e3);
    },
    getOpenTeamBuyInfoBySbom: function(t, a) {
        var o = this;
        e.mpGet(s.service.openApiDomain + "/mcp/pin/queryOpenTeamBuyInfo", {
            activityCode: t,
            sbomCode: a,
            pageSize: 10,
            pageNumber: 1
        }, {
            successFunc: function(t) {
                if (t.data.success && t.data.openTeamBuyInfos && t.data.openTeamBuyInfos.length > 0) {
                    o.data.isOnLoad || (o.data.openTeamBuyArr = [], o.data.openTeamBuyArrOnly = []);
                    var a = t.data.openTeamBuyInfos;
                    if (a.forEach(function(t, a) {
                        if (t.headUrl || (t.headUrl = "../../imgs/defaultface_user.png"), o.data.isOnLoad) t.day = "0", 
                        t.hour = "00", t.minute = "00", t.seconds = "00"; else {
                            var e = o.dealCountDownTime(t.remainingTime);
                            4 == e.length ? (t.day = e[0], t.hour = e[1], t.minute = e[2], t.seconds = e[3]) : (t.day = "0", 
                            t.hour = "00", t.minute = "00", t.seconds = "00");
                        }
                    }), 1 == a.length) o.setData({
                        openIsOnly: !0,
                        openTeamBuyArrOnly: [ a ]
                    }); else {
                        var e = [], s = [];
                        a.length % 2 != 0 && a.pop(), a.forEach(function(t, a) {
                            a % 2 == 0 ? e.push(t) : s.push(t);
                        });
                        for (var i = 0; i < e.length; i++) {
                            var n = [];
                            n.push(e[i]), n.push(s[i]), o.data.openTeamBuyArr.push(n);
                        }
                        o.setData({
                            openIsOnly: !1,
                            openTeamBuyArr: o.data.openTeamBuyArr
                        });
                    }
                    o.setData({
                        showOpenTeamInfo: !0
                    }), o.delOpenTeamInterval();
                } else o.setData({
                    showOpenTeamInfo: !1
                });
            },
            failFunc: function() {
                o.setData({
                    showOpenTeamInfo: !1
                });
            }
        });
    },
    delOpenTeamInterval: function() {
        var t = this;
        t.data.openIsOnly ? t.interOption(t.data.openTeamBuyArrOnly) : t.interOption(t.data.openTeamBuyArr);
    },
    interOption: function(t) {
        var a = this, e = function() {
            if (t.length > 0) {
                t.forEach(function(t, e) {
                    t = a.updateArrRemain(t);
                }), a.data.openIsOnly ? a.setData({
                    openTeamBuyArrOnly: t
                }) : a.setData({
                    openTeamBuyArr: t
                });
                var e = !0;
                t.forEach(function(t, a) {
                    t.forEach(function(t, a) {
                        t.remainingTime >= 0 && (e = !1);
                    });
                }), e && (clearInterval(a.data.openTeamsTimer), a.data.openTeamsTimer = null, a.data.isOpenTeamTimerActive = !1);
            } else clearInterval(a.data.openTeamsTimer), a.data.openTeamsTimer = null, a.data.isOpenTeamTimerActive = !1;
        };
        a.data.isOnLoad && e(), clearInterval(a.data.openTeamsTimer), a.data.openTeamsTimer = null, 
        a.data.openTeamsTimer = setInterval(e, 1e3), a.data.isOpenTeamTimerActive = !0;
    },
    updateArrRemain: function(t) {
        var a = this;
        return t.forEach(function(t, e) {
            var s = a.dealCountDownTime(t.remainingTime);
            4 == s.length ? (t.day = s[0], t.hour = s[1], t.minute = s[2], t.seconds = s[3], 
            t.remainingTime -= 1e3) : (t.day = "0", t.hour = "00", t.minute = "00", t.seconds = "00", 
            t.remainingTime = 0);
        }), t;
    },
    toTeamBuyRule: function() {
        var t = this;
        if (t.stopDoubleClick()) return !1;
        t.data.detailRules.length > 0 ? t.setData({
            showRules: !0
        }) : t.data.mpWapDetailRuleUrl && wx.navigateTo({
            url: "/pages/webview/webview?url=" + t.data.mpWapDetailRuleUrl
        });
    },
    closeRules: function() {
        this.setData({
            showRules: !1
        });
    },
    dealCountDownTime: function(t) {
        var a = [];
        if (t > 0) {
            var e = Math.floor(t / 1e3 / 60 / 60 / 24), s = Math.floor(t / 1e3 / 60 / 60 % 24), o = Math.floor(t / 1e3 / 60 % 60), i = Math.floor(t / 1e3 % 60);
            s <= 9 && (s = "0" + s), o <= 9 && (o = "0" + o), i <= 9 && (i = "0" + i), a.push(e), 
            a.push(s), a.push(o), a.push(i);
        }
        return a;
    },
    onChangeOption: function(t) {},
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
    stopDoubleClick4Sku: function() {
        var t = this;
        return !!t.data.isBtnClicked4Sku || (t.setData({
            isBtnClicked4Sku: !0
        }), setTimeout(function() {
            t.setData({
                isBtnClicked4Sku: !1
            });
        }, 700), !1);
    },
    reportFormId: function(t) {
        e.mpIsFormIdValid(t) && e.mpReportMarketMsg(a, {
            formid: t,
            source: 3
        });
    },
    getRushBuyActiveInfo: function() {
        var t = this, a = "", o = "";
        if (t.data.skuList.length > 0 && t.data.skuList.forEach(function(e, s) {
            e.sbomCode == t.data.current_skuId && e.sbomId && (a = e.sbomId);
        }), e.mpIsEmpty(a)) return t.setData({
            buttonClass: "1-big-disabled",
            buttonText: "抱歉，暂未开放此功能",
            buttonAreaClass: "",
            buttonShowMode: "1",
            skuRushBuyInfo: {}
        }), !1;
        t.data.currSbomCode4RB = t.data.current_skuId, t.data.deal_skuAttrValueList && t.data.deal_skuAttrValueList.length > 0 && (t.data.deal_skuAttrValueList.forEach(function(t) {
            t && t.attrList && t.attrList.length > 0 && t.attrList.forEach(function(t) {
                t && t.status && 2 == t.status && t.attrname && (o += t.attrname + " ");
            });
        }), t.data.rushBuyParamsStr = o.replace(/(\s*$)/g, ""), t.setData({
            currentSkuSelectName: t.data.rushBuyParamsStr
        })), e.mpGet(s.service.rushBuyDomain + "/getSkuRushbuyInfo.json", {
            skuIds: a
        }, {
            successFunc: function(a) {
                if (a && a.data && a.data.success && a.data.skuRushBuyInfoList && a.data.skuRushBuyInfoList.length > 0) {
                    if (0 == Object.keys(a.data.skuRushBuyInfoList[0]).length || !a.data.skuRushBuyInfoList[0].isRushBuySku) return t.setData({
                        buttonClass: "1-big-disabled",
                        buttonText: "暂时缺货",
                        buttonAreaClass: "",
                        showRushBuyAddressFloat: !1,
                        showRushBuySelectFloat: !1,
                        rushBuyActiveStatus: "1",
                        buttonShowMode: "1"
                    }), 4 == t.data.productType && t.setData({
                        showDepositArea: !0
                    }), !1;
                    var e = a.data.skuRushBuyInfoList[0];
                    e.currentTime = a.data.currentTime, e.rushTips = "", e.rushState = "", e.rushDay = "0", 
                    e.rushHour = "00", e.rushMinute = "00", e.rushSecond = "00", t.data.rushPriceInfo.isPriceLoaded ? Object.assign(e, t.data.rushPriceInfo) : (e.rushPrice = "暂无报价", 
                    e.rushPrice2 = ""), t.setData({
                        buttonShowMode: "8",
                        skuRushBuyInfo: e,
                        showRushBuyPriceArea: !0
                    });
                    var s = a.data.currentTime, o = t.data.skuRushBuyInfo.startTime, i = t.data.skuRushBuyInfo.endTime;
                    s < o ? t.preRushBuyOption() : s >= o && s <= i ? t.doingRushBuyOption() : s > i && t.endRushBuyOption();
                } else t.setData({
                    buttonClass: "1-big-disabled",
                    buttonText: "抱歉，暂未开放此功能",
                    buttonAreaClass: "",
                    buttonShowMode: "1",
                    skuRushBuyInfo: {}
                });
            },
            failFunc: function() {
                t.setData({
                    buttonClass: "1-big-disabled",
                    buttonText: "抱歉，暂未开放此功能",
                    buttonAreaClass: "",
                    buttonShowMode: "1",
                    skuRushBuyInfo: {}
                });
            }
        });
    },
    getDepositActivityInfo: function(t, a) {
        var o = this;
        e.mpPromiseGet(s.service.openApiDomain + "/mcp/product/querySbomDepositActivity", {
            sbomCode: t.sbomCode
        }).then(function(e) {
            if (e.data.success && e.data.depositActivityInfo) {
                o.setData({
                    showDepositRules: !0
                });
                var s = e.data.depositActivityInfo;
                if (s.balanceStartTime && s.balanceEndTime) {
                    var i = s.balanceStartTime.replace(/-/g, ".").split("+")[0], n = s.balanceEndTime.replace(/-/g, ".").split("+")[0];
                    o.setData({
                        balanceStartTime: i.substr(0, i.length - 3),
                        balanceEndTime: n.substr(0, n.length - 3)
                    });
                }
                s.depositSkuList && s.depositSkuList.length > 0 && s.depositSkuList.forEach(function(e, s) {
                    e.sbomCode == t.sbomCode ? (o.setData({
                        depositPrice: e.depositPrice,
                        isContinueReq: !0,
                        isSurePrice: e.isSurePrice
                    }), c(t, o, a)) : (o.setData({
                        buttonShowMode: "1",
                        buttonClass: "1-big-disabled",
                        buttonText: "暂时缺货",
                        isContinueReq: !1
                    }), c(t, o, a));
                });
            } else o.data.currRequestDeposit += 1, o.data.currRequestDeposit < 3 ? o.getDepositActivityInfo(t, a) : (o.setData({
                showDepositRules: !1,
                buttonShowMode: "1",
                isContinueReq: !1,
                buttonText: "暂时缺货"
            }), c(t, o, a));
        }).catch(function(e) {
            o.data.currRequestDeposit += 1, o.data.currRequestDeposit < 3 ? o.getDepositActivityInfo(t, a) : (o.setData({
                showDepositRules: !1,
                buttonShowMode: "1",
                isContinueReq: !1,
                buttonText: "暂时缺货"
            }), c(t, o, a));
        });
    },
    disposeRushPrice: function(t) {
        var a = this, e = {
            integerPrice: "暂无报价",
            decimalPrice: ""
        };
        if ("暂无报价" != t) {
            var s = a.splitFloatNum(parseFloat(t));
            s.flag ? (e.integerPrice = s.integerPart + ".", e.decimalPrice = s.decimalPart) : e.integerPrice = t + "";
        }
        return e;
    },
    splitFloatNum: function(t) {
        var a = {
            flag: !1,
            integerPart: "",
            decimalPart: ""
        };
        if ("number" == typeof t) {
            var e = t.toString();
            -1 != e.indexOf(".") ? (a.integerPart = e.split(".")[0], a.decimalPart = e.split(".")[1], 
            a.flag = !0) : (a.integerPart = t + "", a.decimalPart = "");
        }
        return a;
    },
    preRushBuyOption: function() {
        var t = this, a = "", s = new Date(t.data.skuRushBuyInfo.startTime), o = s.getMonth() + 1, i = s.getDate();
        a = "开售时间：" + e.formatNumber(o) + "月" + e.formatNumber(i) + "日", 4 == t.data.productType ? t.setData({
            "skuRushBuyInfo.rushState": "1",
            "skuRushBuyInfo.rushTips": t.data.depositPrice + "元订金",
            showRushBuyAddressFloat: !0,
            showRushBuySelectFloat: !1
        }) : t.setData({
            "skuRushBuyInfo.rushState": "1",
            "skuRushBuyInfo.rushTips": a,
            showRushBuyAddressFloat: !0,
            showRushBuySelectFloat: !1
        }), clearTimeout(t.data.rushBuyTimer), t.data.rushBuyTimer = null, t.refreshRushBuyActiveTimeMsg(), 
        t.checkUserLoginStatus(function(a) {
            t.checkUserIsAllow4PreRush();
        }, function(a) {
            t.setData({
                buttonClass: "1-big",
                buttonText: "提前登录",
                buttonAreaClass: ""
            });
        });
    },
    checkUserIsAllow4PreRush: function() {
        var t = this;
        Object.keys(t.data.skuRushBuyInfo).length > 0 && t.getUserRushType(t.data.skuRushBuyInfo.qids, function(a) {
            if (t.data.currSbomCode4RB == t.data.current_skuId && Object.keys(t.data.skuRushBuyInfo).length > 0) if (0 == t.data.skuRushBuyInfo.qids || 0 != t.data.skuRushBuyInfo.qids && a && 1 == a.isqueue) {
                if (t.data.userIsAllowBuy = !0, "1" == t.data.skuRushBuyInfo.rushState) {
                    var s = "", o = new Date(t.data.skuRushBuyInfo.startTime), i = new Date(t.data.skuRushBuyInfo.currentTime);
                    s = o.toDateString() === i.toDateString() ? "今天" + e.formatNumber(o.getHours()) + ":" + e.formatNumber(o.getMinutes()) + "开售" : e.formatNumber(o.getMonth() + 1) + "月" + e.formatNumber(o.getDate()) + "日" + e.formatNumber(o.getHours()) + ":" + e.formatNumber(o.getMinutes()) + "开售", 
                    4 == t.data.productType ? t.setData({
                        buttonClass: "1-big-disabled",
                        buttonText: "支付订金",
                        buttonAreaClass: "",
                        showRushBuyAddressFloat: !0,
                        showRushBuySelectFloat: !1
                    }) : t.setData({
                        buttonClass: "1-big-disabled",
                        buttonText: s,
                        buttonAreaClass: "",
                        showRushBuyAddressFloat: !0,
                        showRushBuySelectFloat: !1
                    }), t.data.isDoingAuth = !1;
                }
                "2" == t.data.skuRushBuyInfo.rushState && t.gotoQueue();
            } else t.data.userIsAllowBuy = !1, t.setData({
                buttonClass: "5-big-disabled",
                buttonText: "您不符合本次购买条件",
                buttonAreaClass: "",
                showRushBuyAddressFloat: !1,
                showRushBuySelectFloat: !1,
                isDoingAuth: !1
            });
        });
    },
    doingRushBuyOption: function() {
        var t = this;
        clearTimeout(t.data.rushBuyTimer), t.data.rushBuyTimer = null, t.refreshRushBuyActiveTimeMsg(), 
        4 == t.data.productType ? t.setData({
            "skuRushBuyInfo.rushState": "2",
            "skuRushBuyInfo.rushTips": t.data.depositPrice + "元订金"
        }) : t.setData({
            "skuRushBuyInfo.rushState": "2",
            "skuRushBuyInfo.rushTips": "火爆抢购，先到先得"
        }), 1 != t.data.skuRushBuyInfo.skuStatus ? t.setData({
            buttonClass: "1-big-disabled",
            buttonText: "已售完",
            buttonAreaClass: "",
            showRushBuySelectFloat: !1,
            showRushBuyAddressFloat: !1
        }) : t.checkUserLoginStatus(function(a) {
            Object.keys(t.data.skuRushBuyInfo).length > 0 && t.getUserRushType(t.data.skuRushBuyInfo.qids, function(a) {
                t.data.currSbomCode4RB == t.data.current_skuId && Object.keys(t.data.skuRushBuyInfo).length > 0 && (0 == t.data.skuRushBuyInfo.qids || 0 != t.data.skuRushBuyInfo.qids && a && 1 == a.isqueue ? (t.data.userIsAllowBuy = !0, 
                4 == t.data.productType ? t.setData({
                    buttonClass: "1-big",
                    buttonText: "支付订金",
                    buttonAreaClass: "",
                    showRushBuyAddressFloat: !1,
                    showRushBuySelectFloat: !0,
                    currentSkuSelectName: t.data.rushBuyParamsStr
                }) : t.setData({
                    buttonClass: "1-big",
                    buttonText: "立即申购",
                    buttonAreaClass: "",
                    showRushBuyAddressFloat: !1,
                    showRushBuySelectFloat: !0,
                    currentSkuSelectName: t.data.rushBuyParamsStr
                })) : (t.data.userIsAllowBuy = !1, t.setData({
                    buttonClass: "5-big-disabled",
                    buttonText: "您不符合本次购买条件",
                    buttonAreaClass: "",
                    showRushBuyAddressFloat: !1,
                    showRushBuySelectFloat: !1
                })));
            });
        }, function(a) {
            t.setData({
                buttonClass: "1-big",
                buttonText: "提前登录",
                buttonAreaClass: "",
                showRushBuyAddressFloat: !0,
                showRushBuySelectFloat: !1
            });
        });
    },
    endRushBuyOption: function() {
        var t = this;
        clearTimeout(t.data.rushBuyTimer), t.data.rushBuyTimer = null, 4 == t.data.productType ? t.setData({
            buttonShowMode: "1",
            buttonClass: "1-big-disabled",
            buttonText: "暂时缺货",
            buttonAreaClass: "",
            showRushBuyAddressFloat: !1,
            showRushBuySelectFloat: !1,
            showDepositArea: !0
        }) : t.setData({
            "skuRushBuyInfo.rushState": "3",
            "skuRushBuyInfo.rushTips": "火爆抢购，先到先得",
            buttonClass: "1-big-disabled",
            buttonText: "暂时缺货",
            buttonAreaClass: "",
            showRushBuyAddressFloat: !1,
            showRushBuySelectFloat: !1
        });
    },
    refreshRushBuyActiveTimeMsg: function() {
        var t = this, a = t.data.skuRushBuyInfo, e = a.startTime - a.currentTime;
        if ("2" == a.rushState && (e = a.endTime - a.currentTime), e > 0) {
            var s = t.dealCountDownTime(e);
            "1" == a.rushState && t.setData({
                "skuRushBuyInfo.rushDay": s[0],
                "skuRushBuyInfo.rushHour": s[1],
                "skuRushBuyInfo.rushMinute": s[2],
                "skuRushBuyInfo.rushSecond": s[3]
            }), t.data.skuRushBuyInfo.currentTime += 1e3, "2" == a.rushState && 1 != a.skuStatus && "已售完" != t.data.buttonText && t.setData({
                buttonClass: "1-big-disabled",
                buttonText: "已售完",
                buttonAreaClass: "",
                showRushBuyAddressFloat: !1,
                showRushBuySelectFloat: !1
            });
        } else if ("1" == a.rushState) 4 == t.data.productType ? t.setData({
            "skuRushBuyInfo.rushState": "2",
            "skuRushBuyInfo.currentTime": a.startTime,
            "skuRushBuyInfo.rushTips": t.data.depositPrice + "元订金",
            "skuRushBuyInfo.rushDay": "0",
            "skuRushBuyInfo.rushHour": "00",
            "skuRushBuyInfo.rushMinute": "00",
            "skuRushBuyInfo.rushSecond": "00"
        }) : t.setData({
            "skuRushBuyInfo.rushState": "2",
            "skuRushBuyInfo.currentTime": a.startTime,
            "skuRushBuyInfo.rushTips": "火爆抢购，先到先得",
            "skuRushBuyInfo.rushDay": "0",
            "skuRushBuyInfo.rushHour": "00",
            "skuRushBuyInfo.rushMinute": "00",
            "skuRushBuyInfo.rushSecond": "00"
        }), t.checkUserLoginStatus(function(a) {
            t.data.userIsAllowBuy && (4 == t.data.productType ? t.setData({
                buttonClass: "1-big",
                buttonText: "支付订金",
                buttonAreaClass: "",
                showRushBuyAddressFloat: !1,
                showRushBuySelectFloat: !0,
                currentSkuSelectName: t.data.rushBuyParamsStr
            }) : t.setData({
                buttonClass: "1-big",
                buttonText: "立即申购",
                buttonAreaClass: "",
                showRushBuyAddressFloat: !1,
                showRushBuySelectFloat: !0,
                currentSkuSelectName: t.data.rushBuyParamsStr
            }));
        }, function(a) {
            t.setData({
                buttonClass: "1-big",
                buttonText: "提前登录",
                buttonAreaClass: "",
                showRushBuyAddressFloat: !0,
                showRushBuySelectFloat: !1
            });
        }); else if ("2" == a.rushState) return 4 == t.data.productType ? t.setData({
            "skuRushBuyInfo.currentTime": a.endTime,
            buttonShowMode: "1",
            buttonClass: "1-big-disabled",
            buttonText: "暂时缺货",
            buttonAreaClass: "",
            showRushBuyAddressFloat: !1,
            showRushBuySelectFloat: !1
        }) : t.setData({
            "skuRushBuyInfo.rushState": "3",
            "skuRushBuyInfo.rushTips": "火爆抢购，先到先得",
            "skuRushBuyInfo.currentTime": a.endTime,
            buttonClass: "1-big-disabled",
            buttonText: "暂时缺货",
            buttonAreaClass: "",
            showRushBuyAddressFloat: !1,
            showRushBuySelectFloat: !1
        }), t.data.rushBuyTimer && (clearTimeout(t.data.rushBuyTimer), t.data.rushBuyTimer = null), 
        !1;
        t.data.rushBuyTimer = setTimeout(function() {
            t.refreshRushBuyActiveTimeMsg();
        }, 1e3);
    },
    getUserRushType: function(t, a) {
        var o = this;
        e.mpGet(s.service.yyDomain + "/ivy/isqueue.jsp", {
            uid: wx.getStorageSync("userId"),
            qid: t
        }, {
            successFunc: function(t) {
                if (t && t.data && t.data.length > 0) {
                    var s = t.data;
                    s = s.substring(s.indexOf("{"), s.indexOf("}") + 1), e.mpIsJSONStr(s) ? (s = JSON.parse(s), 
                    wx.setStorageSync("queueInfo", s.isqueue), wx.setStorageSync("queueSignInfo", s.queueSign)) : (wx.setStorageSync("queueInfo", ""), 
                    wx.setStorageSync("queueSignInfo", "")), a && e.mpIsFunction(a) ? a(s) : o.data.isDoingAuth = !1;
                } else wx.setStorageSync("queueInfo", ""), wx.setStorageSync("queueSignInfo", ""), 
                a && e.mpIsFunction(a) ? a({
                    isqueue: 2,
                    queueSign: ""
                }) : o.data.isDoingAuth = !1;
            },
            failFunc: function(t) {
                wx.setStorageSync("queueInfo", ""), wx.setStorageSync("queueSignInfo", ""), a && e.mpIsFunction(a) ? a({
                    isqueue: 2,
                    queueSign: ""
                }) : o.data.isDoingAuth = !1;
            }
        });
    },
    checkUserLoginStatus: function(t, o) {
        e.mpGet(s.service.openApiDomain + "/mcp/user/queryUserLoginStatus", {}, {
            successFunc: function(s) {
                a.globalData.userInfo && s.data.login ? t && e.mpIsFunction(t) && t(s) : o && e.mpIsFunction(o) && o(s);
            },
            failFunc: function(t) {
                o && e.mpIsFunction(o) && o(t);
            }
        });
    },
    gotoAddressManage: function() {
        var t = this;
        if (t.data.isDoingAuth) return !1;
        if (t.data.authOptionFlag = 6, a.globalData.userInfo) {
            if (t.stopDoubleClick()) return !1;
            t.initUserInfo();
        }
    },
    openShareModle: function() {
        var t = this;
        t.data.isCanclick && t.setData({
            isShowShareModel: !0
        });
    },
    sharePoster: function() {
        var t = this;
        this.setData({
            isShowShareModel: !1
        });
        var a = {};
        a = JSON.parse(JSON.stringify(t.data.skuList)).filter(function(a, e) {
            return a.sbomCode == t.data.current_skuId;
        });
        var e = {};
        e.skuPriceInfo = 0 === Object.keys(t.data.skuPriceInfo).length && t.data.skuPriceInfo.constructor === Object ? JSON.parse(JSON.stringify(a[0])) : JSON.parse(JSON.stringify(t.data.skuPriceInfo)), 
        "16" == t.data.buttonShowMode || "21" == t.data.buttonShowMode ? e.teamBuyInfo = t.data.teamBuyInfo : "4" == t.data.productType && t.data.depositPrice && "8" == t.data.currentSkuInfo.buttonMode ? e.depositPrice = t.data.depositPrice : "8" == t.data.buttonShowMode ? e.skuRushBuyInfo = t.data.skuRushBuyInfo : "10" == t.data.buttonShowMode ? e.limtTimeGoods = "limtTimeGoods" : t.data.buttonShowMode, 
        e.productId = t.data.prdId, t.setData({
            allSkuInfo: e,
            isShowPoster: !0
        }), this.SharePoster = this.selectComponent("#SharePoster");
    },
    closeShareModle: function() {
        this.setData({
            isShowShareModel: !1
        }), wx.hideLoading();
    },
    saveCanvas: function() {
        this.SharePoster.savePoster();
    },
    closePoster: function() {
        this.setData({
            isShowPoster: !1,
            isHiddenPoster: !0
        });
    },
    onAuthSelect: function(t) {
        var s = this;
        if (s.onCloseModal(t), a.globalData.userInfo) return !1;
        t && t.detail && t.detail.userInfo && (s.data.isDoingAuth = !0, s.setData({
            isNeedOpenType: !1
        }), wx.showLoading({
            mask: !0,
            title: "正在登录..."
        }), e.mpAuthorizeAndLogin(function() {
            wx.hideLoading(), s.setData({
                isLogin: !0
            }), s.refreshAfterLogin();
        }, function() {
            s.setData({
                isLogin: !1,
                isDoingAuth: !1
            }), wx.showToast({
                title: "登录失败，请稍后重试",
                icon: "none"
            });
        }));
    },
    onCloseModal: function(t) {
        var a = this;
        t && "getuserinfo" == t.type && !t.detail.userInfo && (1 == a.data.authOptionFlag || 4 == a.data.authOptionFlag ? a.setData({
            isCreateClicked: !1
        }) : 2 == a.data.authOptionFlag && a.setData({
            isBtnClicked: !1
        }));
    },
    refreshAfterLogin: function() {
        var t = this;
        switch (t.data.authOptionFlag) {
          case 1:
            t.data.nowBuy.itemType = "S0", wx.navigateTo({
                url: "../orderConfirm/orderConfirm?nowBuy=" + JSON.stringify([ t.data.nowBuy ]),
                complete: function() {
                    t.data.isDoingAuth = !1;
                }
            }), e.mpReport(400020101, {
                buttonName: "立即购买",
                SKUCode: this.data.nowBuy.itemId,
                click: "1"
            });
            break;

          case 2:
            t.gotoConfirmByTeamBuy();
            break;

          case 3:
            var a = t.data.authEvent.currentTarget.dataset.teamcode;
            wx.navigateTo({
                url: "../orderSpellDetail/orderSpellDetail?teamCode=" + a,
                complete: function() {
                    t.data.isDoingAuth = !1;
                }
            });
            break;

          case 4:
            "1" == t.data.skuRushBuyInfo.rushState ? t.checkUserIsAllow4PreRush() : "2" == t.data.skuRushBuyInfo.rushState && t.checkUserIsAllow4PreRush();
            break;

          case 5:
            t.getCouponAction(t.data.authEvent);
            break;

          case 6:
            wx.navigateTo({
                url: "/pages/addressManage/addressManage",
                complete: function() {
                    t.data.isDoingAuth = !1;
                }
            });
            break;

          default:
            t.data.isDoingAuth = !1;
        }
    },
    initUserInfo: function() {
        var t = this;
        e.mpQueryUserStatus(function() {
            t.setData({
                isLogin: !0
            }), t.refreshAfterLogin();
        }, function() {
            wx.showLoading({
                mask: !0,
                title: "正在登录..."
            }), e.mpLogin(a, function(a) {
                a && a.data && a.data.success ? (wx.hideLoading(), t.setData({
                    isLogin: !0
                }), t.refreshAfterLogin()) : (t.setData({
                    isLogin: !1
                }), wx.showToast({
                    title: "登录失败，请稍后重试",
                    icon: "none"
                }));
            }, !1);
        });
    },
    cannotUse: function() {
        this.setData({
            isShowPoster: !1
        });
    },
    showAllPoster: function() {
        this.setData({
            isHiddenPoster: !1
        });
    },
    hiddenAll: function() {
        this.setData({
            isHiddenAll: !0
        });
    },
    showButton: function() {
        this.setData({
            isHiddenAll: !1
        });
    },
    closeSuccessPoster: function() {
        this.setData({
            isShowPoster: !1,
            isHiddenPoster: !0
        }), wx.showToast({
            title: "图片已保存至相册，快去分享吧",
            icon: "none",
            mask: !0
        });
    }
});

var n = function(t) {
    wx.showLoading({
        title: "加载中...",
        mask: !0
    }), t.data.isLoadingCommentData = !0, e.mpGet(s.service.rmsDomain + "/comment/getCommentList.json", {
        pid: t.data.prdId,
        extraType: 0,
        pageNum: t.data.pageNum,
        pageSize: t.data.pageSize
    }, {
        successFunc: function(a) {
            if (t.data.isLoadingCommentData = !1, a.data.data && a.data.data.comments && a.data.data.comments.length > 0) {
                if (t.data.getRemarkFlag || (t.data.getRemarkFlag = !0), t.setData({
                    pageNum: t.data.pageNum + 1
                }), a.data.data.hotTags && a.data.data.hotTags.length > 0) {
                    var e = a.data.data.hotTags;
                    t.setData({
                        hotTags: e
                    });
                }
                var s = 100 * a.data.data.goodRate, o = a.data.data.comments, i = a.data.data.count;
                o.forEach(function(t, a) {
                    t.creationTime = t.creationTime.split("+")[0], t.scorePercent = 20 * t.score;
                }), t.data.comments.length > 0 ? t.setData({
                    comments: t.data.comments.concat(o)
                }) : t.setData({
                    comments: o
                }), t.setData({
                    commentsShowFlag: 1,
                    goodRate: s,
                    count: i
                }), a.data.data.page && (a.data.data.page.pageNum == a.data.data.page.totalPage ? t.setData({
                    loading: !1,
                    loadMore: !1,
                    totalList: !0
                }) : t.setData({
                    loading: !0,
                    loadMore: !0
                }), t.setData({
                    totalPage: a.data.data.page.totalPage,
                    pageSize: a.data.data.page.pageSize
                }));
            } else t.data.comments.length > 0 ? t.setData({
                loading: !1,
                totalList: !0,
                commentsShowFlag: 1,
                loadMore: !1
            }) : t.setData({
                loading: !1,
                totalList: !1,
                commentsShowFlag: 2,
                loadMore: !1
            });
            setTimeout(function() {
                wx.hideLoading();
            }, 200);
        },
        failFunc: function() {
            t.data.isLoadingCommentData = !1, setTimeout(function() {
                wx.hideLoading();
            }, 200), t.setData({
                commentsShowFlag: 2
            });
        }
    });
}, u = function(t, a) {
    var s = !1, o = [];
    return t && a && e.mpIsArray(t) && e.mpIsArray(a) && t.forEach(function(t, e) {
        a.forEach(function(a, e) {
            t == a && (s = !0, o.push(t));
        });
    }), {
        sboms: o,
        state: s
    };
}, r = function(t) {
    e.mpGet(s.service.rmsDomain + "/comment/getCommentList.json", {
        pid: t.data.prdId,
        extraType: 1,
        pageSize: 1
    }, {
        successFunc: function(a) {
            if (a && a.data && a.data.data) {
                var e = [], s = 0;
                a.data.data.hotTags && a.data.data.hotTags.length > 0 && (e = a.data.data.hotTags), 
                a.data.data.count && (s = a.data.data.count), a.data.data.comments && a.data.data.comments.length > 0 ? (t.data.topCommentObj = a.data.data.comments[0], 
                Object.keys(t.data.topCommentObj).length > 0 ? (t.data.topCommentObj.hasProp = !0, 
                t.data.topCommentObj.creationTime = t.data.topCommentObj.creationTime.split("+")[0] || "") : t.data.topCommentObj.hasProp = !1) : t.data.topCommentObj = {}, 
                t.setData({
                    hotTags: e,
                    topCommentObj: t.data.topCommentObj,
                    count: s
                });
            } else t.setData({
                hotTags: [],
                topCommentObj: {},
                count: 0
            });
        },
        failFunc: function() {
            t.setData({
                hotTags: [],
                topCommentObj: {},
                count: 0
            });
        }
    });
}, d = function(t) {
    e.mpGet(s.service.openApiDomain + "/mcp/queryPrdDisplayDetailInfo", {
        productId: t.data.prdId
    }, {
        successFunc: function(a) {
            if (a.data.success) {
                if (-1 === (a.data.salePortal || []).indexOf("4")) return t.setData({
                    showProDown: !0
                }), !1;
                a && a.data && a.data.carrierCode ? (wx.setStorageSync("rushBuyCarrierCode", a.data.carrierCode), 
                wx.setStorageSync("rushBuyCarrierName", a.data.carrierName)) : (wx.setStorageSync("rushBuyCarrierCode", ""), 
                wx.setStorageSync("rushBuyCarrierName", "华为商城"));
                var s = a.data.gbomAttrMappings, o = "", n = -1, r = [];
                if (a.data.sbomList && a.data.sbomList.length > 0) {
                    if (s) for (var d in s) {
                        o = d, n += 1;
                        var l = {}, m = [];
                        s[d].forEach(function(t, a) {
                            var s = t.attrValue;
                            e.mpIsArray(l[s]) ? l[s].push(t.sbomCode) : (l[s] = [], l[s].push(t.sbomCode));
                        });
                        for (var h in l) m.push({
                            attrname: h,
                            skuIdList: l[h],
                            status: 1
                        });
                        r.push({
                            classifyName: o,
                            indexnum: n,
                            attrList: m
                        });
                    }
                    var p = "", g = [], b = a.data.sbomList, y = !1;
                    b.forEach(function(a, e) {
                        a.sbomCode == t.data.defaultSkuCode && (y = !0);
                    }), b.forEach(function(a, e) {
                        y && (t.data.defaultSkuCode == a.sbomCode ? a.defaultSbom = 1 : a.defaultSbom = 0), 
                        1 == a.defaultSbom && (p = a.sbomCode, t.data.nowBuy.itemId = a.sbomCode, t.data.nowBuy.qty = 1);
                    }), s && r[0].attrList.forEach(function(t, a) {
                        -1 != t.skuIdList.indexOf(p) ? (g = t.skuIdList, r[0].commonArrObj = t.skuIdList, 
                        t.status = 2) : t.status = 1;
                    });
                    var T = [ g ];
                    r.forEach(function(t, a) {
                        a > 0 && t.attrList.forEach(function(e, s) {
                            var o = f(T, a - 1);
                            u(e.skuIdList, o).state ? u(e.skuIdList, [ p ]).state ? (e.status = 2, T.push(e.skuIdList), 
                            t.commonArrObj = e.skuIdList) : e.status = 1 : e.status = 0;
                        });
                    }), t.setData({
                        nowBuy: t.data.nowBuy,
                        skuList: a.data.sbomList,
                        deal_skuAttrValueList: r,
                        orgin_skuAttrValueList: a.data.gbomAttrMappings || [],
                        current_skuId: p || ""
                    }), i = 0, 4 == a.data.productType ? (t.data.productType = 4, b.forEach(function(a, s) {
                        1 == a.defaultSbom && (t.getDepositActivityInfo(a, "initFlag"), e.mpReport(400020001, {
                            load: "1",
                            SKUCode: t.data.current_skuId
                        }));
                    })) : b.forEach(function(a, s) {
                        1 == a.defaultSbom && (c(b[s], t, "initFlag"), e.mpReport(400020001, {
                            load: "1",
                            SKUCode: t.data.current_skuId
                        }));
                    });
                } else t.setData({
                    showProDown: !0
                });
            } else t.setData({
                showProDown: !0
            });
        },
        failFunc: function(t) {
            wx.showToast({
                title: "商品信息数据请求失败！",
                icon: "none"
            });
        }
    });
}, c = function(t, a, s) {
    "10" == t.buttonMode && t.startTime && t.endTime && a.setData({
        fixedStartTime: new Date(t.startTime.replace(/-/g, "/")).getTime(),
        fixedEndTime: new Date(t.endTime.replace(/-/g, "/")).getTime()
    }), a.data.current_skuId = t.sbomCode, a.data.getparm = !1, a.data.getgoodImg = !1;
    var o = t.groupPhotoList || [], i = t.name, n = t.priceMode, u = t.limitedQuantity, r = t.sbomPromWord || "", d = t.timerPromWord || "", c = t.microPromWord || "", l = t.giftList, m = t.buttonMode, h = t.timerPromLink4Wechat || "", f = [], p = {
        photoName: t.photoName,
        photoPath: t.photoPath
    };
    if (t.timerPromStartTime && t.timerPromEndTime) {
        var g = e.getTimestamp(t.timerPromStartTime.replace(/-/g, "/")), b = e.getTimestamp(t.timerPromEndTime.replace(/-/g, "/")), w = e.isWithinDeadline(g, b);
        a.setData({
            hasTimerPromWord: w
        });
    }
    if (l && l.length > 0) {
        "refreshFlag" == s && (a.data.giftCodesList = []), l.forEach(function(t, e) {
            a.data.giftCodesList.push(t.sbomCode), t.gbomAttrList.forEach(function(a, e) {
                "颜色" == a.attrName && (t.giftColor = a);
            });
        }), f = D(l), a.setData({
            giftCodesList: a.data.giftCodesList
        }), a.setData({
            tempGiftList: f
        }), a.setData({
            limitedQuantity: u
        });
        var I = a.data.giftCodesList;
        I.push(t.sbomCode), a.getGiftInventory(I);
    } else a.setData({
        limitedQuantity: u
    }), a.getSkuInventory(t.sbomCode), a.data.giftCodesList = [], a.setData({
        giftCodesList: a.data.giftCodesList
    }), a.setData({
        giftsUsefulList: []
    }), "refreshFlag" == s && a.setData({
        giftList: []
    }), a.setData({
        showGifts: !1
    }), "initFlag" == s && (a.data.nowBuy.gifts = []);
    a.data.currentSkuInfo = {
        amount: 1,
        name: i,
        priceMode: n,
        groupPhotoList: o,
        mainPhoto: p,
        imgAmt: o.length + 1,
        sbomPromWord: r,
        microPromWord: c,
        timerPromWord: d,
        buttonMode: m,
        timerPromLink4Wechat: h
    }, "initFlag" == s && a.setData({
        nowBuy: a.data.nowBuy
    }), a.setData(a.data.currentSkuInfo, function() {
        r && r.length > 0 || a.data.hasTimerPromWord && d && d.length > 0 ? (a.setData({
            showPromWord: !0
        }), a.data.promTimer = setTimeout(function() {
            a.handlePromArrow();
        }, 200)) : a.setData({
            showPromWord: !1
        });
    }), T(a, a.data.current_skuId), y(a);
}, l = function(t) {
    for (var a = t.data.deal_skuAttrValueList, e = [], s = 0; s < a.length; s++) !function(t) {
        a[t].attrList.forEach(function(a, s) {
            2 == a.status && (0 == t && (e = a.skuIdList), e = u(a.skuIdList, e).sboms);
        });
    }(s);
    t.setData({
        current_skuId: e[0] || ""
    });
}, m = function(a, e) {
    if (e) {
        var s = function() {
            if (i = e.indexnum, 0 == e.status || 2 == e.status) return {
                v: !1
            };
            var t = a.data.deal_skuAttrValueList, s = a.data.currAllSkuList;
            if (0 == s.length) {
                if (t && t[0] && t[0].attrList) for (var o = 0; o < t[0].attrList.length; o++) for (var n = 0; n < t[0].attrList[o].skuIdList.length; n++) s.push(t[0].attrList[o].skuIdList[n]);
                a.setData({
                    currAllSkuList: s
                });
            }
            for (var r = 0; r < t.length; r++) !function(a) {
                if (a > i) {
                    for (var o = 0; o < t[a].attrList.length; o++) t[a].attrList[o].status = 1;
                    for (var n = h(t, a - 1), r = t[a].commonArrObj, d = !1, c = 0; c < t[a].attrList.length; c++) {
                        var l = t[a].attrList[c];
                        u(l.skuIdList, n).state ? l.skuIdList.length == s.length ? (l.status = 2, t[a].commonArrObj = l.skuIdList) : d ? l.status = 1 : (d = !0, 
                        l.status = 2, t[a].commonArrObj = l.skuIdList) : l.status = 0;
                    }
                    if (u(r, n).state) for (var m = 0; m < t[a].attrList.length; m++) {
                        var f = t[a].attrList[m];
                        f.skuIdList.length != s.length && 0 != f.status && (f.skuIdList.equals(r) ? (f.status = 2, 
                        t[a].commonArrObj = f.skuIdList) : 1 != f.status && (f.status = 1));
                    }
                } else a == i && t[a].attrList.forEach(function(s, o) {
                    e.attrname == s.attrname ? (t[a].commonArrObj = e.skuidlist, s.status = 2) : 0 != s.status && (s.status = 1);
                });
            }(r);
            a.setData({
                deal_skuAttrValueList: t
            });
        }();
        if ("object" === (void 0 === s ? "undefined" : t(s))) return s.v;
    } else i = 0;
    l(a);
}, h = function t(a, e) {
    return 0 == e ? a[0].commonArrObj : u(a[e].commonArrObj, t(a, e - 1)).sboms;
}, f = function t(a, e) {
    return 0 == e ? a[0] : u(a[e], t(a, e - 1)).sboms;
}, p = function(t) {
    wx.showLoading({
        title: "加载中...",
        mask: !0
    }), t.data.isImgLoading = !0, e.mpGet(s.service.openApiDomain + "/mcp/querySkuPicDetail", {
        skuCode: t.data.current_skuId
    }, {
        successFunc: function(a) {
            if (t.data.isImgLoading = !1, a.data.success) {
                var e = a.data.detail;
                a.data.majorSpecificationList && a.data.majorSpecificationList.length > 0 && (t.data.getgoodImg = !0, 
                t.setData({
                    majorSpecificationList: a.data.majorSpecificationList
                })), a.data.detail && (e = o.wxParse("detail", "html", e, t)), setTimeout(function() {
                    wx.hideLoading();
                }, 200);
            } else wx.showToast({
                title: "商品详情数据请求失败！",
                icon: "none"
            });
        },
        failFunc: function() {
            t.data.isImgLoading = !1, wx.showToast({
                title: "商品详情数据请求失败！",
                icon: "none"
            });
        }
    });
}, g = function(t) {
    wx.showLoading({
        title: "加载中...",
        mask: !0
    }), t.data.isParamLoading = !0, e.mpGet(s.service.openApiDomain + "/mcp/querySkuSpecific", {
        skuCode: t.data.current_skuId
    }, {
        successFunc: function(a) {
            if (t.data.isParamLoading = !1, a.data.success) {
                var e = a.data;
                if (e.majorSpecificationList) {
                    t.data.getparm = !0;
                    var s = e.majorSpecificationList;
                    t.setData({
                        majorSpecificationList: s
                    });
                }
                if (e.specificationsList[0] && e.specificationsList[0].specifications && e.specificationsList[0].specifications.length > 0) {
                    var i = e.specificationsList[0].specifications;
                    if (i[0] && i[0].value) o.wxParse("pack", "html", i[0].value, t);
                    if (i[2] && i[2].value) {
                        var n = i[2].value;
                        n = o.wxParse("service", "html", n, t);
                    }
                    t.setData({
                        specifications: i
                    });
                }
                setTimeout(function() {
                    wx.hideLoading();
                }, 200);
            } else wx.showToast({
                title: "商品参数数据请求失败！",
                icon: "none"
            });
        },
        failFunc: function(a) {
            t.data.isParamLoading = !1, wx.hideLoading(), t.setData({
                toastState: !0,
                toastCont: "商品参数数据请求错误！"
            }), setTimeout(function() {
                t.setData({
                    toastState: !1
                });
            }, 3e3);
        }
    });
}, b = function(t) {
    e.mpGet(s.service.openApiDomain + "/mcp/queryPrdRelatedProduct", {
        productID: t.data.prdId
    }, {
        successFunc: function(a) {
            a.data && a.data.relatedProductList && a.data.relatedProductList.length > 0 && t.setData({
                relatedProductList: a.data.relatedProductList
            });
        },
        failFunc: function(t) {}
    });
}, y = function(t) {
    e.mpGet(s.service.openApiDomain + "/mcp/querySkuCouponList", {
        skuCodes: t.data.current_skuId
    }, {
        successFunc: function(a) {
            var s = a.data.couponCodeData;
            s && s.length > 0 ? (s.forEach(function(t, a) {
                t.beginDate = e.formatTimeNumber(t.beginDate, "Y.M.D"), t.endDate = e.formatTimeNumber(t.endDate, "Y.M.D");
            }), t.setData({
                conponBtn: !0,
                couponCodeList: a.data.couponCodeData
            })) : t.setData({
                conponBtn: !1,
                couponCodeList: []
            });
        },
        failFunc: function(a) {
            t.setData({
                conponBtn: !1,
                couponCodeList: []
            });
        }
    });
}, T = function(t, a) {
    e.mpGet(s.service.openApiDomain + "/mcp/querySkuDetailDispInfo", {
        skuCodes: a
    }, {
        successFunc: function(a) {
            if (a.data && a.data.detailDispInfos && a.data.detailDispInfos.length > 0) {
                var e = a.data.detailDispInfos[0], s = e.skuPriceInfo;
                if (t.data.skuPriceInfo = s, e.promoRuleList && e.promoRuleList.length > 0) {
                    var o = e.promoRuleList;
                    if (s && s.promoLabel) {
                        var i = {
                            promoLabel: s.promoLabel,
                            ruleDescription: s.promotionWord || ""
                        };
                        o.unshift(i);
                    }
                    if (o.length > 3) {
                        var n = o.slice(0, 2), u = o.slice(2);
                        t.setData({
                            promoRuleListA: n,
                            promoRuleListB: u
                        });
                    } else t.setData({
                        promoRuleListA: o,
                        promoRuleListB: []
                    });
                    t.setData({
                        promoRuleList: o
                    });
                }
                if (s) {
                    if (2 == s.priceMode) t.data.showSalePrice = !1, t.data.showPrice = !1, t.data.rushPriceInfo.rushPrice = "暂无报价", 
                    t.data.rushPriceInfo.rushPrice2 = "", t.data.rushPriceInfo.isPriceLoaded = !0; else if (1 == s.priceMode) {
                        s.unitPrice && s.orderPrice && (s.unitPrice != s.orderPrice ? (t.data.showSalePrice = !0, 
                        t.data.showPrice = !0, t.setData({
                            orderPrice: s.orderPrice,
                            unitPrice: s.unitPrice
                        })) : s.unitPrice == s.orderPrice && (t.data.showSalePrice = !1, t.data.showPrice = !0, 
                        t.setData({
                            orderPrice: s.orderPrice,
                            unitPrice: s.unitPrice
                        }))), 4 == t.data.productType ? ("0" == t.data.isSurePrice && (t.data.rushPriceInfo.rushPrice = "暂无报价"), 
                        "1" == t.data.isSurePrice && (t.data.rushPriceInfo.rushPrice = s.orderPrice ? s.orderPrice : "暂无报价")) : t.data.rushPriceInfo.rushPrice = s.orderPrice ? s.orderPrice : "暂无报价";
                        var r = t.disposeRushPrice(t.data.rushPriceInfo.rushPrice);
                        t.data.rushPriceInfo.rushPrice = r.integerPrice, t.data.rushPriceInfo.rushPrice2 = r.decimalPrice, 
                        t.data.rushPriceInfo.isPriceLoaded = !0;
                    }
                    t.setData({
                        showSalePrice: t.data.showSalePrice,
                        showPrice: t.data.showPrice,
                        "skuRushBuyInfo.rushPrice": t.data.rushPriceInfo.rushPrice,
                        "skuRushBuyInfo.rushPrice2": t.data.rushPriceInfo.rushPrice2,
                        sbomAbbr: s.sbomAbbr
                    });
                }
            } else t.data.rushPriceInfo.rushPrice = "暂无报价", t.data.rushPriceInfo.rushPrice2 = "", 
            t.data.rushPriceInfo.isPriceLoaded = !0, t.setData({
                showSalePrice: !1,
                showPrice: !1,
                promoRuleList: [],
                promoRuleListA: [],
                promoRuleListB: [],
                "skuRushBuyInfo.rushPrice": t.data.rushPriceInfo.rushPrice,
                "skuRushBuyInfo.rushPrice2": t.data.rushPriceInfo.rushPrice2
            });
        },
        failFunc: function() {
            t.setData({
                toastState: !0,
                toastCont: "请求发送失败！",
                promoRuleList: [],
                promoRuleListA: [],
                promoRuleListB: []
            }), setTimeout(function() {
                t.setData({
                    toastState: !1
                });
            }, 3e3);
        }
    });
}, D = function(t) {
    for (var a = [], e = {}, s = 0; s < t.length; s++) e[t[s].disPrdId] ? (t[s].selected = !1, 
    a[a.length - 1].push(t[s])) : (e[t[s].disPrdId] = !0, t[s].selected = !0, a.push([ t[s] ]));
    return a;
}, w = function(t, a) {
    var e = a.data.skuList;
    a.data.nowBuy.gifts = [], a.data.nowBuy.qty = 1, a.setData({
        nowBuy: a.data.nowBuy
    }), a.data.inventory = 1, clearInterval(a.data.activeTimer), a.data.activeTimer = null, 
    clearInterval(a.data.openTeamsTimer), a.data.openTeamsTimer = null, clearTimeout(a.data.rushWatchTimer), 
    a.data.rushWatchTimer = null, clearInterval(a.data.fixedTimer), a.data.fixedTimer = null, 
    a.data.isOpenTeamTimerActive = !1, a.data.isOnLoad = !0, a.setData({
        showRushBuySelectFloat: !1,
        showRushBuyAddressFloat: !1,
        buttonClass: "1-big-disabled",
        buttonText: "正在加载",
        openIcon: !1,
        showOpenTeamInfo: !1,
        buttonShowMode: "1",
        cutDownDay: "0",
        cutDownHour: "00",
        cutDownMinute: "00",
        cutDownSeconds: "00",
        teamBuyInfo: {},
        skuRushBuyInfo: {},
        rushPriceInfo: {},
        orderPrice: "",
        unitPrice: "",
        showDepositRules: !1,
        showDepositArea: !1,
        currRequestDeposit: 0,
        detailRules: [],
        mpWapDetailRuleUrl: "",
        teamBuyFlowUrl: "",
        isSurePrice: "",
        depositPrice: "",
        showPromArrow: !1,
        showFixedTimer: !1,
        timerPromWord: "",
        sbomPromWord: "",
        promoRuleList: [],
        promoRuleListA: [],
        promoRuleListB: [],
        openTeamBuyArr: [],
        openTeamBuyArrOnly: []
    }, function() {
        e.forEach(function(s, o) {
            s.sbomCode == t && (4 == a.data.productType ? a.getDepositActivityInfo(e[o], "refreshFlag") : c(e[o], a, "refreshFlag"));
        });
    });
};