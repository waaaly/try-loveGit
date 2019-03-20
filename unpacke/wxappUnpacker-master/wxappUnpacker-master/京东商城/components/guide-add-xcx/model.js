Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}(require("../../common/login/login.js")), t = require("../../common/request/request.js"), o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/promise.min"));

exports.default = {
    QueryScene: function() {
        return new o.default(function(o, r) {
            e.getLoginPromise().then(function() {
                t.request.get({
                    url: "https://wq.jd.com/visit/QueryScene",
                    data: {},
                    ump: {
                        key: "wq.webmonitor.mjgj.addXcx.QueryScene.xcx",
                        bizId: "985",
                        opId: "2",
                        errBizId: "985",
                        errOpId: "3",
                        reportHook: function(e) {
                            return [ 0, 13 ].indexOf(e.retcode) >= 0 ? {
                                code: 0
                            } : {
                                code: e.retcode,
                                message: e.msg
                            };
                        }
                    }
                }).then(function(e) {
                    var t = e.body;
                    0 == t.retcode ? o(t) : 13 != t.retcode && r("code:" + t.retcode + " msg:" + t.msg);
                }).catch(function(e) {
                    r(e);
                });
            }).catch(function(e) {
                r(e);
            });
        });
    },
    ReportEnterScene: function(r) {
        return new o.default(function(o, n) {
            e.getLoginPromise().then(function() {
                t.request.get({
                    url: "https://wq.jd.com/visit/ReportEnterScene",
                    data: {
                        sceneid: r
                    },
                    ump: {
                        key: "wq.webmonitor.mjgj.addXcx.ReportEnterScene.xcx",
                        bizId: "985",
                        opId: "4",
                        errBizId: "985",
                        errOpId: "5",
                        reportHook: function(e) {
                            return [ 0, 13 ].indexOf(e.retcode) >= 0 ? {
                                code: 0
                            } : {
                                code: e.retcode,
                                message: e.msg
                            };
                        }
                    }
                }).then(function(e) {
                    var t = e.body;
                    0 == t.retcode ? o(t) : 13 != t.retcode && n("code:" + t.retcode + " msg:" + t.msg);
                }).catch(function(e) {
                    n(e);
                });
            }).catch(function(e) {
                n(e);
            });
        });
    },
    ReportClick: function() {
        return new o.default(function(o, r) {
            e.getLoginPromise().then(function() {
                t.request.get({
                    url: "https://wq.jd.com/visit/ReportClick",
                    data: {},
                    ump: {
                        key: "wq.webmonitor.mjgj.addXcx.ReportClick.xcx",
                        bizId: "985",
                        opId: "6",
                        errBizId: "985",
                        errOpId: "7",
                        reportHook: function(e) {
                            return [ 0, 13 ].indexOf(e.retcode) >= 0 ? {
                                code: 0
                            } : {
                                code: e.retcode,
                                message: e.msg
                            };
                        }
                    }
                }).then(function(e) {
                    var t = e.body;
                    0 == t.retcode ? o(t) : 13 != t.retcode && r("code:" + t.retcode + " msg:" + t.msg);
                }).catch(function(e) {
                    r(e);
                });
            }).catch(function(e) {
                r(e);
            });
        });
    }
};