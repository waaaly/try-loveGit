var o = getApp(), t = o.globalData.mp, a = o.globalData.config, e = [];

Page({
    data: {
        couponCode: "",
        showError: !1
    },
    onLoad: function(o) {
        var t = this;
        o.couponCode && t.setData({
            couponCode: o.couponCode
        }), t.setData({
            cdnPath: a.service.cdnPath
        }), t.getSkuCode(), e = [];
    },
    getSkuCode: function() {
        var o = this;
        t.mpPromiseGet(a.service.openApiDomain + "/mcp/coupon/queryCouponInfo", {
            couponCode: [ o.data.couponCode ]
        }).then(function(t) {
            if (t && t.data && t.data.couponInfos[0]) {
                for (var a = t.data.couponInfos[0].applySbomCode.split("|"), e = [], s = 0; s < a.length; s += 50) e.push(a.slice(s, s + 50));
                for (var r = e.length; r == e.length; r--) if (e.length > 0) {
                    var n = [];
                    n = e.shift(), o.getProducts(n);
                }
            } else o.setData({
                showError: !0
            });
        }).catch(function() {
            o.setData({
                showError: !0
            });
        });
    },
    getProducts: function(o) {
        var s = this;
        t.mpPromiseGet(a.service.openApiDomain + "/mcp/querySkuDetailDispInfo", {
            skuCodes: o
        }).then(function(o) {
            o && o.data && o.data.success ? (o.data.detailDispInfos && o.data.detailDispInfos.length > 0 && (e = e.concat(o.data.detailDispInfos)), 
            e.length > 0 ? s.setData({
                detailDispInfos: e,
                showError: !1
            }) : s.setData({
                showError: !0
            })) : e.length > 0 ? s.setData({
                showError: !1
            }) : s.setData({
                showError: !0
            });
        }).catch(function() {
            e.length > 0 ? s.setData({
                showError: !1
            }) : s.setData({
                showError: !0
            });
        });
    },
    goProduct: function(o) {
        t.stopRepeatClick(o, 3e3);
        var a = o.currentTarget.dataset.prdid, e = o.currentTarget.dataset.skucode;
        wx.navigateTo({
            url: "../goodsDetail/goodsDetail?prdId=" + a + "&skuCode=" + e
        });
    }
});