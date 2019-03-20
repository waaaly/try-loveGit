var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    }
    return t;
}, a = getApp(), e = null;

Page({
    data: {
        banner: "",
        prid: 0,
        list: [],
        dataStatus: -1,
        page: {
            pageSize: 20,
            pageNum: 1
        },
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
        var a = t.prid, e = t.isPriceType;
        this.setData({
            prid: a,
            isPriceType: e
        }), this.getData();
    },
    getData: function() {
        var e = this.data.page;
        wx.showLoading({
            title: "加载中"
        });
        var n = this, i = n.data.prid, r = n.data.isPriceType, o = t({
            prId: i,
            isPriceType: r
        }, e);
        a.getHttpData(a.earn_not_seckill, o, "GET", function(t) {
            var a = t.data;
            wx.hideLoading(), n.setData({
                banner: a.bannerImgUrl,
                list: a.promotionGoods,
                dataStatus: a.dataStatus
            }), n.timeTransform(a.countDown);
        });
    },
    timeTransform: function(t) {
        t /= 1e3;
        var a = this;
        e = setInterval(function() {
            var e = 0, n = 0, i = 0;
            t > 0 && (e = parseInt(time / 3600), n = parseInt(time / 60 % 60), i = parseInt(time % 60)), 
            e <= 9 && (e = "0" + e), n <= 9 && (n = "0" + n), i <= 9 && (i = "0" + i);
            var r = {
                h: e,
                m: n,
                s: i
            };
            a.setData({
                downTime: r
            }), t--;
        }, 1e3), t <= 0 && (a.setData({
            downTime: -1
        }), clearInterval(e));
    },
    onShow: function() {
        clearInterval(e), this.getData();
    },
    onHide: function() {
        clearInterval(e);
    },
    onUnload: function() {
        clearInterval(e);
    },
    onPullDownRefresh: function() {
        clearInterval(e), this.page = {
            pageSize: 20,
            pageNum: 1
        }, this.getData();
    },
    onReachBottom: function() {
        var e = this, n = e.data.page, i = e.data.prid, r = e.data.list;
        n.pageNum++;
        var o = t({
            prid: i,
            isPriceType: 0
        }, n);
        a.getHttpData(a.earn_active_page, o, "GET", function(t) {
            var a = t.data;
            a && a.length && (r = r.concat(a), wx.hideLoading(), n.pageNum++, e.setData({
                list: r,
                page: n
            }));
        });
    }
});