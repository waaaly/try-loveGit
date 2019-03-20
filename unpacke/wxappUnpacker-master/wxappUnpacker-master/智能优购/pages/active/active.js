var t = getApp();

Page({
    data: {
        activeData: [],
        nextPage: 1,
        isLoad: !1,
        bid: 0,
        sid: 0,
        sort: 0,
        keyword: "",
        loadIsEnd: !1,
        isVerfity: !0,
        loadlayer: !0
    },
    getActiveData: function() {
        var a = this;
        t.getHttpData(t.active + "?prId=" + a.options.prId, null, "GET", function(t) {
            wx.stopPullDownRefresh(), console.log(t), wx.setNavigationBarTitle({
                title: t.data.prName || "智融优购"
            }), a.setData({
                activeData: t.data
            }), console.log(a.data.activeData);
        });
    },
    bindContentTap: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/shop/content/content?id=" + a
        });
    },
    toGamePage: function() {
        wx.navigateTo({
            url: "/pages/create/create"
        });
    },
    onLoad: function(t) {
        this.getActiveData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});