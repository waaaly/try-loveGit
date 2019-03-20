function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}

var e = require("../../bases/component.js"), i = t(require("../../common/cookie-v2/cookie")), o = t(require("../../common/fe_report/usability.js")), a = require("../../api/Ptag/Ptag_utils"), r = t(require("../../api/Ptag/Ptag_constants"));

new e.JDComponent({
    properties: {
        skuId: String
    },
    data: {
        isShow: !0,
        parameter: ""
    },
    attached: function() {
        var t = this.data.skuId, e = i.getCookie("PPRD_P").split("-").find(function(t) {
            return t.indexOf("EA") >= 0;
        }) || "", o = {
            skuId: t,
            category: "jump",
            des: "productDetail",
            m_source: "wxapp",
            visitkey: i.getCookie("visitkey"),
            pin: i.getCookie("jdpin"),
            sid: i.getCookie("visitkey") + "|" + i.getCookie("__wga").split(".").pop(),
            __jda: i.getCookie("__jda"),
            __jdv: i.getCookie("__jdv"),
            unpl: i.getCookie("unpl"),
            cookie_ptag: e
        };
        o = JSON.stringify(o), this.setData({
            parameter: "openApp.jdMobile://virtual?params=" + encodeURIComponent(o)
        }), a.PtagUtils.addPtag(r.EXP_APP_LAUNCH);
    },
    methods: {
        launchAppError: function(t) {
            o.umpBiz({
                bizid: "760",
                operation: 2,
                result: "1",
                message: t.detail.errMsg
            }), this.toast.show({
                content: "请至应用市场/APP STORE 下载京东app"
            }), console.log("返回app参数" + this.data.parameter);
        },
        close: function() {
            this.setData({
                isShow: !1
            });
        },
        clickUmp: function() {
            a.PtagUtils.addPtag(r.CLK_APP_LAUNCH);
        }
    }
});