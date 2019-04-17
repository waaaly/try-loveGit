function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    }
    return t;
}, e = t(require("../../../utils/api")), r = t(require("./js/bgMap")), i = t(require("../../js/statusMap")), s = t(require("../../js/utils")), u = getApp(), d = u.services, n = d.HashToUrl, c = d.Ubt, l = {
    data: {
        linkLists: [],
        detail: {},
        bgMap: r.default,
        statusMap: i.default,
        loading: !0,
        cardNum: ""
    },
    onLoad: function(t) {
        var a = t.cardNum;
        this.setData({
            cardNum: a
        }), this.getDetail(a);
    },
    getDetail: function(t) {
        var r = this;
        return e.default.getGiftCardDetail({
            card_number: t
        }).then(function(t) {
            var e = t.picture, i = t.status, s = t.sku, u = void 0 === s ? {} : s, d = u.hongbaos, c = u.add_hongbaos;
            r.setData(a({}, t, {
                picture: n(e, 622, 373),
                status: String(i),
                sku: a({}, u, {
                    hongbaos: d.concat(c)
                }),
                linkLists: r.getLinkLists(t)
            })), r.setData({
                loading: !1
            });
        }).catch(function() {
            r.setData({
                loading: !1
            });
        });
    },
    getLinkLists: function(t) {
        var a = t.status, e = t.kind, r = this.data.cardNum, i = [ {
            title: "购买心意卡",
            ubt: 102325,
            url: "/pages/giftcard/index"
        }, {
            title: "使用详情",
            ubt: 102326,
            url: "/pages/giftcard/cardDetail/records/records?card_number=" + this.data.cardNum
        }, {
            title: "心意卡详情",
            ubt: 102322,
            url: "/pages/giftcard/cardDetail/info/info?card_number=" + this.data.cardNum
        } ];
        return 2 === a && i.unshift({
            title: "赠送好友",
            ubt: 102324,
            url: "/pages/giftcard/myCards/pages/share/index?cardNum=" + r
        }), 2 === e ? [ {
            title: "查看收到的祝福",
            ubt: 102323,
            url: "/pages/giftcard/cardDetail/index?cardNum=" + r
        } ].concat(i) : i;
    },
    sendUbt: function(t) {
        var a = t.target.dataset.ubt;
        c.sendEvent({
            id: a,
            params: {
                cardid: this.data.cardNum
            }
        });
    },
    useGiftCard: function() {
        c.sendEvent({
            id: 102327
        }), s.default.useGiftCard({
            card_number: this.data.cardNum
        });
    }
};

Page(u.extend([ l ]));