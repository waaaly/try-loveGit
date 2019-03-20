var a = getApp();

Page({
    data: {
        nextPage: 1,
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
            e.loadData();
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
        this.loadData();
    },
    onReachBottom: function() {
        this.loadData();
    },
    loadData: function() {
        var t = this;
        if (!t.data.isLoad && !t.data.loadIsEnd) {
            t.setData({
                isLoad: !0
            });
            var e = {
                page: t.data.nextPage,
                bid: this.data.bid,
                sid: this.data.sid,
                keyword: this.data.keyword,
                sort: this.data.sort
            };
            console.log("data"), console.log(e), a.getHttpData(a.more + t.options.name, e, "GET", function(a) {
                wx.stopPullDownRefresh(), console.log(a), wx.setNavigationBarTitle({
                    title: a.name || "智融优购"
                }), a.data.length < 10 && t.setData({
                    loadIsEnd: !0
                }), a.data.length > 0 && (t.setData({
                    isLoad: !1
                }), t.setData({
                    dataset: t.data.dataset.concat(a.data),
                    nextPage: t.data.nextPage + 1
                })), console.log("--------------"), console.log(t.data.loadlayer), console.log("--------------"), 
                t.setData({
                    loadlayer: !1
                });
            });
        }
    },
    onLoad: function(t) {
        new a.WeToast(), this.setData({
            isLoad: !1,
            loadIsEnd: !1,
            dataset: []
        }), this.setData({
            bid: t.bid || 0
        }), this.setData({
            sid: t.sid || 0
        }), this.setData({
            sort: t.sort || 0
        }), this.setData({
            keyword: t.keyword || ""
        }), this.setData({
            nextPage: 1
        }), this.loadData();
    },
    onShow: function() {}
});