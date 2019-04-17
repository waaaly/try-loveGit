var e = getApp().services, t = e.API, a = e.Ubt;

module.exports = {
    hideShareMenu: function() {
        this.setData({
            "hongbaoShare.popup": !1
        });
    },
    openPopShare: function() {
        a.sendEvent({
            id: "102035",
            params: {
                source: 0
            }
        });
    },
    getHbConfig: function() {
        var e = this;
        t.getHbConfig().then(function(t) {
            var a = t.data;
            a.imageUrl && e.setData({
                shareImageUrl: a.imageUrl
            });
        }).catch(function(e) {});
    }
};