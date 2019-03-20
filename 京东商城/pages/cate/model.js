function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function t(e) {
    var t = "mpjsmpv2_117" + (e ? "_" + e : "") + ".jsonp";
    return new d.default(function(r, n) {
        wx.$.request.get({
            url: "https://wq.360buyimg.com/data/coss/keyword/project/" + t,
            speedPointId: 2,
            ump: {
                bizId: 441,
                opId: 7
            },
            expire: "12h"
        }).then(function(t) {
            var o = t.body, a = t.handler, i = o.errCode, l = o.areaInfo, u = void 0 === l ? "" : l, c = o.keywordAreas, d = void 0 === c ? [] : c;
            0 == i ? (e || (console.log("[CATE] areaInfo: ", u), h = u), r(d[0] || {})) : ("function" == typeof a.clearCache && a.clearCache(), 
            n(s.genErrMsg("数据异常，请稍候再试", i)));
        }, function(e) {
            var t = e.code, r = e.message;
            n(s.genErrMsg(r, t));
        });
    });
}

function r() {
    var e = (0, v.getCookie)("visitkey");
    return e && ("" + e).substr(-1) >= 5 ? d.default.all([ t(), i(), l(297, 15) ]).then(function(e) {
        var t = e[0], r = e[1], n = e[2];
        return n && n.length ? ((t && t.level1words || []).forEach(function(e) {
            "热门搜索" == e.keyword && (e.level2words = n);
        }), {
            cateData: t,
            blockConfig: r
        }) : {
            cateData: t,
            blockConfig: r
        };
    }) : d.default.all([ t(), i() ]).then(function(e) {
        return {
            cateData: e[0],
            blockConfig: e[1]
        };
    });
}

function n() {
    h.split(";").forEach(function(e, t) {
        var r = e.split(":"), n = c(r, 2), o = n[0], a = n[1], i = "7458.2." + (1 + ~~t);
        o && a && 1923 != o && !new RegExp("\\b" + o + "\\b").test(y.areaId) && p.push({
            areaId: o,
            name: a,
            ptag: i
        });
    }), console.log("[CATE] tabEntries: ", p);
}

