var e = getApp().services, t = e.ApiCreater, n = e.User;

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
    },
    unbind: function() {
        return t({
            url: "/eus/v1/users/" + n.id + "/sns?sns_type=3",
            method: "DELETE",
            header: {
                cookie: "SID=" + n.SID
            }
        });
    }
};