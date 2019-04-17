module.exports = {
    makeOrder: function() {
        var e = getApp().services, r = e.Cart, s = e.User;
        r.makeOrder({
            userId: s.id,
            SID: s.SID
        });
    }
};