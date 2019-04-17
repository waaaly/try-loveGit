function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../utils/api")), i = t(require("./js/statusMap")), e = t(require("./js/utils")), s = getApp(), n = s.services, r = n.User, d = n.HashToUrl, u = n.Ubt, l = {
    data: {
        lists: [],
        statusMap: i.default,
        loadedAll: !1,
        loading: !0,
        limit: 10,
        page: 1,
        waiting: !1
    },
    onLoad: function(t) {
        var a = t.isWaiting;
        if (!r.id) return wx.redirectTo({
            url: "/pages/auth/index?successUrl=/pages/giftcard/myCards/index"
        });
        a && this.setData({
            waiting: !0
        });
    },
    onShow: function() {
        var t = this;
        this.setData({
            lists: [],
            page: 1,
            loadedAll: !1
        }), this.data.waiting ? setTimeout(function() {
            t.setData({
                waiting: !1
            }), t.getLists();
        }, 3300) : this.getLists();
    },
    onReachBottom: function() {
        this.getLists();
    },
    navigateToDetail: function(t) {
        var a = t.currentTarget.dataset.card_number;
        u.sendEvent({
            id: 102319,
            params: {
                cardid: a
            }
        }), wx.navigateTo({
            url: "/pages/giftcard/myCards/pages/detail/index?cardNum=" + a
        });
    },
    getLists: function() {
        var t = this, i = this.data, e = i.lists, s = i.loadedAll, n = i.limit, r = i.page, u = i.loading;
        if (!s) return this.loading = !0, a.default.getGiftCardLists(r, n).then(function(a) {
            a = a.map(function(t) {
                return Object.assign(t, {
                    status: String(t.status),
                    picture: d(t.picture, 190, 114)
                });
            }), t.setData({
                page: ++r,
                lists: e.concat(a),
                loadedAll: a.length < n || e.length >= 290
            }), u && t.setData({
                loading: !1
            });
        }).catch(function(a) {
            t.setData({
                loading: !1
            });
        });
    },
    giveGiftCard: function(t) {
        var a = t.target.dataset;
        u.sendEvent({
            id: 102320,
            params: {
                cardid: a.card_number
            }
        });
    },
    useGiftCard: function(t) {
        var a = t.target.dataset;
        u.sendEvent({
            id: 102321,
            params: {
                cardid: a.card_number
            }
        }), e.default.useGiftCard(a);
    }
};

Page(s.extend([ l ]));