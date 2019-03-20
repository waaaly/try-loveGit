function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.HTTP = void 0;

var r = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var n = r[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(r, t, n) {
        return t && e(r.prototype, t), n && e(r, n), r;
    };
}(), t = require("./queue.js"), n = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}(require("./url.js")), u = require("./error.js"), o = !1, a = function() {
    function a() {
        e(this, a);
    }
    return r(a, null, [ {
        key: "init",
        value: function() {
            this.queue = new t.Queue(this.request.bind(this), 10, 8500);
        }
    }, {
        key: "request",
        value: function(e, r) {
            var t = e.data, n = e.header, a = e.method, i = void 0 === a ? "GET" : a, s = e.dataType, l = void 0 === s ? "json" : s, c = e.priority, d = e.referer;
            o && "GBK" != e.encoding ? e.http_uri = e.url : e.http_uri = this.getURI(e), wx.JDReport && wx.JDReport.reportHttp(e.http_uri), 
            e.speed.httpReq = Date.now(), wx.request({
                url: e.http_uri,
                data: t,
                header: Object.assign({
                    wqreferer: d
                }, n),
                method: i,
                dataType: l,
                success: function(t) {
                    var n = t.data, o = t.statusCode, a = t.header;
                    e.speed.httpReqSucc = Date.now();
                    var i = {
                        code: o,
                        body: n,
                        header: a
                    };
                    if (200 !== o) {
                        var s = new u.JDError({
                            code: u.JDError.NETWORK.STATUS_CODE_ERROR.code,
                            message: u.JDError.NETWORK.STATUS_CODE_ERROR.message,
                            detail: o
                        });
                        return r(s, i);
                    }
                    return r(null, i);
                },
                fail: function(e) {
                    if ("REPORT" == c && /\bUTF-?8\b/i.test(e && e.errMsg)) return r(null, {
                        code: 200,
                        body: {},
                        header: n
                    });
                    var t = new u.JDError({
                        code: u.JDError.NETWORK.REQUEST_ERROR.code,
                        message: u.JDError.NETWORK.REQUEST_ERROR.message,
                        detail: e
                    });
                    return r(t);
                }
            });
        }
    }, {
        key: "push",
        value: function(e) {
            e.channel = "http", e.speed.httpPush = Date.now(), this.queue.push(e, this.getHandler.bind(this));
        }
    }, {
        key: "getHandler",
        value: function(e, r, t) {
            try {
                if (e) return r.callback(e, t);
                var n = t.body, u = t.header;
                return r.callback(null, {
                    body: n,
                    header: u
                });
            } catch (e) {
                console.warn("handler", e);
            }
        }
    }, {
        key: "getURI",
        value: function(e) {
            return n.toProxyURI(e.url, e.encoding);
        }
    }, {
        key: "setDebugMode",
        value: function() {
            o = !0, console.warn("[HTTP.setDebugMode] 启用HTTP 直连调试！");
        }
    } ]), a;
}();

a.init(), exports.HTTP = a;