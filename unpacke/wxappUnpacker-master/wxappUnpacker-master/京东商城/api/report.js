Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.reportUMPBiz = void 0;

var e = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
    return r.default = e, r;
}(require("../common/http_json.js")), r = require("../common/http_access");

exports.reportUMPBiz = function() {
    var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    e.get(r.errorLog.url, r.errorLog.getData({
        url: o.url || "APP",
        errCode: o.result || "-1",
        errMsg: o.message ? o.message.replace(/(\r\n|\r|\n)+/g, " ") : "",
        responseTime: o.responseTime || "-1",
        page: o.page || "pages/index/index",
        env: o.env || "ws"
    }), o.callback || r.errorLog.callback);
};