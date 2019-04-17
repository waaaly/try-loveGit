function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
        return n;
    }
    return Array.from(t);
}

var e = function() {
    function t(t, e) {
        var n = [], i = !0, a = !1, o = void 0;
        try {
            for (var r, s = t[Symbol.iterator](); !(i = (r = s.next()).done) && (n.push(r.value), 
            !e || n.length !== e); i = !0) ;
        } catch (t) {
            a = !0, o = t;
        } finally {
            try {
                !i && s.return && s.return();
            } finally {
                if (a) throw o;
            }
        }
        return n;
    }
    return function(e, n) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), n = require("./js/constants"), i = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./js/api")), a = getApp().services, o = a.Ubt, r = a.Location, s = a.User;

a.Geohash;

Page({
    data: {
        defaultRules: n.defaultRules,
        isModalShow: !1,
        overview: [],
        carouseLists: [],
        detail: [],
        isDetailShow: !1,
        isConfirmModalShow: !1,
        isAlidayCity: !1,
        keyNum: 0,
        token: "",
        imagesUrl: n.imagesUrl,
        notFirstIn: !1,
        inviteCode: "",
        loading: !0,
        lotterying: !1,
        isLotteryModalShow: !1,
        hongbao: {},
        amount: [],
        description: {}
    },
    onLoad: function(t) {
        var e = this;
        this.setData({
            notFirstIn: wx.getStorageSync("NOT_FIRDT_IN")
        });
        var n = (t || {}).inviteCode;
        this.setData({
            inviteCode: n
        }), i.default.getRules().then(function(t) {
            var n = t.data;
            e.setData({
                defaultRules: n.rules
            });
        });
    },
    onShow: function() {
        var n = this, a = s.id;
        if (!a) return wx.redirectTo({
            url: "/pages/auth/index?successUrl=" + encodeURIComponent("/pages/freedinner/index?inviteCode=" + this.data.inviteCode)
        });
        this.getLoaction().catch(function() {}).then(function(t) {
            return Promise.all([ i.default.getCarouselData(), i.default.getRecord(t, a).catch(function() {}), i.default.getPrizeStatus(t, a), i.default.getToken(t, a), i.default.isAlidayCity(t, a).catch(function() {}), n.assistFriend(t, a) ]);
        }).then(function(i) {
            var a = e(i, 5), o = a[0], r = a[1], s = a[2].key_num, u = a[3], c = a[4], d = [];
            r && r.forEach(function(e) {
                d.push.apply(d, t(e.friends_list));
            }), n.setData({
                carouseLists: o.slice(0, 5),
                overview: d.slice(0, 4),
                detail: d.slice(4),
                keyNum: s,
                loading: !1,
                isAlidayCity: c,
                token: u
            }), wx.setStorageSync("NOT_FIRDT_IN", !0);
        }).catch(function() {
            n.setData({
                loading: !1
            });
        });
    },
    assistFriend: function(t, e) {
        return this.data.inviteCode ? i.default.assistFriend(t, e, this.data.inviteCode).catch(function() {}) : Promise.resolve();
    },
    onShareAppMessage: function(t) {
        return {
            title: "邀请好友来抽奖",
            imageUrl: n.imagesUrl.shareBg,
            path: "/pages/freedinner/index?inviteCode=" + this.data.token
        };
    },
    getLoaction: function() {
        var t = (wx.getStorageSync("PLACE") || {}).geohash;
        return t ? Promise.resolve(t) : r().then(function(t) {
            return wx.setStorageSync("PLACE", t), t.geohash;
        });
    },
    closeModal: function() {
        this.setData({
            isModalShow: !1,
            isConfirmModalShow: !1,
            isLotteryModalShow: !1
        });
    },
    openRules: function() {
        this.setData({
            isModalShow: !0
        });
    },
    openDetail: function() {
        this.setData({
            isDetailShow: !this.data.isDetailShow
        });
    },
    drawLottery: function() {
        var t = this;
        if (0 === this.data.keyNum) return this.setData({
            isConfirmModalShow: !0
        });
        this.setData({
            lotterying: !0
        }), this.getLoaction().catch(function() {}).then(function(t) {
            return i.default.acceptHongbao(t, s.id);
        }).then(function(e) {
            t.setData({
                hongbao: e,
                amount: String(e.amount).split(".")
            });
        }).then(this.setDescription).then(function() {
            t.setData({
                lotterying: !1,
                isLotteryModalShow: !0
            });
        }).catch(function() {}), o.sendEvent({
            id: 102352
        });
    },
    setDescription: function() {
        var t = this, e = this.data.hongbao, a = e.is_free_order_prize, o = e.name;
        this.getLoaction().catch(function() {}).then(function(t) {
            return i.default.getPrizeStatus(t, s.id);
        }).then(function(e) {
            var i = e.key_num;
            t.setData({
                keyNum: i
            }), a ? t.setData({
                description: n.lotteryMap.FREE
            }) : o ? t.setData({
                description: i > 0 ? n.lotteryMap.SMALL : n.lotteryMap.INVITE
            }) : t.setData({
                description: i > 0 ? n.lotteryMap.EMPTY : n.lotteryMap.EMPTY_INVITE
            });
        }).catch(function() {});
    },
    useHongbao: function() {
        wx.navigateBack(), o.sendEvent({
            id: 102700
        });
    },
    handleTap: function() {
        this.closeModal(), this.data.keyNum > 0 ? o.sendEvent({
            id: 102698
        }) : o.sendEvent({
            id: 102699
        });
    }
});