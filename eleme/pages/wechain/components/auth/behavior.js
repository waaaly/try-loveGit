getApp().services.Ubt;

var a = require("./api"), t = null, e = Behavior({
    properties: {
        config: {
            type: Object
        }
    },
    data: {
        showAuth: !1
    },
    methods: {
        toast: function(a) {
            wx.showToast({
                title: a,
                icon: "none",
                duration: 1200
            });
        },
        dataChange: function(a) {
            this.triggerEvent("dataChange", a);
        },
        validateInput: function() {
            var a = "", t = this.data.config, e = t.isValidPhone, n = t.mobileCode, o = t.validateToken;
            return e ? /\d{6}/.test(n) ? o || (a = "别着急，请先获取验证码") : a = "别着急，记得输入验证码" : a = "别着急，先输入手机", 
            !a || (this.toast(a), !1);
        },
        loginInit: function() {
            var a = this;
            if (this.validateInput()) {
                var t = this.data.config;
                t.mobileCode, t.validateToken;
                this.loginHandle = function(t) {
                    t.detail.then(function() {
                        return a.triggerEvent("login");
                    }).catch(function(t) {
                        "AUTH_FAILED" !== t.name ? a.toast(t.message) : wx.showModal({
                            title: "设置用户信息提示",
                            content: "饿了么需要获取你的公开信息，才能为你提供更好的服务",
                            confirmText: "知道了",
                            showCancel: !1
                        });
                    });
                }, this.setData({
                    showAuth: !0
                });
            }
        },
        bindPhone: function(a) {
            var t = a.detail.value.replace(/\s/g, ""), e = /^1\d{10}$/.test(t);
            this.triggerEvent("dataChange", {
                isValidPhone: e,
                phone: t
            });
            var n = t.replace(/(^\d{3}\B|\d{4}\B)/g, "$1 ");
            return {
                value: n,
                cursor: n.length
            };
        },
        sendMobileCode: function() {
            var t = this, e = this.data.config, n = e.isValidPhone, o = e.captchaHash, i = e.captchaCode, h = e.mobileCountdown, c = e.phone;
            if (!h) return n ? void a.smsCode({
                mobile: c,
                captcha_hash: o,
                captcha_value: i
            }).then(function(a) {
                t.dataChange({
                    validateToken: a.data.validate_token
                }), t.closeCaptchaModal(), t.countdown();
            }).catch(function(a) {
                var e = a.data, n = e.name, o = e.message;
                "NEED_CAPTCHA" === n ? t.getCaptcha() : "CAPTCHA_CODE_ERROR" === n ? (wx.showToast({
                    title: "验证码错误"
                }), t.getCaptcha()) : (t.closeCaptchaModal(), t.toast(o));
            }) : this.toast("别着急，先输入手机");
        },
        bindMobileCode: function(a) {
            this.dataChange({
                mobileCode: a.detail.value
            });
        },
        countdown: function() {
            var a = this;
            this.dataChange({
                mobileCountdown: 30,
                sendTwice: !0
            }), t = setInterval(function() {
                var e = a.data.config.mobileCountdown;
                e <= 1 && clearInterval(t), a.dataChange({
                    mobileCountdown: e - 1
                });
            }, 1e3);
        },
        getCaptcha: function() {
            var t = this;
            return a.captchas(this.data.config.phone).then(function(a) {
                var e = "data:image/jpeg;base64," + a.data.captcha_image, n = a.data.captcha_hash;
                t.dataChange({
                    captchaUrl: e,
                    captchaHash: n
                });
            });
        },
        sendCaptcha: function() {
            this.sendMobileCode();
        },
        closeCaptchaModal: function() {
            this.dataChange({
                captchaUrl: "",
                captchaCode: "",
                captchaHash: ""
            });
        },
        onCaptchaInput: function(a) {
            this.dataChange({
                captchaCode: a.detail.value
            });
        }
    }
});

module.exports = e;