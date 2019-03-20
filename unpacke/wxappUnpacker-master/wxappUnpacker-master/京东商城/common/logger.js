function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
    }
    return Array.from(e);
}

function n(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Logger = void 0;

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), l = e(require("../libs/promise.min.js")), i = e(require("./cookie-v2/cookie.js")), a = require("./request/request.js"), u = {}, s = {}, c = [], f = 0, p = !1, d = function() {
    function e() {
        n(this, e);
    }
    return r(e, null, [ {
        key: "between",
        value: function(e, t, n) {
            return t <= e && e <= n;
        }
    }, {
        key: "buildParams",
        value: function(e) {
            return Object.keys(e).map(function(t) {
                var n = null == e[t] ? "" : e[t];
                return n instanceof Array ? n.map(function(e) {
                    return encodeURIComponent(t) + "=" + encodeURIComponent(e);
                }).join("&") : encodeURIComponent(t) + "=" + encodeURIComponent(n);
            }).join("&");
        }
    } ]), e;
}(), v = function() {
    function e() {
        n(this, e);
    }
    return r(e, null, [ {
        key: "init",
        value: function(t) {
            e.getConfig().then(function(n) {
                p = !0;
                var o = i.default.getCookie("jdpin"), r = [];
                if (n) {
                    if (Object.keys(s).length > 0) for (var l in s) if (Object.keys(s[l]).length > 0) for (var a in s[l]) e.isCanReport(o, l, y.levels[a]) && (r = r.concat(s[l][a]));
                    r.length > 0 && (e.report(r.concat([])), r = []), e.start(t);
                }
                s = {}, f = 0;
            });
        }
    }, {
        key: "start",
        value: function(t) {
            if (!e.intervalId) {
                t && isNaN(t);
                e.intervalId = setInterval(function() {
                    c.length > 0 && (e.report(c.concat([])), c = []);
                }, t);
            }
        }
    }, {
        key: "stop",
        value: function() {
            e.intervalId && (clearInterval(e.intervalId), e.intervalId = null);
        }
    }, {
        key: "report",
        value: function(e) {
            return new l.default(function(t, n) {
                a.request.get({
                    url: "https://wq.jd.com/visit/addlog",
                    data: {
                        id: new Date().getTime(),
                        log: e
                    },
                    header: {
                        "Content-Type": "text/plain;charset=UTF-8"
                    }
                }).then(function(e) {
                    var o = e.body;
                    e.header;
                    0 == o.retcode ? t(!0, o.msg) : n(!1, o.msg);
                }, function(e) {
                    var t = e.code, o = e.message;
                    n(!1, "上报失败: code:" + t + " msg: " + o);
                });
            });
        }
    }, {
        key: "getConfig",
        value: function() {
            return new l.default(function(e, t) {
                a.request.get({
                    url: "https://wqs.jd.com/sinclude/update/wx/2017/8/logConfig.html"
                }).then(function(t) {
                    var n = t.body;
                    t.header;
                    if (n.length > 0) {
                        u.enable = "true" == n[0].enable;
                        for (var o = 0; o < n[0].list.length; o++) {
                            var r = n[0].list[o];
                            u[r.jdpin] = {
                                enable: "true" == r.enable
                            }, u[r.jdpin].noModuleCfg = 0 == r.modulesConfig.length;
                            for (var l = 0; l < r.modulesConfig.length; l++) {
                                var i = r.modulesConfig[l];
                                u[r.jdpin][i.moduleName] = {
                                    level: i.level,
                                    startTime: i.startTime,
                                    endTime: i.endTime
                                };
                            }
                        }
                        e(!0);
                    } else e(!1);
                }, function(t) {
                    t.code, t.message;
                    e(!1);
                });
            });
        }
    }, {
        key: "isCanReport",
        value: function(e, t, n) {
            if (!u.enable || !e || !t || n == y.levels.OFF) return !1;
            if (u[e] && u[e].enable) {
                if (u[e].noModuleCfg) return !0;
                var o = u[e][t] ? u[e][t] : null;
                if (o) {
                    var r = o.startTime ? new Date(o.startTime) : null, l = o.endTime ? new Date(o.endTime) : null, i = Date.now();
                    if ((!r && l > i || !l && r < i || r && l && d.between(i, r, l)) && o.level <= n) return !0;
                }
            }
            return !1;
        }
    } ]), e;
}(), y = function() {
    function e(t) {
        n(this, e), this.moduleName = t || "_default";
    }
    return r(e, [ {
        key: "_formatPre",
        value: function(e, t) {
            var n = new Date(), o = n.toLocaleDateString() + " " + n.toTimeString().split(" ")[0] + " " + n.getMilliseconds();
            return "[" + (this.moduleName || "") + "]<" + o + ">(" + e + ")(" + t + ") ";
        }
    }, {
        key: "_printAndReport",
        value: function(n) {
            var r = arguments;
            try {
                for (var l = __wxConfig || {}, a = n.toUpperCase(), u = new Error().stack.split("\n")[3], d = u.substring(u.indexOf("http")).replace(")", ""), y = this._formatPre(a, d), g = "", m = 0; m < arguments.length; m++) arguments[m] != n && ("object" == o(arguments[m]) ? function() {
                    var e = [];
                    g += JSON.stringify(r[m], function(t, n) {
                        if ("object" === (void 0 === n ? "undefined" : o(n)) && null !== n) {
                            if (-1 !== e.indexOf(n)) return;
                            e.push(n);
                        }
                        return n;
                    }), e = null;
                }() : g += arguments[m]);
                if (g = y + g, l.debug && e.globalLogLevel <= e.levels[a]) {
                    var h;
                    console[n](">>>>>" + y), (h = console)[n].apply(h, t(Array.prototype.slice.call(arguments, 1)));
                }
                p ? v.isCanReport(i.default.getCookie("jdpin"), this.moduleName, e.levels[a]) && (c.join("").length + g.length > 1048576 && (v.report(c.concat([])), 
                c = []), c.push(g)) : (f + g.length > 1048576 ? (s = {}, f = 0) : f += g.length, 
                s[this.moduleName] || (s[this.moduleName] = {}), s[this.moduleName][a] || (s[this.moduleName][a] = []), 
                s[this.moduleName][a].push(g));
            } catch (e) {
                console.error("logger.js _printAndReport method error: " + e);
            }
        }
    }, {
        key: "debug",
        value: function() {
            this._printAndReport.apply(this, [ "debug" ].concat(Array.prototype.slice.call(arguments)));
        }
    }, {
        key: "log",
        value: function() {
            this._printAndReport.apply(this, [ "log" ].concat(Array.prototype.slice.call(arguments)));
        }
    }, {
        key: "info",
        value: function() {
            this._printAndReport.apply(this, [ "info" ].concat(Array.prototype.slice.call(arguments)));
        }
    }, {
        key: "warn",
        value: function() {
            this._printAndReport.apply(this, [ "warn" ].concat(Array.prototype.slice.call(arguments)));
        }
    }, {
        key: "error",
        value: function() {
            this._printAndReport.apply(this, [ "error" ].concat(Array.prototype.slice.call(arguments)));
        }
    } ], [ {
        key: "setGlobalLogLevel",
        value: function(t) {
            t && t >= e.levels.ALL && t <= e.levels.OFF && (e.globalLogLevel = t);
        }
    }, {
        key: "startReport",
        value: function(e) {
            v.start(e);
        }
    }, {
        key: "stopReport",
        value: function() {
            v.stop();
        }
    } ]), e;
}();

y.levels = {
    ALL: 0,
    DEBUG: 1,
    LOG: 2,
    INFO: 3,
    WARN: 4,
    ERROR: 5,
    OFF: 6
}, y.globalLogLevel = y.levels.ALL, v.init(3e3), exports.Logger = y;