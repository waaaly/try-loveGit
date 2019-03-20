var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, e = getApp();

Page({
    data: {
        isEnd: !1,
        delBtnWidth: 180,
        list: [],
        startX: "",
        userId: 0,
        page: {
            pageNum: 1,
            pageSize: 20,
            total: 1
        }
    },
    onLoad: function(t) {
        new e.WeToast();
        var a = this, o = wx.getStorageSync("userid");
        o && a.setData({
            userId: o
        });
    },
    onShow: function() {
        this.loadList();
    },
    gotoShoping: function() {
        var t = e.goodShopId;
        if (console.log(t), !t.prid) return !1;
        wx.navigateTo({
            url: "/pages/index/optimization/optimization?prid=" + t.prid + "&sPriceType=" + t.isPriceType
        });
    },
    gotoShop: function(t) {
        var e = t.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "/pages/shop/content/content?id=" + e
        });
    },
    loadList: function() {
        var a = this, o = a.data.userId, i = a.data.page, n = t({}, i, {
            userId: o
        });
        e.getHttpData(e.myCollection, n, "get", function(t) {
            if (console.log("获取收藏", t), 200 == t.code) {
                var e = t.data;
                console.log(t.totalCount > i.pageNum * i.pageSize), t.totalCount > i.pageNum * i.pageSize && i.pageNum++, 
                i.total = t.totalCount, i.pageNum, parseInt(t.pageNum), console.log("load", e), 
                a.setData({
                    list: e,
                    page: i
                }), a.initEleWidth();
            }
        });
    },
    touchS: function(t) {
        1 == t.touches.length && (console.log("开始位置", t.touches[0].clientX), this.setData({
            startX: t.touches[0].clientX
        }));
    },
    touchM: function(t) {
        if (1 == t.touches.length) {
            var e = t.touches[0].clientX, a = this.data.startX - e, o = this.data.delBtnWidth, i = "";
            if (0 == a || a < 0 ? i = "0" : a > 0 && (i = "-" + a, a >= o && (i = "-" + o)), 
            i <= 0) return !1;
            var n = t.currentTarget.dataset.index, s = this.data.list;
            s[n].txtStyle = i, this.setData({
                list: s
            });
        }
    },
    touchE: function(t) {
        if (1 == t.changedTouches.length) {
            var e = t.changedTouches[0].clientX, a = this.data.startX - e, o = a > "-" + this.data.delBtnWidth / 2 ? "-120" : 0;
            if (console.log(a), a < 50 && a > -30) return !1;
            console.log("结束控制", o);
            var i = t.currentTarget.dataset.index, n = this.data.list;
            n[i].txtStyle = o, console.log("数据", n), this.setData({
                list: n
            });
        }
    },
    getEleWidth: function(t) {
        try {
            var e = wx.getSystemInfoSync().windowWidth, a = 375 / (t / 2);
            return Math.floor(e / a);
        } catch (t) {
            return !1;
        }
    },
    initEleWidth: function() {
        var t = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth: t
        });
    },
    delItem: function(t) {
        console.log("我进入了删除函数");
        var a = t.currentTarget.dataset.index, o = this, i = o.data.list, n = i[a].collectId;
        wx.showLoading({
            title: "正在操作"
        }), e.getHttpData(e.myCollectionCancel, {
            collectId: n
        }, "get", function(t) {
            if (wx.hideLoading(), 200 == t.code) {
                i.splice(a, 1);
                var e = {
                    pageNum: 1,
                    pageSize: 20,
                    total: 1
                };
                o.setData({
                    list: i,
                    page: e
                }), o.loadList(), wx.showToast({
                    title: "已取消",
                    mask: !0
                });
            }
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            page: {
                pageNum: 1,
                pageSize: 20,
                total: -1
            }
        }), this.loadList();
    },
    onReachBottom: function() {
        this.loadList();
    }
});