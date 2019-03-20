function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t = getApp();

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
        } ],
        currentTab: 0
    },
    swichNav: function(t) {
        this.setData({
            duration: 0
        });
        var e = this;
        if (this.data.currentTab === t.target.dataset.current) return !1;
        e.setData({
            currentTab: t.target.dataset.current
        }), 1 == this.data.tabdata[t.target.dataset.current].nextPage && (0 == this.data.tabdata[t.target.dataset.current].switchtaping && this.setData(a({}, "tabdata[" + t.target.dataset.current + "].switchtaping", 1)), 
        setTimeout(function() {
            e.loadData();
        }, 300));
    },
    loadData: function() {
        var e = this.data.tabdata[this.data.currentTab], n = this.data.currentTab;
        if (!e.isLoad && !e.loadIsEnd) {
            var o = "tabdata[" + n + "].nextPage", s = "tabdata[" + n + "].loadIsEnd", d = "tabdata[" + n + "].dataset", i = "tabdata[" + n + "].loadview", r = "tabdata[" + n + "].prompat", l = "tabdata[" + n + "].switchtaping";
            this.setData({
                isloadStr: !0
            });
            var c = this, g = e.nextPage, u = 1 * n - 1, h = t.domain + "/rebate/GetRebates?state=" + u + "&page=" + g + "&size=15";
            console.log(h), t.getHttpData(h, null, "GET", function(t) {
                var g = t.list;
                if (console.log(g), c.setData(a({}, l, 2)), 1 == e.nextPage && (e.dataset.length = 0), 
                !e.isLoad && !e.loadIsEnd && (c.setData({
                    isloadStr: !1
                }), null != g)) {
                    if (0 == g.length) c.setData(a({}, s, !0)), c.setData(a({}, r, !0)); else {
                        var u;
                        g.length < 15 && c.setData(a({}, s, !0));
                        var h = e.dataset.concat(g);
                        console.log(h), h.length > 0 && c.setData(a({}, i, !0)), c.setData((u = {}, a(u, d, h), 
                        a(u, o, e.nextPage + 1), u));
                    }
                    console.log(c.data.tabdata[0].dataset), console.log(c.data.tabdata[n].loadIsEnd), 
                    c.setData({
                        loadlayer: !1
                    });
                }
            });
        }
    },
    bindScrollTolowerTap: function() {
        console.log("上拉触底"), this.loadData();
    },
    onLoad: function(a) {
        new t.WeToast(), this.loadData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});