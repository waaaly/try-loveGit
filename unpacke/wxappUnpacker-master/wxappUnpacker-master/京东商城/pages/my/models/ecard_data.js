function e(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}

function r(e, t, i) {
    return o.getLoginPromise().then(function() {
        return new n.default(function(n, d) {
            var c = {
                pageNum: e,
                pageSize: t,
                validType: i,
                _t: Math.random()
            };
            s.request.get({
                url: "https://wq.jd.com/user/info/GetGiftCardInfo",
                data: c
            }).then(function(e) {
                var t = e.body, i = (e.header, t);
                if (u("getJDGiftCards.errorCode:" + i.errCode), u("getJDGiftCards.response:" + JSON.stringify(i)), 
                13 != i.errCode) {
                    if (0 == i.errCode || 102 == i.errCode) return a.umpBiz({
                        bizid: 917,
                        operation: 1,
                        result: 0,
                        message: "skrrr"
                    }), void n(i);
                    a.umpBiz({
                        bizid: 917,
                        operation: 1,
                        result: 1,
                        message: i.errCode + ":" + i.errMsg
                    }), d(new Error("查询用户e卡信息失败"));
                } else o.doLogin().then(function() {
                    return r(c.pageNum, c.pageSize, c.validType);
                }).then(n, d);
            }).catch(function(e) {
                var r = e.code, t = e.message;
                a.umpBiz({
                    bizid: 917,
                    operation: 2,
                    result: 1,
                    message: r + ":" + t
                }), u("loadEcardData().fail: " + t), d(new Error("查询用户e卡信息失败"));
            });
        });
    });
}

function t(e) {
    return o.getLoginPromise().then(function() {
        return new n.default(function(r, i) {
            var n = {
                key: e
            };
            s.request.get({
                url: "https://wq.jd.com/activeapi/batchjdgiftcard",
                data: n
            }).then(function(n) {
                var s = n.body, d = (n.header, s);
                if (u("bindCard().errorCode: " + d.ret), 2 != d.ret) {
                    if (0 == d.ret) return a.umpBiz({
                        bizid: 917,
                        operation: 3,
                        result: 0,
                        message: "skrrr"
                    }), void r({
                        isSuccess: !0,
                        message: ""
                    });
                    var c = {
                        5: "卡号有误",
                        6: "卡还未激活",
                        7: "该卡已绑定",
                        145: "操作频率过快，请晚点再试。"
                    }[d.ret];
                    c && a.umpBiz({
                        bizid: 917,
                        operation: 3,
                        result: 0,
                        message: d.ret + ":" + d.retmsg
                    }), !c && a.umpBiz({
                        bizid: 917,
                        operation: 3,
                        result: 1,
                        message: d.ret + ":" + d.retmsg
                    }), r({
                        isSuccess: !1,
                        message: c || "绑定失败"
                    });
                } else o.doLogin().then(function() {
                    return t(e);
                }).then(r, i);
            }).catch(function(e) {
                var r = e.code, t = e.message;
                a.umpBiz({
                    bizid: 917,
                    operation: 4,
                    result: 1,
                    message: r + ":" + t
                }), u("bindCard().errorCode: " + t), i(new Error("绑定京东e卡失败"));
            });
        });
    });
}

function i(e) {
    var r = arguments;
    return o.getLoginPromise().then(function() {
        return new n.default(function(t, n) {
            var d = {
                sceneId: e
            };
            s.request.get({
                url: "https://wq.jd.com/pinbind/getpinflw",
                data: d
            }).then(function(e) {
                var s = e.body, d = (e.header, s);
                return u("getPinFlw().response.errorCode: " + d.errcode), 1001 === d.errcode ? o.doLogin().then(function() {
                    return i.apply(null, r);
                }).then(t, n) : 0 == d.errcode ? (a.umpBiz({
                    bizid: 917,
                    operation: 5,
                    result: 0,
                    message: "skrrr"
                }), void t(d)) : (a.umpBiz({
                    bizid: 917,
                    operation: 5,
                    result: 1,
                    message: d.errcode + ":" + d.errmsg
                }), void n(new Error("查询pin绑定状态失败，请重试")));
            }).catch(function(e) {
                var r = e.code, t = e.message;
                a.umpBiz({
                    bizid: 917,
                    operation: 6,
                    result: 1,
                    message: r + ":" + t
                }), u("bindCard().errorCode: " + t), n(new Error("绑定京东e卡失败"));
            });
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getPinFlw = exports.bindCard = exports.getJDGiftCards = void 0;

var o = e(require("../../../common/login/login.js")), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../libs/promise.min.js")), s = require("../../../common/request/request"), a = e(require("../../../common/fe_report/usability.js")), u = getApp().debug("models/my/ecard");

exports.getJDGiftCards = r, exports.bindCard = t, exports.getPinFlw = i;