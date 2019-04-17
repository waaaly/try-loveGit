var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(i, e) {
    "object" == ("undefined" == typeof exports ? "undefined" : t(exports)) && "object" == ("undefined" == typeof module ? "undefined" : t(module)) ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == ("undefined" == typeof exports ? "undefined" : t(exports)) ? exports.WebCart = e() : i.WebCart = e();
}(void 0, function() {
    return function(t) {
        function i(n) {
            if (e[n]) return e[n].exports;
            var r = e[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return t[n].call(r.exports, r, r.exports, i), r.loaded = !0, r.exports;
        }
        var e = {};
        return i.m = t, i.c = e, i.p = "", i(0);
    }([ function(t, i, e) {
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.Cart = i.Group = i.Entity = void 0;
        var r = n(e(2)), a = n(e(3)), u = n(e(4));
        i.Entity = r.default, i.Group = a.default, i.Cart = u.default, i.default = u.default;
    }, function(t, i) {
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.default = function(t) {
            return +t.toFixed(2);
        };
    }, function(t, i, e) {
        function n(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
        }
        var r = function() {
            function t(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            return function(i, e, n) {
                return e && t(i.prototype, e), n && t(i, n), i;
            };
        }();
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(e(1)), u = function() {
            function t() {
                var i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], e = arguments.length <= 1 || void 0 === arguments[1] ? 1 : arguments[1], r = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2];
                n(this, t), (i.food_id || i.id) && (this.id = i.food_id || i.id), i.sku_id && (this.sku_id = i.sku_id), 
                this.item_id = i.item_id, this.quantity = e, this.name = i.name, this.price = i.price, 
                this.original_price = i.original_price, this.packing_fee = i.packing_fee, this.stock = i.stock || 0, 
                this.specs = i.specs || [], this.attrs = i.attrs || [], i.hasOwnProperty("weight") && (this.weight = i.weight), 
                i.activity && (this.activity = i.activity), this.extra = r || {}, this.foodActivityLimit();
            }
            return r(t, [ {
                key: "set",
                value: function(t) {
                    var i = parseInt(t, 10);
                    return i || 0 === i ? (this.quantity = 0 > i ? 1 : i, {
                        quantity: this.quantity,
                        action: this.foodActivityLimit()
                    }) : this.quantity;
                }
            }, {
                key: "updateData",
                value: function(t, i) {
                    var e = {
                        name: t.name,
                        original_price: t.original_price,
                        price: t.price,
                        stock: t.stock,
                        packing_fee: t.packing_fee,
                        specs: t.specs,
                        weight: t.weight,
                        attrs: t.attrs,
                        extra: i
                    };
                    for (var n in e) {
                        var r = e[n];
                        this[n] = void 0 === r ? this[n] : r;
                    }
                    return this.foodActivityLimit(), this;
                }
            }, {
                key: "foodActivityLimit",
                value: function() {
                    if (this.view_original_price = this.view_discount_price = (0, a.default)((this.original_price || this.price) * this.quantity), 
                    this.activity) {
                        var t = this.activity, i = t.applicable_quantity, e = t.quantity_condition, n = this.price, r = this.original_price, u = this.quantity, o = Math.floor(u / e), s = Math.min(o, i);
                        this.view_discount_quantity = s;
                        var c = s * n, f = (u - s) * r;
                        return this.view_discount_price = (0, a.default)(c + f), o - i == 1 ? "EXCEED_FOOD_ACTIVITY_LIMIT_TIP" : "EXCEED_FOOD_ACTIVITY_LIMIT";
                    }
                }
            } ]), t;
        }();
        i.default = u;
    }, function(t, i, e) {
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function r(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
        }
        var a = function() {
            function t(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            return function(i, e, n) {
                return e && t(i.prototype, e), n && t(i, n), i;
            };
        }();
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var u = n(e(2)), o = n(e(1)), s = function() {
            function t() {
                var i = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0], e = arguments[1];
                r(this, t), this.entities = i.map(function(t) {
                    var i = t.quantity, e = t.extra;
                    return new u.default(t, i, e);
                }), this.maxDiscountQuantity = e, this.restaurantActivityLimit();
            }
            return a(t, [ {
                key: "findById",
                value: function(t) {
                    return this.entities.filter(function(i) {
                        var e = t.sku_id ? "sku_id" : "id";
                        return t[e] === i[e];
                    });
                }
            }, {
                key: "find",
                value: function(t) {
                    var i = this.findById(t);
                    return t.attrs && Array.isArray(t.attrs) ? (i = i.filter(function(i) {
                        return t.attrs.every(function(t, e) {
                            var n = i.attrs[e];
                            return !!n && t.value === n.value;
                        });
                    }))[0] : i[0];
                }
            }, {
                key: "getQuantityById",
                value: function(t) {
                    return this.findById(t).reduce(function(t, i) {
                        return t + i.quantity;
                    }, 0);
                }
            }, {
                key: "getQuantityByIdAndAttrs",
                value: function(t) {
                    return this.find(t).quantity;
                }
            }, {
                key: "set",
                value: function(t, i) {
                    var e = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2], n = this.find(t);
                    n ? n.updateData(t, e) : (n = new u.default(t, 0, e), this.entities.push(n));
                    var r = n.quantity, a = n.set(i), o = a.quantity;
                    if (0 >= o) return this.entities.splice(this.entities.indexOf(n), 1), {
                        entity: n,
                        action: "ENTITY_DESTROY"
                    };
                    var s = this.restaurantActivityLimit(n) || a.action || "", c = "";
                    return c = 0 === r ? "ENTITY_CREATE" : o > r ? "ENTITY_ADD" : "ENTITY_SUB", {
                        entity: n,
                        action: c,
                        activityAction: s
                    };
                }
            }, {
                key: "restaurantActivityLimit",
                value: function() {
                    var t = this, i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                    if (-1 !== this.maxDiscountQuantity) {
                        var e = this.entities.filter(function(t) {
                            return t.activity;
                        }), n = e.reduce(function(t, i) {
                            return t + i.view_discount_quantity;
                        }, 0);
                        if (!(n <= this.maxDiscountQuantity)) {
                            e.sort(function(t, i) {
                                var e = t.original_price - t.price;
                                return i.original_price - i.price - e;
                            });
                            var r = 0;
                            if (e.forEach(function(i, e) {
                                !function(i) {
                                    if (r >= t.maxDiscountQuantity) return i.view_discount_price = (0, o.default)(i.original_price * i.quantity);
                                    if (i.quantity + r >= t.maxDiscountQuantity) {
                                        var e = t.maxDiscountQuantity - r;
                                        r += e, i.view_discount_price = (0, o.default)(i.price * e + (i.quantity - e) * i.original_price);
                                    } else r += i.quantity;
                                }(i);
                            }), i.activity) return n - this.maxDiscountQuantity == 1 ? "EXCEED_RESTAURANT_ACTIVITY_LIMIT_TIP" : "EXCEED_RESTAURANT_ACTIVITY_LIMIT";
                        }
                    }
                }
            } ]), t;
        }();
        i.default = s;
    }, function(t, i, e) {
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function r(t) {
            if (Array.isArray(t)) {
                for (var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i];
                return e;
            }
            return Array.from(t);
        }
        function a(t, i) {
            if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
        }
        var u = function() {
            function t(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            return function(i, e, n) {
                return e && t(i.prototype, e), n && t(i, n), i;
            };
        }();
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = n(e(3)), s = n(e(1)), c = "CART_MAP", f = function() {
            return "undefined" != typeof localStorage ? localStorage.getItem(c) : "undefined" != typeof wx ? wx.getStorageSync(c) : {};
        }, l = function() {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], i = JSON.stringify(t);
            return "undefined" != typeof localStorage ? localStorage.setItem(c, i) : "undefined" != typeof wx ? wx.setStorageSync(c, i) : {};
        }, d = function() {
            function t(i) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? -1 : arguments[1];
                a(this, t), this.restaurant_id = i, this.cartMap = {}, this.groups = [], this.quantity = 0, 
                this.total = 0, this.maxDiscountQuantity = e, this.load(), this.count();
            }
            return u(t, [ {
                key: "loadCartMap",
                value: function() {
                    var t = f();
                    if (t) try {
                        this.cartMap = JSON.parse(t);
                    } catch (t) {
                        console.error("CANNOT PARSE CART_MAP FROM LOCALSTORAGE.");
                    } else this.update([ new o.default() ]);
                }
            }, {
                key: "load",
                value: function() {
                    var t = this;
                    this.loadCartMap(), this.cartMap[this.restaurant_id] || this.update([ new o.default([], this.maxDiscountQuantity) ]), 
                    this.groups = this.cartMap[this.restaurant_id].map(function(i) {
                        return new o.default(i.entities, t.maxDiscountQuantity);
                    });
                }
            }, {
                key: "update",
                value: function(t) {
                    this.groups = t, this.cartMap[this.restaurant_id] = t, l(this.cartMap), this.count();
                }
            }, {
                key: "updateFromCartData",
                value: function(t) {
                    var i = t.map(function(t) {
                        return new o.default(t);
                    });
                    return this.loadCartMap(), this.update(i), this.groups;
                }
            }, {
                key: "count",
                value: function() {
                    var t, i = 0, e = 0, n = 0;
                    return (t = []).concat.apply(t, r(this.groups.map(function(t) {
                        return t.entities;
                    }))).forEach(function(t) {
                        i += t.quantity, e += t.view_discount_price + t.quantity * (t.packing_fee || 0), 
                        n += t.view_original_price + t.quantity * (t.packing_fee || 0);
                    }, 0), this.quantity = i, this.discountTotal = (0, s.default)(e), this.originalTotal = (0, 
                    s.default)(n), {
                        quantity: i,
                        discountTotal: e,
                        originalTotal: n
                    };
                }
            }, {
                key: "createGroup",
                value: function() {
                    var t = new o.default([], this.maxDiscountQuantity);
                    return this.loadCartMap(), this.update([].concat(r(this.groups), [ t ])), {
                        group: t,
                        action: "GROUP_CREATE"
                    };
                }
            }, {
                key: "removeGroup",
                value: function(t) {
                    var i = this.groups[t], e = this.groups.filter(function(i, e) {
                        return e !== t;
                    });
                    return this.loadCartMap(), this.update(e), {
                        group: i,
                        action: "GROUP_DESTROY"
                    };
                }
            }, {
                key: "clearGroup",
                value: function(t) {
                    var i = this.groups[t] = new o.default();
                    return this.loadCartMap(), this.update(this.groups), {
                        group: i,
                        action: "GROUP_CLEAR"
                    };
                }
            }, {
                key: "clearCart",
                value: function() {
                    return this.groups = [], {
                        group: this.createGroup().group,
                        action: "CART_CLEAR"
                    };
                }
            }, {
                key: "setEntity",
                value: function(t) {
                    var i = arguments.length <= 1 || void 0 === arguments[1] ? 1 : arguments[1], e = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2], n = arguments.length <= 3 || void 0 === arguments[3] ? {} : arguments[3], r = (this.groups[e] || this.clearCart().group).set(t, i, n), a = r.entity, u = r.action, o = r.activityAction;
                    return this.loadCartMap(), this.update(this.groups), {
                        entity: a,
                        action: u,
                        activityAction: o
                    };
                }
            } ]), t;
        }();
        i.default = d;
    } ]);
});