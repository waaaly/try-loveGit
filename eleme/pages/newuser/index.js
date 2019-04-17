var t = function() {
    function t(t, e) {
        var a = [], n = !0, i = !1, s = void 0;
        try {
            for (var r, o = t[Symbol.iterator](); !(n = (r = o.next()).done) && (a.push(r.value), 
            !e || a.length !== e); n = !0) ;
        } catch (t) {
            i = !0, s = t;
        } finally {
            try {
                !n && o.return && o.return();
            } finally {
                if (i) throw s;
            }
        }
        return a;
    }
    return function(e, a) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = require("./config/constants.js"), a = require("../../libs/aliLog"), n = getApp(), i = n.services, s = i.Geohash, r = i.User, o = i.API, c = i.imageHash, u = i.Location, h = i.AliLog, d = i.Ubt, g = "", l = {
    data: {
        status: 0,
        userId: r.id,
        showTickets: !1,
        geohash: "",
        restaurants: [],
        config: e.CONFIG_MAP,
        imageHash: c,
        limit: 15,
        loadedAll: !1,
        packets: [],
        locateFailed: !1
    },
    onLoad: function(t) {
        var e = t.geohash;
        if (g = (0, a.createUrlParams)(), !e) return this.getLoaction();
        this.setData({
            geohash: e
        });
    },
    onShow: function() {
        var t = wx.getStorageSync("PLACE");
        wx.getStorageSync("FROM_LOCATION_BACK") && t && (wx.setStorageSync("FROM_LOCATION_BACK", !1), 
        this.setData({
            locateFailed: !1,
            geohash: t.geohash
        })), r.id && this.getUserGift(), this.data.geohash && this.getRestaurants(), d.sendPv(), 
        h.sendPv();
    },
    getLoaction: function() {
        var t = this;
        return u().then(function(e) {
            t.setData({
                geohash: e.geohash
            }), t.getRestaurants(), r.id && t.getUserGift();
        }).catch(function(e) {
            t.setData({
                locateFailed: !0
            });
        });
    },
    onReachBottom: function() {
        this.getRestaurants();
    },
    makeModified: function(t) {
        return t ? {
            human_time: t.expire_date,
            use_condition: t.delivery_text,
            isDelivery: t.delivery_text && "蜂鸟专送" === t.delivery_text
        } : {};
    },
    getUserGift: function() {
        var t = this;
        o.getNewUserGift(this.data.geohash).then(function(e) {
            var a = e.data || {}, n = a.status, i = a.delivery_card_expr, s = a.hongbaos;
            i && Object.assign(i || {}, t.makeModified(i));
            t.setData({
                packets: (s || []).concat()
            }), t.setStatus(n);
        }).catch(function() {});
    },
    getRestaurants: function() {
        var e = this, a = this.data, n = a.restaurants, i = a.limit, r = a.loadedAll, c = a.geohash;
        if (!r && c) {
            var u = s.decode(c), h = t(u, 2), d = h[0], g = h[1];
            return o.getNewUserRestaurants({
                latitude: d,
                longitude: g,
                limit: i,
                offset: n.length
            }).then(function(t) {
                var a = t.data, s = e.handleRow(a.restaurants);
                s.forEach(function(t) {
                    t.activities = t.activities.filter(function(e) {
                        return 103 === e.type && (t.new_discount || (t.new_discount = (e.description.match(/\d+/) || [])[0]), 
                        e.description = e.description.replace("(不与其他活动同享)", ""), t.supports = [], !0);
                    });
                }), e.setData({
                    restaurants: n.concat(s),
                    loadedAll: s.length < i || n.length >= 290
                });
            }).catch(function() {});
        }
    },
    handleTab: function() {
        if (0 === this.data.status) return wx.navigateTo({
            url: "/pages/auth/index?scene=login&type=sms&" + g
        });
        try {
            wx.setStorageSync("NEWUSER_SHOW_TICKET", "RECEIVE"), this.setStatus(this.data.status);
        } catch (t) {}
    },
    setStatus: function(t) {
        var e = void 0;
        2 !== t && (e = wx.getStorageSync("NEWUSER_SHOW_TICKET") ? 3 : 1), this.setData({
            status: e || t
        });
    },
    goLocation: function() {
        wx.navigateTo({
            url: "/pages/location/location?" + g
        });
    },
    goToShop: function(t) {
        var e = t.currentTarget.dataset.restaurant_id;
        wx.navigateTo({
            url: "/pages/shop/shop/index?id=" + e + "&" + g
        });
    }
};

Page(n.extend([ l, require("../../common/components/restaurant-row/component.js") ]));