function e(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}

function r(e, r, t) {
    return r in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}

function t(e) {
    if (Array.isArray(e)) {
        for (var r = 0, t = Array(e.length); r < e.length; r++) t[r] = e[r];
        return t;
    }
    return Array.from(e);
}

var n = require("../../../../bases/component.js"), a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../libs/promise.min.js")), o = e(require("../../../../common/utils.js")), i = e(require("../../utils.js")), u = e(require("../../model.js"));

new n.JDComponent({
    properties: {
        config: {
            type: Object,
            observer: function(e) {
                this.init(e);
            }
        }
    },
    data: {
        showModule: !1,
        title: "",
        moreDesc: "",
        entries: []
    },
    methods: {
        init: function() {
            var e = this, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.getCPCData().then(function(t) {
                var n = t.map(function(r) {
                    var t = "";
                    if (r.sUrl) {
                        var n = /shareid=(\d+)(?:&|$)/.exec(r.sUrl);
                        n && n[1] && (t = n[1]);
                    }
                    var a = r.sUrl.split("?"), i = o.querystr(a[1]);
                    i.query.ptag = "17078.27.51";
                    var u = o.querystr(i.query), s = a[0] + "?xcx=9&" + u + "#" + i.hash;
                    return {
                        title: r.materialdesc,
                        gif: e.utils.getImg(r.materialext1),
                        image: e.utils.getImg(r.material),
                        url: s,
                        shareid: t
                    };
                }), a = r.moreUrl.split("?"), u = o.querystr(a[1]), s = o.querystr(u.query), c = i.addPtag(a[0] + "?xcx=9&" + s, "17078.27.51");
                return e.setData({
                    title: r.title,
                    moreDesc: r.moreDesc,
                    moreUrl: c,
                    showModule: !0,
                    entries: n
                }, function() {
                    e.triggerEvent("showModule");
                }), {
                    shareids: n.map(function(e) {
                        return e.shareid;
                    }),
                    showCount: r.showCount
                };
            }).then(function(r) {
                var n = r.shareids, o = (r.showCount, !0), i = !1, s = void 0;
                try {
                    for (var c, l = n[Symbol.iterator](); !(o = (c = l.next()).done); o = !0) if (!c.value) return;
                } catch (e) {
                    i = !0, s = e;
                } finally {
                    try {
                        !o && l.return && l.return();
                    } finally {
                        if (i) throw s;
                    }
                }
                for (var f = []; n.length > 12; ) f.push(u.getActiveFeeds(n.splice(0, 12)));
                return f.push(u.getActiveFeeds(n)), a.default.all(f).then(function(e) {
                    var r = [];
                    return e.forEach(function(e) {
                        return r.push.apply(r, t(e));
                    }), r;
                }).then(function(r) {
                    var t = e.data.entries;
                    t.forEach(function(e) {
                        r.some(function(r) {
                            if (e.shareid === r.shareid && r.playnum) {
                                var t = r.playnum, n = "";
                                return t < 1e4 && (n = t), t >= 1e4 && t < 1e5 && (n = Math.floor(t / 1e3) / 10 + "万"), 
                                t >= 1e5 && (n = Math.floor(t / 1e4) + "万"), e.count = n, !0;
                            }
                        });
                    }), e.setData({
                        entries: t
                    });
                }).catch(function(e) {
                    return console.log(e);
                });
            }).catch(function(r) {
                return e.setData({
                    showModule: !1
                });
            });
        },
        getCPCData: function() {
            return u.getCpcData([ 10457 ], [ 27497 ], r({}, 27497, 10), new Date()).then(function(e) {
                return !e[10457] || !e[10457][27497] || e[10457][27497].length < 4 ? a.default.reject({
                    message: "Fetch cpc data error!"
                }) : e[10457][27497];
            });
        },
        goToH5: function(e) {
            var r = e.currentTarget.dataset, t = r.url, n = r.cur, a = void 0 === n ? "" : n;
            wx.navigateToMiniProgram({
                appId: "wxf9a14e8a92b51ceb",
                path: "/pages/h5/index?EA_PTAG=17078.27.51&encode_url=" + encodeURIComponent(t),
                success: function(e) {
                    "2" == a ? i.report("138067.43.2") : "1" == a ? i.report("138067.43.3") : i.report("138067.43.1");
                }
            });
        }
    }
});