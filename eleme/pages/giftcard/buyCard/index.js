var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    }
    return t;
}, a = getApp().services, e = a.Ubt, n = (a.imageHash, a.User), i = a.HashToUrl, r = require("../utils/api"), s = require("../utils/pay"), o = require("../utils/getUserInfo"), u = {
    plus: 1,
    minus: -1
}, d = {
    title: "授权提示",
    content: "若需购买礼品卡，饿了么需要获取你的公开信息（昵称、头像等）",
    cancelText: "拒绝",
    confirmText: "授权"
}, c = {
    amount: 0,
    price: 0
};

Page({
    data: {
        total: c
    },
    onLoad: function(t) {
        var a = t.id;
        this.getCardDetail(a), this.setData({
            themeId: a
        });
    },
    onShow: function() {
        e.sendPv();
    },
    onShareAppMessage: function() {
        return {
            title: "购买心意卡",
            path: "/pages/giftcard/buyCard/index?id=" + this.data.themeId
        };
    },
    getCardDetail: function(t) {
        var a = this;
        r.getCardDetail(t).then(function(t) {
            var e = t.data, n = e.pictures, r = e.skus, s = e.attribute_json, o = n.map(function(t) {
                return {
                    hash: t,
                    url: i(t, 622, 372)
                };
            });
            a.setData({
                pictures: o,
                skus: r,
                selectedCard: o[0],
                couponTitle: (s || {}).coupon_name
            });
        });
    },
    chooseCard: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            toView: a,
            selectedCard: this.data.pictures[a]
        }), e.sendEvent({
            id: 102309
        });
    },
    plus: function(t) {
        this.doAction(t.currentTarget.dataset.index, "plus");
    },
    minus: function(t) {
        this.doAction(t.currentTarget.dataset.index, "minus");
    },
    doAction: function(t, a) {
        var n = this.data.skus;
        n[t].amount = (n[t].amount || 0) + u[a], this.setData({
            skus: n
        }), this.calculateTotal(), e.sendEvent({
            id: 102310,
            params: {
                cardId: n[t].id
            }
        });
    },
    calculateTotal: function() {
        var t = this.data.skus.reduce(function(t, a) {
            return {
                amount: t.amount + (a.amount || 0),
                price: t.price + (a.amount || 0) * a.face_value
            };
        }, c);
        this.setData({
            total: t
        });
    },
    buyCard: function() {
        var a = this;
        if (!n.id) {
            var i = this.data.themeId;
            return wx.redirectTo({
                url: "/pages/auth/index?successUrl=" + encodeURIComponent("/pages/giftcard/buyCard/index?id=" + i)
            });
        }
        this.data.total.amount && (e.sendEvent({
            id: 102312
        }), o(d).then(function(e) {
            var n = e.userInfo;
            wx.showLoading({
                title: "正在提交"
            });
            var i = n.nickName, r = n.avatarUrl, s = t({}, a.getSubmitData(), {
                user_info: {
                    nick_name: i,
                    avatar_url: r
                }
            });
            a.makeOrder(s);
        }).catch(function(t) {
            "AUTH_FAILED" === t.name && wx.showToast({
                title: t.message,
                icon: "none"
            });
        }));
    },
    makeOrder: function(t) {
        r.makeOrder(t).then(function(t) {
            wx.hideLoading(), s(t.data.order_id).then(function() {
                wx.redirectTo({
                    url: "/pages/giftcard/myCards/index?isWaiting=" + !0
                });
            }).catch(function(t) {
                wx.showToast({
                    title: "支付失败",
                    icon: "none"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "/pages/giftcard/index"
                    });
                }, 1e3);
            });
        }).catch(function(t) {
            wx.hideLoading(), wx.showToast({
                title: "下单失败",
                icon: "none"
            });
        });
    },
    getSubmitData: function() {
        return {
            group: this.data.skus.filter(function(t) {
                return !!t.amount;
            }).map(function(t) {
                return {
                    sku_id: t.id,
                    quantity: t.amount
                };
            }),
            picture: this.data.selectedCard.hash
        };
    },
    goToCardDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        e.sendEvent({
            id: 102311,
            params: {
                cardId: a
            }
        }), wx.navigateTo({
            url: "/pages/giftcard/buyCard/cardDetail/index?id=" + a + "&themeId=" + this.data.themeId
        });
    }
});