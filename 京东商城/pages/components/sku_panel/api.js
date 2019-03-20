function r(r) {
    if (r && r.__esModule) return r;
    var e = {};
    if (null != r) for (var t in r) Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
    return e.default = r, e;
}

function e(r) {
    return r && r.__esModule ? r : {
        default: r
    };
}

function t(r, e) {
    var o = l.getAddress().areaId, s = {
        url: "",
        data: {},
        priority: "HIGH"
    }, a = !0;
    return e ? (s.url = e.indexOf("https:") < 0 ? "https:" + e : e, a = !1) : (s.url = f.ITEM_INFO, 
    s.data = {
        sku: r,
        callback: "skuInfoCB",
        cgi_source: "xcx",
        areaId: o
    }, s.speedPointId = 1, s.data.datatype = "1"), s.ump = {
        bizId: P,
        opId: 1
    }, p.request.get(s).then(function(e) {
        var s = e.body;
        if (s.errCode && "20160304" == s.errCode) return n.default.reject(_.GOODS_NOT_EXIST);
        if (s.redirectUrl && a) {
            var p = {
                datatype: "1",
                areaId: o
            }, c = d.createURL(s.redirectUrl.replace("&areaid=&", "&"), p);
            return t(r, c);
        }
        var l = i(s) || {};
        try {
            u(s);
        } catch (r) {
            console.log(r);
        }
        return l;
    }).catch(function(r) {
        n.default.reject(r);
    });
}

function i(r) {
    var e = r.item;
    if (k = {}, k.suitPrice = {}, k.canBuy = !0, k.isPlus = 0 != r.plusMemberType, k.skuId = r.skuId, 
    k.isPop = e.isPop, k.venderID = e.venderID, k.skuName = r.skuName, k.newColorSize = e.newColorSize || [], 
    k.skuIdsArr = [], k.skuProp = {}, k.item = e, k.originPrice = a(r.price.op ? r.price.op : "0.00"), 
    k.marketPrice = a(r.price.m ? r.price.m : "0.00"), k.price = a(r.price.p ? r.price.p : "0.00"), 
    k.skuPrice = r.price, k.images = e.image, k.expAttr = r.expAttr, k.isZiying = !e.isPop, 
    k.np = r.price.np || {}, r.price) {
        var t = k.skuPrice;
        t.p && (k.price = a(t.p), k.originPrice = a(t.op), k.marketPrice = a(t.m));
    }
    return k;
}

function u(r) {
    var e = [], t = r.item, i = t.saleProp, u = void 0 === i ? {} : i, s = t.newColorSize, a = void 0 === s ? [] : s, n = r.item.salePropSeq, p = void 0 === n ? {} : n, c = [];
    if (a.length) {
        if (k.skuProp.salePropArr) c = k.skuProp.salePropArr, p = k.skuProp.salePropSeq; else {
            for (var l in u) u.hasOwnProperty(l) && u[l] && c.push(l);
            c.sort();
            for (var d = [], f = "", P = "", _ = [], m = 0, I = c.length; m < I; m++) _ = (p[P = c[m]] || []).filter(function(r) {
                return (r || "").trim();
            }), p[P] = _, _.length ? ((f = u[P] || "").length > 2 && (f = f.replace(/^选择/, "").substr(0, 4)), 
            d.push(f)) : c[m] = "";
            c = c.filter(function(r) {
                return "" !== r;
            }), k.skuProp.salePropArr = c, k.skuProp.salePropSeq = p, k.skuProp.propNameArr = d;
        }
        if (k.skuProp.salePropArr && k.skuProp.salePropArr.length) for (var v = k.skuProp.salePropArr, h = k.skuProp.propNameArr || [], S = 0, E = v.length; S < E; S++) {
            var T = {};
            T.name = v[S], T.text = h[S], T.value = p[v[S]] || [], T.current = o(v[S]), T.current && T.text && e.push(T);
        }
        k.props = e;
    } else k.skuIdsArr.push(k.skuId);
}

function o(r) {
    if (r) {
        var e = k.newColorSize;
        if (!e.length) return "";
        for (var t = 0, i = e.length; t < i; t++) if (e[t].skuId == k.skuId) return e[t][r] || "";
    }
}

function s(r, e) {
    var t = "";
    switch (e = e || '"Network Error"', r) {
      case c.default.RET_HTTP_RESPONSE_ERROR:
        t = c.default.Text_RET_HTTP_RESPONSE_ERROR;
        break;

      case c.default.RET_WS_CONNECT_ERROR:
        t = c.default.Text_RET_WS_CONNECT_ERROR;
        break;

      case c.default.RET_WS_REQUEST_TIMEOUT:
        t = c.default.Text_RET_WS_REQUEST_TIMEOUT;
        break;

      default:
        t = e;
    }
    return t;
}

function a(r) {
    return (r = Number(r)) > 0 ? r.toFixed(2) : _.NO_PRICE;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getSpecifySku = exports.fetchSuitPrice = exports.initItem = void 0;

var n = e(require("../../../libs/promise.min.js")), p = require("../../../common/request/request.js"), c = e(require("../../../common/http_constant.js")), l = r(require("../../../common/user_info")), d = r(require("../../../common/url_utils.js")), f = {
    ITEM_INFO: "https://wqitem.jd.com/item/waview",
    SUIT_PRICE: "https://suit.3.cn/suit/suitprice"
}, P = 760, _ = {
    GOODS_NOT_EXIST: "该商品已被删除"
}, k = {};

exports.initItem = t, exports.fetchSuitPrice = function(r) {
    var e = r.suitId, t = r.skuIds, i = [ e, t ].join(","), u = {};
    if (u[i]) {
        var o = u[i];
        return n.default.resolve(o);
    }
    var a = {
        suitId: e,
        skuIds: t,
        origin: 4,
        webSite: 1,
        callback: "jdSuitprice",
        t: Math.random() + ""
    }, c = {
        url: f.SUIT_PRICE,
        data: a
    };
    return new n.default(function(r, e) {
        p.request.get(c).then(function(e) {
            var t = e.body;
            e.header, u[i] = t, r(t);
        }).catch(function(r) {
            var t = s(r.code, r.message);
            e(t);
        });
    });
}, exports.getSpecifySku = function(r, e) {
    var t = [], i = e;
    if (i) for (var u = 0; u < i.length; u++) {
        var o = !1;
        for (var s in r) r[s] && i[u][s] != r[s] && (o = !0);
        o || t.push(i[u].skuId);
    }
    return t;
};