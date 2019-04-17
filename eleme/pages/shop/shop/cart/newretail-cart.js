function t(t) {
    if (Array.isArray(t)) {
        for (var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i];
        return e;
    }
    return Array.from(t);
}

function i(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

function e(t) {
    var i = t.shopid, e = t.itemid, n = t.operation, a = t.ext;
    return h.then(function(t) {
        var s = {
            user_id: o.id,
            shop_id: i,
            products: e ? JSON.stringify([ {
                product_id: e
            } ]) : "",
            si_id: e,
            o_type: n,
            noorder: 1
        };
        return a && Object.assign(s, a), Object.assign(s, t), d({
            url: r + "/cart/eleme/upccart",
            data: s,
            header: {
                cookie: "SID=" + o.SID
            }
        });
    });
}

var n = function() {
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
}(), r = require("../../../../common/services/hosts").apiNewRetailHost, a = getApp().services, o = a.User, s = a.ApiCreater, u = a.Location, c = require("./uuid"), d = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return s(t, i).then(function(t) {
        var i = t.data, e = t.statusCode;
        return e >= 400 || e < 200 ? (console.error(i), null) : i;
    });
}, p = function() {
    function t() {
        i(this, t), this.cache = {};
    }
    return n(t, [ {
        key: "open",
        value: function(t, i) {
            var e = t.info.id, n = this.cache[e];
            return n || (n = this.cache[e] = new l(e, t.info.ele_id)), "function" == typeof i && (n.onUpdate = [ i ]), 
            n;
        }
    } ]), t;
}(), h = Promise.all([ u(), function() {
    var t = wx.getStorageSync("FAKE_DEVICE_INFO");
    if (t) try {
        t = JSON.parse(t);
    } catch (i) {
        t = null;
    }
    if (!t) {
        var i = wx.getSystemInfoSync();
        t = {
            cuid: c().replace(/-/g, "").toUpperCase() + "|" + Date.now(),
            sv: "1.0",
            channel: "wechat",
            from: "wechat",
            os: "wechat",
            model: i.model,
            screen: i.windowWidth * i.pixelRatio + "*" + i.windowHeight * i.pixelRatio
        }, wx.setStorageSync("FAKE_DEVICE_INFO", JSON.stringify(t));
    }
    return Promise.resolve(t);
}() ]).then(function(t) {
    return t = Object.assign({}, t[0], t[1]), t.lat = t.latitude, t.lng = t.longitude, 
    t;
}), l = function() {
    function t(e, n) {
        i(this, t), this.eleid = n, this.shopid = e, this.onUpdate = [], this.isNewRetail = !0, 
        this.quantity = 0, this.originalTotal = 0, this.agio = 100, this.groups = [ new f(this) ], 
        this.packingFee = 0, this.quantity = 0, this.discountTotal = 0, this.originalTotal = 0, 
        this.maxDiscountQuantity = -1, this.quantityMap = {}, this.upcCart({
            shopid: e,
            operation: "itemlist"
        });
    }
    return n(t, [ {
        key: "notifyUpdate",
        value: function() {
            this.onUpdate = this.onUpdate.filter(function(t) {
                return t(), !t.once;
            });
        }
    }, {
        key: "addListener",
        value: function(t, i) {
            t.once = !!i, this.onUpdate.push(t);
        }
    }, {
        key: "addOnceListener",
        value: function(t) {
            this.addListener(t, !0);
        }
    }, {
        key: "upcCart",
        value: function(t) {
            var i = this;
            return e(t).then(function(t) {
                if (t.error_msg) wx.showToast({
                    title: t.error_msg
                }); else {
                    var e = t.result;
                    i.groups[0].update(e), i.packingFee = e.package_price, i.quantity = e.number, i.discountTotal = e.current_price, 
                    i.originalTotal = e.origin_price, i.deliveryInfo = {
                        price: e.delivery_price,
                        deliveryText: "配送费¥" + e.delivery_price
                    }, i.agio = e.diff_takeout_price, i.notifyUpdate(), i.quantityMap = {};
                    var n = function(t) {
                        i.quantityMap[t.item_id] = t.num;
                    };
                    e.item_list.forEach(n), e.suit_list.forEach(function(t) {
                        t.item_list.forEach(n);
                    });
                }
            });
        }
    }, {
        key: "clearCart",
        value: function() {
            this.upcCart({
                shopid: this.shopid,
                operation: "clear"
            });
        }
    }, {
        key: "setEntity",
        value: function(t, i, e, n, r) {
            var a = (t.dataset.entity || r).item_id;
            this.upcCart({
                shopid: this.shopid,
                itemid: a,
                operation: "modify",
                ext: {
                    num: i
                }
            });
        }
    }, {
        key: "add",
        value: function(t, i) {
            var e = (i = t.dataset.entity || i).item_id, n = this.quantityMap[e] || 0;
            n++, this.upcCart({
                shopid: this.shopid,
                itemid: e,
                operation: "modify",
                ext: {
                    num: n
                }
            });
        }
    }, {
        key: "remove",
        value: function(t, i) {
            var e = (i = t.dataset.entity || i).item_id, n = this.quantityMap[e] || 0;
            --n < 0 || this.upcCart({
                shopid: this.shopid,
                itemid: e,
                operation: "modify",
                ext: {
                    num: n
                }
            });
        }
    }, {
        key: "saveLocal",
        value: function() {
            var t = wx.getStorageSync("CART_MAP");
            try {
                t = JSON.parse(t);
            } catch (i) {
                t = {};
            }
            return t[this.eleid] = [ {
                entities: this.groups[0].entities.map(function(t) {
                    return {
                        id: "0",
                        sku_id: t.sku_id,
                        quantity: t.quantity
                    };
                }),
                maxDiscountQuantity: -1
            } ], wx.setStorageSync("CART_MAP", JSON.stringify(t)), this.eleid;
        }
    } ]), t;
}(), f = function() {
    function e() {
        i(this, e), this.entities = [];
    }
    return n(e, [ {
        key: "findById",
        value: function() {}
    }, {
        key: "update",
        value: function(i) {
            var e;
            this.entities = (e = []).concat.apply(e, [ i.item_list ].concat(t(i.suit_list.map(function(t) {
                return t.item_list;
            })))).map(function(t) {
                return {
                    id: "0",
                    sku_id: t.item_id,
                    item_id: t.item_id,
                    quantity: t.num,
                    name: t.name,
                    price: t.c_price,
                    original_price: t.o_price,
                    stock: t.left_num,
                    packing_fee: 0,
                    specs: [],
                    attrs: [],
                    weight: t.weight,
                    extra: [],
                    view_discount_price: t.c_price,
                    view_original_price: t.o_price,
                    fullAttrs: []
                };
            });
        }
    } ]), e;
}();

module.exports = new p();