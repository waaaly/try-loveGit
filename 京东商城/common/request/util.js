function r(r) {
    if ("string" != typeof r) return r;
    try {
        r = (r = r.replace(/^\w*\s*\{?\s*\w*\s*\(/, "")).replace(/\);?\s*$|\);?\s*\}$|\)\s*;?\}\s*\w+\s*\(\w*\)\s*\{?[^£]*\}?$/, "");
    } catch (r) {
        console.error(r.message);
    }
    return r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.toFormData = exports.getCSRFToken = exports.formatJSONP = exports.formatJSON = void 0;

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(r) {
    return typeof r;
} : function(r) {
    return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
}, t = require("../json_parse.js");

exports.formatJSON = function(o) {
    if (!o) return {
        error: "数据不能为空"
    };
    if ("object" == (void 0 === o ? "undefined" : e(o))) return {
        data: o
    };
    if ("string" == typeof o && o.match(/^\s*<[!\w]+/)) return {
        error: "数据为 HTML 格式"
    };
    var n = r(o);
    if ("string" == typeof n && n.match(/^[a-zA-Z_0-9]/)) return {
        error: "非法 JSON 格式"
    };
    if ("object" != (void 0 === n ? "undefined" : e(n))) try {
        var s = Date.now();
        return {
            data: (0, t.JP)(n),
            timeSpent: Date.now() - s
        };
    } catch (r) {
        return console.error("JSON parse error", r), {
            error: r.message
        };
    }
    return {
        error: "非法字符串"
    };
}, exports.formatJSONP = r, exports.getCSRFToken = function(r) {
    for (var e = r.length, t = 5381, o = 0; o < e; ++o) t += (t << 5) + r.charAt(o).charCodeAt();
    return "" + (2147483647 & t);
}, exports.toFormData = function() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = [];
    for (var t in r) e.push(encodeURIComponent(t) + "=" + encodeURIComponent(r[t]));
    return e.join("&");
};