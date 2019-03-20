function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

require("../../../435C81E52546F6CF253AE9E24415B753.js");

var a = !1, e = getApp();

Page({
    data: {
        dataset: [],
        cheight: 0,
        toview: "",
        searchTxt: "",
        isVerfity: !0,
        loadlayer: !0
    },
    inputTxt: function(t) {
        var a = t.detail.value;
        this.setData({
            searchTxt: a
        });
    },
    bindSwitchClassTap: function(a) {
        for (var e = a.currentTarget.dataset.index, s = 0; s < this.data.dataset.length; s++) if (s == e) {
            this.setData(t({}, "dataset[" + s + "].class", "itemon"));
            var i = "view" + e;
            this.setData({
                toview: i
            });
        } else this.setData(t({}, "dataset[" + s + "].class", ""));
    },
    bindClassTap: function(t) {
        var a = t.currentTarget.dataset.bid;
        wx.navigateTo({
            url: "/pages/shop/searchList/searchList?bid=" + a
        });
    },
    gotoSearchPage: function() {
        if (a) return !1;
        a = !0, console.log("2", a), wx.navigateTo({
            url: "/pages/index/searchList/searchList"
        }), setTimeout(function() {
            a = !1;
        }, 300);
    },
    bindSmallClassTap: function(t) {
        var a = t.currentTarget.dataset.sid, e = t.currentTarget.dataset.bid;
        wx.navigateTo({
            url: "/pages/shop/searchList/searchList?sid=" + a + "&bid=" + e
        }), console.log(a);
    },
    onPullDownRefresh: function() {
        this.onLoad();
    },
    onReachBottom: function() {
        this.loadData();
    },
    loadData: function() {
        var t = this;
        e.getHttpData(e.class_shop, null, "GET", function(a) {
            wx.stopPullDownRefresh();
            var e = a.data;
            e.length > 0 && (e[0].class = "itemon"), t.setData({
                dataset: e
            }), t.setData({
                loadlayer: !1
            });
        });
    },
    onLoad: function() {
        this.setData({
            dataset: []
        }), this.loadData();
        var t = e.screen.rpxheight - 100;
        this.setData({
            cheight: t
        }), new e.WeToast();
    }
});