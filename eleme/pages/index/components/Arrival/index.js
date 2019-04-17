require("../../js/api"), getApp().services.User;

module.exports = {
    data: {
        showArrival: !1,
        obtained: !1
    },
    obtain: function() {
        if (this.data.obtained) return this.setData({
            showArrival: !1
        });
        this.setData({
            obtained: !0
        });
    },
    closeArrivalModal: function() {
        this.setData({
            showArrival: !1
        });
    }
};