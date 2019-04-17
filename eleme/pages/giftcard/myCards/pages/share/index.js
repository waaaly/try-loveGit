function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, a = t(require("../../js/statusMap")), i = t(require("../../../utils/api")), s = getApp(), n = s.services, r = n.User, o = n.HashToUrl, d = n.Ubt, u = {
    data: {
        content: "",
        cardNum: "",
        token: "",
        loading: !0,
        statusMap: a.default,
        isSelf: !0,
        isDisabled: !1,
        detail: {}
    },
    onLoad: function(t) {
        var e = t.cardNum, a = t.content, i = t.token;
        if (!r.id) return wx.redirectTo({
            url: "/pages/auth/index?successUrl=" + encodeURIComponent("/pages/giftcard/myCards/pages/share/index?cardNum=" + e + "&content=" + a + "&token=" + i)
        });
        this.setData({
            cardNum: e,
            content: a,
            token: i
        }), this.getDetail(!0);
    },
    parseDetail: function(t) {
        var a = t.picture, i = t.user_id, s = t.status, n = t.detail_json, u = void 0 === n ? {} : n, c = t.sku, l = void 0 === c ? {} : c, g = r.id === i, p = l.hongbaos, f = void 0 === p ? [] : p, h = l.add_hongbaos, v = void 0 === h ? [] : h;
        this.setData({
            detail: e({}, t, {
                status: String(s),
                picture: o(a, 622, 372),
                sku: e({}, l, {
                    hongbaos: f.concat(v)
                })
            }),
            isSelf: g
        }), 2 === s && g ? wx.setNavigationBarTitle({
            title: "留下祝福"
        }) : wx.setNavigationBarTitle({
            title: ""
        }), g || 5 !== u.new_card_status && 4 !== u.new_card_status || wx.redirectTo({
            url: "/pages/giftcard/myCards/index"
        }), 4 === s && u.receive_user_id !== r.id && this.setData({
            isDisabled: !0
        }), this.setData({
            loading: !1
        }), g && d.send({
            id: 102314
        });
    },
    getDetail: function(t) {
        var e = this, a = this.data, s = a.cardNum, n = a.token;
        return i.default.getGiftCardDetail({
            card_number: s,
            token: n,
            with_token: t
        }).then(function(t) {
            e.parseDetail(t);
        }).catch(function() {
            e.setData({
                loading: !1
            });
        });
    },
    sendUbt: function(t) {
        d.sendEvent({
            id: t.target.dataset.ubt,
            params: {
                status: this.data.content ? 1 : 0
            }
        });
    }
};

Page(s.extend([ u, require("../../components/owner/index.js"), require("../../components/receiver/index.js") ]));