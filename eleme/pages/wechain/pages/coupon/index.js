var t = require("../../lib/api"), e = require("../../lib/store"), n = getApp().services, o = (n.Geohash, 
n.Ubt), a = (n.imageHash, n.Location, n.HashToUrl), i = n.User, s = {
    listOffset: 0,
    sign: "",
    data: {
        loading: !1,
        totalAmount: 0,
        showCashPopup: !1,
        loadNoMore: !1,
        coupons: []
    },
    onLoad: function(t) {
        var e = t.group_sn, n = t.refer_id;
        this.sn = e, this.referId = n, wx.showShareMenu({
            withShareTicket: !0
        }), this.queryCoupons();
    },
    closeCashPopup: function() {
        this.setData({
            showCashPopup: !1
        }), wx.redirectTo({
            url: "/pages/wechain/pages/coupon/index"
        });
    },
    queryCoupons: function() {
        var n = this;
        this.data.loadNoMore || (this.setData({
            loadError: !1
        }), t.queryCouponList({
            user_id: i.id,
            latitude: e.latitude,
            longitude: e.longitude,
            limit: 20,
            offset: this.data.coupons.length,
            rank_id: this.couponRankId,
            device_id: i.open_id,
            extras: [ "activities" ]
        }).then(function(t) {
            var e = t.data.items;
            e.forEach(function(t) {
                return t.restaurant.image_url = a(t.restaurant.image_path);
            }), n.setData({
                loadNoMore: !e.length,
                coupons: n.data.coupons.concat(e)
            }), o.sendEvent({
                id: 103458,
                params: {
                    num: e.length
                }
            }), e.length < 20 && n.setData({
                loadNoMore: !0
            }), n.couponRankId || (n.couponRankId = t.data.rank_id);
        }).catch(function(t) {
            console.log(t), n.setData({
                loadError: !0
            });
        }));
    },
    onShareAppMessage: function(n) {
        var a = this, i = function() {
            return new Promise(function(t, e) {
                wx.login({
                    success: t,
                    fail: e
                });
            });
        }, s = function() {
            var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, s = o.iv, r = o.encryptedData, u = arguments[1], d = a.latitude, c = a.longitude, h = n.target.dataset, p = h.restaurant_id, l = h.activity_id;
            i().then(function(n) {
                var o = {
                    code: n.code,
                    restaurant_id: p,
                    iv: s,
                    encrypted_data: r,
                    wx_group_id: u,
                    latitude: d,
                    longitude: c,
                    group_sn: e.group_sn
                };
                return t.shareBonusAndCoupon(l, o);
            }).then(function(t) {
                var e = t.data, n = e.promotion_amount, o = e.bonus_amount, i = e.total_bonus_amount, s = {};
                s = -1 === o ? {
                    title: "今日已领" + i,
                    bottomTip: [ "好友只需领取红包并下单，你就赚现金" ],
                    bottomButton: "发红包 赚现金",
                    overflow: !0
                } : {
                    coupon: n,
                    cash: o,
                    bottomTip: [ "分享到不同的「群聊」", "百分百再赚¥0.1~10现金" ],
                    bottomButton: "继续赚好礼"
                }, a.setData({
                    showCashPopup: !0,
                    cashConfig: s
                });
            }).catch(console.error);
        };
        return {
            title: e.crayfish.shareTitle,
            imageUrl: e.crayfish.shareImage,
            path: "/pages/wechain/index?group_sn=" + e.group_sn + "&refer_id=" + e.refer_id,
            success: function(t) {
                o.sendEvent({
                    id: 103456,
                    params: {
                        status: 1
                    }
                });
                try {
                    var e = t.shareTickets[0];
                    wx.getShareInfo({
                        shareTicket: e,
                        success: function(t) {
                            s(t, e);
                        }
                    });
                } catch (t) {
                    s();
                }
            },
            fail: function() {
                o.sendEvent({
                    id: 103456,
                    params: {
                        status: 0
                    }
                });
            }
        };
    },
    openInvite: function() {
        o.sendEvent({
            id: 102778
        });
        var t = "https://h5.ele.me/commend/#/progress/0?ssi=" + i.SID;
        wx.navigateTo({
            url: "/pages/container/index?outlink=retail&&shareLink=" + encodeURIComponent(t)
        });
    },
    shareCoupon: function(t) {
        var e = t.target.dataset, n = e.index, a = e.restaurant_id;
        o.sendEvent({
            id: 102777,
            params: {
                index: n,
                shopid: a
            }
        });
    },
    withdraw: function() {
        var t = "https://h5.ele.me/commend/#/withdraw/0?ssi=" + i.SID;
        wx.navigateTo({
            url: "/pages/container/index?outlink=retail&&shareLink=" + encodeURIComponent(t)
        });
    },
    onReachBottom: function() {
        this.queryCoupons();
    },
    openRulePage: function() {
        o.sendEvent({
            id: 102776
        }), wx.navigateTo({
            url: "/pages/wechain/pages/rule/index"
        });
    },
    toast: function(t) {
        wx.showToast({
            title: t,
            icon: "none",
            duration: 1200
        });
    }
};

Page(s);