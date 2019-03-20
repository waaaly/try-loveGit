function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function o(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = t(require("./store")), r = t(require("../../../../../common/wxcontext")), s = e(require("../../../../../common/rsa/rsa")), n = e(require("../../../../../common/base64/base64")), a = require("../../../../../common/logger.js"), p = e(require("../../../../../common/toast/toast.js")), u = require("../../../../../api/Ptag/report_manager_wqvue"), c = new a.Logger("bindpopup"), d = 0, l = void 0, g = 521293285, h = {
    store: i.default,
    props: {
        options: {
            type: Object,
            default: {}
        }
    },
    created: function() {
        var e = this;
        this.getRsaInfo(1), this.getCurPinInfo({
            sceneid: 521293285
        }).then(function(t) {
            if (1 != t.accountType && 2 != t.accountType && 3 != t.accountType) p.show({
                icon: p.ICON.SUCCESS,
                content: "您的京东账号已关联微信账号，请继续购物",
                page: e
            }); else {
                var o = {
                    type: 3 == t.accountType ? 1 : 3,
                    title: "登录京东商城",
                    accountType: t.accountType,
                    pin: t.base.curPin,
                    rurl: e.$root.route,
                    show: 1
                };
                e.setPopUpData(Object.assign(e.popup, o));
                var i = 3 == t.accountType ? "7414.12.1" : "7414.12.2";
                u.ReportManager.addPtagExposure(i), u.ReportManager.addPtagExposure("7414.12.13");
            }
        }).catch(function(e) {}), g = this.options.sceneid;
    },
    created_xcx: function(e) {},
    mounted: function() {
        u.ReportManager.addPtagExposure("138268.3.1");
    },
    methods: {
        toLoginPage: function() {
            this.showLoginPage(this), u.ReportManager.addPtag("7414.12.3");
        },
        showLoginPage: function(e, t) {
            this.getImgCode().then(function(o) {
                var i = {
                    type: 2,
                    title: "登录京东账号",
                    picCode: "https:" + o.url,
                    cid: o.cid,
                    tel: ""
                };
                Object.assign(i, t), e.setPopUpData(i);
            }).catch(function(e) {
                c.error(e);
            });
        },
        tocompletePage: function() {
            var e = {
                title: "补全账号信息",
                type: 3
            };
            this.setPopUpData(e), u.ReportManager.addPtag("7414.12.4");
        },
        showAccountTips: function() {
            var e = {
                accountTipsShow: 1,
                show: 0
            };
            Object.assign(this.popup, e);
        },
        closeAccountTips: function() {
            var e = {
                accountTipsShow: 0,
                show: 1
            };
            Object.assign(this.popup, e);
        },
        setStorage: function(e) {
            var t = r.default.JD.cookie.get("backInfo");
            if (t) {
                console.log(t), e.inputValue = {}, e.errObj = {};
                var o = t || [];
                if (o && o.split("|") && o.split("|")[d - 1]) {
                    var i = o.split("|");
                    i[d - 1] = JSON.stringify(e), o = i.join("|");
                } else o = (o || "") + "|" + JSON.stringify(e);
                r.default.JD.cookie.set("backInfo", o, {
                    expire: "1d"
                }), r.default.JD.cookie.get("backInfo") || c.error("backInfo写storage失败");
            } else r.default.JD.cookie.set("backInfo", JSON.stringify(e), {
                expire: "1d"
            }), r.default.JD.cookie.get("backInfo") || c.error("backInfo写storage失败"), r.default.JD.report.umpBiz({
                bizid: 898,
                operation: 4,
                result: 1,
                message: JSON.stringify(e)
            });
        },
        setPopUpData: function(e, t) {
            if (e.inputValue && 3 != t && (e.inputValue = Object.assign(this.popup.inputValue, e.inputValue)), 
            Object.assign(this.popup, e), 0 == d || 1 == t) {
                var o = this;
                r.default.JD.cookie.del("backInfo"), 3 != t && 2 != t && (d++, o.setStorage(this.popup));
            } else 3 != t && 2 != t && (d++, this.setStorage(this.popup));
        },
        closePopUp: function(e) {
            var t = {
                show: 0
            };
            this.setPopUpData(t, 2), this.$emit("setBindPopUpStatus", e);
        },
        toBind: function(e) {
            var t = {
                sceneid: g,
                username: this.getRsaInfo(2, 3 == this.popup.accountType ? this.popup.tel ? this.popup.tel : this.toTrim(e.detail.value.username) : this.popup.bindaccount),
                passwd: this.getRsaInfo(2, this.toTrim(e.detail.value.password)),
                picid: this.popup.cid,
                piccode: this.toTrim(e.detail.value.verifyCode),
                rurl: this.popup.rurl,
                index: this.rsaObj.keyIndex,
                atk: 9
            }, o = this, i = o.popup;
            this.getValidator(1, e, function(e) {
                if (!e) return !1;
                o.bind(t).then(function(e) {
                    0 == e.retcode && o.showResult(1), 1 == e.isUpdateCode && o.getImgCode().then(function(e) {
                        var t = {
                            picCode: "https:" + e.url,
                            cid: e.cid
                        };
                        Object.assign(o.popup, t);
                    }).catch(function(e) {
                        c.error(e);
                    });
                    var t = {
                        errObj: 21 == e.retcode || 20 == e.retcode ? {
                            verifyCodeError: 1,
                            errMsg: e.tips
                        } : 50 == e.retcode || 52 == e.retcode ? {
                            passwordError: 1,
                            errMsg: e.tips
                        } : {
                            otherError: 1,
                            errMsg: e.tips
                        }
                    };
                    Object.assign(o.popup, t);
                }).catch(function(e) {
                    c.error(e);
                });
            });
            var r = 3 == i.accountType ? "7414.12.7" : "7414.12.9";
            u.ReportManager.addPtag(r);
        },
        toBack: function(e) {
            var t = this, o = e, i = r.default.JD.cookie.get("backInfo");
            if (i) {
                console.log(i);
                var s = i;
                if (s && s.split("|") && s.split("|")[d - 2]) s.split("|")[d - 2].type, t.setPopUpData(JSON.parse(s.split("|")[d - 2]), 3), 
                d -= 1; else {
                    d -= 1;
                    var n = {
                        show: 0
                    };
                    t.setPopUpData(n, 3), t.triggerEvent("setBindPopUpStatus", o);
                }
                clearInterval(l);
            } else r.default.JD.report.umpBiz({
                bizid: 898,
                operation: 4,
                result: 2,
                message: "返回写缓存失败"
            });
        },
        closeUnbindTips: function() {
            var e = {
                unbindTipsShow: 0,
                show: 1
            };
            Object.assign(this.popup, e);
        },
        unbindTel: function() {
            var e = {
                unbindTipsShow: 1,
                show: 0
            };
            Object.assign(this.popup, e);
        },
        toUnbindTel: function() {
            var e = {};
            e.rurl = encodeURIComponent(this.popup.rurl), e.tel = this.popup.tel ? n.base64encode(this.popup.tel) : "", 
            e.sceneid = g, u.ReportManager.addPtag("7414.12.12");
            var t = "//wqs.jd.com/my/unbindtel.shtml?rurl=" + e.rurl + "&tel=" + e.tel + "&sceneid=" + e.sceneid;
            this.$xgoto([ t ]);
        },
        inputBlur: function(e) {
            var t = "delete" + e.target.dataset.sign + "Value", i = "input" + e.target.dataset.sign + "Focus", r = o({
                inputValue: Object.assign(this.popup.inputValue, o({}, t, e.detail.value))
            }, i, 0);
            this.setPopUpData(r, 2);
        },
        inputFocus: function(e) {
            var t, i = "delete" + e.target.dataset.sign + "Value", r = "input" + e.target.dataset.sign + "Focus", s = (t = {
                inputValue: Object.assign(this.popup.inputValue, o({}, i, e.detail.value))
            }, o(t, r, 1), o(t, "errObj", {}), t);
            this.setPopUpData(s, 2);
        },
        deleteVal: function(e) {
            var t, i = "delete" + e.target.dataset.sign, r = "delete" + e.target.dataset.sign + "Value", s = (t = {}, 
            o(t, i, 1), o(t, "inputValue", o({}, r, "")), t);
            this.setPopUpData(s, 2);
        },
        seeOrno: function(e) {
            var t = {};
            t = 1 == this.popup.seeSign ? {
                seeSign: 0
            } : {
                seeSign: 1
            }, this.setPopUpData(t, 2);
        },
        getPicCode: function() {
            var e = this;
            this.getImgCode().then(function(t) {
                var o = {
                    picCode: "https:" + t.url,
                    cid: t.cid
                };
                Object.assign(e.popup, o);
            }).catch(function(e) {
                c.error(e);
            });
        },
        forgetPsw: function() {
            u.ReportManager.addPtag("7414.12.11");
            var e = "//plogin.m.jd.com/cgi-bin/m/mfindpwd?appid=300&returnurl=" + decodeURIComponent("https://wqs.jd.com/" + this.popup.rurl);
            this.$xgoto([ e ]);
        },
        showResult: function(e) {
            var t = this.options.bindactiveid ? this.options.bindactiveid : "", o = this.options.bindlevel ? this.options.bindlevel : -1, i = {}, s = this;
            "" == t || -1 == o ? (i = {
                type: 5,
                resultTips: 1 == e ? "登录成功" : "补全信息成功",
                drawTips: ""
            }, this.setPopUpData(i), r.default.JD.cookie.del([ "wq_uin", "wq_skey" ])) : this.drawCoupon(t, o, function(t) {
                i = 0 == t.ret && 0 == t.bingo.bingoret && 0 != t.bingo.bingolevel ? {
                    type: 5,
                    resultTips: 1 == e ? "登录成功" : "补全信息成功",
                    drawTips: "恭喜获得" + t.award.awardcode + "元优惠券"
                } : {
                    type: 5,
                    resultTips: 1 == e ? "登录成功" : "补全信息成功",
                    drawTips: "抱歉，优惠券已发完"
                }, s.setPopUpData(i), 3 == s.accountType ? s.otherPin && r.default.JD.cookie.del([ "wq_uin", "wq_skey" ]) : r.default.JD.cookie.del([ "wq_uin", "wq_skey" ]);
            }), 3 == this.accountType && this.queryOtherPinAssets().then(function(e) {
                if (0 == e.errcode) {
                    for (var t = 0; t < e.anotherpin.length; t++) if (1 == e.pintype[t]) {
                        e.jbean = e.jbeannum[t], e.jdcoupon = e.jdcouponnum[t];
                        break;
                    }
                    var o = e.anotherpin.length > 0 && (e.jbean > 0 || e.jdcoupon > 0) ? 1 : 0, n = e.anotherpin.length > 0 ? e.anotherpin[0] : "", a = e.jdcoupon, p = e.jbean;
                    i = {
                        hasAssets: o,
                        otherPin: n,
                        otherPinCoupon: a,
                        otherPinJbean: p
                    }, s.setPopUpData(i);
                }
                s.resultTips && r.default.JD.cookie.del([ "wq_uin", "wq_skey" ]);
            }).catch(function(e) {
                c.error(e);
            });
        },
        judgeTel: function(e) {
            this.getTelValidator(e);
            var t = 3 == this.popup.accountType ? "7414.12.5" : "7414.12.8";
            u.ReportManager.addPtag(t);
        },
        toTrim: function(e) {
            return console.log(e), e ? e.replace(/(^\s+)|(\s+$)/g, "") : e;
        },
        getValidator: function(e, t, o) {
            var i = {
                errObj: {
                    usernameError: 0,
                    passwordError: 0,
                    verifyCodeError: 0,
                    telError: 0
                },
                hasbind: 0
            };
            if (Object.assign(this.popup, i), 1 != e) {
                if (2 == e) {
                    var r = this.toTrim(t.detail.value.password), s = this.toTrim(t.detail.value.msgcode), n = "";
                    if ("" == r || "" == s) return n = "" == s ? "请输入验证码" : "请输入密码", i = {
                        errObj: "" == s ? {
                            verifyCodeError: 1,
                            errMsg: n
                        } : {
                            passwordError: 1,
                            errMsg: n
                        }
                    }, Object.assign(this.popup, i), void o(0);
                    var a = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/.test(r), p = /^\d+$/.test(r), u = /^[a-zA-Z]+$/.test(r);
                    if (!a || p || u) return n = "6-20个字符（字母、数字和符号），建议至少使用2种组合", i = {
                        errObj: {
                            passwordError: 1,
                            errMsg: n
                        }
                    }, Object.assign(this.popup, i), void o(0);
                    o(1);
                }
            } else {
                var c = this.toTrim(3 == this.popup.accountType ? this.popup.tel ? this.popup.tel : t.detail.value.username : this.popup.bindaccount), d = this.toTrim(t.detail.value.password), l = this.toTrim(t.detail.value.verifyCode);
                if ("" == c || "" == d || "" == l) {
                    var g = "" == c ? "请输入用户名/邮箱/手机号" : "" == d ? "请输入密码" : "请输入验证码";
                    return i = {
                        errObj: "" == c ? {
                            usernameError: 1,
                            errMsg: g
                        } : "" == d ? {
                            passwordError: 1,
                            errMsg: g
                        } : {
                            verifyCodeError: 1,
                            errMsg: g
                        }
                    }, Object.assign(this.popup, i), void o(0);
                }
                o(1);
            }
        },
        getTelValidator: function(e) {
            var t = this.toTrim(e.detail.value.tel), o = this.popup.accountType;
            if ("" == t) {
                var i = {
                    errObj: {
                        telError: 1,
                        errMsg: 3 == o ? "请输入手机号" : "请输入手机号/邮箱/账户名"
                    }
                };
                return Object.assign(this.popup, i), !1;
            }
            if (3 == this.popup.accountType && !/^1\d{10}$/.test(t)) {
                var r = {
                    errObj: {
                        telError: 1,
                        errMsg: "手机号码输入有误，请重新输入。目前暂不支持非大陆手机号码。"
                    }
                };
                return Object.assign(this.popup, r), !1;
            }
            if (/^1\d{10}$/.test(t)) {
                var s = this;
                this.judge(t).then(function(e) {
                    if (1 == e.type) {
                        var i = {
                            errObj: {
                                telError: 1,
                                errMsg: "该手机注册的京东账号已关联其他微信账号，请解除关联后重新登录并绑定。"
                            },
                            hasbind: 1,
                            tel: t,
                            bindaccount: t
                        };
                        Object.assign(s.popup, i);
                    }
                    if (2 == e.type) {
                        var r = {
                            tel: t,
                            bindaccount: t,
                            type: 2,
                            isTel: 1
                        };
                        s.showLoginPage(s, r);
                    }
                    if (3 == e.type) {
                        var n = {
                            title: 3 != o ? "登录京东账号" : "补全账号信息",
                            type: 4,
                            tel: t,
                            bindaccount: t
                        };
                        s.setPopUpData(n);
                        var a = {
                            sendSign: 1,
                            sendTips: "请发送验证码至",
                            msgTips: "发送验证码",
                            tel: t,
                            bindaccount: t,
                            codeType: 0
                        };
                        s.msgCode = a;
                    }
                });
            } else {
                var n = {
                    tel: t,
                    bindaccount: t
                };
                this.showLoginPage(this, n);
            }
        },
        getPhoneNumber: function(e) {
            var t = this, o = {
                errObj: {}
            };
            Object.assign(t.popup, o);
            u.ReportManager.addPtag("7414.12.10"), wx.login({
                success: function(o) {
                    var i = {
                        code: o.code,
                        encrytData: e.detail.encryptedData,
                        iv: e.detail.iv
                    };
                    t.getPhoneNum(i).then(function(e) {
                        i = {
                            inputValue: {
                                delete4Value: e.phoneNum
                            }
                        }, Object.assign(t.popup, i);
                    }).catch(function(e) {
                        p.show({
                            icon: p.ICON.INFO,
                            content: "获取微信授权手机号失败，请手动输入~",
                            page: t
                        }), c.error(e);
                    });
                },
                fail: function(e) {
                    p.show({
                        icon: p.ICON.INFO,
                        content: "获取微信授权手机号失败，请手动输入~",
                        page: t
                    });
                }
            });
        },
        getMessageCode: function(e, t) {
            var o = this, i = 0;
            this.GetRsaKeyModulus().then(function(r) {
                var a = r.modulus, p = r.index, u = n.base64encode(encodeURIComponent(e));
                s.setMaxDigits(131);
                var d = new s.RSAKeyPair("3", "10001", a, 1024), g = n.base64encode(s.encryptedString(d, u, "PKCS1Padding", "RawEncoding"));
                o.judgeIsCalled(g, p).then(function(r) {
                    i = r.checktype, o.getMsgCode(e, i).then(function(o) {
                        var r = 0 == o.retcode || 2 == o.retcode || 4 == o.retcode ? 0 : 7 == o.retcode ? 1 : 2, s = 0 == r ? 1 == i ? "您将收到028/010/12590/95/0592/0598/0874开头的来电，请输入来电中听到的数字验证码" : "验证码已发送至" : 1 == r ? "手机号格式错误，请返回重新输入" : "验证码将发送至";
                        if (t.msgCode = Object.assign(t.msgCode, {
                            sendSign: r,
                            sendTips: s,
                            codeType: i,
                            bindaccount: e
                        }), 0 == r) {
                            var n = {
                                sendStatus: 1,
                                msgTips: "110秒"
                            };
                            Object.assign(t.popup, n);
                            var a = 110;
                            l = setInterval(function() {
                                --a < 0 ? (clearInterval(l), n = {
                                    sendStatus: 0,
                                    msgTips: "重新发送"
                                }) : n = {
                                    sendStatus: 1,
                                    msgTips: a + "秒"
                                }, Object.assign(t.msgCode, n);
                            }, 1e3);
                        }
                    }).catch(function(e) {
                        c.error(e);
                    });
                });
            });
        },
        sendMsgCode: function() {
            var e = this.msgCode;
            if (1 == e.sendStatus && 0 == e.sendSign) return !0;
            this.getMessageCode(e.tel, this);
        },
        getRsaInfo: function(e, t) {
            var o = this;
            if (1 == e && this.GetRsaKeyModulus().then(function(e) {
                var t = o.rsaObj;
                t.key = e.modulus, t.keyIndex = e.index, t.isGary = !0;
            }).catch(function(e) {
                c.error(e);
            }), 2 == e) {
                t = n.base64encode(encodeURIComponent(t));
                var i = this.rsaObj.key;
                s.setMaxDigits(131);
                var r = new s.RSAKeyPair("3", "10001", i, 1024);
                return n.base64encode(s.encryptedString(r, t, "PKCS1Padding", "RawEncoding"));
            }
        },
        toComplete: function(e) {
            var t = {
                sceneid: g,
                mobile: this.getRsaInfo(2, this.popup.bindaccount),
                passwd: this.getRsaInfo(2, this.toTrim(e.detail.value.password)),
                smscode: this.toTrim(e.detail.value.msgcode),
                rurl: this.popup.rurl,
                index: this.rsaObj.keyIndex,
                atk: 9
            }, o = this.popup.accountType, i = this;
            this.getValidator(1, e, function(e) {
                if (!e) return !1;
                3 == o && i.complate(t).then(function(e) {
                    0 == e.retcode && i.showResult(2);
                    var t = {
                        errObj: 21 == e.retcode || 20 == e.retcode ? {
                            verifyCodeError: 1,
                            errMsg: e.tips
                        } : 50 == e.retcode || 52 == e.retcode ? {
                            passwordError: 1,
                            errMsg: e.tips
                        } : {
                            otherError: 1,
                            errMsg: e.tips
                        }
                    };
                    Object.assign(i.popup, t);
                }).catch(function(e) {
                    c.error(e);
                }), 1 != o && 2 != o || i.register(t).then(function(e) {
                    0 == e.retcode && i.showResult(2);
                    var t = {
                        errObj: 21 == e.retcode || 20 == e.retcode ? {
                            verifyCodeError: 1,
                            errMsg: e.tips
                        } : 50 == e.retcode || 52 == e.retcode ? {
                            passwordError: 1,
                            errMsg: e.tips
                        } : {
                            otherError: 1,
                            errMsg: e.tips
                        }
                    };
                    Object.assign(i.popup, t);
                }).catch(function(e) {
                    c.error(e);
                });
            });
            var r = 3 == o ? "7414.12.6" : "7414.12.9";
            u.ReportManager.addPtag(r);
        },
        toDone: function(e) {
            var t = {
                show: 0
            };
            this.setPopUpData(t, 2), r.default.JD.cookie.del([ "wq_uin", "wq_skey" ]), this.$emit("setUserInfo", e), 
            this.$emit("setBindPopUpStatus", e);
        }
    }
};

exports.default = h;