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
        dataset: [],
        isLoad: !1,
        zhanweih: 0
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
            url: "/pages/shop/content/content?main=true&id=" + t
        });
    },
    loadData: function() {
        var a = this;
        if (!a.data.isLoad && !a.data.loadIsEnd) {
            a.setData({
                isLoad: !0
            });
            var t = {
                page: a.data.nextPage,
                bid: 99,
                sid: 0,
                keyword: "",
                sort: 0
            };
            e.getHttpData(e.domain + "/shop/list", t, "POST", function(t) {
                wx.stopPullDownRefresh(), console.log(t), wx.setNavigationBarTitle({
                    title: t.name
                }), t.list.length < 10 && a.setData({
                    loadIsEnd: !0
                }), t.list.length > 0 && (a.setData({
                    isLoad: !1
                }), a.setData({
                    dataset: a.data.dataset.concat(t.list),
                    nextPage: a.data.nextPage + 1
                })), a.setData({
                    loadlayer: !1
                });
            });
        }
    },
    onLoad: function() {
        new e.WeToast(), this.setData({
            loadlayer: !1,
            isLoad: !0,
            loadIsEnd: !0
        });
    },
    onShow: function() {}
});