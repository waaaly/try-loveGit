function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var i = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a]);
    }
    return t;
}, a = require("../../../../bases/component.js"), s = t(require("../../../../behaviors/attributes.js")), n = (t(require("../../../../api/Ptag/report_manager.js")), 
require("./api.js")), o = new (require("../../../../common/logger.js").Logger)("赠品组件"), r = {
    allowMulti: !1,
    list: [],
    mainGoods: {},
    selections: []
};

new a.JDComponent({
    behaviors: [ s.default ],
    properties: {
        allowMulti: Boolean,
        selections: Array,
        mainGoods: Object,
        list: {
            type: Array,
            value: [],
            observer: "_onShow"
        }
    },
    _rawList: [],
    data: {
        loading: !0,
        showMask: !1,
        total: 0,
        selectedTotal: 0
    },
    ready: function() {
        this.page = getCurrentPages().pop();
    },
    methods: {
        _onShow: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r.list;
            if (t.length) {
                var e = this.properties.allowMulti, i = void 0 === e ? r.allowMulti : e, a = this.properties.mainGoods, s = void 0 === a ? r.mainGoods : a;
                s = (0, n.formatMainGoods)(s), t = (0, n.formatList)(t);
                var o = s.num, c = this._getSelectionsTotalNum(!1, t);
                Object.assign(this.data, {
                    mainGoods: s,
                    allowMulti: i,
                    selectedTotal: c,
                    list: t,
                    loading: !1,
                    total: o
                }), this.setData(this.data);
            }
        },
        gotoItemDetail: function(t) {
            var e = t.currentTarget.dataset.id;
            this.$gotoItem({
                sku: e
            });
        },
        onCheck: function(t) {
            var i = t.currentTarget.dataset.id, a = this.data, s = a.allowMulti, o = a.list, r = (0, 
            n.queryById)(i);
            if (!r) return this.toast.show({
                page: this.page,
                icon: this.toast.ICON.WARNING,
                content: "抱歉，没有找到选择的赠品，请稍后再试"
            });
            if (s) {
                var c = Object.assign({}, r, {
                    checked: !r.checked
                });
                if (!this._valid(c)) return;
                var u = e({
                    selectedTotal: this._getSelectionsTotalNum(c)
                }, "list[" + r.grpIndex + "].items[" + r.index + "].checked", !r.checked);
                return this.setData(u);
            }
            var d = r.checked;
            if (!d) {
                var h = e({}, "list[" + r.grpIndex + "].items[" + r.index + "].checked", !d), l = o[r.grpIndex], g = l && l.items.find(function(t) {
                    return t.checked && (0, n.queryById)(t.id);
                });
                g && Object.assign(h, e({}, "list[" + g.grpIndex + "].items[" + g.index + "].checked", !1)), 
                this.setData(h);
            }
        },
        _valid: function(t) {
            var e = this.data.total;
            return !(this._getSelectionsTotalNum(t) > e) || (this.toast.show({
                page: this.page,
                icon: this.toast.ICON.NONE,
                content: "最多选择" + e + "件搭配赠品哦"
            }), !1);
        },
        sub: function(t) {
            var e = t.currentTarget.dataset.id, i = (0, n.queryById)(e);
            if (!i) return o.error(e), this.toast.show({
                page: this.page,
                icon: this.toast.ICON.WARNING,
                content: "抱歉，修改赠品数量失败，请稍后再试"
            });
            var a = Object.assign({}, i);
            Object.assign(a, {
                num: --a.num
            }), this._doUpdateNum(a, i);
        },
        add: function(t) {
            var e = t.currentTarget.dataset.id, i = (0, n.queryById)(e);
            if (!i) return o.error(e), this.toast.show({
                page: this.page,
                icon: this.toast.ICON.WARNING,
                content: "抱歉，修改赠品数量失败，请稍后再试"
            });
            var a = Object.assign({}, i);
            Object.assign(a, {
                num: ++a.num
            }), this._doUpdateNum(a, i);
        },
        updateNum: function(t) {
            var i = t.currentTarget.dataset.id, a = t.detail.value, s = void 0 === a ? 1 : a, o = String(s).trim(), r = (0, 
            n.queryById)(i), c = +r.num, u = o && /^\d*$/.test(o), d = u ? +o : c;
            if (u) {
                if (c == d) return this.setData(e({
                    showMask: !1
                }, "list[" + r.grpIndex + "].items[" + r.index + "].num", d));
                d = Math.max(1, d);
                var h = Object.assign({}, r);
                if (Object.assign(h, {
                    num: d
                }), r.checked && this._valid(h)) return this._doUpdateNum(h);
                r.checked && (d = c);
            }
            this.setData(e({
                showMask: !1
            }, "list[" + r.grpIndex + "].items[" + r.index + "].num", d));
        },
        _doUpdateNum: function(t) {
            if (!t.checked || this._valid(t)) {
                var i = e({
                    showMask: !1
                }, "list[" + t.grpIndex + "].items[" + t.index + "].num", t.num);
                t.checked && Object.assign(i, {
                    selectedTotal: this._getSelectionsTotalNum(t)
                }), this.setData(i);
            }
        },
        showInputMask: function() {
            this.setData({
                showMask: !0
            });
        },
        hideInputMask: function() {
            this.setData({
                showMask: !1
            });
        },
        _getSelections: function(t) {
            var i = {};
            return (t || this.data.list).forEach(function(t) {
                t.items.forEach(function(t) {
                    t.checked && Object.assign(i, e({}, t.id, t));
                });
            }), i;
        },
        _getSelectionsTotalNum: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i = Object.values(this._getSelections(e)), a = t && i.find(function(e) {
                return e.id == t.id;
            });
            return i.reduce(function(e, i) {
                return e + (t && i.id === t.id ? t.checked ? +t.num : 0 : +i.num);
            }, 0) + (a ? 0 : t ? +t.num : 0);
        },
        submit: function(t) {
            var e = this.data, i = e.allowMulti, a = e.total, s = Object.values(this._getSelections()), o = this._getSelectionsTotalNum();
            if (i && o < a) return this.toast.show({
                page: this.page,
                icon: this.toast.ICON.NONE,
                content: "搭配赠品需选满" + a + "件哦"
            });
            Object.assign(t, {
                hasChanged: (0, n.hasChanged)(s),
                selections: s
            }), this.triggerEvent("submit", t);
        },
        bubble: function(t) {},
        doAction: function(t) {
            var e = i({}, t.currentTarget.dataset, t.target.dataset), a = e.trigger, s = e.action;
            a && App.event.emit(a), this[s] && this[s](t);
        }
    }
});