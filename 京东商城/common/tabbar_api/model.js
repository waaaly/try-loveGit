Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.pointApi = void 0;

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/promise.min.js")), t = require("../request/request.js"), r = {
    CUSTOMIZED_CART: 21
}, n = {
    queryUserRedPoint: function(r) {
        return new e.default(function(e, n) {
            var u = {
                url: "https://wq.jd.com/user_redpoint/QueryUserRedPoint",
                data: {
                    type: r
                }
            };
            t.request.get(u).then(function(t) {
                var r = t.body, u = r.iRet, o = r.data;
                "0" == u ? e(o) : n(t);
            }).catch(function(e) {
                return n(e);
            });
        });
    },
    clearUserRedPoint: function(r) {
        return new e.default(function(e, n) {
            var u = {
                url: "https://wq.jd.com/user_redpoint/ClearUserRedPoint",
                data: {
                    type: r
                }
            };
            t.request.get(u).then(function(t) {
                "0" == t.body.iRet ? e() : n(t);
            }).catch(function(e) {
                return n(e);
            });
        });
    },
    queryCartSkuNum: function() {
        return new e.default(function(e, n) {
            var u = {
                url: "https://wq.jd.com/deal/mshopcart/getcustomizedcart",
                ump: {
                    bizId: 616,
                    opId: r.CUSTOMIZED_CART,
                    errOpId: r.CUSTOMIZED_CART,
                    reportHook: function(e) {
                        return {
                            code: +e.errId,
                            message: e.errMsg || ""
                        };
                    }
                }
            };
            t.request.get(u).then(function(t) {
                var r = t.body, n = r.cartJson, u = r && 0 == r.errId && n && 0 == n.code;
                e(u ? n : null);
            }, function(t) {
                return e(null);
            });
        });
    }
};

exports.pointApi = n;