function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t, a = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var s = t[a];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, a, s) {
        return a && e(t.prototype, a), s && e(t, s), t;
    };
}(), s = require("../../libs/promise.js"), n = require("../../common/utils/api.js"), d = {
    1: "家",
    2: "学校",
    3: "公司"
}, o = !1, i = function() {
    function i() {
        e(this, i), this.data = {};
    }
    return a(i, [ {
        key: "reset",
        value: function() {
            this.data = {}, o = !1, t = void 0;
        }
    }, {
        key: "set",
        value: function(e) {
            this.select(e);
        }
    }, {
        key: "select",
        value: function(e) {
            this.data.address = e;
        }
    }, {
        key: "edit",
        value: function(e) {
            this.data.editingAddress = e;
        }
    }, {
        key: "add",
        value: function(e, t) {
            var a = this;
            return new s(function(e, s) {
                a.validate(t) ? (t.poi_type = 0, n.createAddress(t).then(function(s) {
                    a.data.addresses.push(t), 1 === a.data.addresses.length && (a.data.address = t), 
                    e();
                }).catch(function(e) {
                    wx.showModal({
                        title: e.data.message,
                        content: "",
                        showCancel: !1,
                        confirmColor: "#0097ff"
                    }), s();
                })) : s();
            });
        }
    }, {
        key: "remove",
        value: function(e, t) {
            return new s(function(e, a) {
                n.deleteAddress(t.id).then(function(t) {
                    200 == +t.statusCode ? e() : a();
                }).catch(function(e) {
                    a();
                });
            });
        }
    }, {
        key: "update",
        value: function(e, t) {
            var a = this;
            return t.geohash = t.st_geohash, new s(function(e, s) {
                a.validate(t) ? (t.poi_type = 0, n.updateAddress(t).then(function(t) {
                    200 == +t.statusCode ? e() : (wx.showModal({
                        title: t.data.message,
                        content: "",
                        showCancel: !1,
                        confirmColor: "#0097ff"
                    }), s());
                }).catch(function(e) {
                    s();
                })) : s();
            });
        }
    }, {
        key: "validate",
        value: function(e) {
            var t = e.name && e.phone && e.address && e.address_detail && /^1[2-9]\d{9}$/.test(e.phone);
            return t || this.validateMsg(e), t;
        }
    }, {
        key: "validateMsg",
        value: function(e) {
            e.name ? e.phone ? /^1[2-9]\d{9}$/.test(e.phone) ? e.address && e.address_detail || wx.showModal({
                title: "请填写收货地址",
                content: "",
                showCancel: !1,
                confirmColor: "#0097ff"
            }) : wx.showModal({
                title: "请检查手机号码格式是否有误",
                content: "",
                showCancel: !1,
                confirmColor: "#0097ff"
            }) : wx.showModal({
                title: "请填写联系电话",
                content: "",
                showCancel: !1,
                confirmColor: "#0097ff"
            }) : wx.showModal({
                title: "请填写联系人",
                content: "",
                showCancel: !1,
                confirmColor: "#0097ff"
            });
        }
    }, {
        key: "equal",
        value: function(e, t) {
            return e && t && e.id === t.id;
        }
    }, {
        key: "load",
        value: function() {
            var e = this, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, d = a.userId, i = a.SID;
            return o ? t : (o = !0, t = new s(function(t, a) {
                d && i ? n.getAddressList().then(function(s) {
                    200 == +s.statusCode ? (e.data.addresses = s.data, t(e.data)) : (404 != +s.statusCode && 401 != +s.statusCode || wx.redirectTo({
                        url: "/pages/auth/index"
                    }), a()), o = !1;
                }).catch(function(e) {
                    404 != +e.statusCode && 401 != +e.statusCode || wx.redirectTo({
                        url: "/pages/auth/index"
                    }), o = !1, a();
                }) : (o = !1, a());
            }));
        }
    }, {
        key: "load4Checkout",
        value: function() {
            var e = this, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = a.cartId, r = a.sig, u = a.SID;
            return o ? t : (o = !0, t = new s(function(t, a) {
                i && r && u ? n.getAddressesForCart(i, {
                    sig: r
                }).then(function(s) {
                    200 == +s.statusCode ? (e.data.addresses = s.data.map(function(e) {
                        return e.tag = d[e.tag_type], e;
                    }), e.data.availableAddresses = [], e.data.unavailableAddresses = [], e.data.addresses.forEach(function(t) {
                        t.is_deliverable ? e.data.availableAddresses.push(t) : e.data.unavailableAddresses.push(t);
                    }), e.data.address ? e.data.address = e.data.addresses.find(function(t) {
                        return e.data.address.id === t.id && t.is_deliverable;
                    }) : e.data.address = e.data.addresses.find(function(e) {
                        return e.is_user_default && e.is_deliverable;
                    }), 1 === e.data.availableAddresses.length && (e.data.address = e.data.availableAddresses[0]), 
                    t(e.data)) : (404 != +s.statusCode && 401 != +s.statusCode || wx.redirectTo({
                        url: "/pages/auth/index"
                    }), a()), o = !1;
                }).catch(function(e) {
                    404 != +e.statusCode && 401 != +e.statusCode || wx.redirectTo({
                        url: "/pages/auth/index"
                    }), o = !1, a();
                }) : (o = !1, a());
            }));
        }
    }, {
        key: "loadSync",
        value: function() {
            return this.data;
        }
    } ]), i;
}();

module.exports = i;