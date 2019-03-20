var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var n = arguments[a];
        for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e]);
    }
    return t;
}, a = getApp(), n = null;

Page({
    data: {
        banner: "",
        prid: 0,
        list: [],
        page: {
            pageSize: 15,
            pageNum: 1
        },
        isLoad: !1,
        isEnd: !1,
        downTime: null,
        timer: null
    },
    gotoShop: function(t) {
        var a = t.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "/pages/shop/content/content?id=" + a
        });
    },
    onLoad: function(t) {
        var a = t.prid, n = t.isPriceType;
        this.setData({
            prid: a,
            isPriceType: n
        }), this.getData();
    },
    getData: function() {
        var n = this;
        if (!n.data.isEnd) {
            var e = this.data.page, o = n.data.list, i = n.data.prid;
            n.data.isPriceType;
            wx.showLoading({
                title: "加载中"
            });
            var r = t({
                prId: i
            }, e);
            a.getHttpData(a.optimization_list, r, "GET", function(t) {
                wx.stopPullDownRefresh(), wx.hideLoading();
                var a = t.data;
                a.promotionGoods.length < 15 ? a.promotionGoods.length > 0 ? (o = o.concat(a.promotionGoods), 
                wx.hideLoading(), e.pageNum++, n.setData({
                    isEnd: !0,
                    banner: a.bannerImgUrl,
                    list: o,
                    page: e
                })) : n.setData({
                    isEnd: !0
                }) : (o = o.concat(a.promotionGoods), wx.hideLoading(), e.pageNum++, n.setData({
                    isEnd: !1,
                    banner: a.bannerImgUrl,
                    list: o,
                    page: e
                }));
            });
        }
    },
    timeTransform: function(t) {
        t /= 1e3;
        var a = this;
        n = setInterval(function() {
            var n = 0, e = 0, o = 0;
            t > 0 && (n = parseInt(time / 3600), e = parseInt(time / 60 % 60), o = parseInt(time % 60)), 
            n <= 9 && (n = "0" + n), e <= 9 && (e = "0" + e), o <= 9 && (o = "0" + o);
            var i = {
                h: n,
                m: e,
                s: o
            };
            a.setData({
                downTime: i
            }), t--;
        }, 1e3), t <= 0 && (a.setData({
            downTime: -1
        }), clearInterval(n));
    },
    onShow: function() {},
    onHide: function() {
        n && clearInterval(n);
    },
    onUnload: function() {
        n && clearInterval(n);
    },
    onPullDownRefresh: function() {
        this.onShow();
    },
    onReachBottom: function() {
        this.getData();
    }
});