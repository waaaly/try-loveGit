var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/api")), e = getApp().services, a = e.Ubt;

e.User;

Page({
    data: {
        status: 0,
        status_text: "",
        balance: null,
        records: [],
        loaded: !1
    },
    onLoad: function(e) {
        var a = this, s = e.card_number;
        t.default.getGiftCardDetail({
            card_number: s
        }).then(function(t) {
            var e = t.status, s = t.detail_json, n = s.records, o = void 0 === n ? [] : n, r = s.balance, u = t.status_text;
            u = -3 === e ? "已过期" : 4 === e ? "已赠送" : 3 === e ? "赠送中" : 5 === e ? 0 === r ? "已用完" : "当前余额" : 2 === e ? "当前余额" : "处理中", 
            o = o.length && a.parseRecords(o), a.setData({
                status: e,
                status_text: u,
                balance: r,
                records: o,
                loaded: !0
            });
        }).catch(function(t) {
            a.setData({
                loaded: !0
            }), wx.showModal({
                title: t.name || "服务器君饿晕了",
                content: "",
                showCancel: !1
            });
        });
    },
    parseRecords: function(t) {
        return t.map(function(t) {
            var e = t.datetime, a = t.symbol, s = t.amount;
            return a = s > 0 ? "+ ¥ " : "- ¥ ", s = Math.abs(s), {
                datetime: e,
                symbol: a,
                amount: s
            };
        });
    },
    onShow: function() {
        a.sendPv();
    }
});