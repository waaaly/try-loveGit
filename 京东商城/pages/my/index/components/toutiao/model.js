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
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}(require("../../../../../common/login/loginv1.js")), o = e(require("../../../../../libs/promise.min.js")), a = require("../../../../../common/request/request.js"), n = e(require("../../../../../common/wxcontext")), r = {
    querytopmsgs: function() {
        return new o.default(function(e, o) {
            t.getLoginPromise().then(function() {
                var t = "wxapp" == n.default.JD.device.scene || "weixin" == n.default.JD.device.scene ? 1 : 2;
                a.request.get({
                    url: "https://wq.jd.com/topmsg/querytopmsgs",
                    data: {
                        channel: t,
                        preview: 1
                    },
                    ump: {
                        key: "wq.webmonitor.mjgj.toutiao.querybimsgs.xcx",
                        bizId: "743",
                        opId: "5",
                        errBizId: "802",
                        errOpId: "89",
                        reportHook: function(e) {
                            return {
                                code: e.iRet
                            };
                        }
                    },
                    dataType: n.default.isXCX ? "" : "jsonp"
                }).then(function(t) {
                    var a = t.body;
                    0 == a.iRet ? e(a) : o("iRet=:" + a.iRet);
                }).catch(function(e) {
                    o(e);
                });
            }).catch(function(e) {
                o(e);
            });
        });
    },
    getPpmsGiftConfig: function() {
        return new o.default(function(e, t) {
            a.request.get({
                url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33864.jsonp",
                ump: {
                    key: "wq.webmonitor.mjgj.toutiao.getGiftPpms.xcx",
                    bizId: "743",
                    opId: "6",
                    errBizId: "743",
                    errOpId: "15",
                    reportHook: function(e) {
                        return e && e.data && e.data[0] && e.data[0].headline ? {
                            code: 0
                        } : {
                            code: 666,
                            message: "get ppms gifts failed"
                        };
                    }
                },
                dataType: n.default.isXCX ? "" : "jsonp",
                jsonpCallback: "showPageData33864"
            }).then(function(t) {
                var o = t.body || t;
                e(o.data && o.data[0] && o.data[0].headline ? o.data[0].headline : []);
            }).catch(function(t) {
                e([]);
            });
        });
    },
    getToutiaoGrayConfig: function() {
        return new o.default(function(e, t) {
            a.request.get({
                url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev34458.jsonp",
                ump: {
                    key: "wq.webmonitor.mjgj.toutiao.getToutiaoGrayConfig.xcx",
                    bizId: "743",
                    opId: "7",
                    errBizId: "743",
                    errOpId: "16",
                    reportHook: function(e) {
                        return e && e.data ? {
                            code: 0
                        } : {
                            code: 666,
                            message: "get toutiao Gray ppms failed"
                        };
                    }
                },
                dataType: n.default.isXCX ? "" : "jsonp",
                jsonpCallback: "showPageData34458"
            }).then(function(t) {
                var o = t.body || t;
                e(o.data ? o.data : []);
            }).catch(function(e) {
                var o = e.code, a = e.message;
                t("getToutiaoGrayConfig,code:" + o + ",message:" + a);
            });
        });
    },
    getToutiaoScrollNumbe: function() {
        return new o.default(function(e, t) {
            a.request.get({
                url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev34592.jsonp",
                ump: {
                    key: "wq.webmonitor.mjgj.toutiao.getToutiaoScrollNum.xcx",
                    bizId: "743",
                    opId: "8",
                    errBizId: "743",
                    errOpId: "17",
                    reportHook: function(e) {
                        return e && e.data && e.data[0] ? {
                            code: 0
                        } : {
                            code: 666,
                            message: "get toutiao scroll num failed"
                        };
                    }
                },
                dataType: n.default.isXCX ? "" : "jsonp",
                jsonpCallback: "showPageData34592"
            }).then(function(t) {
                var o = t.body || t;
                e(o.data && o.data[0] ? o.data[0] : {});
            }).catch(function(t) {
                e({});
            });
        });
    }
};

exports.default = r;