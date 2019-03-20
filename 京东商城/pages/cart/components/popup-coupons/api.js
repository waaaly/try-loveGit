function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    if (Array.isArray(t)) {
        for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
        return n;
    }
    return Array.from(t);
}

function n(t) {
    var e = {
        date: "YYYY.MM.DD",
        datetime: "YYYY.MM.DD kk:mm:ss"
    };
    if (1 == t.limitType) return "领取后" + t.addDays + "天内有效";
    var n = 2 == t.hourCoupon ? e.datetime : e.date;
    return (0, d.default)(new Date(+t.beginTime)).format(n) + " - " + (0, d.default)(new Date(+t.endTime)).format(n);
}

function o(t, e) {
    var n = {
        discount: "",
        quota: [],
        desc: "",
        isMutilDiscount: !1
    }, o = 0 == e.couponType;
    if (t) {
        var u = {
            info: []
        }, i = [], r = [];
        if (!(u = JSON.parse(e.discountDesc)).info.length) return;
        n.isMutilDiscount = u.info.length > 1, u.info.sort(function(t, e) {
            return +t.discount - +e.discount;
        }).forEach(function(t) {
            i.push(t), r.push({
                qtext: "满" + t.quota + "元",
                dtext: "" + (0, p.times)(t.discount, 10)
            });
        }), n.discount = i.map(function(t) {
            return "满" + t.quota + "元可用";
        }), n.desc = r, n.quota.push("最高可减" + u.high + "元");
    } else n.discount = (0, p.divide)(e.discount, 100), n.desc = e.discountDesc, !o && n.quota.push("满" + (0, 
    p.divide)(e.quota, 100) + "元可用");
    return n;
}

function u(t) {
    return g.ALL == t.couponKind ? "适用于京东全品类商品（特殊商品除外）" : t.name;
}

function i(t) {
    var e = 0;
    if (1 == t.couponType && 3 == t.couponStyle && 0 !== t.discountDesc.length) {
        var n = JSON.parse(t.discountDesc);
        e = Math.min.apply(Math, n.info.map(function(t) {
            return +t.discount;
        }));
    } else e = 1 - t.discount / t.quota;
    return e;
}

function r(t, e) {
    var n = 8888 == t, o = [];
    return e.length && (o = n ? s(e) : [ e.pop() ]), o;
}

function s(t) {
    for (var e = t.length; e; ) {
        var n = Math.floor(Math.random() * e--), o = [ t[e], t[n] ];
        t[n] = o[0], t[e] = o[1];
    }
    return t;
}

function c(t) {
    return t.sort(function(t, e) {
        var n = 0, o = 0;
        return n = i(t), o = i(e), n - o;
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getImgUrl = exports.format = void 0;

var a = require("../../models/model"), d = t(require("../../../../libs/moment.min")), p = require("../../../../common/numberp.js"), l = require("../../../../common/fe_helper.js"), f = t(require("../../../../libs/promise.min.js")), m = {}, h = {
    GETTABLE: 1,
    USEABLE: 2
}, g = {
    ALL: "0",
    LIMIT: "1",
    VENDER: "2",
    VENDER_LIMIT: "3"
};

exports.format = function(t, i) {
    var s = [], a = [], d = [], p = new Set([]);
    t.forEach(function(t) {
        var e = 1 == t.couponType && 3 == t.couponStyle && 0 !== t.discountDesc.length, i = o(e, t), r = 1 == t.couponSrc && !!t.couponid && 1 == t.couponDo, c = {
            name: u(t),
            encryptedKey: t.encryptedKey,
            roleId: t.roleId,
            couponType: t.couponType,
            skuidlist: [],
            date: "",
            discount: t.discount,
            quota: t.quota,
            discountText: i.discount,
            quotaText: i.quota,
            isMutilDiscount: i.isMutilDiscount,
            mutilDiscountText: i.desc,
            couponKind: t.couponKind,
            useable: t.couponDo == h.USEABLE,
            status: t.couponDo,
            endTime: t.endTime,
            beginTime: t.beginTime,
            isDiscount: e,
            redpacket: r,
            shopId: t.shopId,
            actRuleId: t.actRuleId,
            couponId: t.couponid
        };
        g.ALL === t.couponKind ? t.skuidlist = [] : t.skuidlist.forEach(function(t) {
            !m[t] && p.add(t);
        }), c.date = n(t), c.skuidlist = t.skuidlist, r ? d.push(c) : (h.GETTABLE == t.couponDo && s.push(c), 
        h.USEABLE == t.couponDo && a.push(c));
    });
    var l = [].concat(e(p));
    return {
        gettable: [].concat(e(r(i, d)), e(c(s))),
        useable: c(a),
        skuIds: l
    };
}, exports.getImgUrl = function(t) {
    return t.length ? (0, a.getImgUrlBySkuIds)(t).then(function(t) {
        var e = {}, n = Object.keys(t);
        return n && n.length && n.forEach(function(n) {
            e[n] = (0, l.getImg)(t[n].imagePath, 100);
        }), Object.assign(m, e), f.default.resolve(m);
    }, function(t) {
        return f.default.resolve(m);
    }) : f.default.resolve(m);
};