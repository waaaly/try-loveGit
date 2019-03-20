var e = require("../../../../bases/component.js"), t = require("../../../../api/Ptag/report_manager.js"), a = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    return t.default = e, t;
}(require("../../utils.js"));

new e.JDComponent({
    properties: {
        scrollTop: {
            type: Number,
            value: 0,
            observer: function(e, t) {
                this.setData({
                    cssModifier: e > 40 ? "scroll" : ""
                });
            }
        },
        shakePayload: {
            type: Object,
            observer: function(e) {
                e && e.showEntrance && this.showShakeEntrance(e.config);
            }
        }
    },
    data: {
        cssModifier: "",
        searchKey: ""
    },
    created: function() {
        this.getKey = this.getKey.bind(this), getApp().event.on("index_mall_init", this.getKey);
    },
    detached: function() {
        getApp().event.off("index_mall_init", this.getKey);
    },
    methods: {
        getKey: function(e) {
            e && e.search && "0" == e.search.errCode && e.search.data && e.search.data.length && this.setData({
                searchKey: e.search.data[0].searchname || ""
            });
        },
        tapOnSearchBar: function() {
            var e = {
                ptag: "138067.2.2"
            };
            this.data.searchKey && (e.searchname = this.data.searchKey), this.$goto("/pages/search/list/list", e);
        },
        showShakeEntrance: function(e) {
            this.config = e, e.mall_ptag && t.ReportManager.addPtagExposure(e.mall_ptag), this.setData({
                shakeEntrance: {
                    image: this.utils.getImg(e.wxappSmallImg),
                    url: a.addPtag(e.link, e.mall_ptag)
                }
            });
        },
        navigate: function(e) {
            var t = this.config, a = e.currentTarget.dataset.url;
            t.mini_link ? (this.$goto(t.mini_link), this.$report(t.mall_ptag)) : this.$goto("/pages/h5/index", {
                url: a
            });
        }
    }
});