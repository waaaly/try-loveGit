var e = require("../../page.js"), r = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
    return r.default = e, r;
}(require("../../../common/fe_report/usability.js"));

new e.JDPage({
    onLoad: function(e) {
        r.umpBiz({
            bizid: "744",
            operation: 1,
            result: "12",
            message: "/pages/my/frozenaccount/frozenaccount"
        }), this.$goto("/pages/my_pages/frozenaccount/frozenaccount", e, "redirectTo");
    }
});