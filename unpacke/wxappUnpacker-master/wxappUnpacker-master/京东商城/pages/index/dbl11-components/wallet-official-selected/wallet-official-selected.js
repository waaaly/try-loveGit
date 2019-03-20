function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    return e.default = t, e;
}

function e(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function r(t) {
    if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r;
    }
    return Array.from(t);
}

var n = require("../../../../bases/component.js"), i = e(require("../../mall/common-behavior.js")), a = e(require("../../../../libs/promise.min.js")), l = t(require("../../model.js")), u = t(require("../../utils.js")), o = require("../constant");

new n.JDComponent({
    behaviors: [ i.default ],
    properties: {
        walletSaleConfig: {
            type: Object,
            observer: function(t) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(t);
            }
        }
    },
    data: {
        config: {},
        entries: [],
        isnew: !1,
        hideModule: !0
    },
    methods: {
        refresh: function() {
            if (!u.checkTime(o.CATEGORY_BEGIN, o.CATEGORY_END)) return this.triggerEvent("componentLoad", this.is), 
            void this.setData({
                hideModule: !0
            });
            this.init();
        },
        init: function() {
            var t = this;
            a.default.all([ this.getConfig(), this.getEntryData(), this.getCpcData(10787, 28801) ]).then(function(e) {
                if (!e || !e.length) return a.default.reject();
                var n = e[0], i = e[1], l = e[2];
                if (i.splice.apply(i, [ 8, 0 ].concat(r(l))), i.splice(9), !(n && n.bg && i && i.length)) return a.default.reject();
                t.setData({
                    config: n,
                    entries: i,
                    hideModule: !1
                }, function() {
                    t.triggerEvent("componentLoad", t.is);
                }), i.forEach(function(t) {
                    u.exposureUrlPtag(t.url);
                }), n.leftText && n.leftUrl && u.exposureUrlPtag(n.leftUrl), n.rightText && n.rightUrl && u.exposureUrlPtag(n.rightUrl);
            }).catch(function(e) {
                t.setData({
                    hideModule: !0
                }), t.triggerEvent("componentLoad", t.is);
            });
        },
        getConfig: function() {
            var t = this, e = {};
            return this.getPPMSData().then(function(r) {
                var n = r && r.huichang_official || [];
                if (!n || !n.length) return a.default.reject();
                var i = null;
                return n.some(function(t) {
                    if (u.checkTime(t.begin, t.end)) return i = t, !0;
                }), i ? e = {
                    bg: i.bg ? "background-image: url(" + t.utils.getImg(i.bg) + ")" : "",
                    title: i.title || "",
                    titleColor: i.titleColor ? "color: " + i.titleColor : "",
                    leftText: i.leftText || "",
                    leftUrl: i.leftUrl ? u.addPtag(i.leftUrl, "137889.63.1") : "",
                    rightText: i.rightText || "全部会场",
                    rightUrl: i.rightUrl ? u.addPtag(i.rightUrl, "137889.63.2") : ""
                } : a.default.reject();
            }).catch(function(t) {
                return e;
            });
        },
        getEntryData: function() {
            var t = this, e = [];
            return l.getEntryData(383, 9, {
                interval: 5,
                pretime: Date.now()
            }).then(function(r) {
                return r && r.length ? (e = r.map(function(e) {
                    var r = e.list && e.list[0] || {}, n = e.ext1 || "";
                    return {
                        title: e.martname || "",
                        des: r.content || "",
                        image: t.utils.getImg(r.img, 190),
                        url: r.url ? u.addPtag(r.url, n) : ""
                    };
                }), e = e.filter(function(t) {
                    return t.title && t.image && t.des && t.url;
                })) : a.default.reject();
            }).catch(function(t) {
                return e;
            });
        },
        getCpcData: function(t, e) {
            var r = this, n = [];
            return l.getCpcData([ t ], [ e ], {}, Date.now()).then(function(i) {
                var l = i && i[t] && i[t][e] || [];
                return l && l.length || a.default.reject(), n = l.map(function(t) {
                    var e = t.userdata1;
                    return {
                        title: t.materialname || "",
                        image: r.utils.getImg(t.material, 180),
                        des: t.materialdesc || "",
                        url: t.sUrl ? u.addPtag(t.sUrl, e) : ""
                    };
                }), n = n.filter(function(t) {
                    return t.title && t.image && t.des && t.url;
                });
            }).catch(function(t) {
                return n;
            });
        },
        getPPMSData: function() {
            var t = this;
            return new a.default(function(e, r) {
                t.getPPMSDataResolve = e;
            });
        },
        gotoUrl: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            });
        }
    }
});