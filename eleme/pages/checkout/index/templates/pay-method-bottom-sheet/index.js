var e = getApp().services.Cart, t = e.payMethod;

module.exports = {
    selectPayMethod: function(a) {
        var r = a.currentTarget;
        e.selectPayMethod(t.data.payMethods[r.dataset.index]);
    }
};