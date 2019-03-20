var t = getApp();

Page({
    data: {
        toast: {
            toastImg: "",
            linkUrlMini: ""
        },
        isScroll: !0,
        showSearchBg: !1,
        navindex: [ "on", "", "" ],
        dataset: [],
        Homedata: [],
        isLoad: !1,
        currentTab: 0,
        navcss: "",
        zhanweih: 0,
        nextPage: 0,
        catewidth: 0,
        cateitemwidth: 0,
        loadIsEnd: !1,
        wintime: "",
        isVerfity: !0,
        loadlayer: !0,
        jdbid: "",
        limitTime: "",
        limit_percent: "",
        showWindow: !1,
        fupinbid: "",
        luckyShow: !1,
        canShare: "",
        shareShow: !1,
        userType: 0,
        skllTime: null,
        active: {},
        likesData: "",
        score: "",
        orderId: ""
    },
    loadData: function() {
        var a = this;
        t.getHttpData(t.order_success_return, {
            orderId: a.data.orderId
        }, "GET", function(t) {
            wx.stopPullDownRefresh(), 200 == t.code ? a.setData({
                likesData: t.data.likes,
                score: t.data.score,
                loadlayer: !1
            }) : t.msg ? wx.showToast({
                title: t.msg,
                icon: "none"
            }) : wx.showToast({
                title: "未知错误",
                icon: "none"
            });
        });
    },
    arraySplice: function(t) {
        var a = Object.assign([], t).splice(0, 6), e = t.splice(6, 6);
        return console.log("a1", a), console.log("a2", e), {
            arr1: a,
            arr2: e
        };
    },
    bindStoryTap: function(t) {
        var a = t.currentTarget.dataset.bid;
        wx.navigateTo({
            url: "/pages/shop/searchList/searchList?bid=" + a
        });
    },
    bindNewTap: function(t) {
        var a = t.currentTarget.dataset.bid;
        wx.navigateTo({
            url: "/pages/shop/searchList/searchList?bid=" + a
        });
    },
    bindContentTap: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/shop/content/content?main=true&id=" + a
        });
    },
    toActive: function(t) {
        var a = t.currentTarget.dataset.id;
        this.closeWindow(), wx.navigateTo({
            url: "/pages/active/active?prId=" + a
        });
    },
    bindClassTap: function(t) {
        var a = t.currentTarget.dataset.bid, e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/shop/list/list?bid=" + a + "&name=" + e
        });
    },
    bindArticleTap: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/article/content/content?id=" + a
        });
    },
    bindArticleListTap: function(t) {
        t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/article/list/list"
        });
    },
    bindSortTap: function() {
        wx.navigateTo({
            url: "/pages/index/sortlist/sortlist"
        });
    },
    onHide: function() {},
    onPullDownRefresh: function() {
        this.onLoad(null);
    },
    getLike: function() {
        var a = this, e = a.data.Homedata, i = e.guessYouLike;
        wx.showLoading({
            title: "加载中"
        });
        var o = {
            limit: 30,
            start: i.length + 1
        };
        t.getHttpData(t.you_link, o, "GET", function(t) {
            wx.hideLoading(), t.code, i = i.concat(t.data), e.guessYouLike = i, a.setData({
                Homedata: e,
                isLoad: !1
            });
        });
    },
    onShow: function() {
        this.loadData();
    },
    userType: function() {
        var a = this;
        t.getHttpData(t.myCenter_index, null, "GET", function(e) {
            wx.stopPullDownRefresh(), console.log(e), a.setData({
                loginName: "登录"
            }), 0 == e.userid ? t.removekey() : a.setData({
                dataset: e,
                userType: e.usertype
            }), a.setData({
                loadlayer: !1
            });
        });
    },
    onLoad: function(a) {
        a.orderId && this.setData({
            orderId: a.orderId
        }), console.log(a.orderId);
        new t.WeToast();
        this.setData({
            isLoad: !1,
            loadIsEnd: !1
        }), this.setData({
            nextPage: 1
        });
        var e = this;
        return t.login(function(t) {
            e.loadData();
        }), !1;
    },
    onPageScroll: function(t) {
        var a = this, e = this.data.isScroll;
        this.data.showSearchBg;
        e && (t.scrollTop >= 188 ? a.changeBg(!0) : a.changeBg(!1));
    },
    changeBg: function(t) {
        var a = !1, e = !1, i = this;
        setTimeout(function() {
            a = !0, i.setData({
                isScroll: a
            });
        }, 200), a = !0, e = t, i.setData({
            isScroll: a,
            showSearchBg: e
        });
    },
    goUp: function() {
        var a = this;
        wx.showModal({
            title: "升级提醒",
            content: "升级成vip导购,需要扣除您" + a.data.score + "数贝",
            success: function(a) {
                a.confirm ? (wx.showLoading({
                    title: "升级中",
                    mask: !0
                }), t.getHttpData(t.vip_promote, {}, "GET", function(t) {
                    console.log("升级信息", t), 200 == t.code ? (wx.showToast({
                        title: "升级成功",
                        icon: "none"
                    }), setTimeout(function() {
                        wx.switchTab({
                            url: "/pages/vip/vipIndex/vip"
                        });
                    }, 1500)) : wx.showToast({
                        title: t.msg,
                        icon: "none"
                    });
                })) : a.cancel && wx.switchTab({
                    url: "/pages/vip/vipIndex/vip"
                });
            }
        });
    },
    goOrder: function() {
        wx.switchTab({
            url: "/pages/user/order/order"
        });
    },
    getData: function() {}
});