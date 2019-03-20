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

var r = require("../../../../bases/component.js"), n = e(require("../../mall/common-behavior.js")), i = e(require("../../../../libs/promise.min.js")), o = t(require("../../utils.js")), a = t(require("../../model.js")), l = require("../constant");

new r.JDComponent({
    behaviors: [ n.default ],
    properties: {
        saleConfig: {
            type: Object,
            observer: function(t) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(t);
            }
        }
    },
    data: {
        config: {},
        entries1: []
    },
    methods: {
        refresh: function() {
            var t = this;
            o.checkTime(l.CLIMAX_BEGIN, l.CLIMAX_END) ? this.init() : this.setData({
                entries1: []
            }, function() {
                t.triggerEvent("componentLoad", t.is);
            });
        },
        init: function() {
            var t = this;
            i.default.all([ this.getConfig(), this.getEntryData(482, 6, 3) ]).then(function(e) {
                if (!e || !e.length) return i.default.reject();
                var r = e[0], n = e[1];
                return r && r.bg && n.length ? (t.setData({
                    config: r,
                    entries1: n
                }, function() {
                    t.triggerEvent("componentLoad", t.is);
                }), n.forEach(function(t) {
                    o.exposureUrlPtag(t.url);
                }), r.leftText && r.leftUrl && o.exposureUrlPtag(r.leftUrl), void (r.rightText && r.rightUrl && o.exposureUrlPtag(r.rightUrl))) : i.default.reject();
            }).catch(function(e) {
                t.setData({
                    entries1: []
                }), t.triggerEvent("componentLoad", t.is);
            });
        },
        getConfig: function() {
            var t = this, e = null;
            return this.getPPMSData().then(function(r) {
                var n = r && r.plEvent || [];
                if (!n || !n.length) return i.default.reject();
                var a = null;
                return n.some(function(t) {
                    if (o.checkTime(t.begin, t.end)) return a = t, !0;
                }), a ? e = {
                    bg: a.bg ? "background-image: url(" + t.utils.getImg(a.bg) + ");" : "",
                    tab1: a.centerText1 || "",
                    tab2: a.centerText2 || "",
                    gwqTitle: a.gwqFloorTitle || "",
                    mfTitle: a.mfFloorTitle || "",
                    pgTitle: a.pgFloorTitle || "",
                    title: a.centerText || "",
                    titleColor: a.centerColor ? "color: " + a.centerColor + ";" : "",
                    leftText: a.leftText || "",
                    leftUrl: a.leftHref ? o.addPtag(a.leftHref, "137889.63.1") : "",
                    rightText: "全部会场",
                    rightUrl: "https://wqs.jd.com/portal/promote_navigation/index.shtml?ptag=137889.63.2"
                } : i.default.reject();
            }).catch(function(t) {
                return e;
            });
        },
        getEntryData: function(t, e, r) {
            var n = this, l = [];
            return a.getEntryData(t, e, {
                interval: r,
                pretime: Date.now()
            }).then(function(t) {
                return t && t.length ? (l = t.map(function(t) {
                    var e = t.list && t.list[0] || {}, r = t.ext1 || "";
                    return r && (r = r.split("-")[1]), {
                        title: t.martname || "",
                        des: e.content || "",
                        image: n.utils.getImg(e.img, 180),
                        url: e.url ? o.addPtag(e.url, r) : ""
                    };
                }), l = l.filter(function(t) {
                    return t.title && t.image && t.des && t.url;
                })) : i.default.reject();
            }).catch(function(t) {
                return l;
            });
        },
        getPPMSData: function() {
            var t = this;
            return new i.default(function(e, r) {
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