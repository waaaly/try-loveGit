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
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../../common/login/loginv1.js")), r = e(require("../../libs/promise.min.js")), o = require("../../common/request/request.js"), n = e(require("../../common/wxcontext")), u = {
    sharereport: function(e) {
        return new r.default(function(r, u) {
            t.getLoginPromise().then(function(t) {
                o.request.get({
                    url: "https://wq.jd.com/activetmp/helpdraw/sharereport",
                    data: e,
                    dataType: n.default.isXCX ? "" : "jsonp",
                    jsonpCallback: n.default.isXCX ? "sharereport" : ""
                }).then(function(e) {
                    var t = e.body;
                    e.header;
                    0 == t.ret ? r(t) : u({
                        code: t.ret
                    });
                }).catch(function(e) {
                    var t = e.code, r = e.message;
                    u({
                        code: t,
                        message: r
                    });
                });
            }).catch(function(e) {
                u(e);
            });
        });
    },
    setFormId: function(e) {
        return new r.default(function(n, u) {
            t.getLoginPromise().then(function() {
                (0, o.request)({
                    url: "https://wq.jd.com/user/info/AddFormIdInfo",
                    data: {
                        formId: e,
                        appId: getApp().appId,
                        businessType: "1",
                        callback: "jsonpCBKB"
                    }
                }).then(function(e) {
                    n(e.body && e.body.errcode);
                }).catch(function(e) {
                    var t = e.code, o = e.message;
                    return r.default.reject({
                        code: t,
                        message: o
                    });
                });
            }).catch(function(e, t) {
                return r.default.reject({
                    errcode: e,
                    errMsg: t
                });
            });
        });
    }
};

exports.default = u;