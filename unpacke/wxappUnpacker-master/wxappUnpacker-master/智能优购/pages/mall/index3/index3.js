function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = getApp();

Page({
    data: (t = {
        nextPage: 1,
        dataset: {
            list: [],
            pic: ""
        },
        isLoad: !1
    }, a(t, "nextPage", 1), a(t, "loadIsEnd", !1), a(t, "isVerfity", !0), a(t, "loadlayer", !0), 
    t),
    bindShareTap: function(a) {
        e.userinfo(function(a) {
            a ? wx.navigateTo({
                url: "/pages/index/share/share"
            }) : that.wetoast.toast({
                title: "授权失败",
                duration: 2e3
            });
        });
    },
    bindContentTap: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/mall/content/content?id=" + t
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
            var t = a.data.nextPage;
            e.getHttpData(e.domain + "/mall/main?page=" + t, null, "GET", function(t) {
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
        new e.WeToast(), this.setData({
            isLoad: !1,
            loadIsEnd: !1
        }), this.setData({
            "dataset.list": []
        }), this.setData({
            nextPage: 1
        }), this.loadData();
    },
    onShow: function() {}
});