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
        loadlayer: !0,
        cote: 0
    },
    loadData: function() {
        if (console.log(), !this.data.isLoad && !this.data.loadIsEnd) {
            console.log("下拉刷新...."), this.setData({
                isLoad: !0
            });
            var t = this.data.userid, e = this.data.cote, o = this, s = this.data.nextPage;
            a.getHttpData(a.domain + "/User/GetSubUsers/?userId=" + t + "&pageIndex=" + s + "&pageSize=15&userType=" + e, null, "GET", function(a) {
                wx.stopPullDownRefresh();
                var t = a.users;
                o.setData({
                    totalcount: a.totalcount
                }), console.log(t), console.log(t), o.setData({
                    isLoad: !1
                }), null != t && (t.length < 15 && o.setData({
                    loadIsEnd: !0
                }), 1 == o.data.nextPage ? o.setData({
                    dataset: t
                }) : t.length > 0 && (console.log("data", t), o.setData({
                    dataset: t
                })), o.setData({
                    nextPage: o.data.nextPage + 1
                }), o.setData({
                    loadlayer: !1
                }));
            });
        }
    },
    userdowm: function(t) {
        var e = this.data.isdouble, o = this.data.cote;
        if (!e && (2 == o && this.setData({
            cote: "3"
        }), 1 == o && this.setData({
            cote: "2"
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