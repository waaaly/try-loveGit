var e = require("../../page.js"), r = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}(require("../../../common/fe_report/usability.js"));

new e.JDPage({
    onLoad: function(e) {
        r.umpBiz({
            bizid: "744",
            operation: 1,
            result: "9",
            message: "/pages/my/bindresult/bindresult"
        }), this.$goto("/pages/my_pages/bindresult/bindresult", e, "redirectTo");
    }
});