function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = getApp();

Page({
    data: {
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
        } ],
        currentTab: 0,
        scheight: 0,
        loadlayer: !1
    },
    bindShareTap: function(t) {
        a.userinfo(function(t) {
            t ? wx.navigateTo({
                url: "/pages/index/share/share"
            }) : that.wetoast.toast({
                title: "授权失败",
                duration: 2e3
            });
        });
    },
    bindChange: function(a) {
        console.log(a);
        var e = this;
        e.setData({
            currentTab: a.detail.current
        }), this.setData({
            duration: 300
        }), 1 == this.data.tabdata[a.detail.current].nextPage && (this.setData(t({}, "tabdata[" + a.detail.current + "].dataset", [])), 
        0 == this.data.tabdata[a.detail.current].switchtaping && this.setData(t({}, "tabdata[" + a.detail.current + "].switchtaping", 1)), 
        setTimeout(function() {
            e.loadData();
        }, 300));
    },
    swichNav: function(a) {
        this.setData({
            duration: 0
        });
        var e = this;
        if (this.data.currentTab === a.target.dataset.current) return !1;
        e.setData({
            currentTab: a.target.dataset.current
        }), 1 == this.data.tabdata[a.target.dataset.current].nextPage && (0 == this.data.tabdata[a.target.dataset.current].switchtaping && this.setData(t({}, "tabdata[" + a.target.dataset.current + "].switchtaping", 1)), 
        setTimeout(function() {
            e.loadData();
        }, 300));
    },
    bindScrollUpTap: function() {
        var a = e.currentTarget.dataset.index;
        this.setData(t({}, "tabdata[" + a + "].dataset", [])), this.setData(t({}, "tabdata[" + a + "].isLoad", !1)), 
        this.setData(t({}, "tabdata[" + a + "].loadIsEnd", !1)), this.setData(t({}, "tabdata[" + a + "].nextPage", 1)), 
        this.setData(t({}, "tabdata[" + a + "].prompat", !1)), this.loadData(), console.log("ok");
    },
    bindScrollDownTap: function() {
        console.log("上拉触底"), this.loadData();
    },
    bindGoBuyTap: function(t) {
        var a = t.currentTarget.dataset.oid, e = t.currentTarget.dataset.id, n = t.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/pages/shop/order/order?t=" + n + "&oid=" + a + "&id=" + e
        });
    },
    bindPinOkTap: function(t) {
        var a = t.currentTarget.dataset.oid;
        wx.navigateTo({
            url: "/pages/user/pinok/pinok?oid=" + a
        });
    },
    bindDeleteOrderTap: function(e) {
        var n = e.currentTarget.dataset.oid, o = e.currentTarget.dataset.index, s = this;
        wx.showModal({
            title: "提示",
            content: "确认删除吗？",
            success: function(e) {
                if (e.confirm) {
                    var d = a.domain + "/lotteryorder/delete?oid=" + n;
                    a.getHttpData(d, null, "GET", function(a) {
                        console.log(a), "删除成功" == a.result ? (s.setData(t({}, "tabdata[" + s.data.currentTab + "].dataset[" + o + "].show", !1)), 
                        s.wetoast.toast({
                            title: "删除成功",
                            duration: 2e3
                        })) : s.wetoast.toast({
                            title: "删除失败",
                            duration: 2e3
                        });
                    });
                } else e.cancel;
            }
        });
    },
    bindDeliveryTap: function(e) {
        var n = e.currentTarget.dataset.oid, o = e.currentTarget.dataset.index, s = this;
        wx.showModal({
            title: "提示",
            content: "确认收到货了吗？",
            success: function(e) {
                if (e.confirm) {
                    var d = a.domain + "/lotteryorder/delivery?oid=" + n;
                    a.getHttpData(d, null, "GET", function(a) {
                        if (console.log(a), 1 == a.result) {
                            var e;
                            s.setData((e = {}, t(e, "tabdata[" + s.data.currentTab + "].dataset[" + o + "].poststate", 12), 
                            t(e, "tabdata[" + s.data.currentTab + "].dataset[" + o + "].statename", "已签收"), 
                            e)), s.wetoast.toast({
                                title: "操作成功",
                                duration: 2e3
                            });
                        } else s.wetoast.toast({
                            title: "操作失败",
                            duration: 2e3
                        });
                    });
                } else e.cancel;
            }
        });
    },
    bindScrollTolowerTap: function() {
        console.log("上拉触底"), this.loadData();
    },
    loadData: function() {
        var e = this.data.tabdata[this.data.currentTab], n = this.data.currentTab;
        if (console.log(e.isLoad), console.log(e.loadIsEnd), !e.isLoad && !e.loadIsEnd) {
            var o = "tabdata[" + n + "].nextPage", s = "tabdata[" + n + "].loadIsEnd", d = "tabdata[" + n + "].dataset", i = "tabdata[" + n + "].loadview", r = "tabdata[" + n + "].prompat", l = "tabdata[" + n + "].switchtaping";
            this.setData({
                isloadStr: !0
            });
            var c = this, u = e.nextPage, g = a.domain + "/lotteryorder/myorders?tab=" + n + "&page=" + u;
            console.log(g), a.getHttpData(g, null, "GET", function(a) {
                if (console.log(a), wx.stopPullDownRefresh(), c.setData(t({}, l, 2)), 1 == e.nextPage && (e.dataset.length = 0), 
                !e.isLoad && !e.loadIsEnd && (c.setData({
                    isloadStr: !1
                }), null != a)) {
                    if (0 == a.length) c.setData(t({}, s, !0)), c.setData(t({}, r, !0)); else {
                        var u;
                        a.length < 10 && c.setData(t({}, s, !0));
                        var g = e.dataset.concat(a);
                        console.log(g), g.length > 0 && c.setData(t({}, i, !0)), c.setData((u = {}, t(u, d, g), 
                        t(u, o, e.nextPage + 1), u));
                    }
                    console.log(c.data.tabdata[n].loadIsEnd), c.setData({
                        loadlayer: !1
                    });
                }
            });
        }
    },
    onLoad: function(t) {
        new a.WeToast();
        var e = t.tab || 0;
        console.log("order" + e);
        var n = a.screen.rpxheight;
        this.setData({
            scheight: n,
            currentTab: e
        }), this.loadData();
    },
    onShow: function() {}
});