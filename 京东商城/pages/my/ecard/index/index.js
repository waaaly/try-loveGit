var e = require("../../../page.js"), r = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    return r.default = e, r;
}(require("../../../../common/fe_report/usability.js"));

new e.JDPage({
    onLoad: function(e) {
        r.umpBiz({
            bizid: "744",
            operation: 1,
            result: "2",
            message: "/pages/my/ecard/index/index"
        }), this.$goto("/pages/my_pages/ecard/index/index", e, "redirectTo");
    }
});