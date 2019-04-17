function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t;
    };
}(), a = require("../../libs/promise.js"), i = require("../../libs/base64.js"), n = require("../../dave/dave.js"), o = n.Ubt, r = n.User, d = n.Pay, s = require("../../common/utils/api.js"), c = require("../../libs/web-cart.js").default;

wx.getStorageSync("NEW_CART_MAP") || (wx.removeStorageSync("CART_MAP"), wx.setStorageSync("NEW_CART_MAP", !0));

var l, u = require("address.js"), h = require("deliveryTime.js"), _ = require("payMethod.js"), v = require("countPerson.js"), g = require("invoice.js"), y = require("remark.js"), S = require("hongbao.js"), f = !1, p = function() {
    function n() {
        e(this, n), this.data = {}, this.address = new u(), this.deliveryTime = new h(), 
        this.payMethod = new _(), this.hongbao = new S(), this.countPerson = new v(), this.invoice = new g(), 
        this.remark = new y();
    }
    return t(n, [ {
        key: "reset",
        value: function() {
            this.data = {}, this.address.reset(), this.deliveryTime.reset(), this.payMethod.reset(), 
            this.hongbao.reset(), this.countPerson.reset(), this.invoice.reset(), this.remark.reset();
        }
    }, {
        key: "set",
        value: function(e) {
            this.data = e;
        }
    }, {
        key: "pend",
        value: function() {
            return f ? l : new a(function(e, t) {
                return e();
            });
        }
    }, {
        key: "save",
        value: function(e, t) {
            wx.setStorage({
                key: "CURRENT_RESTAURANT_ID",
                data: e
            }), wx.setStorage({
                key: "CART_FROM_DATA",
                data: t
            });
        }
    }, {
        key: "getBasket",
        value: function() {
            var e = this.data.extra;
            return e.others.forEach(function(e) {
                e.price = e.price.toFixed(2);
            }), {
                foods: this.data.group.reduce(function(e, t) {
                    return e.concat(t);
                }, []),
                extra: e.others.filter(function(e) {
                    return e.price >= 0 && -1 === [ 2, 13 ].indexOf(e.category_id);
                }).concat(e.packing_fee || []),
                activities: e.others.filter(function(e) {
                    return e.price < 0 && -1 === [ 2, 13 ].indexOf(e.category_id);
                }),
                delivery: e.agent_fee,
                originalTotal: this.data.original_total,
                total: this.data.total,
                discount: this.data.discount_amount.toFixed(2) || 0,
                restaurantInfo: this.data.restaurant,
                hongbao: this.hongbao.loadSync()
            };
        }
    }, {
        key: "getCheckoutForm",
        value: function() {
            var e = r.union_id, t = wx.getStorageSync("CURRENT_RESTAURANT_ID"), a = new c(t).groups.map(function(e) {
                return e.entities;
            });
            if (a.forEach(function(e) {
                e.forEach(function(e) {
                    e.new_specs = e.specs, delete e.specs, delete e.view_discount_price, delete e.view_original_price;
                });
            }), !a || 0 === a.length || !a[0]) return null;
            var n = wx.getStorageSync("PLACE"), o = i.encode("net_type:WIFI latitude:" + n.latitude + " longitude::" + n.longitude), d = {
                come_from: "wechat_app",
                geohash: wx.getStorageSync("PLACE").geohash,
                entities: a,
                user_id: r.id,
                wechat_unionid: e,
                ua: "Rajax/1 Eleme/7.0 ID/" + e,
                device_info: o,
                device_id: e,
                hongbao_action: 1,
                merchant_coupon_action: 1,
                restaurant_id: t,
                sig: this.data.sig || "",
                address_id: this.address.loadSync().address ? this.address.loadSync().address.id : 0,
                paymethod_id: this.payMethod.loadSync().payMethod ? this.payMethod.loadSync().payMethod.id : 1,
                invoice: this.invoice.loadSync().invoice ? this.invoice.loadSync().invoice.invoice_pay_to : "",
                invoice_id: this.invoice.loadSync().invoice ? this.invoice.loadSync().invoice.id : 0,
                deliver_time: this.deliveryTime.loadSync().deliveryTime ? this.deliveryTime.loadSync().deliveryTime : "",
                number_of_meals: this.countPerson.loadSync().countPerson || "",
                description: this.remark.loadSync().remarksDescription || ""
            }, s = this.hongbao.loadSync(), l = s.notUse, u = s.sn, h = s.merchant_coupon_id, _ = s.promotion_type;
            return l ? (d.hongbao_action = 0, d.merchant_coupon_action = 0) : 1 === _ ? (d.merchant_coupon_action = 0, 
            d.hongbao_sn = u, d.merchant_coupon_id = "") : 2 === _ && (d.hongbao_action = 0, 
            d.merchant_coupon_id = h, d.hongbao_sn = ""), d;
        }
    }, {
        key: "clearRestaurantCache",
        value: function() {
            var e = void 0;
            try {
                e = JSON.parse(wx.getStorageSync("CART_MAP"));
            } catch (e) {
                console.log("PARSE ERROE");
            }
            var t = wx.getStorageSync("CURRENT_RESTAURANT_ID");
            e[t] && (delete e[t], wx.setStorage({
                key: "CART_MAP",
                data: e
            }));
        }
    }, {
        key: "clearSpellInfo",
        value: function() {
            var e = void 0;
            try {
                e = JSON.parse(wx.getStorageSync("CART_MAP"));
            } catch (e) {
                console.log("PARSE ERROE");
            }
            var t = wx.getStorageSync("CURRENT_RESTAURANT_ID") + "";
            if (t.indexOf("_")) {
                var a = t.split("_")[0];
                if (a) {
                    delete e[a + "_spell"], delete e[a + "_cart"];
                    var i = wx.getStorageSync("SPELL");
                    i[a] && (delete i[a], wx.setStorage({
                        key: "SPELL",
                        data: i
                    })), wx.setStorage({
                        key: "CART_MAP",
                        data: e
                    });
                }
            }
        }
    }, {
        key: "setOrderValidationCache",
        value: function(e) {
            wx.setStorage({
                key: "validation_token",
                data: e.validation_token
            }), wx.setStorage({
                key: "validation_type",
                data: e.validation_type
            }), wx.setStorage({
                key: "validation_phone",
                data: e.validation_phone
            });
        }
    }, {
        key: "loadOrderValidationCache",
        value: function() {
            return {
                validation_token: wx.getStorageSync("validation_token"),
                validation_type: wx.getStorageSync("validation_type"),
                validation_phone: wx.getStorageSync("validation_phone")
            };
        }
    }, {
        key: "clearOrderValidationCache",
        value: function() {
            wx.removeStorage({
                key: "validation_token"
            }), wx.removeStorage({
                key: "validation_type"
            }), wx.removeStorage({
                key: "validation_phone"
            });
        }
    }, {
        key: "checkout",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = (t.SID, 
            t.cartId), n = t.sig;
            return wx.showToast({
                icon: "loading",
                title: "正在更新订单",
                duration: 1 / 0
            }), f = !0, l = new a(function(t, a) {
                var o = e.getCheckoutForm();
                o ? (o.sig = n || "", (n ? s.spellCheckout(o, i) : s.checkout(o)).then(function(a) {
                    var i = a.data;
                    e.set(i.cart), e.data.sig = i.cart.sig, e.currentAddress = i.current_address, e.address.set(i.current_address), 
                    e.deliveryTime.set(i.cart.is_deliver_by_fengniao, i.cart.is_ontime_available, i.cart.deliver_time, i.delivery_reach_time, i.deliver_times), 
                    e.payMethod.set(i.pay_methods), e.hongbao.set(i.hongbao_info, i.cart.extra, i.merchant_coupon_info), 
                    e.countPerson.set(i.number_of_meals), e.invoice.set(i.invoice), f = !1, wx.hideToast(), 
                    t();
                }).catch(function(e) {
                    n || "SERVER_UNKNOWN_ERROR" !== e.data.name && (wx.showModal({
                        title: e.data.message || "服务器饿晕了，请您稍后再试",
                        content: "",
                        showCancel: !1,
                        success: wx.navigateBack
                    }), f = !1, wx.hideToast(), a());
                })) : a();
            });
        }
    }, {
        key: "makeOrder",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = t.userId, n = (t.SID, 
            t.code), r = t.token;
            if (f) return l;
            f = !0, wx.showToast({
                icon: "loading",
                title: "正在提交订单",
                duration: 1 / 0
            });
            var c = this.getCheckoutForm();
            return n && r && (c.validation_token = r, c.validation_code = n), c.cart_id = this.data.id, 
            c.user_id = i, new a(function(t, a) {
                s.makeOrder(c).then(function(a) {
                    var n = a.data, r = wx.getStorageSync("CART_FROM_DATA");
                    if (o.sendEvent({
                        id: "100253",
                        params: {
                            user_id: i,
                            order_id: n.unique_id,
                            restaurant_id: e.data.restaurant.id,
                            from: r
                        }
                    }), n.unique_id) {
                        wx.showToast({
                            title: "唤起支付中",
                            icon: "loading",
                            duration: 1e4
                        }), f = !1, -1 !== (wx.getStorageSync("CURRENT_RESTAURANT_ID") + "").indexOf("_") && e.clearSpellInfo();
                        var s = "/pages/order/detail/order-detail?id=" + n.unique_id;
                        d(n.unique_id, i).then(function() {
                            e.reset(), e.clearOrderValidationCache(), wx.redirectTo({
                                url: s + "&hongbao=true"
                            });
                        }).catch(function() {
                            return wx.redirectTo({
                                url: s
                            });
                        });
                    } else (n.need_login || n.need_validation) && (e.setOrderValidationCache(n), wx.redirectTo({
                        url: "/pages/auth/index?cartId=" + e.data.id + "&sig=" + e.data.sig + "&phone=" + n.validation_phone + "&token=" + n.validation_token + "&type=" + n.validation_type + "&successUrl=/pages/checkout/index/index"
                    }));
                    wx.hideToast(), f = !1, t();
                }).catch(function(t) {
                    var i = t.data;
                    /INVALID_CART/.test(i.name) && (i.message = "购物车已失效，请到订单中心确认是否已经成功下单"), wx.showModal({
                        title: "",
                        content: i.message,
                        showCancel: !1,
                        confirmColor: "#0097FF",
                        success: function() {
                            switch (i.name) {
                              case "INVALID_ADDRESS":
                                break;

                              case "INVALID_VALIDATE_CODE":
                                var t = e.loadOrderValidationCache(), a = t.validation_token, n = t.validation_type, o = t.validation_phone;
                                wx.redirectTo({
                                    url: "/pages/auth/index?cartId=" + e.data.id + "&sig=" + e.data.sig + "&phone=" + o + "&token=" + a + "&type=" + n + "&successUrl=/pages/checkout/index/index"
                                });
                                break;

                              case "RESTAURANT_UNAVAILABLE":
                                wx.navigateBack({
                                    delta: 2
                                });
                                break;

                              case "EMPTY_CART":
                              case "LESS_THAN_DELIVER_AMOUNT":
                                wx.navigateBack({
                                    delta: 1
                                });
                                break;

                              default:
                                wx.switchTab({
                                    url: "/pages/order/list/order-list"
                                });
                            }
                        }
                    }), wx.hideToast(), f = !1, a();
                });
            });
        }
    }, {
        key: "loadAddress",
        value: function(e) {
            var t = this;
            return e ? l.then(function() {
                return t.address.load4Checkout({
                    sig: t.data.sig,
                    cartId: t.data.id,
                    SID: e
                });
            }) : l.then(function() {
                return t.address.loadSync();
            });
        }
    }, {
        key: "loadHongbao",
        value: function(e) {
            return this.hongbao.load4Cart({
                cartId: this.data.id,
                sig: this.data.sig,
                SID: e
            });
        }
    }, {
        key: "loadRemarks",
        value: function() {
            return this.remark.load({
                sig: this.data.sig,
                cartId: this.data.id
            });
        }
    }, {
        key: "selectPayMethod",
        value: function(e) {
            0 === e.select_state && this.payMethod.select(e);
        }
    } ]), n;
}();

module.exports = p;