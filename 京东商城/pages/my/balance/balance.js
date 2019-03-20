var e = require("../../page.js"), a = function(e) {
    if (e && e.__esModule) return e;
    var a = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (a[r] = e[r]);
    return a.default = e, a;
}(require("../../../common/fe_report/usability.js"));

new e.JDPage({
    onLoad: function(e) {
        a.umpBiz({
            bizid: "744",
            operation: 1,
            result: "6",
            message: "/pages/my/balance/balance"
        }), this.$goto("/pages/my_pages/balance/balance", e, "redirectTo");
    }
});