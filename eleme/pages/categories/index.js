function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("./js/category")), a = t(require("./config/images.js")), n = getApp().services, i = n.imageHash, o = n.API, r = (n.HashToUrl, 
n.Ubt), c = n.Location, s = {
    data: {
        imageHash: i,
        categories: [],
        currentPlace: {
            latitude: null,
            longitude: null
        },
        imagesUrl: a.default,
        showGiftCard: !1
    },
    doLocate: function() {
        var t = this;
        return c().then(function(e) {
            t.setData({
                currentPlace: e
            }), t.getCategories();
        }).catch(function(e) {
            t.getCategories();
        });
    },
    getCategories: function() {
        var t = this;
        o.getCategoryEntries({
            latitude: this.data.currentPlace.latitude,
            longitude: this.data.currentPlace.longitude
        }).then(function(a) {
            var n = (a.data || [ {} ])[0].entries;
            n && t.setData({
                categories: (0, e.default)(n)
            });
        }).catch(function(t) {
            console.log(t), wx.showToast({
                title: "获取分类数据失败"
            });
        });
    },
    clickCategory: function(t) {
        r.sendEvent({
            id: 101897,
            params: t.currentTarget.dataset
        });
    },
    search: function() {
        r.sendEvent({
            id: 101896
        });
    },
    onShow: function() {
        this.doLocate(), r.sendPv();
    },
    goToBanner: function() {
        r.sendEvent({
            id: 102306
        });
    }
};

Page(s);