var e = require("../../libs/promise.js"), n = function(n) {
    var t = n.functionName, i = n.successResultName, s = n.failMessage, u = n.completeFunction;
    return new e(function(e, n) {
        var c = {
            success: function(n) {
                e(i ? n[i] : n);
            },
            fail: function(e) {
                n({
                    name: s || e.errMsg
                });
            }
        };
        u && (c.complete = u), wx[t](c);
    });
}, t = {
    weixinUserInfo: function(e) {
        return n({
            functionName: "getUserInfo",
            successResultName: "userInfo",
            failMessage: "weixin_authorize_failed",
            completeFunction: e
        });
    },
    weixinGetSetting: function(e) {
        return n({
            functionName: "getSetting",
            successResultName: "authSetting",
            failMessage: "weixin_getSetting_failed",
            completeFunction: e
        });
    },
    weixinOpenSetting: function(e) {
        return n({
            functionName: "openSetting",
            successResultName: "authSetting",
            failMessage: "weixin_openSetting_failed",
            completeFunction: e
        });
    }
};

module.exports = t;