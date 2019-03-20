var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, a = getApp(), e = null;

Page({
    data: {
        tabIndex: 0,
        tabList: [],
        page: {
            pageNum: 1,
            pageSize: 15,
            total: -1
        }
    },
    onLoad: function(t) {
        console.log(t, "======================"), this.getData("onLoad");
    },
    getData: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        console.log("下拉了"), wx.showLoading({
            title: "加载中"
        });
        var e = this;
        a.getHttpData(a.earn_seckill, null, "GET", function(a) {
            var o = a.data;
            if (console.log("自融秒杀", o), wx.hideLoading(), o[0].promotionGoods = [], "onLoad" == t) for (var n = 0; n < o.length; n++) if (300 != o[n].dataStatus) {
                e.setData({
                    tabIndex: n
                });
                break;
            }
            e.setData({
                tabList: o
            }), e.timeTransformActive(), e.getTabData();
        });
    },
    getTabData: function() {
        var e = this, o = e.data.tabIndex, n = e.data.tabList, i = e.data.page, s = n[o].prId, r = e.data.tabList[o].dataStatus, l = n[o].isPriceType, c = t({}, i, {
            prid: s,
            isPriceType: l,
            dataStatus: r
        });
        wx.showLoading({
            title: "加载中"
        }), a.getHttpData(a.earn_active_page, c, "GET", function(t) {
            var a = t.data;
            wx.hideLoading(), console.log(a), n[o].promotionGoods = a, console.log("距离时间", n), 
            e.setData({
                tabList: n
            });
        });
    },
    timeTransformActive: function() {
        if (e) return !1;
        console.log("timeTransformActive");
        var t = this, a = t.data.tabIndex, o = t.data.tabList, n = 0, i = 0, s = 0, r = o[a].countDown;
        r /= 1e3, console.log(o[a].dataStatus >= 300 || r <= 0), console.log(o[a]), e = setInterval(function() {
            if (o[a].dataStatus >= 300 || r <= 0) return console.log(222), 0 == o[a].dataStatus && t.getData(), 
            clearInterval(e), e = null, !1;
            r--, n = parseInt(r / 3600), i = parseInt(r / 60 % 60), s = parseInt(r % 60), n <= 9 && (n = "0" + parseInt(n)), 
            i <= 9 && (i = "0" + parseInt(i)), s <= 9 && (s = "0" + parseInt(s)), o[a].countDown = r, 
            o[a].txt = {
                h: n,
                m: i,
                s: s
            }, t.setData({
                tabList: o
            });
        }, 1e3);
    },
    gotoShop: function(t) {
        var a = t.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "/pages/shop/content/content?id=" + a
        });
    },
    loadMore: function() {
        var e = this, o = e.data.tabIndex, n = e.data.tabList, i = e.data.page, s = n[o].prId, r = n[o].isPriceType;
        i.pageNum++;
        var l = t({}, i, {
            prid: s,
            isPriceType: r
        });
        wx.showLoading({
            title: "加载中"
        }), a.getHttpData(a.earn_active_page, l, "GET", function(t) {
            var a = t.data;
            wx.hideLoading(), n[o].promotionGoods.concat(a), e.setData({
                tabList: n
            });
        });
    },
    onShow: function() {},
    switchIndex: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.index, o = {
            pageNum: 1,
            pageSize: 15,
            total: -1
        };
        this.setData({
            tabIndex: a,
            page: o
        }), clearInterval(e), e = null, this.getData();
    },
    onPullDownRefresh: function() {
        console.log("下拉一");
        var t = this;
        t.setData({
            tabList: [],
            page: {
                pageNum: 1,
                pageSize: 15
            }
        }), t.getData(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 100);
    },
    onUnload: function() {
        clearInterval(e), e = null;
    },
    onHide: function() {
        clearInterval(e), e = null;
    },
    onReachBottom: function() {
        this.loadMore();
    }
});