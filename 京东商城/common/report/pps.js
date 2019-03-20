Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(t) {
    (0, e.request)({
        method: "GET",
        url: "https://wq.jd.com/mcoss/rpds/report",
        data: {
            pps: r.decode(t)
        },
        priority: "REPORT"
    }).then(function(e) {
        console.log("pps 点击上报成功");
    }).catch(function(e) {
        console.warn("pps 点击上报失败");
    });
};

var e = require("../request/request.js"), r = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}(require("../utils.js"));