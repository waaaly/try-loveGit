function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

require("../../../435C81E52546F6CF253AE9E24415B753.js");

var a = getApp();

Page({
    data: {
        dataset: [],
        cheight: 0,
        toview: "",
        isVerfity: !0,
        loadlayer: !0
    },
    bindSwitchClassTap: function(a) {
        for (var e = a.currentTarget.dataset.index, o = 0; o < this.data.dataset.length; o++) if (o == e) {
            this.setData(t({}, "dataset[" + o + "].class", "itemon"));
            var s = "view" + e;
            this.setData({
                toview: s
            });
        } else this.setData(t({}, "dataset[" + o + "].class", ""));
    },
    bindConfirmTab: function(t) {
        var a = t.detail.value.keyword;
        console.log(a), "" == a ? this.wetoast.toast({
            title: "请输入关键词",
            duration: 2e3
        }) : wx.navigateTo({
            url: "/pages/shop/list/list?keyword=" + a
        });
    },
    bindClassTap: function(t) {
        var a = t.currentTarget.dataset.bid;
        wx.navigateTo({
            url: "/pages/shop/list/list?bid=" + a
        });
    },
    bindSmallClassTap: function(t) {
        var a = t.currentTarget.dataset.sid;
        wx.navigateTo({
            url: "/pages/shop/list/list?sid=" + a
        });
    },
    onPullDownRefresh: function() {
        this.onLoad();
    },
    onReachBottom: function() {
        this.loadData();
    },
    loadData: function() {
        console.log("loadData");
        var t = this;
        a.getHttpData(a.domain + "/shop/cates", null, "GET", function(a) {
            wx.stopPullDownRefresh(), console.log("数据"), console.log(a), a.length > 0 && (a[0].class = "itemon"), 
            t.setData({
                dataset: a
            }), t.setData({
                loadlayer: !1
            });
        });
    },
    onLoad: function() {
        this.setData({
            dataset: []
        }), console.log("onload");
        var t = a.screen.rpxheight - 100;
        this.setData({
            cheight: t
        }), new a.WeToast(), this.loadData();
    },
    onShow: function() {
        console.log("onshow");
    },
    onReady: function() {
        console.log("onReady");
    }
});