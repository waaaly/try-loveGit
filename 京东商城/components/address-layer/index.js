var e = require("../../bases/component"), s = function(e) {
    if (e && e.__esModule) return e;
    var s = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (s[t] = e[t]);
    return s.default = e, s;
}(require("../../common/user_info"));

new e.JDComponent({
    properties: {
        adid: String,
        areaid: String,
        addressList: Array,
        showAddressLayerFlag: {
            type: Boolean,
            value: !1,
            observer: "observeFlagChange"
        },
        isShowAddressLayer: Boolean,
        noDefault: Boolean,
        showAnim: Boolean,
        noCookie: Boolean
    },
    methods: {
        switchAddress: function(e) {
            var t = e.currentTarget.dataset, a = t.adid, o = t.idx, d = this.data.addressList[o];
            this.setData({
                adid: a
            }), d && s.updateAddress({
                addressId: d.adid,
                areaId: [ d.provinceId, d.cityId, d.countyId, d.townId ].join("_"),
                areaName: [ d.provinceName, d.cityName, d.countyName, d.townName ].join("_"),
                addressName: d.addrfull,
                coordinate: [ d.type, d.longitude, d.latitude ].join(",")
            }), this.triggerEvent("switchAddress", a), this.closeAddress();
        },
        closeAddress: function(e) {
            this.triggerEvent("closeAddress");
        },
        gotoSelectNewAddress: function() {
            var e = this.data, s = e.areaid, t = e.noDefault, a = e.noCookie, o = s;
            this.$goto("/pages/item/subPackages/address/address", {
                addr_id_str: o,
                noDefault: t,
                noCookie: a
            }, "navigateToByForce"), this.closeAddress();
        },
        observeFlagChange: function(e) {
            var s = this, t = this.data.addressList;
            e ? t && t.length ? (this.setData({
                isShowAddressLayer: !0
            }), setTimeout(function() {
                s.setData({
                    showAnim: !0
                });
            }, 100)) : this.gotoSelectNewAddress() : (this.setData({
                showAnim: !1
            }), setTimeout(function() {
                s.setData({
                    isShowAddressLayer: !1
                });
            }, 100));
        },
        noscroll: function() {}
    }
});