function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}

function t(e) {
    d.getLoginPromise().then(function() {
        m.request.get({
            url: "https://wq.jd.com/activepersistent/couponrecommend/couponrecommend",
            data: {
                _t: +new Date(),
                source: "x"
            }
        }).then(function(o) {
            var i = o.body;
            0 == i.ret ? (n(function(t, o) {
                t || (o = o.filter(function(e) {
                    if (2 != e.status) return !0;
                })), o = o.slice(0, 5), e && e(t, o);
            }, i = r(i.couponlist)), b.umpBiz({
                bizid: "635",
                operation: "3",
                result: "0",
                message: "ret: suc"
            })) : 2 == i.ret ? d.doLogin().then(function() {
                t(e);
            }).catch(function() {
                e && e({
                    errId: -1e3,
                    errMsg: _
                }, []);
            }) : (g.log("专属推荐券接口返回失败", i.ret), b.umpBiz({
                bizid: "635",
                operation: "3",
                result: i.ret,
                message: "ret: " + i.ret
            }), e && e({
                errId: i.ret,
                errMsg: i.retmsg
            }, []));
        }).catch(function(t, o) {
            g.log("请求专属推荐券接口fail", o), b.umpBiz({
                bizid: "635",
                operation: "3",
                result: t,
                message: "fail:" + o
            }), e && e({
                errId: -999,
                errMsg: v
            }, []);
        });
    }).catch(function(t) {
        e && e({
            errId: -1e3,
            errMsg: _
        }, []);
    });
}

function o(e, t, n, r) {
    if (!e || !t) return n && n({
        errId: -999,
        errMsg: q
    }, null), !1;
    d.getLoginPromise().then(function() {
        var i = 33;
        r && r.sceneid && (i = r.sceneid), m.request.get({
            url: "https://wq.jd.com/activeapi/obtainjdshopfreecouponv2",
            data: {
                hj: "x",
                scene: i,
                key: e,
                roleid: t,
                _t: +new Date()
            }
        }).then(function(r) {
            var i = r.body;
            999 == i.code ? (b.umpBiz({
                bizid: "635",
                operation: "1",
                result: "0",
                message: "ret: suc"
            }), n && n(null, i.code, i.message)) : 14 == i.code || 15 == i.code ? (b.umpBiz({
                bizid: "635",
                operation: "1",
                result: "0",
                message: "ret: suc"
            }), n && n(null, i.code, i.message)) : 1e3 == i.code ? d.doLogin().then(function() {
                o(e, t, n);
            }).catch(function(e, t) {
                n && n({
                    errId: e,
                    errMsg: _
                }, null);
            }) : ([ "3", "5", "6", "7", "8", "9", "10", "11", "12", "13", "16", "17", "18", "19", "21", "22", "23", "24", "25", "30", "31", "32", "34", "36", "37", "38", "39", "40", "41", "42", "43", "147", "163", "164", "1002" ].indexOf("" + i.code) >= 0 ? b.umpBiz({
                bizid: "635",
                operation: "1",
                result: "0",
                message: "ret: suc"
            }) : b.umpBiz({
                bizid: "635",
                operation: "1",
                result: i.code,
                message: "ret: " + i.code
            }), n && n(null, i.code, i.message));
        }).catch(function(e, t) {
            b.umpBiz({
                bizid: "635",
                operation: "1",
                result: e,
                message: "fail:" + t
            }), n && n({
                errId: -999,
                errMsg: w
            }, null);
        });
    }).catch(function(e, t) {
        n && n({
            errId: e,
            errMsg: _
        }, null);
    });
}

