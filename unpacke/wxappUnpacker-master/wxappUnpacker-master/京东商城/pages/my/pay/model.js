Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.contractpappay = void 0;

var e = require("../../../common/request/request"), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../libs/promise.min")), t = require("../../../common/logger"), o = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}(require("../../../common/fe_report/usability")), a = new t.Logger("my/nonSecretPay");

exports.contractpappay = function() {
    return new r.default(function(r, t) {
        e.request.get({
            url: "https://wq.jd.com/wxcontractgw/contractpappay",
            data: {
                appid: "wx91d27dbf599dff74"
            }
        }).then(function(e) {
            var a = e.body, n = (e.header, a.errcode), i = a.data, u = a.msg;
            0 == n ? (r(i), o.umpBiz({
                bizid: "57",
                operation: 26,
                result: 0,
                message: "ret:suc"
            })) : (t(a), o.umpBiz({
                bizid: "57",
                operation: 26,
                result: n,
                message: u
            }));
        }).catch(function(e) {
            o.umpBiz({
                bizid: "57",
                operation: 26,
                result: 999,
                message: "ret:fail " + e
            }), t(e), a.error(e);
        });
    });
};