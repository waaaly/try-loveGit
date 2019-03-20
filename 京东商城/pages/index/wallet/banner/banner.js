var e = require("../../../../bases/component.js"), n = function(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
    return n.default = e, n;
}(require("../../utils.js"));

new e.JDComponent({
    properties: {
        bannerConfig: {
            type: Object,
            value: null,
            observer: function(e, n) {
                this.init(e);
            }
        }
    },
    data: {
        firstBanner: null,
        secondBanner: null
    },
    methods: {
        init: function(e) {
            var i = this, t = null, r = null;
            e.firstBanner.some(function(e) {
                var r = e.beginTime, a = e.endTime, s = e.image, l = e.link;
                if (n.checkTime(r, a, new Date())) return t = {
                    image: i.utils.getImg(s),
                    link: l
                }, !0;
            }), e.secondBanner.some(function(e) {
                var t = e.beginTime, a = e.endTime, s = e.image, l = e.linkLeft, o = e.linkRight;
                if (n.checkTime(t, a, new Date())) return r = {
                    image: i.utils.getImg(s),
                    linkLeft: l,
                    linkRight: o
                }, !0;
            }), this.setData({
                firstBanner: t,
                secondBanner: r
            });
        },
        gotoH5: function(e) {
            var n = e.currentTarget.dataset.link;
            this.$goto("/pages/h5/index", {
                url: n
            });
        }
    }
});