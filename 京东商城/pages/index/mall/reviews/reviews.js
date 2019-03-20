function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}

var t = require("../../../../bases/component.js"), i = e(require("../../model.js")), r = e(require("../../utils.js")), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../libs/promise.min.js"));

new t.JDComponent({
    properties: {
        reviewsConfig: {
            type: Object,
            observer: function(e) {
                this.init(e);
            }
        }
    },
    data: {
        entries: [],
        moreDesc: "",
        moreUrl: "",
        hideModule: !1
    },
    methods: {
        init: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            i.getRecommendFeedList(1104, 3).then(function(o) {
                var s = o || [], u = [], a = [];
                return s.length ? (s.forEach(function(i) {
                    i.skuid && 0 != i.skuid && (u.push({
                        view: i.viewnum >= 1e4 ? 1 * (i.viewnum / 1e4).toFixed(1) + "万+" : i.viewnum,
                        title: i.title || i.abstract || i.commentcontent,
                        image: r.clipImg(e.utils.getImg(i.sharepicurl.split(",")[0], 430, 200), 430, 200),
                        url: t.moreUrl.replace(/\ptag=\d+\.\d+\.\d+/g, "ptag=138067.20.10") + "&shareid=" + i.shareid + "&pps=" + i.pps,
                        skuid: i.skuid
                    }), a.push(i.skuid));
                }), !u.length || u.length < 3 ? n.default.reject() : (u.splice(3), a.splice(3), 
                e.setData({
                    entries: u,
                    moreDesc: t.moreDesc,
                    moreUrl: t.moreUrl
                }), e.biz.getSkuPrice(a).then(function(t) {
                    for (var i in t) !function(e) {
                        u.forEach(function(i, r) {
                            e == i.skuid && (i.price = t[e].price > 0 ? "¥" + t[e].price : "");
                        });
                    }(i);
                    e.setData({
                        entries: u
                    });
                }), i.getSkuInfo(a).then(function(t) {
                    for (var i in t) !function(i) {
                        u.forEach(function(r, n) {
                            i == r.skuid && (r.cover = e.utils.getImg(t[i].imagePath, 200));
                        });
                    }(i);
                    e.setData({
                        entries: u
                    });
                }), void e.triggerEvent("showModule"))) : n.default.reject();
            }).catch(function(t) {
                e.setData({
                    hideModule: !0
                });
            });
        },
        gotoUrl: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        }
    }
});