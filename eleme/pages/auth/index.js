var t = require("../../libs/aliLog"), a = require("../../common/utils/isMobile.js").isMobile, e = getApp().services, s = e.Ubt, i = e.Promise, n = e.API, o = (e.User, 
e.loginWithRisk), c = e.AliLog, h = require("./api.js"), d = "", u = void 0, r = 30, l = [ "voice_first", "voice_review" ];

Page({
    data: {
        vertificationStatus: "idle",
        validate_token: "",
        phone: "",
        editPhone: !0,
        sms: "",
        scene: "login",
        authType: "sms",
        successUrl: null,
        authing: !1,
        remainSeconds: 30,
        pageInited: !1,
        showingCaptchaModal: !1,
        showAuth: !0,
        hasSendSMS: !1
    },
    onLoad: function(a) {
        var e = this, s = a.successUrl, n = a.scene, o = a.type, c = a.phone, h = a.cartId, u = a.sig;
        o = -1 === l.indexOf(o) ? "sms" : "voice", this.setData({
            successUrl: s || !1,
            scene: n || "login",
            authType: o || "sms",
            phone: c || "",
            editPhone: !c,
            cartId: h || !1,
            sig: u || !1,
            isVoice: "voice" === o
        }), this.getAuthcode().then(function(t) {
            return e.setData({
                authcode: t.code
            }), e.getUserInfo();
        }).then(function(t) {
            if (!t.iv) return i.reject();
            e.setData({
                iv: t.iv,
                encrypted_data: t.encryptedData,
                pageInited: !0,
                showAuth: !1
            }), e.authSuccess();
        }).catch(function() {
            e.setData({
                pageInited: !0
            });
        }), d = (0, t.createUrlParams)();
    },
    getAuthcode: function() {
        return new i(function(t, a) {
            wx.login({
                success: t,
                fail: a
            });
        });
    },
    getUserInfo: function() {
        return new i(function(t, a) {
            wx.getSetting({
                success: function(e) {
                    e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                        withCredentials: !0,
                        success: t,
                        fail: a
                    }) : a();
                },
                fail: a
            });
        });
    },
    auth: function() {
        var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).detail, a = void 0 === t ? {} : t;
        console.log(a), a.iv && (this.setData({
            iv: a.iv,
            encrypted_data: a.encryptedData,
            showAuth: !1
        }), this.authSuccess());
    },
    authSuccess: function() {
        this.data.phone && (this.data.isVoice ? this.sendCode() : (this.setData({
            authing: !1
        }), r = 30, this.countDown()));
    },
    onUnload: function() {
        clearTimeout(u);
    },
    onShow: function() {
        s.sendPv(), c.sendPv();
    },
    successRedirect: function() {
        if (this.setData({
            pageInited: !0
        }), this.data.successUrl) if ("/pages/index/index" === this.data.successUrl) wx.switchTab({
            url: this.data.successUrl + "?" + d
        }); else {
            var t = decodeURIComponent(this.data.successUrl);
            t = t + (t.indexOf("?") > -1 ? "&" : "?") + d, wx.redirectTo({
                url: t
            });
        } else wx.navigateBack();
    },
    bindPhoneInput: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    bindSMSInput: function(t) {
        this.setData({
            sms: t.detail.value
        });
    },
    validatePhone: function() {
        return this.data.phone ? !!a(this.data.phone) || (wx.showToast({
            title: "请填写合法的手机号"
        }), !1) : (wx.showToast({
            title: "请填写手机号"
        }), !1);
    },
    alertModal: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        wx.showModal({
            title: "提示",
            showCancel: !1,
            content: t
        });
    },
    sendVoice: function(t) {
        var a = this;
        this.setData({
            authing: !1
        }), r = 30, n.sendCartVoiceCode(this.data.cartId, this.data.sig).then(function(t) {
            200 != +t.statusCode ? (wx.hideToast(), a.alertModal(t.data.message), a.setData({
                authing: !1
            })) : a.setData({
                validate_token: t.data.validate_token
            });
        }).catch(function(t) {
            200 != +t.statusCode && (wx.hideToast(), a.alertModal(t.data.message), a.setData({
                authing: !1
            }));
        }), this.countDown();
    },
    sendCode: function(t) {
        wx.setNavigationBarTitle({
            title: "验证手机号"
        }), this.data.isVoice ? this.sendVoice() : this.sendSMS();
    },
    sendSMS: function(t) {
        var a = this;
        this.validatePhone() && (this.setData({
            authing: !1
        }), h.smsCode({
            mobile: this.data.phone,
            captcha_hash: this.data.captchaHash,
            captcha_value: this.data.captchaCode
        }).then(function(t) {
            r = 30, a.countDown(), wx.hideToast(), a.data.validate_token = t.data.validate_token, 
            a.setData({
                authing: !1,
                hasSendSMS: !0
            }), a.closeCaptchaModal();
        }).catch(function(t) {
            wx.hideToast();
            var e = t.data, s = e.name, i = e.message;
            "NEED_CAPTCHA" === s ? (a.setData({
                showingCaptchaModal: !0
            }), a.getCaptcha()) : "CAPTCHA_CODE_ERROR" === s ? (wx.showToast({
                title: "验证码错误"
            }), a.getCaptcha()) : (a.closeCaptchaModal(), a.alertModal(i)), a.setData({
                authing: !1
            });
        }));
    },
    countDown: function(t) {
        var a = this;
        this.setData({
            vertificationStatus: "sent"
        }), u = setTimeout(function() {
            if (r > 0) return r -= 1, a.setData({
                remainSeconds: r
            }), a.countDown();
            a.setData({
                vertificationStatus: "retrieve",
                remainSeconds: 30
            });
        }, 1e3);
    },
    formSubmit: function() {
        var t = this;
        if (this.validatePhone()) {
            if (!this.data.hasSendSMS) return wx.showToast({
                title: "请获取验证码"
            });
            if (!this.data.sms.trim()) return wx.showToast({
                title: "请填写验证码"
            });
            if (!1 === this.data.editPhone && this.data.successUrl) this.data.validate_token ? wx.redirectTo({
                url: this.data.successUrl + "?code=" + this.data.sms + "&validate_token=" + this.data.validate_token + "&" + d
            }) : wx.redirectTo({
                url: this.data.successUrl + "?code=" + this.data.sms + "&" + d
            }); else {
                wx.showToast({
                    title: "正在登录",
                    icon: "loading",
                    duration: 1e4
                }), this.setData({
                    authing: !0
                });
                var a = this.data, e = a.authcode, s = a.iv, i = a.encrypted_data, n = a.validate_token, c = a.sms;
                o({
                    validate_token: n,
                    validate_code: c,
                    authcode: e,
                    iv: s,
                    encrypted_data: i
                }).then(this.successRedirect).catch(function(a) {
                    t.alertModal(a.data.message), wx.hideToast(), t.setData({
                        authing: !1
                    });
                });
            }
        }
    },
    goToAgreement: function() {
        wx.showModal({
            title: "提示",
            content: "请用浏览器访问 https://h5.ele.me/service/agreement/ "
        });
    },
    getCaptcha: function() {
        var t = this;
        return this.setData({
            captchaFocus: !0
        }), h.captchas(this.data.phone).then(function(a) {
            t.setData({
                captchaUrl: "data:image/jpeg;base64," + a.data.captcha_image,
                captchaHash: a.data.captcha_hash
            });
        });
    },
    onCaptchaInput: function(t) {
        this.setData({
            captchaCode: t.detail.value
        });
    },
    closeCaptchaModal: function() {
        this.setData({
            captchaCode: "",
            captchaHash: "",
            showingCaptchaModal: !1
        });
    },
    sendCaptcha: function() {
        this.sendSMS();
    }
});