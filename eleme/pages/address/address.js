var e = function() {
    function e(e, s) {
        var t = [], d = !0, a = !1, r = void 0;
        try {
            for (var i, n = e[Symbol.iterator](); !(d = (i = n.next()).done) && (t.push(i.value), 
            !s || t.length !== s); d = !0) ;
        } catch (e) {
            a = !0, r = e;
        } finally {
            try {
                !d && n.return && n.return();
            } finally {
                if (a) throw r;
            }
        }
        return t;
    }
    return function(s, t) {
        if (Array.isArray(s)) return s;
        if (Symbol.iterator in Object(s)) return e(s, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), s = getApp(), t = s.services, d = t.User, a = t.Cart, r = t.Ubt, i = t.imageHash, n = t.Geohash, o = t.AliLog, c = a.address, l = !1, h = {
    data: {
        imageHash: i,
        viewMode: "list",
        fromCheckout: !1,
        address: {
            name: "",
            sex: 0,
            phone: "",
            address: "",
            address_detail: "",
            poi_type: 0
        },
        loaded: !1
    },
    loadUserAddress: function() {
        var e = this;
        c.load({
            SID: d.SID,
            userId: d.id
        }).then(function(t) {
            e.data.loaded = !0, e.setData(s.extend([ t, e.data ]));
        });
    },
    loadOrderAddress: function() {
        var e = this;
        a.loadAddress(d.SID).then(function(s) {
            var t = s.availableAddresses, d = s.unavailableAddresses, a = s.address;
            e.setData({
                address: a,
                availableAddresses: t,
                unavailableAddresses: d,
                loaded: !0
            });
        });
    },
    initAddressesData: function() {
        var e = getCurrentPages().splice(-2, 1)[0];
        e && /pages\/checkout\//.test(e.__route__) ? (this.setData({
            fromCheckout: !0
        }), this.loadOrderAddress()) : e && /pages\/location\//.test(e.__route__) ? (this.setData({
            fromLocation: !0
        }), this.showAddAddress()) : this.loadUserAddress();
    },
    onShow: function() {
        "list" === this.data.viewMode && this.initAddressesData(), r.sendPv(), o.sendPv();
    },
    editAddress: function(e) {
        c.edit(this.data.addresses[e.currentTarget.dataset.index]), wx.navigateTo({
            url: "/pages/address/edit/index"
        });
    },
    goToAddAddress: function() {
        wx.navigateTo({
            url: "/pages/address/add/index"
        });
    },
    showAddAddress: function() {
        this.setData({
            viewMode: "add",
            address: {
                name: "",
                sex: 0,
                phone: "",
                address: "",
                address_detail: "",
                poi_type: 0
            }
        }), wx.setNavigationBarTitle({
            title: "新增地址"
        });
    },
    confirmAddAddress: function() {
        var e = this;
        l || (l = !0, c.add(d, this.data.address).then(function() {
            l = !1, e.data.fromLocation ? e.confirmAddAddressFromLocation(e.data.address) : e.showAddressList();
        }).catch(function() {
            return l = !1;
        }));
    },
    showAddressList: function() {
        this.setData({
            viewMode: "list",
            address: {
                name: "",
                sex: 0,
                phone: "",
                address: "",
                address_detail: "",
                poi_type: 0
            }
        }), this.initAddressesData();
    },
    showEditAddress: function(e) {
        this.setData({
            viewMode: "edit",
            address: this.data.addresses[e.currentTarget.dataset.index]
        });
    },
    removeAddress: function() {
        var e = this;
        wx.showModal({
            title: "删除地址",
            content: "确定删除该收货地址吗？",
            cancelColor: "#666",
            confirmColor: "#666",
            success: function(s) {
                s.confirm && c.remove(d, e.data.address).then(function() {
                    e.showAddressList();
                }, function(e) {
                    wx.showModal({
                        title: "删除地址失败",
                        content: "请稍后再试"
                    });
                });
            }
        });
    },
    confirmEditAddress: function() {
        var e = this;
        l || (l = !0, c.update(d, this.data.address).then(function() {
            l = !1, e.showAddressList();
        }).catch(function() {
            return l = !1;
        }));
    },
    selectAddress: function(e) {
        c.select(this.data.availableAddresses[e.currentTarget.dataset.index]), wx.navigateBack();
    },
    showEditAvailableAddress: function(e) {
        this.setData({
            viewMode: "edit",
            address: this.data.availableAddresses[e.currentTarget.dataset.index]
        });
    },
    showEditUnavailableAddress: function(e) {
        this.setData({
            viewMode: "edit",
            address: this.data.unavailableAddresses[e.currentTarget.dataset.index]
        });
    },
    confirmAddAddressFromLocation: function(s) {
        var t = n.decode(s.geohash || s.st_geohash), d = e(t, 2), a = d[0], r = d[1], i = {
            geohash: s.st_geohash,
            latitude: a,
            longitude: r,
            address: s.address + s.address_detail,
            name: s.address
        };
        wx.setStorageSync("FROM_LOCATION_BACK", !0), wx.setStorage({
            key: "PLACE",
            data: i,
            success: function() {
                wx.navigateBack({
                    delta: 2
                });
            },
            fail: function(e) {
                console.log("addUserAddress err::", e);
            }
        });
    }
};

Page(s.extend([ {}, h, require("./templates/add-or-edit-address-panel/index.js") ]));