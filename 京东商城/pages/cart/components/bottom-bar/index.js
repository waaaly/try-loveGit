function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e.default = t, e;
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var a = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, o = function() {
    function t(t, e) {
        var a = [], o = !0, n = !1, r = void 0;
        try {
            for (var i, s = t[Symbol.iterator](); !(o = (i = s.next()).done) && (a.push(i.value), 
            !e || a.length !== e); o = !0) ;
        } catch (t) {
            n = !0, r = t;
        } finally {
            try {
                !o && s.return && s.return();
            } finally {
                if (n) throw r;
            }
        }
        return a;
    }
    return function(e, a) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), n = t(require("../../common/ptag-constants.js")), r = require("../../../../api/Ptag/Ptag_utils.js"), i = require("../../../../bases/component.js"), s = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../behaviors/attributes.js")), c = t(require("../../../../common/cookie-v2/cookie.js")), h = require("../../common/select-mode.js"), d = t(require("../../../../common/modal/modal.js")), u = t(require("../../models/model.js")), l = getApp(), m = [];

new i.JDComponent({
    behaviors: [ s.default ],
    properties: {
        options: {
            type: Object,
            value: {},
            observer: "setSummaryData"
        }
    },
    data: {
        editable: !1
    },
    ready: function() {
        var t = this._getPageId(), e = [ [ "cart:btmbar:editmode", this._onEditModel ], [ "cart:onpay", this._onPay ] ], a = !0, n = !1, r = void 0;
        try {
            for (var i, s = e[Symbol.iterator](); !(a = (i = s.next()).done); a = !0) {
                var c = o(i.value, 2), h = c[0], d = c[1], u = h + "_" + t;
                l.event.off(u).on(u, d.bind(this));
            }
        } catch (t) {
            n = !0, r = t;
        } finally {
            try {
                !a && s.return && s.return();
            } finally {
                if (n) throw r;
            }
        }
        this.page = getCurrentPages().pop();
    },
    attached: function() {},
    methods: {
        setSummaryData: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.data.editable && Object.assign(t, {
                editChecked: this.data.summary.editChecked
            }), this.setData({
                summary: t
            }), h.SelectMode.update({
                summary: t
            });
        },
        onCheck: function(t) {
            this.triggerEvent("check", a({}, t, {
                type: "all",
                summary: this.data.summary
            })), this.setData(e({}, "summary.checked", !this.data.summary.checked));
        },
        onEditCheck: function(t) {
            this.triggerEvent("editcheck", a({}, t, {
                type: "all",
                checked: this.data.summary.editChecked
            }));
        },
        removeSelections: function(t) {
            var e = this, a = h.SelectMode.getSelections();
            if (!a.length) return this.toast.show({
                page: this.page,
                icon: this.toast.ICON.WARNING,
                content: "请选择要删除的商品"
            });
            d.show({
                title: "",
                content: "确认将已选中的" + a.length + "件商品删除吗？",
                maxHeight: "360",
                align: "center",
                showCancel: !0,
                cancelText: "取消",
                cancelColor: "#000",
                confirmText: "删除",
                confirmColor: "red",
                success: function() {
                    e._showLoading(), r.PtagUtils.addPtag(n.CART_DELETE), u.rmvCmdy(a).then(function(t) {
                        l.event.emit("cartrefresh", {
                            localData: t
                        }), e.toast.show({
                            page: e.page,
                            icon: e.toast.ICON.SUCCESS,
                            content: "已成功删除所选商品"
                        }), e._hideLoading();
                    }).catch(function(t) {
                        e._hideLoading(), e.toast.show({
                            page: e.page,
                            icon: e.toast.ICON.WARNING,
                            content: t.message
                        });
                    });
                }
            });
        },
        add2Favorite: function(t) {
            var e = this, a = h.SelectMode.getSelections();
            return a.length ? a.length > 40 ? this.toast.show({
                icon: this.toast.ICON.WARNING,
                content: "一次收藏不能超过 40 个商品哦"
            }) : void d.show({
                title: "",
                content: "确认将已选中的" + a.length + "件商品移至收藏？",
                maxHeight: "360",
                align: "center",
                showCancel: !0,
                cancelText: "取消",
                cancelColor: "#000",
                confirmText: "移至收藏",
                confirmColor: "red",
                success: function() {
                    e._showLoading(), u.favorite(a).then(u.rmvCmdy).then(function(t) {
                        l.event.emit("cartrefresh", {
                            localData: t
                        }), e.toast.show({
                            page: e.page,
                            icon: e.toast.ICON.SUCCESS,
                            content: "已成功移至收藏，请在［我的 - 商品收藏］查看"
                        }), e._hideLoading();
                    }).catch(function(t) {
                        e._hideLoading(), e.toast.show({
                            page: e.page,
                            icon: e.toast.ICON.WARNING,
                            content: t.message
                        });
                    });
                }
            }) : this.toast.show({
                page: this.page,
                icon: this.toast.ICON.WARNING,
                content: "请选择要移至收藏的商品"
            });
        },
        onPayCheck: function(t) {
            var e = t.currentTarget.dataset.index;
            this.data.summary.details.forEach(function(t, a) {
                t.checked = e === a;
            }), this.setData({
                "summary.details": this.data.summary.details
            });
        },
        hideConfirmPay: function() {
            this.setData({
                showPay: !1
            });
        },
        showConfirmPay: function() {
            if (this.data.summary.details.length > 1) return this.setData({
                showPay: !0
            });
            this.gotoPay();
        },
        gotoPay: function() {
            var t = this.data.summary.details.length ? this.data.summary.details.find(function(t) {
                return !0 === t.checked;
            }) : {
                category: "other",
                checkedSkuCount: +this.data.summary.checkedSkuCount
            }, e = {
                category: t.category,
                checkedSkuCount: t.checkedSkuCount
            };
            if (this.hideConfirmPay(), r.PtagUtils.addPtag(n.CART_GOTO_PAY, {
                num: this.data.summary.checkedNum,
                price: this.data.summary.price
            }), t.checkedSkuCount > 110) return wx.showModal({
                title: "勾选商品太多啦",
                content: "单次结算商品不能超过110种，请重新选择结算商品",
                showCancel: !1,
                confirmText: "我知道了",
                confirmColor: "#e93b3d"
            });
            if (m.length && (m.forEach(function(t) {
                t();
            }), m = []), "otcdrug" === e.category) {
                var a = encodeURIComponent(c.getCookie("wq_addr"));
                return this.$goto("/pages/h5/index", {
                    url: "https://wqs.jd.com/order/s_confirm_otc.shtml?wq_addr=" + a,
                    onPageUnload: function() {
                        l.event.emit("cartrefresh");
                    }
                });
            }
            this.$goto("/pages/pay/index/index", e);
        },
        _onEditModel: function(t) {
            this.setData({
                editable: t
            });
        },
        _onPay: function(t) {
            "function" == typeof t && m.push(t);
        }
    }
});