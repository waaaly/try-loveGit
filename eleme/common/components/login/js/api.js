Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = getApp().services, t = (e.User, e.ApiCreater);

exports.default = {
    login: function(e) {
        return t({
            url: "/pizza/common/eus/login/login_by_mobile",
            method: "POST",
            data: e
        });
    },
    getCaptcha: function(e) {
        return t({
            url: "/pizza/common/eus/login/mobile_send_code",
            method: "POST",
            data: e
        });
    },
    getGraphicCaptcha: function(e) {
        return t({
            url: "/pizza/common/eus/v2/captchas",
            method: "POST",
            data: {
                mobile: e
            }
        });
    }
};