function e(e) {
    -415 != e.errCode && (e.errMsg = e.errMsg || "", e.errMsg = e.errMsg.replace(/[,|]/g, " ").replace(/(\r\n|\r|\n)+/g, " "), 
    e.errMsg = encodeURIComponent(e.errMsg));
    var o = r(e.url) || e.url;
    return [ 355, 1, ~~e.errCode, 0, encodeURIComponent(e.page || "unrealized"), encodeURIComponent(o), e.errMsg, encodeURIComponent(e.responseTime || NaN), encodeURIComponent(e.env) ].join("|");
}

function r(e) {
    var r = "[none]";
    if (e.match(/^https:\/\/[^\/]+\/([^?]*)/)) r = e.match(/^https:\/\/[^\/]+\/([\S]*)/)[1]; else if (e.match(/^\/[^\/]+\//)) {
        var o = e.split("/");
        o.shift(), o.shift(), r = o.join("/");
    } else r = "[raw]" + r;
    return r;
}

function o() {
    m || (m = getApp());
    var e = {};
    return e.brand = m.systemInfo.brand, e.model = m.systemInfo.model, e.SDKVersion = m.systemInfo.SDKVersion, 
    e.platform = m.systemInfo.platform, e.system = m.systemInfo.system, e.version = m.systemInfo.version, 
    e.appVersion = m.version, e.networkType = m.networkType, JSON.stringify(e);
}

function t(e) {
    var r = e.error, t = e.ump, s = e.cached;
    if (t && !s) {
        var n = t.bizId, i = t.opId, p = t.errBizId, l = t.errOpId, u = t.reportHook, d = void 0;
        if (!r && n && i && "json" == e.dataType) {
            var c = void 0, m = void 0;
            if ("function" == typeof u) {
                var h = u(e.body) || {};
                if (c = h.code, m = h.message, void 0 === c) return void console.warn("无效的 ump.reportHook! url: " + e.url);
            } else {
                if (g.some(function(r) {
                    if (void 0 !== e.body[r]) return c = e.body[r], !0;
                }), void 0 === c) return void console.warn("未找到可用的返回码字段，请使用 ump.reportHook！url:  + task.url");
                0 != c && f.some(function(r) {
                    if (void 0 !== e.body[r]) return m = e.body[r], !0;
                });
            }
            if (0 == c) d = [ n, i, 0, 0, "" ].join("|"); else {
                var y = "msg=" + (m || "").replace(/[,|\r\n]/g, " ") + "&url=" + encodeURIComponent(e.url) + "&version=" + getApp().version;
                d = [ n, i, ~~c, 0, y ].join("|");
            }
        } else r && p && l && (d = [ p, l, 1, 0, "code=" + (~~r.code || 1) + "&msg=" + r.message.replace(/[,|\r\n]/g, " ") + "&url=" + encodeURIComponent(e.url) + "&version=" + getApp().version ].join("|"));
        d && (v.logs.push(d), v.reportData());
    }
    if (r) {
        if (-415 == r.code) {
            var b = o(), M = "response content parse error. content: " + e.rawBody + "+" + r.message + "+" + b;
            return M = a.base64encode(encodeURIComponent(M)), {
                errCode: "-415",
                errMsg: M
            };
        }
        return {
            errCode: r.code,
            errMsg: r.message + (r.detail ? "(" + JSON.stringify(r.detail) + ")" : "")
        };
    }
}

function s(e) {
    var r = !0;
    return h.forEach(function(o) {
        e.match(o) && (r = !1);
    }), r;
}

function n() {
    var e = getCurrentPages();
    return e.length ? e[e.length - 1].route : "no page";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Report = void 0;

var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, p = require("../request/request.js"), a = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
    return r.default = e, r;
}(require("../base64/base64.js")), l = require("../global_config.js"), u = require("../login/login"), d = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/md5.js")), c = require("../fe_report/speed.js"), g = [ "errCode", "errcode", "retCode", "retcode", "ret", "errId", "iRet", "ret_code", "resultCode", "code" ], f = [ "errMsg", "errmsg", "retMsg", "retmsg", "msg" ], m = null, h = [ /biz\.json/, /log\.gif/, /fd\.3\.cn\/cesu/ ], v = {
    reportPromiseErr: !1,
    reportWsFailed: function(r) {
        var o = r.error, t = r.res, s = void 0, n = e({
            url: "http_ws",
            errCode: "-1",
            errMsg: ("websocket response parse failed, msg: " + o + ", response data: " + (s = "object" == (void 0 === t ? "undefined" : i(t)) ? JSON.stringify(t) : "" + t)).replace(/(\r\n|\r|\n)+/g, " "),
            responseTime: "-1",
            page: "http_ws",
            env: getApp().version
        });
        this.logs = this.logs || [], this.logs.push(n), this.reportData();
    },
    reportWsError: function(r) {
        var t = r.error, s = r.type;
        try {
            var p = o(), a = n(), l = void 0;
            l = "object" == (void 0 === t ? "undefined" : i(t)) ? JSON.stringify(t) : "" + t;
            var u = e({
                url: "http_ws",
                errCode: "-2",
                errMsg: ("timestamp: " + d.default.hexMD5(Date.now() + Math.random() + "") + "+" + l + "+" + s + "+" + p + "+" + a).replace(/(\r\n|\r|\n)+/g, " "),
                responseTime: "-1",
                page: "http_ws",
                env: getApp().version
            });
            this.logs = this.logs || [], this.logs.push(u), this.reportData();
        } catch (e) {
            console.error(e);
        }
    },
    report: function(r) {
        var o = this;
        if (this.logs = this.logs || [], r.responseList && r.responseList.length && r.responseList.forEach(function(r) {
            var s = t(r);
            if (s) {
                var i = e({
                    url: r.url,
                    errCode: s.errCode,
                    errMsg: s.errMsg,
                    responseTime: r.responseTime - r.requestTime,
                    page: n(),
                    env: getApp().version
                });
                o.logs.push(i);
            }
        }), s(r.url)) {
            var i = t(r);
            if (!i) return;
            var p = e({
                url: r.url,
                errCode: i.errCode,
                errMsg: i.errMsg,
                responseTime: r.responseTime - r.requestTime,
                page: n(),
                env: getApp().version
            });
            this.logs.push(p);
        }
        this.logs.length && this.reportData();
    },
    reportData: function() {
        var e = this;
        this.logs = this.logs || [], this.logs.length && (clearTimeout(this.reportTimeout), 
        this.reportTimeout = setTimeout(function() {
            var r = {
                url: "https://wq.jd.com/webmonitor/collect/biz.json",
                priority: "REPORT",
                data: {
                    contents: e.logs.join(","),
                    t: Math.random() + ""
                }
            };
            e.logs = [], p.request.post(r).then(function(e) {}).catch(function(e) {});
        }, 1e3));
    },
    reportSpeed: function(e) {
        var r = e.speedPageId, o = e.speedPointId, t = e.speedSamplingRate, s = void 0 === t ? .1 : t;
        if (e.speed.end = Date.now(), (r || o) && e.speed && !e.cached && !e.responseList.length) {
            var n = e.speed, i = n.start, p = n.httpPush, a = n.httpReq, l = n.httpReqSucc, u = n.jsonParse, d = n.wsPush, g = n.wsRequest, f = n.wsSendMsg, m = n.wsOnMsg, h = n.end, v = {};
            if (Math.random() < s) {
                if (o) return v["s" + o] = h - i, c.Speed.reportAlone(1246, v), void console.log("接口测速上报：", JSON.stringify(v));
                "http" == e.channel && l ? v = {
                    s3: p - i,
                    s4: a - i,
                    s5: l - i,
                    s6: h - i
                } : "socket" == e.channel && m && (v = {
                    s11: d - i,
                    s12: g - i,
                    s13: f - i,
                    s14: m - i,
                    s15: h - i
                }), void 0 !== u && (v.s1 = u), c.Speed.reportAlone(r, v), console.log("接口详细测速上报：", JSON.stringify(v));
            }
        }
    },
    reportConnectTime: function(e) {
        Math.random() > .2 || (c.Speed.reportAlone(1246, {
            s4: e
        }), console.log("WS 连接耗时上报：", e));
    },
    reportHttp: function(e) {
        if (-1 == e.indexOf("/webmonitor/collect/biz.json")) {
            var r = [ 777, 103, 1, 0, e ].join("|");
            this.logs = this.logs || [], this.logs.push(r), this.reportData(), console.log("[Request] HTTP 请求量上报", e);
        }
    }
};

(0, u.getLoginPromise)().then(function() {
    return (0, l.globalConfigGet)("promise");
}).then(function(e) {
    v.reportPromiseErr = !!+(e.default && e.default.promiseErrReport || 0);
}), wx.JDReport = v, exports.Report = v;