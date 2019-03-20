function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = require("../../../../bases/component.js"), i = e(require("../../../../libs/promise.min.js")), o = e(require("../common-behavior.js")), r = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../../model.js"));

new t.JDComponent({
    behaviors: [ o.default ],
    data: {
        entries: [],
        hideModule: !0
    },
    methods: {
        refresh: function() {
            this.loadTopicData();
        },
        loadTopicData: function() {
            var e = this;
            r.getTopic().then(function(t) {
                if (!t || !t.length) return i.default.reject("no res data");
                var o = {}, r = [];
                t.forEach(function(t, n) {
                    var a = t.topicname, s = t.topicdesc, u = t.topicimgs, c = t.topicid, l = t.pps, d = t.bgimg, h = "https://wq.jd.com/webportal/channel/theme_page?sceneid=1&themeid=" + c + "&pps=" + l + "&ptag=138067.35." + c;
                    if (0 == n) o = {
                        title: a || "",
                        des: s || "",
                        bg: e.utils.getImg(d, 690, 192) || "",
                        url: h
                    }; else {
                        var p = [], f = [];
                        if (!u || !u.length) return i.default.reject("no topicimgs data");
                        u.forEach(function(t) {
                            p.push(t.skuid), f.push(e.utils.getImg(t.imgurl, 148));
                        }), r.push({
                            title: a,
                            des: s,
                            images: f,
                            url: h + "&skus=" + p.join(",")
                        });
                    }
                }), r.splice(4), e.setData({
                    firstItem: o,
                    otherItem: r,
                    hideModule: !1
                }), e.triggerEvent("showModule");
            }).catch(function(t) {
                console.log("recommend catch"), e.setData({
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