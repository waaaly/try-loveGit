var a = require("../../../../common/utils/image-hash.js"), t = getApp(), e = void 0;

module.exports = {
    data: {
        imageHash: a,
        tags: [ "家", "学校", "公司" ]
    },
    onLoad: function(a) {
        var t = a.redirect_url;
        e = t, wx.removeStorage({
            key: "TEMPORARY_SELECTED_DELIVER_ADDRESS"
        });
    },
    onShow: function() {
        var a = this;
        wx.getStorage({
            key: "TEMPORARY_SELECTED_DELIVER_ADDRESS",
            success: function(e) {
                var s = e.data;
                a.setData({
                    address: t.extend([ s, a.data.address ])
                });
            }
        });
    },
    goToSelectAddress: function() {
        wx.navigateTo({
            url: "/pages/location/location?isAdd=1"
        });
    },
    selectTag: function(a) {
        var e = +a.currentTarget.dataset.tag;
        if (e) {
            var s = this.data.tags[e - 1];
            this.data.address.tag_type !== e && this.data.address.tag !== s || (e = 0, s = ""), 
            this.setData({
                address: t.extend([ {
                    tag_type: e,
                    tag: s
                }, this.data.address ])
            });
        }
    },
    setGenderMale: function() {
        this.setData(t.extend([ {
            address: {
                sex: 1
            }
        }, this.data ]));
    },
    setGenderFemale: function() {
        this.setData(t.extend([ {
            address: {
                sex: 2
            }
        }, this.data ]));
    },
    onNameInput: function(a) {
        this.data.address.name = a.detail.value;
    },
    onPhoneInput: function(a) {
        this.data.address.phone = a.detail.value;
    },
    onAddressDetailChange: function(a) {
        var t = a.detail;
        this.data.address.address_detail = t.value;
    },
    redirect: function() {
        if (e) return wx.redirectTo({
            url: e
        }), !0;
    }
};