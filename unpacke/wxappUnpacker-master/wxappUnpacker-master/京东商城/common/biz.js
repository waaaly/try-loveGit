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

function r(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

function o(e, t) {
    var r = {};
    return e.forEach(function(e) {
        var t = e.dwActId;
        e.area.forEach(function(e) {
            var o = t + "_" + e.dwAreaId;
            r[o] || (r[o] = []), r[o] = r[o].concat(e.list || []);
        });
    }), r;
}

function n(e) {
    var t = [];
    return e.forEach(function(e) {
        +e.dwWeChatPrice > 0 && +e.dwActMinPrice > 0 && t.push(e);
    }), t;
}

function a() {
    for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = [], r = []; e.length > 0; ) t.push(e.splice(0, 10));
    return t.forEach(function(e) {
        r.push(new h.default(function(t, r) {
            _.request.get("https://wq.jd.com/activeapi/queryjdshopfreecouponstatus", {
                rolekeys: e.join("|"),
                _t: new Date()
            }).then(function(e) {
                var o = e.body, n = (e.header, o.errorCode), a = o.errMsg, s = o.data;
                return 0 == n ? t({
                    code: n,
                    msg: a,
                    data: s
                }) : r({
                    code: n,
                    msg: a,
                    data: s
                });
            }).catch(function(e) {
                e.code, e.message;
                return r({
                    msg: "网络错误"
                });
            });
        }));
    }), h.default.all(r).then(function(e) {
        var t = {};
        return e.forEach(function(e) {
            t = Object.assign(t, e.data);
        }), t;
    });
}

function s() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    if (0 == e.length) return console.log("activeId为空"), h.default.resolve(null);
    var t = {}, r = [], o = [];
    e.forEach(function(e) {
        e in t || !e || (r.push(e), t[e] = 1);
    });
    for (var n = Math.min(r.length, 30), a = Math.ceil(r.length / 30), s = 0; s < a; s++) {
        var i = r.splice(0, n);
        o.push(_.request.get("https://wq.jd.com/active/queryprizesstatuslist", {
            activelist: i.join(",")
        }));
    }
    return new h.default(function(e, t) {
        h.default.all(o).then(function(r) {
            var o = {};
            r.forEach(function(r) {
                0 == r.body.retcode ? (r.body.result.forEach(function(e) {
                    o[e.active] = e, e._prizes = {}, e.prizes.forEach(function(t) {
                        e._prizes["level_" + t.Level] = t;
                    }), delete e.active;
                }), e(o)) : t({
                    message: "获取优惠券信息失败",
                    from: "queryprizesstatuslist"
                });
            });
        }).catch(function(e) {
            t(e);
        });
    });
}

function i() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    if (0 == e.length) return console.log("activelist为空"), h.default.resolve(null);
    var t = {}, r = [], o = [];
    e.forEach(function(e) {
        e in t || !e || (r.push(e), t[e] = 1);
    });
    for (var n = Math.min(r.length, 20), a = Math.ceil(r.length / 20), s = 0; s < a; s++) {
        var i = r.splice(0, n);
        o.push(_.request.get("https://wq.jd.com/active/querybingolist", {
            activelist: i.join(",")
        }));
    }
    var c = function e(t, r) {
        h.default.all(o).then(function(o) {
            var n = {};
            o.forEach(function(o) {
                0 == o.body.errorCode ? (o.body.result.forEach(function(e) {
                    n[e.active] = e, e._bingos = {}, e.bingos.forEach(function(t) {
                        e._bingos["level_" + t.level] = t;
                    }), delete e.active;
                }), t(n)) : 2 == o.body.errorCode ? R.querybingolist || (R.querybingolist = 1, v.doLogin().then(function() {
                    e(t, r);
                }).catch(function(e) {
                    r({
                        message: "登录失败",
                        from: "querybingolist"
                    });
                })) : r(o.body);
            });
        }).catch(function(e) {
            r(e);
        });
    };
    return v.getLoginPromise().then(function() {
        return new h.default(c);
    });
}

function c(e) {
    return v.getLoginPromise().then(function() {
        return u(e);
    }).catch(function(e) {
        return h.default.reject(e);
    });
}

