var e = !1, t = null, o = getApp();

Page({
    data: {
        isLoading: !1,
        isEnd: !1,
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
        active: {}
    },
    loadData: function() {
        var e = this;
        if (!e.data.isLoad && !e.data.loadIsEnd) {
            e.setData({
                isLoad: !0
            });
            e.data.nextPage;
            o.getHttpData(o.index_change_index, null, "GET", function(t) {
                wx.stopPullDownRefresh();
                var a = t.data;
                console.log("--------------", t.data);
                var i = void 0, n = {};
                a.goodInfo.secKillAndScorePro && (a.goodInfo.secKillAndScorePro[0] && (n.skId = {
                    isPriceType: a.goodInfo.secKillAndScorePro[0].prType,
                    prid: a.goodInfo.secKillAndScorePro[0].prId
                }, e.timeTransform(a.goodInfo.secKillAndScorePro[0].countDown)), a.goodInfo.secKillAndScorePro[1] && (n.intId = {
                    isPriceType: a.goodInfo.secKillAndScorePro[1].prType,
                    prid: a.goodInfo.secKillAndScorePro[1].prId
                })), a.goodInfo.prePro && (n.goodShopId = {
                    prid: a.goodInfo.prePro.prId,
                    isPriceType: a.goodInfo.prePro.isPriceType
                }), a.goodInfo.groupPro && (i = e.arraySplice(a.goodInfo.groupPro.promotionGoods), 
                a.goodInfo.groupPro.promotionGoods = i, n.groupId = {
                    isPriceType: a.goodInfo.groupPro.isPriceType,
                    prid: a.goodInfo.groupPro.prId
                }), a.goodInfo.topicPro && (n.cheapId = {
                    prid: a.goodInfo.topicPro.prId,
                    isPriceType: a.goodInfo.topicPro.isPriceType
                }), console.log("=1=============================", n), o.goodShopId = n.goodShopId, 
                e.setData({
                    active: n,
                    Homedata: a
                });
            }), o.getHttpData(o.domain + "/index/main", null, "GET", function(t) {
                wx.stopPullDownRefresh(), console.log(t), e.setData({
                    dataset: t
                }), e.isShare(), e.setData({
                    loadlayer: !1
                });
            });
        }
    },
    getToastDate: function() {
        var e = this;
        o.getHttpData(o.app_promotion_window_display, null, "GET", function(t) {
            if (wx.stopPullDownRefresh(), console.log("toast", t), 101 == t.code) return !1;
            if (200 == t.code) {
                var o = {
                    toastImg: t.data.img,
                    linkUrlMini: t.data.linkUrlMini
                };
                e.setData({
                    toast: o
                }), e.validateToast();
            }
            return !1;
        });
    },
    gogoActiveData: function(e) {
        var t = this, o = e.currentTarget.dataset.link;
        console.log("link", o), o && wx.navigateTo({
            url: o,
            success: function() {
                t.closeWindow();
            }
        });
    },
    validateToast: function() {
        try {
            var e = wx.getStorageSync("index_toast");
            if (e) {
                var t = new Date(e), o = t.getFullYear(), a = t.getMonth() + 1, i = t.getDate(), n = new Date(), r = n.getFullYear(), s = n.getMonth() + 1, l = n.getDate();
                console.log("关闭:" + o + "-" + a + "-" + i), console.log(111111), console.log("现在:" + r + "-" + s + "-" + l), 
                console.log(222222), o != r || a != s || i != l ? this.setData({
                    showWindow: !0
                }) : this.setData({
                    showWindow: !1
                });
            } else this.setData({
                showWindow: !0
            });
        } catch (e) {
            this.setData({
                showWindow: !0
            });
        }
    },
    closeWindow: function() {
        wx.setStorageSync("index_toast", new Date().getTime()), this.setData({
            showWindow: !1,
            luckyShow: !1,
            shareShow: !1
        });
    },
    headpicclicktap: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.index, o = this.data.dataset.mainad[t];
        if (console.log(o), 2 == o.link_type) return wx.navigateTo({
            url: "../../webViwe/webViwe?page=" + o.url
        }), !1;
        "" != o.url && wx.navigateTo({
            url: o.url
        });
    },
    arraySplice: function(e) {
        var t = Object.assign([], e).splice(0, 6), o = e.splice(6, 6);
        return console.log("a1", t), console.log("a2", o), {
            arr1: t,
            arr2: o
        };
    },
    gotoPageView: function() {
        wx.navigateTo({
            url: "../../webViwe/webViwe?page=https://mp.weixin.qq.com/s/qEyr7jbWEpC8LbBSR-Is4Q"
        });
    },
    bindConfirmTab: function(e) {
        console.log(e);
        var t = e.detail.value;
        console.log(t), "" == t ? this.wetoast.toast({
            title: "请输入关键词",
            duration: 2e3
        }) : wx.navigateTo({
            url: "/pages/shop/searchList/searchList?keyword=" + t
        });
    },
    bindLotleryTap: function(e) {
        this.setData({
            luckyShow: !0
        });
    },
    bindShareTap: function(e) {
        var t = this;
        o.getuserinfo(e, function(e, o) {
            console.log("res", e), o && t.valiDateInfo();
        }, 1, t);
    },
    valiDateInfo: function() {
        var e = this;
        o.getHttpData(o.myCenter_index, null, "GET", function(t) {
            wx.stopPullDownRefresh(), e.setData({
                loginName: "登录"
            }), 0 == t.userid ? o.removekey() : (console.log("kk", t), wx.navigateTo({
                url: "/pages/index/share/share"
            }), e.loadData()), e.setData({
                loadlayer: !1
            });
        });
    },
    bindStoryTap: function(e) {
        var t = e.currentTarget.dataset.bid;
        wx.navigateTo({
            url: "/pages/shop/searchList/searchList?bid=" + t
        });
    },
    bindNewTap: function(e) {
        var t = e.currentTarget.dataset.bid;
        wx.navigateTo({
            url: "/pages/shop/searchList/searchList?bid=" + t
        });
    },
    bindContentTap: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/shop/content/content?main=true&id=" + t
        });
    },
    toActive: function(e) {
        var t = e.currentTarget.dataset.id;
        this.closeWindow(), wx.navigateTo({
            url: "/pages/active/active?prId=" + t
        });
    },
    bindClassTap: function(e) {
        var t = e.currentTarget.dataset.bid, o = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/shop/list/list?bid=" + t + "&name=" + o
        });
    },
    bindArticleTap: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/article/content/content?id=" + t
        });
    },
    bindArticleListTap: function(e) {
        e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/article/list/list"
        });
    },
    bindSortTap: function() {
        wx.navigateTo({
            url: "/pages/index/sortlist/sortlist"
        });
    },
    leftTimer: function(e) {
        e = e.replace(/-/g, "/");
        var t = new Date(e) - new Date(), o = parseInt(t / 1e3 / 60 / 60 / 24, 10), a = parseInt(t / 1e3 / 60 / 60 % 24, 10), i = parseInt(t / 1e3 / 60 % 60, 10), n = parseInt(t / 1e3 % 60, 10);
        o < 10 && (o = "0" + o), a < 10 && (a = "0" + a), i < 10 && (i = "0" + i), n < 10 && (n = "0" + n);
        var r = "";
        return o > 0 && (r = o + "天 "), r = r + a + ":" + i + ":" + n, this.setData({
            limitTime: r
        }), r;
    },
    bindWinnerTap: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/lottery/content/content?id=" + t
        });
    },
    gotoSearchPage: function() {
        if (e) return !1;
        e = !0, console.log("2", e), wx.navigateTo({
            url: "/pages/index/searchList/searchList"
        }), setTimeout(function() {
            console.log("1", e), e = !1;
        }, 300);
    },
    goto_two_page: function(e) {
        var t = e.currentTarget.dataset.index, o = void 0, a = this.data.active;
        switch (console.log(a), t) {
          case "1":
            console.log("值", a);
            var i = a.intId;
            if (console.log(i), void 0 == i || !i.prid) return console.log("值为空"), !1;
            o = "/pages/index/points/points?prid=" + i.prid + "&isPriceType=" + i.isPriceType;
            break;

          case "3":
            wx.navigateTo({
                url: "/pages/vip/giftBuy/giftBuy"
            });
            break;

          case "4":
            var n = a.goodShopId;
            if (!n.prid) return !1;
            o = "/pages/index/optimization/optimization?prid=" + n.prid + "&isPriceType=" + n.isPriceType;
            break;

          case "5":
            var r = a.cheapId;
            if (!r.prid) return !1;
            o = "/pages/index/specialOffer/specialOffer?prid=" + r.prid + "&isPriceType=" + r.isPriceType;
            break;

          default:
            return !1;
        }
        if (!o) return !1;
        wx.navigateTo({
            url: o
        });
    },
    timeTransform: function(e) {
        if (null !== t) return !1;
        console.log("定时器", t);
        var o = this;
        (null == o.data.timesNum || o.data.timesNum >= e || o.data.timesNum <= 0) && o.setData({
            timesNum: e
        }), e = o.data.timesNum ? o.data.timesNum / 1e3 : e / 1e3, t = setInterval(function() {
            var t = 0, a = 0, i = 0, n = 0;
            e > 0 && (t = Math.floor(e / 86400), a = Math.floor(e / 3600) - 24 * t, i = Math.floor(e / 60) - 24 * t * 60 - 60 * a, 
            n = Math.floor(e) - 24 * t * 60 * 60 - 60 * a * 60 - 60 * i), t > 0 && (a = 24 * t + a), 
            t <= 9 && (t = "0" + t), a <= 9 && (a = "0" + a), i <= 9 && (i = "0" + i), n <= 9 && (n = "0" + n);
            var r = {
                h: a,
                m: i,
                s: n
            };
            o.setData({
                timesNum: 1e3 * e
            }), o.setData({
                skllTime: r
            }), e--;
        }, 1e3), e <= 0 && (clearInterval(t), o.setData({
            skllTime: null,
            timesNum: null
        }), o.loadData());
    },
    onHide: function() {},
    gotoSecondkill: function() {
        wx.navigateTo({
            url: "/pages/index/secondkill/secondkill"
        });
    },
    onPullDownRefresh: function() {
        this.onLoad(null);
    },
    onReachBottom: function() {
        console.log("我触发了下拉触底"), this.getLike();
    },
    getLike: function() {
        var e = this;
        if (console.log(e.data.isLoading), !e.data.isLoading) {
            var t = e.data.Homedata, a = t.guessYouLike;
            e.setData({
                isLoading: !0
            });
            var i = {
                limit: 30,
                start: a.length + 1
            };
            o.getHttpData(o.you_link, i, "GET", function(o) {
                200 == o.code && (o.data.length > 0 ? (a = a.concat(o.data), t.guessYouLike = a, 
                e.setData({
                    Homedata: t,
                    isLoad: !1,
                    isLoading: !1
                })) : e.setData({
                    isLoad: !0,
                    isEnd: !0
                }));
            });
        }
    },
    loadMore: function() {
        return !1;
    },
    onShow: function() {
        console.log("onshow"), this.isShare();
    },
    isShare: function() {
        console.log("" == e || !e);
        var e = wx.getStorageSync("userid");
        e ? wx.showShareMenu() : wx.hideShareMenu();
    },
    onShareAppMessage: function() {
        return {
            title: "智融优购",
            path: "/pages/index/index/index?shareid=" + o.getuserid()
        };
    },
    userType: function() {
        var e = this;
        o.getHttpData(o.myCenter_index, null, "GET", function(t) {
            wx.stopPullDownRefresh(), console.log(t), e.setData({
                loginName: "登录"
            }), 0 == t.userid ? o.removekey() : e.setData({
                dataset: t,
                userType: t.usertype
            }), e.setData({
                loadlayer: !1
            });
        });
    },
    onLoad: function(e) {
        return console.log(e), e && e.scene, this.getToastDate(), console.log(o.getshareid()), 
        new o.WeToast(), this.setData({
            isLoad: !1,
            loadIsEnd: !1
        }), wx.setNavigationBarTitle({
            title: o.name
        }), this.setData({
            nextPage: 1
        }), this.loadData(), !1;
    },
    onPageScroll: function(e) {
        var t = this, o = this.data.isScroll;
        this.data.showSearchBg;
        o && (e.scrollTop >= 188 ? t.changeBg(!0) : t.changeBg(!1));
    },
    changeBg: function(e) {
        var t = !1, o = !1, a = this;
        setTimeout(function() {
            t = !0, a.setData({
                isScroll: t
            });
        }, 200), t = !0, o = e, a.setData({
            isScroll: t,
            showSearchBg: o
        });
    }
});