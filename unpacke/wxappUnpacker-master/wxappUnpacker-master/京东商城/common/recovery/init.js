function e(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    r.request.get({
        url: i
    }).then(function(e) {
        var r = e.body;
        Object.keys(r).length > 0 && s.setCossConfigData(r);
    }), t.getPPMS(a).then(function(e) {
        s.setPpmsConfigData(e && e[0]);
    }), (0, u.globalConfigGet)().then(function(e) {
        var r = e.item, t = e.search;
        n.setStatus(r && r.recovery && 1 == r.recovery.enabled), o.setStatus(t && t.recovery && 1 == t.recovery.enabled);
    });
};

var r = require("../request/request.js"), t = e(require("../biz.js")), s = e(require("./coss.js")), o = e(require("./search.js")), n = e(require("./item.js")), u = require("../global_config.js"), i = "https://wq.360buyimg.com/data/coss/cgi_recovery.jsonp", a = 34006;