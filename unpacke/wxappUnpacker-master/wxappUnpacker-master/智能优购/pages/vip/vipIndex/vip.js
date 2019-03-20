require("../../../614EDDE22546F6CF0728B5E55C25B753.js");

var t = getApp(), e = require("../../../184D8FB32546F6CF7E2BE7B4F125B753.js").phoneService;

Page({
    data: {
        isLogin: !0,
        isActive: "0",
        dataset: {
            userid: 0
        },
        timer1: "",
        userInfo: "",
        userTypes: "",
        tipTxt: "",
        isInformation: !1,
        indexData: "",
        userType: 2,
        isUp: "1",
        loadlayer: !0,
        coverStatus: !1,
        tipShow: 2,
        isAuthentication: 2,
        tipType: "",
        upgradeProgress: ""
    },
    goWithdrawCash: function() {
        var t = this;
        1 == t.data.indexData.switchWithdraw ? 1 == t.data.isAuthentication ? t.data.indexData.isWithdrawalInformation ? wx.navigateTo({
            url: "/pages/vip/withdraw/withdraw"
        }) : wx.navigateTo({
            url: "/pages/vip/information/information?type=1"
        }) : t.setData({
            tipType: 1,
            coverStatus: !0
        }) : t.setData({
            coverStatus: !0,
            tipType: 13
        });
    },
    goMybill: function() {
        wx.navigateTo({
            url: "/pages/vip/myBill/myBill"
        });
    },
    goWithdrawRecord: function() {
        wx.navigateTo({
            url: "/pages/vip/withdrawRecord/withdrawRecord"
        });
    },
    goWbv: function() {
        var t = encodeURIComponent("https://v2.live800.com/live800/chatClient/chatbox.jsp?companyID=1101830&configID=127399&jid=9094269650&s=1");
        wx.navigateTo({
            url: "../../webViwe/webViwe?page=" + t
        });
    },
    showIntro: function() {
        this.setData({
            tipType: 11,
            coverStatus: !0
        });
    },
    goGiftBuy: function() {
        wx.navigateTo({
            url: "/pages/vip/giftBuy/giftBuy"
        });
    },
    getPhoneNumber: function() {
        wx.navigateTo({
            url: "/pages/create/create"
        });
    },
    gotoActive: function() {
        wx.navigateBack({
            delta: 2
        });
    },
    bindViewTap: function() {},
    upVip: function() {
        var t = this;
        switch (console.log(t.data.userType), console.log(t.data.tipType), t.data.userType) {
          case 1:
            t.tap1();
            break;

          case 2:
            t.tap2();
            break;

          case 3:
            t.tap3();
            break;

          case 4:
            t.tap4();
        }
    },
    tap1: function() {
        var t = this;
        console.log(t.data.isAuthentication), 1 == t.data.isAuthentication ? 1 == t.data.isUp ? wx.navigateTo({
            url: "/pages/vip/giftBuy/giftBuy"
        }) : t.setData({
            tipType: 10,
            coverStatus: !0
        }) : t.setData({
            tipType: 1,
            tipTxt: "快速升级VIP导购",
            coverStatus: !0
        });
    },
    tap2: function() {
        var t = this;
        1 == t.data.isUp ? t.setData({
            tipType: 4,
            coverStatus: !0
        }) : t.setData({
            tipType: 10,
            coverStatus: !0
        });
    },
    aaa: function() {
        wx.showModal({
            title: "nihao",
            content: "11111"
        });
    },
    tap3: function() {
        var t = this;
        console.log(1111), 1 == t.data.isUp ? t.setData({
            tipType: 6,
            coverStatus: !0
        }) : (console.log(t.data.tipType), t.setData({
            tipType: 10,
            coverStatus: !0
        }));
    },
    tap4: function() {
        var t = this;
        1 == t.data.isUp ? t.setData({
            tipType: 6,
            coverStatus: !0
        }) : t.setData({
            tipType: 10,
            coverStatus: !0
        });
    },
    confirm: function() {
        var t = this;
        switch (console.log(t.data.tipType), t.data.tipType) {
          case 1:
            t.goAuthentication();
            break;

          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            t.closeCover();
            break;

          case 10:
            t.upSuccess();
            break;

          case 11:
            t.closeCover();
            break;

          case 12:
            t.closeCover();

          case 13:
            t.closeCover();
        }
    },
    goAuthentication: function() {
        this.setData({
            coverStatus: !1
        }), wx.navigateTo({
            url: "/pages/user/identity/identity"
        });
    },
    upSuccess: function() {
        var e = this;
        wx.showLoading({
            title: "升级中",
            mask: !0
        }), t.getHttpData(t.vip_promote, {}, "GET", function(t) {
            console.log("升级信息", t), 200 == t.code ? (e.loadDataIndex(), e.setData({
                timer1: setTimeout(function() {
                    e.setData({
                        tipType: 8
                    }), wx.hideLoading();
                }, 2e3)
            })) : wx.showToast({
                title: t.msg,
                icon: "none"
            });
        });
    },
    goUpLevel: function() {
        this.setData({
            isUp: 1
        });
    },
    closeCover: function() {
        this.setData({
            coverStatus: !1
        });
    },
    myCatchTouch: function() {},
    onLoad: function(t) {},
    onShow: function() {
        e.getPhone(2);
        var a = getCurrentPages(), i = (a[a.length - 1].route, this), o = t.globalData.isLogin;
        i.setData({
            isLogin: o
        }), console.log("是否登录", o), console.log(1112), i.loadData();
    },
    loadDataIndex: function() {
        this.loadData();
    },
    onPullDownRefresh: function() {
        this.loadDataIndex();
    },
    getVipData: function() {
        var e = this;
        e.data.dataset.isVerification ? e.setData({
            isAuthentication: 1
        }) : e.setData({
            isAuthentication: 2
        }), t.getHttpData(t.vip_index, {}, "GET", function(t) {
            if (wx.stopPullDownRefresh(), console.log("修改信息", t), 200 == t.code) {
                var a = t.data.currentUserType + 1;
                console.log(a);
                var i = t.data;
                if (2 == a) a = 4; else if (3 == a) {
                    a = 3;
                    var o = i.directorUpgradeProgress.vipCntExceptDirectly, s = i.directorUpgradeProgress.teamManagerCnt, n = i.directorUpgradeProgress.heirIntegral, r = i.directorUpgradeProgress.takeoutIntegral;
                    i.directorUpgradeProgress.vipCntExceptDirectly = parseInt(100 * o.toFixed(2)), i.directorUpgradeProgress.teamManagerCnt = parseInt(100 * s.toFixed(2)), 
                    i.directorUpgradeProgress.heirIntegral = parseInt(100 * n.toFixed(2)), i.directorUpgradeProgress.takeoutIntegral = parseInt(100 * r.toFixed(2)), 
                    console.log(11111, i.directorUpgradeProgress.heirIntegral);
                } else if (4 == a) {
                    a = 2;
                    var c = i.vipUpgradeProgress.directlyVipCnt, p = i.vipUpgradeProgress.teamVipCount, d = i.vipUpgradeProgress.directorIntegral;
                    i.vipUpgradeProgress.directlyVipCnt = parseInt(100 * c.toFixed(2)), i.vipUpgradeProgress.teamVipCount = parseInt(100 * p.toFixed(2)), 
                    i.vipUpgradeProgress.directorIntegral = parseInt(100 * d.toFixed(2));
                }
                var g = i.upgradeProgress;
                g < 1 ? e.setData({
                    isUp: 1
                }) : 1 == g && e.setData({
                    isUp: 2
                });
                e.setData({
                    isActive: t.data.isActivationIdentity,
                    loadlayer: !1,
                    indexData: i,
                    userType: a,
                    upgradeProgress: parseInt(100 * g.toFixed(2))
                });
            } else e.setData({
                loadlayer: !1
            }), wx.showToast({
                title: "获取信息失败",
                icon: "none"
            });
        });
    },
    getGoodsDetails: function() {
        var e = this;
        wx.showLoading({
            title: "操作中",
            mark: !0
        }), t.getHttpData(t.vip_giftBagActivationconfig, "", "get", function(t) {
            console.log(t), 200 == t.code ? (wx.hideLoading(), 1 == t.data.isEnable ? wx.navigateTo({
                url: "/pages/shop/content/content?main=true&id=" + t.data.goodsId + "&gift=1"
            }) : e.setData({
                tipType: 12,
                coverStatus: !0
            })) : wx.showToast({
                title: "请求失败",
                icon: "none"
            });
        });
    },
    loadData: function() {
        var e = this;
        t.getHttpData(t.myCenter_index, null, "GET", function(a) {
            if (wx.stopPullDownRefresh(), wx.hideLoading(), console.log(0 == a.userid), 401 == a.code) return e.setData({
                isLogin: !0,
                loadlayer: !1
            }), wx.clearStorageSync(), !1;
            0 == a.userid ? (t.removekey(), e.setData({
                loadlayer: !1,
                dataset: {
                    userid: 0
                }
            })) : (e.setData({
                loginName: "登录",
                dataset: a
            }), t.setUserinfoData(a), e.getVipData());
        });
    },
    onHide: function() {
        this.setData({
            coverStatus: !1
        }), clearTimeout(this.data.timer1);
    },
    bindLoginTap: function(e) {
        var a = this;
        console.log("登录成功后", e), e.detail.userInfo && (wx.showLoading({
            title: "登录中",
            mask: !0
        }), a.data.witchpage, t.getuserinfo(e, function(t) {
            t && a.loadDataIndex();
        }, 2, a));
    },
    goDataDetails: function(t) {
        wx.navigateTo({
            url: "/pages/vip/dataDetails/dataDetails?inx=" + t.currentTarget.dataset.inx
        });
    }
});