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

var n = require("../../../../bases/component.js"), i = e(require("../../mall/common-behavior.js")), o = e(require("../../../../libs/promise.min.js")), a = t(require("../../model.js")), l = t(require("../../utils.js")), u = require("../constant");

new n.JDComponent({
    behaviors: [ i.default ],
    properties: {
        freshmenData: {
            type: Object,
            observer: function(t) {
                this.getFreshmenDataResolve && this.getFreshmenDataResolve(t);
            }
        },
        saleConfig: {
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
            if (!l.checkTime(u.PREHEAT_BEGIN, u.PREHEAT_END)) return this.triggerEvent("componentLoad", this.is), 
            void this.setData({
                hideModule: !0
            });
            this.init();
        },
        init: function() {
            var t = this;
            o.default.all([ this.getFreshmenData(), this.getConfig(), this.getSelectedData(), this.getPingouData() ]).then(function(e) {
                if (!e || !e.length) return o.default.reject();
                var n = e[0], i = e[1], a = e[2], u = e[3], g = n && n.isnew && 1 == n.isnew || !1;
                if (!i || !a || !a.length) return o.default.reject();
                u && a.splice.apply(a, [ 8, 0 ].concat(r(u))), a.splice(9), t.setData({
                    config: i,
                    entries: a,
                    isnew: g,
                    hideModule: !1
                }, function() {
                    t.triggerEvent("componentLoad", t.is);
                }), a.forEach(function(t) {
                    l.exposureUrlPtag(t.url);
                }), g && i.newUrl && l.exposureUrlPtag(i.newUrl), i.leftUrl && l.exposureUrlPtag(i.leftUrl), 
                i.rightUrl && l.exposureUrlPtag(i.rightUrl);
            }).catch(function(e) {
                t.setData({
                    hideModule: !0
                }), t.triggerEvent("componentLoad", t.is);
            });
        },
        getConfig: function() {
            var t = this;
            return this.getPPMSData().then(function(e) {
                var r = {}, n = e && e.huichang || [];
                if (!n && !n.length) return r;
                var i = null;
                return n.some(function(t) {
                    if (l.checkTime(t.begin, t.end)) return i = t, !0;
                }), i ? r = {
                    bg: i.bg ? "background-image: url(" + t.utils.getImg(i.bg) + ")" : "",
                    title: i.title || "",
                    titleColor: i.titleColor ? "color: " + i.titleColor : "",
                    leftText: i.leftText || "",
                    leftUrl: i.leftUrl ? t.addPtag(i.leftUrl, "137889.63.1") : "",
                    leftColor: i.leftColor1 && i.leftColor2 ? "background-image: linear-gradient(to right, " + i.leftColor1 + ", " + i.leftColor2 + ")" : "",
                    rightText: i.rightText || "",
                    rightUrl: i.rightUrl ? t.addPtag(i.rightUrl, "137889.63.2") : "",
                    rightColor: i.rightColor1 && i.rightColor2 ? "background-image: linear-gradient(to right, " + i.rightColor1 + ", " + i.rightColor2 + ")" : "",
                    listColor: i.color ? "color: " + i.color : "",
                    listBg: i.color ? "background-color: " + i.color : "",
                    newImg: t.utils.getImg(i.newImg),
                    newUrl: i.newUrl ? t.addPtag(i.newUrl, "137889.63.3") : ""
                } : r;
            });
        },
        getSelectedData: function() {
            var t = this, e = [];
            return a.getEntryData(383, 9, {
                interval: 5
            }).then(function(r) {
                if (r && r.length) return e = r.map(function(e) {
                    var r = e.list && e.list[0] || {}, n = e.ext1 ? "&ptag=" + e.ext1 : "";
                    return {
                        title: e.martname || "",
                        des: r.content || "",
                        image: t.utils.getImg(r.img, 190),
                        url: r.url ? "" + r.url + n : ""
                    };
                }), e = e.filter(function(t) {
                    return t.title && t.image && t.des && t.url;
                });
            }).catch(function(t) {
                return e;
            });
        },
        getPingouData: function() {
            var t = this, e = [], r = [ 10787 ], n = [ 28575 ];
            return a.getCpcData(r, n, {}, Date.now()).then(function(i) {
                var o = i && i[r] && i[r][n] || [];
                if (o && o.length) return e = o.map(function(e) {
                    var r = e.promotion ? "&ptag=" + e.promotion : "";
                    return {
                        title: e.materialname || "",
                        image: t.utils.getImg(e.material, 180),
                        des: e.materialdesc || "",
                        url: e.sUrl ? "" + e.sUrl + r : ""
                    };
                }), e = e.filter(function(t) {
                    return t.title && t.image && t.des && t.url;
                });
            }).catch(function(t) {
                return e;
            });
        },
        getFreshmenData: function() {
            var t = this;
            return new o.default(function(e) {
                t.getFreshmenDataResolve = e;
            });
        },
        getPPMSData: function() {
            var t = this;
            return new o.default(function(e, r) {
                t.getPPMSDataResolve = e;
            });
        },
        addPtag: function(t, e) {
            if (!t || !e) return t;
            if (t.match(/\?\w+/)) {
                var r = this.utils.getUrlParam("ptag", String(t));
                t = r ? t.replace(r, e) : t + "&ptag=" + e;
            } else t = t + "?ptag=" + e;
            return t;
        },
        gotoUrl: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            });
        }
    }
});