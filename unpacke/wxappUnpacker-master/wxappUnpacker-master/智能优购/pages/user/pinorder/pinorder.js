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
    bindScrollToupperTap: function() {
        console.log("下拉刷新");
    },
    bindScrollTolowerTap: function() {
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
        var n = e.currentTarget.dataset.oid, o = e.currentTarget.dataset.index, i = this;
        wx.showModal({
            title: "提示",
            content: "确认删除吗？",
            success: function(e) {
                if (e.confirm) {
                    var s = a.domain + "/pinorders/delete?oid=" + n;
                    a.getHttpData(s, null, "GET", function(a) {
                        console.log(a), "删除成功" == a.result ? (i.setData(t({}, "tabdata[" + i.data.currentTab + "].dataset[" + o + "].show", !1)), 
                        i.wetoast.toast({
                            title: "删除成功",
                            duration: 2e3
                        })) : i.wetoast.toast({
                            title: "删除失败",
                            duration: 2e3
                        });
                    });
                } else e.cancel;
            }
        });
    },
    bindDeliveryTap: function(e) {
        var n = e.currentTarget.dataset.oid, o = e.currentTarget.dataset.index, i = this;
        wx.showModal({
            title: "提示",
            content: "确认收到货了吗？",
            success: function(e) {
                if (e.confirm) {
                    var s = a.domain + "/pinorders/delivery?oid=" + n;
                    a.getHttpData(s, null, "GET", function(a) {
                        if (console.log(a), 1 == a.result) {
                            var e;
                            i.setData((e = {}, t(e, "tabdata[" + i.data.currentTab + "].dataset[" + o + "].poststate", 12), 
                            t(e, "tabdata[" + i.data.currentTab + "].dataset[" + o + "].statename", "已签收"), 
                            e)), i.wetoast.toast({
                                title: "操作成功",
                                duration: 2e3
                            });
                        } else i.wetoast.toast({
                            title: "操作失败",
                            duration: 2e3
                        });
                    });
                } else e.cancel;
            }
        });
    },
    loadData: function() {
        var e = this.data.tabdata[this.data.currentTab], n = this.data.currentTab;
        if (!e.isLoad && !e.loadIsEnd) {
            var o = "tabdata[" + n + "].nextPage", i = "tabdata[" + n + "].loadIsEnd", s = "tabdata[" + n + "].dataset", r = "tabdata[" + n + "].loadview", d = "tabdata[" + n + "].prompat", l = "tabdata[" + n + "].switchtaping";
            this.setData({
                isloadStr: !0
            });
            var c = this, u = e.nextPage, g = a.domain + "/pinorders/myorders?tab=" + n + "&page=" + u;
            console.log(g), a.getHttpData(g, null, "GET", function(a) {
                if (console.log(a), c.setData(t({}, l, 2)), 1 == e.nextPage && (e.dataset.length = 0), 
                !e.isLoad && !e.loadIsEnd && (c.setData({
                    isloadStr: !1
                }), null != a)) {
                    if (0 == a.length) c.setData(t({}, i, !0)), c.setData(t({}, d, !0)); else {
                        var u;
                        a.length < 10 && c.setData(t({}, i, !0));
                        var g = e.dataset.concat(a);
                        console.log(g), g.length > 0 && c.setData(t({}, r, !0)), c.setData((u = {}, t(u, s, g), 
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