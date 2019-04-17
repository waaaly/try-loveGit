var e = function() {
    function e(e, t) {
        var n = [], r = !0, o = !1, a = void 0;
        try {
            for (var i, c = e[Symbol.iterator](); !(r = (i = c.next()).done) && (n.push(i.value), 
            !t || n.length !== t); r = !0) ;
        } catch (e) {
            o = !0, a = e;
        } finally {
            try {
                !r && c.return && c.return();
            } finally {
                if (o) throw a;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), t = getApp().services, n = t.webCart, r = t.API, o = t.Pay;

module.exports = {
    rebuy: function(e, t, o, a) {
        var i = this;
        r.orderRebuy(o).then(function(e) {
            wx.hideToast();
            var r = e.data.foods, c = new n(t);
            c.clearCart(), r.forEach(function(e) {
                e.packing_fee = e.packing_fee || 0, e.specs = e.new_specs, delete e.new_specs, c.setEntity(e, e.quantity);
            }), i.setData({
                cart: c
            });
            var s = "/pages/shop/shop/index?id=" + t + "&isRebuy=true&uniqueId=" + o + "&" + a;
            wx.navigateTo({
                url: s
            });
        });
    },
    confirm: function(e, t, n) {
        r.orderConfirm(t).then(function(e) {
            var r = +e.statusCode;
            200 === r || 204 === r ? wx.showModal({
                title: "已确认送达",
                content: "期待您再次使用饿了么",
                showCancel: !1,
                success: function(e) {
                    wx.navigateTo({
                        url: "/pages/order/detail/order-detail?id=" + t + "&" + n
                    });
                }
            }) : wx.showModal({
                title: "确认送达失败",
                content: "服务器饿晕了，请您稍后再试",
                showCancel: !1
            });
        });
    },
    cancel: function(e, t) {
        r.orderCancel(t).then(function(e) {
            wx.showModal({
                title: "订单取消成功",
                showCancel: !1,
                content: "期待您继续使用饿了么",
                success: function() {
                    wx.redirectTo({
                        url: "/pages/order/detail/order-detail?id=" + t
                    });
                }
            });
        }).catch(function(e) {
            wx.showModal({
                title: "订单取消失败",
                showCancel: !1,
                content: "您可以稍后再试，或者联系饿了么客服"
            });
        });
    },
    refund: function(e, t) {
        wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "申请退款暂未接入到小程序，麻烦您到饿了么APP或者浏览器打开https://m.ele.me申请退款"
        });
    },
    remind: function(e, t) {
        r.orderReminding(t).then(function(e) {
            200 == +e.statusCode ? wx.showModal({
                title: "催单成功",
                showCancel: !1,
                content: "已催单，请稍等",
                success: function() {
                    wx.redirectTo({
                        url: "/pages/order/detail/order-detail?id=" + t
                    });
                }
            }) : wx.showModal({
                title: "催单失败",
                showCancel: !1,
                content: "人太多了，催单失败，请稍等"
            });
        }).catch(function(e) {
            wx.showModal({
                title: "催单失败",
                showCancel: !1,
                content: "人太多了，催单失败，请稍等"
            });
        });
    },
    rate: function(e, t, n) {
        wx.navigateTo({
            url: "/pages/order/detail/order-detail?id=" + t + "&route=rate&" + n
        });
    },
    pay: function(t, n) {
        o(t).then(function(o) {
            if (o) {
                var a = o.split("="), i = e(a, 2), c = i[0], s = i[1];
                "prepay_id" === c && r.formSubmit(s, "prepay_id");
            }
            var d = "/pages/order/detail/order-detail?id=" + t + "&" + n, l = getCurrentPages().length, u = getCurrentPages()[l - 1];
            u && /pages\/order\/list\//.test(u.__route__) ? wx.navigateTo({
                url: d
            }) : wx.redirectTo({
                url: d
            });
        }).catch(function() {});
    }
};