function o(e) {
    var t = e, r = p.findIndex(function(t) {
        return t.areaId == e.areaId;
    });
    if (t.level1words_1 = [], t.level1words_2 = [], t.level1words = t.level1words.filter(function(e, t) {
        return e.ptag = "7458.10+x.y".replace(/\..*/, "." + (1 + ~~r + 10) + "." + (1 + ~~t)), 
        e.level2words || (e.level2words = []), e.level2words = e.level2words.filter(function(e) {
            if (e.keywordId && new RegExp("\\b" + e.keywordId + "\\b").test(y.keywordId)) return !1;
            if (e.url) {
                var t = e.url.match(/\bkey=([^&#]+)/i);
                if (t) try {
                    /catid_str,,/.test(t[1]) ? e.key = e.keyword : e.key = decodeURIComponent(t[1]);
                } catch (e) {
                    console.warn("decodeURIComponent error");
                }
                return e.key = e.key || e.keyword, e.imageUrl = s.getImg(e.imageUrl, 140), e.url = e.url, 
                !0;
            }
            return !1;
        }), e.level2words.length > 0;
    }), t.level1words.forEach(function(e) {
        if (4 == e.pattern) {
            var r = String(+new Date());
            (r = r.substring(0, r.length - 3)) >= e.patternStartTime && r < e.patternEndTime && t.level1words_2.push(e);
        } else t.level1words_1.push(e);
    }), t.extInfo2) {
        var n = t.extInfo2.split("|"), o = c(n, 3), a = o[0], i = o[1], l = o[2];
        a && l && (t.channelInfo = {
            name: a,
            url: u(l, i)
        });
    }
    return delete t.extInfo2, delete t.level1words, t;
}

function a(e) {
    var t = {};
    if (!e || !e.length) return t;
    var r = !0, n = !1, o = void 0;
    try {
        for (var a, i = e[Symbol.iterator](); !(r = (a = i.next()).done); r = !0) {
            var l = a.value;
            if (l && l.groupid) {
                var u = {};
                t[l.groupid] = u;
                var c = l.locations;
                if (c && c.length) {
                    var d = !0, s = !1, f = void 0;
                    try {
                        for (var v, p = c[Symbol.iterator](); !(d = (v = p.next()).done); d = !0) {
                            var g = v.value;
                            if (g) {
                                var h = g.plans;
                                h && h.length ? u[g.locationid] = h : u[g.locationid] = [];
                            }
                        }
                    } catch (e) {
                        s = !0, f = e;
                    } finally {
                        try {
                            !d && p.return && p.return();
                        } finally {
                            if (s) throw f;
                        }
                    }
                }
            }
        }
    } catch (e) {
        n = !0, o = e;
    } finally {
        try {
            !r && i.return && i.return();
        } finally {
            if (n) throw o;
        }
    }
    return t;
}

function i() {
    var e = getApp(), t = "", r = "";
    return e && 1019 != e.scene ? d.default.resolve({
        areaId: t,
        keywordId: r
    }) : new d.default(function(e, n) {
        f.getPPMS(34262, {
            expire: "1h"
        }).then(function(n) {
            console.log("[CATE] blockConfig: ", n && n[0]), n.forEach(function(e) {
                t += e.areaId + ",", r += e.keywordId + ",";
            }), e({
                areaId: t,
                keywordId: r
            });
        }).catch(function(n) {
            e({
                areaId: t,
                keywordId: r
            });
        });
    });
}

function l(e, t) {
    arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    var r = {
        projectid: e,
        total: t
    };
    return new d.default(function(e, t) {
        wx.$.request.get({
            url: "https://wqcoss.jd.com/mcoss/categoryentry/getentryv2",
            data: r,
            ump: {
                bizId: 441,
                opId: 41
            },
            expire: "1h"
        }).then(function(t) {
            var r = t.body, n = t.handler;
            if (0 == r.errcode) {
                var o = [];
                r.data.forEach(function(e, t) {
                    var r = e.list && e.list[0];
                    r && o.push({
                        keywordId: "" + e.id + t,
                        url: r.url || "",
                        keyword: e.martname,
                        imageUrl: r.img,
                        pps: r.pps
                    });
                }), e(o);
            } else "function" == typeof n.clearCache && n.clearCache(), e([]);
        }, function(t) {
            e([]);
        });
    });
}

function u(e, t) {
    var r = String(e);
    return t && (/ptag/i.test(r) || (/\?\w+/.test(r) ? r += "&ptag=" + t : r += "?ptag=" + t)), 
    r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getInitCateData = exports.addPtag = exports.getCpcData = exports.getData = void 0;

var c = function() {
    function e(e, t) {
        var r = [], n = !0, o = !1, a = void 0;
        try {
            for (var i, l = e[Symbol.iterator](); !(n = (i = l.next()).done) && (r.push(i.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            o = !0, a = e;
        } finally {
            try {
                !n && l.return && l.return();
            } finally {
                if (o) throw a;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), d = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/promise.min.js")), s = e(require("../../common/utils.js")), f = e(require("../../common/biz.js")), v = require("../../common/cookie-v2/cookie.js"), p = [], g = {}, h = void 0, y = void 0;

exports.getData = function(e) {
    return e ? g[e] ? d.default.resolve({
        cateData: g[e]
    }) : t(e).then(function(t) {
        return g[e] = o(t), {
            cateData: g[e]
        };
    }) : r().then(function(t) {
        return y = t.blockConfig, n(), e = t.cateData.areaId, g[e] = o(t.cateData), {
            tabEntries: p,
            cateData: g[e]
        };
    });
}, exports.getCpcData = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    return new d.default(function(n, o) {
        var i = e.join("|"), l = t.map(function(e) {
            return e + ":" + (r[e] || 1);
        }).join(",");
        wx.$.request.get({
            url: "https://wqcoss.jd.com/mcoss/focusbi/show_new",
            data: {
                gids: i,
                pcs: l
            }
        }).then(function(e) {
            var t = e.body;
            0 == t.errCode ? n(a(t.list || [])) : o({
                code: t.errCode,
                message: t.msg
            });
        }, function(e) {
            o(e);
        });
    });
}, exports.addPtag = u, exports.getInitCateData = r;