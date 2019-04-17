function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

module.exports = {
    showSpecModal: function(e) {
        var a = e.target;
        if (this.data.isShopAvaiable) {
            this.hideFoodModal();
            var i = a.dataset.entity, c = i.specifications.reduce(function(e, a) {
                return Object.assign(e, t({}, a.name, a.values[0]));
            }, {}), s = i.attrs.reduce(function(e, a) {
                return Object.assign(e, t({}, a.name, a.values[0]));
            }, {});
            this.setData({
                isModalHide: !1,
                food4Modal: i,
                activeSpec: c,
                activeAttr: s,
                specScrollTop: 0
            }), this.selectSpec(void 0, !0);
        }
    },
    hideSpecModal: function() {
        this.setData({
            isModalHide: !0,
            activeSpec: {},
            activeSpecFood: {},
            activeAttr: {}
        });
    },
    selectSpec: function() {
        var e = this, a = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).target;
        if (!(arguments.length > 1 && void 0 !== arguments[1] && arguments[1])) {
            var i = a.dataset, c = i.specName, s = i.specValue;
            this.setData({
                activeSpec: Object.assign({}, this.data.activeSpec, t({}, c, s))
            });
        }
        var r = this.data.food4Modal, n = r.specfoods.find(function(a) {
            var i = a.specs.reduce(function(e, a) {
                return Object.assign(e, t({}, a.name, a.value));
            }, {});
            return JSON.stringify(i) === JSON.stringify(e.data.activeSpec);
        });
        n && (n.category_id = r.category_id, n.min_purchase = r.min_purchase), this.setData({
            activeSpecFood: n || {}
        });
    },
    selectAttr: function() {
        var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).target.dataset, a = e.attrName, i = e.attrValue;
        this.setData({
            activeAttr: Object.assign({}, this.data.activeAttr, t({}, a, i))
        });
    },
    addToCartFromSpecModal: function(t) {
        var e = this, a = (t.target, this.data), i = a.activeSpecFood, c = a.cart;
        if (!(i.stock < i.min_purchase) && 0 !== Object.keys(i).length) {
            i.attrs = Object.keys(this.data.activeAttr).map(function(t) {
                return {
                    name: t,
                    value: e.data.activeAttr[t]
                };
            });
            var s = (c.groups[0].find(i) || {}).quantity || 0, r = i.min_purchase || 1, n = s < r ? r : s + 1, o = {};
            1 !== r && (o.minPurchase = r), c.setEntity(i, n, 0, o), this.initCart(), this.hideSpecModal();
        }
    }
};