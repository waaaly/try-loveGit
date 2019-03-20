function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Socket = void 0;

var r = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/promise.min.js")), s = require("./queue.js"), o = e(require("./url.js")), i = require("./error.js"), a = e(require("../../common/utils")), c = {
    CLOSED: "CLOSED",
    CONNECTING: "CONNECTING",
    ACTIVE: "ACTIVE",
    RECONNECTING: "RECONNECTING"
}, u = !0, l = 1, E = void 0, h = function e(r) {
    t(this, e);
    var n = r.id, s = r.socket_uri, o = r.encoding, i = r.data, a = r.header, c = r.method, u = r.referer;
    return {
        TYPE: "GBK" == o ? 2 : 1,
        REQID: n,
        URI: s,
        METHOD: c || "GET",
        HEADER: Object.assign({
            referer: u
        }, a),
        BODY: i || ""
    };
}, d = function() {
    function e() {
        t(this, e);
    }
    return r(e, null, [ {
        key: "init",
        value: function() {
            this.queue = new s.Queue(this.request.bind(this), 1e3), this.setStatus(c.CLOSED), 
            this.requestList = {}, wx.onSocketOpen(this.onOpen.bind(this)), wx.onSocketMessage(this.onMessage.bind(this)), 
            wx.onSocketClose(this.onClose.bind(this)), wx.onSocketError(this.onError.bind(this)), 
            this.reConnect = a.throttle(this.reConnect.bind(this), 500);
        }
    }, {
        key: "request",
        value: function(e, t) {
            var r = this;
            if (e.speed.wsRequest || (e.speed.wsRequest = Date.now()), e.socket_uri = o.toSocketURI(e.url), 
            this.requestList[e.id] = {
                data: e,
                callback: t
            }, this.status !== c.ACTIVE) return this.connect();
            var n = new h(e);
            e.speed.wsSendMsg = Date.now(), wx.sendSocketMessage({
                data: JSON.stringify(n),
                fail: function(n) {
                    var s = JSON.stringify(n);
                    if (/not connected/.test(s) || /taskID not exist/.test(s) || /socket is closed/.test(s) || /webSocket is closed/.test(s) || /webSocket is not open/.test(s)) return r.reConnect("SOCKET_SEND_MSG_ERROR");
                    r.setStatus(c.CLOSED), delete r.requestList[e.id];
                    var o = new i.JDError({
                        code: i.JDError.NETWORK.SEND_MSG_ERROR.code,
                        message: i.JDError.NETWORK.SEND_MSG_ERROR.message,
                        detail: n
                    });
                    return t(o);
                }
            });
        }
    }, {
        key: "push",
        value: function(e) {
            e.channel = "socket", e.speed.wsPush = Date.now(), this.queue.push(e, this.handler.bind(this));
        }
    }, {
        key: "connect",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wss://wxa.jd.com/ws";
            if (this.status === c.CLOSED) return clearTimeout(this.pingTimer), clearTimeout(this.pongTimer), 
            this.setStatus(u ? c.CONNECTING : c.RECONNECTING), u = !1, this._promise = new n.default(function(r, n) {
                E = Date.now(), wx.connectSocket({
                    url: t,
                    success: function(e) {
                        r(e);
                    },
                    fail: function(t) {
                        if (/is connected/.test(JSON.stringify(t))) return e.setStatus(c.ACTIVE), r(t);
                        e.setStatus(c.CLOSED);
                        var s = {
                            code: i.JDError.NETWORK.CONNECT_ERROR.code,
                            message: i.JDError.NETWORK.CONNECT_ERROR.message,
                            detail: t
                        };
                        e.connectErrorHandler(s), e.exceptionReport("connect error", "SOCKET_CONNECT_ERROR"), 
                        n(t);
                    },
                    complete: function(e) {}
                });
            }), this._promise;
        }
    }, {
        key: "onOpen",
        value: function(e) {
            var t = this;
            E && wx.JDReport.reportConnectTime(Date.now() - E), l = 1, this.setStatus(c.ACTIVE);
            var r = Object.assign({}, this.requestList);
            this.requestList = {}, this.queue.workers.forEach(function(e) {
                var n = e.data, s = e.callback;
                r[n.id] && (s = r[n.id].callback, t.request(n, s));
            }), this.nextPing();
        }
    }, {
        key: "onMessage",
        value: function(e) {
            var t = void 0;
            try {
                "PONG" === e.data ? this.handlePongPacket() : t = JSON.parse(e.data);
            } catch (t) {
                return wx.JDReport.reportWsFailed({
                    error: t,
                    res: e
                }), console.log("socket data parse error", t);
            }
            if (t && this.requestList[t.REQID]) {
                var r = this.requestList[t.REQID], n = r.data, s = r.callback;
                n.speed.wsOnMsg = Date.now(), delete this.requestList[t.REQID];
                var o = {
                    body: t.BODY,
                    header: t.HEADER,
                    code: t.CODE
                };
                return 200 != t.CODE ? s(new i.JDError({
                    code: i.JDError.NETWORK.STATUS_CODE_ERROR.code,
                    message: i.JDError.NETWORK.STATUS_CODE_ERROR.message,
                    detail: t.CODE
                }), o) : s(null, o);
            }
        }
    }, {
        key: "onClose",
        value: function(e) {
            this.setStatus(c.CLOSED), console.log("socket close");
        }
    }, {
        key: "onError",
        value: function(e) {
            if (this.setStatus(c.CLOSED), l > 0) l--, this.reConnect("SOCKET_ON_ERROR"); else {
                var t = {
                    code: i.JDError.NETWORK.GATEWAY_ERROR.code,
                    message: i.JDError.NETWORK.GATEWAY_ERROR.message,
                    detail: e
                };
                this.connectErrorHandler(t);
            }
            this.exceptionReport(e, "SOCKET_ON_ERROR"), console.log("socket error: ", e);
        }
    }, {
        key: "handler",
        value: function(e, t, r) {
            try {
                if (e) return t.callback(e, r);
                var n = r.body, s = r.header;
                return t.callback(null, {
                    body: n,
                    header: s
                });
            } catch (e) {
                console.warn("handler", e);
            }
        }
    }, {
        key: "connectErrorHandler",
        value: function(e) {
            this.queue.workers.forEach(function(t, r) {
                var n = new i.JDError(e);
                "function" == typeof r && r(n);
            }), this.exceptionReport(e.detail, "SOCKET_SWITCH_CHANNEL");
        }
    }, {
        key: "reConnect",
        value: function(e) {
            this.setStatus(c.CLOSED), wx.closeSocket(), clearTimeout(this.pingTimer), clearTimeout(this.pongTimer), 
            setTimeout(this.connect.bind(this), 1e3);
            this.exceptionReport("socket reconnect", e);
        }
    }, {
        key: "setStatus",
        value: function(e) {
            this.status !== e && (this.status = e);
        }
    }, {
        key: "handlePongPacket",
        value: function() {
            this.nextPing();
        }
    }, {
        key: "nextPing",
        value: function() {
            clearTimeout(this.pingTimer), clearTimeout(this.pongTimer);
        }
    }, {
        key: "ping",
        value: function() {
            wx.sendSocketMessage({
                data: "PING"
            }), this.pongTimer = setTimeout(this.handlePongTimeout.bind(this), 1e4);
        }
    }, {
        key: "handlePongTimeout",
        value: function() {
            this.reConnect("SOCKET_TIMEOUT");
        }
    }, {
        key: "reset",
        value: function() {
            var e = this;
            return new n.default(function(t, r) {
                clearTimeout(e.pingTimer), clearTimeout(e.pongTimer), e.setStatus(c.CLOSED), wx.closeSocket(), 
                setTimeout(t, 1e3);
            });
        }
    }, {
        key: "exceptionReport",
        value: function(e, t) {
            t && wx.JDReport.reportWsError({
                error: e,
                type: t
            });
        }
    } ]), e;
}();

d.init(), exports.Socket = d;