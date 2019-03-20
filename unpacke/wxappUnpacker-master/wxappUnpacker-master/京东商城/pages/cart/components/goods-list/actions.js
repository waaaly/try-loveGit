function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}

function e(t) {
    if (Array.isArray(t)) {
        for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
        return i;
    }
    return Array.from(t);
}

function i(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = function() {
    function t(t, e) {
        var i = [], o = !0, n = !1, a = void 0;
        try {
            for (var r, s = t[Symbol.iterator](); !(o = (r = s.next()).done) && (i.push(r.value), 
            !e || i.length !== e); o = !0) ;
        } catch (t) {
            n = !0, a = t;
        } finally {
            try {
                !o && s.return && s.return();
            } finally {
                if (n) throw a;
            }
        }
        return i;
    }
    return function(e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), n = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o]);
    }
    return t;
}, a = require("../../../../api/Ptag/Ptag_utils.js"), r = require("../../../../api/Ptag/report_manager"), s = t(require("../../models/model")), u = t(require("../../common/ptag-constants")), c = require("../../../../common/logger"), d = t(require("../../../../common/toast/toast")), h = require("../../common/select-mode"), g = t(require("../../../../common/modal/modal")), p = t(require("../../models/freight")), l = t(require("../../../../common/cookie-v2/cookie")), m = t(require("../../cart/utils")), f = require("../../../components/message-box/index"), v = t(require("../../../../common/user_info")), _ = require("../../models/data-store.js"), I = require("../../../../common/numberp"), P = require("../../cart/utils.js"), y = _.DataStore.POLY_TYPES, S = _.DataStore.getSummaryCache, C = getApp(), T = new c.Logger("购物车商品列表");

