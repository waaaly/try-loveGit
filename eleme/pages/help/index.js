var e = getApp().services.Ubt;

Page({
    onShow: function() {
        e.sendPv();
    }
});