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
        userType: "",
        isLogin: !0,
        tabdata: [ {
            dataset: [],
            title: "今日排行榜",
            isLoad: !1,
            loadIsEnd: !1,
            switchtaping: 0,
            nextPage: 1,
            loadview: !0,
            prompat: !1
        }, {
            dataset: [],
            isLoad: !1,
            title: "昨日排行榜",
            loadIsEnd: !1,
            switchtaping: 0,
            nextPage: 1,
            loadview: !1,
            prompat: !1
        }, {
            dataset: [],
            isLoad: !1,
            loadIsEnd: !1,
            title: "本周排行榜",
            switchtaping: 0,
            nextPage: 1,
            loadview: !1,
            prompat: !1
        }, {
            dataset: [],
            isLoad: !1,
            loadIsEnd: !1,
            title: "上周排行榜",
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
    bindChange: function(t) {
        console.log("滑动了");
        var e = t.detail.current, o = this;
        o.setData({
            currentTab: e
        }), o.setData({
            duration: 300
        }), o.setData({
            tabdata: [ {
                dataset: [],
                title: "今日排行榜",
                isLoad: !1,
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !0,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                title: "昨日排行榜",
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !1,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                title: "本周排行榜",
                switchtaping: 0,
                nextPage: 1,
                loadview: !1,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                title: "上周排行榜",
                switchtaping: 0,
                nextPage: 1,
                loadview: !1,
                prompat: !1
            } ]
        }), 1 == this.data.tabdata[t.detail.current].nextPage && (this.setData(a({}, "tabdata[" + t.detail.current + "].dataset", [])), 
        0 == this.data.tabdata[t.detail.current].switchtaping && this.setData(a({}, "tabdata[" + t.detail.current + "].switchtaping", 1)), 
        setTimeout(function() {
            o.loadData();
        }, 300), console.log("切换tab", this.data.tabdata));
    },
    swichNav: function(a) {
        console.log("我点了几次"), console.log(a), console.log(a.target.dataset.current), this.setData({
            duration: 0
        }), this.setData({
            currentTab: a.target.dataset.current
        });
    },
    bindScrollToupperTap: function() {
        console.log("下拉刷新");
    },
    bindScrollTolowerTap: function() {
        console.log("上拉触底");
    },
    loadData: function() {
        console.log("点击的某个数组", this.data.currentTab);
        var e = this.data.tabdata[this.data.currentTab], o = this.data.currentTab, s = "tabdata[" + o + "].loadIsEnd", n = "tabdata[" + o + "].dataset", i = "tabdata[" + o + "].loadview", d = "tabdata[" + o + "].prompat", l = "tabdata[" + o + "].switchtaping";
        this.setData({
            isloadStr: !0
        });
        var r = this, c = e.nextPage, g = t.rank_list_new + "?type=" + o;
        console.log(g), t.getHttpData(g, null, "GET", function(t) {
            var g = t.data;
            if (console.log("tabdata onLoad", g), r.setData(a({}, l, 2)), 1 == e.nextPage && (e.dataset.length = 0), 
            !e.isLoad && !e.loadIsEnd && (r.setData({
                isloadStr: !1
            }), null != g)) {
                if (0 == g.length) r.setData(a({}, s, !0)), 1 == c && r.setData(a({}, d, !0)); else {
                    g.length < 20 && r.setData(a({}, s, !0));
                    var h = e.dataset.concat(g);
                    console.log(h), h.length > 0 && r.setData(a({}, i, !0)), r.setData(a({}, n, h));
                }
                console.log(r.data.tabdata[o].loadIsEnd), console.log(o), console.log(r.data.tabdata[o].dataset), 
                console.log(r.data.tabdata), r.setData({
                    loadlayer: !1
                });
            }
        });
    },
    onLoad: function(a) {
        new t.WeToast();
    },
    onShow: function() {
        e.getPhone(6), console.log("order", t.tab), console.log("我点了几次", "show");
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
        console.log(this.data.tabdata), this.setData({
            tabdata: [ {
                dataset: [],
                title: "今日排行榜",
                isLoad: !1,
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !0,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                title: "昨日排行榜",
                loadIsEnd: !1,
                switchtaping: 0,
                nextPage: 1,
                loadview: !1,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                title: "本周排行榜",
                switchtaping: 0,
                nextPage: 1,
                loadview: !1,
                prompat: !1
            }, {
                dataset: [],
                isLoad: !1,
                loadIsEnd: !1,
                title: "上周排行榜",
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
                    dataset: e,
                    userType: e.usertype
                }), console.log("data.usertype", e.usertype);
                var o = t.screen.rpxheight;
                a.setData({
                    scheight: o,
                    currentTab: 0
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