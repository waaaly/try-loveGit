var a = getApp();

Page({
    data: {
        userid: "",
        isdouble: !1,
        dataset: [],
        nextPage: 1,
        isLoad: !1,
        totalcount: null,
        loadIsEnd: !1,
        loadlayer: !0
    },
    loadData: function() {
        if (console.log(), !this.data.isLoad && !this.data.loadIsEnd) {
            console.log("下拉刷新...."), this.setData({
                isLoad: !0
            }), this.setData({
                loadlayer: !1
            }), wx.stopPullDownRefresh();
            var t = this.data.userid, e = (this.data.cote, this), o = this.data.nextPage;
            a.getHttpData(a.myCenter_myInvitation + "?id=" + t + "&pageNum=" + o + "&pageSize=15", null, "GET", function(a) {
                wx.stopPullDownRefresh();
                var t = a.data;
                e.setData({
                    totalcount: a.totalCount
                }), e.setData({
                    isLoad: !1
                }), null != t && (t.length < 15 && e.setData({
                    loadIsEnd: !0
                }), 1 == e.data.nextPage ? e.setData({
                    dataset: t
                }) : t.length > 0 && e.setData({
                    dataset: e.data.dataset.concat(t)
                }), e.setData({
                    nextPage: e.data.nextPage + 1
                }), e.setData({
                    loadlayer: !1
                }));
            });
        }
    },
    userdowm: function(t) {
        var e = this.data.isdouble, o = this.data.cote;
        if (!e && (2 == o && this.setData({
            cote: "3"
        }), 3 != o)) {
            this.setData({
                isdouble: !0
            });
            var s = this, n = t.currentTarget.dataset.userid;
            console.log(n), this.setData({
                nextPage: 1,
                isLoad: !1,
                loadIsEnd: !1,
                userid: n,
                dataset: []
            }), a.login(function(a) {
                s.loadData();
            });
        }
    },
    onLoad: function(t) {
        var e = t.userid, o = t.cote;
        new a.WeToast();
        var s = this;
        console.log(o || 0), this.setData({
            nextPage: 1,
            isLoad: !1,
            loadIsEnd: !1,
            userid: e,
            cote: o || 0
        }), a.login(function(a) {
            s.loadData();
        });
    },
    onReachev: function() {
        var t = this;
        this.setData({
            nextPage: 1,
            isLoad: !1,
            loadIsEnd: !1
        }), a.login(function(a) {
            t.loadData();
        });
    },
    onReachBottom: function() {
        console.log("上拉处底...."), this.setData({
            isLoad: !1,
            loadIsEnd: !1
        }), this.loadData();
    },
    onPullDownRefresh: function() {
        console.log("下拉刷新...."), this.onReachev();
    }
});