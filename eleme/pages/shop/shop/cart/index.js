function t(t, e) {
    if (!e || !e.length) return !1;
    var i = t.groups[0].entities, a = e.reduce(function(t, e) {
        return t.concat(e.specfoods);
    }, []).map(function(t) {
        return t.food_id || t.sku_id;
    });
    return i.some(function(t) {
        return -1 !== a.indexOf(t.id || t.sku_id);
    });
}

var e = function() {
    function t(t, e) {
        var i = [], a = !0, n = !1, r = void 0;
        try {
            for (var s, o = t[Symbol.iterator](); !(a = (s = o.next()).done) && (i.push(s.value), 
            !e || i.length !== e); a = !0) ;
        } catch (t) {
            n = !0, r = t;
        } finally {
            try {
                !a && o.return && o.return();
            } finally {
                if (n) throw r;
            }
        }
        return i;
    }
    return function(e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), i = require("../../../../libs/get-delivery-info.js").default, a = (require("../../../../common/utils/util").maybeToFixed, 
getApp().services), n = a.Ubt, r = (a.webCart, a.User), s = a.Cart, o = require("./createEntity.js").default;

module.exports = {
    setCart: function() {
        var t = this.data, e = t.cart, a = t.shop, n = t.promotion_food;
        if (e.from = n, !e.isNewRetail) {
            e.packingFee = +e.groups[0].entities.reduce(function(t, e) {
                return t + e.quantity * e.packing_fee;
            }, 0).toFixed(1);
            var r = i(a.piecewise_agent_fee, e.originalTotal);
            r.deliveryText = r.deliveryText.replace(/&yen;/g, "¥"), e.deliveryInfo = r, e.agio = +(r.minimumOrderAmount - e.originalTotal).toFixed(2);
        }
        return e;
    },
    initCart: function() {
        var t = this.data, e = t.cart, i = t.foodsAddedToCart, a = t.menu.reduce(function(t, e) {
            return t.concat(e.foods);
        }, []);
        i = {}, e.groups[0].entities.forEach(function(t) {
            var e = t.item_id, n = void 0;
            e ? n = a.find(function(t) {
                return t.item_id === e;
            }) || {} : (n = a.reduce(function(t, e) {
                return t.concat(e.specfoods);
            }, []).find(function(e) {
                return e.sku_id === t.sku_id || e.food_id === t.id;
            }) || {}, e = n.item_id), [ e, n.category_id ].forEach(function(e) {
                i[e] = {
                    quantity: (i[e] || {
                        quantity: 0
                    }).quantity + t.quantity
                };
            }), t.fullAttrs = t.specs.concat(t.attrs);
        }), e = this.setCart(), this.setData({
            cart: e,
            foodsAddedToCart: i
        }), this.updateNeedEssential();
    },
    addToCart: function() {
        var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).target, i = arguments[1];
        if (this.data.isShopAvaiable) {
            this.hideFoodModal();
            var a = this.data.cart;
            if (a.isNewRetail) a.add(t, i); else {
                var n = i || t.dataset.entity, r = n.min_purchase || 1, s = t.dataset.fromCart, d = o(n, 0, a, s), c = e(d.entities, 1)[0];
                c.activity = d.activity;
                var u = c.quantity, l = c.extra;
                1 !== r && (l.minPurchase = r);
                var h = u < r ? r : u + 1, f = a.setEntity(c, h, 0, l).activityAction;
                "EXCEED_FOOD_ACTIVITY_LIMIT_TIP" === f && wx.showToast({
                    title: "该美食限" + d.activity.applicable_quantity + "份优惠，超过以原价计算哦"
                }), "EXCEED_RESTAURANT_ACTIVITY_LIMIT_TIP" === f && wx.showToast({
                    title: "每单限" + a.maxDiscountQuantity + "份优惠，已为您选择最大优惠"
                }), this.initCart();
            }
        }
    },
    rmFromCart: function(t) {
        var i = this, a = t.target, n = this.data.cart;
        if (n.isNewRetail) n.addOnceListener(function() {
            0 !== n.quantity || i.data.isCartFolded || i.setData({
                isCartFolded: !0
            });
        }), n.remove(a); else {
            var r = a.dataset.entity;
            if (!r.fullAttrs && (r.specifications && r.specifications.length || r.attrs.length)) return void wx.showModal({
                content: "多规格商品只能去购物车删除哦",
                showCancel: !1
            });
            var s = a.dataset.fromCart, d = o(r, 0, n, s), c = e(d.entities, 1)[0], u = r.min_purchase || (c.extra || {}).minPurchase || 1;
            c.activity = d.activity;
            var l = c.quantity, h = c.extra, f = l <= u ? 0 : l - 1, p = (n.setEntity(c, f, 0, h).activityAction, 
            this.data.menu.reduce(function(t, e) {
                return t.concat(e.foods);
            }, []).filter(function(t) {
                return t.item_id === r.item_id;
            })[0] || {});
            r.category_id = p.category_id, this.initCart(), 0 !== n.quantity || this.data.isCartFolded || this.setData({
                isCartFolded: !0
            });
        }
    },
    emptyCart: function() {
        var t = this, e = function() {
            var e = t.data.cart;
            e.isNewRetail ? (e.clearCart(), t.setData({
                isCartFolded: !0,
                foodsAddedToCart: {}
            })) : (t.data.cart.clearCart(), t.setCart(), t.setData({
                cart: t.data.cart,
                isCartFolded: !0,
                foodsAddedToCart: {}
            }), t.updateNeedEssential(), t.data.cart.clearCart(), t.setCart(), t.setData({
                cart: t.data.cart,
                isCartFolded: !0,
                foodsAddedToCart: {}
            }));
        };
        !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0] ? wx.showModal({
            title: "清空购物车？",
            confirmColor: "#0097ff",
            content: "",
            confirmText: "清空",
            success: function(t) {
                t.confirm && e();
            }
        }) : e();
    },
    onFooterTap: function(t) {
        t.target;
        0 !== this.data.cart.quantity && this.toggleCart();
    },
    checkout: function() {
        var t = this;
        if (this.data.isShopAvaiable) if (this.data.fromShopSpell) this.checkoutAction(); else {
            var e = wx.getStorageSync("SPELL") || {}, i = this.data.restaurant_id;
            if (e && e[i]) {
                var a = e[i], r = a.cartId, s = a.sig, o = a.initiator;
                wx.showModal({
                    title: "确定去结算?",
                    content: "您有拼单正在进行中，去结算将单独下单～",
                    cancelText: "继续拼单",
                    confirmText: "去结算",
                    success: function(e) {
                        e.confirm ? (n.sendEvent({
                            id: "101877",
                            params: {
                                restaurant_id: i
                            }
                        }), t.checkoutAction()) : e.cancel && (n.sendEvent({
                            id: "101878",
                            params: {
                                restaurant_id: i
                            }
                        }), wx.navigateTo({
                            url: "/pages/spell/index?cartId=" + r + "&sig=" + s + "&id=" + i + "&initiator=" + o
                        }));
                    }
                });
            } else this.checkoutAction();
        }
    },
    checkoutAction: function() {
        0 !== this.data.cart.quantity && this.data.fromShopSpell ? this.pickToSpell() : !this.data.needEssential && this.data.cart.agio <= 0 && this.doCheckout();
    },
    doCheckout: function() {
        this.data.cart.isNewRetail ? s.save(this.data.cart.saveLocal(), this.data.promotion_food) : s.save(this.data.shop.id, this.data.promotion_food);
        var t = "/pages/checkout/index/index";
        r.id || (t = "/pages/auth/index?successUrl=" + t), wx.navigateTo({
            url: t
        });
    },
    toggleCart: function() {
        this.data.fromSpell || this.setData({
            isCartFolded: !this.data.isCartFolded
        });
    },
    closeKaTip: function() {
        this.setData({
            fromKA: !1
        });
    },
    goEssential: function() {
        -1 !== this.essentialIndex && this.changeCategory({
            currentTarget: {
                dataset: {
                    id: this.data.menu[this.essentialIndex].id,
                    value: "menu-" + this.essentialIndex,
                    index: this.essentialIndex
                }
            }
        });
    },
    updateNeedEssential: function() {
        var t = -1 !== this.essentialIndex && !this.checkEssentialInCart() && !this.checkIndependentOnly(), e = +(this.data.activeMenuCategory.id.match(/menu-(\d+)$/)[1] || 0), i = t && this.essentialIndex !== e && this.independentIndex !== e;
        this.setData({
            needEssential: t,
            showEssentailTip: i
        });
    },
    checkEssentialInCart: function() {
        return -1 !== this.essentialIndex && t(this.data.cart, this.data.menu[this.essentialIndex].foods);
    },
    checkIndependentOnly: function() {
        if (-1 === this.independentIndex) return !1;
        var t = this.data.cart.groups[0].entities;
        if (!t.length) return !1;
        var e = this.data.menu[this.independentIndex].foods.reduce(function(t, e) {
            return t.concat(e.specfoods);
        }, []).map(function(t) {
            return t.food_id || t.sku_id;
        });
        return t.every(function(t) {
            return -1 !== e.indexOf(t.id || t.sku_id);
        });
    }
};