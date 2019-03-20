function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("../../../../../common/login/loginv1.js")), n = e(require("../../../../../libs/promise.min.js")), o = require("../../../../../common/request/request.js"), r = e(require("../../../../../common/wxcontext")), u = {
    querynewmsgsnum: function() {
        return new n.default(function(e, n) {
            t.getLoginPromise().then(function() {
                var t = "wxapp" == r.default.JD.device.scene || "weixin" == r.default.JD.device.scene ? 1 : 2;
                o.request.get({
                    url: "https://wq.jd.com/user/msgcenter/querynewmsgsnum",
                    data: {
                        channel: t
                    },
                    ump: {
                        key: "wq.webmonitor.mjgj.dianpuToutiao.querynewmsgsnum",
                        bizId: "903",
                        opId: "1",
                        errBizId: "903",
                        errOpId: "2",
                        reportHook: function(e) {
                            return 0 == e.iRet || 13 == e.iRet ? {
                                code: 0
                            } : {
                                code: e.iRet,
                                message: e.msg
                            };
                        }
                    },
                    dataType: r.default.isXCX ? "" : "jsonp"
                }).then(function(t) {
                    var o = t.body;
                    0 == o.iRet ? e(o) : 13 == o.iRet ? e(u.querynewmsgsnum()) : n("iRet=:" + o.iRet);
                }).catch(function(e) {
                    n(e);
                });
            }).catch(function(e) {
                var t = e.code, o = e.message;
                n("querynewmsgsnum,code:" + t + ",message:" + o);
            });
        });
    },
    getPpmsDianpuToutiaoConfig: function() {
        return new n.default(function(e, t) {
            o.request.get({
                url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev32946.jsonp",
                ump: {
                    key: "wq.webmonitor.mjgj.my.dianpuToutiao.ppmsConfig",
                    bizId: "903",
                    opId: "3",
                    errBizId: "903",
                    errOpId: "4",
                    reportHook: function(e) {
                        return e && e.data && e.data[0] ? {
                            code: 0
                        } : {
                            code: 666,
                            message: "ppms config 配置不全"
                        };
                    }
                },
                dataType: r.default.isXCX ? "" : "jsonp",
                jsonpCallback: "showPageData32946"
            }).then(function(n) {
                var o = n.body;
                o && o.data && o.data[0] ? e(o.data[0]) : t("ppms config less than need");
            }).catch(function(e) {
                var n = e.code, o = e.message;
                t("getPpmsDianpuToutiaoConfig,code:" + n + ",message:" + o);
            });
        });
    }
};

exports.default = u;