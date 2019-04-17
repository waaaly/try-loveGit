function t(t, a, o) {
    return a in t ? Object.defineProperty(t, a, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = o, t;
}

var a = getApp(), o = a.services, e = o.Ubt, n = o.API, s = o.imageHash, i = o.Location, u = require("../../common/utils/util.js").random, d = require("./services/tips.js"), r = void 0, c = {
    limit: 20
}, l = {
    data: {
        menus: [],
        scenes: [],
        activatedTab: 0,
        populationNum: 0,
        maxPopulationNum: 0,
        imageHash: s,
        error: {
            show: !1,
            content: ""
        }
    },
    onLoad: function(t) {
        var a = this, o = t.food_id, e = o ? o.split(",") : [], n = wx.getStorageSync("PLACE");
        n ? this.initPageData(Object.assign(c, {
            top_food_ids: e,
            latitude: n.latitude,
            longitude: n.longitude
        })) : i().then(function(t) {
            a.initPageData(Object.assign(c, {
                top_food_ids: e,
                latitude: t.latitude,
                longitude: t.longitude
            }));
        }).catch(function() {
            a.showError("noAddress");
        });
    },
    onShow: function() {
        e.sendPv();
    },
    initPageData: function(t) {
        var a = this;
        n.queryInitSalesMenus(t).then(function(t) {
            if (t.data.length) {
                var o = void 0, e = void 0, n = void 0;
                if (t.data.forEach(function(t, a) {
                    t.foods && t.foods.length && (o = a, n = !0, e = t.population, c.rankid = t.rank_id);
                }), n) {
                    a.filterScenes(t.data);
                    a.setData({
                        menus: t.data.map(function(t, o) {
                            return t.foods = a.handleRow(t.foods), t.load = a.getLoadStatus(t.foods.length, !0), 
                            t;
                        }),
                        activatedTab: o,
                        populationNum: e,
                        maxPopulationNum: e + u(75, 350),
                        scenes: a.filterScenes(t.data)
                    }, function() {
                        a.data.menus.forEach(function(t, o) {
                            o !== a.data.activatedTab && a.loadMore(o, t.type);
                        }), a.setPopulationNum();
                    });
                } else a.showError("noRst");
            } else a.showError("noRst");
        }).catch(function() {});
    },
    loadMore: function(a, o) {
        var e = this;
        if ("OVER" !== this.data.menus[a].load.status && "LOADING" !== this.data.menus[a].load.status) {
            this.data.menus[a].load.status = "LOADING";
            var s = this.data.menus[a].foods.length;
            n.queryMoreSalesMenus(Object.assign({
                type: o,
                offset: s
            }, c)).then(function(o) {
                e.setData(t({}, "menus[" + a + "]", Object.assign(o.data, {
                    foods: e.data.menus[a].foods.concat(e.handleRow(o.data.foods)),
                    load: e.getLoadStatus(o.data.foods.length)
                })));
            }).catch(function() {
                e.setData(t({}, "menus[" + a + "]", Object.assign(res.data, {
                    load: e.getLoadStatus(0)
                })));
            });
        }
    },
    getLoadStatus: function(t, a) {
        var o = {};
        return t >= c.limit || a ? (o.text = "菜单更新中...", o.status = "LOADED") : (o.text = "菜单已经是最新", 
        o.status = "OVER"), o;
    },
    showError: function(t) {
        var a = d[t], o = a.title, e = a.content;
        wx.showModal({
            title: o,
            content: e
        }), this.setData({
            error: {
                show: !0,
                content: e
            }
        });
    },
    scrollMore: function(t) {
        var a = t.currentTarget;
        this.loadMore(a.dataset.index, a.dataset.type);
    },
    setPopulationNum: function() {
        var t = this;
        clearTimeout(r);
        r = setTimeout(function() {
            var a = t.data.populationNum + u(-10, 15);
            a < t.data.maxPopulationNum && a > 0 ? (t.setData({
                populationNum: a
            }), t.setPopulationNum()) : clearTimeout(r);
        }, 100 * u(15, 100));
    },
    onUnload: function() {
        clearTimeout(r);
    }
};

Page(a.extend([ {}, l, require("components/food/food.js"), require("components/scenes-bar/scenes-bar.js") ]));