function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.skuId, o = e.url, s = e.isNewUser, n = e.pingou, a = (0, 
    I.getAddress)().areaId, u = {
        url: "",
        data: {},
        priority: "HIGH",
        ump: {
            bizId: q,
            opId: 1
        }
    }, c = !0;
    return o ? (u.url = o.indexOf("https:") < 0 ? "https:" + o : o, c = !1) : (u.url = x.ITEM_INFO, 
    u.speedPointId = 1, u.data = {
        sku: t,
        callback: "skuInfoCB",
        cgi_source: n ? "pingou" : "xcx",
        areaid: a,
        datatype: "1"
    }, ("android" === w.systemInfo.platform || /android/gi.test(w.systemInfo.system)) && (u.data.platformos = "android")), 
    h.request.get(u).then(function(t) {
        var o = t.body, n = o.errCode;
        if (n && 0 != n) {
            var u = M.ITEM_OUT_OF_STOCK;
            return "10001" == n || "20160304" == n ? u = M.ITEM_NOT_EXIST : "20017" == n && (u = M.ITEM_NOT_SUPPORT), 
            y.default.reject({
                code: n,
                message: u
            });
        }
        if (1 == o.isSamCard) return o;
        if (o.redirectUrl && c) {
            var p = {
                datatype: "1",
                areaid: a
            };
            return r({
                url: (0, S.createURL)(o.redirectUrl.replace("&areaid=&", "&"), p)
            });
        }
        var d = {};
        try {
            v(d = i(o, s) || {}, e);
        } catch (e) {
            A.log(e);
        }
        return d;
    }).catch(function(e) {
        y.default.reject(e);
    });
}

function i(e, t) {
    var r = e.item, i = e.price || {};
    (F = {}).suitPrice = {}, F.canBuy = !0, F.skuId = e.skuId, F.skuName = e.skuName, 
    F.venderID = r.venderID, F.newColorSize = r.newColorSize || [], F.skuProp = {}, 
    F.item = r, F.skuPrice = i, F.originPrice = l(i.op ? i.op : "0.00"), F.marketPrice = l(i.m ? i.m : "0.00"), 
    F.price = l(i.p ? i.p : "0.00"), F.images = r.image, F.expAttr = e.expAttr, F.np = i.np || {}, 
    F.spAttr = r.spAttr || {}, F.stock = e.stock, F.category = r.category, F.feetype = e.feetype, 
    F.isPop = r.isPop, F.isZiying = !r.isPop, F.isPlus = 0 != e.plusMemberType, F.isLoc = "1" == F.spAttr.isLOC, 
    F.isPingou = "1" == e.pingou, F.isNewUser = t, F.tipsContent = "", F.isFlashBuy = e.flashpurchase && 1 == e.flashpurchase.yn, 
    F.hasBigouCode = "1" === e.bigouinfo, F.skuMark = r.skuMark && "string" == typeof r.skuMark ? JSON.parse(r.skuMark) : r.skuMark, 
    F.yuyue = e.yuyue, F.miao = e.miao, F.spuId = r.isPop ? r.description.slice(1) : "", 
    F.isPingou && c(F, e), e.stock || (F.isNeedRegainStock = !0), e.price ? o(F, e.price) : F.isNeedRegainPrice = !0, 
    s(F, e), n(F, e), p(F, e);
    var a = (0, b.initPromoteData)(e.promov2 && e.promov2[0] || {}, {
        isPingou: F.isPingou
    });
    return a && Object.assign(F, a), F;
}

function o(e, t) {
    if (t.p && (e.price = l(t.p), e.originPrice = l(t.op), e.marketPrice = l(t.m)), 
    t.tkp && (e.specialPrice = l(t.tkp)), t.pp && (e.plusPrice = l(t.pp)), t.tpp && (e.trialPlusPrice = l(t.tpp)), 
    t.sp && (e.samPrice = l(t.sp)), t.sfp && parseFloat(e.price) > parseFloat(t.sfp) && (e.sfpPrice = l(t.sfp)), 
    t.l && (e.linePrice = l(t.l), e.isFlashBuy && (e.oriPrice = e.linePrice)), t.up) {
        var r = t.up.split(","), i = {
            tkp: "specialPrice",
            pp: "plusPrice",
            tpp: "trialPlusPrice",
            sp: "samPrice",
            sfp: "sfpPrice"
        };
        if (!r.length) return;
        e.priorityPrice = i[r[0]] || "";
    }
}

