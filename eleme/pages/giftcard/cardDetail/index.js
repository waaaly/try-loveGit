var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var r = arguments[a];
        for (var e in r) Object.prototype.hasOwnProperty.call(r, e) && (t[e] = r[e]);
    }
    return t;
}, a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../utils/api")), r = getApp().services, e = (r.Ubt, r.User, r.HashToUrl);

Page({
    data: {
        cardNum: 0,
        loading: !0
    },
    onLoad: function(t) {
        var a = t.cardNum;
        this.setData({
            cardNum: a
        });
    },
    onShow: function() {
        var r = this;
        a.default.getGiftCardDetail({
            card_number: this.data.cardNum
        }).then(function(a) {
            r.setData(t({
                loading: !1
            }, a, {
                picture: e(a.picture, 622, 373)
            }));
        }).catch(function() {
            r.setData({
                loading: !1
            });
        });
    }
});