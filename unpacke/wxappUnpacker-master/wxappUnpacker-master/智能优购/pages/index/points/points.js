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
            pageSize: 9,
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
        console.log(t);
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
        var n = this, o = n.data.prid, i = n.data.isPriceType, r = t({
            prId: o,
            isPriceType: i
        }, e);
        a.getHttpData(a.earn_not_seckill, r, "GET", function(t) {
            var a = t.data;
            console.log("57", a), wx.hideLoading(), n.setData({
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
            var e = 0, n = 0, o = 0;
            t > 0 && (e = parseInt(t / 3600), n = parseInt(t / 60 % 60), o = parseInt(t % 60)), 
            e <= 9 && (e = "0" + e), n <= 9 && (n = "0" + n), o <= 9 && (o = "0" + o);
            var i = {
                h: e,
                m: n,
                s: o
            };
            a.setData({
                downTime: i
            }), t--;
        }, 1e3), t <= 0 && (a.setData({
            downTime: -1
        }), clearInterval(e));
    },
    onShow: function() {},
    onHide: function() {},
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
        var e = this, n = e.data.page, o = e.data.prid, i = e.data.list;
        n.pageNum++;
        var r = t({
            prId: o,
            isPriceType: 0
        }, n);
        console.log(r), a.getHttpData(a.earn_not_seckill, r, "GET", function(t) {
            console.log(t);
            var a = t.data;
            a && a.promotionGoods.length && (i = i.concat(a.promotionGoods), wx.hideLoading(), 
            e.setData({
                list: i
            }));
        });
    }
});