function s(e, t) {
    var r = e.item;
    e.extraPriceFlag = !0;
    var i = r.skuMark && "string" == typeof r.skuMark ? JSON.parse(r.skuMark) : r.skuMark, o = e.spAttr;
    if ("1" === r.warestatus) if (("1" == o.isKO || t.miao && "1" == t.miao.isKo) && (e.buyingSpreeFlag = !0, 
    e.processType = 3), i && i.presale || "1" == o.YuShouNoWay && "1" == o.YuShou) e.presellFlag = !0, 
    e.processType = 2; else if ("1" == o.YuShou) e.subscribeFlag = !0, e.processType = 1; else if (t.promomiao) {
        var s = t.promomiao;
        e.seckillFlag = !0, e.extraPriceFlag = !1, s.jdPrice = l(s.jdPrice ? s.jdPrice : 0), 
        s.miaoShaPrice = l(s.miaoShaPrice ? s.miaoShaPrice : 0), e.promomiao = s;
    } else if (t.flashpurchase && 1 == t.flashpurchase.yn) {
        var n = O.getServerTime(), a = t.flashpurchase;
        n < a.et && (n > a.st && (e.processType = 5), e.flashpurchase = a, e.flashpurchaseFlag = !0);
    }
    "12632" == e.category[1] && (e.isOTC = !0), (e.presellFlag || e.subscribeFlag || e.buyingSpreeFlag || e.flashpurchaseFlag) && (e.extraPriceFlag = !1), 
    "1" == e.spAttr.isJMa && (e.isJMa = !0), "6980" == e.category[2] && (e.isECard = !0);
}

function n(e, t) {
    var r = [], i = t.item, o = i.saleProp, s = void 0 === o ? {} : o, n = i.newColorSize, u = void 0 === n ? [] : n, c = t.item.salePropSeq, p = void 0 === c ? {} : c, d = [];
    if (u.length) {
        if (e.skuProp.salePropArr) d = e.skuProp.salePropArr, p = e.skuProp.salePropSeq; else {
            for (var f in s) s.hasOwnProperty(f) && s[f] && d.push(f);
            for (var l = [], m = 0, g = d.length; m < g; m++) {
                var v = d[m], P = (p[v] || []).filter(function(e) {
                    return (e || "").trim();
                });
                if (p[v] = P, P.length) {
                    var k = s[v] || "";
                    k.length > 2 && (k = k.replace(/^选择/, "").substr(0, 4)), l.push(k);
                } else d[m] = "";
            }
            d = d.filter(function(e) {
                return "" !== e;
            }), e.skuProp.salePropArr = d, e.skuProp.salePropSeq = p, e.skuProp.propNameArr = l;
        }
        if (e.skuProp.salePropArr && e.skuProp.salePropArr.length) for (var y = e.skuProp.salePropArr, h = e.skuProp.propNameArr || [], _ = 0, I = y.length; _ < I; _++) {
            var S = {}, T = t.item.spAttr;
            T.cmmz && "1" !== T.cmmz && "2" !== T.cmmz && "尺码" === h[_] && (S.sizeCode = T.cmmz, 
            S.spuId = e.spuId, S.sizeText = U[T.cmmz], S.isSizeGuideShow = !0), S.name = y[_], 
            S.text = h[_], S.value = p[y[_]] || [], S.current = a(y[_]), S.text && r.push(S);
        }
        e.props = r;
    }
}

function a(e) {
    if (e) {
        var t = F.newColorSize;
        if (!t.length) return "";
        for (var r = 0, i = t.length; r < i; r++) if (t[r].skuId == F.skuId) return t[r][e] || "";
    }
}

