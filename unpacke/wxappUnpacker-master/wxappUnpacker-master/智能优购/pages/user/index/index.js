var e = getApp(), a = require("../../../184D8FB32546F6CF7E2BE7B4F125B753.js").phoneService;

Page({
    data: {
        leave: "",
        dataset: {
            userid: 0
        },
        isLogin: !0,
        coverStatus: !1,
        isSureShare: 1,
        isidentity: 2,
        shareGoodsId: "",
        witchpage: "",
        loginName: "登录",
        loadlayer: !0,
        canShare: !1,
        userType: 0,
        score: 0,
        leaveW: "30",
        toast: [ !1, !1, !1 ],
        expectShow: !1
    },
    veriNow: function() {
        wx.navigateTo({
            url: "../../../pages/user/veri/veri"
        });
    },
    rank: function() {
        wx.navigateTo({
            url: "/pages/user/rank/rank"
        });
    },
    goWbv: function() {
        var e = encodeURIComponent("https://v2.live800.com/live800/chatClient/chatbox.jsp?companyID=1101830&configID=127399&jid=9094269650&s=1");
        wx.navigateTo({
            url: "../../webViwe/webViwe?page=" + e
        });
    },
    myChild: function() {
        var e = this.data.dataset.userid, a = this.data.userType;
        wx.navigateTo({
            url: "/pages/user/referrer2/referrer2?userid=" + e + "&cote=" + a
        });
    },
    goChangeInfo: function() {
        1 == this.data.isSureShare ? wx.navigateTo({
            url: "/pages/user/changeInfo/changeInfo"
        }) : wx.showToast({
            title: "您已修改过推荐人,仅支持修改一次哟",
            icon: "none"
        });
    },
    closeToast: function() {
        this.setData({
            toast: [ !1, !1, !1 ]
        });
    },
    closeLeaveUp: function() {
        wx.setStorageSync("is_hide_leave_toast", !0), this.setData({
            toast: [ !1, !1, !1 ]
        });
    },
    bindOrderTap: function(a) {
        var t = a.currentTarget.dataset.tab;
        console.log(t), e.tab = t, wx.switchTab({
            url: "/pages/user/order/order"
        });
    },
    bindLotteryTap: function(e) {
        var a = e.currentTarget.dataset.tab;
        wx.navigateTo({
            url: "/pages/user/lottery/lottery?tab=" + a
        });
    },
    bindCoinTap: function(e) {
        e.currentTarget.dataset.tab;
        wx.navigateTo({
            url: "/pages/user/coinaddr/coinaddr"
        });
    },
    bindPinOrderTap: function(e) {
        var a = e.currentTarget.dataset.tab;
        wx.navigateTo({
            url: "/pages/user/pinorder/pinorder?tab=" + a
        });
    },
    bindCashTap: function(e) {
        wx.navigateTo({
            url: "/pages/user/cash/cash"
        });
    },
    bindIntegralTab: function(e) {
        wx.navigateTo({
            url: "/pages/user/integral/integral"
        });
    },
    bindApplyTab: function(e) {
        wx.navigateTo({
            url: "/pages/user/apply/apply"
        });
    },
    gotoAdsList: function() {
        wx.navigateTo({
            url: "/pages/shop/addresslist/addresslist"
        });
    },
    gotoColList: function() {
        wx.navigateTo({
            url: "/pages/user/collection/collection"
        });
    },
    goIdentity: function(e) {
        this.setData({
            coverStatus: !1
        }), wx.navigateTo({
            url: "/pages/user/identity/identity?type=" + this.data.isidentity
        });
    },
    bindReferrerTab: function(e) {
        var a = this.data.dataset.userid;
        wx.navigateTo({
            url: "/pages/user/referrer/referrer?userid=" + a
        });
    },
    bindPriceOutTab: function(e) {
        wx.navigateTo({
            url: "/pages/user/application/application"
        });
    },
    bindFootTab: function(e) {
        wx.navigateTo({
            url: "/pages/user/foot/foot"
        });
    },
    bindServiceTab: function(e) {
        console.log(this.data.dataset), wx.makePhoneCall({
            phoneNumber: this.data.dataset.myCustomerService
        });
    },
    onPullDownRefresh: function() {
        this.loadData();
    },
    loadData: function() {
        var a = this;
        e.getHttpData(e.myCenter_index, {
            r: Math.random()
        }, "GET", function(t) {
            return wx.stopPullDownRefresh(), wx.hideLoading(), console.log(111), console.log("需要储存用户数据", t), 
            null != t && (401 == t.code ? (a.setData({
                isLogin: !0,
                loadlayer: !1
            }), wx.clearStorageSync(), !1) : (0 == t.userid ? (e.removekey(), a.setData({
                loginName: "登录",
                dataset: {
                    userid: 0
                }
            })) : (a.setData({
                loginName: "登录",
                userType: t.usertype
            }), e.setUserinfoData(t), t.isVerification ? a.setData({
                isidentity: 1
            }) : a.setData({
                isidentity: 2
            }), t.isSureShare ? a.setData({
                isSureShare: 2
            }) : a.setData({
                isSureShare: 1
            }), a.setData({
                dataset: t
            })), void a.setData({
                loadlayer: !1
            })));
        });
    },
    shareGetIntragl: function() {
        wx.navigateTo({
            url: "/pages/index/share/share"
        });
    },
    myCatchTouch: function() {},
    onLoad: function(a) {
        new e.WeToast();
    },
    closeCover: function() {
        this.setData({
            coverStatus: !1
        });
    },
    bindLoginTap: function(a) {
        console.log("用户信息", a);
        var t = this;
        a.detail.userInfo && (wx.showLoading({
            title: "登录中",
            mask: !0
        }), e.getuserinfo(a, function(e) {
            e && (console.log(a), t.loadData());
        }, 4, t));
    },
    onShow: function() {
        a.getPhone(4), console.log("usershow:" + e.getshareid());
        var t = this, o = e.globalData.isLogin;
        t.setData({
            isLogin: o
        }), console.log("是否登录", o);
        var n = getCurrentPages();
        n[n.length - 1].route;
        t.loadData();
    },
    setCopy: function(e) {
        var a = e.currentTarget.dataset.codyid;
        if (!a) return wx.showToast({
            icon: "loading",
            title: "邀请码为空"
        }), !1;
        wx.setClipboardData({
            data: "" + a,
            success: function(e) {
                wx.showToast({
                    title: "复制成功"
                });
            }
        });
    },
    gotoLeaveInfo: function() {
        wx.navigateTo({
            url: "/pages/user/leaveInfo/leaveInfo"
        });
    },
    gotointaglExchange: function() {
        console.log(this.data.dataset.mobile), 2 == this.data.isidentity ? this.setData({
            coverStatus: !0
        }) : wx.navigateTo({
            url: "/pages/user/leaveInfoExchange/leaveInfoExchange?mobile=" + this.data.dataset.mobile
        });
    },
    closeExpect: function() {
        return this.setData({
            expectShow: !1
        }), !1;
    }
});