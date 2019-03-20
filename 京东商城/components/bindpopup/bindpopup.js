function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e.default = t, e;
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var a = require("../../bases/component.js"), o = t(require("../../pages/my/models/account_data")), s = t(require("../../common/base64/base64.js")), i = t(require("../../common/rsa/rsa")), r = t(require("../../pages/my/models/assets_data")), n = t(require("../../common/cookie-v2/cookie.js")), p = t(require("../../common/toast/toast")), u = require("../../api/Ptag/Ptag_utils.js"), d = require("../../api/Ptag/report_manager"), c = t(require("../../common/fe_report/usability.js")), g = t(require("../../common/localStorage")), h = new (require("../../common/logger.js").Logger)("bindpopup"), l = 0, f = void 0, v = 521293285, b = void 0;

new a.JDComponent({
    properties: {
        options: {
            type: Object,
            value: {}
        }
    },
    data: {
        popup: {
            show: 0,
            type: 0,
            title: "",
            content: "",
            accountType: 0,
            pin: "",
            inputValue: {},
            errObj: {},
            codeType: 0
        },
        msgCode: {
            checkType: 0
        },
        rsaObj: {}
    },
    attached: function() {
        var t = this, e = getCurrentPages();
        this.page = e[e.length - 1], this.getRsaInfo(1);
        var a = this;
        if (!this.data.options.sceneid) {
            var s = this.data.options.rurl || this.page.route;
            throw c.umpBiz({
                bizid: 898,
                operation: 1,
                result: 1,
                message: this.data.options.rurl || this.page.route
            }), this.reportMsg("场景id异常：" + s), new Error("请传入场景id参数");
        }
        var i = c.start("wq.webmonitor.mjgj.xcx.bindpopup.index", 898, 2, 5e3);
        o.getCurPinInfo({
            sceneid: 521293285
        }).then(function(e) {
            if (0 == e.retcode) if (1 != e.accountType && 2 != e.accountType && 3 != e.accountType) i(2, "已经绑定" + a.page.route + "&accountType=" + e.accountType), 
            t.reportMsg("外部环境判断异常：" + a.page.route), p.show({
                icon: p.ICON.SUCCESS,
                content: "您的京东账号已关联微信账号，请继续购物",
                page: a
            }); else {
                var o = {
                    type: 3 == e.accountType ? 1 : 3,
                    title: "登录京东商城",
                    accountType: e.accountType,
                    pin: e.base.curPin,
                    rurl: a.page.route,
                    show: 1
                }, s = Object.assign(a.data.popup, o);
                a.setPopUpData(s);
                var r = 3 == e.accountType ? "7414.12.1" : "7414.12.2";
                d.ReportManager.addPtagExposure(r), d.ReportManager.addPtagExposure("7414.12.13"), 
                i(o.type, "弹窗展示成功～"), t.reportMsg("successNum：" + a.page.route), b = c.start("wq.webmonitor.mjgj.xcx.bindpopup.transfer", 898, 3, 12e4);
            } else i(4, "getCurPinInfo接口异常" + JSON.stringify(e));
        }).catch(function(t) {
            i(4, "getCurPinInfo接口异常" + JSON.stringify(t));
        }), v = this.data.options.sceneid;
    },
    methods: {
        toLoginPage: function() {
            this.showLoginPage(this), u.PtagUtils.addPtag("7414.12.3");
        },
        showLoginPage: function(t, e) {
            o.getImgCode().then(function(a) {
                var o = {
                    type: 2,
                    title: "登录京东账号",
                    picCode: "https:" + a.url,
                    cid: a.cid,
                    tel: ""
                };
                Object.assign(o, e), t.setPopUpData(o);
            });
        },
        tocompletePage: function() {
            var t = {
                title: "补全账号信息",
                type: 3
            };
            this.setPopUpData(t), u.PtagUtils.addPtag("7414.12.4");
        },
        closePopUp: function(t) {
            b(6, "关闭弹窗");
            var e = {
                show: 0
            };
            this.setPopUpData(e, 2), this.triggerEvent("setBindPopUpStatus", t);
        },
        toDone: function(t) {
            var e = {
                show: 0
            };
            this.setPopUpData(e, 2), n.removeCookie([ "wq_uin", "wq_skey" ]), this.triggerEvent("setUserInfo", t), 
            this.triggerEvent("setBindPopUpStatus", t);
        },
        judgeTel: function(t) {
            this.getTelValidator(t);
            var e = 3 == this.data.popup.accountType ? "7414.12.5" : "7414.12.8";
            u.PtagUtils.addPtag(e);
        },
        inputBlur: function(t) {
            var a = "delete" + t.target.dataset.sign + "Value", o = "input" + t.target.dataset.sign + "Focus", s = e({
                inputValue: Object.assign(this.data.popup.inputValue, e({}, a, t.detail.value))
            }, o, 0);
            this.setPopUpData(s, 2);
        },
        inputFocus: function(t) {
            var a, o = "delete" + t.target.dataset.sign + "Value", s = "input" + t.target.dataset.sign + "Focus", i = (a = {
                inputValue: Object.assign(this.data.popup.inputValue, e({}, o, t.detail.value))
            }, e(a, s, 1), e(a, "errObj", {}), a);
            this.setPopUpData(i, 2);
        },
        deleteVal: function(t) {
            var a, o = "delete" + t.target.dataset.sign, s = "delete" + t.target.dataset.sign + "Value", i = (a = {}, 
            e(a, o, 1), e(a, "inputValue", e({}, s, "")), a);
            this.setPopUpData(i, 2);
        },
        seeOrno: function(t) {
            var e = {};
            e = 1 == this.data.popup.seeSign ? {
                seeSign: 0
            } : {
                seeSign: 1
            }, this.setPopUpData(e, 2);
        },
        setPopUpData: function(t, e) {
            var a = this.data.popup;
            if (t.inputValue && 3 != e && (t.inputValue = Object.assign(a.inputValue, t.inputValue)), 
            Object.assign(a, t), this.setData({
                popup: a
            }), 0 == l || 1 == e) {
                var o = this;
                g.remove("backInfo").then(function(t) {
                    console.log(t), 3 != e && 2 != e && (l++, o.setStorage(a));
                });
            } else 3 != e && 2 != e && (l++, this.setStorage(a));
        },
        setStorage: function(t) {
            g.get("backInfo", {}).then(function(e) {
                console.log(e), t.inputValue = {}, t.errObj = {};
                var a = e || [];
                if (a && a.split("|") && a.split("|")[l - 1]) {
                    var o = a.split("|");
                    o[l - 1] = JSON.stringify(t), a = o.join("|");
                } else a = (a || "") + "|" + JSON.stringify(t);
                g.set("backInfo", a, {
                    expire: "1d"
                }).catch(function() {
                    h.error("backInfo写storage失败");
                });
            }).catch(function() {
                g.set("backInfo", JSON.stringify(t), {
                    expire: "1d"
                }).catch(function() {
                    h.error("backInfo写storage失败");
                }), c.umpBiz({
                    bizid: 898,
                    operation: 4,
                    result: 1,
                    message: JSON.stringify(t)
                });
            });
        },
        showAccountTips: function() {
            var t = this.data.popup, e = {
                accountTipsShow: 1,
                show: 0
            };
            Object.assign(t, e), this.setData({
                popup: t
            });
        },
        closeAccountTips: function() {
            var t = this.data.popup, e = {
                accountTipsShow: 0,
                show: 1
            };
            Object.assign(t, e), this.setData({
                popup: t
            });
        },
        toBack: function(t) {
            var e = this, a = t;
            g.get("backInfo", {}).then(function(t) {
                console.log(t);
                var o = t;
                if (o && o.split("|") && o.split("|")[l - 2]) o.split("|")[l - 2].type, e.setPopUpData(JSON.parse(o.split("|")[l - 2]), 3), 
                l -= 1; else {
                    l -= 1;
                    var s = {
                        show: 0
                    };
                    e.setPopUpData(s, 3), e.triggerEvent("setBindPopUpStatus", a);
                }
                clearInterval(f);
            }).catch(function() {
                c.umpBiz({
                    bizid: 898,
                    operation: 4,
                    result: 2,
                    message: "返回写缓存失败"
                });
            });
        },
        getPicCode: function() {
            var t = this.data.popup, e = this;
            o.getImgCode().then(function(a) {
                var o = {
                    picCode: "https:" + a.url,
                    cid: a.cid
                };
                Object.assign(t, o), e.setData({
                    popup: t
                });
            });
        },
        sendMsgCode: function() {
            var t = this.data.msgCode;
            if (1 == t.sendStatus && 0 == t.sendSign) return !0;
            this.getMsgCode(t.tel, this);
        },
        unbindTel: function() {
            var t = this.data.popup, e = {
                unbindTipsShow: 1,
                show: 0
            };
            Object.assign(t, e), this.setData({
                popup: t
            });
        },
        closeUnbindTips: function() {
            var t = this.data.popup, e = {
                unbindTipsShow: 0,
                show: 1
            };
            Object.assign(t, e), this.setData({
                popup: t
            });
        },
        toUnbindTel: function() {
            var t = {};
            t.rurl = encodeURIComponent(this.data.popup.rurl), t.tel = this.data.popup.tel ? s.base64encode(this.data.popup.tel) : "", 
            t.sceneid = v, u.PtagUtils.addPtag("7414.12.12"), b(4, "解绑手机号并关联");
            var e = "//wqs.jd.com/my/unbindtel.shtml?rurl=" + t.rurl + "&tel=" + t.tel + "&sceneid=" + t.sceneid;
            this.$goto("/pages/h5/index", {
                url: e
            });
        },
        forgetPsw: function() {
            u.PtagUtils.addPtag("7414.12.11"), b(5, "忘记密码");
            var t = "//plogin.m.jd.com/cgi-bin/m/mfindpwd?appid=300&returnurl=" + decodeURIComponent("https://wqs.jd.com/" + this.data.popup.rurl);
            this.$goto("/pages/h5/index", {
                url: t
            });
        },
        toBind: function(t) {
            var e = {
                sceneid: v,
                username: this.getRsaInfo(2, 3 == this.data.popup.accountType ? this.data.popup.tel ? this.data.popup.tel : this.toTrim(t.detail.value.username) : this.data.popup.bindaccount),
                passwd: this.getRsaInfo(2, this.toTrim(t.detail.value.password)),
                picid: this.data.popup.cid,
                piccode: this.toTrim(t.detail.value.verifyCode),
                rurl: this.data.popup.rurl,
                index: this.data.rsaObj.keyIndex,
                atk: 9
            }, a = this, s = a.data.popup;
            this.getValidator(1, t, function(t) {
                if (!t) return !1;
                o.bind(e).then(function(t) {
                    0 == t.retcode && (a.showResult(1), b(1, "登录成功")), 1 == t.isUpdateCode && o.getImgCode().then(function(t) {
                        var e = {
                            picCode: "https:" + t.url,
                            cid: t.cid
                        };
                        Object.assign(s, e), a.setData({
                            popup: s
                        });
                    });
                    var e = {
                        errObj: 21 == t.retcode || 20 == t.retcode ? {
                            verifyCodeError: 1,
                            errMsg: t.tips
                        } : 50 == t.retcode || 52 == t.retcode ? {
                            passwordError: 1,
                            errMsg: t.tips
                        } : {
                            otherError: 1,
                            errMsg: t.tips
                        }
                    };
                    Object.assign(s, e), a.setData({
                        popup: s
                    });
                });
            });
            var i = 3 == s.accountType ? "7414.12.7" : "7414.12.9";
            u.PtagUtils.addPtag(i);
        },
        toComplete: function(t) {
            var e = {
                sceneid: v,
                mobile: this.getRsaInfo(2, this.data.popup.bindaccount),
                passwd: this.getRsaInfo(2, this.toTrim(t.detail.value.password)),
                smscode: this.toTrim(t.detail.value.msgcode),
                rurl: this.data.popup.rurl,
                index: this.data.rsaObj.keyIndex,
                atk: 9
            }, a = this.data.popup.accountType, s = this, i = this.data.popup;
            this.getValidator(2, t, function(t) {
                if (!t) return !1;
                3 == a && o.complete(e).then(function(t) {
                    0 == t.retcode && (s.showResult(2), b(2, "完善信息成功"));
                    var e = {
                        errObj: 21 == t.retcode || 20 == t.retcode ? {
                            verifyCodeError: 1,
                            errMsg: t.tips
                        } : 50 == t.retcode || 52 == t.retcode ? {
                            passwordError: 1,
                            errMsg: t.tips
                        } : {
                            otherError: 1,
                            errMsg: t.tips
                        }
                    };
                    Object.assign(i, e), s.setData({
                        popup: i
                    });
                }), 1 != a && 2 != a || o.register(e).then(function(t) {
                    0 == t.retcode && (s.showResult(2), b(3, "注册成功"));
                    var e = {
                        errObj: 21 == t.retcode || 20 == t.retcode ? {
                            verifyCodeError: 1,
                            errMsg: t.tips
                        } : 50 == t.retcode || 52 == t.retcode ? {
                            passwordError: 1,
                            errMsg: t.tips
                        } : {
                            otherError: 1,
                            errMsg: t.tips
                        }
                    };
                    Object.assign(i, e), s.setData({
                        popup: i
                    });
                });
            });
            var r = 3 == a ? "7414.12.6" : "7414.12.9";
            u.PtagUtils.addPtag(r);
        },
        showResult: function(t) {
            var e = this.data.options.bindactiveid ? this.data.options.bindactiveid : "", a = this.data.options.bindlevel ? this.data.options.bindlevel : -1, o = {}, s = this;
            "" == e || -1 == a ? (o = {
                type: 5,
                resultTips: 1 == t ? "登录成功" : "补全信息成功",
                drawTips: ""
            }, this.setPopUpData(o), n.removeCookie([ "wq_uin", "wq_skey" ])) : r.drawCoupon(e, a, function(e) {
                o = 0 == e.ret && 0 == e.bingo.bingoret && 0 != e.bingo.bingolevel ? {
                    type: 5,
                    resultTips: 1 == t ? "登录成功" : "补全信息成功",
                    drawTips: "恭喜获得" + e.award.awardcode + "元优惠券"
                } : {
                    type: 5,
                    resultTips: 1 == t ? "登录成功" : "补全信息成功",
                    drawTips: "抱歉，优惠券已发完"
                }, s.setPopUpData(o), 3 == s.data.accountType ? s.data.otherPin && n.removeCookie([ "wq_uin", "wq_skey" ]) : n.removeCookie([ "wq_uin", "wq_skey" ]);
            }), 3 == this.data.accountType && r.queryOtherPinAssets().then(function(t) {
                if (0 == t.errcode) {
                    for (var e = 0; e < t.anotherpin.length; e++) if (1 == t.pintype[e]) {
                        t.jbean = t.jbeannum[e], t.jdcoupon = t.jdcouponnum[e];
                        break;
                    }
                    var a = t.anotherpin.length > 0 && (t.jbean > 0 || t.jdcoupon > 0) ? 1 : 0, i = t.anotherpin.length > 0 ? t.anotherpin[0] : "", r = t.jdcoupon, p = t.jbean;
                    o = {
                        hasAssets: a,
                        otherPin: i,
                        otherPinCoupon: r,
                        otherPinJbean: p
                    }, s.setPopUpData(o);
                }
                s.data.resultTips && n.removeCookie([ "wq_uin", "wq_skey" ]);
            });
        },
        getValidator: function(t, e, a) {
            var o = {
                errObj: {
                    usernameError: 0,
                    passwordError: 0,
                    verifyCodeError: 0,
                    telError: 0
                },
                hasbind: 0
            }, s = Object.assign(this.data.popup, o);
            if (this.setData({
                popup: s
            }), 1 == t) {
                var i = this.toTrim(3 == this.data.popup.accountType ? this.data.popup.tel ? this.data.popup.tel : e.detail.value.username : this.data.popup.bindaccount), r = this.toTrim(e.detail.value.password), n = this.toTrim(e.detail.value.verifyCode);
                if ("" == i || "" == r || "" == n) {
                    var p = "" == i ? "请输入用户名/邮箱/手机号" : "" == r ? "请输入密码" : "请输入验证码";
                    o = {
                        errObj: "" == i ? {
                            usernameError: 1,
                            errMsg: p
                        } : "" == r ? {
                            passwordError: 1,
                            errMsg: p
                        } : {
                            verifyCodeError: 1,
                            errMsg: p
                        }
                    };
                    var u = Object.assign(this.data.popup, o);
                    return this.setData({
                        popup: u
                    }), void a(0);
                }
                a(1);
            }
            if (2 == t) {
                var d = this.toTrim(e.detail.value.password), c = this.toTrim(e.detail.value.msgcode), g = "";
                if ("" == d || "" == c) {
                    g = "" == c ? "请输入验证码" : "请输入密码", o = {
                        errObj: "" == c ? {
                            verifyCodeError: 1,
                            errMsg: g
                        } : {
                            passwordError: 1,
                            errMsg: g
                        }
                    };
                    var h = Object.assign(this.data.popup, o);
                    return this.setData({
                        popup: h
                    }), void a(0);
                }
                var l = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/.test(d), f = /^\d+$/.test(d), v = /^[a-zA-Z]+$/.test(d);
                if (!l || f || v) {
                    o = {
                        errObj: {
                            passwordError: 1,
                            errMsg: g = "6-20个字符（字母、数字和符号），建议至少使用2种组合"
                        }
                    };
                    var b = Object.assign(this.data.popup, o);
                    return this.setData({
                        popup: b
                    }), void a(0);
                }
                a(1);
            }
        },
        toTrim: function(t) {
            return t.replace(/(^\s+)|(\s+$)/g, "");
        },
        getTelValidator: function(t) {
            var e = this.toTrim(t.detail.value.tel), a = this.data.popup.accountType;
            if ("" == e) {
                var s = {
                    errObj: {
                        telError: 1,
                        errMsg: 3 == a ? "请输入手机号" : "请输入手机号/邮箱/账户名"
                    }
                }, i = Object.assign(this.data.popup, s);
                return this.setData({
                    popup: i
                }), !1;
            }
            if (3 == this.data.popup.accountType && !/^1\d{10}$/.test(e)) {
                var r = {
                    errObj: {
                        telError: 1,
                        errMsg: "手机号码输入有误，请重新输入。目前暂不支持非大陆手机号码。"
                    }
                }, n = Object.assign(this.data.popup, r);
                return this.setData({
                    popup: n
                }), !1;
            }
            if (/^1\d{10}$/.test(e)) {
                var p = this;
                o.judge(e).then(function(t) {
                    if (1 == t.type) {
                        var o = {
                            errObj: {
                                telError: 1,
                                errMsg: "该手机注册的京东账号已关联其他微信账号，请解除关联后重新登录并绑定。"
                            },
                            hasbind: 1,
                            tel: e,
                            bindaccount: e
                        }, s = Object.assign(p.data.popup, o);
                        p.setData({
                            popup: s
                        });
                    }
                    if (2 == t.type) {
                        var i = {
                            tel: e,
                            bindaccount: e,
                            type: 2,
                            isTel: 1
                        };
                        p.showLoginPage(p, i);
                    }
                    if (3 == t.type) {
                        var r = {
                            title: 3 != a ? "登录京东账号" : "补全账号信息",
                            type: 4,
                            tel: e,
                            bindaccount: e
                        };
                        p.setPopUpData(r);
                        var n = {
                            sendSign: 1,
                            sendTips: "请发送验证码至",
                            msgTips: "发送验证码",
                            tel: e,
                            bindaccount: e,
                            codeType: 0
                        };
                        p.setData({
                            msgCode: n
                        });
                    }
                });
            } else {
                var u = {
                    tel: e,
                    bindaccount: e
                };
                this.showLoginPage(this, u);
            }
        },
        getRsaInfo: function(t, e) {
            var a = this;
            if (1 == t && o.GetRsaKeyModulus().then(function(t) {
                var e = a.data.rsaObj;
                e.key = t.modulus, e.keyIndex = t.index, e.isGary = !0;
            }).catch(function(t) {}), 2 == t) {
                e = s.base64encode(encodeURIComponent(e));
                var r = this.data.rsaObj.key;
                i.setMaxDigits(131);
                var n = new i.RSAKeyPair("3", "10001", r, 1024);
                return s.base64encode(i.encryptedString(n, e, "PKCS1Padding", "RawEncoding"));
            }
        },
        getMsgCode: function(t, e) {
            var a = 0;
            o.GetRsaKeyModulus().then(function(r) {
                var n = r.modulus, p = r.index, u = s.base64encode(encodeURIComponent(t));
                i.setMaxDigits(131);
                var d = new i.RSAKeyPair("3", "10001", n, 1024), c = s.base64encode(i.encryptedString(d, u, "PKCS1Padding", "RawEncoding"));
                o.judgeIsCalled(c, p).then(function(s) {
                    a = s.checktype, o.getMsgCode(t, a).then(function(o) {
                        var s = 0 == o.retcode || 2 == o.retcode || 4 == o.retcode ? 0 : 7 == o.retcode ? 1 : 2, i = 0 == s ? 1 == a ? "您将收到028/010/12590/95/0592/0598/0874开头的来电，请输入来电中听到的数字验证码" : "验证码已发送至" : 1 == s ? "手机号格式错误，请返回重新输入" : "验证码将发送至";
                        if (Object.assign(e.data.msgCode, {
                            sendSign: s,
                            sendTips: i,
                            codeType: a,
                            bindaccount: t
                        }), e.setData({
                            msgCode: e.data.msgCode
                        }), 0 == s) {
                            var r = {
                                sendStatus: 1,
                                msgTips: "110秒"
                            };
                            Object.assign(e.data.popup, r), e.setData({
                                popup: e.data.popup
                            });
                            var n = 110;
                            f = setInterval(function() {
                                --n < 0 ? (clearInterval(f), r = {
                                    sendStatus: 0,
                                    msgTips: "重新发送"
                                }) : r = {
                                    sendStatus: 1,
                                    msgTips: n + "秒"
                                }, Object.assign(e.data.msgCode, r), e.setData({
                                    msgCode: e.data.msgCode
                                });
                            }, 1e3);
                        }
                    });
                });
            });
        },
        hide: function() {
            this.page.setData({
                popup: {}
            });
        },
        getPhoneNumber: function(t) {
            var e = this, a = {
                errObj: {}
            };
            Object.assign(e.data.popup, a), e.setData({
                popup: e.data.popup
            });
            u.PtagUtils.addPtag("7414.12.10"), wx.login({
                success: function(a) {
                    var s = {
                        code: a.code,
                        encrytData: t.detail.encryptedData,
                        iv: t.detail.iv
                    };
                    o.getPhoneNum(s).then(function(t) {
                        s = {
                            inputValue: {
                                delete4Value: t.phoneNum
                            }
                        }, Object.assign(e.data.popup, s), e.setData({
                            popup: e.data.popup
                        });
                    }).catch(function(t) {
                        e.toast.show({
                            icon: p.ICON.INFO,
                            content: "获取微信授权手机号失败，请手动输入~",
                            page: e
                        });
                    });
                },
                fail: function(t) {
                    e.toast.show({
                        icon: p.ICON.INFO,
                        content: "获取微信授权手机号失败，请手动输入~",
                        page: e
                    });
                }
            });
        },
        reportMsg: function(t) {
            o.reportMsg({
                d: t,
                t: "t_my_bind_popup"
            });
        }
    }
});