function u(e, t) {
    var r = "";
    switch (t = t || '"Network Error"', e) {
      case _.default.RET_HTTP_RESPONSE_ERROR:
        r = _.default.Text_RET_HTTP_RESPONSE_ERROR;
        break;

      case _.default.RET_WS_CONNECT_ERROR:
        r = _.default.Text_RET_WS_CONNECT_ERROR;
        break;

      case _.default.RET_WS_REQUEST_TIMEOUT:
        r = _.default.Text_RET_WS_REQUEST_TIMEOUT;
        break;

      default:
        r = t;
    }
    return r;
}

function c(e, t) {
    if (t.pingouActive) {
        var r = t.pingouActive && t.pingouActive.active_info && t.pingouActive.active_info.pingou_type || {};
        e.isPingou = !0;
        var i = !1;
        if (1 == r.type && (i = !0), 2 == r.type) {
            var o = r.msg4;
            e.category[0] == o && (i = !0);
        }
        e.pingouInfo = {
            active_info: t.pingouActive.active_info,
            pinType: r.type,
            cannotBuy: (1 == r.type || 2 == r.type) && "0" != r.msg1 && !e.isNewUser,
            skuid_list: t.pingouActive.skuid_list || [],
            isNewerTuan: i
        }, e.pingouInfo.cannotBuy && (e.tipsContent = "抱歉，此商品为新用户专享福利，您不符合开团/参团条件");
    }
    t.pingouItem && (e.pingouInfo = Object.assign({}, e.pingouInfo, {
        price: t.pingouItem.m_bp
    }));
}

function p(e, t) {
    var r = e.stock || {};
    0 == r.StockState || 34 == r.StockState ? (e.isNullStock = !0, e.canBuy = !1, e.tipsContent = "无货，或此商品不支持配送至该地址") : e.tipsContent = "", 
    e.isJMa && "无货，或此商品不支持配送至该地址" === e.tipsContent && (e.tipsContent = ""), t.huanUrl && (e.canBuy = !1, 
    e.tipsContent = "抱歉，该商品暂不支持在此购买"), e.subscribeFlag && e.yuyue && e.yuyue.state <= 3 && (e.tipsContent = "");
    var i = d(e), o = i.canBuy, s = i.tipsContent;
    !1 === o && (e.canBuy = !1), e.tipsContent = void 0 === s ? e.tipsContent || "" : s;
}

function d(e) {
    var t = e.spAttr, r = e.category, i = e.stock, o = void 0 === i ? {} : i, s = o && o.D && o.D.type;
    if (1 == t.isLOC || 2 == t.isLOC || 4 == t.isLOC) return {};
    if ("6980" == r[2]) return {};
    if (/^3\d{7}$/.test(e.skuId)) return f();
    if (/^20\d{10}$/.test(e.skuId)) {
        var n = r[2];
        if ("14402 14385 14386 14387 14389 14390 14391 14392 14395 14399 14400 14388 14393 14394 14396 14397 14398 14401".indexOf(n) > -1) return f();
    }
    if (e.item && "1" !== e.item.warestatus) return f("抱歉，该商品已下架");
    if ("暂无定价" === e.price) return f("抱歉，该商品暂不支持购买");
    if (r && r.length > 2) {
        var a = r[0], u = r[2];
        if ("4938" === a && "9392" !== u || ~" 1195 13046 13121 13532 13680 5156 ".indexOf(" " + u + " ")) return f();
        if ("6980" == u) return f();
        if ("12274" == u) return f("抱歉，该商品暂不支持在此购买");
        if ("12856" == u) return f("抱歉，该商品暂不支持在此购买");
    }
    if (t) {
        if (t.isLOC > 1 || "1" === t.PinGou || "1" === t.HYKHSP || "1" === t.isPickingGoods || "2" === t.isPickingGoods || "1" === t.isFlimPrint || 1 * t.isWeChatStock > 0 && !(1 * t.isWeChatStock & 1)) return f();
        if ("1" === t.isSelfService || "2" === t.isSelfService || "5" === t.isSelfService || "1" == t.GiftsGoods || "1" === t.isPackBox || "1" === t.isGiftCard) return f("抱歉，该商品不支持单独购买");
        if ("3" === t.LeaseType || "1" === t.fqy || "1" === t.Customize || "2" === t.Customize) return f();
    }
    if ([ "146426", "635467", "117761", "591371", "198809" ].indexOf(e.venderID) > -1) return f();
    if ("719574" === e.venderID) return f("抱歉，该商品仅支持在京东APP上购买");
    if (o.D && 613998 == o.D.id) return f();
    if (e.feetype && e.feetype.datas) {
        if (e.feetype.dis) return f("抱歉，合约机暂不支持在此购买");
        for (var c in e.feetype.datas) if (e.feetype.datas[c].feetypes[0].sku == e.skuId && "100" == e.feetype.datas[c].feetypes[0].ft) return {};
        return f("抱歉，合约机暂不支持在此购买");
    }
    return "101" == s ? f("抱歉，该商品暂不支持在此购买") : {};
}

