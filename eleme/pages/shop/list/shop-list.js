var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, e = require("../../../libs/aliLog"), a = getApp(), i = a.services, r = i.Ubt, o = i.API, n = i.imageHash, s = i.Location, d = i.AliLog, l = require("../../../libs/promise.js"), c = require("../../../common/utils/util.js").appendTail, u = "", g = {
    offset: 0,
    limit: 10
}, h = a.extend([ {
    data: {
        imageHash: n,
        loading: !0,
        query: {
            latitude: 0,
            longitude: 0,
            keyword: "",
            extras: [ "activities" ],
            order_by: 0
        },
        init: !0,
        options: {},
        restaurants: [],
        animation: {},
        loadedAll: !1,
        extra: "",
        category_name: "",
        city_id: 0
    },
    onShow: function() {
        r.sendPv(this.data.extra), d.sendPv();
    },
    toggleMask: function() {
        this.setData({
            showFilter: !1,
            showSort: !1,
            showCategory: !1
        });
    },
    loadData: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (a || (this.data.offset = 0), this.data.loadedAll) return l.resolve({});
        Object.assign(e, this.data.query, this.data.options, {
            offset: g.offset,
            limit: g.limit
        });
        var i = {}, r = this.data.isNewRetail;
        if (r) {
            var n = this.data.query;
            e.pageData && JSON.parse(e.pageData);
            if (i = {
                lat: e.latitude,
                lng: e.longitude,
                rn: e.limit,
                pn: Math.floor(e.offset / e.limit) + 1,
                channel: e.channel,
                city_id: e.city_id || "",
                isNewRetail: 1
            }, n.delivery_mode && n.delivery_mode.length && (i.delivery_party = n.delivery_mode.join(",")), 
            n.activity_types && n.activity_types.length && (i.welfare_filter = n.activity_types.join(",")), 
            n.support_ids && n.support_ids.length && (i.shop_attr_filter = n.support_ids.join(",")), 
            0 !== n.order_by && 3 !== n.order_by && 4 !== n.order_by) {
                var s = [ "", "takeout_price", "takeout_average_time", "", "", "distance", "sales_month", "overall_rating" ];
                i.sortby = s[n.order_by];
            }
        } else for (var d in e) !e.hasOwnProperty(d) || null === e[d] || void 0 === e[d] || e[d] instanceof Array && 0 === e[d].length || (i[d] = e[d]);
        return o.getShops(i).then(function(e) {
            var i = e.data;
            return i = t.handleRow(i), t.setData({
                init: !1,
                loading: !1,
                restaurants: a ? c(t.data.restaurants, i, r ? "wid" : "id") : i,
                loadedAll: i.length < g.limit || g.offset >= 290
            }), l.resolve(i);
        }).catch(function(e) {
            t.setData({
                loading: !1
            }), e.data && /UNAUTHORIZED/.test(e.data.name) ? wx.showModal({
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
                confirmColor: "#0097ff",
                success: function(t) {
                    t.confirm && wx.redirectTo({
                        url: "/pages/index/index"
                    });
                }
            });
        });
    },
    filterShops: function() {
        g.offset = 0, this.setData({
            loadedAll: !1,
            loading: !0,
            restaurants: []
        }), this.loadData({
            category_name: this.data.category_name,
            city_id: this.data.city_id
        }), r.sendEvent({
            id: 107152,
            params: t({}, this.data.query, {
                type: 3
            })
        }), d.sendGoldlog("eleme-wechatmp.index.ELEME-WECHATMP-INDEX-FILTER", "CLK", "filter_source=2");
    },
    clickRstList: function(t) {
        r.sendEvent({
            id: 101149,
            params: t.currentTarget.dataset
        });
    },
    loadMore: function() {
        g.offset += g.limit, this.loadData({
            category_name: this.data.category_name,
            city_id: this.data.city_id
        }, !0);
    },
    redirectSearch: function() {
        wx.navigateTo({
            url: "/pages/search/search?" + u
        });
    },
    onLoad: function(t) {
        var a = this;
        g.offset = 0;
        var i = JSON.parse(t.target), r = t.category_name;
        this.data.isNewRetail = "bdwm.plugin.newretail" === t.pluginId, this.data.category_name = r, 
        this.data.options = i, i.restaurant_category_id && (this.data.query.restaurant_category_ids = i.restaurant_category_id);
        var o = wx.getStorageSync("PLACE"), n = o.latitude, d = o.longitude;
        Object.assign(this.data.query, {
            latitude: n,
            longitude: d
        }), this.getFilter(), s().then(function(t) {
            a.data.city_id = t.city_id, a.loadData({
                category_name: r,
                city_id: t.city_id
            });
        }), wx.setNavigationBarTitle({
            title: r
        }), u = (0, e.createUrlParams)();
    },
    goToShop: function(t) {
        wx.navigateTo({
            url: "/pages/shop/shop/index?" + u + "&id=" + t.currentTarget.dataset.restaurant_id + "&isTransfer=" + t.currentTarget.dataset.is_transfer
        });
    }
}, require("../../../common/components/restaurant-row/component.js"), require("../../../common/components/restaurant-filter-bars/component.js") ]);

Page(h);