function u(e) {
    return new h.default(function(t, o) {
        var n = e.notifyCartRefresh, a = void 0 === n || n, s = [ e.skuId, "", e.buyNum || 1, e.skuId, "1,0,0" ], i = d().jdaddrid.split("_").slice(0, 3).join("-"), c = {
            scene: 2,
            reg: 1,
            type: 0,
            commlist: s.join(","),
            areaid: i,
            t: Math.random()
        };
        E.get("3c_shop", "").then(function(e) {
            var n = e.id || "";
            n && (c.shopid = n), _.request.get("https://wq.jd.com/deal/mshopcart/addcmdy", c).then(function(e) {
                var r = e.body;
                e.heder;
                a && getApp().event.emit("cartrefresh"), t(r);
            }).catch(function(e) {
                var t, n = e.code, a = (e.message, (t = {}, r(t, "" + q.default.RET_HTTP_RESPONSE_ERROR, q.default.Text_RET_HTTP_RESPONSE_ERROR), 
                r(t, "" + q.default.RET_HTTP_NETWORK_ERROR, q.default.Text_RET_HTTP_NETWORK_ERROR), 
                r(t, "" + q.default.RET_WS_CONNECT_ERROR, q.default.Text_RET_WS_CONNECT_ERROR), 
                r(t, "" + q.default.RET_WS_REQUEST_TIMEOUT, q.default.Text_RET_WS_REQUEST_TIMEOUT), 
                t)[n] || "Network Error");
                o((0, k.genErrMsg)(a, n));
            });
        });
    }).then(function(t) {
        var r = t.errId, o = void 0;
        if ("0" === r) {
            var n = 1 * t.cart.mainSkuNum;
            return b.setUnpl(t.unplInfo), h.default.resolve(n);
        }
        if ("8968" === r) o = "商品数量最大超过200"; else if ("8969" === r) o = "添加商品失败，已超出购物车最大容量！"; else {
            if ("13" === r) return v.doLogin().then(function() {
                return c(e);
            }).catch(function(e, t) {
                return h.default.reject((0, k.genErrMsg)(t, e));
            });
            o = "添加失败，请稍后再试";
        }
        if (o) return h.default.reject((0, k.genErrMsg)(o, r));
    });
}

function d() {
    return w.getUserAddressDes().length > 0 && w.getUserAddressID().length > 0 ? {
        jdaddrname: w.getUserAddressDes(),
        jdaddrid: w.getUserAddressID()
    } : {
        jdaddrid: "1_72_4137_0",
        jdaddrname: "北京_朝阳区_管庄_"
    };
}

function f(e) {
    function t() {
        var t = {
            url: "https://wq.jd.com/fav/shop/AddShopFav",
            data: {
                venderId: e,
                callback: "addShopFav",
                t: Math.random() + ""
            }
        };
        return new h.default(function(r, o) {
            v.getLoginPromise().then(function(n) {
                _.request.get(t).then(function(t) {
                    var n = t.body;
                    if (0 == n.iRet || 2 == n.iRet) r(!0); else if (9999 == n.iRet) return v.doLogin().then(function() {
                        f(e).then(r, o);
                    }).catch(function(e) {
                        o(e);
                    });
                    o(!1);
                }).catch(function(e) {
                    var t = e.code, r = e.message;
                    o({
                        code: t,
                        message: r
                    });
                });
            }).catch(function(e) {
                console.log(e);
            });
        });
    }
    return v.isLogin() ? t() : v.afterLogin(t);
}

