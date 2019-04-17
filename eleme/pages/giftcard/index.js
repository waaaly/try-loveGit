var t = getApp(), n = t.services, e = n.Ubt, a = (n.imageHash, n.User, n.HashToUrl), i = require("./utils/api"), r = t.extend([ {
    data: {
        indicatorDots: !0,
        indicatorColor: "rgba(0, 0, 0, 0.4)",
        indicatorActiveColor: "#fff"
    },
    onShow: function() {
        e.sendPv();
    },
    onLoad: function() {
        this.getBanners(), this.getMenus();
    },
    getBanners: function() {
        var t = this;
        i.getBanners().then(function(n) {
            var e = n.data;
            e.forEach(function(t) {
                t.imageUrl = a(t.picture, 750, 360);
            }), t.setData({
                banners: e
            });
        });
    },
    getMenus: function() {
        var t = this;
        i.getMenus().then(function(n) {
            var e = n.data;
            e.forEach(function(t) {
                t.themes.forEach(function(t) {
                    t.imageUrl = a(t.picture, 324, 200);
                });
            }), t.setData({
                menus: e
            });
        });
    },
    goToCards: function() {
        e.sendEvent({
            id: 102308
        });
    },
    goToTheme: function(t) {
        var n = t.currentTarget.dataset.id;
        e.sendEvent({
            id: 102307,
            params: {
                id: n
            }
        });
    }
} ]);

Page(r);