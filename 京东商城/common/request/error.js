function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function o(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = {
    DEFAULT_ERROR: {
        code: 1,
        message: "网络繁忙，请稍后再试"
    },
    TIMEOUT_ERROR: {
        code: -10,
        message: "您的网络有点慢"
    },
    CONNECT_ERROR: {
        code: -20,
        message: "网络连接发起失败"
    },
    STATUS_CODE_ERROR: {
        code: -30,
        message: "网络响应状态码异常"
    },
    REQUEST_ERROR: {
        code: -40,
        message: "网络请求发送失败"
    },
    GATEWAY_ERROR: {
        code: -50,
        message: "网络连接建立失败"
    },
    SEND_MSG_ERROR: {
        code: -424,
        message: "网络消息发送失败"
    }
}, s = {
    code: -415,
    message: "网络数据解析失败"
}, n = {
    code: -1024,
    message: "域名异常，请求无法完成"
}, R = function(s) {
    function n(o) {
        e(this, n), "string" == typeof o && (o = {
            message: o
        });
        var s = o, R = s.code, c = void 0 === R ? r.DEFAULT_ERROR.code : R, a = s.message, i = void 0 === a ? r.DEFAULT_ERROR.message : a, E = s.detail, O = void 0 === E ? "NETWORK ERROR" : E, p = t(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, i));
        return p.code = c, p.detail = O, p;
    }
    return o(n, Error), n;
}();

R.NETWORK = r, R.JSON_ERROR = s, R.SPECIAL_DOMAIN = n, exports.JDError = R, exports.NETWORK = r, 
exports.JSON_ERROR = s, exports.SPECIAL_DOMAIN = n;