function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var a = require("../../../libs/aliLog"), t = getApp().services, r = t.Ubt, o = t.imageHash, i = t.API, n = t.User, s = t.HashToUrl, d = t.AliLog, c = require("../../../common/utils/util.js").payTimeFormat, l = require("../services/operations.js"), u = "";

Page({
    data: {
        imageHash: o,
        orders: [],
        loadedAll: !1,
        loaded: !1,
        redirected: !1,
        downloadTipsShow: !0,
        downloadTipsModalShow: !1,
        extra: ""
    },
    onLoad: function(e) {
        var t = e.source;
        t && this.setData({
            extra: "source=" + t
        }), u = (0, a.createUrlParams)();
    },
    onShow: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(a) {
                e.setData({
                    isApple: /iOS|iPad/.test(a.system)
                });
            }
        }), this.data.redirected = !1, this.setData({
            loaded: !1
        }), this.clearTimers(), n.id ? (this.setData({
            currentUser: n,
            orders: [],
            loadedAll: !1
        }), this.loadOrders()) : this.setData({
            currentUser: !1,
            loaded: !0
        }), r.sendPv(this.data.extra), d.sendPv();
    },
    onHide: function() {
        this.clearTimers();
    },
    clearTimers: function() {
        this.data.orders.forEach(function(e) {
            e.timer && clearInterval(e.timer);
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            orders: [],
            loadedAll: !1
        }), this.loadOrders();
    },
    getPayRemainSeconds: function(a, t) {
        var r = this;
        a && -5 === a.status_code && (a.payRemainSeconds = a.pay_remain_seconds, a.timer = setInterval(function() {
            a.payRemainSeconds = a.payRemainSeconds - 1, a.formattedRemainSecs = c(a.payRemainSeconds), 
            a.payRemainSeconds <= 0 && (clearInterval(a.timer), a.operation_rebuy = !0, a.operation_pay = !1, 
            a.status_bar.title = "订单已取消"), r.setData(e({}, "orders[" + t + "]", a));
        }, 1e3));
    },
    loadOrders: function() {
        var e = this;
        i.getUserOrders({
            offset: this.data.orders.length,
            limit: 10
        }).then(function(a) {
            if (200 == +a.statusCode) {
                a.data = a.data.map(function(e) {
                    return e.restaurant_image_url = s(e.restaurant_image_hash, 64, 64), e;
                });
                var t = e.data.orders.concat(a.data);
                e.setData({
                    loadedAll: a.data.length < 10,
                    orders: t,
                    loaded: !0
                }), a.data.forEach(function(a, t) {
                    e.getPayRemainSeconds(a, t);
                });
            } else if (401 == +a.statusCode) return void e.goLogin();
        }).catch(function(a) {
            401 != +a.statusCode || e.goLogin();
        });
    },
    loadMore: function() {
        this.data.loadedAll || this.loadOrders();
    },
    operationRebuy: function(e) {
        this.data.redirected || (this.data.redirected = !0, l.rebuy.call(this, n.id, e.currentTarget.dataset.shopid, e.currentTarget.dataset.id, u));
    },
    operationConfirm: function(e) {
        l.confirm(n.id, e.currentTarget.dataset.uid, u);
    },
    operationRate: function(e) {
        l.rate(n.id, e.currentTarget.dataset.uid, u);
    },
    operationPay: function(e) {
        var a = e.currentTarget.dataset.order;
        l.pay(a.unique_id, u);
    },
    download: function(e) {
        r.sendEvent({
            id: "100720"
        }), this.setData({
            downloadTipsModalShow: !0
        });
    },
    toggleDownloadTips: function(e) {
        this.setData({
            downloadTipsShow: !this.data.downloadTipsShow
        });
    },
    hideDownloadApp: function(e) {
        this.setData({
            downloadTipsModalShow: !1
        });
    },
    goLogin: function() {
        wx.navigateTo({
            url: "/pages/auth/index?" + u
        });
    },
    goShop: function(e) {
        var a = e.currentTarget.dataset.restaurant_id;
        wx.navigateTo({
            url: "/pages/shop/shop/index?id=" + a + "&" + u
        });
    },
    goDetail: function(e) {
        var a = e.currentTarget.dataset.unique_id;
        wx.navigateTo({
            url: "/pages/order/detail/order-detail?id=" + a + "&" + u
        });
    }
});