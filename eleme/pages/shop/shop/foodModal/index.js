var a = getApp().services.HashToUrl;

module.exports = {
    showFoodModal: function(o) {
        var t = o.currentTarget.dataset.entity;
        t.image_url = t.image_hash ? a(t.image_hash, 640, 640) : t.image_path, this.setData({
            isFoodModalHide: !1,
            foodModalData: t
        });
    },
    hideFoodModal: function() {
        this.setData({
            isFoodModalHide: !0,
            foodModalData: {}
        });
    }
};