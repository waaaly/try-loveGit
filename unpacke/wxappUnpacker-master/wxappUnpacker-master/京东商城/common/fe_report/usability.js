Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.umpReport = exports.start = exports.prepare = exports.umpBiz = exports.report = exports._reset = exports.OP_COUPON_STATUS = exports.OP_COUPON_GUESS = exports.OP_SECKILL_CATEGORYPPMS = exports.OP_SECKILL_CATEGORYLIST = exports.OP_SECKILL_DETAILBRAND = exports.OP_SECKILL_DETAILLIST = exports.OP_SECKILL_BRANDCATE = exports.OP_3C_SHOP_GOODS = exports.OP_3C_SHOP_INFO = exports.OP_ORDER_TRACE = exports.OP_SECKILL_UNSUBSCRIBE = exports.OP_SECKILL_SUBSCRIBE = exports.OP_ITEM_ADD_CART = exports.OP_COUPON_DRAW = exports.OP_COUPON_GOODS = exports.OP_COUPON_FIND = exports.OP_COUPON_MORE = exports.OP_COUPON_RECOMMEND = exports.OP_COUPON_TODAY = exports.OP_SHOP_PROMOTE = exports.OP_SHOP_NEW = exports.OP_SHOP_ALL = exports.OP_SHOP_INFO = exports.OP_MY_COUPON_2 = exports.OP_ORDER_DETAIL = exports.OP_ORDER_LIST = exports.OP_USER_INFO = exports.OP_CATE = exports.OP_PAY = exports.OP_SEARCH = exports.OP_ITEM_ALL = exports.OP_ITEM_MAIN = exports.OP_CART = exports.OP_SECKILL = void 0;

var e = require("../request/request.js"), r = (0, require("../debug.js").debug)("Usability 前端功能可用性上报"), t = {}, O = {}, o = (exports.OP_SECKILL = 1, 
exports.OP_CART = 2, exports.OP_ITEM_MAIN = 3, exports.OP_ITEM_ALL = 4, exports.OP_SEARCH = 5, 
exports.OP_PAY = 6, exports.OP_CATE = 7, exports.OP_USER_INFO = 8, exports.OP_ORDER_LIST = 9, 
exports.OP_ORDER_DETAIL = 10, exports.OP_MY_COUPON_2 = 12, exports.OP_SHOP_INFO = 13, 
exports.OP_SHOP_ALL = 14, exports.OP_SHOP_NEW = 15, exports.OP_SHOP_PROMOTE = 16, 
exports.OP_COUPON_TODAY = 17, exports.OP_COUPON_RECOMMEND = 18, exports.OP_COUPON_MORE = 19, 
exports.OP_COUPON_FIND = 20, exports.OP_COUPON_GOODS = 21, exports.OP_COUPON_DRAW = 22, 
exports.OP_ITEM_ADD_CART = 23, exports.OP_SECKILL_SUBSCRIBE = 24, exports.OP_SECKILL_UNSUBSCRIBE = 25, 
exports.OP_ORDER_TRACE = 26, exports.OP_3C_SHOP_INFO = 27, exports.OP_3C_SHOP_GOODS = 28, 
exports.OP_SECKILL_BRANDCATE = 31, exports.OP_SECKILL_DETAILLIST = 32, exports.OP_SECKILL_DETAILBRAND = 33, 
exports.OP_SECKILL_CATEGORYLIST = 34, exports.OP_SECKILL_CATEGORYPPMS = 35, exports.OP_COUPON_GUESS = 39, 
exports.OP_COUPON_STATUS = 40, {
    _reset: function(e) {
        var r = t[e];
        return !!r && (clearTimeout(r), delete t[e], !0);
    },
    report: function(t, O, _, s) {
        var p = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4], P = arguments[5];
        if ((!p || o._reset(t)) && (_ = _ || "", _ += "", t = parseInt(t), !isNaN(t))) {
            if (O = parseInt(O), isNaN(O) && (O = 1), 1 == O && _) {
                var x = _.match(/[(（](\d+)[)）]/);
                x && (O = ~~x[1] || 1);
            }
            o.records = o.records || [];
            var E = [ s || 441, t, O, 0, _ ];
            P && E.push(P), o.records.push(E.join("|")), clearTimeout(o.debounce), o.debounce = setTimeout(function() {
                var t = {
                    contents: o.records.join(","),
                    t: Math.random()
                };
                o.records = [], (0, e.request)({
                    method: "POST",
                    url: "https://wq.jd.com/webmonitor/collect/biz.json",
                    data: t,
                    priority: "REPORT"
                }), r(t);
            }, 1e3);
        }
    },
    umpBiz: function(e, r) {
        var t = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (void 0 !== (r = r || 10) && Math.floor(10 * Math.random()) > r) return !1;
        o.report(e.operation, e.result, e.message, e.bizid, t, e.traceid);
    },
    prepare: function(e) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 15e3;
        o._reset(e), t[e] = setTimeout(function() {
            o.report(e, 408, "REQUEST_TIMEOUT");
        }, r);
    },
    start: function(e, r, t) {
        var _ = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 8e3;
        if (!e || !r || !t) throw new Error("参数不合法");
        return O[e] = {
            bizid: r,
            operation: t,
            rid: setTimeout(function() {
                O[e] && (delete O[e], o.report(t, 408, "REQUEST_TIMEOUT", r));
            }, _)
        }, function(_, s, p) {
            O[e] && (clearTimeout(O[e].rid), delete O[e], o.umpBiz({
                operation: t,
                result: _,
                message: s,
                bizid: r
            }, p));
        };
    },
    umpReport: function(e, r, t, _) {
        if (!e) throw new Error("参数不合法");
        var s = O[e];
        s && (clearTimeout(s.rid), delete O[e], s.result = r, s.message = t, o.umpBiz(s, _));
    }
});

exports._reset = o._reset, exports.report = o.report, exports.umpBiz = o.umpBiz, 
exports.prepare = o.prepare, exports.start = o.start, exports.umpReport = o.umpReport;