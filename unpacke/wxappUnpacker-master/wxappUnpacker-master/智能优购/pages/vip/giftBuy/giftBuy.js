var o = Object.assign || function(o) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (o[e] = a[e]);
    }
    return o;
}, t = (require("../../../614EDDE22546F6CF0728B5E55C25B753.js"), getApp()), a = require("../../../184D8FB32546F6CF7E2BE7B4F125B753.js").phoneService;

Page({
    data: {
        isLogin: !0,
        promotionGoods: "",
        loadlayer: !0,
        page: {
            pageSize: 5,
            pageNum: 1
        },
        bottomNo: !1
    },
    loadData: function() {
        var a = this, e = a.data.page, i = o({}, e);
        t.getHttpData(t.earn_not_seckill, i, "GET", function(o) {
            if (wx.stopPullDownRefresh(), wx.hideLoading(), 200 == o.code) {
                var t = o.data.promotionGoods;
                if (t.length > 0) for (var e = 0; e < t.length; e++) console.log(t[e].price), t[e].price1 = (t[e].price.toFixed(2) + "").split(".")[0], 
                t[e].price2 = (t[e].price.toFixed(2) + "").split(".")[1];
                a.setData({
                    loadlayer: !1,
                    promotionGoods: t
                });
            } else 404 == o.code && a.setData({
                loadlayer: !1
            });
        });
    },
    onLoad: function(o) {
        this.loadData();
    },
    onShow: function() {
        a.getPhone(5), this.setData({
            isLogin: t.globalData.isLogin
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading();
        var o = {
            pageSize: 5,
            pageNum: 1
        };
        this.setData({
            page: o,
            bottomNo: !1
        }), this.loadData();
    },
    onReachBottom: function() {
        var a = this;
        if (a.data.bottomNo) return !1;
        var e = a.data.page;
        a.data.promotionGoods;
        console.log(a.data.promotionGoods), e.pageNum++;
        var i = o({}, e);
        console.log(i), t.getHttpData(t.earn_not_seckill, i, "GET", function(o) {
            var t = o.data;
            if (t && t.promotionGoods.length) {
                console.log(111);
                var i = t.promotionGoods;
                if (i.length > 0) for (var n = 0; n < i.length; n++) console.log(i[n].price), i[n].price1 = (i[n].price.toFixed(2) + "").split(".")[0], 
                i[n].price2 = (i[n].price.toFixed(2) + "").split(".")[1];
                i = a.data.promotionGoods.concat(i), wx.hideLoading(), a.setData({
                    promotionGoods: i,
                    page: e
                });
            } else a.setData({
                bottomNo: !0
            });
        });
    },
    goBuy: function(o) {
        var t = o.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/shop/content/content?main=true&id=" + t + "&gift=1"
        });
    },
    onHide: function() {},
    bindLoginTap: function(o) {
        console.log("用户信息", o);
        var a = this;
        o.detail.userInfo && (wx.showLoading({
            title: "登录中",
            mask: !0
        }), t.getuserinfo(o, function(t) {
            t && (console.log(o), a.loadData());
        }, 5, a));
    }
});