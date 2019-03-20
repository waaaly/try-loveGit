function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e.default = t, e;
}

var e = require("../../../../bases/component.js"), n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../common-behavior.js")), i = t(require("../../model.js")), a = t(require("../../utils.js")), r = require("../../dbl11-components/constant");

new e.JDComponent({
    behaviors: [ n.default ],
    properties: {
        gridSelectedConfig: {
            type: Object,
            observer: function(t) {
                a.checkTime(r.CATEGORY_BEGIN, r.CATEGORY_END) ? this.triggerEvent("componentLoad", this.is) : (this.MAX_NUM = t.total || "24", 
                this.loadEntryData(this.MAX_NUM));
            }
        },
        bg: {
            type: String
        }
    },
    data: {
        entries: [],
        marginTop: 30
    },
    methods: {
        refresh: function() {
            var t = this;
            a.checkTime(r.CATEGORY_BEGIN, r.CATEGORY_END) && this.setData({
                entries: null
            }, function() {
                t.triggerEvent("componentLoad", t.is);
            });
        },
        loadEntryData: function(t) {
            var e = this;
            i.getEntryData(200, t).then(function(t) {
                var n = [];
                t.forEach(function(t) {
                    var i = t.list && t.list[0];
                    n.length < e.MAX_NUM && i && n.push({
                        id: t.id,
                        name: t.martname.split("|")[0],
                        desc: i.content.split("|")[0],
                        flag: i.content.split("|")[1],
                        image: e.utils.getImg(i.img, 160),
                        url: i.url,
                        tagID: t.martname.split("|")[1]
                    });
                }), n.length ? (n = n.slice(0, 9), e.setData({
                    entries: n
                }, function() {
                    e.triggerEvent("componentLoad", e.is);
                })) : e.loadPpmsData(), a.checkTime(r.CLIMAX_BEGIN, r.CLIMAX_END) && e.setData({
                    marginTop: 0
                });
            }).catch(function(t) {
                t.code, t.message;
                e.loadPpmsData();
            });
        },
        loadPpmsData: function() {
            var t = this;
            this.biz.getPPMS(33210).then(function(e) {
                var n = e[0] && e[0].guanqu || [], i = [];
                n.sort(function(t, e) {
                    return t.sign - e.sign > 0 ? 1 : -1;
                }), n.forEach(function(e) {
                    var n = a.checkTime(e.startTime, e.endTime);
                    i.length < t.MAX_NUM && n && i.push({
                        id: e.ppmsItemId,
                        name: e.name,
                        desc: e.desc,
                        image: t.utils.getImg(e.img, 160),
                        url: e.url
                    });
                }), t.setData({
                    entries: i
                }, function() {
                    t.triggerEvent("componentLoad", t.is);
                });
            }).catch(function(e) {
                e.code, e.message;
                t.setData({
                    entries: null
                }, function() {
                    t.triggerEvent("componentLoad", t.is);
                });
            });
        },
        tapOnItem: function(t) {
            var e = t.currentTarget.dataset.url;
            e || (e = "https://wqs.jd.com/portal/wx/wallet/wallet_chanels.shtml?ptag=137889.6.2"), 
            this.$goto("/pages/h5/index", {
                url: e
            });
        }
    }
});