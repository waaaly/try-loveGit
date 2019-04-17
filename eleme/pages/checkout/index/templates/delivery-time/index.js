var e = getApp(), t = e.services.Cart, a = t.deliveryTime;

module.exports = {
    mergeData: function() {
        var t = this;
        t.data.deliveryTime = e.extend([ a.loadSync(), t.data.deliveryTime ]), t.setData(t.data);
    },
    onShow: function() {
        var e = this;
        t.pend().then(function() {
            e.mergeData();
        });
    },
    selectDeliveryTime: function(e) {
        var t = e.detail;
        if ("null" !== t.value) {
            var i = a.loadSync().deliveryTimesForPicker[t.value];
            a.select(i), this.mergeData(), this.checkout();
        }
    }
};