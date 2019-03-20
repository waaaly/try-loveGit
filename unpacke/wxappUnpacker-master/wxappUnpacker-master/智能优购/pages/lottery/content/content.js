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
        id: 0,
        dataset: [],
        frommain: !1,
        maskShow: !1,
        layclass: "",
        loadlayer: !0
    },
    bindBuyTap3: function(t) {
        console.log(t);
        var e = this;
        a.getuserinfo(t, function(a) {
            a && (console.log(a), e.goBuy(t));
        });
    },
    bindPinTuanTap3: function(t) {
        var e = this;
        console.log(t), a.getuserinfo(t, function(a) {
            a && (console.log(a), e.bindPinTuanTap(t));
        });
    },
    bindPinTuanTap: function(t) {
        var a = this, e = t.currentTarget.dataset.oid;
        if (console.log(e), a.data.dataset.content.isbuy) a.wetoast.toast({
            title: "请勿重复购买",
            duration: 2e3
        }); else {
            var n = "/pages/shop/order/order?id=" + a.data.dataset.content.id + "&t=2&poid=" + e;
            wx.navigateTo({
                url: n
            });
        }
    },
    goBuy: function(t) {
        var a = t.currentTarget.dataset.type, e = "/pages/shop/order/order?id=" + this.data.dataset.content.id + "&t=" + a + "&geshu=1";
        if (0 == a) wx.navigateTo({
            url: e
        }); else {
            if (this.data.dataset.content.isbuy) return void this.wetoast.toast({
                title: "请勿重复购买",
                duration: 2e3
            });
            this.data.dataset.content.isgroup ? wx.navigateTo({
                url: e
            }) : this.wetoast.toast({
                title: "不支持拼团",
                duration: 2e3
            });
        }
    },
    bindGoHomeTap: function() {
        this.data.frommain ? wx.navigateBack({}) : wx.switchTab({
            url: "/pages/index/index/index"
        });
    },
    bindShopTap: function(t) {
        var a = this.data.dataset.content.shopid;
        wx.navigateTo({
            url: "/pages/shop/seller/seller?id=" + a
        });
    },
    bindGoBrandTap: function(t) {
        var a = t.currentTarget.dataset.id;
        console.log(a), wx.redirectTo({
            url: "/pages/shop/content/content?id=" + a
        });
    },
    bindHideBuyTap: function() {
        this.setData({
            layclass: "layerout",
            maskShow: !1
        });
    },
    onLoad: function(t) {
        t && t.shareid, console.log(a.getshareid()), new a.WeToast();
        var e = t.id || t.scene, n = t.main || !1;
        this.setData({
            frommain: n,
            id: e
        });
        var i = this;
        a.login(function(t) {
            i.loadData();
        });
    },
    loadData: function() {
        var e = this.data.id, n = this;
        console.log("/lottery/content/?id=" + e), a.getHttpData(a.domain + "/lottery/content/?id=" + e, null, "GET", function(a) {
            wx.stopPullDownRefresh(), console.log(a), wx.setNavigationBarTitle({
                title: a.content.title
            }), n.setData({
                dataset: a
            }), a.pinlist.length > 0 && setInterval(function() {
                for (var e = 0; e < a.pinlist.length; e++) {
                    var i = n.leftTimer(a.pinlist[e].endtime);
                    i = i + "." + ("" + new Date().getMilliseconds()).charAt(0), n.setData(t({}, "dataset.pinlist[" + e + "].timestr", i));
                }
            }, 100), n.setData({
                loadlayer: !1
            });
        });
    },
    leftTimer: function(t) {
        t = t.replace(/-/g, "/");
        var a = new Date(t) - new Date(), e = parseInt(a / 1e3 / 60 / 60 / 24, 10), n = parseInt(a / 1e3 / 60 / 60 % 24, 10), i = parseInt(a / 1e3 / 60 % 60, 10), o = parseInt(a / 1e3 % 60, 10);
        return e < 10 && (e = "0" + e), n < 10 && (n = "0" + n), i < 10 && (i = "0" + i), 
        o < 10 && (o = "0" + o), n + ":" + i + ":" + o;
    },
    onPullDownRefresh: function() {
        this.loadData();
    }
});