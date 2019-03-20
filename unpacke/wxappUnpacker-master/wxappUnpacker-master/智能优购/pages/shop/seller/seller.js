function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = getApp();

Page({
    data: (t = {
        nextPage: 1,
        dataset: [],
        shop: [],
        isLoad: !1,
        zhanweih: 0,
        shopid: 0
    }, a(t, "nextPage", 1), a(t, "loadIsEnd", !1), a(t, "isVerfity", !0), a(t, "loadlayer", !0), 
    t),
    bindContentTap: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.redirectTo({
            url: "/pages/shop/content/content?main=true&id=" + t
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            dataset: [],
            isLoad: !1,
            nextPage: 1,
            loadIsEnd: !1
        }), this.loadData();
    },
    onReachBottom: function() {
        this.loadData();
    },
    loadData: function() {
        var a = this;
        if (!a.data.isLoad && !a.data.loadIsEnd) {
            a.setData({
                isLoad: !0
            });
            var t = a.data.nextPage;
            e.getHttpData(e.domain + "/shop/shoplist?shopid=" + this.data.shopid + "&page=" + t, null, "GET", function(t) {
                wx.stopPullDownRefresh(), console.log(t), a.setData({
                    shop: t.shop
                }), t.list.length < 10 && a.setData({
                    loadIsEnd: !0
                }), t.list.length > 0 && (a.setData({
                    isLoad: !1
                }), a.setData({
                    dataset: a.data.dataset.concat(t.list),
                    nextPage: a.data.nextPage + 1
                })), a.setData({
                    loadlayer: !1
                });
            });
        }
    },
    onLoad: function(a) {
        new e.WeToast(), this.setData({
            isLoad: !1,
            loadIsEnd: !1,
            shopid: a.shopid || 0
        }), this.setData({
            nextPage: 1
        }), this.loadData();
    },
    onShow: function() {}
});