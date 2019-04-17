function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        var r = [], n = !0, a = !1, i = void 0;
        try {
            for (var o, u = e[Symbol.iterator](); !(n = (o = u.next()).done) && (r.push(o.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            a = !0, i = e;
        } finally {
            try {
                !n && u.return && u.return();
            } finally {
                if (a) throw i;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), r = e(require("./config")), n = e(require("./ApiCreater")), a = e(require("./user")), i = function(e) {
    return new Promise(function(t, r) {
        wx.requestPayment(Object.assign(e, {
            success: function() {
                return t(e.package);
            },
            fail: r
        }));
    });
};

exports.default = function(e) {
    return (0, n.default)({
        url: "/bos/v1/users/" + a.default.id + "/orders/" + e + "/transactions/wechat_app",
        method: "POST",
        header: {
            cookie: "SID=" + a.default.SID
        },
        data: {
            wx_appid: r.default.appid,
            open_id: a.default.open_id
        }
    }, {
        orderId: e
    }).then(function(e) {
        var r = JSON.parse(e.data.trans_info), n = {};
        decodeURIComponent(r.payData.WEIXIN_PAY).split("&").forEach(function(e) {
            var r = e.split("="), a = t(r, 3), i = a[0], o = a[1], u = a[2];
            2 === r.length ? n[i] = o : n[i] = o + "=" + u;
        });
        var a = n.timeStamp, o = n.nonceStr, u = n.signType, c = n.paySign;
        return i({
            timeStamp: a,
            nonceStr: o,
            package: n.package,
            signType: u,
            paySign: c
        });
    });
};