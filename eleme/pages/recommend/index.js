var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }
    return e;
}, t = getApp().services, a = t.API, n = t.User, r = (t.imageHash, t.AliLog), o = {
    1: {
        title: "已获得",
        unit: "元",
        itemTitle: "datetime",
        showAvatar: !1,
        amountColor: "#ff5339",
        showWithdraw: !0,
        noDataText: "暂时没有奖励"
    },
    201: {
        title: "待下单",
        unit: "元",
        itemTitle: "datetime",
        showAvatar: !1,
        amountColor: "#ff5339",
        noDataText: "暂时没有邀请用户"
    },
    202: {
        title: "在路上",
        unit: "元",
        itemTitle: "sns_username",
        showAvatar: !0,
        amountColor: "#ff5339",
        noDataText: "暂时没有现金在路上"
    },
    3: {
        title: "已失效",
        unit: "元",
        itemTitle: "sns_username",
        showAvatar: !0,
        amountColor: "#999",
        noDataText: "没有失效记录"
    }
};

Page({
    data: {
        url: "http://h5.test.ele.me/commend#/",
        swipeData: [],
        indicatorDots: !1,
        vertical: !0,
        autoplay: !0,
        circular: !0,
        interval: 2e3,
        duration: 500,
        previousMargin: 0,
        nextMargin: 0,
        roueContent: "",
        progressMenu: [],
        loaded: !1,
        referCode: "",
        tabs: [],
        balance: 0,
        prizes: [],
        newRefer: !0
    },
    onLoad: function(e) {
        this.option = e, n.id && this.init();
    },
    onShow: function() {
        this.setData({
            loaded: !1
        }), n.id ? (this.setData({
            currentUser: n,
            loaded: !0
        }), this.init()) : this.setData({
            currentUser: !1,
            loaded: !0
        });
        var e = "";
        this.option && this.option.channel && (e = 2 === this.option.channel ? "channel=2" : "channel=" + this.option.channel), 
        r.sendGoldlog("recommendedprize.SmallProgramRecommendationAwards.SmallProgramsRecommendAwardSources", "EXP", e), 
        r.sendGoldlog("recommendedprize.SmallProgramsTJYJ_main.EXP_TJYJMainpage", "EXP"), 
        r.sendPv();
    },
    showRoueContent: function() {
        wx.showModal({
            title: "活动规则",
            content: this.data.roueContent,
            showCancel: !1
        });
    },
    init: function() {
        var e = this, t = this;
        a.getNewRefer().then(function(e) {
            return t.setData({
                newRefer: e.data.enabled
            }), e.data.enabled ? Promise.resolve() : Promise.reject();
        }).then(function() {
            return a.getShareReferCode().then(function(n) {
                console.log(n), t.setData({
                    referCode: n.data
                }), a.getShareReferProgressMenus().then(function(e) {
                    var a = e.data.filter(function(e) {
                        return 0 !== e.status;
                    }), n = (e.data.find(function(e) {
                        return 0 === e.status;
                    }) || {}).amount || 0, r = t.progressMenu(a);
                    t.setData({
                        tabs: a,
                        balance: n,
                        progressMenu: r
                    });
                }), a.getShareReferPrize().then(function(e) {
                    console.log(e), t.setData({
                        prizes: e.data
                    });
                }), a.getRecommendSwipeData().then(function(t) {
                    console.log(t), e.setData({
                        swipeData: t.data.swipeData,
                        roueContent: t.data.rules
                    });
                });
            });
        });
    },
    goStrategy: function(e) {
        "strategy" === e.target.dataset.gourl.hash && r.sendGoldlog("/recommendedprize.SmallProgramsTJYJ_main.CLK_SpeedOfProgress", "CLK"), 
        "withdraw" === e.target.dataset.gourl.hash && r.sendGoldlog("/recommendedprize.SmallProgramsTJYJ_main.CLK_WithdrawableCash", "CLK"), 
        wx.navigateTo({
            url: "/pages/recommend/strategy/index?hash=" + e.target.dataset.gourl
        });
    },
    goShare: function() {
        r.sendGoldlog("/recommendedprize.SmallProgramsTJYJ_main.CLK_MakeMoney", "CLK");
    },
    goLogin: function() {
        wx.navigateTo({
            url: "/pages/auth/index"
        });
    },
    progressMenu: function(t) {
        if (!t || !t.length) return [];
        var a = [ 201, 202, 1, 3 ], n = [];
        return t.map(function(t) {
            return e({}, t, o[t.status]);
        }).forEach(function(e) {
            var t = a.indexOf(e.status);
            n[t] = e;
        }), n;
    },
    onShareAppMessage: function(e) {
        return r.sendGoldlog("recommendedprize.SmallProgramsTJYJ_main.CLK_share", "CLK"), 
        {
            title: "饿了么送你一个大红包，快点击领取！",
            path: "/pages/recommend/water/index?refer_id=" + n.id + "&refer_code=" + this.data.referCode + "&refer_channel_code=1&refer_channel_type=2",
            imageUrl: "https://cube.elemecdn.com/1/91/e8e64654133671c83006cccc870f1jpeg.jpeg"
        };
    }
});