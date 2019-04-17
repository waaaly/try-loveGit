var a = require("../../../libs/aliLog"), t = getApp(), e = t.services, o = e.Ubt, n = e.imageHash, s = e.User, r = e.Cart, i = e.AliLog, d = r.hongbao, c = "";

Page({
    data: {
        imageHash: n,
        loaded: !1,
        extra: "",
        page: "hongbao"
    },
    onLoad: function(t) {
        var e = t.source, o = t.page;
        e && this.setData({
            extra: "source=" + e
        }), o && this.setData({
            page: o
        }), c = (0, a.createUrlParams)();
    },
    mergeData: function() {
        var a = this;
        this.loadHongbaos().then(function() {
            a.data.loaded = !0, a.setData(a.data);
        }).catch(console.error), this.loadCoupons().then(function() {
            a.setData(a.data);
        }).catch(console.error);
    },
    onShow: function() {
        s.id ? this.mergeData() : wx.redirectTo({
            url: "/pages/auth/index"
        }), o.sendPv(this.data.extra), i.sendPv();
    },
    changeTab: function(a) {
        var t = a.currentTarget.dataset.page;
        this.setData({
            page: t
        });
    },
    loadHongbaos: function() {
        var a = this;
        return d.load({
            SID: s.SID,
            userId: s.id
        }).then(function(e) {
            a.data = t.extend([ e, a.data ]);
        }, function(t) {
            console.log(t), a.setData({
                loaded: !1
            });
        });
    },
    loadCoupons: function() {
        var a = this;
        return d.loadCoupon({
            SID: s.SID,
            userId: s.id
        }).then(function(e) {
            a.data = t.extend([ e, a.data ]);
        }).catch(function(a) {
            console.log(a);
        });
    },
    goToShop: function(a) {
        var t = a.currentTarget.dataset.coupon, e = t.sn, o = t.restaurant_id, n = wx.getStorageSync("PLACE"), s = n.latitude, r = n.longitude;
        (o ? Promise.resolve(o) : d.getNearestShop(e, s, r)).then(function(a) {
            a && "-1" !== a ? wx.navigateTo({
                url: "/pages/shop/shop/index?id=" + a + "&" + c
            }) : wx.switchTab({
                url: "/pages/index/index"
            });
        }).catch(function() {
            wx.switchTab({
                url: "/pages/index/index"
            });
        });
    }
});