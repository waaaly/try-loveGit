var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/api")), t = getApp().services, a = t.Ubt;

t.User;

Page({
    data: {
        card_number: "",
        validity_period: [],
        notices: [],
        loaded: !1
    },
    onLoad: function(t) {
        var a = this, n = t.card_number;
        e.default.getGiftCardDetail({
            card_number: n
        }).then(function(e) {
            var t = e.sku.notices, i = e.validity_period;
            i = i.map(function(e) {
                return e.replace(/-/g, "/");
            }), n = n.replace(/(.{4})/g, "$& "), a.setData({
                card_number: n,
                validity_period: i,
                notices: t,
                loaded: !0
            });
        }).catch(function(e) {
            a.setData({
                loaded: !0
            }), wx.showModal({
                title: e.name || "服务器君饿晕了",
                content: "",
                showCancel: !1
            });
        });
    },
    onShow: function() {
        a.sendPv();
    }
});