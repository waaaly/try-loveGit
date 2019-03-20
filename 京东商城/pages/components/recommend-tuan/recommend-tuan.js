function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e.default = t, e;
}

var e = require("../../../bases/component"), a = t(require("./model.js")), i = require("../../../common/logger"), o = t(require("../../../common/fe_helper")), s = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../libs/promise.min.js")), r = new i.Logger("组件 hot-recommend");

new e.JDComponent({
    properties: {
        notShowPennyItem: {
            type: Boolean,
            value: !0
        },
        isStyleTwo: {
            type: Boolean,
            value: !1
        },
        titleBgUrl: {
            type: String,
            value: ""
        },
        scenario: String,
        spreadUrl: String
    },
    data: {
        listState: "init",
        list: [],
        storage: [],
        pageNumber: 0,
        isEnd: !1
    },
    ready: function() {
        this.getMoreGoods = o.throttle(this.getMoreGoods, 500), this.getHotGoods();
    },
    methods: {
        gotoDetail: function(t) {
            var e = t.currentTarget.dataset.idx, a = this.data.list[e], i = a.sku_id, o = a.imagePath, s = a.name;
            this.$goto("/pages/pingou/item/item", {
                cover: o,
                sku: i,
                name: s
            });
        },
        getHotGoods: function() {
            var t = this;
            this.data.pageNumber = this.data.pageNumber + 1;
            var e = {
                scenario: this.data.scenario,
                spreadUrl: this.data.spreadUrl
            };
            a.getRecommendProducts({
                pageNo: this.data.pageNumber
            }, e).then(function(i) {
                if (i && 0 != i.active_info.length) {
                    var n = i.active_info, u = n.map(function(t) {
                        return t.sku_id;
                    });
                    s.default.all([ a.getSkuInfo(u), a.getTuanPrice(u.join(","), e) ]).then(function(e) {
                        e && (n = n.reduce(function(t, a) {
                            var i = Object.assign(a, e[1].filter(function(t) {
                                return t.id == a.sku_id;
                            })[0], e[0][a.sku_id]), s = i.name, r = i.tuan_capacity, n = i.imagePath, u = i.ptuan_count, d = i.op, h = i.bp, c = i.sku_id;
                            return n = o.getImg(n, 240), t.concat([ {
                                name: s,
                                tuan_capacity: r,
                                imagePath: n,
                                ptuan_count: u,
                                op: d,
                                bp: h,
                                sku_id: c
                            } ]);
                        }, [])), 1 == t.data.pageNumber && (t.data.storage = n), t.showGoodsList(n);
                    }).catch(function(e) {
                        t.showError(), r.error(e);
                    });
                }
            }).catch(function(e) {
                t.showError(), r.error(e);
            });
        },
        showGoodsList: function(t) {
            this.data.isEnd = 10 * this.data.pageNumber >= 100, this.data.pageNumber > 1 ? t = this.data.list.concat(t) : 1 == this.data.pageNumber && (t = t.slice(0, 4)), 
            this.data.list = t, this.setData({
                list: t,
                listState: this.data.isEnd ? "end" : "loading"
            });
        },
        getMoreGoods: function() {
            if (!this.data.isEnd) {
                if (0 != this.data.storage.length) {
                    var t = this.data.list.concat(this.data.storage.slice(4, 10));
                    return this.setData({
                        list: t
                    }), this.data.list = t, void (this.data.storage = []);
                }
                "error" == this.data.listState ? this.refreshGoods() : this.getHotGoods();
            }
        },
        refreshGoods: function() {
            this.setData({
                listState: "init"
            }), this.data.pageNumber = this.data.pageNumber - 1, this.getHotGoods();
        },
        showRefresh: function() {
            this.setData({
                listState: "error"
            });
        },
        toPingouIndex: function() {
            this.$goto("/pages/pingou/index/index", "navigateTo");
        },
        showError: function() {
            this.showRefresh();
        }
    }
});