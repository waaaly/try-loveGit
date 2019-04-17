var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, a = require("../../../libs/aliLog"), e = getApp().services, o = e.Ubt, n = e.HashToUrl, i = (e.paramsToString, 
e.User), s = e.weixinAPIs, h = e.loginWithRisk, c = e.AliLog, r = require("./api.js"), d = require("../../../libs/promise.js"), u = require("./rules.js"), g = "", l = function(t) {
    return t.message || t.data && t.data.errMsg || t.data && t.data.message || "网络错误，请重试";
};

Page({
    data: {
        id: null,
        type: null,
        shop: {},
        latitude: -1,
        longitude: -1,
        phone: "",
        verifyCode: "",
        countDown: 0,
        token: "",
        showingCaptchaModal: !1,
        captchaUrl: "",
        captchaHash: "",
        captchaCode: "",
        captchaAction: "",
        gettingHongbao: !1,
        showingKeyboard: 0,
        hack: !1,
        phoneFocus: !1,
        verifyCodeFocus: !1,
        captchaFocus: !1,
        exchangeCodeFocus: !1,
        shouldGoHome: !1,
        refer: {},
        exchangeCode: "",
        isExchange: !1,
        rules: []
    },
    getShop: function() {
        var t = this;
        return r.getPageMeta(this.data).then(function(a) {
            var e = a.data, o = e.shop_name, i = e.shop_logo, s = e.hongbao_statistic, h = void 0 === s ? "" : s, c = e.user_statistic, r = {};
            r.name = o.replace(/[(（[【].*/, ""), r.image_path = n(i, 122, 122), t.setData({
                shop: r,
                hongbao_statistic: h,
                user_statistic: c
            });
        }).catch(function() {});
    },
    startCountDown: function() {
        var t = this;
        this.setData({
            countDown: 30
        });
        var a = setInterval(function() {
            var e = Math.max(0, t.data.countDown - 1);
            t.setData({
                countDown: e
            }), e || clearInterval(a);
        }, 1e3);
    },
    checkPhone: function() {
        var t = !!this.data.phone.match(/^1\d{10}$/);
        return t || wx.showToast({
            title: "请输入正确的手机号"
        }), t;
    },
    checkVerifyCode: function() {
        var t = !!this.data.verifyCode.match(/^\d{6}$/);
        return t || wx.showToast({
            title: "短信验证码格式不正确"
        }), t;
    },
    checkToken: function() {
        return !!this.data.token || (wx.showToast({
            title: "请先获取短信验证码"
        }), !1);
    },
    sendVerifyCode: function() {
        var t = this;
        if (!this.data.countDown && this.checkPhone()) return o.sendEvent({
            id: 100547
        }), wx.showToast({
            title: "正在发送验证码",
            icon: "loading"
        }), this.setData({
            verifyCodeFocus: !0
        }), r.sendVerifyCode({
            mobile: this.data.phone,
            captcha_hash: this.data.captchaHash,
            captcha_value: this.data.captchaCode
        }).then(function(a) {
            t.startCountDown(), t.setData({
                token: a.data.validate_token
            }), wx.showToast({
                title: "短信验证码已发送",
                icon: "success"
            });
        }).catch(function(a) {
            return "NEED_CAPTCHA" === (a.data && a.data.name) ? (t.showCaptchaModal("sendVerifyCode"), 
            o.sendEvent({
                id: 100554
            })) : "CAPTCHA_CODE_ERROR" === (a.data && a.data.name) ? (wx.showToast({
                title: "验证码错误"
            }), t.setData({
                countDown: 0
            }), t.showCaptchaModal("sendVerifyCode")) : (t.closeCaptchaModal(), t.setData({
                verifyCodeFocus: !0
            }), wx.showToast({
                title: l(a)
            })), d.reject();
        });
    },
    getHongbao: function() {
        var t = this, a = this.data.refer;
        return a.weixin_uid = i.union_id, this.setData({
            refer: a
        }), r.getHongbao(this.data).then(function(a) {
            return t.navigateToSuccess(a.data);
        }).catch(function(a) {
            "EXCEED_DAILY_GENERATE_HONGBAO" === a.data.name ? t.navigateToSuccess([], !0) : "EXCHANGE_CODE_INVALID" === a.data.name ? (wx.showToast({
                title: "请正确填写兑换码"
            }), t.setData({
                exchangeCodeFocus: !0
            })) : (o.sendEvent({
                id: 101060,
                parmas: {
                    message: a.data.message
                }
            }), wx.showToast({
                title: a.data.message || "外卖小哥饿晕了"
            }));
        });
    },
    preGetHongbao: function(a) {
        var e = this;
        if (!this.data.gettingHongbao && this.checkPhone() && this.checkVerifyCode() && this.checkToken()) {
            if (this.data.isExchange && 12 !== this.data.exchangeCode.length) return wx.showToast({
                title: "请正确填写兑换码"
            }), void this.setData({
                exchangeCodeFocus: !0
            });
            wx.showToast({
                title: "正在拆红包",
                icon: "loading"
            }), o.sendEvent({
                id: 100548
            }), this.setData({
                gettingHongbao: !0
            }), h(t({
                validate_token: this.data.token,
                validate_code: this.data.verifyCode,
                authcode: this.data.authcode
            }, a)).then(this.getHongbao).then(function() {
                return e.setData({
                    gettingHongbao: !1
                });
            }).catch(function(t) {
                e.setData({
                    gettingHongbao: !1
                }), e.closeCaptchaModal(), e.setData({
                    verifyCodeFocus: !0
                }), o.sendEvent({
                    id: 101060,
                    parmas: {
                        message: (t.data || {}).message
                    }
                }), wx.showToast({
                    title: l(t)
                });
            });
        }
    },
    navigateToSuccess: function(t) {
        var a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.setData({
            shouldGoHome: !0
        });
        var e = {
            phone: i.info.mobile,
            logoUrl: this.data.shop.image_path,
            hongbao: t,
            user_statistic: this.data.user_statistic,
            hongbao_statistic: this.data.hongbao_statistic,
            type: this.data.type,
            id: this.data.id,
            name: this.data.shop.name,
            exceed: a,
            isExchange: this.data.isExchange,
            rules: this.data.rules
        };
        wx.setStorageSync("pullNewUser.data", e), wx.setStorageSync("pullNewUser.refer", {
            weixin_name: this.data.refer.weixin_name,
            weixin_avatar: this.data.refer.weixin_avatar
        }), wx.navigateTo({
            url: "./success/index?" + g
        });
    },
    getUserInfo: function() {
        var t = this;
        return void 0 === this.data.refer.promoter_id ? new d(function(t) {
            return t();
        }) : s.weixinUserInfo().then(function(a) {
            var e = t.data.refer;
            e.weixin_name = a.nickName, e.weixin_avatar = a.avatarUrl, t.setData({
                refer: e
            });
        });
    },
    receiveHongbao: function() {
        var t = this;
        this.getUserInfo().then(this.preGetHongbao).catch(function(a) {
            a && "weixin_authorize_failed" === a.name && t.preGetHongbao();
        });
    },
    getCaptcha: function() {
        var t = this;
        return this.setData({
            captchaFocus: !0
        }), r.getCaptchaCode(this.data.phone).then(function(a) {
            t.setData({
                captchaUrl: "data:image/jpeg;base64," + a.data.captcha_image,
                captchaHash: a.data.captcha_hash
            });
        });
    },
    sendCaptcha: function() {
        ("sendVerifyCode" === this.data.captchaAction ? this.sendVerifyCode() : this.preGetHongbao()).then(this.closeCaptchaModal);
    },
    showCaptchaModal: function(t) {
        this.setData({
            countDown: 0,
            showingCaptchaModal: !0,
            captchaAction: t
        }), o.sendEvent({
            id: 100554
        }), this.getCaptcha();
    },
    closeCaptchaModal: function() {
        this.setData({
            captchaCode: "",
            captchaHash: "",
            showingCaptchaModal: !1
        });
    },
    onPhoneInput: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    onVerifyInput: function(t) {
        this.setData({
            verifyCode: t.detail.value
        });
    },
    onCaptchaInput: function(t) {
        this.setData({
            captchaCode: t.detail.value
        });
    },
    onExchangeCodeInput: function(t) {
        this.setData({
            exchangeCode: t.detail.value
        });
    },
    auth: function(t) {
        console.log(t), t.detail.iv && this.preGetHongbao({
            iv: t.detail.iv,
            encrypted_data: t.detail.encryptedData
        });
    },
    onLoad: function(t) {
        var e = this, n = t.id, s = t.type, h = t.promoter_id, c = t.isExchange, r = t.wxLogin, d = wx.getStorageSync("PLACE") || {}, l = wx.getStorageSync("pullNewUser.refer") || {};
        l.ua = "3", h && (l.promoter_id = h), c = "true" === c, this.setData({
            id: n,
            latitude: d.latitude || "",
            longitude: d.longitude || "",
            type: "shop" === s ? 1 : 2,
            refer: l,
            isExchange: c,
            wxLogin: "false" !== r,
            rules: u[c ? "exchange" : "common"]
        }), this.getShop(), c || (i.id ? this.getHongbao() : wx.login({
            success: function(t) {
                e.setData({
                    authcode: t.code
                });
            }
        }), o.sendPv(), g = (0, a.createUrlParams)());
    },
    onShow: function() {
        this.data.shouldGoHome && wx.switchTab({
            url: "/pages/index/index"
        }), c.sendPv(), o.sendPv();
    }
});