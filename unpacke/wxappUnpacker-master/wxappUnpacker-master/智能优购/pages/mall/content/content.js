var t = getApp();

Page({
    data: {
        id: 0,
        dataset: [],
        loadlayer: !0
    },
    bindBuyTap: function(a) {
        if (this.data.dataset.gobuy) {
            var e = this;
            t.getuserinfo(a, function(t) {
                if (t) {
                    var a = "/pages/mall/order2/order2?t=3&id=" + e.data.dataset.id + "&geshu=1";
                    wx.navigateTo({
                        url: a
                    });
                } else e.wetoast.toast({
                    title: "授权失败",
                    duration: 2e3
                });
            });
        } else this.wetoast.toast({
            title: "数贝不足",
            duration: 2e3
        });
    },
    onLoad: function(a) {
        new t.WeToast();
        var e = a.id || a.scene, i = a.main || !1;
        this.setData({
            frommain: i,
            id: e
        }), this.loadData();
    },
    loadData: function() {
        var a = this.data.id, e = this;
        t.getHttpData(t.domain + "/mall/content/?id=" + a, null, "GET", function(t) {
            wx.stopPullDownRefresh(), console.log(t), wx.setNavigationBarTitle({
                title: t.title
            }), e.setData({
                dataset: t
            }), e.setData({
                loadlayer: !1
            });
        });
    },
    onPullDownRefresh: function() {
        this.loadData();
    }
});