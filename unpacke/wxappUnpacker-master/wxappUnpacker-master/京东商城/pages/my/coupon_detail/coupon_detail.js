var e = require("../../page.js"), o = function(e) {
    if (e && e.__esModule) return e;
    var o = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (o[r] = e[r]);
    return o.default = e, o;
}(require("../../../common/fe_report/usability.js"));

new e.JDPage({
    onLoad: function(e) {
        o.umpBiz({
            bizid: "744",
            operation: 1,
            result: "11",
            message: "/pages/my/coupon_detail/coupon_detail"
        }), this.$goto("/pages/my_pages/coupon_detail/coupon_detail", e, "redirectTo");
    }
});