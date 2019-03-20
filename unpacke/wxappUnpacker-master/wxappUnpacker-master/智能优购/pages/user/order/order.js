function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t = getApp(), e = require("../../../184D8FB32546F6CF7E2BE7B4F125B753.js").phoneService;

Page({
    data: {
        isLogin: !0,
        tabdata: [ {
            dataset: [],
            isLoad: !1,
            loadIsEnd: !1,
            switchtaping: 0,
            nextPage: 1,
            loadview: !0,
            prompat: !1
        }, {
            dataset: [],
            isLoad: !1,
            loadIsEnd: !1,
            switchtaping: 0,
            nextPage: 1,
            loadview: !1,
            prompat: !1
        }, {
            dataset: [],
            isLoad: !1,
            loadIsEnd: !1,
            switchtaping: 0,
            nextPage: 1,
            loadview: !1,
            prompat: !1
        }, {
            dataset: [],
            isLoad: !1,
            loadIsEnd: !1,
            switchtaping: 0,
            nextPage: 1,
            loadview: !1,
            prompat: !1
        }, {
            dataset: [],
            isLoad: !1,
            loadIsEnd: !1,
            switchtaping: 0,
            nextPage: 1,
            loadview: !1,
            prompat: !1
        }, {
            dataset: [],
            isLoad: !1,
            loadIsEnd: !1,
            switchtaping: 0,
            nextPage: 1,
            loadview: !1,
            prompat: !1
        } ],
        dataset: {
            userid: 0
        },
        currentTab: 0,
        scheight: 0,
        loadlayer: !0
    },
    bindChange: function(e) {
        console.log("滑动了");
        var o = e.detail.current, n = this;
        n.setData({
            currentTab: o
        }), n.setData({
            duration: 300
        }), t.tab = o, n.setData({
            tabdata: [ {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !0,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !1,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !1,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !1,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !1,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !1,
                prompat: !1
            } ]
        }), 1 == this.data.tabdata[e.detail.current].nextPage && (this.setData(a({}, "tabdata[" + e.detail.current + "].dataset", [])), 
        0 == this.data.tabdata[e.detail.current].switchtaping && this.setData(a({}, "tabdata[" + e.detail.current + "].switchtaping", 1)), 
        setTimeout(function() {
            n.loadData();
        }, 300), console.log("切换tab", this.data.tabdata));
    },
    goContent: function(a) {
        console.log(a.currentTarget.dataset.goid);
        var t = a.currentTarget.dataset.goid;
        wx.navigateTo({
            url: "/pages/shop/content/content?main=true&id=" + t
        });
    },
    bindShareTap: function(a) {
        var e = this;
        t.getuserinfo(a, function(a) {
            a ? wx.navigateTo({
                url: "/pages/index/share/share"
            }) : e.wetoast.toast({
                title: "授权失败",
                duration: 2e3
            });
        });
    },
    bindPinOkTap: function(a) {
        var t = a.currentTarget.dataset.oid;
        wx.navigateTo({
            url: "/pages/user/pinok/pinok?oid=" + t
        });
    },
    swichNav: function(a) {
        console.log("我点了几次"), this.setData({
            duration: 0
        });
        var e = this;
        console.log(a), t.tab = a.target.dataset.current, e.setData({
            currentTab: a.target.dataset.current
        });
    },
    bindScrollToupperTap: function() {
        console.log("下拉刷新");
    },
    bindScrollTolowerTap: function() {
        console.log("上拉触底"), this.loadData();
    },
    bindGoBuyTap: function(a) {
        var t = a.currentTarget.dataset.oid, e = a.currentTarget.dataset.id, o = a.currentTarget.dataset.t, n = a.currentTarget.dataset.brandtype, d = a.currentTarget.dataset.addrid;
        wx.setStorageSync("defaultOder", d), wx.navigateTo({
            url: "/pages/shop/order/order?oid=" + t + "&id=" + e + "&t=" + o + "&brandtype=" + n + "&isOrderTap=1"
        });
    },
    bindInOrderTap: function(a) {
        var t = a.currentTarget.dataset.oid, e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/user/detail/detail?oid=" + t + "&id=" + e
        });
    },
    bindDeleteOrderTap: function(e) {
        var o = e.currentTarget.dataset.oid, n = e.currentTarget.dataset.index, d = this;
        wx.showModal({
            title: "提示",
            content: "确认删除吗？",
            success: function(e) {
                e.confirm ? t.getHttpData(t.myCenter_DeleteOrder + "?oid=" + o, null, "GET", function(e) {
                    if (console.log("tabdata", e), "200" == e.code) {
                        d.setData(a({}, "tabdata[" + d.data.currentTab + "].dataset[" + n + "].show", !1)), 
                        d.wetoast.toast({
                            title: "删除成功",
                            duration: 2e3
                        }), console.log(d.data.currentTab), t.tab = d.data.currentTab;
                        var o = {
                            detail: {
                                current: ""
                            }
                        };
                        o.detail.current = d.data.currentTab, d.bindChange(o);
                    } else d.wetoast.toast({
                        title: "删除失败",
                        duration: 2e3
                    });
                }) : e.cancel;
            }
        });
    },
    bindDeliveryTap: function(e) {
        var o = e.currentTarget.dataset.oid, n = e.currentTarget.dataset.index, d = this;
        wx.showModal({
            title: "提示",
            content: "确认收到货了吗？",
            success: function(e) {
                if (e.confirm) {
                    var s = t.domain + "/orders/delivery?oid=" + o;
                    t.getHttpData(s, null, "GET", function(t) {
                        if (console.log(t), 1 == t.result) {
                            var e;
                            d.setData((e = {}, a(e, "tabdata[" + d.data.currentTab + "].dataset[" + n + "].state", 6), 
                            a(e, "tabdata[" + d.data.currentTab + "].dataset[" + n + "].statename", "已签收"), 
                            e)), d.wetoast.toast({
                                title: "操作成功",
                                duration: 2e3
                            });
                        } else d.wetoast.toast({
                            title: "操作失败",
                            duration: 2e3
                        });
                    });
                } else e.cancel;
            }
        });
    },
    loadData: function() {
        console.log("我执行了几次"), console.log("点击的某个数组", this.data.currentTab);
        var e = this.data.tabdata[this.data.currentTab], o = this.data.currentTab;
        if (!e.isLoad && !e.loadIsEnd) {
            var n = "tabdata[" + o + "].nextPage", d = "tabdata[" + o + "].loadIsEnd", s = "tabdata[" + o + "].dataset", i = "tabdata[" + o + "].loadview", r = "tabdata[" + o + "].prompat", l = "tabdata[" + o + "].switchtaping";
            this.setData({
                isloadStr: !0
            });
            var c = this, g = e.nextPage, u = t.domain + "/orders/MyAppOrders?tab=" + o + "&page=" + g;
            console.log(u), t.getHttpData(u, null, "GET", function(t) {
                var u = t.data;
                if (console.log("tabdata onLoad", u), c.setData(a({}, l, 2)), 1 == e.nextPage && (e.dataset.length = 0), 
                !e.isLoad && !e.loadIsEnd && (c.setData({
                    isloadStr: !1
                }), null != u)) {
                    if (0 == u.length) c.setData(a({}, d, !0)), 1 == g && c.setData(a({}, r, !0)); else {
                        var p;
                        u.length < 10 && c.setData(a({}, d, !0));
                        var h = e.dataset.concat(u);
                        console.log(h), h.length > 0 && c.setData(a({}, i, !0)), c.setData((p = {}, a(p, s, h), 
                        a(p, n, e.nextPage + 1), p));
                    }
                    console.log(c.data.tabdata[o].loadIsEnd), c.setData({
                        loadlayer: !1
                    }), console.log(c.data.tabdata[0].dataset), console.log(c.data.tabdata[0].dataset);
                }
            });
        }
    },
    onLoad: function(a) {
        new t.WeToast();
    },
    onShow: function() {
        e.getPhone(3), console.log("order", t.tab), console.log("我点了几次", "show");
        var a = t.globalData.isLogin;
        this.setData({
            isLogin: a
        }), console.log("是否登录", a);
        var o = getCurrentPages();
        o[o.length - 1].route;
        this.setData({
            currentTab: t.tab
        }), this.loadDatas();
    },
    onHide: function() {
        t.tab = 0, this.setData({
            tabdata: [ {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !0,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !1,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !1,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !1,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !1,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !1,
                prompat: !1
            } ],
            dataset: {
                userid: 0
            },
            currentTab: 0,
            scheight: 0,
            loadlayer: !0
        });
    },
    myCatchTouch: function() {},
    loadDatas: function() {
        var a = this;
        t.getHttpData(t.myCenter_index, null, "GET", function(e) {
            if (wx.stopPullDownRefresh(), wx.hideLoading(), console.log(e), 401 == e.code) return a.setData({
                isLogin: !0,
                loadlayer: !1
            }), wx.clearStorageSync(), !1;
            if (0 == e.userid) t.removekey(), a.setData({
                loadlayer: !1,
                dataset: {
                    userid: 0
                }
            }); else {
                a.setData({
                    loginName: "登录",
                    dataset: e
                });
                var o = t.tab || 0, n = t.screen.rpxheight;
                a.setData({
                    scheight: n,
                    currentTab: o
                }), a.loadData();
            }
        });
    },
    bindLoginTap: function(a) {
        var e = this;
        a.detail.userInfo && (wx.showLoading({
            title: "登录中",
            mask: !0
        }), e.data.witchpage, t.getuserinfo(a, function(a) {
            a && e.loadDatas();
        }, 3, e));
    }
});