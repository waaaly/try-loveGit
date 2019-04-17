var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    }
    return t;
}, a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./js/api.js")), e = getApp().services, n = (e.User, e.ApiCreater, e.loginWithRisk), i = 30, c = null;

Component({
    data: {
        phone: "",
        counting: !1,
        btnText: "获取验证码",
        captcha_hash: "",
        captcha_value: "",
        showGraphicCaptcha: !1,
        imageUrl: "",
        validate_token: "",
        validate_code: "",
        focus: !1,
        captcha: ""
    },
    props: {
        onLogined: function() {}
    },
    attached: function() {
        var t = this;
        wx.login({
            success: function(a) {
                t.setData({
                    authcode: a.code
                });
            }
        });
    },
    methods: {
        auth: function(t) {
            t.detail.iv && this.login({
                iv: t.detail.iv,
                encrypted_data: t.detail.encryptedData
            });
        },
        login: function(a) {
            var e = this;
            this.validatePhone() && (this.data.validate_code ? n(t({
                mobile: this.data.phone,
                validate_token: this.data.validate_token,
                validate_code: this.data.validate_code,
                authcode: this.data.authcode
            }, a)).then(function() {
                e.triggerEvent("logined");
            }).catch(function(t) {
                wx.showToast({
                    title: t.data && t.data.message || "登录失败，请重试",
                    icon: "none"
                });
            }) : wx.showToast({
                title: "请填写验证码",
                icon: "none"
            }));
        },
        validatePhone: function() {
            return this.data.phone ? !!/1\d{10}/.test(this.data.phone) || (wx.showToast({
                title: "请填写合法的手机号",
                icon: "none"
            }), !1) : (wx.showToast({
                title: "请填写手机号",
                icon: "none"
            }), !1);
        },
        getCaptcha: function(t) {
            var e = this;
            this.validatePhone() && a.default.getCaptcha({
                mobile: this.data.phone,
                captcha_value: t.detail && t.detail.captcha || "",
                captcha_hash: this.data.captcha_hash
            }).then(function(t) {
                e.closeCaptchaModal(), e.setData({
                    validate_token: t.data.validate_token,
                    focus: !0
                }), i = 30, e.countDown();
            }).catch(function(t) {
                var a = t.data, n = a.name, i = a.message;
                "NEED_CAPTCHA" === n ? (e.setData({
                    showGraphicCaptcha: !0
                }), e.getGraphicCaptcha()) : "CAPTCHA_CODE_ERROR" === n ? (e.setData({
                    showGraphicCaptcha: !0
                }), wx.showToast({
                    title: "验证码错误",
                    icon: "none"
                }), e.getGraphicCaptcha()) : (wx.showToast({
                    title: i || "网络错误",
                    icon: "none"
                }), e.closeCaptchaModal());
            });
        },
        getGraphicCaptcha: function() {
            var t = this;
            a.default.getGraphicCaptcha(this.data.phone).then(function(a) {
                t.setData({
                    captcha_hash: a.data.captcha_hash,
                    imageUrl: a.data.captcha_image
                });
            });
        },
        bindPhoneInput: function(t) {
            this.setData({
                phone: t.detail.value
            });
        },
        bindCaptchaInput: function(t) {
            this.setData({
                validate_code: t.detail.value
            });
        },
        closeCaptchaModal: function() {
            this.setData({
                captchaCode: "",
                captchaHash: "",
                showGraphicCaptcha: !1
            });
        },
        countDown: function() {
            var t = this;
            this.data.counting || (c && clearInterval(c), c = setInterval(function() {
                (i -= 1) > 0 ? t.setData({
                    btnText: "已发送(" + i + "s)",
                    counting: !0
                }) : (clearInterval(c), i = 30, t.setData({
                    btnText: "重新获取",
                    counting: !1
                }));
            }, 1e3));
        },
        cancel: function() {
            this.closeCaptchaModal();
        }
    }
});