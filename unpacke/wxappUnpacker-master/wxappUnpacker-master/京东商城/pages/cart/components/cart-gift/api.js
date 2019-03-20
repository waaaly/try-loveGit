function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function t(e) {
    var t = Date.now(), r = 1e3 * Number(e.split(",")[0]), n = 1e3 * Number(e.split(",")[1]);
    return t >= r && t < n;
}

function r(e) {
    return Date.now() < 1e3 * Number(e.split(",")[1]);
}

function n(e) {
    var t = e.key, r = void 0 === t ? "" : t, u = e.level, o = {
        url: "https://wq.jd.com/active/active_draw",
        data: {
            active: r,
            level: void 0 === u ? "" : u,
            ext: "hj:x"
        }
    };
    return a.request.get(o).then(function(e) {
        var t = e.body, r = t.ret, u = t.bingo;
        return 2 == r ? l.doLogin().then(n).catch(function(e) {
            return i.default.reject(null);
        }) : 0 == r && u && 0 == u.bingoret && u.bingolevel > 0 ? i.default.resolve(t) : i.default.reject(t);
    }, function(e) {
        return i.default.reject(e);
    });
}

function u() {
    var e = {
        url: "https://wq.jd.com/pinbind/QueryPinStatus",
        data: {
            source: 2
        }
    };
    return a.request.get(e).then(function(e) {
        var t = e.body, r = 13 == t.errcode, n = 0 == t.errcode;
        return r ? l.doLogin().then(u).catch(function(e) {
            return i.default.reject(null);
        }) : n ? i.default.resolve(t) : i.default.reject(null);
    }, function(e) {
        return i.default.reject(null);
    });
}

function o() {
    var e = getCurrentPages().slice(0).pop(), t = e.route || e.__route__ || "";
    return t ? "/" + t : t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.QueryUserType = function() {
    var e = {
        url: "https://wq.jd.com/mjgj/column/QueryUserThirdBuyUnactStatus",
        data: {
            t: Date.now(),
            pin: s.getCookie("pin"),
            wid: s.getCookie("wid")
        }
    };
    return new i.default(function(t, r) {
        a.request.get(e).then(function(e) {
            var r = e.body, n = r.data, u = [ "1", "2", "11", "12", "13", "14", "15" ];
            if (0 == r.iRet) {
                var o = 21 != n.status2, i = 2 == n.status5, a = i ? d[16] : "";
                !i && u.indexOf(n.status1) > -1 ? a = d[n.status1] : i || 0 != n.status1 || 22 != n.status2 || (a = d[n.status1]), 
                t(Object.assign(n, {
                    isDefualtPin: o,
                    isNewUser: i,
                    activeId: a
                }));
            } else t(null);
        }).catch(function() {
            t(null);
        });
    });
}, exports.queryCoupons = function(e) {
    var n = e.activeId, u = {
        url: "https://wq.jd.com/activepersistent/couponrecommend/queryuseractiveinfo",
        data: {
            active: n
        }
    };
    return new i.default(function(e, o) {
        a.request.get(u).then(function(u) {
            var o = u.body;
            if (0 == o.ret) {
                var i = [];
                try {
                    o.prizes.forEach(function(e) {
                        for (var n = e.ConstraintTime.split(";"), u = e.Vender.split(";") || [], o = e.ValidType.split(","), a = e.CouponTime.split(";"), c = e.DiscountQuota.split(";"), s = n.length, l = 0 == e.Status, f = t(e.PrizeTime), d = void 0, p = void 0, g = 0; g < s; g++) d = !0, 
                        p = !0, n[g] && (d = t(n[g])), o[g].indexOf("1") > -1 && a[g] && (p = r(a[g])), 
                        l && f && d && p && i.push({
                            DiscountQuota: c[g],
                            Vender: u[g] || "",
                            CouponTime: a[g],
                            Level: e.Level,
                            ValidType: o[g],
                            bingo: !0
                        });
                    });
                } catch (t) {
                    e(null);
                }
                if (i.forEach(function(e) {
                    e.active = n, e.isNewUserCoupon = n == d[16];
                }), o.bingos && o.bingos.length) {
                    var a = o.bingos.map(function(e) {
                        return e.Level;
                    });
                    i = i.filter(function(e) {
                        return -1 == a.indexOf(e.Level);
                    });
                }
                e(i);
            } else e(null);
        }).catch(function() {
            e(null);
        });
    });
}, exports.drawGifts = n, exports.queryPinStatus = u, exports.enableGift = function() {
    return c.getPPMS(28656, {
        expire: "5m"
    }).then(function(e) {
        var t = e.find(function(e) {
            return "wxapp_cart_user_gifts_abtest" == e.grayName;
        }) || {}, r = "1" === t.grayIsOpen, n = +t.grayFil || 0, u = s.getCookie("visitkey"), o = s.getCookie("jdpin"), a = u.length;
        if (!t || !r || !a) return i.default.resolve(!1);
        var c = +u.slice(u.length - 2), l = t.grayWhiteName.split(",").indexOf(o) > -1, f = 100 === n || n >= c || l;
        return i.default.resolve(f);
    }).catch(function(e) {
        return console.log(), i.default.resolve(!1);
    });
}, exports.couponMsg = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = e.bingo || "", r = e.retmsg || t.bingomsg || "", n = e ? e.ret : "";
    switch (n = t.bingoret || n) {
      case 0:
        r = "优惠券领取成功，快去下单使用吧";
        break;

      case 19:
        r = "小伙伴太热情，券已被抢光了";
        break;

      case 26:
      case 147:
        r = "当前排队人数太多，请稍后再试~";
        break;

      default:
        r = r || "领券失败，请稍后重试吧";
    }
    return r;
}, exports.switchAccount = function(e) {
    return e ? a.request.get({
        url: "https://wq.jd.com/pinbind/switchAccount",
        data: {
            expectPin: f.base64encode(encodeURIComponent(e)),
            fromtype: "x",
            sceneid: "521192167",
            atk: 9,
            rurl: o()
        }
    }).then(function(e) {
        var t = e.body;
        return 0 == t.retcode ? i.default.resolve(t) : i.default.reject(t);
    }, function(e) {
        return i.default.reject(e);
    }) : i.default.reject(new Error("没有找到有效的账号"));
}, exports.getCurrentPageRoute = o;

var i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../libs/promise.min.js")), a = require("../../../../common/request/request.js"), c = e(require("../../../../common/biz.js")), s = e(require("../../../../common/cookie-v2/cookie.js")), l = e(require("../../../../common/login/login.js")), f = e(require("../../../../common/base64/base64.js")), d = {
    0: "wqgouwuche5",
    1: "wqgouwuche2",
    2: "wqgouwuche2",
    11: "wqgouwuche3",
    12: "wqgouwuche3",
    13: "wqgouwuche3",
    14: "wqgouwuche3",
    15: "wqgouwuche4",
    16: "wqgouwuche1"
};