exports.default = Behavior({
    _cacheCouponsData: null,
    data: {
        sticky: {}
    },
    methods: {
        onPageScroll: function(t) {
            m.judgeForPageScroll(this._judgeForPageScroll.bind(this, t)), this._toggleTarBarFixed(t);
        },
        onRecommendReady: function(t) {
            var e = t.detail, i = this.data.venders && this.data.venders.length, o = e.recList[i ? 1 : 0].recid;
            o && this.setData({
                recommendOptions: {
                    recommendId: o,
                    skus: []
                }
            }), this._hideLoading();
        },
        onRecommendAfterAdd2Cart: function(t) {
            var e = t.detail;
            e.success && (a.PtagUtils.addPtag("7014.18.114", {
                sku_id: e.skuId
            }), C.event.emit("cartrefresh", {
                scrollIntoView: e.domId
            }));
        },
        onRecommendClick: function(t) {
            !(this.data.venders && this.data.venders.length) && r.ReportManager.addPtagExposure("7014.18.42");
        },
        _judgeForPageScroll: function(t) {
            this._sticky(t);
        },
        _sticky: function(t) {
            var e = this._toggleBack2Top(t);
            e && this.setData(e);
        },
        _toggleTarBarFixed: function(t) {
            var e = this._getDataSet(t).scrollTop;
            this.scrollTop || (this.scrollTop = 0);
            var i = Math.abs(e - this.scrollTop) > 5, o = !this.marginFixed && e < this.scrollTop && e > 100, n = !this.data.editable && o != this.tobarFixed && i;
            this.data.editable ? (this.tobarFixed && (this.scrollTop = 9999999), !this.tobarFixed && (this.scrollTop = 0)) : (i && (this.tobarFixed = o), 
            i && (this.scrollTop = e)), n && this.triggerEvent("toggletarbarfixed", {
                fixed: o
            });
        },
        _toggleBack2Top: function(t) {
            var e = this._getDataSet(t).scrollTop > (1 * C.systemInfo.screenHeight || 667), i = this.data.back2topVisabled !== e;
            return i && this.setData({
                back2topVisabled: e
            }), !!i && {
                back2topVisabled: e
            };
        },
        back2top: function() {
            wx.pageScrollTo({
                scrollTop: 0
            }), this.setData({
                scrollIntoView: "top",
                back2topVisabled: !1
            });
        },
        _getProductOption: function(t, e) {
            var i = null, o = s.queryProductByUUID(t);
            return o && (o.type = e, i = {
                apiName: 1 == o.checkType ? "uncheckCmdy" : "checkCmdy",
                params: n({}, o)
            }), i;
        },
        _getVenderOption: function(t, e) {
            var i = null, o = s.getVenderById(t);
            return o && (o.type = e, i = {
                apiName: o.checked ? "uncheckCmdy" : "checkCmdy",
                params: n({}, o)
            }), i;
        },
        _getDataSet: function(t) {
            return n({}, t.currentTarget.dataset, t.target.dataset, t.detail);
        },
        onCheck: function(t) {
            var e = this, r = this._getDataSet(t), c = r.uuid, g = r.type, p = r.vid, l = r.summary;
            this._showLoading();
            var f = null;
            if ("all" == g && (f = {
                apiName: l.checked ? "uncheckCmdy" : "checkCmdy",
                params: {
                    type: g
                }
            }), "product" == g && (f = this._getProductOption(c, g)), "vender" == g && (f = this._getVenderOption(p, g)), 
            !f) return T.error("未找到数据，可能是参数错误，请检查"), this._hideLoading(), d.show({
                page: this.page,
                icon: d.ICON.WARNING,
                content: "操作发生点意外，请下拉刷新后再试"
            });
            m.sequence([ s[f.apiName].bind(this, f.params), s.getYbItems ]).then(function(r) {
                var c = o(r, 2), d = c[0], l = c[1];
                e.updateSummary(d.summary, t), C.event.emit("cartrefresh", {
                    localData: d
                }, !1);
                var m = e._getFreightData(d.freight);
                if (e.data.graySwitch = d.graySwitch, e._showVenderCoupons(!0), "all" == g) return a.PtagUtils.addPtag(u.CART_CHECK_ALL), 
                Object.assign(d, m, {
                    services: l
                }), h.SelectMode.fill(d), e.setData(d, function() {
                    e._hideLoading(), e.onRefreshOptionPromo();
                });
                if ("vender" == g) {
                    var f, v = s.getVenderById(p);
                    return e.setData(n((f = {}, i(f, "venders[" + v.index + "].checked", d.venders[0].checked), 
                    i(f, "venders[" + v.index + "].list", d.venders[0].list), f), m, {
                        partition: d.partition,
                        services: l
                    }), function() {
                        e._hideLoading(), e.onRefreshOptionPromo();
                    });
                }
                if ("product" == g) {
                    a.PtagUtils.addPtag(u.CART_CHECK);
                    var _ = n({}, m, {
                        partition: d.partition
                    });
                    return d.venders.forEach(function(t) {
                        Object.assign(_, i({
                            services: l
                        }, "venders[" + t.index + "].checked", t.checked)), t.list.forEach(function(e) {
                            Object.assign(_, i({}, "venders[" + t.index + "].list[" + e.itemIndex + "]", e));
                        });
                    }), e.setData(_, function() {
                        e._hideLoading(), e.onRefreshOptionPromo();
                    });
                }
            }).catch(function(t) {
                if ("all" == g) {
                    var i = getCurrentPages().pop();
                    e.updateSummary(i.data.summary);
                }
                T.error(t), d.show({
                    page: e.page,
                    icon: d.ICON.WARNING,
                    content: t.message
                }), e._hideLoading();
            });
        },
        onEditCheck: function(t) {
            var e = n({}, t.currentTarget.dataset, t.target.dataset, t.detail), i = e.uuid, o = e.type, a = e.vid, r = e.checked, s = i || a, u = h.SelectMode.select(o, s, !r);
            return this.updateSummary(u.summary), this.setData(u);
        },
        showCouponPanel: function(t) {
            var e = t.currentTarget.dataset.vid, i = this.cacheCoupons[e] ? this.cacheCoupons[e].coupoVo : [], o = this.selectComponent("#popCouponsPanel");
            o && o.show({
                list: i,
                vid: e
            });
            var n = i.find(function(t) {
                return 1 == t.vcouponType && 1 == t.couponSrc && 1 == t.couponDo;
            });
            n && (a.PtagUtils.addPtag(u.CART_COUPON_RED_PACKET_CLK, {
                venderId: e,
                activeId: n.roleId
            }), r.ReportManager.addPtagExposure(u.CART_COUPON_RED_PACKET_LIST, {
                venderId: e,
                activeId: n.roleId
            }));
        },
        onCouponDrawAfter: function(t) {
            var e = t.detail.currentTarget.dataset, i = e.vid, o = e.key, n = this.cacheCoupons[i];
            if (n) {
                var r = n.coupoVo.find(function(t) {
                    return t.encryptedKey === o;
                });
                r && (r.couponDo = "2", 1 == r.vcouponType && 1 == r.couponSrc && a.PtagUtils.addPtag(u.CART_COUPON_RED_PACKET_LIST_CLK, {
                    venderId: i,
                    activeId: r.roleId
                })), this._showVenderCoupons(!0);
            }
        },
        onCouponPanelClose: function(t) {
            this.setData({
                couponsData: {
                    list: []
                }
            });
        },
        onGiftsSubmit: function(t) {
            var e = this, o = t.hasChanged, a = void 0 !== o && o, r = t.selections, u = void 0 === r ? [] : r, c = t.product;
            a && s.addCmdy(s.ACTIONS.GIFT_3C, n({}, c, {
                listSelectGiftPoolGiftIds: u
            })).then(function(t) {
                C.event.emit("cartrefresh", {
                    localData: t
                }, !1);
                var o = {};
                t.venders.forEach(function(t) {
                    t.list.forEach(function(e) {
                        Object.assign(o, i({}, "venders[" + t.index + "].list[" + e.itemIndex + "]", e));
                    });
                }), e.setData(o, function() {
                    return e.onRefreshOptionPromo();
                }), (0, P.nextTick)(function() {
                    e.toast.show({
                        page: e.page,
                        icon: e.toast.ICON.SUCCESS,
                        content: "赠品更改成功"
                    });
                });
            }).catch(function(t) {
                T.error(t), e.toast.show({
                    page: e.page,
                    icon: d.ICON.WARNING,
                    content: t.message || "赠品更改失败，请稍候再试"
                });
            });
        },
        gotoSharePage: function() {
            var t = l.getCookie("nickName");
            this.$goto("/pages/h5/index", {
                url: "https://wqs.jd.com/my/cart/cart_share_v2.shtml?wxname=" + t
            });
        },
        gotoSimilarPage: function(t) {
            var e = t.currentTarget.dataset.sku;
            a.PtagUtils.addPtag(u.CART_SIMILAR_CLK), this.$goto("/pages/h5/index", {
                url: "https://wqs.jd.com/search/searchsimilar.shtml?sceneid=3&sku=" + e + "&ptag=" + u.CART_GOTO_SIMILAR_PAGE
            });
        },
        gotoAttachmentsDetail: function(t) {
            var e = t.currentTarget.dataset.skuId;
            if (!e) throw Error("sku:" + e + "，未找到附件");
            return a.PtagUtils.addPtag(u.CART_GOTO_ATTACH_DETAIL), this.$gotoItem({
                sku: e
            });
        },
        gotoGiftDetail: function(t) {
            var e = t.currentTarget.dataset, i = e.skuId, o = e.uuid, n = {
                sku: i
            };
            if (!i && !o) throw Error("sku:" + i + "，未找到赠品");
            if (o) {
                var r = s.queryProductByUUID(o);
                return a.PtagUtils.addPtag(u.CART_3C_GIFT_CLK), this.$goto("../subpack/gifts/index", {
                    product: r,
                    onSubmit: this.onGiftsSubmit.bind(this)
                });
            }
            return a.PtagUtils.addPtag(u.CART_GOTO_GIFT_DETAIL), this.$gotoItem(n);
        },
        gotoItemDetail: function(t) {
            if (!this.data.editable) {
                var e = t.currentTarget.dataset, i = e.uuid, o = e.shopId, n = void 0 === o ? "" : o, r = i.split(/_/), c = r[r.length - 1], d = s.queryProductByUUID(i);
                if (!c || !d) return T.error("uuid:", i, "未找到商品信息");
                var h = {
                    sku: c,
                    cover: d.mainSku.image,
                    name: d.mainSku.name,
                    price: d.price / 100,
                    shopId: n
                }, g = 1 == d.mainSku.isPinGouGoods, p = 1 == d.mainSku.isJdJx;
                a.PtagUtils.addPtag(u.CART_GOTO_DETAIL);
                var l = this.data.pinGouInfos, m = t.hasPingouRepord;
                !(void 0 !== m && m) && l && l[c] && a.PtagUtils.addPtag(u.CART_PINGOU_TO_DETAIL), 
                this.$gotoItem(h, {
                    isPingou: g,
                    isJx: p
                });
            }
        },
        onTapPingouTag: function(t) {
            a.PtagUtils.addPtag(u.CART_PINGOU_CLK), Object.assign(t, {
                hasPingouRepord: !0
            }), this.gotoItemDetail(t);
        },
        gotoPopItemDetail: function(t) {
            var e = {
                sku: t.currentTarget.dataset.sku
            };
            a.PtagUtils.addPtag(u.CART_GOTO_DETAIL), this.$gotoItem(e);
        },
        gotoPromotionPage: function(t) {
            var e = this._getDataSet(t).itemId, i = s.queryItemByItemId(e);
            if (!i) return T.error("未找到有效的促销商品");
            var o = i.promotion.pid, n = i.suits.length ? i.suits : i.products, r = +i.addMoney > 0;
            if (24 == i.fullType) return a.PtagUtils.addPtag(u.CART_MH_CLK), a.PtagUtils.addPtag(u.CART_MZ_CLK), 
            this.$goto("/pages/search/subPackages/exchange/index", {
                activityId: o,
                from: "cart",
                ptag: u.CART_GOTO_EXCHANGE_PAGE
            });
            if (o && n.length) {
                var c = n.find(function(t) {
                    return "" != t.selectPromotion.value;
                }).selectPromotion.value || "", d = 3 == i.polyType ? 0 : 4 == i.polyType ? r ? 2 : 1 : void 0;
                return "查看活动" == i.actLineTitle || "去凑单" == i.actLineTitle ? a.PtagUtils.addPtag(u.CART_ADDON_ITEM_CLK) : a.PtagUtils.addPtag(u.CART_JGJ_CLK), 
                this.$goto("/pages/search/subPackages/sales/sales", {
                    actId: o,
                    tips: c,
                    ptag: r ? u.CART_DISCOUNT_PAGE : u.CART_GIFT_PAGE,
                    promoType: d
                });
            }
        },
        gotoShopPage: function(t) {
            var e = t.currentTarget.dataset.vid, i = s.getVenderById(e), o = i.vname, n = i.icon;
            if (("type_3rd" == n || "type_good" == n || "type_cate_good" == n) && o) return this.$goto("/pages/store/index/index", {
                venderId: e,
                shopName: o
            });
        },
        gotoCouponPromotion: function(t) {
            var e = t.currentTarget.dataset, i = e.batchId, o = e.couponKind, n = e.beginTime, r = void 0 === n ? 0 : n, s = e.endTime, c = void 0 === s ? 0 : s, d = 0 == o ? "/pages/cate/cate" : "/pages/search/subPackages/coupon/coupon";
            0 != o && a.PtagUtils.addPtag(u.CART_COUPON_ADDON_CLK), this.$goto(d, {
                batch: i,
                from: "cart",
                kind: o,
                beginTime: r,
                endTime: c
            });
        },
        showPromotionPanel: function(t) {
            a.PtagUtils.addPtag(u.CART_CLICK_PROMOTION);
            var e = this._getDataSet(t).uuid, i = s.queryProductByUUID(e);
            if (!i) throw Error("uuid：" + e + "，商品未找到");
            i.selectPromotion.list.length && this.setData({
                promotion: {
                    uuid: e,
                    list: i.selectPromotion.list
                }
            });
        },
        onPromoSelected: function(t) {
            var e = this, i = t.detail.currentTarget.dataset, r = i.uuid, c = i.pid, h = s.queryProductByUUID(r);
            if (!h) return this.setData({
                promotion: {
                    list: []
                }
            });
            var g = ![ "-100", "-300" ].includes(c);
            a.PtagUtils.addPtag(g ? u.CART_SWITCH_PROMOTION : u.CART_PROMOTION_OUT), this._showLoading(), 
            h.packId = c, m.sequence([ s.modifyCmdyPromo.bind(this, h), s.getYbItems ]).then(function(t) {
                var i = o(t, 2), a = i[0], s = i[1];
                e.data.graySwitch = a.graySwitch, e._showVenderCoupons();
                var u = e._getFreightData(a.freight), c = e.getScrollIntoViewId(r, a.venders) || "";
                Object.assign(a, {
                    promotion: {
                        list: []
                    },
                    scrollIntoView: c,
                    services: s
                }), e.setData(n({}, a, u), function() {
                    return e._hideLoading();
                }), e.updateSummary(a.summary), C.event.emit("cartrefresh", {
                    localData: a
                });
            }).catch(function(t) {
                T.error(t), e.setData({
                    promotion: {
                        list: []
                    }
                }, function() {
                    return e._hideLoading();
                }), d.show({
                    page: e.page,
                    icon: d.ICON.WARNING,
                    content: t.message
                });
            });
        },
        onOptionSwitchPromo: function(t) {
            var e = this, i = t.detail.data;
            s.getYbItems().then(function(t) {
                var o = e._getFreightData(i.freight);
                Object.assign(i, {
                    services: t
                });
                var a = i.uuid ? "id_" + i.uuid : "";
                delete i.uuid, a && Object.assign(i, {
                    scrollIntoView: a
                }), e.setData(n({}, i, o), function() {
                    return e._hideLoading();
                }), d.show({
                    page: e.page,
                    icon: d.ICON.SUCCESS,
                    content: "切换成功"
                }), e._showVenderCoupons(), e.updateSummary(i.summary), C.event.emit("cartrefresh", {
                    localData: i
                });
            }).catch(function(t) {
                e.setData(n({}, i), function() {
                    return e._hideLoading();
                }), d.show({
                    page: e.page,
                    icon: d.ICON.WARNING,
                    content: t.message
                });
            });
        },
        gotoServicesPage: function(t) {
            var e = this._getDataSet(t), i = e.uuid, o = e.vskuid, n = s.queryProductByUUID(i);
            if (n) {
                var r = n.mainSku, c = this.data.services, d = c.home, h = c.yb, g = n.pid ? n.pid + "_" + r.id : r.id, p = s.queryServiceById(g), l = [], m = !n.isSuit && 1 == r.isSupportCard;
                if (d[g] && d[g].forEach(function(t) {
                    return l.push(t.skuId);
                }), h[g] && h[g].forEach(function(t) {
                    return l.push(t.platformId);
                }), m && n.giftServiceSku && l.push(n.giftServiceSku.id), o) {
                    var f = o + "_" + r.id, v = (s.queryServiceById(f) || {}).jd, _ = void 0 === v ? [] : v;
                    Object.assign(p, {
                        jd: _
                    }), d[f] && d[f].forEach(function(t) {
                        return l.push(t.skuId);
                    });
                }
                var I = {
                    show: !0,
                    skuId: r.id,
                    sence: 24,
                    category: r.cid.replace(/_/g, ","),
                    brandId: r.brandId,
                    price: n.jdPrice || n.price / 100,
                    checkedServicesId: l,
                    supportGift: m,
                    others: {
                        uuid: i,
                        skuId: r.id,
                        pid: n.pid
                    },
                    localData: p,
                    onServicesSubmit: this.onServicesSubmit.bind(this)
                };
                this.$goto("/pages/services/index", I), a.PtagUtils.addPtag(u.CART_GOTO_SERVICE_DETAIL);
            }
        },
        onServicesSubmit: function(t) {
            var e = this, i = t.detail, o = i.hasChanged, n = i.addedServices, a = i.checkedServices, r = i.uncheckedServices, u = i.others;
            if (o) {
                var c = (u || {}).uuid, h = s.queryProductByUUID(c);
                h && s.updateValueAddedServices(h, n, a, r).then(function(t) {
                    getApp().event.emit("cartrefresh");
                }).catch(function(t) {
                    T.error(t), d.show({
                        page: e.page,
                        icon: d.ICON.ERROR,
                        content: t.message
                    });
                });
            }
        },
        onUseJDBean: function(t) {
            var e = this, o = this._getDataSet(t).uuid, n = s.queryProductByUUID(o), r = +s.getBalanceBeans();
            if (n) {
                var c = 0 == n.isUsedJBeanPromo;
                if (c && r < +n.jdBeanPromo.needJdBeanNum) return d.show({
                    page: this.page,
                    icon: d.ICON.ERROR,
                    content: "您的京豆余额不足，无法参加活动"
                });
                n.beanOrMemberPromoId = c ? n.jdBeanPromo.promoId : -1, a.PtagUtils.addPtag(c ? u.CART_USE_JDBEAN_SUBMIT_CLK : u.CART_USE_JDBEAN_CANCE_CLK), 
                this._showLoading(), s.modifyCmdyPromo(n).then(function(t) {
                    var r = c ? "兑换优惠成功，单个商品已优惠" + n.jdBeanPromo.discount / 100 + "元" : "取消兑换成功，京豆已返还到您的账户上";
                    c && C.event.emit("cart:onpay_" + e._pageId, function() {
                        a.PtagUtils.addPtag(u.CART_USE_JDBEAN_PAY_CLK);
                    }), e.updateSummary(t.summary);
                    var s = e.updatePinGouInfos(o), h = {
                        partition: t.partition,
                        pinGouInfos: s
                    };
                    t.venders.forEach(function(t) {
                        Object.assign(h, i({}, "venders[" + t.index + "].checked", t.checked)), t.list.forEach(function(e) {
                            Object.assign(h, i({}, "venders[" + t.index + "].list[" + e.itemIndex + "]", e));
                        });
                    });
                    var g = e.getScrollIntoViewId(o, t.venders) || "";
                    Object.assign(h, {
                        summary: t.summary,
                        scrollIntoView: g
                    }), e.setData(h, function() {
                        e._hideLoading();
                    }), C.event.emit("cartrefresh", {
                        localData: t
                    }), e.data.graySwitch = t.graySwitch, e._showVenderCoupons(!0), d.show({
                        page: e.page,
                        icon: d.ICON.SUCCESS,
                        content: r
                    });
                }).catch(function(t) {
                    e._hideLoading(), d.show({
                        page: e.page,
                        icon: d.ICON.WARNING,
                        content: t.message
                    });
                });
            }
        },
        _showVenderCoupons: function() {
            var t = this;
            if (arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && this._cacheCouponsData) {
                var i = this._buildCoupons(this._cacheCouponsData);
                this.setData({
                    coupons: i
                });
            } else s.queryCoupon().then(function(i) {
                i.length && (t._cacheCouponsData = [].concat(e(i)), i = t._buildCoupons(i), t.setData({
                    coupons: i
                }));
            });
        },
        _buildCoupons: function(t) {
            function e(t, e, i) {
                return e <= t && t <= i;
            }
            function i(t, e) {
                return t.length && t.length === t.filter(function(t) {
                    return e.includes(+t.mainSku.id);
                }).length;
            }
            function n(o) {
                var n = Object.assign({}, t.find(function(t) {
                    return t.vid == o;
                })), r = a(o), s = function(t) {
                    return 2 == t.couponDo;
                }, u = function(t) {
                    return 3 == t.couponStyle;
                }, h = function(t) {
                    return 1 == t.couponType;
                }, g = n.coupoVo.filter(function(t) {
                    return s(t) && h(t) && !u(t) && e(Date.now(), +t.beginTime, +t.endTime);
                });
                return g.map(function(t) {
                    var e = "0" == t.couponKind, o = 0 !== t.skuidlist.length, n = [];
                    return e && !o ? t.total = v ? d(r) : c(r) : (r.forEach(function(e) {
                        var o = !1;
                        e.vSkuId && (o = t.skuidlist.find(function(t) {
                            return t == e.vSkuId;
                        })), !e.vSkuId && (o = i(e.products, t.skuidlist)), e.suits && e.suits.forEach(function(o) {
                            var a = !1;
                            o.vSkuId && (a = t.skuidlist.find(function(t) {
                                return t == o.vSkuId;
                            })), !o.vSkuId && (a = i(o.products, t.skuidlist)), a && n.push(e);
                        }), o && n.push(e);
                    }), t.total = v ? d(n) : c(n)), t;
                }), n.coupoVo = g, n;
            }
            function a(t) {
                var e = [], i = p.find(function(e) {
                    return e.vid == t;
                });
                return i && i.list.forEach(function(t) {
                    if (t.polyType == y.SUIT && 1 == t.checkType) e.push(t); else if (t.polyType == y.SINGLE && 1 == t.products[0].checkType) e.push(t); else if (1 == t.checkType) {
                        var i = [], o = [], n = Object.assign({}, t);
                        t.suits && t.suits.forEach(function(t) {
                            1 == t.checkType && i.push(t);
                        }), t.products.forEach(function(t) {
                            1 == t.checkType && o.push(t);
                        }), Object.assign(n, {
                            products: o,
                            suits: i
                        }), e.push(n);
                    }
                }), e;
            }
            function c(t) {
                return t.reduce(function(t, e) {
                    var i = 0;
                    return i = e.polyType == y.SINGLE ? (0, I.times)(e.products[0].price, e.products[0].num) : e.polyType == y.MF_SUIT || e.polyType == y.MZ_SUIT ? (0, 
                    I.divide)((0, I.times)(e.promoPrice, 1e4), 100) : (0, I.divide)((0, I.times)(e.promoPrice, 1e4, e.num || 1), 100), 
                    (0, I.plus)(t, i);
                }, 0);
            }
            function d(t) {
                return t.reduce(function(t, e) {
                    var i = 0;
                    return e.polyType == y.SINGLE ? i = (0, I.times)(e.products[0].mainSku.promotionPrice, e.products[0].num) : (e.products && e.products.forEach(function(t) {
                        i = (0, I.plus)(i, (0, I.times)(t.mainSku.promotionPrice, t.num));
                    }), e.suits && e.suits.forEach(function(t) {
                        t.products && t.products.forEach(function(t) {
                            i = (0, I.plus)(i, (0, I.times)(t.mainSku.promotionPrice, t.num));
                        }), t.num && (i = (0, I.times)(i, t.num));
                    }), e.num && (i = (0, I.times)(i, e.num))), (0, I.plus)(t, i);
                }, 0);
            }
            function h(t) {
                t.vid;
                var e = [], i = [], o = {};
                if (t.coupoVo.forEach(function(t) {
                    t.total > 0 && (t.total >= t.quota ? e.push(t) : i.push(t));
                }), e = e.sort(function(t, e) {
                    return e.discount - t.discount;
                }), i = i.sort(function(t, e) {
                    return t.quota - e.quota;
                }), e.length) {
                    var n = e[0];
                    o.pid = n.batchId, o.couponKind = n.couponKind, o.showPromotion = !1, o.addOnItemCoupon = "券" + n.quota / 100 + "-" + n.discount / 100, 
                    o.addOnItemTextBefore = "", o.addOnItemTextAfter = "券已可用，去结算用券立省￥" + n.discount / 100 + "元", 
                    f = !1;
                } else if (i.length) {
                    var a = i[0];
                    o.beginTime = a.beginTime, o.endTime = a.endTime, o.couponKind = a.couponKind, o.pid = a.batchId, 
                    o.showPromotion = !0, o.addOnItemCoupon = "券" + a.quota / 100 + "-" + a.discount / 100, 
                    o.addOnItemTextBefore = "再买" + (a.quota - a.total) / 100 + "元，可享受", o.addOnItemTextAfter = "优惠，立省" + a.discount / 100 + "元", 
                    m = !1;
                }
                return o;
            }
            var g = this, p = s.getVenders(), l = {}, m = !0, f = !0, v = "1" == this.data.graySwitch;
            this.cacheCoupons = {}, t.forEach(function(t) {
                g.cacheCoupons[t.vid] = t;
            });
            var _ = function(t) {
                var e = 1 == t.vcouponType, i = 1 == t.couponSrc, o = 1 == t.couponDo;
                return e && i && o;
            };
            return t.forEach(function(t) {
                var e = {}, i = !1;
                t.coupoVo.forEach(function(o) {
                    _(o) && (e[o.shopId + "_" + o.roleId] = {
                        venderId: t.vid,
                        activeId: o.roleId
                    }, i = !0);
                });
                var a = {
                    hasRedPacket: i
                };
                t = n(t.vid), Object.assign(a, h(t)), l[t.vid] = a;
                var s = !0, c = !1, d = void 0;
                try {
                    for (var g, p = Object.entries(e)[Symbol.iterator](); !(s = (g = p.next()).done); s = !0) {
                        var m = o(g.value, 2)[1], f = m.venderId, v = m.activeId;
                        r.ReportManager.addPtagExposure(u.CART_COUPON_RED_PACKET, {
                            venderId: f,
                            activeId: v
                        });
                    }
                } catch (t) {
                    c = !0, d = t;
                } finally {
                    try {
                        !s && p.return && p.return();
                    } finally {
                        if (c) throw d;
                    }
                }
            }), !f && r.ReportManager.addPtagExposure(u.CART_COUPON_ADDON_SUCCESS), !m && r.ReportManager.addPtagExposure(u.CART_COUPON_ADDON), 
            l;
        },
        add: function(t) {
            var e = this._getDataSet(t).uuid, i = s.queryProductByUUID(e);
            if (!i) throw Error("uuid:" + e + "，未找到商品");
            var o = +i.num + 1;
            o <= (i.isSuit ? +i.maxNum : +i.mainSku.maxNum) && this._doUpdateNum(Object.assign({}, i), o);
        },
        sub: function(t) {
            var e = this._getDataSet(t).uuid, i = s.queryProductByUUID(e);
            if (!i) throw Error("uuid:" + e + "，未找到商品");
            var o = +i.num, n = o - 1;
            o > (i.isSuit ? 1 : +i.mainSku.lowestBuy || 1) && this._doUpdateNum(Object.assign({}, i), n);
        },
        showInputMask: function() {
            this.setData({
                showInputMask: !0
            });
        },
        hideInputMask: function() {
            this.setData({
                showInputMask: !1
            });
        },
        updateNum: function(t) {
            var e = this._getDataSet(t), n = e.value, a = e.uuid, r = a.split(/_/), u = o(r, 1)[0], c = s.getVenderById(u), h = s.queryProductByUUID(a);
            if (!h) throw this.setData({
                showInputMask: !1
            }), Error("uuid:" + a + "，未找到商品");
            var g = s.queryItemByItemId(h.itemId), p = String(n).trim(), l = +h.num, m = p && /^\d*$/.test(p), f = m ? +p : l, v = h.isSuit ? +h.maxNum : +h.mainSku.maxNum, _ = Math.max(h.mainSku ? +h.mainSku.lowestBuy : 1, 1), I = "";
            if (m || this.setData(i({
                showInputMask: !1
            }, "venders[" + c.index + "].list[" + g.itemIndex + "]", g)), l === f) return this.setData({
                showInputMask: !1
            });
            f < _ ? _ > 1 ? (I = "该商品最少需购买 " + _ + " 件", f = _) : f = 1 : f > v && (I = "单款最多可买 " + v + " 件", 
            f = v), I && d.show({
                page: this.page,
                icon: d.ICON.WARNING,
                content: I,
                duration: 2500
            }), this._doUpdateNum(h, f);
        },
        _doUpdateNum: function(t, e) {
            var r = this;
            a.PtagUtils.addPtag(u.CART_EDIT_NUM), this._showLoading();
            var c = t.num;
            Object.assign(t, {
                num: e
            }), m.sequence([ s.modifyCmdyNum.bind(this, t), s.getYbItems ]).then(function(e) {
                var a = o(e, 2), s = a[0], u = a[1], c = r._getFreightData(s.freight);
                r.updateSummary(s.summary);
                var d = r.updatePinGouInfos(t.uuid), h = n({
                    showInputMask: !1
                }, c, {
                    partition: s.partition,
                    services: u,
                    pinGouInfos: d
                });
                s.venders.forEach(function(e) {
                    Object.assign(h, i({}, "venders[" + e.index + "].checked", e.checked)), e.list.forEach(function(o) {
                        o.products = o.products.map(function(e) {
                            return e.uuid == t.uuid && (e.editChecked = t.editChecked), e;
                        }), o.suits && o.suits.map(function(e) {
                            return e.uuid == t.uuid && (e.editChecked = t.editChecked), e;
                        }), Object.assign(h, i({}, "venders[" + e.index + "].list[" + o.itemIndex + "]", o));
                    });
                }), r.setData(h, function() {
                    r._hideLoading(), r.onRefreshOptionPromo();
                }), C.event.emit("cartrefresh", !1, !1), r.data.graySwitch = s.graySwitch, r._showVenderCoupons(!0);
            }).catch(function(e) {
                T.error(e), Object.assign(t, {
                    num: c
                });
                var a = {}, u = t.uuid.split(/_/), h = o(u, 1)[0], g = s.getVenderById(h), p = s.queryItemByItemId(s.getItemId(t));
                g && p && Object.assign(a, i({}, "venders[" + g.index + "].list[" + p.itemIndex + "]", p)), 
                d.show({
                    page: r.page,
                    icon: d.ICON.WARNING,
                    content: e.message
                }), r.setData(n({
                    showInputMask: !1
                }, a), function() {
                    return r._hideLoading();
                });
            }), a.PtagUtils.addPtag(u.CART_EDIT_NUM);
        },
        showSwitchPrices: function(t) {
            var e = this._getDataSet(t).uuid, i = s.queryProductByUUID(e);
            i && this.setData({
                switchPriceOpts: {
                    show: !0,
                    price: i.jdPrice,
                    memberPrice: i.memberPrice,
                    memberPriceType: i.memberPriceType,
                    promoTag: i.promoTag,
                    uuid: e
                }
            });
        },
        onSwitchPricePanelClose: function(t) {
            this.setData({
                switchPriceOpts: {
                    show: !1
                }
            });
        },
        onSwitchPriceSelected: function(t) {
            var e = this, o = t.detail.currentTarget.dataset, a = o.uuid, r = o.name, u = s.queryProductByUUID(a), c = r === u.memberPriceType;
            if (!u) return this.onSwitchPricePanelClose(t);
            u.beanOrMemberPromoId = c ? -1 : -101, this.onSwitchPricePanelClose(t), this._showLoading(), 
            s.modifyCmdyPromo(u).then(function(t) {
                e.data.graySwitch = t.graySwitch, e._showVenderCoupons(!0), e.updateSummary(t.summary), 
                C.event.emit("cartrefresh", !1, !1);
                var o = e._getFreightData(t.freight), r = e.updatePinGouInfos(a), s = n({}, o, {
                    partition: t.partition,
                    pinGouInfos: r
                });
                t.venders.forEach(function(t) {
                    Object.assign(s, i({}, "venders[" + t.index + "].checked", t.checked)), t.list.forEach(function(e) {
                        Object.assign(s, i({}, "venders[" + t.index + "].list[" + e.itemIndex + "]", e));
                    });
                }), e.setData(s, function() {
                    e._hideLoading(), e.onRefreshOptionPromo();
                });
            }).catch(function(t) {
                e._hideLoading(), d.show({
                    page: e.page,
                    icon: d.ICON.WARNING,
                    content: t.message
                });
            });
        },
        updatePinGouInfos: function(t) {
            var e = s.queryProductByUUID(t), i = !e.isSuit && e.mainSku ? e.mainSku.id : "", o = Object.assign({}, this.data.pinGouInfos);
            if (i && o && o[i]) {
                var n = e.show_price.join(".");
                o[i].priceDiff = (0, I.minus)(n, o[i].pinGouPrice);
            }
            return o;
        },
        showSwitchSkuPanel: function(t) {
            var e = this._getDataSet(t).uuid, i = s.queryProductByUUID(e);
            if (!i) throw Error("切换sku-未找到 {$uuid} 商品");
            if (!this.data.editable) {
                a.PtagUtils.addPtag(u.CART_SWITCH_SKU);
                var o = i.mainSku.id, n = i.jdPrice, r = i.mainSku.image, c = i.num;
                this.setData({
                    showSkuLayerFlag: !0,
                    skuPanelData: {
                        sku: o,
                        price: n,
                        totalNum: c,
                        cover: r,
                        suitPackData: {},
                        othersData: {
                            oldProduct: i
                        }
                    }
                });
            }
        },
        hideSwitchSkuPanel: function(t) {
            this.setData({
                showSkuLayerFlag: !1,
                skuPanelData: {}
            });
        },
        onSkuChange: function(t) {
            var e = this, i = this._getDataSet(t), o = i.info, n = i.num, r = i.othersData, c = void 0 === r ? {} : r;
            if (!c) return this.toast.show({
                page: this.page,
                icon: this.toast.ICON.WARNING,
                content: "哎呀，操作发生点意外，请稍后再试"
            });
            var h = c ? c.oldProduct : null;
            if (!(!(!h || !h.mainSku) && o.sku !== h.mainSku.id)) return this.setData({
                showSkuLayerFlag: !1,
                skuPanelData: {}
            });
            a.PtagUtils.addPtag(u.CART_SWITCH_SKU_SUBMIT), this._showLoading(), s.replaceProduct(h, {
                itemId: o.sku,
                polyType: "1",
                mainSku: {
                    id: o.sku
                },
                ptype: 1,
                pid: "0",
                num: n
            }).then(function(t) {
                e._hideLoading(), e.setData({
                    scrollIntoView: "top",
                    showSkuLayerFlag: !1,
                    skuPanelData: {}
                }), C.event.emit("cartrefresh");
            }).catch(function(t) {
                d.show({
                    page: e.page,
                    icon: d.ICON.WARNING,
                    content: t.message
                }), e._hideLoading();
            });
        },
        onRemoveGift: function(t) {
            var e = this, i = this._getDataSet(t), o = i.itemId, n = i.skuId, r = s.queryItemByItemId(o);
            if (!r) return this.toast.show({
                page: this.page,
                icon: this.toast.ICON.WARNING,
                content: "该商品不存在，可能已经被删除"
            });
            var c = r.manGiftSkus ? r.manGiftSkus.find(function(t) {
                return t.id == n;
            }) : null;
            if (!c) return this.toast.show({
                page: this.page,
                icon: this.toast.ICON.WARNING,
                content: "该商品不存在，可能已经被删除"
            });
            var d = {
                itemId: o,
                polyType: r.polyType,
                mainSku: {
                    id: c.id
                },
                ptype: c.ptype,
                num: c.num,
                promotion: {
                    pid: r.promotion.pid
                },
                vSkuId: r.vSkuId
            };
            g.show({
                title: "",
                content: "确认要删除该商品吗？",
                maxHeight: "360",
                align: "center",
                showCancel: !0,
                cancelText: "取消",
                cancelColor: "#000",
                confirmText: "删除",
                confirmColor: "red",
                success: function() {
                    e._showLoading(), a.PtagUtils.addPtag(u.CART_DELETE), s.rmvCmdy([ d ]).then(function(t) {
                        C.event.emit("cartrefresh", {
                            localData: t
                        }), e.toast.show({
                            page: e.page,
                            icon: e.toast.ICON.SUCCESS,
                            content: "已成功删除商品"
                        }), e._hideLoading();
                    }).catch(function(t) {
                        e._hideLoading(), e.toast.show({
                            page: e.page,
                            icon: e.toast.ICON.WARNING,
                            content: t.message
                        });
                    });
                }
            });
        },
        onRemove: function(t) {
            var e = this, i = this._getDataSet(t).uuid, o = s.queryProductByUUID(i);
            if (!o) return this.toast.show({
                page: this.page,
                icon: this.toast.ICON.WARNING,
                content: "该商品不存在，可能已经被删除"
            });
            var n = "确认要删除该" + (o.isSuit ? "套装" : "") + "商品吗？";
            g.show({
                title: "",
                content: n,
                maxHeight: "360",
                align: "center",
                showCancel: !0,
                cancelText: "取消",
                cancelColor: "#000",
                confirmText: "删除",
                confirmColor: "red",
                success: function() {
                    e._showLoading(), a.PtagUtils.addPtag(u.CART_DELETE), s.rmvCmdy([ o ]).then(function(t) {
                        e.data.graySwitch = t.graySwitch, e._showVenderCoupons(), C.event.emit("cartrefresh", {
                            localData: t
                        }), e.toast.show({
                            page: e.page,
                            icon: e.toast.ICON.SUCCESS,
                            content: "已成功删除商品"
                        }), e._hideLoading();
                    }).catch(function(t) {
                        e._hideLoading(), e.toast.show({
                            page: e.page,
                            icon: e.toast.ICON.WARNING,
                            content: t.message
                        });
                    });
                }
            });
        },
        onSliderViewOpen: function(t) {},
        gotoFreightAddon: function(t) {
            var e = this._getDataSet(t).category, i = p.getFreightAddonParams(), n = {
                category: e,
                params: {}
            }, r = {
                0: u.CART_FREIGHT_NON_FRESH_CLK,
                1: u.CART_FREIGHT_FRESH_CLK,
                2: u.CART_FREIGHT_NON_FRESH_CLK
            }, s = !1, c = !0, d = !1, h = void 0;
            try {
                for (var g, l = Object.entries(i)[Symbol.iterator](); !(c = (g = l.next()).done); c = !0) {
                    var m = o(g.value, 2), f = m[0], v = m[1];
                    if (v.exist) {
                        var _ = [], I = !0, P = !1, y = void 0;
                        try {
                            for (var S, C = Object.entries(v.list)[Symbol.iterator](); !(I = (S = C.next()).done); I = !0) {
                                var T = o(S.value, 2), k = T[0], O = T[1].skus, w = void 0 === O ? [] : O;
                                s = 8888 != k && w.length, w.length && (_ = _.concat(w));
                            }
                        } catch (t) {
                            P = !0, y = t;
                        } finally {
                            try {
                                !I && C.return && C.return();
                            } finally {
                                if (P) throw y;
                            }
                        }
                        !v.isFreeShipping && _.length && (n.params[f] = {
                            price: v.amount,
                            weight: v.weight,
                            skus: _.join(","),
                            rule: v.rule,
                            total: v.total
                        });
                    }
                }
            } catch (t) {
                d = !0, h = t;
            } finally {
                try {
                    !c && l.return && l.return();
                } finally {
                    if (d) throw h;
                }
            }
            return r[e] && a.PtagUtils.addPtag(r[e]), a.PtagUtils.addPtag(u.CART_FREIGHT_ENTRY_CLK), 
            s && a.PtagUtils.addPtag(u.CART_FREIGHT_FBP_CLK), this.$goto("/pages/freight_addon/index", n);
        },
        showFreightTips: function(t) {
            var e = this._getDataSet(t), i = e.vid, n = e.category, s = p.getFreightTips(i, n), c = v.getAddress().areaName.split(/_/), d = o(c, 2), h = d[0], g = void 0 === h ? "" : h, l = d[1], m = void 0 === l ? "" : l;
            a.PtagUtils.addPtag(u.CART_FREIGHT_TIPS_CLK), s && (f.MessageBox.show({
                title: "运费凑单说明",
                tpl: "tplFreigth",
                wrapCls: "freight",
                modal: !1,
                content: s.tip,
                list: [],
                area: g + m,
                buttons: [ {
                    text: "我知道了",
                    handler: function() {
                        f.MessageBox.hide();
                    }
                } ]
            }), r.ReportManager.addPtagExposure(u.CART_FREIGTH_TIPS));
        },
        onScrollToLower: function() {
            this.data.showRecommend || this.data.editable || (this._showLoading(), this.setData({
                showRecommend: !0
            }));
        },
        onScrollToUpper: function(t) {
            var e = this.selectComponent("#marginbar");
            e && e.onScrollToUpper(t);
        },
        getScrollIntoViewId: function(t, i) {
            var n = "", a = t.split(/_/), r = o(a, 4), s = r[0], u = r[3], c = i.find(function(t) {
                return t.vid == s;
            });
            return c ? c.list.forEach(function(t) {
                [].concat(e(t.products), e(t.suits || [])).every(function(e) {
                    var i = e.mainSku ? e.mainSku.id : e.vSkuId;
                    return u != i || (n = "id_" + c.vid + "_" + t.polyType + "_" + t.itemId + "_" + i, 
                    !1);
                });
            }) : i.forEach(function(t) {
                t.list.forEach(function(i) {
                    [].concat(e(i.products), e(i.suits || [])).every(function(e) {
                        var o = e.mainSku ? e.mainSku.id : e.vSkuId;
                        return u != o || (n = "id_" + t.vid + "_" + i.polyType + "_" + i.itemId + "_" + o, 
                        !1);
                    });
                });
            }), n;
        },
        onMarginBarTap: function(t) {
            var e = t.detail.uuid;
            e && this.setData({
                scrollIntoView: "id_" + e
            });
        },
        updateSummary: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            this.triggerEvent("updatebottombar", Object.assign(e, {
                summary: t
            }));
        },
        onOptionPromoTipsClose: function() {
            this.userCloseOptionPrmo = !0;
        },
        onRefreshOptionPromo: function() {
            if (!this.userCloseOptionPrmo) {
                var t = S(), e = !1, i = 0;
                t && (e = t.checked || "", i = t.checkedSkuCount || "");
                var o = this.selectComponent("#optionpromotions");
                if (this.data.venders.length < 1 || i < 1 || e && i > 5) o && o.hidePromoTips(); else {
                    var n = wx.createSelectorQuery(), a = n ? n.in(this) : "";
                    a && a.select(".hide_op_promo").fields({
                        size: !0
                    }, function(t) {
                        t ? o && o.hidePromoTips() : o && o.refresh();
                    }).exec();
                }
            }
        },
        onUpdateMarginBar: function() {
            var t = this.selectComponent("#marginbar"), e = wx.createSelectorQuery().in(this);
            e && e.selectAll(".good_reduce_price").fields({
                id: !0
            }, function(e) {
                t && t.onUpdateMrginSkuIds(e);
            }).exec(), !e && t && t.onUpdateMrgins(this.data.margins);
        },
        marginFixedUpdate: function(t) {
            this.marginFixed = t.detail.fixed;
        }
    }
});