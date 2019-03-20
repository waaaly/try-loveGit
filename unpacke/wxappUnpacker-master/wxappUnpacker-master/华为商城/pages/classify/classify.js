var t = getApp(), a = t.globalData.mp, e = t.globalData.config;

Page({
    data: {
        navActive: 0,
        navList: [],
        currentId: "",
        cdnPath: "",
        currentIndex: 0,
        currentProductItem: {},
        isClicked: !1,
        success: !0,
        list: [],
        scrollTop: 0
    },
    onLoad: function(t) {
        var a = this;
        a.setData({
            isLoaded: !0
        }), a.setData({
            cdnPath: e.service.cdnPath
        }), a.getCategoryInfo();
    },
    onShow: function() {
        var t = this;
        t.data.isClicked = !1, t.data.success || t.getCategoryInfo();
    },
    onReady: function() {},
    getCategoryInfo: function() {
        var t = this;
        wx.showLoading({
            mask: !0,
            title: "加载中..."
        }), a.mpGet(e.service.openApiDomain + "/mcp/getCategoryInfo", {}, {
            successFunc: function(e) {
                if (200 != e.statusCode) return t.showErrorModal(), !1;
                if (!e.data) return t.showErrorModal(), !1;
                if (e.data && a.mpIsArray(e.data) && e.data.length > 0) {
                    var r = e.data.filter(function(t) {
                        if (t.subCategorys && t.subCategorys.length > 0 && (t.subCategorys = t.subCategorys.filter(function(t) {
                            if (t.subCategorys && t.subCategorys.length > 0 && (3 == t.type || 4 == t.type)) return t;
                        }), t.subCategorys.length > 0)) return t;
                    }), s = r.map(function(t, a) {
                        var e = {};
                        return e.id = t.id, e.name = t.name, t.index = a, e.index = a, e;
                    });
                    t.data.list = r, t.setData({
                        currentId: s[0].id,
                        currentIndex: s[0].index,
                        navList: s,
                        currentProductItem: r[0],
                        success: !0
                    }), wx.hideLoading();
                } else t.showErrorModal();
            },
            failFunc: function() {
                t.showErrorModal();
            }
        });
    },
    clickSideTitle: function(t) {
        var a = t.currentTarget.dataset.idx, e = this;
        e.setData({
            scrollTop: 0,
            currentIndex: a,
            currentProductItem: e.data.list[a]
        });
    },
    goNextLevel: function(t) {
        var a = this;
        if (a.data.isClicked) return !1;
        a.data.isClicked = !0, setTimeout(function() {
            a.data.isClicked = !1;
        }, 3e3);
        var e = t.currentTarget.dataset.type, r = t.currentTarget.dataset.value, s = t.currentTarget.dataset.title;
        if (3 == e) {
            var i = r.split("|");
            wx.navigateTo({
                url: "/pages/goodsDetail/goodsDetail?prdId=" + i[0] + "&skuCode=" + i[1]
            });
        } else 4 == e && wx.navigateTo({
            url: "/packageClassify/pages/classifyList/classifyList?cid=" + r + "&title=" + s
        });
    },
    showErrorModal: function() {
        this.setData({
            success: !1
        }), wx.hideLoading();
    },
    onReachBottom: function() {}
});