function n(e, t) {
    if (0 == t.length) return e && e(null, []), !1;
    d.getLoginPromise().then(function() {
        for (var o = [], r = {}, i = [], u = 0; u < t.length; u += z) {
            r = {
                rolekeys: "",
                _t: +new Date()
            }, i = [], t.slice(u, u + z).forEach(function(e) {
                i.push(e.roleid + ":" + e.key);
            }), r.rolekeys = i.join("|");
            var a = new l.default(function(e, t) {
                m.request.get({
                    url: "https://wq.jd.com/activeapi/queryjdshopfreecouponstatus",
                    data: r
                }).then(function(o) {
                    var n = o.body;
                    0 == n.errorCode ? (b.umpBiz({
                        bizid: "635",
                        operation: "11",
                        result: "0",
                        message: "ret: suc"
                    }), e(n.data)) : 1 == n.errorCode ? t({
                        ret: n.errorCode,
                        msg: n.errMsg
                    }) : (b.umpBiz({
                        bizid: "635",
                        operation: "11",
                        result: n.errorCode,
                        message: "ret: " + n.errorCode
                    }), e([]));
                }).catch(function(t, o) {
                    b.umpBiz({
                        bizid: "635",
                        operation: "11",
                        result: t,
                        message: "fail:" + o
                    }), e([]);
                });
            });
            o.push(a);
        }
        l.default.all(o).then(function(o) {
            var n = null;
            t.forEach(function(e) {
                for (var t = 0; t < o.length; t++) if (n = o[t][e.roleid]) {
                    e.code = n.resultCode, e.message = n.resultMsg, 999 == n.resultCode ? e.status = 0 : 14 == n.resultCode || 15 == n.resultCode ? e.status = 1 : e.status = 2;
                    break;
                }
            }), e && e(null, t);
        }).catch(function(o) {
            console.error("查询优惠券状态错误", o), 1 == o.ret ? d.doLogin().then(function() {
                n(e, t);
            }).catch(function(o, n) {
                e && e({
                    errId: o,
                    errMsg: n
                }, t);
            }) : e({
                errId: 999,
                errMsg: o
            }, t);
        });
    }).catch(function(o, n) {
        console.log("登陆失败", o, n), e && e({
            errId: o,
            errMsg: n
        }, t);
    });
}

