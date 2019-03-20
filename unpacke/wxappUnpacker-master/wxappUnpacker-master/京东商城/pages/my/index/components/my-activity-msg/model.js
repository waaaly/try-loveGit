function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = t(require("../../../../../libs/promise.min")), o = e(require("../../../../../common/login/loginv1")), r = e(require("../../../../../common/request/request")), c = t(require("../../../../../common/wxcontext")), u = e(require("../../../common/js/utils")).getEnv();

exports.default = {
    queryUserActMsgs: function e() {
        return new n.default(function(t, n) {
            o.getLoginPromise().then(function() {
                r.get({
                    url: "https://wq.jd.com/user/info/QueryUserActMsgs",
                    data: {
                        sceneval: 3 == u ? 2 : "",
                        channel: [ "wxapp", "wx", "sq", "m" ][u]
                    },
                    ump: {
                        bizId: "903",
                        opId: "23",
                        errBizId: "903",
                        errOpId: "24",
                        reportHook: function(e) {
                            return [ 0, 13, 102 ].indexOf(e.errcode) > -1 ? {
                                code: 0
                            } : {
                                code: e.errcode,
                                message: e.msg
                            };
                        }
                    },
                    dataType: c.default.isXCX ? "" : "jsonp",
                    jsonpCallback: "QueryUserActMsgs"
                }).then(function(r) {
                    var c = r.body;
                    0 == c.errcode ? t(c) : 13 == c.errcode ? o.doLogin().then(function() {
                        t(e());
                    }).catch(function(e, t) {
                        n(t || "登录出错，请稍后再试");
                    }) : n(c.msg || "请求数据出错，请稍后再试");
                }).catch(function(e) {
                    n("网络出错，请稍后再试");
                });
            }).catch(function(e, t) {
                n(t || "登录出错，请稍后再试");
            });
        });
    },
    getActMsgConfig: function() {
        return new n.default(function(e, t) {
            r.get({
                url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev35336.jsonp",
                ump: {
                    bizId: "903",
                    opId: "25",
                    errBizId: "903",
                    errOpId: "26",
                    reportHook: function(e) {
                        return e && e.data && e.data[0] ? {
                            code: 0
                        } : {
                            code: 1,
                            message: "ppms config 配置不全"
                        };
                    }
                },
                dataType: c.default.isXCX ? "" : "jsonp",
                jsonpCallback: "showPageData35336"
            }).then(function(t) {
                var n = t.body, o = (t.header, n.data || []);
                e(o);
            }).catch(function(e) {
                e.code, e.message, t();
            });
        });
    }
};