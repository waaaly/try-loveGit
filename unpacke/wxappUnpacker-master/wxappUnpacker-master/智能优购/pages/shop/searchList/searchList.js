var a = getApp();

Page({
    data: {
        nextPage: 1,
        pageSize: 10,
        dataset: [],
        isLoad: !1,
        bid: 0,
        sid: 0,
        sort: 0,
        keyword: "",
        loadIsEnd: !1,
        isVerfity: !0,
        loadlayer: !0
    },
    bindContentTap: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/shop/content/content?id=" + t
        });
    },
    bindShareTap: function(t) {
        a.userinfo(function(a) {
            a ? wx.navigateTo({
                url: "/pages/index/share/share"
            }) : that.wetoast.toast({
                title: "授权失败",
                duration: 2e3
            });
        });
    },
    bindSortTap: function(a) {
        var t = a.currentTarget.dataset.tab;
        this.setData({
            sort: t,
            nextPage: 1,
            loadIsEnd: !1,
            isLoad: !1
        }), this.setData({
            dataset: []
        });
        var e = this;
        setTimeout(function() {
            e.searchData();
        }, 100);
    },
    onPullDownRefresh: function() {
        this.setData({
            nextPage: 1,
            loadIsEnd: !1,
            isLoad: !1
        }), this.setData({
            dataset: []
        });
        this.searchData();
    },
    onReachBottom: function() {
        var a = this.data.keyword;
        console.log(a), this.searchData();
    },
    searchData: function() {
        var t = this;
        if (!t.data.isLoad && !t.data.loadIsEnd) {
            t.setData({
                isLoad: !0
            });
            var e = {
                page: t.data.nextPage,
                catlaogMobileId: this.data.bid,
                sortRule: parseInt(this.data.sort) + 1
            }, o = {
                pageNum: t.data.nextPage,
                pageSize: t.data.pageSize,
                goodsName: t.data.keyword,
                sortRule: parseInt(this.data.sort) + 1
            }, s = t.data.keyword ? a.search_shop : a.class_shop_list, n = t.data.keyword ? o : e;
            console.log(n), a.getHttpData(s, n, "GET", function(a) {
                wx.stopPullDownRefresh();
                var e = a.data;
                console.log("数据", a), console.log("数据", e), wx.setNavigationBarTitle({
                    title: e.name || "智融优购"
                }), e.length < 10 && t.setData({
                    loadIsEnd: !0
                }), console.log(e.length > 0), e.length > 0 && t.setData({
                    isLoad: !1,
                    dataset: t.data.dataset.concat(e),
                    nextPage: t.data.nextPage + 1
                }), console.log("--------------"), console.log(t.data.dataset), console.log(t.data.loadlayer), 
                console.log("--------------"), t.setData({
                    loadlayer: !1
                }), console.log(t.data.loadlayer);
            });
        }
    },
    onLoad: function(t) {
        console.log(t), new a.WeToast(), this.setData({
            isLoad: !1,
            loadIsEnd: !1,
            dataset: []
        }), this.setData({
            bid: t.bid || 0
        }), this.setData({
            keyword: t.keyword || null
        }), this.setData({
            nextPage: 1
        }), this.searchData();
    },
    onShow: function() {}
});