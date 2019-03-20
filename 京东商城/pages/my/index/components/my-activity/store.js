function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = e(require("../../../models/assets_data.js")), n = t(require("../../../../../common/wxcontext")), c = require("../../../../../common/login/loginv1"), o = t(require("../.././../../../libs/promise.min.js")), r = require("../../../../../common/logger.js"), a = e(require("../../../models/account_data.js")), u = e(require("../../../../../common/toast/toast.js")), s = new r.Logger("my/indexv2"), l = 0;

exports.default = function() {
    return {
        state: {
            activityList: [],
            wrapHeight: "",
            isActRed: !1,
            isXCX: n.default.isXCX
        },
        actions: {
            fetchActivityInfo: function() {
                this.getMyActivityConfig(), this.getActivityRedPoint();
            },
            getActivityRedPoint: function() {
                var t = this;
                i.getRedIcon(2, 0).then(function(e) {
                    t.isActRed = e && e.data && e.data.length;
                });
            },
            removeRedIcon: function() {
                this.isActRed = !1, i.removeRedIcon(2);
            },
            getMyActivityConfig: function() {
                var t = this;
                n.default.isXCX && (l = 1019 == getApp().scene ? 1 : 0), i.getMyActivityConfig().then(function(e) {
                    var i = [ "抽奖", "购物礼包", "薅羊毛", "拼京豆", "京东公益", "免单", "我的砍价", "试用" ], c = e[0].actSet[0].defalutAct.filter(function(e) {
                        return !!e[t.activityUrlKey[t.env]].trim();
                    }).reduce(function(e, c) {
                        var o = new Date().getTime();
                        if (o >= new Date(c.startTime) && o <= new Date(c.endTime)) {
                            var r = c.actName, a = c.actUrl, u = c.actUrl_wq, s = c.actUrl_qq, f = c.actUrl_m, d = c.actImg, m = c.limit;
                            return c.actName.indexOf("充值") >= 0 && 1 == l ? e : 3 == t.env && "应用推荐" == c.actName && window.isQuickApp ? e : !t.$root.isShowModule && ~i.indexOf(r) ? e : e.concat([ {
                                actName: r,
                                actUrl: a,
                                actUrl_wq: u,
                                actUrl_qq: s,
                                actUrl_m: f,
                                actImg: n.default.JD.img.getImgUrl(d),
                                limit: m
                            } ]);
                        }
                        return e;
                    }, []);
                    t.activityList = c, t.lineNum = Math.ceil(t.activityList.length / 4), t.wrapHeight = t.lineNum > 3 ? 235 : 65 * t.lineNum;
                }).catch(function(t) {
                    s.error(t);
                });
            },
            changeToJd: function(t) {
                var e = this;
                (0, c.getLoginPromise)().then(function(i) {
                    return new o.default(function(e, i) {
                        a.changeAccount(t).then(function(t) {
                            0 == t.retcode ? e(t) : i(t.retcode);
                        }).catch(function(t) {
                            i(t);
                        });
                    }).then(function(t) {
                        n.default.isXCX ? (u.show({
                            icon: u.ICON.SUCCESS,
                            content: "切换成功",
                            duration: 500
                        }), setTimeout(function() {
                            e.$emit("changeAccountSuccess");
                        }, 500)) : window.location.href = n.default.JD.url.addUrlParam(location.href, {
                            time: new Date().getTime()
                        });
                    });
                }).catch(function(t) {
                    s.error(t), u.show({
                        icon: u.ICON.WARNING,
                        content: "切换账号失败，请稍后再试！",
                        duration: 1e3,
                        page: e
                    });
                });
            }
        }
    };
};