function t(t, n) {
    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function t(t, n) {
        for (var a = 0; a < n.length; a++) {
            var o = n[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(n, a, o) {
        return a && t(n.prototype, a), o && t(n, o), n;
    };
}(), a = Object.assign || function(t) {
    for (var n = 1; n < arguments.length; n++) {
        var a = arguments[n];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, o = function() {
    function t(t, n) {
        var a = [], o = !0, e = !1, r = void 0;
        try {
            for (var i, u = t[Symbol.iterator](); !(o = (i = u.next()).done) && (a.push(i.value), 
            !n || a.length !== n); o = !0) ;
        } catch (t) {
            e = !0, r = t;
        } finally {
            try {
                !o && u.return && u.return();
            } finally {
                if (e) throw r;
            }
        }
        return a;
    }
    return function(n, a) {
        if (Array.isArray(n)) return n;
        if (Symbol.iterator in Object(n)) return t(n, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = require("../../libs/promise.js"), r = require("../utils/api.js"), i = function(t) {
    var n = String(t.amount).split("."), a = o(n, 2), e = a[0], r = a[1], i = void 0 === r ? "0" : r;
    t.amountBody = e, t.amountTail = i;
}, u = function(t) {
    var n = String(t.reduce_amount).split("."), e = o(n, 2), r = e[0], i = e[1];
    return a({}, t, {
        amountBody: r,
        amountTail: void 0 === i ? "0" : i
    });
}, c = function() {
    function a() {
        t(this, a), this.data = {};
    }
    return n(a, [ {
        key: "reset",
        value: function() {
            this.data = {};
        }
    }, {
        key: "set",
        value: function(t, n, a) {
            this.data.hongbao = n.hongbao, this.data.merchant_coupon = n.merchant_coupon, this.data.sn = t.hongbao_sn, 
            this.data.merchant_coupon_id = a.merchant_coupon_id, this.data.hongbaoStatus = t.status, 
            this.data.hongbaoStatusText = t.status_text, this.data.validHongbaoCount = t.available_count;
        }
    }, {
        key: "select",
        value: function(t) {
            var n = {
                sn: t && t.sn ? t.sn : "",
                merchant_coupon_id: t && 2 === t.promotion_type && t.id ? t.id : "",
                notUse: !t,
                promotion_type: t && t.promotion_type
            };
            Object.assign(this.data, n);
        }
    }, {
        key: "load",
        value: function(t) {
            var n = this;
            t.userId, t.SID;
            return new e(function(t, a) {
                r.getHongbaos().then(function(a) {
                    a.data.forEach(function(t) {
                        i(t), t.limit_map && (t.limits = Object.keys(t.limit_map).map(function(n) {
                            return t.limit_map[n];
                        }));
                    }), n.data.hongbaos = a.data, t(n.data);
                }).catch(function(t) {
                    a();
                });
            });
        }
    }, {
        key: "loadCoupon",
        value: function(t) {
            var n = this;
            t.userId, t.SID;
            return new e(function(t, a) {
                r.getCoupons().then(function(a) {
                    n.data.coupons = a.data.map(function(t) {
                        return u(t);
                    }), t(n.data);
                }).catch(function(t) {
                    a();
                });
            });
        }
    }, {
        key: "load4Cart",
        value: function(t) {
            var n = this, a = t.cartId, o = t.sig;
            t.SID;
            return new e(function(t, e) {
                r.getHongbaosForCart(a, {
                    sig: o
                }).then(function(a) {
                    a.data.available.forEach(function(t) {
                        i(t), t.isValid = !0, t.selectable = !0;
                    }), a.data.unavailable.forEach(function(t) {
                        i(t), t.isInvalid = !0;
                    }), n.data.hongbaos = [].concat(a.data.available, a.data.unavailable), t(n.data);
                }).catch(function(t) {
                    e();
                });
            });
        }
    }, {
        key: "getNearestShop",
        value: function(t, n, a) {
            return r.getNearestShop(t, n, a).then(function(t) {
                return e.resolve(t.data);
            });
        }
    }, {
        key: "loadSync",
        value: function() {
            return this.data;
        }
    } ]), a;
}();

module.exports = c;