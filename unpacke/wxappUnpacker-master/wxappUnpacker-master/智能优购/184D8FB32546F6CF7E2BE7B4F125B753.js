Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = getApp();

exports.phoneService = {
    getPhone: function(t, o) {
        var s = e.getuserid(), n = e.getstatus(), u = !1;
        return console.log("status", n), console.log("type", t), console.log(s), s > 0 && (console.log(e.user_is_authentication1), 
        console.log("我进来了"), e.getHttpData(e.user_is_authentication1 + s, null, "GET", function(o) {
            console.log("dataPHONE ", o), e.setstatus(o.status), null != o.status && 0 == o.status && (console.log("/pages/user/phone/phone?type=" + t), 
            wx.redirectTo({
                url: "/pages/user/phone/phone?type=" + t
            }), u = !0);
        })), "function" == typeof o && o(u);
    }
};