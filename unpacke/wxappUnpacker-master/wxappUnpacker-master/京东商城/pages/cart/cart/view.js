function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function t(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

function r(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.init = void 0;

var n = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
}, a = require("../../../bases/page"), o = e(require("../../../common/user_info")), i = e(require("../common/ptag-constants")), s = require("../../../api/Ptag/Ptag_utils.js"), d = require("../../../api/Ptag/report_manager"), u = require("../../../common/fe_report/speed"), c = e(require("../../../common/tabbar_api/tabbar_utils.js")), h = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../libs/promise.min.js")), f = e(require("../models/model")), g = require("./memory-paging"), l = require("../common/select-mode"), p = require("../common/recovery.js"), v = require("../../../common/logger"), m = getApp(), _ = new v.Logger("购物车 index"), R = !1;

exports.init = function() {
    new a.JDPage({
        _pageId: "",
        _needRefresh: !1,
        data: {
            venders: [],
            showQuickCleanButton: !1,
            hasError: !1,
            viewLoaded: !1,
            loading: !0,
            showQuickNav: !1,
            showRecommend: !1
        },
        onNavigate: function(e) {
            e.page, e.url, e.params, R = this._onRefresh({
                showLoading: !1
            }).then(function(e) {
                return e;
            });
        },
        onLoad: function() {
            var e = this;
            this.loadStart = Date.now(), this._pageId = this.helper.getRandomID();
            var t = getCurrentPages(), r = t.length ? t.pop().route : "";
            this.isTab = "pages/cart/cart/index" === r, this.isNonTab = "pages/cart/cart/cart" === r, 
            this.manualReportPV = !0, this._bindEvents(), this._registerGlobalAppEvents(), (R || this._onRefresh()).then(function(t) {
                var r = n({}, t.mergeData);
                r && delete t.mergeData, e.renderStart = Date.now(), e.render(t, function() {
                    return e.onHeadScreenLoaded(r);
                });
            });
        },
        render: function(e, t) {
            this.setData(e, t);
        },
        onTabItemTap: function(e) {
            3 == e.index && (s.PtagUtils.addPtag(i.CART_TAB_CLK), c.reportTabCart());
        },
        onUnLoad: function() {
            m.event.off("cartrefresh"), m.event.off("cart:editmode");
        },
        onShow: function() {
            var e = this;
            this._needRefresh && (this._onRefresh().then(function(t) {
                return e.render(t, function() {
                    return e.updateRedDot();
                });
            }), this._needRefresh = !1), this._refreshPinBindBarInTopBar(), this._refreshCartGift(), 
            c.reportPvCart();
        },
        onHide: function() {
            this.setData({
                coupons: {
                    list: []
                },
                promotion: {
                    list: []
                },
                switchPriceOpts: {
                    show: !1
                }
            });
        },
        onPullDownRefresh: function() {
            this.refresh();
        },
        _getList: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = Date.now();
            return f.getCartView().then(function(o) {
                if (e._spdReport(4, Date.now() - a), e.speedReport(), e._exReport(Object.assign({}, o)), 
                l.SelectMode.fill(o), t && (o.scrollIntoView = t), e.hasHeadScreenLoad) {
                    var i = n({}, o, {
                        loading: !1,
                        hasError: !1,
                        viewLoaded: !0,
                        isHeadScreenLoad: !0,
                        showQuickCleanButton: o.summary.skuNum >= 10,
                        showQuickNav: !e.isTab && o.venders.length,
                        showRecommend: o.summary.skuNum < 10
                    });
                    return Object.assign(r, i), h.default.resolve(r);
                }
                return e.hasHeadScreenLoad = !0, Object.assign(r, o), e._setHeadScreen(r);
            }).catch(function(t) {
                return _.error(t), Object.assign(r, {
                    loading: !1,
                    hasError: !e.data.viewLoaded
                }), !e.data.viewLoaded && p.Recovery.apply(), h.default.resolve(r);
            });
        },
        _setHeadScreen: function(e) {
            var a = new g.MemoryPaging({
                data: e.venders
            }).group(), o = a.head, i = a.last, s = o[o.length - 1], d = i[0], u = {
                isHeadScreenLoad: !1,
                loading: !1
            };
            s && d && s.vid == d.vid && (Object.assign(u, t({}, "venders[" + s.index + "].list", [].concat(r(s.list), r(d.list)))), 
            i.slice(1).forEach(function(e) {
                Object.assign(u, t({}, "venders[" + e.index + "]", e));
            })), e.venders = o;
            var c = n({}, e, {
                loading: !0,
                hasError: !1,
                viewLoaded: !0,
                isHeadScreenLoad: !0,
                showQuickNav: !this.isTab && e.venders.length,
                showQuickCleanButton: e.summary.skuNum >= 10,
                showRecommend: e.summary.skuNum < 10
            });
            return h.default.resolve(n({}, c, {
                mergeData: u
            }));
        },
        onHeadScreenLoaded: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = Date.now();
            Object.assign(e, {
                isHeadScreenLoad: !1,
                loading: !1
            }), this.setData(e), this.hasHeadScreenLoad = !0, this._spdReport(5, t - this.renderStart), 
            R ? this._spdReport(17, t - this.loadStart) : this._spdReport(18, t - this.loadStart), 
            _.info("headScreen:", t - this.renderStart), R = !1, this.updateRedDot();
        },
        _spdReport: function(e, t) {
            var r = getCurrentPages().pop(), n = {
                "pages/cart/cart/index": 600,
                "pages/cart/cart/cart": 1035
            }[r ? r.route : ""], a = {};
            n && (a["s" + e] = t, u.Speed.reportAlone(n, a));
        },
        _exReport: function(e) {
            var t = this;
            setTimeout(function() {
                var r = {
                    promotion: 0,
                    jgj: 0,
                    mz: 0,
                    mh: 0,
                    gift3c: 0,
                    addonItem: 0,
                    exclusivePrice: 0
                };
                0 === e.venders.length ? d.ReportManager.addPtagExposure(i.CART_EMPTY_PV) : (d.ReportManager.addPtagExposure(i.CART_PV), 
                e.venders.forEach(function(e) {
                    r.promotion || -1 != e.list.findIndex(function(e) {
                        return 3 == e.polyType || 4 == e.polyType;
                    }) && (d.ReportManager.addPtagExposure(i.CART_DISPLAY_PROMOTION), r.promotion = 1), 
                    r.jgj || -1 != e.list.findIndex(function(e) {
                        return 4 == e.polyType && +e.addMoney > 0;
                    }) && (d.ReportManager.addPtagExposure(i.CART_JGJ), r.jgj = 1), r.mz || -1 != e.list.findIndex(function(e) {
                        return 4 == e.polyType && 0 == +e.addMoney;
                    }) && (d.ReportManager.addPtagExposure(i.CART_MZ), r.mz = 1), r.mh || -1 != e.list.findIndex(function(e) {
                        return 4 == e.polyType && 24 == e.fullType;
                    }) && (d.ReportManager.addPtagExposure(i.CART_MH), r.mh = 1), r.gift3c || -1 != e.list.findIndex(function(e) {
                        return -1 != e.products.findIndex(function(e) {
                            return e.gifts && e.gifts.listGiftPools.length;
                        });
                    }) && (d.ReportManager.addPtagExposure(i.CART_3C_GIFT), r.gift3c = 1), r.addonItem || -1 != e.list.findIndex(function(e) {
                        return (e.actLineTitle || "").includes("去凑单");
                    }) && (d.ReportManager.addPtagExposure(i.CART_ADDON_ITEM), r.addonItem = 1), r.exclusivePrice || -1 != e.list.findIndex(function(e) {
                        return -1 !== e.products.findIndex(function(e) {
                            return "18" == e.promoTag;
                        });
                    }) && (d.ReportManager.addPtagExposure(i.CART_EXCLUSIVE_PRICE), r.exclusivePrice = 1, 
                    m.event.emit("cart:onpay_" + t._pageId, function() {
                        s.PtagUtils.addPtag(i.CART_EXCLUSIVE_PRICE_PAY);
                    }));
                }));
            }, 0);
        },
        _refreshPinBindBarInTopBar: function() {
            var e = this.selectComponent("#topbar");
            e && e.refreshPinBindBar();
        },
        _refreshCartGift: function() {
            m.event.emit("cart:cart-gift:refresh_" + this._pageId);
        },
        bubble: function() {},
        doAction: function(e) {
            var t = e.currentTarget.dataset, r = t.trigger, n = t.action;
            r && m.event.emit(r), this[n] && this[n](e);
        },
        _bindEvents: function() {},
        _registerGlobalAppEvents: function() {
            m.event.on("cartrefresh", this._onReceiveRefreshNotification);
        },
        _onReceiveRefreshNotification: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = this, r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], a = getCurrentPages(), o = a.length ? a.pop() : {}, i = o.route || "", s = "pages/cart/cart/index" === i, d = "pages/cart/cart/cart" === i, u = o._pageId === this._pageId;
            if (r && u && (s || d)) return o._onRefresh && o._onRefresh(e).then(function(r) {
                e.localData && (r.isHeadScreenLoad = !1), t.render(r, function() {
                    return t.updateRedDot();
                });
            });
            n ? this._needRefresh = !0 : (s || (this._needRefresh = !0), u && this.updateRedDot());
        },
        _onRefresh: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = o.getUserAddressDes().replace(/_/g, ""), r = e.localData, n = void 0 === r ? null : r, a = e.scrollIntoView, i = e.showLoading, s = {
                loading: !0,
                hasError: !1,
                address: t
            };
            if ((void 0 === i || i) && this.setData(s), n) {
                if (l.SelectMode.fill(n), Object.assign(s, n, {
                    loading: !1,
                    viewLoaded: !0,
                    showQuickCleanButton: n.summary.skuNum >= 10
                }), n.venders && 0 == n.venders.length) {
                    var d = this.selectComponent("#topbar");
                    d && d.data && d.data.editable && d.doEdit();
                }
                return h.default.resolve(s);
            }
            return this._getList(a, s);
        },
        updateRedDot: function() {
            if (this.isTab) {
                var e = c.getCartBadgeType();
                c.BADGE_TYPE.TEXT == e ? f.getAssist().then(function(e) {
                    void 0 !== e.margin && "{}" != JSON.stringify(e.margin) || c.updateCartBadge(!0);
                }) : c.updateCartBadge();
            }
        },
        onUpdateBottomBar: function(e) {
            var t = e.detail.summary;
            this.setData({
                summary: t
            });
        },
        onCheck: function(e) {
            var t = this.selectComponent("#goodslist");
            t && t.onCheck(e);
        },
        onEditCheck: function(e) {
            var t = this.selectComponent("#goodslist");
            t && t.onEditCheck(e);
        },
        refresh: function(e) {
            m.event.emit("cartrefresh");
        },
        toggleTarBarFixed: function(e) {
            var t = this.selectComponent("#topbar");
            t && t.toggleTarBarFixed(e);
        }
    });
};