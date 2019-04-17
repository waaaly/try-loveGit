var t = function(t) {
    if (t && t.__esModule) return t;
    var a = {};
    if (null != t) for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (a[o] = t[o]);
    return a.default = t, a;
}(require("./lib/api.js")), a = require("../../libs/aliLog.js"), o = getApp().services, s = o.HashToUrl, e = o.Ubt, i = o.AliLog, n = "";

Page({
    onShow: function() {
        e.sendPv(), i.sendPv();
    },
    data: {
        id: 0,
        shop: null,
        showAll: !1,
        foods: [],
        showingDownloadApp: !1
    },
    loadShop: function() {
        var a = this;
        return t.getShop(this.data.id).then(function(t) {
            var o = t.data;
            o.image = s(o.image_path, 142, 142), o.ontime = o.supports.some(function(t) {
                return 9 === t.id;
            }), a.setData({
                shop: o
            });
        });
    },
    loadFoods: function() {
        var a = this;
        return t.getFoods(this.data.id).then(function(t) {
            var o = t.data.foods;
            o.forEach(function(t) {
                t.image = s(t.image_path, 330, 330), t.price = t.specfoods.map(function(t) {
                    return t.price;
                }).sort()[0] || 0;
            }), a.setData({
                foods: o
            });
        }).catch(function() {});
    },
    onLoad: function(t) {
        var o = this, s = t.id;
        this.setData({
            id: s
        }), this.loadShop().catch(function(t) {
            t && 401 === t.statusCode ? wx.navigateTo({
                url: "/pages/auth/index?" + n + "&successUrl=/pages/share/index?id=" + o.data.id
            }) : wx.showToast({
                title: "获取餐厅数据失败"
            });
        }), this.loadFoods(), n = (0, a.createUrlParams)();
    },
    toggleShowAll: function() {
        this.setData({
            showAll: !this.data.showAll
        });
    },
    goShop: function(t) {
        t && t.currentTarget.dataset.sendUbt && e.sendEvent({
            id: 100805,
            params: {
                message: "进店购买"
            }
        }), wx.navigateTo({
            url: "/pages/shop/shop/index?id=" + this.data.id + "&" + n
        });
    },
    showDownloadApp: function() {
        e.sendEvent({
            id: 100805,
            params: {
                message: "下载App享受更多优惠"
            }
        }), this.setData({
            showingDownloadApp: !0
        });
    },
    hideDownloadApp: function() {
        this.setData({
            showingDownloadApp: !1
        });
    }
});