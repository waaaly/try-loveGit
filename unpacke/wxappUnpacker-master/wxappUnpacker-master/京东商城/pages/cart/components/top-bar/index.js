function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}

var t = e(require("../../common/ptag-constants")), i = require("../../../../api/Ptag/Ptag_utils.js"), a = require("../../../../bases/component"), n = require("../../../../common/logger"), s = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../behaviors/attributes")), r = e(require("../../../../common/user_info")), o = e(require("../../models/model")), d = getApp(), u = new n.Logger("购物车顶部功能条");

new a.JDComponent({
    behaviors: [ s.default ],
    properties: {
        address: {
            type: "String",
            value: r.getUserAddressDes().replace(/_/g, ""),
            observer: "_setAddress"
        },
        showQuickCleanButton: {
            type: "Boolean",
            value: !1,
            observer: "_showQuickCleanButton"
        }
    },
    data: {
        editable: !1,
        fixed: !1
    },
    ready: function() {
        this._pageId = "_" + this._getPageId(), this.showQuickClearPanel = this.helper.debounce(this.showQuickClearPanel, 100);
    },
    attached: function() {},
    methods: {
        _setAddress: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            e && this.setData({
                address: e
            });
        },
        _showQuickCleanButton: function(e) {
            this.setData({
                showQuickCleanButton: e
            });
        },
        doEdit: function(e) {
            var t = this.data.editable;
            this.setData({
                editable: !t
            }), d.event.emit("cart:editmode", !t), d.event.emit("cart:goodslist:editmode" + this._pageId, !t), 
            d.event.emit("cart:btmbar:editmode" + this._pageId, !t);
            var i = this.selectComponent("#cmpPinBind");
            i && i.setVisiable(t);
        },
        showSwitchAddressPanel: function() {
            var e = this;
            i.PtagUtils.addPtag(t.CART_ADDR_CLK), this._showLoading(), o.getAddressList().then(function(t) {
                var i = r.getAddress(), a = i.addressId, n = i.areaId;
                e.setData({
                    addressOpts: {
                        show: !0,
                        list: t,
                        adid: a,
                        areaid: n
                    }
                }, function() {
                    e._hideLoading();
                });
            }).catch(function(t) {
                u.error(t), wx.hideLoading(), e.setData({
                    addressOpts: {
                        show: !0,
                        list: []
                    }
                }, function() {
                    e._hideLoading();
                });
            });
        },
        onAddressPanelClose: function() {
            this.setData({
                addressOpts: {
                    show: !1,
                    list: []
                }
            });
        },
        onAddressChange: function(e) {
            var t = e.detail, i = this.data.addressOpts.list.find(function(e) {
                return e.adid == t;
            }), a = [ i.provinceId, i.cityId, i.countyId, i.townId ].join("_"), n = [ i.provinceName, i.cityName, i.countyName, i.townName ].join("_"), s = [ t, a, n, i.addrfull, [ i.longitude, i.latitude ].join(",") ].join("|");
            r.updateAddress({
                wq_addr: s
            }), d.event.emit("cartrefresh");
        },
        showQuickClearPanel: function(e) {
            this.setData({
                quickClearOptions: {
                    show: !0
                }
            });
        },
        onQuickClearPanelClose: function(e) {
            var t = e.detail, i = t.needRefresh, a = t.clearAll;
            this.setData({
                quickClearOptions: {
                    show: !1
                },
                showQuickCleanButton: !a
            }), a && this.doEdit(e);
            var n = getCurrentPages(), s = "pages/cart/cart/index" === (n.length ? n.pop().route : "");
            if (i) {
                if (s) return d.event.emit("cartrefresh", {
                    forceUpdate: !0
                });
                d.event.emit("cartrefresh"), d.event.emit("cart:refresh4nontab");
            }
        },
        refreshPinBindBar: function() {
            var e = this.selectComponent("#cmpPinBind");
            e && e.reload();
        },
        onPinbindTap: function() {
            getApp().event.emit("cartrefresh", !1, !1, !0);
        },
        toggleTarBarFixed: function(e) {
            this.setData({
                fixed: e.detail.fixed
            });
        }
    }
});