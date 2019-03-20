function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}

function e(t) {
    return !(t == _.NEED_UPDATE_PROFILE || t == _.NO_ASSET_HAS_ACCOUNT || t == _.UNBINED);
}

var i = t(require("../../common/ptag-constants.js")), a = require("../../../../api/Ptag/Ptag_utils.js"), n = require("../../../../api/Ptag/report_manager.js"), o = require("../../../../bases/component.js"), s = t(require("../../../../common/toast/toast.js")), r = t(require("./api.js")), c = t(require("../../../../common/utils.js")), f = t(require("../../../../common/modal/modal.js")), g = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../behaviors/attributes.js")), u = require("../../../components/message-box/index.js"), d = new (require("../../../../common/logger.js").Logger)("购物车-用户礼包组件"), l = getApp(), h = {
    DONG_QUAN: "0",
    JING_QUAN: "1",
    YUN_FEI_QUAN: "2"
}, _ = {
    NEED_UPDATE_PROFILE: 1,
    NO_ASSET_HAS_ACCOUNT: 2,
    SWITHCHABLE: 3,
    UNBINED: 4
};

new o.JDComponent({
    behaviors: [ g.default ],
    $giftABTest: !1,
    $needRefresh: !1,
    $pinState: "",
    $loading: !1,
    properties: {
        isEmptyCart: {
            type: Boolean
        }
    },
    data: {
        showGiftBar: !1,
        showGiftDetail: !1,
        showToUse: !1,
        gifts: [],
        totle: 0,
        pinState: ""
    },
    ready: function() {
        var t = this;
        this.page = getCurrentPages().pop();
        var e = this._getPageId();
        void 0 === this.$needRefresh && l.event.off("cart:cart-gift:refresh_" + e).on("cart:cart-gift:refresh_" + e, function() {
            t.initData();
        }), this.$needRefresh = !0, r.enableGift().then(function(e) {
            t.$giftABTest = e, t.initData();
        });
    },
    attached: function() {},
    methods: {
        initData: function() {
            var t = this;
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            r.QueryUserType.call(this).then(function(e) {
                t.data.isEmptyCart ? t.initEmptyCartGift(e) : t.initCartGift(e);
            });
        },
        initEmptyCartGift: function(t) {
            var e = this;
            t && t.activeId ? r.queryCoupons.call(this, {
                activeId: t.activeId
            }).then(function(t) {
                if (t && t.length > 0) {
                    var a = t[0].Level, o = t.filter(function(t) {
                        return t.Level == a;
                    });
                    o = o.length > 3 ? o.slice(0, 3) : o, o = e.formatGiftData(o), e.setData({
                        gifts: o,
                        showToUse: !1
                    }), n.ReportManager.addPtagExposure(i.EMPTY_CART_GIFT_SHOW);
                } else e.hideGift();
            }).catch(this.hideGift) : this.hideGift();
        },
        initCartGift: function(t) {
            var e = this;
            t && !t.isDefualtPin && t.activeId ? r.queryCoupons.call(this, {
                activeId: t.activeId
            }).then(function(t) {
                if (t && t.length > 0) {
                    var o = e.$giftABTest, s = t[0].Level, r = t.filter(function(t) {
                        return t.Level == s;
                    });
                    r = r.length > 3 ? r.slice(0, 3) : r, r = e.formatGiftData(r);
                    var c = 0, f = e._getPageId();
                    n.ReportManager.addPtagExposure(o ? i.CART_GIFT_A : i.CART_GIFT_B), l.event.emit("cart:onpay_" + f, function() {
                        a.PtagUtils.addPtag(o ? i.CART_GIFT_SETTLE_A : i.CART_GIFT_SETTLE_B);
                    }), r.forEach(function(t) {
                        c += +t.discount;
                    }), e.setData({
                        gifts: r || [],
                        showGiftBar: o,
                        showToUse: !1,
                        showGiftDetail: !1,
                        totle: c
                    });
                } else e.hideGift();
            }).catch(this.hideGift) : this.hideGift();
        },
        hideGift: function() {
            this.setData({
                showGiftBar: !1,
                showGiftDetail: !1,
                showToUse: !1,
                gifts: [],
                totle: 0
            });
        },
        closeGiftPanel: function(t) {
            this.hideGift(), l.event.emit("cartrefresh");
        },
        formatGiftData: function(t) {
            var e = [];
            return t && t.length > 0 && (e = t.map(function(t) {
                var e = t.DiscountQuota.split(","), i = "", a = "", n = "", o = "", s = "", r = t.Vender;
                switch (!0) {
                  case r == h.JING_QUAN:
                    n = "gift_quan jingquan", a = "京券", o = "￥", s = "满" + e[1] + "元可用";
                    break;

                  case r == h.DONG_QUAN:
                    n = "gift_quan dongquan", a = "东券", o = "￥", s = "满" + e[1] + "元可用";
                    break;

                  case r == h.YUN_FEI_QUAN:
                    n = "gift_quan yunfeiquan", o = "￥", a = "运费券", s = "满" + e[1] + "元可用";
                    break;

                  default:
                    n = "gift_quan dongquan", a = "东券", o = "￥", s = "满" + e[1] + "元可用";
                }
                if ("2" == t.ValidType) i = "自领取后" + t.CouponTime + "天内有效"; else {
                    var f = t.CouponTime.split(",");
                    i = f.length > 1 ? c.formatDate(1e3 * Number(f[0]), "yyyy.MM.dd") + " - " + c.formatDate(1e3 * Number(f[1]), "yyyy.MM.dd") : "";
                }
                return {
                    discount: e[0],
                    quota: e[1],
                    limitDesc: s,
                    c_type: n,
                    name: "全品类可用",
                    iconText: o,
                    prizeName: a,
                    timedesc: i,
                    isNewUserCoupon: t.isNewUserCoupon,
                    level: t.Level,
                    bingo: t.bingo,
                    key: t.active
                };
            })), e;
        },
        onTabGetGift: function(t) {
            var n = this;
            this.$loading || (this.$loading = !0, this.data.isEmptyCart ? a.PtagUtils.addPtag(i.EMPTY_CART_GIFT_DRAW) : a.PtagUtils.addPtag(i.CART_GIFT_DRAW), 
            r.queryPinStatus().then(function(t) {
                e(t.state || "") ? 1 == t.defaultFlag && _.SWITHCHABLE == t.state ? n.toSwitchAccoutt(t) : n.drawGift() : (n.tobindPin(), 
                n.$loading = !1);
            }).catch(function(t) {
                var e = r.couponMsg();
                s.show({
                    page: n.page,
                    icon: s.ICON.WARNING,
                    content: e
                }), n.$loading = !1;
            }));
        },
        tobindPin: function() {
            var t = this;
            this.data.isEmptyCart ? a.PtagUtils.addPtag(i.EMPTY_CART_GIFT_TO_BIND) : a.PtagUtils.addPtag(i.CART_GIFT_TO_BIND), 
            f.show({
                title: "",
                content: "领券前需先完善京东账号的手机号码哦",
                maxHeight: "360",
                align: "center",
                showCancel: !0,
                cancelText: "取消",
                cancelColor: "#000",
                confirmText: "去绑定",
                confirmColor: "red",
                success: function() {
                    getApp().event.emit("cartrefresh", !1, !1, !0), t.$goto("/pages/my_pages/account/account", {
                        sceneid: "521194431",
                        rurl: r.getCurrentPageRoute(),
                        bindactiveid: t.data.gifts[0].key,
                        bindlevel: t.data.gifts[0].level
                    });
                }
            });
        },
        toSwitchAccoutt: function(t) {
            var e = this;
            u.MessageBox.confirm({
                title: "您需要切换为正式京东账号才能领取礼包",
                buttons: [ {
                    text: "取消",
                    handler: function() {
                        u.MessageBox.hide(), e.$loading = !1;
                    }
                }, {
                    cls: "btn_red",
                    text: "立即切换",
                    handler: function() {
                        u.MessageBox.hide();
                        var i = t.pinList.find(function(t) {
                            return "0" == t.defaultFlag;
                        }), a = i ? i.pin : "";
                        r.switchAccount.call(e, a).then(function(t) {
                            e.initData(), getApp().event.emit("cartrefresh"), e.$loading = !1;
                        }).catch(function(t) {
                            d.error(t), s.show({
                                page: e.page,
                                icon: s.ICON.WARNING,
                                content: "切换失败，请稍后重试"
                            }), e.$loading = !1;
                        });
                    }
                } ]
            });
        },
        drawGift: function() {
            var t = this;
            this._showLoading();
            var e = {
                key: this.data.gifts[0].key,
                level: this.data.gifts[0].level
            };
            r.drawGifts.call(this, e).then(function(e) {
                var n = e.bingo, o = t.data.isEmptyCart, c = t.data.gifts;
                if (c.forEach(function(t) {
                    t.bingo = t.level == n.bingolevel;
                }), o) {
                    a.PtagUtils.addPtag(i.EMPTY_CART_GIFT_DRAW_SUCCESS);
                    var f = r.couponMsg(e);
                    s.show({
                        page: t.page,
                        icon: s.ICON.WARNING,
                        content: f,
                        duration: 3e3
                    }), t.setData({
                        showToUse: !0,
                        gifts: c
                    });
                } else a.PtagUtils.addPtag(i.CART_GIFT_DRAW_SUCCESS), t.setData({
                    showGiftBar: !1,
                    showGiftDetail: !0,
                    gifts: c
                });
                t.$loading = !1, t._hideLoading();
            }).catch(function(e) {
                t._hideLoading(), t.$loading = !1;
                var n = e.bingo || "", o = e.ret || n.bingoret || "", c = t.data.isEmptyCart ? i.EMPTY_CART_GIFT_DRAW_FAIL : i.CART_GIFT_DRAW_FAIL;
                if (o && a.PtagUtils.addPtag(c, {
                    code: o
                }), 163 == o) t.tobindPin(); else {
                    var f = r.couponMsg(e);
                    s.show({
                        page: t.page,
                        icon: s.ICON.WARNING,
                        content: f,
                        duration: 3e3
                    }), t.setData({
                        showGiftBar: !0,
                        showGiftDetail: !1,
                        showToUse: !1
                    });
                }
            });
        },
        onTabToUse: function() {
            a.PtagUtils.addPtag(i.EMPTY_CART_GIFT_TO_USE), this.$goto("/pages/cate/cate");
        }
    }
});