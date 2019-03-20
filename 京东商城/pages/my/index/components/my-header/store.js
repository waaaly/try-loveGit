function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./model")), i = require("../../../../../common/logger"), n = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../../../../../common/toast/toast")), r = e(require("../../../../../libs/promise.min")), a = e(require("../../../../../common/wxcontext")), o = new i.Logger("my/indexv2");

exports.default = function() {
    return {
        state: {
            bindgray: 0,
            isPlus: !1,
            isRealName: !0,
            nickName: "",
            plusTips: [],
            showXBCredit: !1,
            XBCreditWord: "小白信用",
            XBCreditScore: "",
            editNameShow: !1,
            editNameFail: !1,
            editNameFailMSg: "此昵称已被其他用户抢注，请修改",
            inputTop: ""
        },
        actions: {
            getIsPlusData: function() {
                var e = this;
                t.default.isPlus().then(function(t) {
                    201 != t.mapingstatus && 101 != t.mapingstatus || (e.isPlus = !0);
                });
            },
            getPlusTipsData: function() {
                var e = this, i = a.default.JD.report.umpStart("wq.webmonitor.my.plusTips.show", 47, 60, 6e3);
                return new r.default(function(n, r) {
                    t.default.getPlusTips().then(function(t) {
                        if (t && t.length) {
                            var r = [];
                            t.forEach(function(e, t) {
                                var i = Date.now(), n = new Date(e.startTime).getTime(), a = new Date(e.endTime).getTime();
                                i >= n && i <= a && (e.id = t, r.push({
                                    id: e.id,
                                    name: e.hotName
                                }));
                            }), r.length ? (e.plusTips = r, i(0)) : i(1);
                        } else i(1);
                        n();
                    }).catch(function(e) {
                        r(), o.error(e);
                    });
                });
            },
            verifyAuthUserData: function() {
                var e = this;
                return new r.default(function(i, n) {
                    t.default.verifyAuthUser().then(function(t) {
                        2 == t.status ? e.isRealName = !1 : e.isRealName = !0;
                    }).catch(function(e) {
                        o.error(e);
                    });
                });
            },
            getVerifyAuthUrl: function() {
                return new r.default(function(e, i) {
                    t.default.getVerifyAuthUrl().then(function(t) {
                        0 == t.retcode && e(t);
                    }).catch(function(e) {
                        i({
                            code: e.code
                        }), o.error(e);
                    });
                });
            },
            changeToJdData: function(e) {
                return new r.default(function(i, n) {
                    t.default.getLoginPromise().then(function(r) {
                        t.default.changeAccount(e).then(function(e) {
                            0 == e.retcode ? i(e) : n(e.retcode);
                        }).catch(function(e) {
                            n(e);
                        });
                    });
                });
            },
            queryXBCreditScore: function() {
                var e = this;
                return new r.default(function(i, n) {
                    t.default.queryXBCreditScore().then(function(t) {
                        var i = t.data[0].code;
                        0 == i ? (e.XBCreditWord = "小白信用", e.XBCreditScore = parseFloat(t.data[0].score).toFixed(1), 
                        e.showXBCredit = !0) : 915 != i && 916 != i && 917 != i || (e.XBCreditWord = "查看小白信用", 
                        e.showXBCredit = !0);
                    }).catch(function(e) {
                        o.error(e);
                    });
                });
            },
            getWindowWidth: function() {
                var e = void 0;
                try {
                    e = a.default.isXCX ? getApp().systemInfo.windowWidth : window.screen.width;
                } catch (e) {
                    o.error(e);
                }
                return e || 0;
            },
            saveNickName: function(e) {
                var i = this;
                return new r.default(function(r, a) {
                    t.default.changeNickName(e).then(function(t) {
                        0 == t.retcode ? (i.editNameShow = !1, i.$emit("changeNickName", e), n.show({
                            content: "修改昵称成功",
                            icon: n.ICON.SUCCESS,
                            duration: 1e3
                        })) : 103 == t.retcode ? (i.editNameFailMSg = "此昵称已被其他用户抢注，请修改", i.editNameFail = !0) : 1 == t.retcode ? (i.editNameFailMSg = "您的昵称不符合规则，请重新修改", 
                        i.editNameFail = !0) : (i.editNameFailMSg = "昵称修改失败，请稍后再试", i.editNameFail = !0);
                    }).catch(function(e) {
                        o.error(e), i.editNameFailMSg = "昵称修改失败，请稍后再试", i.editNameFail = !0;
                    });
                });
            }
        }
    };
};