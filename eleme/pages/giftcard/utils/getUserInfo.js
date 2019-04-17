var n = {
    name: "AUTH_FAILED",
    message: "您未授权"
}, c = function(n) {
    return new Promise(function(c, e) {
        n.success = function(n) {
            n.cancel && e(), n.confirm && wx.openSetting({
                success: function(n) {
                    n.authSetting["scope.userInfo"] || e(), t().then(function(n) {
                        c(n);
                    }).catch(e);
                },
                fail: e
            });
        }, wx.showModal(n);
    });
}, t = function(t) {
    return new Promise(function(e, o) {
        wx.getUserInfo({
            success: function(n) {
                e(n);
            },
            fail: function(s) {
                c(t).then(function(n) {
                    e(n);
                }).catch(function() {
                    o(n);
                });
            }
        });
    });
};

module.exports = t;