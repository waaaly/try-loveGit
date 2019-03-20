var t = getApp();

Page({
    data: {
        nextPage: 1,
        dataset: {
            list: [],
            pic: ""
        },
        isLoad: !1,
        zhanweih: 0,
        loadIsEnd: !1,
        loadlayer: !0
    },
    bindShareTap: function(a) {
        t.userinfo(function(t) {
            t ? wx.navigateTo({
                url: "/pages/index/share/share"
            }) : that.wetoast.toast({
                title: "授权失败",
                duration: 2e3
            });
        });
    },
    bindContentTap: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/lottery/content/content?id=" + a
        });
    },
    onPullDownRefresh: function() {
        this.onLoad();
    },
    onReachBottom: function() {
        this.loadData();
    },
    loadData: function() {
        var a = this;
        if (!a.data.isLoad && !a.data.loadIsEnd) {
            a.setData({
                isLoad: !0
            });
            var e = a.data.nextPage;
            t.getHttpData(t.domain + "/lottery/list?page=" + e, null, "GET", function(t) {
                a.setData({
                    "dataset.pic": t.pic
                }), wx.stopPullDownRefresh(), console.log(t), t.list.length < 10 && a.setData({
                    loadIsEnd: !0
                }), t.list.length > 0 && (a.setData({
                    isLoad: !1
                }), a.setData({
                    "dataset.list": a.data.dataset.list.concat(t.list),
                    nextPage: a.data.nextPage + 1
                })), a.setData({
                    loadlayer: !1
                });
            });
        }
    },
    onLoad: function() {
        new t.WeToast(), this.setData({
            "dataset.list": [],
            isLoad: !1,
            loadIsEnd: !1
        }), this.setData({
            nextPage: 1
        }), this.loadData();
    },
    onShow: function() {}
});