function f(e) {
    return {
        canBuy: !1,
        tipsContent: e || "抱歉，该商品暂不支持在此购买"
    };
}

function l(e) {
    return (e = Number(e)) > 0 ? e.toFixed(2) : M.NO_PRICE;
}

function m(e, t, r, i) {
    return new y.default(function(o, s) {
        if (e) {
            var n = {
                client_id: 100,
                sku_id: e,
                tuan_id: r || 0,
                active_id: t || 0,
                orderId: 0,
                jointype: 0,
                platform: 4,
                callback: "getTuanStatusCb",
                app_id: i || 0
            }, a = N.getCookie("item_orderchannel");
            a && (a = JSON.parse(a)).cubeinvite && a.cubeinvite.value && (n = Object.assign(n, {
                from: "cubeinvite_" + a.cubeinvite.value
            })), (0, T.getLoginPromise)().then(function(t) {
                h.request.get({
                    url: x.TUAN_STATUS,
                    data: n
                }).then(function(t) {
                    var r = t.body;
                    t.header;
                    0 == r.iRet ? o(r) : 2 == r.iRet ? (0, T.doLogin)().then(function() {
                        m(e);
                    }).catch(function() {
                        s();
                    }) : s({});
                }).catch(function(e) {
                    var t = e.code, r = e.message;
                    s({
                        code: t,
                        message: r
                    });
                });
            }).catch(function(e) {
                s(e);
            });
        } else s();
    });
}

function g(e, t) {
    var r = (0, I.getUserAddressID)();
    return new y.default(function(i, o) {
        e.canBuy ? (0, T.getLoginPromise)().then(function() {
            var s = {}, n = void 0;
            t.isRelated ? n = t.skuid : e.skuId ? n = e.skuId : t.sku && (n = t.sku);
            var a = [ n, t.shopid || "", t.buyNum || 1, t.isRelated ? "" : e.skuId, t.isRelated ? 4 : 1, 0, 0 ];
            t.str && a.push(t.str), t.services && (s = P({
                skuId: n,
                polyType: t.isRelated ? 4 : 1,
                isSuit: !!t.isRelated
            }, t.services));
            var u = k({
                scene: 2,
                reg: 1,
                type: t.type || 0,
                commlist: a.join(","),
                locationid: r.split("_").slice(0, 3).join("-"),
                t: Math.random()
            }, s);
            C.get("3c_shop", "").then(function(e) {
                var r = e.id || "";
                r && (u.shopid = r);
                var s = {
                    url: x.ADD_CART,
                    data: u,
                    ump: {
                        bizId: q,
                        opId: 6
                    }
                };
                h.request.get(s).then(function(e) {
                    var r = e.body, s = r.errId, n = "";
                    if ("0" === s) {
                        var a = 1 * r.cart.mainSkuNum;
                        i(a), N.setCookie({
                            data: {
                                cartNum: {
                                    key: "cartNum",
                                    value: a,
                                    maxAge: 2592e6
                                }
                            }
                        });
                    } else "8968" === s ? n = "商品数量最大超过200" : "8969" === s ? n = "添加商品失败，已超出购物车最大容量！" : "13" === s ? (0, 
                    T.doLogin)().then(function() {
                        g(t);
                    }).catch(function(e, t) {
                        o({
                            message: "用户未登录",
                            code: 13
                        });
                    }) : n = "添加失败，请稍后再试";
                    n && o({
                        message: n,
                        code: s
                    });
                }).catch(function(e) {
                    var t = e.code, r = e.message;
                    o({
                        code: t,
                        message: r
                    });
                });
            });
        }).catch(function(e, t) {
            o("用户未登录(13)");
        }) : o("can not add");
    });
}

