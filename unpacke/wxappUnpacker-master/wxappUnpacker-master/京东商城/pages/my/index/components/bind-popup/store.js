function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = e(require("./model")), t = e(require("../../../../../libs/promise.min.js")), u = new (require("../../../../../common/logger.js").Logger)("my/indexv2");

exports.default = function() {
    return {
        state: {
            popup: {
                show: 0,
                type: 0,
                title: "",
                content: "",
                accountType: 0,
                pin: "",
                inputValue: {},
                errObj: {},
                codeType: 0,
                accountTipsShow: 0,
                unbindTipsShow: 0,
                picCode: "",
                cid: "",
                hasbind: 0,
                usernameError: 0,
                errMsg: "",
                passwordError: 0,
                verifyCodeError: 0,
                otherError: 0,
                telError: 0,
                tel: "",
                bindaccount: ""
            },
            msgCode: {
                checkType: 0,
                sendStatus: 0,
                msgTips: ""
            },
            rsaObj: {}
        },
        actions: {
            getCurPinInfo: function(e) {
                return new t.default(function(t, u) {
                    n.default.getCurPinInfo(e).then(function(e) {
                        t(e);
                    }).catch(function(e) {
                        u();
                    });
                });
            },
            getImgCode: function() {
                return new t.default(function(e, t) {
                    n.default.getImgCode().then(function(n) {
                        e(n);
                    }).catch(function(e) {
                        t(e), u.error(e);
                    });
                });
            },
            judge: function(e) {
                return new t.default(function(t, r) {
                    n.default.judge(e).then(function(e) {
                        t(e);
                    }).catch(function(e) {
                        r(e), u.error(e);
                    });
                });
            },
            getPhoneNum: function(e) {
                return new t.default(function(t, r) {
                    n.default.getPhoneNum(e).then(function(e) {
                        t(e);
                    }).catch(function(e) {
                        r(e), u.error(e);
                    });
                });
            },
            judgeIsCalled: function(e, t) {
                return n.default.judgeIsCalled(e, t);
            },
            GetRsaKeyModulus: function() {
                return console.log(n.default), n.default.GetRsaKeyModulus();
            },
            getMsgCode: function(e, r) {
                return new t.default(function(t, o) {
                    n.default.getMsgCode(e, r).then(function(e) {
                        t(e);
                    }).catch(function(e) {
                        o(e), u.error(e);
                    });
                });
            },
            complete: function(e) {
                return new t.default(function(t, r) {
                    n.default.complete(e).then(function(e) {
                        t(e);
                    }).catch(function(e) {
                        r(e), u.error(e);
                    });
                });
            },
            register: function(e) {
                return new t.default(function(t, r) {
                    n.default.register(e).then(function(e) {
                        t(e);
                    }).catch(function(e) {
                        r(e), u.error(e);
                    });
                });
            },
            drawCoupon: function(e, t, u) {
                n.default.drawCoupon(e, t, u);
            },
            queryOtherPinAssets: function() {
                return new t.default(function(e, t) {
                    n.default.queryOtherPinAssets().then(function(n) {
                        0 == n.errcode ? e(n) : t(n);
                    }).catch(function(e) {
                        t(e), u.error(e);
                    });
                });
            },
            bind: function(e) {
                return new t.default(function(t, r) {
                    n.default.bind(e).then(function(e) {
                        t(e);
                    }).catch(function(e) {
                        r(e), u.error(e);
                    });
                });
            }
        }
    };
};