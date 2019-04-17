var t = getApp(), i = t.services, a = i.Ubt, e = (i.imageHash, i.User, require("../../utils/api")), n = t.extend([ {
    data: {},
    onLoad: function(t) {
        this.setData({
            options: t
        }), this.getCardDetail(t.themeId);
    },
    onShow: function() {
        a.sendPv();
    },
    getCardDetail: function(t) {
        var i = this;
        e.getCardDetail(t).then(function(t) {
            var a = t.data.skus, e = i.data.options.id, n = a.filter(function(t) {
                return t.id + "" === e;
            })[0];
            n.validity_period && (n.validTime = n.validity_period.join(" - ")), i.setData({
                cardDetail: n
            });
        });
    }
} ]);

Page(n);