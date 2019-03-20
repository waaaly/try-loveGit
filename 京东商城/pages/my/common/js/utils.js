function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.mSiteReport = exports.getServerTime = exports.throttle = exports.isValidUrl = exports.unique = exports.addPromiseFinally = exports.delObjUndefinedKey = exports.batchThrottle = exports.getEnv = exports.getCurDatePpms = exports.getShowNum = exports.toTenThousands = exports.toThousands = void 0;

var t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../../../../common/request/request")), r = e(require("../../../../common/wxcontext")), n = e(require("../../../../libs/promise.min")), o = function(e, t) {
    var r = 0;
    return function() {
        var n = Date.now();
        if (!(n - r < t)) return r = n, e.apply(this, arguments);
    };
}, i = function() {
    n.default.prototype.finally = function(e) {
        var t = this.constructor;
        return this.then(function(r) {
            return t.resolve(e(r));
        }, function(r) {
            return t.resolve(e(r));
        });
    };
};

i();

var a = 0;

t.get({
    url: "https://wq.jd.com/mcoss/servertime/getservertime",
    dataType: r.default.isXCX ? "" : "jsonp",
    data: {
        call_back: "cb"
    }
}).then(function(e) {
    var t = e.body;
    0 == t.errCode && t.data && t.data.length && (a = new Date(t.data[0].serverTime) - Date.now());
});

exports.toThousands = function(e) {
    return e.indexOf(".") < 0 ? (e || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") : (e = parseFloat(e.replace(/(\.\d{3})\d+$/, "$1")).toFixed(2).toString().split("."), 
    e[0] = e[0].replace(new RegExp("(\\d)(?=(\\d{3})+$)", "ig"), "$1"), 0 == e[0] ? "0" : e.join("."));
}, exports.toTenThousands = function(e) {
    return (parseFloat(e) / 1e4).toString().split(".")[0] + "万" + (parseFloat(e) % 1e4 == 0 ? "" : "+");
}, exports.getShowNum = function(e) {
    for (var t = 0, r = 0; r < e.length; r++) if (Object.keys(e[r]).indexOf("balance_audit") > -1) {
        t = (t = parseFloat(e[r].balance_audit).toFixed(4)) < 0 ? "0" : t;
        break;
    }
    return t;
}, exports.getCurDatePpms = function(e, t, r) {
    return e.filter(function(e) {
        var n = new Date().getTime();
        if (n >= new Date(e.startTime).getTime() && n <= new Date(e.endTime).getTime()) return void 0 === t || e[t] == r;
    });
}, exports.getEnv = function() {
    var e = [ "wxapp", "weixin", "qq" ].findIndex(function(e) {
        return e == r.default.JD.device.scene;
    });
    return -1 == e ? 3 : e;
}, exports.batchThrottle = function(e, t) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3;
    e.forEach(function(e) {
        t[e] = o(t[e], r);
    });
}, exports.delObjUndefinedKey = function(e) {
    return Object.keys(e).forEach(function(t) {
        void 0 === e[t] && delete e[t];
    }), e;
}, exports.addPromiseFinally = i, exports.unique = function(e, t) {
    var r = {};
    return e.reduce(function(e, n) {
        return r[n[t]] || (r[n[t]] = !0, e.push(n)), e;
    }, []);
}, exports.isValidUrl = function(e) {
    return e.startsWith("/pages") || e.startsWith("http") || e.startsWith("//");
}, exports.throttle = o, exports.getServerTime = function() {
    return Date.now() + a;
}, exports.mSiteReport = function(e) {
    try {
        var t = e.eventId, r = e.eventParam, n = e.eventLevel, o = new MPing.inputs.Click(t);
        o.event_param = r, o.event_level = n, o.updateEventSeries(), new MPing().send(o);
    } catch (e) {
        console.error(e);
    }
};