var t = getApp().services.ApiCreater;

module.exports = {
    captcha: function(e) {
        return t({
            url: "/eus/v3/captchas",
            method: "POST",
            data: e
        });
    },
    smsCode: function(e) {
        return t({
            url: "/eus/v1/weixin_light_app_login_code",
            method: "POST",
            data: e
        });
    },
    login: function(e) {
        return t({
            url: "/eus/v1/weixin_light_app_login",
            method: "POST",
            data: e
        });
    },
    captchas: function(e) {
        return t({
            url: "/eus/v1/captchas/" + e,
            method: "POST"
        });
    }
};