function v(e, t) {
    if (t.needReport) {
        var r = e.canBuy ? E.EXP_VIEW_CAN_BUY : E.EXP_VIEW_CANNOT_BUY;
        if (t.pingou) {
            R.ReportManager.setCurrentPageAndAddPv("http://wq.jd.com/wxapp/pages/pingou/item/item", {
                sku_id: e.skuId,
                isItem: 1,
                pgitem_type: 1
            }), R.ReportManager.addPtagExposure(r);
        } else {
            t.pps && R.ReportManager.setPPS(t.pps), R.ReportManager.addDetailPagePv("http://wq.jd.com/wxapp/pages/item/detail/detail", e.skuId, e.venderID, r, e.buyingSpreeFlag), 
            R.ReportManager.addPtagExposure(r);
        }
    }
}

function P(e, t) {
    var r = t.jdServices, i = void 0 === r ? [] : r, o = t.extServices, s = void 0 === o ? [] : o, n = t.giftServices, a = void 0 === n ? [] : n, u = {};
    if (s.length) {
        var c = s.map(function(t) {
            return [ t.id, "", e.buyNum || 1, e.skuId, 1 === e.polyType ? 7 : 8, e.skuId, 0 == e.pid ? "" : e.pid, 0 ].join(",");
        }).join("$");
        c && Object.assign(u, {
            ybcommlist: c
        });
    }
    if (i.length) {
        var p = e.isVirtualSuit || e.isSuit ? e.itemId || "" : "", d = i.map(function(t) {
            return [ t.id, "", "", "", "", e.skuId, p, e.isVirtualSuit ? "suitType:1" : "" ].join(",");
        }).join("$");
        d && Object.assign(u, {
            jdhscommlist: d
        });
    }
    if (a.length) {
        var f = a.map(function(t) {
            return [ e.skuId, "", e.buyNum || 1, e.skuId, 1, "", 0, "", t.id ].join(",");
        }).join("$");
        f && Object.assign(u, {
            commlist: f
        });
    }
    return u;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getPingouTuijianTuan = exports.getLimitBuyInfo = exports.getServicesCommList = exports.getMarketPrice = exports.getPingouPrice = exports.getNewerTuanSwitch = exports.addCardList = exports.addCart = exports.getTuanStatus = exports.getSpecifySku = exports.initItem = void 0;

var k = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (e[i] = r[i]);
    }
    return e;
}, y = t(require("../../libs/promise.min.js")), h = require("../../common/request/request.js"), _ = t(require("../../common/http_constant.js")), I = require("../../common/user_info"), S = require("../../common/url_utils.js"), T = require("../../common/login/login.js"), C = e(require("../../common/localStorage.js")), N = e(require("../../common/cookie-v2/cookie.js")), O = e(require("../../common/fe_helper.js")), b = require("../../models/item/item_model"), j = require("../../common/logger.js"), R = require("../../api/Ptag/report_manager"), E = e(require("./constants")), A = new j.Logger("SKU 属性选择弹层"), x = {
    ITEM_INFO: "https://wqitem.jd.com/item/waview",
    ADD_CART: "https://wq.jd.com/deal/mshopcart/addcmdy",
    ADD_CARD_LIST: "https://wqjsf.jd.com/giftcardsoaCartService/addCart",
    TUAN_STATUS: "https://wq.jd.com/pingou_core/GetTuanStatus_UTF8",
    PINTUAN_INFO: "https://wq.jd.com/pingou_core/CreateOrJoinTuan",
    NEWER_TUAN_SWITCH: "http://wq.360buyimg.com/data/ppms/js/ppms.pagev33036.jsonp",
    PINGOU_PRICE: "https://wq.jd.com/pingou_api/getskusprice",
    JDS_BRANCH: "https://wq.jd.com/commodity/jdsbranch/get",
    GET_PINGOU_NEWUSER: "https://wq.jd.com/pingou_core/GetIsNewUserSku"
}, w = getApp(), q = 760, M = {
    NO_PRICE: "暂无定价",
    ITEM_OUT_OF_STOCK: "对不起，该商品已下架",
    ITEM_NOT_EXIST: "对不起，该商品不存在",
    ITEM_NOT_SUPPORT: "抱歉，小程序内暂不支持购买此商品"
}, U = {
    1: "国际标准",
    2: "中国码",
    3: "意大利码",
    4: "法国码",
    5: "美国码",
    6: "英国码",
    7: "德国码",
    8: "日本码",
    9: "韩国码",
    10: "澳大利亚码",
    11: "俄罗斯码",
    12: "丹麦码",
    13: "巴西码",
    14: "罗马数字",
    15: "数字码"
}, F = {};

