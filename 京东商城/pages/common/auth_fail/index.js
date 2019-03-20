var e = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (r[a] = e[a]);
    return r.default = e, r;
}(require("../../../api/Ptag/Ptag_constants")), r = (require("../../../api/Ptag/Ptag_utils.js"), 
require("../../../api/Ptag/report_manager.js"));

new (require("../../page.js").JDPage)({
    onLoad: function() {
        r.ReportManager.setCurrentPageAndAddPv(e.PAGE_AUTH, {
            ptag: e.EXP_AUTH_FAILED
        });
    }
});