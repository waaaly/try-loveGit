module.exports = {
    getCode: function(e, t) {
        console.log("222222", e, t), e.setData({
            isShow: !0
        });
        var s = t, a = setInterval(function() {
            if (1 == s) return clearInterval(a), e.setData({
                sec: t,
                isShow: !1,
                canClick: !0
            }), !1;
            s--, e.setData({
                sec: s
            });
        }, 1e3);
    }
};