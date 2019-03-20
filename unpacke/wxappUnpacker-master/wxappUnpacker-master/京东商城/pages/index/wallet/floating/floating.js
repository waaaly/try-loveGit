function t(t) {
    if (t && t.__esModule) return t;
    var i = {};
    if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (i[e] = t[e]);
    return i.default = t, i;
}

var i = require("../../../../bases/component.js"), e = t(require("../../utils.js")), n = t(require("../../../../common/utils.js"));

new i.JDComponent({
    properties: {
        floatingConfig: {
            type: Object,
            value: null,
            observer: function(t, i) {
                this.init(t);
            }
        }
    },
    data: {
        floating: {},
        showFloating: !1
    },
    methods: {
        init: function(t) {
            if (t && t.image) {
                var i = t.image, e = t.link, n = t.rd, a = t.wxappLink;
                this.setData({
                    floating: {
                        image: this.utils.getImg(i),
                        link: e,
                        rd: n,
                        wxappLink: a
                    }
                });
            }
        },
        imageLoaded: function() {
            this.setData({
                showFloating: !0
            });
        },
        hideFloating: function() {
            e.report("137889.7.5"), this.setData({
                showFloating: !1
            });
        },
        gotoH5: function(t) {
            var i = t.currentTarget.dataset, e = i.link, a = i.wxappLink, o = i.rd;
            if (e) this.$goto("/pages/h5/index", {
                url: e
            }); else if (a) {
                var r = {}, s = null, l = n.querystr(a.split("?")[1]);
                l && l.query && (s = l.query), s && Object.keys(s).length && (r = s, a = a.split("?")[0]), 
                o && (r.ptag = o), this.$goto(a, r);
            }
        }
    }
});