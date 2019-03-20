function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e.default = t, e;
}

var e = require("../../../common/logger"), n = t(require("../../../common/toast/toast")), o = require("../../page"), r = t(require("./model")), i = t(require("../../../common/fe_report/usability")), a = new e.Logger("my/nonSecretPay");

new o.JDPage({
    data: {
        isReturn: !1,
        tips: "正在进行环境检测...",
        textTimer: null,
        jumpTimer: null
    },
    onLoad: function() {
        this.getContractPay();
    },
    onShow: function() {
        this.data.isReturn && (this.setData({
            isReturn: !1,
            tips: "环境安全，检测通过"
        }), this.returnToAccount());
    },
    onUnload: function() {
        clearTimeout(this.textTimer), clearTimeout(this.jumpTimer);
    },
    getContractPay: function() {
        var t = this;
        this.textTimer = setTimeout(function() {
            t.setData({
                tips: "环境安全，检测通过"
            });
        }, 2700), r.contractpappay().then(function(e) {
            t.jumpTimer = setTimeout(function() {
                t.jumpToContract(e);
            }, 4500);
        }).catch(function(e) {
            a.error(e), e && e.errcode && (n.show({
                content: e.msg || "开通失败，请稍后再试"
            }), setTimeout(function() {
                t.returnToAccount();
            }, 2e3));
        });
    },
    jumpToContract: function(t) {
        var e = this, n = t.appId, o = t.extraData, r = t.path, a = i.start("wq.webmonitor.account.method.getContractPay", 57, 26, 6e3);
        wx.navigateToMiniProgram({
            appId: n,
            extraData: o,
            path: r,
            success: function(t) {
                a(0), e.setData({
                    isReturn: !0
                });
            },
            fail: function(t) {
                a(1), e.returnToAccount();
            }
        });
    },
    returnToAccount: function() {
        this.$goto("/pages/h5/index", {
            url: "https://wqs.jd.com/my/accountv2.shtml?sceneid=11110&state=0&rurl=" + encodeURIComponent("/pages/my/index/index") + "&ptag=7414.1.5"
        }, {
            method: "redirectTo"
        });
    }
});