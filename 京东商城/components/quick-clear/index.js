var t = require("../../bases/component.js"), e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../behaviors/attributes.js")), a = require("../../api/Ptag/report_manager.js"), o = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e.default = t, e;
}(require("./api.js")), s = new (require("../../common/logger.js").Logger)("购物车-快速清理"), r = !1;

new t.JDComponent({
    behaviors: [ e.default ],
    properties: {
        options: {
            type: Object,
            observer: "onShow"
        }
    },
    data: {
        loading: !0,
        hasError: !1,
        selections: {},
        groups: [],
        headerText: "",
        selectedNum: 0,
        removedCnt: 0,
        isTabCartPage: !1
    },
    attached: function() {},
    methods: {
        onShow: function(t) {
            t = t || {
                show: !1
            };
            var e = getCurrentPages() || [], a = e.length ? e.pop().route : "";
            this.data.isTabCartPage = "pages/cart/cart/index" === a, t.show && this.load();
        },
        load: function() {
            var t = this;
            this.setData({
                loading: 1
            }), o.loadData().then(function(e) {
                t.data.groups = o.groupBy(e), t.data.groups.forEach(function(e) {
                    t.data.selections[e.key] = {};
                }), t.setData(Object.assign(t.data, {
                    hasError: 0,
                    loading: 0,
                    headerText: t.data.groups.header
                })), t.exposureReport();
            }).catch(function(e) {
                s.error(e), t.setData({
                    loading: 0,
                    hasError: 1
                });
            });
        },
        exposureReport: function() {
            var t = {
                noStock: "7014.29.15",
                oneYear: "7014.29.17",
                halfYear: "7014.29.19",
                oneMonth: "7014.29.21",
                inAMonth: "7014.29.22"
            };
            this.data.groups.map(function(t) {
                return t.key;
            }).forEach(function(e) {
                var o = t[e];
                a.ReportManager.addPtagExposure(o);
            });
        },
        getSelections: function(t) {
            var e = 0, o = 0, s = [], r = {
                noStock: "7014.29.14",
                oneYear: "7014.29.16",
                halfYear: "7014.29.18",
                oneMonth: "7014.29.20",
                inAMonth: "7014.29.23"
            };
            return Object.values(this.data.selections).forEach(function(t) {
                Object.entries(t).forEach(function(t) {
                    var e = t[0];
                    t[1] && (s.push(e), o++);
                });
            }), t && (e = Object.values(this.data.selections[t]).filter(function(t) {
                return t;
            }).length) && r[t] && a.ReportManager.addPtagExposure(r[t]), {
                groupLen: e,
                groupsLen: o,
                skus: s
            };
        },
        selectAll: function(t) {
            var e = t.currentTarget.dataset, a = e.selected, o = e.key, s = this.data.groups.find(function(t) {
                return t.key === o;
            }), r = this.data.groups.findIndex(function(t) {
                return t.key === o;
            }), n = this.data.selections[o], i = [], u = {};
            s.products.forEach(function(t) {
                var e = (4 == t.itemType ? t.suitId + "_" : "") + t.skuId;
                n[e] = !a;
            }), u["selections." + o] = n, i = this.getSelections(o), u["groups[" + r + "].selections"] = i.groupLen, 
            u.selectedNum = i.groupsLen, u["groups[" + r + "].selected"] = !a, this.setData(u);
        },
        select: function(t) {
            var e = t.currentTarget.dataset, a = e.selected, o = e.id, s = e.key, r = this.data.groups.find(function(t) {
                return t.key === s;
            }), n = this.data.groups.findIndex(function(t) {
                return t.key === s;
            }), i = {}, u = [];
            this.data.selections[s][o] = !a, i["selections." + s + "." + o] = !a, u = this.getSelections(s), 
            i["groups[" + n + "].selections"] = u.groupLen, i.selectedNum = u.groupsLen, i["groups[" + n + "].selected"] = u.groupLen == r.totalNum, 
            this.setData(i);
        },
        close: function(t) {
            Object.assign(t, {
                needRefresh: r,
                removedCount: this.data.removedCnt
            }), this.triggerEvent("close", t), this.setData({
                groups: [],
                hasError: 0,
                loading: 0,
                selectedNum: 0
            }), r = !1, this.data.removedCnt = 0;
        },
        clearSelections: function() {
            var t = {
                headerText: "",
                selectedNum: 0
            };
            this.getSelections().skus.forEach(function(e) {
                var a = o.findById(e);
                a && (t["groups." + a.groupName + "." + a.skuId] = !1);
            }), this.setData(t);
        },
        refresh: function() {
            this.setData({
                loading: 1,
                hasError: 0
            }), this.load();
        },
        removeSelections: function(t) {
            var e = this, s = this.getSelections().skus, n = [];
            if (!s.length) return this.toast.show({
                icon: this.toast.ICON.WARNING,
                content: "请选择要删除的商品"
            });
            a.ReportManager.addPtagExposure("7014.29.24"), n = o.getRemoveParamsBySkus(s), o.remove(n).then(function(n) {
                e.data.groups = o.groupBy(n), e.data.selections = {}, e.data.groups.forEach(function(t) {
                    e.data.selections[t.key] = {};
                }), r = !0, e.toast.show({
                    icon: e.toast.ICON.SUCCESS,
                    content: 0 === e.data.groups.totalNum ? "删除成功" : "删除成功，可继续清理"
                }), a.ReportManager.addPtagExposure("7014.29.27"), 0 === e.data.groups.totalNum ? (e.close(Object.assign(t, {
                    clearAll: !0
                })), e.setData({
                    groups: [],
                    hasError: 0,
                    loading: 0,
                    selectedNum: 0
                })) : (e.data.removedCnt += s.length, e.setData(Object.assign(e.data, {
                    hasError: 0,
                    loading: 0,
                    selectedNum: 0,
                    headerText: "已清理" + e.data.removedCnt + "件商品，可继续清理"
                })));
            }).catch(function(t) {
                e.toast.show({
                    icon: e.toast.ICON.WARNING,
                    content: "删除失败，请稍后再试"
                });
            });
        },
        add2Favorite: function(t) {
            var e = this, n = this.getSelections().skus;
            if (!n.length) return this.toast.show({
                icon: this.toast.ICON.WARNING,
                content: "请选择要收藏的商品"
            });
            var i = o.getRemoveParamsBySkus(n), u = [];
            if (n.forEach(function(t) {
                var e = o.findById(t);
                o.getSkusFromRawData(e).forEach(function(t) {
                    u.push({
                        itemId: t
                    });
                });
            }), u.length > 40) return this.toast.show({
                icon: this.toast.ICON.WARNING,
                content: "一次收藏不能超过 40 个商品哦"
            });
            a.ReportManager.addPtagExposure("7014.29.25"), o.add2Favorite(u, i).then(function(s) {
                e.data.groups = o.groupBy(s), e.data.selections = {}, e.data.groups.forEach(function(t) {
                    e.data.selections[t.key] = {};
                }), r = !0, 0 !== e.data.groups.totalNum && e.toast.show({
                    icon: e.toast.ICON.SUCCESS,
                    content: 0 === e.data.groups.totalNum ? "移入收藏成功" : "移入收藏成功，可继续清理"
                }), a.ReportManager.addPtagExposure("7014.29.26"), 0 === e.data.groups.totalNum ? (e.close(Object.assign(t, {
                    clearAll: !0
                })), e.setData({
                    groups: [],
                    hasError: 0,
                    loading: 0,
                    selectedNum: 0
                })) : (e.data.removedCnt += n.length, e.setData(Object.assign(e.data, {
                    hasError: 0,
                    loading: 0,
                    selectedNum: 0,
                    headerText: "已清理" + e.data.removedCnt + "件商品，可继续清理"
                })));
            }).catch(function(t) {
                s.error(t), e.toast.show({
                    icon: e.toast.ICON.WARNING,
                    content: "收藏失败，请稍后再试"
                });
            });
        },
        noscroll: function() {}
    }
});