exports.initItem = r, exports.getSpecifySku = function(e, t) {
    var r = [], i = t;
    if (i) for (var o = 0; o < i.length; o++) {
        var s = !1;
        for (var n in e) e[n] && i[o][n] != e[n] && (s = !0);
        s || r.push(i[o].skuId);
    }
    return r;
}, exports.getTuanStatus = m, exports.addCart = g, exports.addCardList = function(e) {
    return new y.default(function(t, r) {
        e.canBuy ? (0, T.getLoginPromise)().then(function() {
            var i = {
                pin: e.pin || "",
                skuId: e.sku || "",
                num: e.buyNum || 1
            }, o = {
                url: x.ADD_CARD_LIST,
                data: i,
                noToken: !0,
                ump: {
                    bizId: q,
                    opId: 12
                }
            };
            h.request.get(o).then(function(e) {
                e.body.success ? t(!0) : r("添加失败，请稍后再试");
            }).catch(function(e) {
                e.code;
                var t = e.message;
                r(t);
            });
        }).catch(function(e, t) {
            r("用户未登录(13)");
        }) : r("can not add");
    });
}, exports.getNewerTuanSwitch = function() {
    var e = {
        url: x.NEWER_TUAN_SWITCH
    };
    return h.request.get(e).then(function(e) {
        return "1" == e.body.data[0].riskSwitch;
    }).catch(function(e) {
        return y.default.reject(e);
    });
}, exports.getPingouPrice = function(e) {
    var t = {
        skuids: e,
        origin: "5",
        platform: "4"
    }, r = {
        url: x.PINGOU_PRICE,
        data: t
    };
    return h.request.get(r).then(function(e) {
        return e.body[0];
    }).catch(function(e) {
        return y.default.reject(e);
    });
}, exports.getMarketPrice = function(e) {
    var t = {};
    return [ "1713", "4051", "4052", "4053" ].includes(e.category[0]) ? (t = {
        title: "",
        price: ""
    }, parseFloat(e.marketPrice) > 0 && (t.title = "", t.price = e.marketPrice)) : e.linePrice && (t = {
        title: "",
        price: e.linePrice
    }), t;
}, exports.getServicesCommList = P, exports.getLimitBuyInfo = function(e) {
    var t = {
        url: x.JDS_BRANCH,
        data: {
            skuid: e.skuId || "",
            area: e.areaId || "",
            functionids: "10",
            cat: e.category || "",
            venderid: e.venderId || "",
            skuname: e.skuName || "",
            promoid: e.promoId || "",
            promotype: e.promoType || "",
            promoprice: e.promoPrice || ""
        },
        ump: {
            bizId: q,
            opId: 14
        }
    };
    return new y.default(function(e, r) {
        h.request.get(t).then(function(t) {
            var r = t.body, i = r.errcode;
            e(0 == i ? r.limitbuy : {});
        }).catch(function(e) {
            var t = u(e.code, e.message);
            r(t);
        });
    });
}, exports.getPingouTuijianTuan = function(e) {
    var t = {
        sku_id: e,
        platform: "4",
        callback: "getPingouTuijianCB"
    }, r = {
        url: x.GET_PINGOU_NEWUSER,
        data: t
    };
    return h.request.get(r).then(function(e) {
        var t = e.body;
        if (0 == t.iRet || 10 == t.iRet) return t.data;
        y.default.reject();
    }).catch(function() {
        return y.default.reject();
    });
};