var e = require("../../../../bases/component.js"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../libs/promise.min.js")), n = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("../../model.js"));

new e.JDComponent({
    data: {
        banner: [],
        hideModule: !1,
        showImage: !1
    },
    created: function() {
        this.init = this.init.bind(this), getApp().event.on("index_mall_init", this.init);
    },
    detached: function() {
        getApp().event.off("index_mall_init", this.init);
    },
    methods: {
        init: function(e) {
            var r = this;
            t.default.resolve(e).then(function(e) {
                if (!e.banner || "0" != e.banner.errCode) return t.default.reject("get cpc data error");
                var i = n.parseCpcList(e.banner.list), a = void 0;
                if (i[10924] && i[10924][28947] && (a = i[10924][28947][0]), !a) return t.default.reject("get cpc data error");
                var o = a, s = o.sUrl, u = o.pps, d = o.material, c = o.userdata1, l = o.userdata2, p = o.userdata3, f = parseInt(a.promotion), h = r.utils.getImg(d);
                if (!h || isNaN(f) || f < 1 || f > 4) return t.default.reject("get cpc data error");
                var g = [ s, (c.includes("?") ? c : c + "?") + "&pps=" + u, (l.includes("?") ? l : l + "?") + "&pps=" + u, (p.includes("?") ? p : p + "?") + "&pps=" + u ];
                g = g.slice(0, f), r.setData({
                    image: h,
                    banner: g,
                    hideModule: !1
                }, function() {
                    return r.triggerEvent("componentLoad", r.is);
                });
            }).catch(function(e) {
                r.setData({
                    hideModule: !0
                }), r.triggerEvent("componentLoad", r.is);
            });
        },
        tapOnItem: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        },
        onImgLoad: function(e) {
            this.setData({
                showImage: !0
            });
        }
    }
});