function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = require("../../../../bases/component.js"), n = e(require("../../../../libs/promise.min.js")), i = e(require("../common-behavior.js")), r = require("../../model.js"), a = require("../../../../common/utils.js"), o = require("../../utils.js");

new t.JDComponent({
    behaviors: [ i.default ],
    properties: {
        config: {
            type: Object,
            observer: function(e) {
                this.init(e);
            }
        }
    },
    data: {
        entries1: [],
        entries2: [],
        hideModule: !0
    },
    methods: {
        init: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = t.v2Range || "", i = t.v2Pin || "";
            t.isV2 = !1, (0, o.greyScale)(n, i) ? (t.isV2 = !0, (0, r.getFloorData)([ 476 ], [ 17 ]).then(function(n) {
                e.getData(n, t);
            })) : (0, r.getEntryData)(476, 17).then(function(n) {
                e.getData(n, t);
            });
        },
        getData: function(e, t) {
            var i = this;
            if (!e || !e.length) return n.default.reject("no data");
            var r = (e || []).map(function(e) {
                var n = e.list || [], i = (t.isV2 ? e.ext2 : e.ext1) || "", r = [];
                return n.forEach(function(e) {
                    e.img && e.url && r.push({
                        img: (0, a.getImg)(e.img, 200),
                        url: (0, o.addPtag)(e.url, i)
                    });
                }), {
                    title: (t.isV2 ? e.cname : e.martname) || "",
                    des: n && n[0] && n[0].content || "",
                    cover: r
                };
            });
            if (!(r = r.filter(function(e) {
                return e.title && e.cover && e.cover.length;
            })) || !r.length) return n.default.reject("no entries data");
            var s = r.slice(0, 10), u = [], l = t.linksRange || "", c = t.linksPin || "";
            r.length > 10 && (0, o.greyScale)(l, c) && (u = r.slice(10).map(function(e) {
                return {
                    title: e.title || "",
                    url: e.cover && e.cover[0] && e.cover[0].url || ""
                };
            })).length && u.push({
                title: "更多",
                path: "/pages/index/subpack/channel/index?ptag=138067.42.1"
            }), this.setData({
                entries1: s,
                entries2: u,
                hideModule: !1
            }, function() {
                i.triggerEvent("showModule");
            });
        },
        gotoUrl: function(e) {
            var t = e.currentTarget.dataset, n = t.url, i = t.path;
            n ? this.$goto("/pages/h5/index", {
                url: n
            }) : this.$goto(i);
        }
    }
});