function r(e, t) {
    var o = [], n = {}, r = null;
    return e.forEach(function(e) {
        if (e.strCategoryName = e.strCategoryName.replace(/"/g, ""), e.strCategoryName.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.strCategoryName)) return !1;
        if (e.strLimitStr.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.strLimitStr)) return !1;
        if (!e.strLimitStr) return !1;
        if (n[e.nBatchId]) return !1;
        if (n[e.nBatchId] = !0, (r = {
            roleid: e.ddActivityId,
            key: e.strEncryptedKey,
            quota: e.strQuota,
            batchid: e.nBatchId,
            discount: e.strDiscount,
            limitstr: e.strLimitStr,
            couponstyle: 1 * e.nCouponStyle,
            coupontype: 1 * e.nCouponType,
            couponkind: 1 * e.nCouponKind,
            categoryid: 1 * e.nCategoryId,
            categoryname: e.strCategoryName,
            userate: e.dwUseRate,
            shopid: e.nShopId,
            status: 0,
            rebatevalue: "",
            rebatequota: "",
            rebatetype: 1,
            couponpic: f.getImg(e.sPicUrl),
            begintime: e.ddBeginTime || "",
            endtime: e.ddEndTime || "",
            limittype: e.nLimitType
        }).limitstr || (0 == r.couponkind && 3 == couponkind.couponstyle ? r.limitstr = "折扣神券(限部分商品可用，特殊品类及特价商品除外)" : 0 == r.couponkind && 1 == r.coupontype ? r.limitstr = "适用于京东全品类商品(特殊商品除外)" : 0 == r.couponkind && 0 == r.coupontype ? r.limitstr = "适用于京东全品类商品(特殊商品除外)" : 2 == r.coupontype && (r.limitstr = "限京东自营商品运费(部分特殊商品运费除外)")), 
        e.discount_info || (r.couponstyle = 0), 3 == r.couponstyle) if (1 == e.discount_info.info.length) r.rebatevalue = (10 * e.discount_info.info[0].discount).toFixed(1), 
        r.rebatequota = e.discount_info.info[0].quota, "0" == r.rebatevalue.slice(-1) && (r.rebatevalue = parseInt(r.rebatevalue)); else {
            var i = e.discount_info.info.concat();
            i.sort(function(e, t) {
                return e.quota >= t.quota ? -1 : 1;
            }), i.forEach(function(e) {
                var t = (10 * e.discount).toFixed(1);
                "0" == t.slice(-1) && (t = parseInt(t)), r.rebatevalue += t + "/", r.rebatequota += e.quota + "/";
            }), r.rebatevalue = r.rebatevalue.slice(0, -1), r.rebatequota = r.rebatequota.slice(0, -1), 
            r.rebatetype = 2;
        }
        (!t || t && t(r)) && o.push(r);
    }), o;
}

function i(e) {
    var t = [], o = [], n = [];
    return e.forEach(function(e) {
        if (2 == e.status) return !1;
        e.userate ? t.push(e) : 0 == e.coupontype ? o.push(e) : 1 == e.coupontype && n.push(e);
    }), t.sort(function(e, t) {
        return 1 * e.userate >= 1 * t.userate ? -1 : 1;
    }), o.sort(function(e, t) {
        return 1 * e.discount >= 1 * t.discount ? -1 : 1;
    }), n.sort(function(e, t) {
        return e.discount / e.quota >= t.discount / t.quota ? -1 : 1;
    }), t.length >= 40 ? t.slice(0, 40) : (t = t.concat(o.slice(0, 40))).length >= 40 ? t.slice(0, 40) : (t = t.concat(n)).slice(0, 40);
}

function u(e) {
    for (var t = [], o = [], n = [], r = 0, i = e.length; r < i && !(t.length >= 40); r++) 0 != e[r].couponkind ? 0 != e[r].coupontype ? 1 != e[r].coupontype || n.push(e[r]) : o.push(e[r]) : t.push(e[r]);
    return t.length >= 40 ? t.slice(0, 40) : (o.sort(function(e, t) {
        return e.discount >= t.discount ? -1 : 1;
    }), (t = t.concat(o)).length >= 40 ? t.slice(0, 40) : (n.sort(function(e, t) {
        return e.discount / e.quota >= t.discount / t.quota ? -1 : 1;
    }), (t = t.concat(n)).slice(0, 40)));
}

function a(e) {
    for (var t = [], o = [], n = 0, r = e.length; n < r && !(t.length >= 20); n++) 0 != e[n].couponkind ? o.push(e[n]) : t.push(e[n]);
    return t.length >= 20 ? t.slice(0, 20) : (t = t.concat(o)).slice(0, 20);
}

function s(e, t) {
    if (t.discountInfo && 3 == t.couponStyle) if (e.couponstyle = 3, 1 == t.discountInfo.info.length) e.rebatevalue = (10 * t.discountInfo.info[0].discount).toFixed(1), 
    e.rebatequota = t.discountInfo.info[0].quota, "0" == e.rebatevalue.slice(-1) && (e.rebatevalue = parseInt(e.rebatevalue)); else {
        var o = t.discountInfo.info.concat();
        o.sort(function(e, t) {
            return e.quota >= t.quota ? -1 : 1;
        }), o.forEach(function(t) {
            var o = (10 * t.discount).toFixed(1);
            "0" == o.slice(-1) && (o = parseInt(o)), e.rebatevalue += o + "/", e.rebatequota += t.quota + "/";
        }), e.rebatevalue = e.rebatevalue.slice(0, -1), e.rebatequota = e.rebatequota.slice(0, -1), 
        e.rebatetype = 2;
    }
    return e;
}

function c(e) {
    var t = new RegExp("roleid=([^=&]+)"), o = new RegExp("key=([^=&]+)"), n = e.match(t), r = e.match(o);
    return n = n ? n[1] : null, r = r ? r[1] : null, {
        roleid: n,
        key: r
    };
}

function p(e) {
    return e = e.split(";")[0], {
        discount: e.split(",")[0] || 0,
        quota: e.split(",")[1] || 0
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getcoupon = exports.guessgoods = exports.queryCouponStatus = exports.coupongoods = exports.morecoupon = exports.customcoupon = exports.findcoupon = exports.todaycoupon = exports.findandtodayCoupon = exports.globalppms = void 0;

var d = e(require("../../common/login/login.js")), l = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/promise.min.js")), m = require("../../common/request/request.js"), f = e(require("../../common/fe_helper.js")), g = e(require("../../common/log.js")), h = e(require("../../common/cookie-v2/cookie.js")), b = e(require("../../common/fe_report/usability.js")), y = {
    food: "https://wqs.jd.com/wqactive/food_coupon_wxapp.json",
    clothes: "https://wqs.jd.com/wqactive/clothes_coupon_wxapp.json",
    digital: "https://wqs.jd.com/wqactive/digital_coupon_wxapp.json",
    home: "https://wqs.jd.com/wqactive/home_coupon_wxapp.json",
    mother: "https://wqs.jd.com/wqactive/mother_coupon_wxapp.json",
    others: "https://wqs.jd.com/wqactive/others_coupon_wxapp.json"
}, v = "查询失败", q = "参数错误", w = "领券失败", _ = "未登录或者登录失效";

exports.globalppms = function(e) {
    m.request.get({
        url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33664.jsonp",
        data: {
            _t: +new Date()
        }
    }).then(function(t) {
        var o = t.body, n = o.data ? o.data || [] : [], r = f.getServerTime();
        (n = (n || []).filter(function(e) {
            if (e.banner_begtime && e.banner_endtime) return !(new Date(e.banner_begtime).getTime() > r || new Date(e.banner_endtime).getTime() < r);
        })).forEach(function(e) {
            e.bannerpic = f.getImg(e.bannerpic);
        }), b.umpBiz({
            bizid: "635",
            operation: "12",
            result: "0",
            message: "ret: suc"
        }), e && e(null, n);
    }).catch(function(t, o) {
        b.umpBiz({
            bizid: "635",
            operation: "12",
            result: t,
            message: "fail:" + o
        }), e && e({
            errId: -999,
            errMsg: v
        }, []);
    });
}, exports.findandtodayCoupon = function(e) {
    m.request.get({
        channel: "http",
        url: "https://wqs.jd.com/wqactive/ppms.output_wxapp.json",
        data: {
            _t: +new Date()
        }
    }).then(function(t) {
        var o = t.body, n = o.pagev31232 ? o.pagev31232.data || [] : [], i = [], d = [], l = o.hotv2_coupon || [], m = {}, g = f.getServerTime();
        n.forEach(function(e) {
            if (!e.freeCouponList && !e.couponList) return !1;
            if (e.begtime && e.endtime) {
                if (new Date(e.begtime).getTime() > g) return !1;
                if (new Date(e.endtime).getTime() < g) return !1;
            }
            (e.freeCouponList || []).forEach(function(e) {
                if (e.begtime && e.endtime) {
                    if (new Date(e.begtime).getTime() > g) return !1;
                    if (new Date(e.endtime).getTime() < g) return !1;
                }
                if (e.constraintBeginTime && e.constraintEndTime) {
                    if (new Date(e.constraintBeginTime).getTime() > g) return !1;
                    if (new Date(e.constraintEndTime).getTime() < g) return !1;
                }
                if (e.limitStr.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.limitStr)) return !1;
                if (e.ppms_itemName.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.ppms_itemName)) return !1;
                if (m[e.batchId]) return !1;
                m[e.batchId] = !0;
                var t = c(e.freeCouponLink);
                if (!t.roleid || !t.key) return !1;
                e.coupic || (e.coupic = e.couponAggregationImageurl);
                var o = {
                    roleid: t.roleid,
                    key: t.key,
                    quota: e.quota,
                    batchid: e.batchId,
                    discount: e.discount,
                    limitstr: e.limitStr || e.venderName || e.notes,
                    couponstyle: 0,
                    coupontype: 1 * e.couponType,
                    couponkind: 1 * e.couponKind,
                    couponpic: f.getImg(e.coupic),
                    status: 0,
                    rebatevalue: "",
                    rebatequota: "",
                    rebatetype: 1,
                    begintime: new Date(e.couponBeginTime).getTime(),
                    endtime: new Date(e.couponEndTime).getTime(),
                    limittype: e.limitType
                };
                o = s(o, e), i.push(o);
            }), (e.couponList || []).forEach(function(e) {
                var t = [];
                if (e.begtime && e.endtime) {
                    if (new Date(e.begtime).getTime() > g) return !1;
                    if (new Date(e.endtime).getTime() < g) return !1;
                }
                if (e.ConstraintTime && (t = e.ConstraintTime.split("-"))[0] && t[1]) {
                    if (new Date(t[0]).getTime() > g) return !1;
                    if (new Date(t[1]).getTime() < g) return !1;
                }
                if (e.prizeName.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.prizeName)) return !1;
                if (e.ppms_itemName.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.ppms_itemName)) return !1;
                if (m[e.batchId]) return !1;
                m[e.batchId] = !0;
                var o = p(e.DiscountQuota);
                if (0 != e.couponType && 1 != e.couponType && 2 != e.couponType) return !1;
                var n = {
                    activeid: e.activeId,
                    activelevel: e.activeLevel,
                    quota: o.quota,
                    batchid: e.batchId,
                    discount: o.discount,
                    limitstr: e.prizeName,
                    couponstyle: 0,
                    coupontype: 1 * e.couponType,
                    couponkind: 1 * e.couponKind,
                    couponpic: f.getImg(e.coupic),
                    status: 0,
                    rebatevalue: "",
                    rebatequota: "",
                    rebatetype: 1,
                    begintime: t[0] ? new Date(t[0]).getTime() : 0,
                    endtime: t[1] ? new Date(t[1]).getTime() : 0,
                    limittype: "1"
                };
                n = s(n, e), d.push(n);
            });
        }), i = u(i), d = a(d), l = r(l, function(e) {
            return 2 == e.coupontype || 0 == e.couponkind;
        }), m = null, o = null, b.umpBiz({
            bizid: "635",
            operation: "9",
            result: "0",
            message: "ret: suc"
        }), e(null, l, i, d);
    }).catch(function(t, o) {
        b.umpBiz({
            bizid: "635",
            operation: "9",
            result: t,
            message: "fail:" + o
        }), e && e({
            errId: -999,
            errMsg: v
        }, [], [], []);
    });
}, exports.todaycoupon = function(e) {
    m.request.get({
        url: "https://wqs.jd.com/data/ppms/js/ppms.pagev31232.json",
        data: {
            _t: +new Date()
        }
    }).then(function(t) {
        var o = t.body, n = [], r = {}, i = f.getServerTime();
        o.data.forEach(function(e) {
            if (new Date(e.begtime).getTime() < i && i < new Date(e.endtime).getTime()) {
                if (!e.freeCouponList) return !1;
                e.freeCouponList.forEach(function(e) {
                    if (e.limitStr.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.limitStr)) return !1;
                    if (e.ppms_itemName.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.ppms_itemName)) return !1;
                    if (r[e.batchId]) return !1;
                    r[e.batchId] = !0;
                    var t = c(e.freeCouponLink);
                    if (!t.roleid || !t.key) return !1;
                    n.push({
                        roleid: t.roleid,
                        key: t.key,
                        quota: e.quota,
                        batchid: e.batchId,
                        discount: e.discount,
                        limitstr: e.limitStr || e.venderName || e.notes,
                        couponstyle: 0,
                        coupontype: 1 * e.couponType,
                        couponkind: 1 * e.couponKind,
                        couponpic: f.getImg(e.coupic),
                        status: 0
                    });
                });
            }
        }), console.log("_________today coupon", n.length), r = null, o = null, b.umpBiz({
            bizid: "635",
            operation: "2",
            result: "0",
            message: "ret: suc"
        }), e(null, n);
    }).catch(function(t, o) {
        b.umpBiz({
            bizid: "635",
            operation: "2",
            result: t,
            message: "fail:" + o
        }), e && e({
            errId: -999,
            errMsg: v
        }, []);
    });
}, exports.findcoupon = function(e) {
    m.request.get({
        url: "https://wqs.jd.com/wqactive/hotv2_coupon.json",
        data: {
            _t: +new Date()
        }
    }).then(function(t) {
        var o = t.body;
        o = r(o, function(e) {
            return 2 == e.coupontype || 0 == e.couponkind;
        }), b.umpBiz({
            bizid: "635",
            operation: "5",
            result: "0",
            message: "ret: suc"
        }), e(null, o);
    }).catch(function(t, o) {
        b.umpBiz({
            bizid: "635",
            operation: "5",
            result: t,
            message: "fail:" + o
        }), e && e({
            errId: -999,
            errMsg: v
        }, []);
    });
}, exports.customcoupon = t, exports.morecoupon = function(e, t) {
    if (!y[e]) return t && t({
        errId: -999,
        errMsg: q
    }, []), !1;
    m.request.get({
        url: y[e],
        data: {
            _t: +new Date()
        }
    }).then(function(e) {
        var o = e.body;
        n(function(e, o) {
            e || (o = (o = o.filter(function(e) {
                return 2 != e.status;
            })).slice(0, 40)), t && t(e, o);
        }, o = i(o = r(o))), b.umpBiz({
            bizid: "635",
            operation: "4",
            result: "0",
            message: "ret: suc"
        });
    }).catch(function(o, n) {
        g.log("更多好券接口fail", n), b.umpBiz({
            bizid: "635",
            operation: "4",
            result: o,
            message: "fail(" + e + "): " + n
        }), t && t({
            errId: -999,
            errMsg: v
        }, []);
    });
}, exports.coupongoods = function(e, t, o, n) {
    if (!e || !t) return n && n({
        errId: -999,
        errMsg: q
    }, []), !1;
    m.request.get({
        url: "https://wqsou.jd.com/coprsearch/cosearch",
        data: {
            datatype: 1,
            _t: +new Date(),
            coupon_batch: e,
            coupon_kind: t,
            coupon_shopid: o || 0,
            coupon_aggregation: "yes"
        }
    }).then(function(e) {
        var t = e.body;
        if (0 == t.retcode) {
            var o = [];
            t.data.searchm.Paragraph && t.data.searchm.Paragraph.forEach(function(e) {
                o.push({
                    sku: e.wareid,
                    price: e.dredisprice,
                    name: e.Content.warename,
                    imgurl: f.getImg(e.Content.imageurl, 230)
                });
            }), b.umpBiz({
                bizid: "635",
                operation: "8",
                result: "0",
                message: "ret: suc"
            }), n && n(null, o);
        } else b.umpBiz({
            bizid: "635",
            operation: "8",
            result: t.retcode,
            message: "ret: " + t.retcode
        }), n && n({
            errId: t.retcode,
            errMsg: t.errmsg
        }, []);
    }).catch(function(e, t) {
        b.umpBiz({
            bizid: "635",
            operation: "8",
            result: e,
            message: "fail:" + t
        }), n && n({
            errId: -999,
            errMsg: v
        }, []);
    });
}, exports.queryCouponStatus = n, exports.guessgoods = function(e) {
    m.request.get({
        url: "https://diviner.jd.com/diviner",
        data: {
            lid: 1,
            lim: 12,
            p: 630020,
            ec: "utf-8",
            _t: +new Date(),
            pin: h.getCookie("pin"),
            uuid: h.getCookie("visitkey") || -1
        }
    }).then(function(t) {
        var o = t.body;
        if (o.success) {
            var n = [];
            o.data && o.data.forEach(function(e) {
                n.push({
                    sku: e.sku,
                    price: e.jp,
                    name: e.t,
                    imgurl: f.getImg(e.img, 230)
                });
            }), e && e(null, n), b.umpBiz({
                bizid: "635",
                operation: "10",
                result: "0",
                message: "ret: suc"
            });
        } else b.umpBiz({
            bizid: "635",
            operation: "10",
            result: "1",
            message: "ret: " + o.error_msg
        }), e && e({
            errId: -1,
            errMsg: o.error_msg
        }, []);
    }).catch(function(t, o) {
        b.umpBiz({
            bizid: "635",
            operation: "10",
            result: t,
            message: "fail:" + o
        }), e && e({
            errId: -999,
            errMsg: v
        }, []);
    });
}, exports.getcoupon = o;

var z = 50;