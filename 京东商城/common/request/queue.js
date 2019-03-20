function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PRIORITY = exports.Queue = void 0;

var r = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(r, t, o) {
        return t && e(r.prototype, t), o && e(r, o), r;
    };
}(), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/async.min.js")), o = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}(require("./util.js")), n = require("./error.js"), u = 8e3, a = {
    RETRY: 0,
    HIGH: 10,
    NORMAL: 20,
    REPORT: 30
}, i = function() {
    function i(r) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5;
        arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        e(this, i), this._request = r, this._queue = t.default.priorityQueue(this.worker.bind(this), o);
    }
    return r(i, [ {
        key: "push",
        value: function(e, r, t) {
            return e.uniKey && this._queue.remove(this.testUniKey(e.uniKey)), t = t || e.priority || "NORMAL", 
            t = a[t] || a.NORMAL, this._queue.push(e, t, this.callback(e, r));
        }
    }, {
        key: "worker",
        value: function(e, r) {
            e.requestTime = Date.now(), t.default.timeout(this._request, e.timeout || u)(e, r);
        }
    }, {
        key: "callback",
        value: function(e, r) {
            var t = this;
            return function(o) {
                var u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                e.responseTime = Date.now();
                var a = u.code, i = u.body, s = u.header;
                if (e.code = a, e.rawBody = i, e.resHeader = s, !o) {
                    var c = t.formatBody(e);
                    return e.body = c, r(e.error, e, {
                        code: a,
                        body: c,
                        header: s
                    });
                }
                if ("ETIMEDOUT" == o.code && (o = new n.JDError({
                    code: n.JDError.NETWORK.TIMEOUT_ERROR.code,
                    message: n.JDError.NETWORK.TIMEOUT_ERROR.message,
                    detail: o.code
                })), e.responseList.push({
                    url: e.url,
                    code: a,
                    rawBody: e.rawBody,
                    resHeader: e.resHeader,
                    requestTime: e.requestTime,
                    responseTime: e.responseTime,
                    channel: e.channel,
                    error: o
                }), 302 == a && s && s.Location && /jd\.com\//.test(s.Location)) {
                    e.referrer = e.url;
                    var d = s.Location.trim().replace(/^(http:)?\/\//, "https://");
                    return e.url = d, t.push(e, r, "RETRY");
                }
                if ("REPORT" !== e.priority) {
                    if (o.code != n.JDError.NETWORK.CONNECT_ERROR.code && o.code != n.JDError.NETWORK.GATEWAY_ERROR.code || (e.retryNum = 0), 
                    e.retryNum) return e.retryNum -= 1, t.push(e, r, "RETRY");
                    if (e.exchangeFlag) return e.exchangeFlag = !1, e.exchangeFn(e);
                } else if (e.exchangeFlag) return e.exchangeFlag = !1, e.exchangeFn(e);
                return e.responseList.pop(), e.error = o, r(o, e);
            };
        }
    }, {
        key: "testUniKey",
        value: function(e) {
            return function(r) {
                var t = r.data;
                r.priority;
                return t.uniKey == e;
            };
        }
    }, {
        key: "formatBody",
        value: function(e) {
            switch (e.dataType) {
              case "json":
                "string" != typeof e.rawBody || e.rawBody.trim() || (e.rawBody = "{}"), -1 != e.url.indexOf("/recovery") && "string" == typeof e.rawBody && (e.rawBody = e.rawBody.replace(/<!--recovery.*?-->/, ""));
                var r = o.formatJSON(e.rawBody), t = r.error, u = r.data, a = r.timeSpent;
                return void 0 !== a && (e.speed.jsonParse = a), t ? void (e.error = new n.JDError({
                    code: n.JDError.JSON_ERROR.code,
                    message: n.JDError.JSON_ERROR.message,
                    detail: t
                })) : u;

              case "text":
              default:
                return e.rawBody;
            }
        }
    }, {
        key: "workers",
        get: function() {
            return this._queue.workersList();
        }
    } ]), i;
}();

exports.Queue = i, exports.PRIORITY = a;