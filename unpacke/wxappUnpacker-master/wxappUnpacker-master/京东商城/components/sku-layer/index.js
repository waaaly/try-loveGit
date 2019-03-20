function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}

function e(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

function i(t) {
    var e = "";
    return "object" == (void 0 === t ? "undefined" : o(t)) ? e = t.message : "string" == typeof t && (e = t), 
    e;
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o]);
    }
    return t;
}, s = require("../../bases/component"), n = require("../../common/fe_helper.js"), r = t(require("../../common/toast/toast")), u = t(require("../../common/cookie-v2/cookie.js")), c = require("../../common/utils"), d = require("../../common/user_info.js"), p = require("../../api/Ptag/report_manager"), h = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../libs/promise.min.js")), l = require("../../models/item/item_model"), m = require("./api.js"), g = t(require("./constants")), f = getApp(), v = {
    color: "颜色",
    size: "尺寸",
    spec: "规格"
};

new s.JDComponent({
    properties: {
        sku: String,
        price: String,
        cover: String,
        totalNum: Number,
        goodsNumObj: Object,
        suitPackData: Object,
        localData: Object,
        othersData: {
            type: Object,
            value: {}
        },
        addedServices: {
            type: Object,
            value: {}
        },
        pingouTipData: Object,
        saleAtmos: Object,
        bottomBtn: Object,
        isOfflineHasShop: Boolean,
        choseShopId: String,
        sceneType: String,
        needReport: Boolean,
        isCart: {
            type: Boolean,
            value: !1
        },
        isNewUser: {
            type: Boolean,
            value: !1
        },
        showSkuLayerFlag: {
            type: Boolean,
            value: !1,
            observer: "observeFlagChange"
        },
        showNumController: {
            type: Boolean,
            value: !1
        },
        showActions: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        skuProps: [],
        info: {
            skuId: 0,
            skuName: "",
            price: "",
            otherPrice: "",
            cover: "",
            text: "",
            canBuy: !0
        },
        goodsNum: {
            value: 1,
            limit: 1,
            maxLimit: 200,
            subEnabled: !1,
            addEnabled: !0,
            limitText: ""
        },
        pool: {},
        selectInfo: {},
        isPingouApp: !1,
        tipsContent: "",
        isLoading: !1,
        tuanInfo: {},
        isShowPopup: !1,
        isShowPopupAnim: !1,
        isJX: !1,
        showAddCartBtns: !1
    },
    created: function() {
        this.newColorSize = [];
    },
    ready: function() {
        var t = 2 == u.getCookie("wxapp_type");
        this.PtagConstants = g, t && this.setData({
            isPingouApp: !0
        }), this.doBuy = (0, n.throttle)(this.doBuy, 1e3), this.buy = (0, n.throttle)(this.doBuy, 1e3), 
        this.addToCart = (0, n.throttle)(this.addToCart, 500), this.handleLookLike = (0, 
        n.throttle)(this.handleLookLike, 1e3), this.handleStockNotice = (0, n.throttle)(this.handleStockNotice, 1e3), 
        this.handleConfirmBtn = (0, n.throttle)(this.handleConfirmBtn, 1e3), this.handleSkuChange = (0, 
        n.throttle)(this.handleSkuChange, 500), this.handlePreviewImage = (0, n.throttle)(this.handlePreviewImage, 1e3), 
        f.event.on("updateItemPoolList", this.updateItemPoolList.bind(this));
    },
    detached: function() {
        f.event.off("updateItemPoolList");
    },
    methods: {
        handlePreviewImage: function() {
            var t = this.data.info.isPingou, e = this.data.info.cover;
            e && !this.data.isCart && (t ? this.$report("LAYER_SKU_COVER_VIEW_PINGOU") : this.$report("LAYER_SKU_COVER_VIEW"), 
            e = e.replace(/(\/)(?:s\d+x\d+_)?(jfs\/)/, "$1$2").replace("n1/", "img/"), wx.previewImage({
                current: e,
                urls: [ e ]
            }));
        },
        closeSkuLayer: function(t, e) {
            var i = this.data, o = i.info, a = void 0 === o ? {} : o, s = i.skuProps, n = i.goodsNum;
            if (e || a.skuId) {
                var r = a.skuId, u = a.skuName, c = a.price, d = a.cover, p = e || {
                    sku: r,
                    name: u,
                    price: c,
                    cover: d,
                    num: n.value,
                    skuProps: s
                };
                this.triggerEvent("closeSkuLayer", {
                    params: p
                }), this.$report("LAYER_SKU_CLOSE");
            }
        },
        showSkuPanel: function() {
            var t = this.data, e = t.sku, i = t.price, o = t.cover, s = t.totalNum, r = t.suitPackData, u = t.localData, c = t.goodsNumObj;
            if (this.setData({
                "info.price": i || "",
                "info.cover": o || "",
                "goodsNum.value": 0 | s || 1,
                "goodsNum.limit": c && c.limit || 1,
                "goodsNum.maxLimit": c && c.maxLimit || 200,
                "goodsNum.limitText": c && c.limitText || "",
                isLoading: !u
            }), r && r.packList) {
                for (var d = r.pIndex, p = r.iIndex, h = r.suit, l = r.packList[d].poolList[p - 1], m = l.saleProp, g = l.saleNames, f = [], k = l.colorList || [], I = {}, y = {}, N = k.length - 1; N >= 0; N--) e == k[N].skuId && (y = k[N], 
                I = {
                    color: k[N].color || "",
                    size: k[N].size || "",
                    spec: k[N].spec || ""
                });
                g.forEach(function(t) {
                    f.push({
                        value: m[t],
                        name: t,
                        text: v[t],
                        current: I[t],
                        sale: !0
                    });
                });
                var b = h.item[p].finalPrice, S = {
                    price: h.price,
                    dis: h.dis,
                    mprice: h.mprice
                }, C = a({}, this.data.info, {
                    skuId: y.skuId,
                    skuName: y.skuName,
                    sku: y.skuId,
                    name: y.skuName,
                    price: b.toFixed(2),
                    cover: (0, n.getImg)(y.skuPicUrl, 160),
                    text: [ I.color, I.size, I.spec ].join(" "),
                    choose: [ I.color, I.size, I.spec ].join(" ")
                });
                return h.suitPrice = S, void this.setData({
                    info: C,
                    skuProps: f,
                    pool: l,
                    isLoading: !1,
                    showAddCartBtns: !1,
                    "suitPackData.suit": h
                });
            }
            this.initSkuPanelInfo(e, !0);
        },
        resetPanelData: function() {
            this.newColorSize = [], this.setData({
                skuProps: [],
                pool: {},
                "info.canBuy": !0
            });
        },
        calcSkuForEachProp: function(t) {
            var i = this, o = this.data.skuProps.length ? this.data.skuProps : t, a = this.getCurrentSelect(o);
            return Array.isArray(o) && o.forEach(function(t) {
                var o = [];
                t.value.forEach(function(s) {
                    var n = {};
                    Object.assign(n, a, e({}, t.name, s)), t.isSizeGuideShow && i.$report("EXP_SIZE_GUIDE");
                    var r = (0, m.getSpecifySku)(n, i.newColorSize);
                    o.push(r.join("|"));
                }), t.sku = o;
            }), o;
        },
        getCurrentSelect: function(t) {
            var e = {};
            return (t = t || this.data.skuProps).forEach(function(t) {
                e[t.name] = t.current;
            }), e;
        },
        formatCurrentSelectText: function(t) {
            var e = [];
            return (t = t || this.data.skuProps).forEach(function(t) {
                t.current && t.value.length >= 1 && e.push(t.current);
            }), e;
        },
        handleConfirmBtn: function() {
            var t = this.data, e = t.info, i = t.goodsNum, o = t.skuProps, a = t.suitPackData, s = t.othersData, n = void 0 === s ? {} : s, u = t.selectInfo;
            if (e.canBuy) {
                var c = this.getCurrentSelect(o);
                if (this.checkPropSelect(c)) {
                    if ("addToCart" === n.btnType) return this.$report("LAYER_SKU_TOW_CONFIRM"), this.addToCart();
                    if ("buy" == n.btnType) return this.$report("LAYER_SKU_TOW_CONFIRM"), this.doBuy();
                    var d = {
                        sku: e.skuId,
                        idx: u.pidx,
                        name: u.name,
                        val: u.val
                    };
                    e.sku = e.skuId, this.triggerEvent("confirmSkuChange", {
                        info: e,
                        num: i.value,
                        suitPackData: a,
                        othersData: n,
                        sInfo: d
                    });
                } else r.show({
                    icon: r.ICON.WARNING,
                    content: "您未完整选中规格参数"
                });
            }
        },
        gotoSizeGuide: function(t) {
            var e = this.data.info.skuId, i = t.currentTarget ? t.currentTarget.dataset : t, o = i.spu, a = i.size;
            this.$report("CLICK_SIZE_GUIDE"), this.$goto("https://m.toplife.com/sizeGuide.html?skuId=" + e + "&productId=" + o + "&sizeCode=" + a + "&showHead=no");
        },
        handleSkuChange: function(t) {
            var i = this.data.skuProps, o = t.currentTarget.dataset, s = o.pidx, r = o.idx, u = o.name, c = o.val, d = o.disabled;
            if (c != this.getCurrentSelect()[u] && !d && i[s]) {
                if (this.setData({
                    isOfflineHasShop: !1,
                    addedServices: {},
                    selectInfo: {
                        pidx: s,
                        idx: r,
                        name: u,
                        val: c
                    }
                }), i[s].sku) {
                    var h = i[s].sku[r];
                    if (!h) return;
                    var l = this.getCurrentSelect();
                    this.setData(e({}, "skuProps[" + s + "].current", c == l[u] ? "" : c)), this.setData({
                        skuProps: this.calcSkuForEachProp()
                    }), l = this.getCurrentSelect(), 1 == h.split("|").length && this.checkPropSelect(l) && h != this.data.info.skuId && this.initSkuPanelInfo(h);
                } else {
                    var m = this.data, g = m.skuProps, f = m.suitPackData, v = m.pool, k = v.saleNames, I = v.colorList, y = g[s].value[r], N = {}, b = [], S = void 0;
                    g[s].current = y, g.forEach(function(t) {
                        N[t.name] = t.current, b.push(t.current);
                    });
                    for (var C = I.length - 1; C >= 0; C--) for (var P = 0, _ = k.length - 1; _ >= 0; _--) {
                        var T = k[_];
                        N[T] == I[C][T] && ++P == k.length && (S = I[C]);
                    }
                    if (!S) return;
                    var x = f.suit, D = f.iIndex, A = x.item[D].finalPrice, E = {
                        price: x.price,
                        dis: x.dis,
                        mprice: x.mprice
                    }, L = a({}, this.data.info, {
                        skuId: S.skuId,
                        skuName: S.skuName,
                        sku: S.skuId,
                        name: S.skuName,
                        price: A.toFixed(2),
                        cover: (0, n.getImg)(S.skuPicUrl, 160),
                        text: [ N.color, N.size, N.spec ].join(" "),
                        choose: b.join(" "),
                        canBuy: !!S.stock
                    });
                    x.suitPrice = E, this.setData({
                        info: L,
                        skuProps: g,
                        "suitPackData.suit": x
                    });
                }
                this.$report("LAYER_SKU_CHANGE"), p.ReportManager.addPtagExposure("7145.16.11");
            }
        },
        getItemData: function(t, e) {
            var i = this.data, o = i.isNewUser, a = i.localData, s = i.needReport, n = i.isPingou;
            return e && a ? h.default.resolve(a) : (0, m.initItem)({
                skuId: t,
                isNewUser: o,
                needReport: s,
                pingou: n
            });
        },
        initSkuPanelInfo: function(t, e) {
            var o = this, s = this.data, u = s.othersData, c = void 0 === u ? {} : u, d = s.isCart, h = s.goodsNum;
            this.getItemData(t, e).then(function(i) {
                if (i) if (d || !i.jumpUrl) if (!i.buyingSpreeFlag || e || d) {
                    i.isJX = !(!i.spAttr || 1 != i.spAttr.IsJX), i.isECardOnce = i.isECard && i.spAttr && 1 == i.spAttr.yysfhf, 
                    Number(i.price) && (i.price = parseFloat(i.price).toFixed(2)), e && (o.newColorSize = i.newColorSize || f.tempNewColorSize || []);
                    var s = o.calcSkuForEachProp(i.props) || [], r = o.formatCurrentSelectText(i.props).join(", "), u = i.isPingou, l = i.pingouInfo;
                    u && !e && o.getPingouTipInfo(i.skuId);
                    var g = [];
                    if (s.forEach(function(t) {
                        g.push(t.current), u && l && l.skuid_list && (t.disabled = t.sku.map(function(t) {
                            return -1 === l.skuid_list.indexOf(Number(t));
                        }));
                    }), e || o.updateLimitBuy(i), void 0 !== c.buyType && 0 != c.buyType && p.ReportManager.addPtagExposure("7418.16.28"), 
                    !u || l && l.price || (0, m.getPingouPrice)(i.skuId).then(function(t) {
                        o.setData({
                            "info.pingouInfo.price": t.bp
                        });
                    }).catch(function(t) {
                        o.setData({
                            "info.pingouInfo.price": "暂无定价"
                        });
                    }), i.poolList) {
                        var v = o.data.goodsNum.value || 1, k = i.poolList;
                        k.forEach(function(t) {
                            t.list.forEach(function(t) {
                                t.img = (0, n.getImg)(t.mp, 150), t.num = v, t.selected = !1;
                            });
                        }), i.poolFlag ? (k[0].list[0].selected = !0, k[0].selectedArr = [ k[0].list[0] ]) : k.forEach(function(t) {
                            t.list[0].selected = !0, t.selectedIndex = 0, t.selectedNum = 1;
                        });
                    }
                    o.updateDiscount(i), d && (i.presellFlag && (i.canBuy = !1, i.tipsContent = "该商品属于预售商品，暂不支持加车"), 
                    i.subscribeFlag && (i.canBuy = !1, i.tipsContent = "该商品属于预约商品，暂不支持加车"), i.buyingSpreeFlag && (i.canBuy = !1, 
                    i.tipsContent = "该商品属于抢购商品，暂不支持加车")), delete i.item, delete i.newColorSize;
                    var I = a({}, i, {
                        cover: (0, n.getImg)(i.images[0], 160),
                        text: r,
                        choose: g.join(" ")
                    });
                    o.setData({
                        info: I,
                        skuProps: s,
                        tipsContent: i.tipsContent,
                        showAddCartBtns: !1
                    }, function() {
                        o.updateNum(h.value || 1);
                    });
                } else {
                    var y = {
                        sku: t,
                        cover: i.images[0],
                        name: i.skuName,
                        price: i.price
                    };
                    o.closeSkuLayer({}, y);
                } else o.$goto("/pages/h5/index", {
                    url: i.jumpUrl
                }, {
                    method: "redirectTo",
                    skipSwitchUrl: !0
                });
            }).catch(function(t) {
                r.show({
                    icon: r.ICON.WARNING,
                    content: i(t) || "网络错误，请稍后重试"
                });
            }).then(function() {
                o.setData({
                    isLoading: !1
                });
            });
        },
        checkPropSelect: function(t) {
            for (var e in t) if (!t[e]) return !1;
            return !0;
        },
        doAddNum: function(t) {
            var e = this.data, i = e.info, o = e.othersData, a = void 0 === o ? {} : o, s = e.goodsNum, n = i.isPingou, r = i.pingouInfo;
            s.addEnabled && (n && r && [ 1, 2, 3 ].indexOf(r.pinType) > -1 && 1 != a.buyType || this.updateNum(parseInt(s.value) + 1));
        },
        doSubNum: function(t) {
            var e = this.data, i = e.info, o = e.othersData, a = void 0 === o ? {} : o, s = e.goodsNum, n = i.isPingou, r = i.pingouInfo;
            s.subEnabled && (n && r && [ 1, 2, 3 ].indexOf(r.pinType) > -1 && 1 != a.buyType || this.updateNum(parseInt(s.value) - 1));
        },
        doInputNum: function(t) {
            var e = t.detail.value, i = this.data, o = i.info, a = i.othersData, s = void 0 === a ? {} : a, n = o.isPingou, r = o.pingouInfo;
            n && r && [ 1, 2, 3 ].indexOf(r.pinType) > -1 && 1 != s.buyType || this.updateNum(parseInt(e) || 1);
        },
        updateNum: function(t) {
            var e = this.data.info, i = e.stock, o = void 0 === i ? {} : i, a = e.poolFlag, s = this.data.goodsNum.limit, n = o.rn || 0, u = this.data.goodsNum.maxLimit, c = "";
            n > 0 && (u = Math.min(u, n)), t < s ? (t = s, s > 1 && (c = "该商品最少需购买" + s + "件")) : t > u && (t = u, 
            c = 200 == u ? "单款最多可买200件" : "该商品最多可买" + u + "件"), c && r.show({
                icon: r.ICON.WARNING,
                content: c
            });
            var d = this.data.info.poolList && Array.from(this.data.info.poolList);
            if (d && d.length) if (a) {
                if (d[0].list && d[0].list.length) {
                    d[0].selectedNum = t, d[0].selectedArr = d[0].list.filter(function(t) {
                        return t.selected;
                    });
                    var p = d[0].selectedArr.reduce(function(t, e) {
                        return t + e.num;
                    }, 0);
                    if (d[0].selectedArr[0].num += t - p, d[0].selectedArr[0].num <= 0) {
                        var h = d[0].list.find(function(t) {
                            return t.selected;
                        });
                        h.selected = !1, h.num = 1, d[0].selectedArr.shift();
                    }
                }
            } else d.forEach(function(e) {
                t <= e.list.length && (e.selectedNum = t);
            });
            this.setData({
                "info.poolList": d || [],
                "goodsNum.value": "number" == typeof this.data.goodsNum.value ? t + "" : +t,
                "goodsNum.subEnabled": t > s,
                "goodsNum.addEnabled": t < u
            });
        },
        observeFlagChange: function(t) {
            var e = this;
            t ? (this.showSkuPanel(), this.setData({
                isShowPopup: !0
            }), setTimeout(function() {
                e.setData({
                    isShowPopupAnim: !0
                });
            }, 100)) : (this.setData({
                isShowPopupAnim: !1
            }), setTimeout(function() {
                e.setData({
                    isShowPopup: !1
                }), e.resetPanelData();
            }, 500));
        },
        noscroll: function() {},
        startTuan: function(t) {
            var e = this;
            if (this.data.info.canBuy) {
                var i = this.data.info, o = i.skuId, a = i.pingouInfo, s = i.spAttr;
                t && (t && t.currentTarget && t.currentTarget.dataset).report && p.ReportManager.addPtagExposure("7415.8.1"), 
                (0, m.getTuanStatus)(o).then(function(t) {
                    if (t) if (1 == t.tuan_status) if (1 != t.cannot_buy_code) {
                        e.closeSkuLayer({}, {
                            sku: o,
                            num: e.data.goodsNum.value,
                            action: "buy"
                        });
                        var i = e.handleCommlistData(), n = {
                            activeid: t.active_id,
                            sku: Number(o),
                            num: e.data.goodsNum.value,
                            bizkey: "pingou",
                            bizval: t.biz_value,
                            member: t.tuan_member_count
                        };
                        n = Object.assign(n, i), s && s.isOverseaPurchase && 0 != s.isOverseaPurchase && (n.category = "global"), 
                        s && 1 == s.isXnzt && (n.type = 3), a && 0 != a.pinType && Object.assign(n, {
                            fixednum: 1
                        }), !a || 1 != a.pinType && 5 != a.pinType ? e.$goto("/pages/pay/index/index", n) : u.getCookie("cd_eid") ? e.$goto("/pages/pay/index/index", n) : (0, 
                        m.getNewerTuanSwitch)().then(function(i) {
                            if (i) {
                                var o = Object.assign({}, n, {
                                    pindes: t.pid
                                }), a = "https://wqs.jd.com/my/agreement/eid_page.shtml?" + (0, c.querystring)(o);
                                e.$goto("/pages/h5/index", {
                                    url: a
                                });
                            } else e.$goto("/pages/pay/index/index", n);
                        }).catch(function(t) {
                            e.$goto("/pages/pay/index/index", n);
                        });
                    } else wx.showModal({
                        title: "提示",
                        content: "该商品仅限京东新用户开团哦，再看看其他好货吧~",
                        showCancel: !1,
                        confirmText: "知道啦",
                        confirmColor: "#E93B3D"
                    }); else wx.showModal({
                        title: "提示",
                        content: "该活动已结束，去看看其他拼购商品吧！",
                        showCancel: !1,
                        confirmText: "知道啦",
                        confirmColor: "#E93B3D"
                    }); else wx.showModal({
                        title: "提示",
                        content: "抱歉，网络跑的有点慢，请稍后重试~",
                        showCancel: !1,
                        confirmText: "知道啦",
                        confirmColor: "#E93B3D"
                    });
                }).catch(function(t) {
                    var i = "开团失败，请稍后再试";
                    t && (i = "string" == typeof t ? t : t.message + "(" + t.code + ")"), r.show({
                        icon: r.ICON.WARNING,
                        content: i,
                        page: e
                    });
                });
            }
        },
        doBuy: function(t) {
            var e = this, i = (t && t.currentTarget && t.currentTarget.dataset || {}).report, o = encodeURIComponent(u.getCookie("wq_addr")), a = this.data.info, s = a.canBuy, n = a.spAttr, c = a.skuId, h = a.isECard, m = this.data.goodsNum.value || 1;
            if (this.data.isSpecialProcess && this.$report("DETAIL_SUBSCRIBE_SECKILL_BTN"), 
            i && (p.ReportManager.addPtagExposure("7415.8.21"), p.ReportManager.addPtagExposure(i)), 
            s && this.checkSku()) if (this.closeSkuLayer({}, {
                sku: c,
                num: m,
                action: "buy"
            }), h) {
                var g = (0, d.getAddress)().addressId;
                (0, l.checkPinStatus)({
                    loginText: "您当前登录的是临时账号，为了您的资产安全，购买礼品卡前请先登录京东账号",
                    switchText: "您当前登录的是临时账号，为了您的资产安全，购买礼品卡前请先切换至您的京东账号",
                    skuId: c
                }).then(function(t) {
                    var i = "https://wq.jd.com/pinbind/pintokenredirect?biz=ecard&url=" + encodeURIComponent("https://giftcard.jd.com/giftcardpurchase/mIndex?skuNumInfo=" + c + "," + m + "&clientType=1&addressId=" + g);
                    e.$goto("/pages/h5/index", {
                        url: i
                    });
                }).catch(function(t) {
                    t.message && r.show({
                        icon: r.ICON.WARNING,
                        content: t.message,
                        page: e
                    });
                });
            } else if (this.data.choseShopId) {
                var f = [ c, this.data.choseShopId, m, c, "1,0,0" ];
                this.$goto("/pages/pay/index/index", {
                    commlist: f.join(",")
                });
            } else if (this.data.info.isOTC && this.data.info.isZiying) {
                var v = "https://wqs.jd.com/order/s_confirm_otc.shtml?commlist=" + [ c, "", m, c, "1,0,0" ].join(",") + "&wq_addr=" + o;
                n && 1 == n.isXnzt && (v += "&type=3"), this.$goto("/pages/h5/index", {
                    url: v
                });
            } else {
                var k = this.handleCommlistData(), I = {
                    sku: c,
                    num: m,
                    type: n && 1 == n.isXnzt ? 3 : 0
                };
                "pingou" == this.data.sceneType && (I = Object.assign(I, {
                    bizkey: "pingou",
                    bizval: 0
                })), I = Object.assign(I, k), n && n.isOverseaPurchase && 0 != n.isOverseaPurchase && (I.category = "global"), 
                this.$goto("/pages/pay/index/index", I);
            }
            this.$report("VIEW_BUYING", {
                sku_id: c
            });
        },
        handleCommlistData: function() {
            var t = this.data.info, e = t.skuId, i = t.poolList, o = void 0 === i ? [] : i, s = this.data.goodsNum.value || 1, n = this.data.addedServices, r = "";
            o.length && (r = this.data.info.poolFlag ? o[0].selectedArr && o[0].selectedArr.map(function(t) {
                return t.sid + "|" + t.num;
            }).join("_") || "" : o.reduce(function(t, e) {
                return t.concat(e.list.filter(function(t) {
                    return t.selected;
                }));
            }, []).map(function(t) {
                return t.sid + "|" + s;
            }).join("_") || "");
            var u = (0, m.getServicesCommList)({
                skuId: e,
                buyNum: s
            }, n);
            return a({
                zp: r
            }, u);
        },
        addToCart: function(t) {
            var e = this, i = this.data.info, o = i.canBuy, a = i.skuId, s = i.spAttr, n = i.poolList, u = void 0 === n ? [] : n, c = i.poolFlag, d = i.isECard, h = this.data, g = h.sceneType, v = h.addedServices, k = t && t.currentTarget && t.currentTarget.dataset || {}, I = k.disabled, y = k.report, N = this.data.goodsNum.value || 1;
            if (o && !I && this.checkSku()) {
                y && p.ReportManager.addPtagExposure(y), this.us.prepare(this.us.OP_ITEM_ADD_CART);
                var b = "";
                u.length && (b = c ? u[0].selectedArr && u[0].selectedArr.map(function(t) {
                    return t.sid + "|" + t.num;
                }).join("_") || "" : u.reduce(function(t, e) {
                    return t.concat(e.list.filter(function(t) {
                        return t.selected;
                    }));
                }, []).map(function(t) {
                    return t.sid + "|" + e.data.goodsNum.value;
                }).join("_") || "");
                var S = 1 == s.isLOC && this.data.choseShopId ? this.data.choseShopId : "";
                d ? (0, l.checkPinStatus)({
                    loginText: "您当前登录的是临时账号，为了您的资产安全，购买礼品卡前请先登录京东账号",
                    switchText: "您当前登录的是临时账号，为了您的资产安全，购买礼品卡前请先切换至您的京东账号",
                    skuId: a
                }).then(function(t) {
                    (0, m.addCardList)({
                        buyNum: N,
                        sku: a,
                        pin: t.pin || "",
                        canBuy: o
                    }).then(function(t) {
                        e.us.report(e.us.OP_ITEM_ADD_CART, 0, null), r.show({
                            icon: r.ICON.SUCCESS,
                            content: "加入卡清单成功",
                            page: e
                        }), e.closeSkuLayer();
                    }).catch(function(t) {
                        e.us.report(e.us.OP_ITEM_ADD_CART, 1, t), r.show({
                            icon: r.ICON.WARNING,
                            content: "string" == typeof t ? t : "加入卡清单失败(" + t.code + ")" || "加入卡清单失败",
                            page: e
                        });
                    });
                }).catch(function(t) {
                    t.message && r.show({
                        icon: r.ICON.WARNING,
                        content: t.message,
                        page: e
                    });
                }) : (0, m.addCart)(this.data.info, {
                    buyNum: N,
                    type: s && 1 == s.isXnzt ? 3 : 0,
                    sku: a,
                    shopid: S,
                    str: b,
                    services: v
                }).then(function(t) {
                    e.us.report(e.us.OP_ITEM_ADD_CART, 0, null), r.show({
                        icon: r.ICON.SUCCESS,
                        content: "加入购物车成功",
                        page: e
                    }), e.closeSkuLayer(), e.triggerEvent("onAddCartFail", {
                        code: 1001,
                        num: t
                    }), f.event.emit("cartrefresh");
                }).catch(function(t) {
                    e.us.report(e.us.OP_ITEM_ADD_CART, 1, "string" == typeof t ? t : t.message), t && "8969" == t.code && "detail" === g ? (e.closeSkuLayer(), 
                    e.triggerEvent("onAddCartFail", t)) : r.show({
                        icon: r.ICON.WARNING,
                        content: "string" == typeof t ? t : t.message + "(" + t.code + ")" || "添加购物车失败，请稍后再试",
                        page: e
                    });
                }), this.$report("VIEW_ADD_TO_CART", {
                    sku_id: a
                });
            }
        },
        pingouConfirm: function() {
            var t = this.data, e = t.info, i = t.othersData, o = void 0 === i ? {} : i;
            e.isPingou && 1 == o.buyType ? this.doBuy() : e.isPingou && 2 == o.buyType ? (this.$report("CLICK_START_TUAN_CONFIRM"), 
            this.startTuan()) : this.startTuan(), e.isPingou && p.ReportManager.addPtagExposure("7418.16.27");
        },
        gotoPingouDetail: function(t) {
            var e = this.data.othersData, i = void 0 === e ? {} : e, o = this.data.info.skuId, a = this.data.pingouTipData, s = a.activeId, n = a.tuanId, r = a.tuanList, c = a.masterNickname, d = "/pages/pingou/detail/index?sku=" + o + "&activeid=" + s + "&tuanid=" + n + "&headUrl=" + r[0].head_portrait_url + "&nickname=" + c, h = u.getCookie("item_orderchannel");
            h && (h = JSON.parse(h)).cubeinvite && h.cubeinvite.value && (d += "&from=cubeinvite_" + h.cubeinvite.value), 
            this.$goto(d, "navigateTo"), p.ReportManager.addPtagExposure("7145.8.12"), 2 == i.buyType && this.$report("CLICK_JOIN_TUAN");
        },
        checkSku: function() {
            var t = this.getCurrentSelect();
            if (!this.checkPropSelect(t)) {
                var e = [];
                return this.data.skuProps.forEach(function(i) {
                    t[i.name] || e.push(i.text.replace("选择", ""));
                }), r.show({
                    icon: r.ICON.WARNING,
                    content: "请选择`" + e.join("/") + "`",
                    page: this
                }), !1;
            }
            return !0;
        },
        handleLookLike: function() {
            var t = this.data.info, e = "https://wqs.jd.com/search/searchsimilar.shtml?sceneid=18&sku=" + t.skuId + "&jp=" + t.price;
            this.$report("DETAIL_LOOK_SIMILAR_BUTTON"), this.$goto("/pages/h5/index", {
                url: e
            });
        },
        handleStockNotice: function(t) {
            var e = "https://wqs.jd.com/item/arrival_notice.shtml?source=1&sku=" + this.data.info.skuId;
            this.$report("DETAIL_STOCK_NOTICE"), this.$goto("/pages/h5/index", {
                url: e
            });
        },
        method0: function() {
            var t = "" + this.data.bottomBtn[0].method;
            this[t] && this[t]();
        },
        method1: function() {
            var t = "" + this.data.bottomBtn[1].method;
            this[t] && this[t]();
        },
        subscribeItem: function() {
            this.$report("DETAIL_SUBSCRIBE_BTN");
            var t = "https://wqs.jd.com/item/yuyue_item.shtml?sku=" + this.data.info.skuId + "&sceneval=3";
            this.$goto("/pages/h5/index", {
                url: t
            });
        },
        specialBuy: function(t) {
            var e = this.data.info, i = e.isPop, o = e.stock, a = void 0;
            o && o.D ? a = o && o.D && o.D.type : o && o.venderType && "100" == o.venderType ? a = 100 : i || (a = -1), 
            this.$report("DETAIL_BUYING_SPREE_BTN");
            var s = {
                sku: this.data.info.skuId,
                num: this.data.goodsNum.value,
                rcheck: 1
            };
            void 0 !== a && (s.venderType = a), this.$goto("/pages/specialpay/qianggou/qianggou", s);
        },
        chooseShop: function() {
            this.triggerEvent("chooseShop");
        },
        updateDiscount: function(t) {
            var e = (0, m.getMarketPrice)(t), i = this.data.info.price, o = {}, a = "";
            +e.price > +i && (a = (10 * i / e.price).toFixed(1)), a && a < 10 && (o = {
                desc: e.title,
                price: e.price,
                rate: a + "折"
            }, this.$report("EXP_LINE_PRICE")), t.discount = o;
        },
        gotoGiftList: function(t) {
            var e = t.currentTarget.dataset.url, i = this.data.info, o = i.cover, a = i.skuName, s = i.price, n = i.poolFlag, r = i.poolList, u = void 0 === r ? [] : r, c = this.data.goodsNum.value;
            0 == e.indexOf("/pages/item/subPackages/gift/gift") && this.$report("DETAIL_GIFT_PROMOTION"), 
            f.itemPoolList = u, this.$goto(e, {
                name: a,
                price: s,
                cover: o,
                num: c,
                flag: n
            }, "navigateToByForce");
        },
        updateLimitBuy: function(t) {
            var e = this, i = t.promote, o = void 0 === i ? [] : i, a = t.pingouInfo, s = t.othersData, n = void 0 === s ? {} : s, r = void 0, u = 200;
            o.forEach(function(t, e) {
                "限购" === t.name && (r = e);
            }), t.spAttr && parseInt(t.spAttr.MN) ? u = parseInt(t.spAttr.MN) > 9999 ? 9999 : parseInt(t.spAttr.MN) : t.category && "1713" == t.category[0] && (u = 1e3);
            var c = parseInt(t.spAttr && t.spAttr.LowestBuy) || 0;
            a && 0 != a.pinType && 1 != n.buyType ? this.setData({
                "goodsNum.value": 1,
                "goodsNum.limit": 1,
                "goodsNum.limitText": ""
            }) : t.subscribeFlag || t.buyingSpreeFlag ? this.setData({
                "goodsNum.value": 1,
                "goodsNum.maxLimit": 1,
                "goodsNum.limitText": "",
                "goodsNum.subEnabled": !1,
                "goodsNum.addEnabled": !1
            }) : t.spAttr && t.spAttr.LowestBuy && c > 1 ? this.setData({
                "goodsNum.value": c,
                "goodsNum.limit": c,
                "goodsNum.limitText": c + "件起售",
                "goodsNum.maxLimit": u
            }) : this.setData({
                "goodsNum.value": 1,
                "goodsNum.limit": 1,
                "goodsNum.limitText": "",
                "goodsNum.maxLimit": u
            });
            var p = o[r] || {};
            (0, m.getLimitBuyInfo)({
                skuId: t.skuId,
                areaId: (0, d.getUserAddressID)(),
                category: t.category && t.category.join(","),
                venderId: t.venderID,
                skuName: t.skuName,
                promoId: p.activityId,
                promoType: p.activityType,
                promoPrice: p.price && 100 * parseInt(p.price) || ""
            }).then(function(t) {
                var i = t.limitNum, o = t.noSaleFlag, a = {}, s = "", n = 0;
                i > 1 && !c ? (n = i, s = "最多可购买" + i + "件") : 1 != i || c ? i && c && c < i && (n = i, 
                s = c + "件起售，最多可购买" + i + "件") : (n = i, s = "仅限购买1件"), s && (a["goodsNum.limitText"] = s), 
                n && (a["goodsNum.maxLimit"] = n, a["goodsNum.addEnabled"] = n > 1), 1 == o && (a.tipsContent = "该商品在该地区暂不支持销售，非常抱歉！", 
                a["info.canBuy"] = !1), e.setData(a);
            });
        },
        getPingouTipInfo: function(t) {
            var e = this;
            (0, m.getPingouTuijianTuan)(t).then(function(t) {
                var i = {
                    head_portrait_url: "https://img11.360buyimg.com/jdphoto/s60x60_jfs/t24697/277/2148369463/2325/5594f2b9/5bc478b7Na0b2e015.png"
                };
                if (t.active_id) {
                    var o = t.nick_name || "*******";
                    o = o.length > 7 ? o.replace(/(^[^])([^]*)([^]$)/, "$1***$3") : o, t.head_url = t.head_url ? t.head_url : "https://img10.360buyimg.com/jdphoto/s100x100_jfs/t1951/176/1222496278/15607/bbb3b2eb/568cdbf0N4d33c2a4.png", 
                    e.setData({
                        pingouTipData: {
                            activeId: t.active_id,
                            tuanId: t.tuan_id,
                            tuanList: [ {
                                head_portrait_url: t.head_url
                            }, i ],
                            masterNickname: o
                        }
                    });
                }
            }).catch(function(t) {});
        },
        showBtns: function() {
            this.data.info.canBuy && (this.data.isPingouApp || this.setData({
                showAddCartBtns: !0
            }));
        },
        hiddenBtns: function() {
            this.setData({
                showAddCartBtns: !1
            });
        },
        updateItemPoolList: function(t) {
            var e = t || [];
            e.length && (e[0].selectedArr = e[0].list.filter(function(t) {
                return t.selected;
            }), this.setData({
                "info.poolList": e
            }));
        }
    }
});