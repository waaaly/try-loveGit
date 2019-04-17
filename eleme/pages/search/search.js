var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r]);
    }
    return t;
}, e = function() {
    function t(t, e) {
        var a = [], r = !0, o = !1, i = void 0;
        try {
            for (var n, s = t[Symbol.iterator](); !(r = (n = s.next()).done) && (a.push(n.value), 
            !e || a.length !== e); r = !0) ;
        } catch (t) {
            o = !0, i = t;
        } finally {
            try {
                !r && s.return && s.return();
            } finally {
                if (o) throw i;
            }
        }
        return a;
    }
    return function(e, a) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), a = require("../../libs/aliLog"), r = getApp(), o = r.services, i = o.Ubt, n = o.imageHash, s = o.HashToUrl, d = o.AliLog, u = require("./lib/api"), h = require("../../libs/promise.js"), c = require("../../common/utils/util.js").appendTail, l = "", f = {
    offset: 0,
    limit: 10
}, g = void 0, y = function(t) {
    var e = t.background, a = t.icon_color;
    return e ? "color: #fff; background-image: linear-gradient(-135deg, #" + e.rgb_from + " 0%, #" + e.rgb_to + " 100%);" : "color: #" + a + "; border: 1rpx solid #" + a + ";";
}, p = r.extend([ {
    data: {
        imageHash: n,
        init: !0,
        loading: !0,
        btnPushed: !1,
        searchHistory: [],
        hotWords: [],
        hotword: "",
        query: {
            latitude: 0,
            longitude: 0,
            keyword: "",
            order_by: 0
        },
        typeAhead: {
            words: [],
            restaurants: []
        },
        options: {},
        restaurants: [],
        animation: {},
        loadedAll: !1,
        recommendList: [],
        pageRoute: "index",
        filterRow: {},
        searchType: 0,
        outsideData: {},
        fromSearch: !0
    },
    toggleMask: function() {
        this.setData({
            showFilter: !1,
            showSort: !1,
            showCategory: !1
        });
    },
    loadData: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = this, r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (r || (f.offset = 0), this.data.loadedAll && this.data.init) return h.resolve({});
        Object.assign(t, this.data.query, {
            offset: f.offset,
            limit: f.limit
        }), this.setData({
            loading: !0
        });
        var i = {};
        for (var n in t) !t.hasOwnProperty(n) || null === t[n] || void 0 === t[n] || t[n] instanceof Array && 0 === t[n].length || (i[n] = t[n]);
        return u.searchRestaurant(i).then(function(t) {
            var i = t.data, n = i.inside, d = i.outside, u = {}, l = [], g = {}, p = 0;
            if (n[0] ? u = n[0] : n[3] && (u = n[3]), u.restaurant_with_foods) {
                p = u.search_type, (l = a.handleRow(u.restaurant_with_foods)).forEach(function(t) {
                    t.foods.forEach(function(t) {
                        t.activities = t.activities.filter(function(t) {
                            return 103 !== t.type;
                        }), t.activities[0] && (t.activity_tag_style = y(t.activities[0]));
                    });
                });
                var m = function(t, e) {
                    var a = [], r = {
                        text: e,
                        color: "#118dff"
                    }, o = t.split(e).map(function(t) {
                        return {
                            text: t
                        };
                    });
                    return o.forEach(function(t, e) {
                        a.push(t), e !== o.length - 1 && a.push(r);
                    }), a.filter(function(t) {
                        return t.text;
                    });
                };
                0 === p && l.forEach(function(t) {
                    t.highlightName = m(t.name, a.data.query.keyword);
                }), 3 === p && l.forEach(function(t) {
                    t.folded = !0, t.attachedFoodAmount = u.attached_food_amount, t.foods.forEach(function(t) {
                        t.highlightName = m(t.name, a.data.query.keyword);
                    });
                }), g = o ? a.data.filterRow : u.filter;
            }
            var w = [];
            if (n[1] && (w = a.handleRow(n[1].restaurant_with_foods)), d.count) {
                var v = e(d.restaurants, 1)[0];
                v.image_url = s(v.image_path);
            }
            return a.setData({
                typeAhead: {
                    words: [],
                    restaurants: []
                },
                loading: !1,
                restaurants: r ? c(a.data.restaurants, l, "id") : l,
                loadedAll: l.length < f.limit || f.offset >= 290,
                recommendList: w,
                filterRow: g,
                searchType: p,
                outsideData: d
            }), h.resolve(l);
        }).catch(function(t) {
            a.setData({
                loading: !1
            }), wx.hideToast(), t.data && /UNAUTHORIZED/.test(t.data.name) ? wx.showModal({
                title: "需要登录",
                content: "登录后查看商家",
                confirmText: "去登录",
                success: function(t) {
                    t.confirm && wx.navigateTo({
                        url: "/pages/auth/index?successUrl=/pages/index/index"
                    });
                }
            }) : wx.showModal({
                title: "出错啦",
                content: "服务器饿晕啦~,请稍后再试",
                showCancel: !1,
                confirmText: "知道了",
                confirmColor: "#0097ff"
            });
        });
    },
    getHotWord: function() {
        var t = this;
        return u.getHotwords({
            latitude: this.data.query.latitude,
            longitude: this.data.query.longitude
        }).then(function(e) {
            t.setData({
                hotWords: e.data
            });
        });
    },
    clickRstList: function(t) {
        i.sendEvent({
            id: 101148,
            params: t.currentTarget.dataset
        });
    },
    keywordChanged: function(t) {
        var e = this, a = t.detail.value;
        this.setData({
            query: Object.assign(this.data.query, {
                keyword: a
            })
        }), this.toggleMask(), a ? (this.setData({
            pageRoute: "typeahead"
        }), clearTimeout(g), g = setTimeout(function() {
            e.typeAhead(a);
        }, 500)) : this.setData({
            pageRoute: "index",
            typeAhead: {
                restaurants: [],
                words: []
            }
        });
    },
    typeAhead: function(t) {
        var e = this;
        u.getTypeAhead({
            kw: t,
            latitude: this.data.query.latitude,
            longitude: this.data.query.longitude
        }).then(function(t) {
            var a = t.data;
            a.restaurants.forEach(function(t) {
                t.image_url = s(t.image_path, 48, 48), t.rating = t.rating.toFixed(1);
            }), e.setData({
                typeAhead: {
                    restaurants: a.restaurants,
                    words: a.words
                }
            });
        }).catch(function() {});
    },
    btnPush: function() {
        var t = this, e = this.data.query.keyword;
        f.offset = 0, this.data.offset = 0, "" !== e ? (this.setData({
            pageRoute: "result",
            restaurants: []
        }), this.loadData().then(function() {
            var a = wx.getStorageSync("search_history");
            a && -1 !== a.indexOf(e) || "" === e || (t.setData({
                searchHistory: t.data.searchHistory.concat(e)
            }), wx.setStorageSync("search_history", t.data.searchHistory)), t.setData({
                init: !1
            });
        })) : this.setData({
            restaurants: [],
            init: !0
        });
    },
    cleanTag: function() {
        wx.removeStorageSync("search_history"), this.setData({
            searchHistory: []
        });
    },
    chooseTag: function(t) {
        this.setData({
            query: Object.assign(this.data.query, {
                keyword: t.currentTarget.dataset.text
            })
        }), this.btnPush();
    },
    pushIndexKeyword: function(t) {
        t && (this.setData({
            query: Object.assign(this.data.query, {
                keyword: t
            })
        }), this.btnPush());
    },
    loadMore: function() {
        f.offset += f.limit, this.loadData({}, !0);
    },
    filterShops: function() {
        f.offset = 0, this.setData({
            loadedAll: !1,
            restaurants: []
        }), this.loadData(), i.sendEvent({
            id: 107152,
            params: t({}, this.data.query, {
                type: 2
            })
        }), d.sendGoldlog("eleme-wechatmp.index.ELEME-WECHATMP-INDEX-FILTER", "CLK", "filter_source=0");
    },
    onLoad: function(t) {
        var e = wx.getStorageSync("search_history"), r = wx.getStorageSync("PLACE"), o = r.latitude, i = r.longitude, n = t.keyword;
        Object.assign(this.data.query, {
            latitude: o,
            longitude: i
        }), this.setData({
            searchHistory: e instanceof Array ? e.reverse() : [],
            hotword: n
        }), this.getHotWord(), this.pushIndexKeyword(n), this.getFilter(), l = (0, a.createUrlParams)();
    },
    onShow: function() {
        i.sendPv(), d.sendPv();
    },
    goToShop: function(t) {
        var e = t.currentTarget.dataset.restaurant_id, a = t.currentTarget.dataset.index;
        void 0 !== a && i.sendEvent({
            id: 101148,
            params: {
                restaurant_id: e,
                index: a
            }
        });
        var r = "/pages/shop/shop/index?id=" + e + "&" + l;
        getCurrentPages().length < 3 ? wx.navigateTo({
            url: r
        }) : wx.redirectTo({
            url: r
        });
    },
    openSearch: function(t) {
        var e = t.currentTarget.dataset.keyword;
        this.pushIndexKeyword(e);
    },
    toggleFold: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.restaurants[e];
        a.folded = !a.folded, this.setData({
            restaurants: this.data.restaurants
        });
    },
    goToFood: function(t) {
        var e = t.currentTarget.dataset, a = e.restaurantId, r = e.foodId;
        wx.navigateTo({
            url: "/pages/shop/shop/index?id=" + a + "&promotion_food=" + r
        });
    }
}, require("../../common/components/restaurant-row/component.js"), require("../../common/components/restaurant-filter-bars/component.js"), require("./components/filter/index.js") ]);

Page(p);