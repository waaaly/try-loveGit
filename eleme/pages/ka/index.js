var e = getApp(), t = e.services, n = t.Ubt, a = t.Location, o = t.imageHash, r = require("./api"), i = require("../../common/utils/util.js").appendTail, s = {
    onShow: function(e) {
        n.sendPv();
    },
    data: {
        imageHash: o,
        restaurants: [],
        loaded: !1,
        open: !1,
        noData: !1
    },
    location: function() {
        return new Promise(function(e, t) {
            var n = wx.getStorageSync("PLACE");
            if (!n) return a().then(e).catch(t);
            e(n);
        });
    },
    getKaShops: function(e) {
        var t = this, n = e.brandId || e.id;
        this.location().then(function(e) {
            var t = e.latitude, a = e.longitude;
            return r.kashops(n, t, a);
        }).then(function(e) {
            var a = e.data;
            if (a.nearest) wx.setStorageSync("qrcode", "ka"), wx.redirectTo({
                url: "/pages/shop/shop/index?id=" + a.nearest.id + "&source=ka&brandId=" + n
            }); else if (a.outside.count) {
                var o = t.handleRow(a.outside.restaurants), r = i(a.outside.restaurants, o, "id");
                t.setData({
                    restaurants: r,
                    loaded: !0
                });
            } else t.setData({
                noData: !0,
                loaded: !0
            });
        }).catch(function(e) {
            throw e;
        });
    },
    onLoad: function(e) {
        this.getKaShops(e);
    },
    openMore: function() {
        this.setData({
            open: !0
        });
    },
    returnHome: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    }
};

Page(e.extend([ s, require("../../common/components/restaurant-row/component.js") ]));