function g(e) {
    if (0 == e.length) return "";
    var t = e.replace(/&amp;/g, "&");
    return t = t.replace(/&lt;/g, "<"), t = t.replace(/&gt;/g, ">"), t = t.replace(/&nbsp;/g, " "), 
    t = t.replace(/&#39;/g, "'"), t = t.replace(/&quot;/g, '"'), t = t.replace(/&hellip;/g, "..."), 
    t = t.replace(/&ldquo;/g, '"'), t = t.replace(/&rdquo;/g, '"'), t = t.replace(/&cap;/g, "∩");
}

function p(e, t) {
    var r = "";
    switch (t = t || '"Network Error"', e) {
      case q.default.RET_HTTP_RESPONSE_ERROR:
        r = q.default.Text_RET_HTTP_RESPONSE_ERROR;
        break;

      case q.default.RET_WS_CONNECT_ERROR:
        r = q.default.Text_RET_WS_CONNECT_ERROR;
        break;

      case q.default.RET_WS_REQUEST_TIMEOUT:
        r = q.default.Text_RET_WS_REQUEST_TIMEOUT;
        break;

      default:
        r = t;
    }
    return r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.foldComment = exports.getComment = exports.getAddressList = exports.shopDelFav = exports.shopCheckFav = exports.shopAddFav = exports.getSimicommodity = exports.getYouhaohuoItemList = exports.getCategoryFeedsPlus = exports.getTopicListPlus = exports.getActiveFeeds = exports.getGroupInfo = exports.getCartMarginSku = exports.getPingouInfo = exports.getPingou = exports.keywordsearch = exports.getMartv3Data = exports.drawCoupon = exports.queryActiveCouponStatus = exports.queryBingoList = exports.queryPrizesList = exports.getItemYuyueList = exports.getActiveYuyueList = exports.yuyueItem = exports.yuyueActive = exports.getRecLikeByMid = exports.getRecLikeByPos = exports.queryNewProductImage = exports.getBrandShangou = exports.getTmallMshowData = exports.getTmallData = exports.getSaleInfo = exports.queryCanUActiveCouponBySku = exports.getRankData = exports.getPingouPrice = exports.getSkuFlag = exports.FLAG_TYPE = exports.getMultiPPMS = exports.getPPMS = exports.getCoupon = exports.queryCouponStatus = exports.genErrMsg = exports.URL_TYPE = exports.getAddressInfo = exports.addCart = exports.parseUrl = exports.getMartData = exports.getSkuPrice = void 0;

var l = function() {
    function e(e, t) {
        var r = [], o = !0, n = !1, a = void 0;
        try {
            for (var s, i = e[Symbol.iterator](); !(o = (s = i.next()).done) && (r.push(s.value), 
            !t || r.length !== t); o = !0) ;
        } catch (e) {
            n = !0, a = e;
        } finally {
            try {
                !o && i.return && i.return();
            } finally {
                if (n) throw a;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, h = t(require("../libs/promise.min.js")), v = e(require("./login/login.js")), y = e(require("../models/coupon/coupon_model.js")), w = e(require("./user_info.js")), q = t(require("./http_constant.js")), x = e(require("./utils.js")), b = e(require("./pay_util/payUtil.js")), _ = require("./request/request"), E = e(require("./localStorage.js")), C = e(require("./fe_report/usability.js")), k = require("./utils"), j = "网络繁忙，请稍候再试", R = {}, S = {
    ANCHOR: "I",
    SEARCH: "CAN",
    SHOP: "DO",
    ITEM: "ALL",
    PROMOTE: "THINGS"
}, T = {
    PINGOU: 1,
    KANJIA: 2,
    SAM: 4,
    COSS: 8,
    PROMOMIAO: 16,
    FLASHPURCHASE: 32,
    ALL: 63
}, I = [];

exports.getSkuPrice = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return new h.default(function(t, r) {
        var o = e.join(",");
        _.request.get("https://pe.3.cn/prices/mgets", {
            skuids: o,
            origin: 5,
            source: "wxxcx"
        }).then(function(e) {
            var o = e.body;
            if (e.header, "object" == m(o[0])) {
                var n = {};
                o.forEach(function(e) {
                    n[e.id] = {
                        sku: e.id,
                        price: e.p,
                        delPrice: e.op,
                        mktPrice: e.m
                    };
                }), t(n);
            } else r((0, k.genErrMsg)());
        }).catch(function(e) {
            e.code, e.message, r("getSkuPrice failed");
        });
    });
}, exports.getMartData = function(e, t) {
    var r = e.actId, a = e.areaId, s = e.num;
    return new h.default(function(e, i) {
        var c = [ r, a, s ].join(":");
        _.request.get("https://wq.jd.com/mcoss/mmart/mshow", {
            pcs: c,
            gbyarea: 2,
            tpl: 7
        }).then(function(s) {
            s.header;
            var c = s.body;
            if (0 == c.errCode && c.data) {
                var u = o(c.data)[r + "_" + a];
                t && t.removeZeroPrice && u && (u = n(u)), e(u || []);
            } else i((0, k.genErrMsg)(c.msg, c.errCode));
        }).catch(function(e) {
            e.code, e.message, i(j);
        });
    });
}, exports.parseUrl = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = void 0, r = {}, o = {
        ptag: /[\?&#]ptag=([\d\.]+)/i,
        sku: /[\?&#]sku=([\d\.]+)/i,
        anchor: /^#([^\?&=#]*)/,
        search: /(?:\.com)?\/search\/searchn\?.*?key=([^&#]+)/i,
        shop: /(?:\.com)?\/mshop\/gethomepage\?.*?venderId=(\d+)/i,
        item: /(?:\.com)?\/item\/view\?.*?sku=(\d+)/i
    };
    if (e.match(o.anchor)) t = e.match(o.anchor), r = {
        type: S.ANCHOR,
        id: t[1]
    }; else if (e.match(o.search)) {
        var n = (t = e.match(o.search))[1];
        try {
            n = decodeURIComponent(n);
        } catch (e) {
            console.error(e);
        }
        r = {
            type: S.SEARCH,
            keywords: n
        };
    } else e.match(o.shop) ? (t = e.match(o.shop), r = {
        type: S.SHOP,
        vid: t[1]
    }) : e.match(o.item) && (t = e.match(o.item), r = {
        type: S.ITEM,
        sku: t[1]
    });
    return e.match(o.ptag) && (t = e.match(o.ptag), r.ptag = t[1]), e.match(o.sku) && (t = e.match(o.sku), 
    r.sku = t[1]), r;
}, exports.addCart = c, exports.getAddressInfo = d, exports.URL_TYPE = S, exports.genErrMsg = k.genErrMsg, 
exports.queryCouponStatus = function(e, t) {
    if (e.length) {
        var r = e.filter(function(e) {
            return e.roleid && e.key;
        }).map(function(e) {
            return e.roleid + ":" + e.key;
        });
        v.afterLogin(a, r).then(function(r) {
            e.forEach(function(e) {
                var t = r[e.roleid];
                if (!t) return !1;
                999 == t.resultCode ? e.status = 0 : 14 == t.resultCode || 15 == t.resultCode ? e.status = 1 : e.status = 2;
            }), t(null, e);
        }).catch(function(r) {
            var o = {
                errId: r.code,
                errMsg: r.msg
            };
            1 == r.code && (o.errId = -1001, o.errMsg = "未登录或登录失败"), t(o, e);
        });
    } else t(null, []);
}, exports.getCoupon = function(e, t) {
    return new h.default(function(r, o) {
        y.getcoupon(e, t, function(e, t) {
            e ? o(e) : r(t);
        });
    });
}, exports.getPPMS = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = t.expire, o = void 0 === r ? "" : r, n = t.v, a = "https://wq.360buyimg.com/data/ppms/js/ppms.page" + (void 0 === n || n ? "v" : "") + e + ".jsonp";
    return new h.default(function(e, t) {
        _.request.get({
            url: a,
            expire: o
        }).then(function(t) {
            var r = t.body;
            e(r.data);
        }, function(e) {
            t(e);
        });
    });
}, exports.getMultiPPMS = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    if (!Array.isArray(e) || !e.length) return h.default.resolve({});
    var t = {}, r = "https://wqs.jd.com/j/=" + e.map(function(e) {
        var r = "/data/ppms/js/ppms.pagev" + e + ".json";
        return t[r] = e, r;
    }).join(",");
    return new h.default(function(o, n) {
        _.request.get({
            url: r
        }).then(function(n) {
            var a = {};
            (n.body.files || []).forEach(function(e) {
                var r = t[e.filename];
                r && (a[r] = e.content && e.content.data || []);
            });
            var s = [];
            e.forEach(function(e) {
                a[e] || (a[e] = [], s.push(e));
            }), s.length ? C.umpBiz({
                bizid: 777,
                operation: 1,
                result: 404,
                message: "msg=" + s.join("+") + "&url=" + r.replace(/,/g, "+")
            }) : C.umpBiz({
                bizid: 777,
                operation: 1,
                result: 0,
                message: ""
            }), o(a);
        }, function(e) {
            var t = e.code, o = e.detail;
            C.umpBiz({
                bizid: 777,
                operation: 1,
                result: ~~t,
                message: "msg=" + o + "&url=" + r.replace(/,/g, "+")
            }), n(e);
        });
    });
}, exports.FLAG_TYPE = T, exports.getSkuFlag = function(e, t) {
    return _.request.get("https://wq.jd.com/bases/panflag/get", {
        sku: e.join(","),
        flagtype: t
    }).then(function(e) {
        var t = e.body;
        if (0 != t.errcode) return h.default.reject({
            code: t.errcode,
            message: t.msg
        });
        if (!t.data.skuFlag.length) return {};
        var r = {};
        return t.data.skuFlag.map(function(e) {
            r[e.skuId] = e;
        }), r;
    });
}, exports.getPingouPrice = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return _.request.get("https://wq.jd.com/pingou_api/getskusprice", {
        skuids: e.join(","),
        origin: 5,
        area: w.getUserAddressID(),
        callback: "callback"
    }).then(function(e) {
        var t = e.body;
        if (!t.length) return {};
        var r = {};
        return t.map(function(e) {
            r[e.id] = e;
        }), r;
    });
}, exports.getRankData = function(e) {
    var t = e.rankId, r = e.getnum, o = e.ranktype;
    return new h.default(function(e, n) {
        _.request.get("https://wq.jd.com/mcoss/ranklist/bshow", {
            rids: t,
            sn: r,
            st: o
        }).then(function(t) {
            t.header;
            var r = t.body;
            if (0 == r.retcode && r.rank) {
                var o = r.rank;
                e(o || []);
            } else n((0, k.genErrMsg)(r.errmsg, r.retcode));
        }).catch(function(e) {
            e.code, e.message, n(j);
        });
    });
}, exports.queryCanUActiveCouponBySku = function(e) {
    var t = e.skuid, r = e.source, o = e.flag;
    return new h.default(function e(n, a) {
        v.getLoginPromise().then(function() {
            _.request.get("https://wq.jd.com/user/info/QueryCanUActiveCouponBySku", {
                skuid: t,
                source: r,
                flag: o
            }).then(function(t) {
                t.header;
                var r = t.body;
                if (13 != r.retcode && 102 != r.retcode || R.queryCanUActiveCouponBySku) if (0 == r.retcode && r.data) {
                    var o = r.data;
                    n(o || []);
                } else a((0, k.genErrMsg)(r.msg, r.retcode)); else R.queryCanUActiveCouponBySku = 1, 
                v.doLogin().then(function() {
                    e(n, a);
                });
            }).catch(function(e) {
                e.code, e.message, a(j);
            });
        });
    });
}, exports.getSaleInfo = function(e) {
    var t = e.skuid;
    return new h.default(function(e, r) {
        _.request.get("https://wq.jd.com/commodity/promo/get", {
            skuid: t
        }).then(function(t) {
            t.header;
            var o = t.body;
            if (0 == o.errcode && o.data) {
                var n = o.data;
                e(n || []);
            } else r((0, k.genErrMsg)(o.msg, o.retcode));
        }).catch(function(e) {
            e.code, e.message, r(j);
        });
    });
}, exports.getTmallData = function(e) {
    var t = e.aid, r = e.category, o = void 0 === r ? "" : r, n = e.matchclass, a = void 0 === n ? "" : n, s = e.filterclass, i = void 0 === s ? "" : s, c = e.sid, u = void 0 === c ? "" : c, d = e.filtercate, f = void 0 === d ? "" : d, g = e.pagesize, p = void 0 === g ? 5 : g;
    return console.warn("**deprecated** 已逐渐废弃，请用 getBrandShangou 代替"), new h.default(function(e, r) {
        _.request.get("https://wq.jd.com/mcoss/brandspecial/show", {
            aid: t,
            category: o,
            matchclass: a,
            filterclass: i,
            filtercate: f,
            sid: u,
            pagesize: p
        }).then(function(t) {
            t.header;
            var o = t.body;
            if (0 == o.errCode && o.gs) {
                var n = o.gs;
                e(n || []);
            } else r((0, k.genErrMsg)(o.msg || "网络错误", o.errCode));
        }).catch(function(e) {
            e.code, e.message, r(j);
        });
    });
}, exports.getTmallMshowData = function(e) {
    var t = e.pcs;
    return new h.default(function(e, r) {
        _.request.get("https://wq.jd.com/mcoss/mmart/mshow", {
            pcs: t,
            tpl: 6
        }).then(function(t) {
            t.header;
            var o = t.body;
            if (0 == o.errCode && o.data) {
                var n = o.data;
                e(n || []);
            } else r((0, k.genErrMsg)(o.msg, o.errCode));
        }).catch(function(e) {
            e.code, e.message, r(j);
        });
    });
}, exports.getBrandShangou = function(e) {
    var t = e.aid, r = void 0 === t ? 1 : t, o = e.matchclass, n = void 0 === o ? "" : o, a = e.filterclass, s = void 0 === a ? "" : a, i = e.filtercate, c = void 0 === i ? "" : i, u = e.matchactid, d = void 0 === u ? "" : u, f = e.topactid, g = void 0 === f ? "" : f, p = e.topskuid, l = void 0 === p ? "" : p, m = e.itemnum, v = void 0 === m ? 0 : m, y = e.pretime, w = void 0 === y ? "" : y, q = e.showtype, x = void 0 === q ? "" : q, b = e.count, E = void 0 === b ? 20 : b, C = e.offset, R = void 0 === C ? 0 : C;
    return new h.default(function(e, t) {
        _.request.get("https://wqcoss.jd.com/mcoss/brandshangou/show", {
            aid: r,
            matchclass: n,
            filterclass: s,
            filtercate: c,
            matchactid: d,
            topactid: g,
            topskuid: l,
            itemnum: v,
            pretime: w,
            showtype: x,
            count: E,
            offset: R
        }).then(function(r) {
            var o = r.body;
            if (0 == o.errcode && o.data) {
                var n = o.data;
                e(n || []);
            } else t((0, k.genErrMsg)(o.msg || "网络错误", o.errcode));
        }).catch(function(e) {
            e.code, e.message, t(j);
        });
    });
}, exports.queryNewProductImage = function(e) {
    var t = e.ids;
    return new h.default(function(e, r) {
        _.request.get("https://yx.3.cn/service/info.action", {
            ids: t,
            u_source: "wxapp"
        }).then(function(t) {
            t.header;
            var o = t.body;
            "object" == (void 0 === o ? "undefined" : m(o)) ? e(o) : r((0, k.genErrMsg)());
        }).catch(function(e) {
            e.code, e.message, r(j);
        });
    });
}, exports.getRecLikeByPos = function(e) {
    var t = e.recpos, r = e.pc, o = void 0 === r ? 20 : r, n = e.pi, a = void 0 === n ? 1 : n;
    return new h.default(function(e, r) {
        _.request.get("https://wq.jd.com/mcoss/reclike/getrecinfo", {
            recpos: t,
            pc: o,
            pi: a
        }).then(function(t) {
            t.header;
            var o = t.body;
            o.success ? e(o) : r({
                message: "获取数据失败，请稍后再试"
            });
        }).catch(function(e) {
            e.code, e.message, r(j);
        });
    });
}, exports.getRecLikeByMid = function(e) {
    var t = e.mid;
    return new h.default(function(e, r) {
        _.request.get("https://wq.jd.com/mcoss/reclike/show", {
            mid: t,
            ec: "utf-8"
        }).then(function(t) {
            t.header;
            var o = t.body;
            0 == o.retcode ? e(o) : r({
                message: "获取数据失败，请稍后再试"
            });
        }).catch(function(e) {
            e.code, e.message, r(j);
        });
    });
}, exports.yuyueActive = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    if (!e) return h.default.reject({
        message: "预约活动的id为空"
    });
    var t = function t(r, o) {
        _.request.get("https://wq.jd.com/bases/yuyue/active", {
            activeId: e
        }).then(function(e) {
            e.header;
            var n = e.body;
            n.retCode ? 13 == n.retCode ? R.yuyue_active ? o({
                code: 13,
                message: "登录失败，请稍后再试吧"
            }) : (R.yuyue_active = 1, v.doLogin().then(function(e) {
                t(r, o);
            }).catch(function(e) {
                o({
                    code: 13,
                    message: "登录失败，请稍后再试吧"
                });
            })) : o({
                code: n.retCode,
                message: n.retMsg || "预约出错，请稍后再试"
            }) : r(n);
        }).catch(function(e) {
            o(e);
        });
    };
    return v.getLoginPromise().then(function() {
        return new h.default(t);
    });
}, exports.yuyueItem = function(e) {
    var t = e.skuId, r = void 0 === t ? "" : t, o = e.dataType, n = void 0 === o ? 1 : o, a = e.appid, s = void 0 === a ? "wx91d27dbf599dff74" : a;
    if (!r) return h.default.reject({
        message: "预约商品的id为空"
    });
    var i = function e(t, o) {
        _.request.get("https://wq.jd.com/bases/yuyue/item", {
            skuId: r,
            dataType: n,
            appid: s
        }).then(function(r) {
            r.header;
            var n = r.body;
            n.retCode ? 13 == n.retCode ? R.yuyue_item ? o({
                code: 13,
                message: "登录失败，请稍后再试吧"
            }) : (R.yuyue_item = 1, v.doLogin().then(function(r) {
                e(t, o);
            }).catch(function(e) {
                o({
                    code: 13,
                    message: "登录失败，请稍后再试吧"
                });
            })) : o({
                code: n.retCode,
                message: n.retMsg || "预约出错，请稍后再试"
            }) : t(n);
        }).catch(function(e) {
            o(e);
        });
    };
    return v.getLoginPromise().then(function() {
        return new h.default(i);
    });
}, exports.getActiveYuyueList = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    if (!e) return h.default.reject({
        message: "预约活动的id为空"
    });
    var t = function t(r, o) {
        _.request.get("https://wq.jd.com/bases/yuyue/activeResult", {
            activeId: e
        }).then(function(e) {
            e.header;
            var n = e.body;
            0 == n.retCode ? r(n) : 13 == n.retCode ? R.getActiveYuyueList ? o({
                code: 13,
                message: "登录失败，请稍后再试吧"
            }) : (R.getActiveYuyueList = 1, v.doLogin().then(function(e) {
                t(r, o);
            }).catch(function(e) {
                o({
                    code: 13,
                    message: "登录失败，请稍后再试吧"
                });
            })) : o({
                code: n.retCode,
                message: n.retMsg || "获取预约状态有问题，请稍后再试"
            });
        }).catch(function(e) {
            o(e);
        });
    };
    return v.getLoginPromise().then(function() {
        return new h.default(t);
    });
}, exports.getItemYuyueList = function(e) {
    var t = e.page, r = void 0 === t ? 1 : t, o = e.pagesize, n = void 0 === o ? 20 : o, a = function e(t, o) {
        _.request.get("https://wq.jd.com/bases/yuyuelist/getitemlist", {
            page: r,
            pagesize: n
        }).then(function(r) {
            r.header;
            var n = r.body;
            0 == n.errNo ? t(n) : 13 == n.errNo ? R.getItemYuyueList ? o({
                code: 13,
                message: "登录失败，请稍后再试吧"
            }) : (R.getItemYuyueList = 1, v.doLogin().then(function(r) {
                e(t, o);
            }).catch(function(e) {
                o({
                    code: 13,
                    message: "登录失败，请稍后再试吧"
                });
            })) : o({
                code: n.retCode,
                message: n.retMsg || "获取预约状态有问题，请稍后再试"
            });
        }).catch(function(e) {
            o(e);
        });
    };
    return v.getLoginPromise().then(function() {
        return new h.default(a);
    });
}, exports.queryPrizesList = s, exports.queryBingoList = i, exports.queryActiveCouponStatus = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = [];
    return e.forEach(function(e) {
        t.push(e.activeId);
    }), new h.default(function(r, o) {
        h.default.all([ s(t), i(t) ]).then(function(t) {
            var o = l(t, 2), n = o[0], a = o[1];
            e.forEach(function(e) {
                var t = n[e.activeId]._prizes["level_" + e.activeLevel], r = x.canGetActiveCoupon(t) ? 0 : 2;
                r = a[e.activeId]._bingos["level_" + e.activeLevel] ? 1 : r, e.status = r;
            }), r(e);
        }).catch(function(e) {
            o(e);
        });
    });
}, exports.drawCoupon = function(e, t) {
    var r = {
        ext: "hj:x",
        active: e,
        level: t,
        t: new Date().getTime()
    }, o = function e(t, o) {
        _.request.get({
            url: "https://wq.jd.com/active/active_draw",
            data: r
        }).then(function(r) {
            var n = r.body;
            r.header, 0 == n.ret ? t(n) : 2 == n.ret ? R.active_draw ? o({
                message: "登录失败",
                form: "active_draw"
            }) : (R.active_draw = 1, v.doLogin().then(function() {
                e(t, o);
            }).catch(function(e) {
                o({
                    message: "登录失败",
                    form: "active_draw"
                });
            })) : t(n);
        }).catch(function(e) {
            o(e);
        });
    };
    return v.getLoginPromise().then(function() {
        return new h.default(o);
    });
}, exports.getMartv3Data = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20;
    return new h.default(function(r, o) {
        _.request.get("https://wqcoss.jd.com/mcoss/martv3/show", {
            id: e,
            count: t
        }).then(function(e) {
            e.header;
            var t = e.body;
            0 == t.errcode ? r(t) : o({
                code: t.errcode,
                message: t.msg
            });
        });
    });
}, exports.keywordsearch = function(e) {
    var t = e.ruleid, r = e.pi, o = void 0 === r ? 1 : r, n = e.pc, a = void 0 === n ? 10 : n, s = e.tpl, i = void 0 === s ? 1 : s;
    return new h.default(function(e, r) {
        _.request.get("https://wq.jd.com/mcoss/keyword/keywordsearch", {
            ruleid: t,
            pi: o,
            pc: a,
            tpl: i
        }).then(function(t) {
            t.header;
            var o = t.body;
            0 == o.errCode ? e(o) : r({
                code: o.errCode,
                message: o.msg
            });
        });
    });
}, exports.getPingou = function(e) {
    var t = e.id, r = e.count, o = void 0 === r ? 10 : r, n = e.pretime, a = void 0 === n ? 0 : n;
    return new h.default(function(e, r) {
        _.request.get("https://wqcoss.jd.com/mcoss/pingou/show", {
            id: t,
            count: o,
            pretime: a
        }).then(function(t) {
            t.header;
            var o = t.body;
            0 == o.errcode ? e(o) : r({
                code: o.errcode,
                message: o.msg
            });
        });
    });
}, exports.getPingouInfo = function(e) {
    var t = e.skuids, r = void 0 === t ? "" : t, o = e.callback, n = void 0 === o ? "wxacallback" : o;
    return new h.default(function(e, t) {
        _.request.get("https://wq.jd.com/pingou_core/getpingoubatactiveinfo", {
            skuids: r,
            callback: n
        }).then(function(r) {
            r.header;
            var o = r.body;
            0 == o.iRet ? e(o) : t({
                code: o.iRet,
                message: o.errmsg
            });
        }).catch(function(e) {
            t(e);
        });
    });
}, exports.getCartMarginSku = function(e) {
    var t = e.type, r = void 0 === t ? 0 : t, o = e.cid1, n = void 0 === o ? "" : o, a = e.cid2, s = void 0 === a ? "" : a, i = e.cid3, c = void 0 === i ? "" : i;
    return new h.default(function(e, t) {
        _.request.get("https://wq.jd.com/deal/trademisc/getcartmarginsku", {
            type: r,
            cid1: n,
            cid2: s,
            cid3: c
        }).then(function(r) {
            r.header;
            var o = r.body;
            0 == o.errId ? e(o) : t({
                code: o.errId,
                message: o.errMsg
            });
        });
    });
}, exports.getGroupInfo = function(e) {
    var t = e.groupId, r = void 0 === t ? "" : t;
    return new h.default(function(e, t) {
        _.request.get("https://wq.jd.com/group_show/GetGroupInfo", {
            groupId: r
        }).then(function(r) {
            r.header;
            var o = r.body;
            0 == o.ret ? e(o) : t({
                code: o.ret,
                message: o.retmsg
            });
        });
    });
}, exports.getActiveFeeds = function(e) {
    var t = e.shareids, r = void 0 === t ? "" : t;
    return new h.default(function(e, t) {
        _.request.get("https://wq.jd.com/shopgroup_api_feed/GetActvieFeeds", {
            shareids: r
        }).then(function(r) {
            r.header;
            var o = r.body;
            0 == o.iRet ? e(o) : t({
                code: o.iRet,
                message: o.errmsg
            });
        });
    });
}, exports.getTopicListPlus = function(e) {
    var t = e.tagid, r = void 0 === t ? "" : t, o = e.shareid, n = void 0 === o ? "" : o, a = e.pageno, s = void 0 === a ? 1 : a, i = e.pagesize, c = void 0 === i ? 5 : i, u = e.feedtype, d = void 0 === u ? 0 : u;
    return new h.default(function(e, t) {
        _.request.get("https://wq.jd.com/shopgroup_feed/GetTopicListPlus", {
            tagid: r,
            shareid: n,
            pageno: s,
            pagesize: c,
            feedtype: d
        }).then(function(r) {
            r.header;
            var o = r.body;
            0 == o.iRet ? e(o) : t({
                code: o.iRet,
                message: o.errmsg
            });
        });
    });
}, exports.getCategoryFeedsPlus = function(e) {
    var t = e.cateid, r = void 0 === t ? "" : t, o = e.shareid, n = void 0 === o ? "" : o, a = e.pageno, s = void 0 === a ? 1 : a, i = e.pagesize, c = void 0 === i ? 5 : i, u = e.feedtype, d = void 0 === u ? 1 : u, f = e.type, g = void 0 === f ? 2 : f;
    return new h.default(function(e, t) {
        _.request.get("https://wq.jd.com/shopgroup_feed/GetCategoryFeedsPlus", {
            cateid: r,
            shareid: n,
            pageno: s,
            pagesize: c,
            feedtype: d,
            type: g
        }).then(function(r) {
            r.header;
            var o = r.body;
            0 == o.iRet ? e(o) : t({
                code: o.iRet,
                message: o.errmsg
            });
        });
    });
}, exports.getYouhaohuoItemList = function(e) {
    var t = e.cateid, r = void 0 === t ? "" : t, o = e.pageno, n = void 0 === o ? 1 : o, a = e.pagesize, s = void 0 === a ? 5 : a, i = e.filter, c = void 0 === i ? 1 : i, u = e.source, d = void 0 === u ? "mpm" : u;
    return new h.default(function(e, t) {
        _.request.get("https://wq.jd.com/youhaohuo/GetItemList", {
            cateid: r,
            pageno: n,
            pagesize: s,
            filter: c,
            source: d
        }).then(function(r) {
            r.header;
            var o = r.body;
            0 == o.ret ? e(o) : t({
                code: o.ret,
                message: o.msg
            });
        });
    });
}, exports.getSimicommodity = function(e) {
    var t = e.pcs, r = void 0 === t ? "" : t;
    return new h.default(function(e, t) {
        _.request.get("https://wqcoss.jd.com/mcoss/simicommodity/show", {
            pcs: r
        }).then(function(r) {
            r.header;
            var o = r.body;
            0 == o.retcode ? e(o) : t({
                code: o.retcode,
                message: o.errmsg
            });
        });
    });
}, exports.shopAddFav = f, exports.shopCheckFav = function(e) {
    if (!e || "0" == e) return h.default.resolve(!1);
    var t = {
        url: "https://wq.jd.com/fav/shop/QueryOneShopFav",
        data: {
            venderId: e,
            callback: "checkFavShop",
            t: Math.random() + ""
        }
    };
    return _.request.get(t).then(function(e) {
        var t = e.body;
        return 0 == t.iRet && 1 == t.state;
    }).catch(function(e) {
        var t = e.code, r = e.message;
        return h.default.reject({
            code: t,
            message: r
        });
    });
}, exports.shopDelFav = function(e) {
    var t = {
        url: "https://wq.jd.com/fav/shop/DelShopFav",
        data: {
            venderId: e,
            callback: "delShopFav",
            t: Math.random() + ""
        }
    };
    return _.request.get(t).then(function(e) {
        var t = e.body;
        return 0 != t.iRet && 20 != t.iRet;
    }).catch(function(e) {
        var t = e.code, r = e.message;
        return h.default.reject({
            code: t,
            message: r
        });
    });
}, exports.getAddressList = function() {
    var e = {
        url: "https://wq.jd.com/deal/recvaddr/getrecvaddrlistV3",
        data: {
            callback: "detailAddressCallback"
        },
        ump: {
            bizId: 760,
            opId: 11
        }
    };
    return new h.default(function(t, r) {
        (0, _.request)(e).then(function(e) {
            var o = e.body;
            0 != o.errCode ? r({
                code: o.errCode,
                message: o.msg
            }) : t(o);
        }).catch(function(e) {
            h.default.reject(e);
        });
    });
}, exports.getComment = function(e, t, r) {
    return new h.default(function(o, n) {
        for (var a = 0; a < I.length; a++) if (I[a].skuId == r && I[a].type == e && I[a].page == t) {
            var s = I[a].data;
            if ("0" === s.errcode) {
                I.length > 10 && I.pop();
                var i = {};
                i.skuId = r, i.type = e, i.page = t, i.data = s, I.unshift(i);
                var c = {};
                if ((s = s.result).productCommentSummary && s.comments) {
                    c.productCommentSummary = s.productCommentSummary;
                    for (var u = [], d = 0, f = s.comments.length; d < f; ++d) {
                        var l = s.comments[d];
                        l.content = g(l.content), u.push(l);
                    }
                    c.comments = u, s.hotCommentTagStatistics && (c.hotCommentTagStatistics = s.hotCommentTagStatistics), 
                    o(c);
                } else console.log("commentCallback Error:" + s), n("评论拉取失败");
            } else console.log("commentCallback Error:" + s), n("评论拉取失败");
            return void console.log("~~getComment缓存命中 type:" + e + " page:" + t);
        }
        var m = {
            url: "https://wq.jd.com/commodity/comment/getcommentlist",
            data: {
                sku: r,
                page: t + 1,
                pagesize: 10,
                score: e,
                sorttype: 5
            }
        };
        _.request.get(m).then(function(a) {
            var s = a.body;
            if ("0" === s.errcode) {
                I.length > 10 && I.pop();
                var i = {};
                i.skuId = r, i.type = e, i.page = t, i.data = s, I.unshift(i);
                var c = {};
                if ((s = s.result).productCommentSummary && s.comments) {
                    c.productCommentSummary = s.productCommentSummary;
                    for (var u = [], d = 0, f = s.comments.length; d < f; ++d) {
                        var p = s.comments[d];
                        p.content = g(p.content), u.push(p);
                    }
                    c.comments = u, s.hotCommentTagStatistics && (c.hotCommentTagStatistics = s.hotCommentTagStatistics), 
                    o(c);
                } else console.log("commentCallback Error:" + s), n("评论拉取失败");
            } else console.log("commentCallback Error:" + s), n("评论拉取失败");
        }).catch(function(e) {
            var t = p(e.code, e.message);
            n(t);
        });
    });
}, exports.foldComment = function(e, t, r) {
    var o = {
        url: "https://wq.jd.com/commodity/comment/getfoldcommentlist",
        data: {
            sku: r,
            page: t + 1,
            pagesize: 10,
            score: e
        }
    };
    return _.request.get(o).then(function(e) {
        return e.body.result;
    }).catch(function(e) {
        var t = p(e.code, e.message);
        return h.default.reject(t);
    });
};