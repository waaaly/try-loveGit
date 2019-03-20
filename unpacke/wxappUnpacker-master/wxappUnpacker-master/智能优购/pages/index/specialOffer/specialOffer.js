var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var o = arguments[a];
        for (var e in o) Object.prototype.hasOwnProperty.call(o, e) && (t[e] = o[e]);
    }
    return t;
}, a = getApp(), o = null;

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
        var a = t.prid, o = t.isPriceType;
        this.setData({
            prid: a,
            isPriceType: o
        }), this.getData();
    },
    getData: function() {
        var o = this.data.page;
        wx.showLoading({
            title: "加载中"
        });
        var e = this, n = e.data.prid, i = e.data.isPriceType, r = t({
            prId: n,
            isPriceType: i
        }, o);
        a.getHttpData(a.earn_not_seckill, r, "GET", function(t) {
            var a = t.data;
            console.log("天天特价", a), wx.hideLoading(), a.promotionGoods.length < o.pageSize && a.promotionGoods.length > 3 && e.setData({
                IsBottom: !0
            }), e.setData({
                banner: a.bannerImgUrl,
                list: a.promotionGoods,
                dataStatus: a.dataStatus
            }), e.timeTransform(a.countDown);
        });
    },
    timeTransform: function(t) {
        t /= 1e3;
        var a = this;
        console.log(t), o = setInterval(function() {
            var o = 0, e = 0, n = 0;
            t > 0 && (o = parseInt(t / 3600), e = parseInt(t / 60 % 60), n = parseInt(t % 60)), 
            o <= 9 && (o = "0" + o), e <= 9 && (e = "0" + e), n <= 9 && (n = "0" + n);
            var i = {
                h: o,
                m: e,
                s: n
            };
            a.setData({
                downTime: i
            }), t--;
        }, 1e3), t <= 0 && (a.setData({
            downTime: -1
        }), clearInterval(o));
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        clearInterval(o);
    },
    onPullDownRefresh: function() {
        this.page = {
            pageSize: 20,
            pageNum: 1
        }, this.getDataMore();
    },
    onReachBottom: function() {
        var o = this, e = o.data.page, n = o.data.prid, i = o.data.list;
        e.pageNum++;
        var r = t({
            prId: n,
            isPriceType: 0
        }, e);
        a.getHttpData(a.earn_not_seckill, r, "GET", function(t) {
            var a = t.data;
            console.log(a), a && a.promotionGoods.length && (i = i.concat(a.promotionGoods), 
            a.promotionGoods.length < e.pageSize && i.length > 3 && o.setData({
                IsBottom: !0
            }), wx.hideLoading(), e.pageNum++, o.setData({
                list: i,
                page: e
            }));
        });
    }
});