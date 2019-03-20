var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = getApp(), e = a.globalData.mp, s = a.globalData.config;

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
        queryReq: {
            teamCode: ""
        },
        AttendTeamInfo: {},
        spellObj4Sku: {
            disPrdId: "",
            defaultSbom: "",
            availSbomCodeList: [],
            canSkuUse: !1
        },
        attendTeamBuyList: [],
        detailDisplayInfos: [],
        cdnPath: s.service.cdnPath,
        tip: "",
        btnContent: "",
        showBtn: !0,
        showDate: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        },
        showTime: !1,
        showSuccess: !1,
        showFail: !1,
        showFull: !1,
        TeamBuyOrderReqArg: {
            activityId: "",
            teamBuyId: "",
            headUrl: "",
            name: "",
            openId: "",
            formId: ""
        },
        openId: "",
        teamCode: "",
        myAvatarUrl: "",
        myName: "",
        sbomCode: "",
        isBtnClicked: !1,
        disPrdId: "",
        numberDiff: 0,
        isOnLoad: !0,
        timer: null,
        supportClickedFlag: !1,
        gbType: 1,
        isNewTeamType: !1,
        isNewPeople: !0,
        nowBuy: {
            itemId: "",
            itemType: "T",
            qty: 1,
            gifts: []
        },
        defaultClassifyIndex: 0,
        unionAll_: [],
        skuList: [],
        deal_skuAttrValueList: [],
        current_skuId: "",
        currentSkuObj: [],
        showGifts: !1,
        tempGiftList: [],
        giftsUsefulList: [],
        inventory: 1,
        giftList: [],
        numAddClass: "",
        numDelClass: "",
        skuLimitQty: 1,
        amount: 1,
        currAllSkuList: [],
        optionFlag: "",
        currTeamBuyPrice: "",
        isShowOriginPrice: !0,
        isFrameNeedGetData: !0,
        giftItemList: [],
        currentSkuSelectName: "",
        oldSkuNowBuy: {
            itemId: "-1"
        },
        buttonClass: "disabled",
        buttonText: "抱歉，暂时缺货",
        recommendationList: [],
        detailRules: [],
        showRules: !1,
        mpWapDetailRuleUrl: "",
        teamBuyFlowUrl: "",
        isRun: 0,
        isWin: 0,
        showLucky: !1,
        showLuckyList: !1,
        winningList: [],
        groupInfo: {},
        isShowShareModle: !1,
        isShowAuthModal: !1,
        wxModalIsShow: !1,
        loginStatus: 0,
        authOptionFlag: 0,
        authEvent: {},
        isHiddenPoster: !0,
        isHiddenAll: !1,
        authWords: a.globalData.authorizeWords,
        isDoingAuth: !1,
        isNeedOpenType: !0
    },
    onLoad: function(t) {
        var a = this, s = t.teamCode;
        if (t.scene) {
            var o = decodeURIComponent(t.scene);
            s = o.indexOf("=") > -1 ? o.split("=")[1] : o;
        }
        a.data.teamCode = s, a.data.openId = wx.getStorageSync("openId"), a.data.authOptionFlag = 1, 
        e.mpCheckUserAuthStatus(function(t) {
            a.setData({
                isShowAuthModal: !1,
                isNeedOpenType: !1
            }), a.initUserInfo();
        }, function(t) {
            a.getDefaultInfo(a.data.teamCode), a.setData({
                isNeedOpenType: !0,
                loginStatus: 2
            });
        }), a.getRecommendationList(), a.data.isOnLoad = !0;
    },
    onShow: function() {
        var t = this;
        t.data.isOnLoad || (t.data.authOptionFlag = 1, a.globalData.userInfo ? t.initUserInfo() : t.data.isShowAuthModal || t.setData({
            isShowAuthModal: !0
        }), t.data.isFrameNeedGetData = !0), this.setData({
            isBtnClicked: !1
        });
    },
    openGetSku: function(t) {
        var a = this;
        if (a.data.supportClickedFlag) return !1;
        a.setData({
            supportClickedFlag: !0
        }), setTimeout(function() {
            a.setData({
                supportClickedFlag: !1
            });
        }, 400);
        var e = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = e, e.translateY(.8 * a.data.windowHeight || 500).step(), 1 == t.currentTarget.dataset.status ? (this.setData({
            animationData: e.export(),
            showSku: !0
        }), setTimeout(function() {
            e.translateY(0).step(), this.setData({
                animationData: e.export()
            });
        }.bind(this), 1)) : 0 == t.currentTarget.dataset.status && (this.setData({
            animationData: e.export()
        }), setTimeout(function() {
            e.translateY(0).step(), this.setData({
                animationData: e.export(),
                showSku: !1
            });
        }.bind(this), 300), a.data.isFrameNeedGetData = !1);
    },
    getDefaultInfo: function(t) {
        wx.showLoading({
            title: "加载中...",
            mask: !0
        });
        var a = this;
        a.data.queryReq.teamCode = t, e.mpGet(s.service.openApiDomain + "/mcp/pin/queryAssignTeamInfo", a.data.queryReq, {
            successFunc: function(t) {
                if (!t.data || !t.data.success) return a.showFailModal(), wx.hideLoading(), !1;
                var e = t.data.groupInfo, s = {}, o = [];
                if (e) {
                    s.photoName = e.photoName || "", s.photoPath = e.photoPath || "", s.sbomName = e.sbomName || "", 
                    s.price = e.price || "", s.teamBuyPrice = e.teamBuyPrice || "", s.teamBuyNumber = e.teamBuyNumber || "", 
                    e.disPrdId ? s.disPrdId = e.disPrdId : a.showFailModal(), e.sbomCode ? s.sbomCode = e.sbomCode : a.showFailModal(), 
                    wx.hideLoading(), a.setData({
                        isShowAuthModal: !0
                    });
                    for (var n = 0; n < s.teamBuyNumber; n++) o.push({
                        displayName: "",
                        headUrl: "imgs/defaultface_user.png",
                        isOwner: 0
                    });
                    a.setData({
                        AttendTeamInfo: s,
                        attendTeamBuyList: o,
                        disPrdId: s.disPrdId,
                        sbomCode: s.sbomCode
                    });
                } else a.showFailModal();
            }
        });
    },
    getRecommendationList: function() {
        var t = this;
        e.mpPromiseGet(s.service.openApiDomain + "/mcp/promotion/queryRecommendProducts", {
            type: 4
        }).then(function(a) {
            a.data && "0" == a.data.code && a.data.products && a.data.products.length > 0 ? t.setData({
                recommendationList: a.data.products
            }) : t.setData({
                recommendationList: []
            });
        }).catch(function() {
            t.setData({
                recommendationList: []
            });
        });
    },
    toGoodsDetail: function(t) {
        if (this.stopDoubleClick()) return !1;
        var a = t.currentTarget.dataset.prdid ? t.currentTarget.dataset.prdid : "", e = t.currentTarget.dataset.skucode ? t.currentTarget.dataset.skucode : "";
        wx.navigateTo({
            url: "/pages/goodsDetail/goodsDetail?prdId=" + a + "&skuCode=" + e
        });
    },
    rulePicErr: function() {
        this.setData({
            teamBuyFlowUrl: ""
        });
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
    onHide: function() {
        var t = this;
        t.data.isOnLoad = !1, t.data.wxModalIsShow || t.setData({
            isShowAuthModal: !1
        }), clearInterval(t.data.timer), t.data.spellObj4Sku.canSkuUse && (t.data.oldSkuNowBuy = t.data.nowBuy);
    },
    onUnload: function() {},
    queryAssignTeamInfo: function(t) {
        wx.showLoading({
            title: "加载中...",
            mask: !0
        });
        var a = this;
        a.data.queryReq.teamCode = t, e.mpGet(s.service.openApiDomain + "/mcp/pin/queryAssignTeamInfo", a.data.queryReq, {
            successFunc: function(t) {
                if (!t.data || !t.data.success) return a.showFailModal(), wx.hideLoading(), !1;
                var e = t.data.groupInfo, s = 0, n = 0, i = -1, u = 1;
                if (e && a.setData({
                    groupInfo: e
                }), e.teamCode && a.setData({
                    teamCode: e.teamCode
                }), e.remainingTime && e.remainingTime > 0 && (s = e.remainingTime), e.teamBuyNumber && e.teamBuyAttendNumber && (n = e.teamBuyNumber - e.teamBuyAttendNumber, 
                a.setData({
                    numberDiff: n
                })), e.isUserAttend && (i = e.isUserAttend), e.gbType) {
                    if (u = e.gbType, a.setData({
                        gbType: u
                    }), e.mpWapDetailRuleUrl && a.setData({
                        mpWapDetailRuleUrl: e.mpWapDetailRuleUrl
                    }), e.detailRules) {
                        var d = e.detailRules.split("\n");
                        a.setData({
                            detailRules: d
                        });
                    }
                    if (2 == u && e.prizeTeamBuyFlowUrl && a.setData({
                        teamBuyFlowUrl: e.prizeTeamBuyFlowUrl
                    }), 2 != u && e.commonTeamBuyFlowUrl && a.setData({
                        teamBuyFlowUrl: e.commonTeamBuyFlowUrl
                    }), 2 == u) switch (Number(e.isRun)) {
                      case 0:
                        a.setData({
                            isRun: 0
                        });
                        break;

                      case 1:
                        0 == Number(e.isWin) ? a.setData({
                            isRun: 1,
                            isWin: 0
                        }) : 1 == Number(e.isWin) && a.setData({
                            isRun: 1,
                            isWin: 1
                        });
                    }
                }
                if (e.isNewPeople && 1 == e.isNewPeople ? a.setData({
                    isNewPeople: !0
                }) : a.setData({
                    isNewPeople: !1
                }), e.winningList && e.winningList.length > 0) {
                    var r = e.winningList.map(function(t) {
                        return t.headUrl || (t.headUrl = "imgs/defaultface_user.png"), t;
                    });
                    a.setData({
                        winningList: r
                    });
                } else a.setData({
                    showLuckyList: !1
                });
                if (e.teamBuyState && a.getTeamState(e.teamBuyState, s, i, n, u), e.disPrdId ? (a.data.disPrdId = e.disPrdId, 
                a.data.spellObj4Sku.disPrdId = e.disPrdId, a.data.spellObj4Sku.canSkuUse = !0) : a.data.spellObj4Sku.canSkuUse = !1, 
                e.attenTeamBuyList && e.attenTeamBuyList.length > 0) {
                    var l = e.attenTeamBuyList;
                    if (l.forEach(function(t) {
                        t.headUrl || (t.headUrl = "imgs/defaultface_user.png");
                    }), n > 0) for (var c = 0; c < n; c++) l.push(o);
                    a.setData({
                        AttendTeamInfo: e,
                        attendTeamBuyList: l
                    });
                }
                if (e.sbomCode) {
                    var m = {
                        itemId: e.sbomCode,
                        itemType: "T",
                        qty: 1
                    };
                    a.data.oldSkuNowBuy && a.data.oldSkuNowBuy.itemId && "-1" != a.data.oldSkuNowBuy.itemId && (m = a.data.oldSkuNowBuy), 
                    a.setData({
                        nowBuy: m,
                        sbomCode: e.sbomCode
                    }), a.data.spellObj4Sku.defaultSbom = e.sbomCode, a.data.spellObj4Sku.canSkuUse = !0;
                } else a.data.spellObj4Sku.canSkuUse = !1, a.showFailModal();
                e.sbomCodeList && e.sbomCodeList.length > 0 ? (a.data.spellObj4Sku.availSbomCodeList = e.sbomCodeList, 
                a.data.spellObj4Sku.canSkuUse = !0) : a.data.spellObj4Sku.canSkuUse = !1, wx.hideLoading();
            }
        });
    },
    showFailModal: function() {
        wx.showModal({
            title: "提示",
            content: "数据请求失败",
            confirmText: "前往首页",
            showCancel: !1,
            success: function() {
                wx.switchTab({
                    url: "/pages/index/index"
                });
            }
        });
    },
    getTeamState: function(t, a, e, s, o) {
        var n = this;
        switch (t) {
          case 1:
            var i = a / 1e3;
            i > 0 && (n.setData({
                showTime: !0
            }), n.handleCountDown(i)), 1 == e && s > 0 && (n.setData({
                tip: "还差" + s + "人拼团成功，分享到多个群可提高成功率哦",
                btnContent: "邀请好友参团"
            }), 8 == Number(o) && n.setData({
                isNewTeamType: !0
            })), -1 == e && s > 0 && (n.setData({
                tip: "还差" + s + "人拼团成功",
                btnContent: "我要参团"
            }), 8 == Number(o) && n.setData({
                isNewTeamType: !0
            }));
            break;

          case 2:
            n.setData({
                showFail: !1,
                showSuccess: !0,
                showFull: !1,
                showTime: !1
            }), 1 == e && 2 == o && n.setData({
                tip: "恭喜您拼团成功！",
                btnContent: "再开一团 提高中奖率",
                showBtn: !0
            }), 1 == e && 2 != o && n.setData({
                tip: "恭喜您拼团成功！",
                btnContent: "",
                showBtn: !1
            }), -1 == e && n.setData({
                tip: "团长人气太高，已经拼团成功了",
                btnContent: "自己开团"
            });
            break;

          case 3:
            n.setData({
                showFail: !0,
                showSuccess: !1,
                showFull: !1,
                showTime: !1
            }), 1 == e && s > 0 && n.setData({
                tip: "该团未能按时凑齐团员，拼团失败",
                btnContent: "再开一团"
            }), -1 == e && s > 0 && n.setData({
                tip: "该团未能按时凑齐团员，拼团失败",
                btnContent: "自己开团"
            });
            break;

          case 5:
            n.setData({
                showTime: !1
            }), 1 == e && (s > 0 ? n.setData({
                tip: "该团未能按时凑齐团员，拼团失败",
                btnContent: "",
                showFail: !0,
                showSuccess: !1,
                showFull: !1
            }) : 2 == o ? (0 == n.data.isRun && n.setData({
                tip: "还未开奖，惊喜总值得耐心等待~",
                btnContent: "",
                showFail: !1,
                showSuccess: !0,
                showFull: !1,
                showLucky: !0
            }), 1 == n.data.isRun && 0 == n.data.isWin && (n.setData({
                tip: "很遗憾您未中奖，再接再厉哦~",
                btnContent: "",
                showFail: !1,
                showSuccess: !0,
                showFull: !1
            }), n.data.winningList.length > 0 ? n.setData({
                showLucky: !0,
                showLuckyList: !0
            }) : n.setData({
                showLucky: !1,
                showLuckyList: !1
            })), 1 == n.data.isRun && 1 == n.data.isWin && n.setData({
                tip: "恭喜您中奖啦！奖品将按照参团的地址寄送~",
                btnContent: "",
                showFail: !1,
                showSuccess: !0,
                showFull: !1,
                showLucky: !0,
                showLuckyList: !0
            })) : n.setData({
                tip: "恭喜您拼团成功！",
                btnContent: "",
                showFail: !1,
                showSuccess: !0,
                showFull: !1
            })), -1 == e && (s > 0 ? n.setData({
                tip: "该团未能按时凑齐团员，拼团失败",
                btnContent: "",
                showFail: !0,
                showSuccess: !1,
                showFull: !1,
                showLucky: !1
            }) : n.setData({
                tip: "团长人气太高，已经拼团成功了",
                btnContent: "",
                showFail: !1,
                showSuccess: !0,
                showFull: !1,
                showLucky: !1
            }));
        }
    },
    handleCountDown: function(t) {
        var a = this;
        a.data.timer = setInterval(function() {
            var e = 0, s = 0, o = 0, n = 0;
            t > 0 && (e = Math.floor(t / 86400), s = Math.floor(t / 3600) - 24 * e, o = Math.floor(t / 60) - 24 * e * 60 - 60 * s, 
            n = Math.floor(t) - 24 * e * 60 * 60 - 60 * s * 60 - 60 * o), e <= 9 && (e = "0" + e), 
            s <= 9 && (s = "0" + s), o <= 9 && (o = "0" + o), n <= 9 && (n = "0" + n), a.setData({
                showDate: {
                    day: e,
                    hour: s,
                    minute: o,
                    second: n
                }
            }), --t <= 0 && (clearInterval(a.data.timer), a.setData({
                showTime: !1
            }), a.queryAssignTeamInfo(a.data.teamCode));
        }, 1e3);
    },
    joinTeam: function(t) {
        var o = this;
        return !(!o.data.spellObj4Sku.canSkuUse && o.stopDoubleClick()) && (t && t.detail && e.mpIsFormIdValid(t.detail.formId) && e.mpReportFormId(a, s, {
            formid: t.detail.formId,
            source: 6
        }), o.data.isNewTeamType && !o.data.isNewPeople ? (wx.showModal({
            title: "提示",
            content: "此团仅限新用户参与，您已成功或正在参与商城的拼团活动，请将机会留给其他人吧。",
            showCancel: !1,
            confirmText: "前往首页",
            success: function(t) {
                t.confirm && wx.switchTab({
                    url: "/pages/index/index"
                });
            }
        }), !1) : (o.data.optionFlag = "Join", void (o.data.spellObj4Sku.canSkuUse ? o.data.isFrameNeedGetData ? o.getSpellPrdInfo(t, o.data.optionFlag) : o.openGetSku(t) : o.gotoOrderConfirm(o.data.optionFlag))));
    },
    createTeam: function(t) {
        var o = this;
        if (!o.data.spellObj4Sku.canSkuUse && o.stopDoubleClick()) return !1;
        t && t.detail && e.mpIsFormIdValid(t.detail.formId) && e.mpReportFormId(a, s, {
            formid: t.detail.formId,
            source: 6
        }), o.data.optionFlag = "Open", o.data.spellObj4Sku.canSkuUse ? o.data.isFrameNeedGetData ? o.getSpellPrdInfo(t, o.data.optionFlag) : o.openGetSku(t) : o.gotoOrderConfirm(o.data.optionFlag);
    },
    gotoOrderConfirm: function(t) {
        var a = this, e = "";
        "Join" == t && (e = a.data.teamCode), a.setData({
            TeamBuyOrderReqArg: {
                teamBuyId: e,
                headUrl: a.data.myAvatarUrl,
                name: a.data.myName,
                openId: a.data.openId,
                formId: ""
            }
        }), "2" == a.data.gbType && (a.data.nowBuy.itemType = "LD"), wx.navigateTo({
            url: "../orderConfirm/orderConfirm?nowBuy=" + JSON.stringify([ a.data.nowBuy ]) + "&teamBuyInfo=" + JSON.stringify(a.data.TeamBuyOrderReqArg)
        });
    },
    goIndex: function() {
        if (this.stopDoubleClick()) return !1;
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    inviteFriends: function() {
        var t = this;
        if (t.stopDoubleClick()) return !1;
        t.setData({
            isShowShareModle: !0
        });
    },
    onShareAppMessage: function(t) {
        var a = this;
        a.setData({
            isShowShareModle: !1
        });
        var e = a.data.numberDiff > 0 ? a.data.numberDiff : 0, s = a.data.AttendTeamInfo.sbomName || "", o = s;
        return o = e > 0 ? "【仅剩" + e + "人】快来拼" + s : "快来拼" + s, {
            title: o,
            path: "/pages/orderSpellDetail/orderSpellDetail?teamCode=" + a.data.teamCode,
            fail: function(t) {
                wx.showModal({
                    title: "提示",
                    content: "转发失败",
                    showCancel: !1
                });
            }
        };
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
    goGoodsDetail: function() {
        var t = this, a = t.data.sbomCode, e = t.data.disPrdId;
        if (t.stopDoubleClick()) return !1;
        wx.navigateTo({
            url: "/pages/goodsDetail/goodsDetail?prdId=" + e + "&skuCode=" + a
        });
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
    getDefaultImg: function(t) {
        var a = this, e = t.currentTarget.dataset.index;
        a.data.attendTeamBuyList[e].headUrl = "imgs/defaultface_user.png", a.setData({
            attendTeamBuyList: a.data.attendTeamBuyList
        });
    },
    getSpellPrdInfo: function(t, a) {
        var o = this;
        e.mpGet(s.service.openApiDomain + "/mcp/queryPrdDisplayDetailInfo", {
            productId: o.data.spellObj4Sku.disPrdId
        }, {
            successFunc: function(s) {
                if (s.data && s.data.gbomAttrMappings && Object.keys(s.data.gbomAttrMappings).length > 0) {
                    var n;
                    !function() {
                        var a = s.data.gbomAttrMappings, d = "", r = -1, l = [], c = s.data.sbomList, m = o.data.spellObj4Sku.availSbomCodeList;
                        for (var h in a) !function(t) {
                            var e = [];
                            a[t].forEach(function(t, a) {
                                -1 != m.indexOf(t.sbomCode) && e.push(t);
                            }), a[t] = e;
                        }(h);
                        var f = [];
                        c.forEach(function(t) {
                            -1 != m.indexOf(t.sbomCode) && f.push(t);
                        }), c = f;
                        for (var p in a) !function(t) {
                            d = t, r += 1;
                            var s = {}, o = [];
                            a[t].forEach(function(t, a) {
                                var o = t.attrValue;
                                e.mpIsArray(s[o]) ? s[o].push(t.sbomCode) : (s[o] = [], s[o].push(t.sbomCode));
                            });
                            for (n in s) o.push({
                                attrName: n,
                                skuIdList: s[n],
                                status: 1
                            });
                            l.push({
                                classifyName: d,
                                indexNum: r,
                                attrList: o
                            });
                        }(p);
                        var w = o.data.spellObj4Sku.defaultSbom, y = [];
                        o.data.nowBuy.itemId = w, o.data.nowBuy.qty = 1, l[0].attrList.forEach(function(t, a) {
                            -1 != t.skuIdList.indexOf(w) ? (y = t.skuIdList, l[0].commonArrObj = t.skuIdList, 
                            t.status = 2) : t.status = 1;
                        });
                        var g = [ y ];
                        l.forEach(function(t, a) {
                            a > 0 && t.attrList.forEach(function(e, s) {
                                var o = i(g, a - 1);
                                u(e.skuIdList, o).state ? u(e.skuIdList, [ w ]).state ? (e.status = 2, g.push(e.skuIdList), 
                                t.commonArrObj = e.skuIdList) : e.status = 1 : e.status = 0;
                            });
                        }), l = l.filter(function(t) {
                            return t && t.attrList && t.attrList.length > 0;
                        }), o.setData({
                            nowBuy: o.data.nowBuy,
                            skuList: c,
                            deal_skuAttrValueList: l,
                            current_skuId: w || ""
                        }), o.data.defaultClassifyIndex = 0, o.refreshCurrSkuItem(), o.openGetSku(t);
                    }();
                } else o.gotoOrderConfirm(a);
            },
            failFunc: function(t) {
                o.gotoOrderConfirm(a);
            }
        });
    },
    refreshCurrSkuItem: function() {
        var t = this;
        if (t.data.nowBuy.gifts = [], t.data.nowBuy.qty = 1, t.setData({
            amount: 1,
            nowBuy: t.data.nowBuy
        }), t.data.skuList.forEach(function(a, e) {
            a.sbomCode == t.data.current_skuId && t.setData({
                currentSkuObj: a
            });
        }), t.getTeamBuyPriceBySku(), t.getGiftsAndInventoryBySku(), t.data.deal_skuAttrValueList && t.data.deal_skuAttrValueList.length > 0) {
            var a = "";
            t.data.deal_skuAttrValueList.forEach(function(t) {
                t && t.attrList && t.attrList.length > 0 && t.attrList.forEach(function(t) {
                    t && t.status && 2 == t.status && t.attrName && (a += t.attrName + " ");
                });
            }), t.setData({
                currentSkuSelectName: a.replace(/(\s*$)/g, "")
            });
        } else t.setData({
            currentSkuSelectName: ""
        });
    },
    getTeamBuyPriceBySku: function() {
        var t = this, a = "暂无报价", o = 1;
        e.mpGet(s.service.openApiDomain + "/ams/teamBuy/queryTeamBuyInfoBySbom", {
            sbomCode: t.data.current_skuId
        }, {
            successFunc: function(e) {
                e.data.success && e.data.teamBuyInfo && (e.data.teamBuyInfo.teamBuyPrice && (a = e.data.teamBuyInfo.teamBuyPrice), 
                e.data.teamBuyInfo.gbType && (o = e.data.teamBuyInfo.gbType)), t.setData({
                    currTeamBuyPrice: a,
                    gbType: o
                });
            },
            failFunc: function() {
                t.setData({
                    currTeamBuyPrice: a
                });
            }
        });
    },
    getGiftsAndInventoryBySku: function() {
        var t = this, a = t.data.currentSkuObj.giftList;
        if (a && a.length > 0) {
            var e = [];
            a.forEach(function(t, a) {
                e.push(t.sbomCode);
            }), t.data.tempGiftList = d(a), e.push(t.data.current_skuId), t.getGiftInventory(e);
        } else t.setData({
            showGifts: !1,
            giftsUsefulList: [],
            giftList: [],
            giftItemList: []
        }), t.data.nowBuy.gifts = [], t.getSkuInventory(t.data.current_skuId);
    },
    getGiftInventory: function(t) {
        var a = this;
        e.mpGet(s.service.openApiDomain + "/mcp/querySkuInventory", {
            skuCodes: t
        }, {
            successFunc: function(t) {
                t.data.inventoryReqVOs && t.data.inventoryReqVOs.length > 0 ? (a.data.giftsUsefulList = [], 
                t.data.inventoryReqVOs.forEach(function(t, e) {
                    t.inventoryQty > 0 && t.skuCode != a.data.current_skuId && a.data.giftsUsefulList.push(t.skuCode), 
                    t.skuCode == a.data.current_skuId && a.setData({
                        inventory: t.inventoryQty
                    });
                }), a.setData({
                    giftsUsefulList: a.data.giftsUsefulList
                })) : a.setData({
                    inventory: 0
                }), a.showNumAddDel(), a.data.giftsUsefulList.length > 0 ? a.setData({
                    showGifts: !0
                }) : a.setData({
                    showGifts: !1
                });
                var e = a.data.tempGiftList, s = [], o = [];
                a.data.nowBuy.gifts = [], e.forEach(function(t, e) {
                    var o = [];
                    t.forEach(function(t, e) {
                        -1 != a.data.giftsUsefulList.indexOf(t.sbomCode) && o.push(t);
                    }), o.length > 0 && s.push(o);
                }), s.forEach(function(t, e) {
                    return t[0].selected = !0, a.data.nowBuy.gifts.push({
                        sbomCode: t[0].sbomCode
                    }), o.push(t[0]), t;
                }), a.setData({
                    nowBuy: a.data.nowBuy,
                    giftList: s,
                    giftItemList: o
                }), a.showButtonType();
            },
            failFunc: function(t) {
                a.setData({
                    inventory: 0
                }), a.showNumAddDel(), a.showButtonType(), wx.showToast({
                    title: "库存数据请求失败！",
                    icon: "none"
                });
            }
        });
    },
    getSkuInventory: function(t) {
        var a = this;
        e.mpGet(s.service.openApiDomain + "/mcp/querySkuInventory", {
            skuCodes: t
        }, {
            successFunc: function(t) {
                var e = 0;
                t.data && t.data.inventoryReqVOs && t.data.inventoryReqVOs.length > 0 && (e = t.data.inventoryReqVOs[0].inventoryQty), 
                a.setData({
                    inventory: e
                }), a.showNumAddDel(), a.showButtonType();
            },
            failFunc: function(t) {
                a.setData({
                    inventory: 0
                }), a.showNumAddDel(), a.showButtonType(), wx.showToast({
                    title: "库存数据请求失败！",
                    icon: "none"
                });
            }
        });
    },
    showNumAddDel: function() {
        var t = this;
        t.data.numAddClass = "", t.data.inventory <= 0 ? (t.data.numAddClass = "disabled", 
        t.data.skuLimitQty = 0) : t.data.inventory > 0 && (1 == t.data.inventory ? t.data.numAddClass = "disabled" : t.data.numAddClass = "", 
        t.data.skuLimitQty = t.data.inventory), t.data.numDelClass = "disabled", t.setData({
            numAddClass: t.data.numAddClass,
            numDelClass: t.data.numDelClass,
            skuLimitQty: t.data.skuLimitQty
        });
    },
    showButtonType: function() {
        var t = this;
        t.data.inventory > 0 ? (t.data.buttonClass = "", t.data.buttonText = "确定") : (t.data.buttonClass = "disabled", 
        t.data.buttonText = "抱歉，暂时缺货"), t.setData({
            buttonClass: t.data.buttonClass,
            buttonText: t.data.buttonText
        });
    },
    selectGood: function(t) {
        var a = this, e = t.currentTarget.dataset;
        if ("0" == e.status || "2" == e.status) return !1;
        a.switchSku(e), a.refreshCurrSkuItem(), a.data.nowBuy.itemId = a.data.current_skuId, 
        a.setData({
            nowBuy: a.data.nowBuy
        });
    },
    switchSku: function(a) {
        var e = this;
        if (a) {
            var s, o, i = function() {
                if (e.data.defaultClassifyIndex = a.indexnum, 0 == a.status || 2 == a.status) return {
                    v: !1
                };
                var t = e.data.deal_skuAttrValueList;
                e.data.unionAll_ = a.skuidlist;
                var i = e.data.currAllSkuList;
                if (0 == i.length) {
                    if (t && t[0] && t[0].attrList) for (s = 0; s < t[0].attrList.length; s++) for (o = 0; o < t[0].attrList[s].skuIdList.length; o++) i.push(t[0].attrList[s].skuIdList[o]);
                    e.setData({
                        currAllSkuList: i
                    });
                }
                for (var d = 0; d < t.length; d++) !function(s) {
                    if (s > e.data.defaultClassifyIndex) {
                        for (var o = 0; o < t[s].attrList.length; o++) t[s].attrList[o].status = 1;
                        for (var d = n(t, s - 1), r = t[s].commonArrObj, l = !1, c = 0; c < t[s].attrList.length; c++) {
                            var m = t[s].attrList[c];
                            u(m.skuIdList, d).state ? m.skuIdList.length == i.length ? (m.status = 2, t[s].commonArrObj = m.skuIdList) : l ? m.status = 1 : (l = !0, 
                            m.status = 2, t[s].commonArrObj = m.skuIdList) : m.status = 0;
                        }
                        if (u(r, d).state) for (var h = 0; h < t[s].attrList.length; h++) {
                            var f = t[s].attrList[h];
                            f.skuIdList.length != i.length && 0 != f.status && (f.skuIdList.equals(r) ? (f.status = 2, 
                            t[s].commonArrObj = f.skuIdList) : 1 != f.status && (f.status = 1));
                        }
                    } else s == e.data.defaultClassifyIndex && t[s].attrList.forEach(function(e, o) {
                        a.attrname == e.attrName ? (t[s].commonArrObj = a.skuidlist, e.status = 2) : 0 != e.status && (e.status = 1);
                    });
                }(d);
                e.setData({
                    deal_skuAttrValueList: t
                });
            }();
            if ("object" === (void 0 === i ? "undefined" : t(i))) return i.v;
        }
        e.refreshCurrentSkuBySwitch();
    },
    refreshCurrentSkuBySwitch: function() {
        for (var t = this, a = t.data.deal_skuAttrValueList, e = [], s = 0; s < a.length; s++) !function(t) {
            a[t].attrList.forEach(function(a, s) {
                2 == a.status && (0 == t && (e = a.skuIdList), e = u(a.skuIdList, e).sboms);
            });
        }(s);
        t.setData({
            current_skuId: e[0] || ""
        });
    },
    addNum: function(t) {
        var a = this, e = a.data.amount;
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
        }), wx.showToast({
            title: "哎哟，购买数达上限啦",
            icon: "none"
        }));
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
    gotoPay: function(t) {
        var e = this;
        return !e.stopDoubleClick() && ("确定" == t.currentTarget.dataset.button && (!e.data.isDoingAuth && (e.data.authOptionFlag = 2, 
        e.data.authEvent = t, void (a.globalData.userInfo && e.initUserInfo()))));
    },
    returnIndex: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    goSpellCenter: function() {
        if (this.stopDoubleClick()) return !1;
        wx.navigateTo({
            url: "/pages/webview/webview?url=https://msale.vmall.com/ptpd.html"
        });
    },
    sharePoster: function() {
        var t = this;
        this.setData({
            isShowShareModle: !1
        });
        var a = {};
        a.skuPriceInfo = t.data.groupInfo, a.teamBuyInfo = t.data.groupInfo, t.setData({
            allSkuInfo: a,
            isShowPoster: !0
        });
    },
    closeShareModle: function() {
        this.setData({
            isShowShareModle: !1
        }), wx.hideLoading();
    },
    saveCanvas: function() {
        this.SharePoster = this.selectComponent("#SharePoster"), this.SharePoster.savePoster();
    },
    closePoster: function() {
        this.setData({
            isShowPoster: !1,
            isHiddenPoster: !0
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
    },
    onAuthSelect: function(t) {
        var s = this;
        if (a.globalData.userInfo) return !1;
        t && (t.detail && t.detail.userInfo || t.type && "authSelect" == t.type) && (s.data.isDoingAuth = !0, 
        s.setData({
            isNeedOpenType: !1
        }), wx.showLoading({
            mask: !0,
            title: "正在登录..."
        }), e.mpAuthorizeAndLogin(function() {
            wx.hideLoading(), s.setData({
                loginStatus: 1
            }), s.setPersonalInfo(), s.refreshAfterLogin(), s.data.isShowAuthModal && s.setData({
                isShowAuthModal: !1
            });
        }, function() {
            s.setData({
                loginStatus: 2
            }), s.data.isShowAuthModal && s.setData({
                isShowAuthModal: !1
            }), wx.showToast({
                title: "登录失败，请稍后重试",
                icon: "none"
            }), s.data.isDoingAuth = !1;
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
    openAuthModal: function() {
        var t = this;
        return !t.data.isShowAuthModal && (!t.data.isDoingAuth && (t.data.authOptionFlag = 1, 
        void (a.globalData.userInfo && t.initUserInfo())));
    },
    initUserInfo: function() {
        var t = this;
        e.mpQueryUserStatus(function() {
            t.setData({
                loginStatus: 1
            }), t.setPersonalInfo(), t.refreshAfterLogin();
        }, function() {
            wx.showLoading({
                mask: !0,
                title: "正在登录..."
            }), e.mpLogin(a, function(a) {
                a && a.data && a.data.success ? (wx.hideLoading(), t.data.isShowAuthModal && t.setData({
                    isShowAuthModal: !1
                }), t.setData({
                    loginStatus: 1
                }), t.setPersonalInfo(), t.refreshAfterLogin()) : (t.data.isShowAuthModal && t.setData({
                    isShowAuthModal: !1
                }), t.setData({
                    loginStatus: 2
                }), wx.showToast({
                    title: "登录失败，请稍后重试",
                    icon: "none"
                }));
            }, !1);
        });
    },
    refreshAfterLogin: function() {
        var t = this;
        1 == t.data.authOptionFlag ? (t.queryAssignTeamInfo(t.data.teamCode), t.data.isDoingAuth = !1) : 2 == t.data.authOptionFlag ? (t.openGetSku(t.data.authEvent), 
        t.gotoOrderConfirm(t.data.optionFlag), t.data.isDoingAuth = !1) : t.data.isDoingAuth = !1;
    },
    setPersonalInfo: function() {
        var t = this;
        a.globalData.userInfo ? t.setData({
            myAvatarUrl: a.globalData.userInfo.avatarUrl || "",
            myName: a.globalData.userInfo.nickName || ""
        }) : t.setData({
            myAvatarUrl: "",
            myName: ""
        });
    }
});

var o = {
    displayName: "",
    headUrl: "imgs/icon_team.png",
    isOwner: 0
}, n = function t(a, e) {
    return 0 == e ? a[0].commonArrObj : u(a[e].commonArrObj, t(a, e - 1)).sboms;
}, i = function t(a, e) {
    return 0 == e ? a[0] : u(a[e], t(a, e - 1)).sboms;
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
}, d = function(t) {
    for (var a = [], e = {}, s = 0; s < t.length; s++) e[t[s].disPrdId] ? (t[s].selected = !1, 
    a[a.length - 1].push(t[s])) : (e[t[s].disPrdId] = !0, t[s].selected = !0, a.push([ t[s] ]));
    return a;
};