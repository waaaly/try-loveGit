var r = function() {
    function r(r, e) {
        var t = [], n = !0, a = !1, i = void 0;
        try {
            for (var o, c = r[Symbol.iterator](); !(n = (o = c.next()).done) && (t.push(o.value), 
            !e || t.length !== e); n = !0) ;
        } catch (r) {
            a = !0, i = r;
        } finally {
            try {
                !n && c.return && c.return();
            } finally {
                if (a) throw i;
            }
        }
        return t;
    }
    return function(e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return r(e, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = require("../../libs/aliLog"), t = getApp().services, n = t.Pay, a = t.Ubt, i = t.AliLog, o = t.API, c = "";

Page({
    onLoad: function(r) {
        var t = r.orderId;
        c = (0, e.createUrlParams)(), t ? this.pay(t) : wx.navigateBack();
    },
    pay: function(e) {
        var t = "/pages/order/detail/order-detail?id=" + e + "&" + c;
        n(e).then(function(e) {
            var n = wx.getStorageSync("ORDER_TRACE") || "";
            if (a.sendEvent({
                id: 106964,
                params: {
                    orderTrace: n
                }
            }), wx.removeStorageSync("ORDER_TRACE"), e) {
                var i = e.split("="), c = r(i, 2), u = c[0], d = c[1];
                "prepay_id" === u && o.formSubmit(d, "prepay_id");
            }
            wx.redirectTo({
                url: t + "&hongbao=true"
            });
        }).catch(function() {
            wx.redirectTo({
                url: t
            });
        });
    },
    onShow: function() {
        a.sendPv(), i.sendPv();
    }
});