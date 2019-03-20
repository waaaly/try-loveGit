function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function t() {
    var e = {
        source: I.WE_CHAT
    };
    return f.request.get({
        url: "https://wq.jd.com/pinbind/QueryPinStatus",
        data: e
    }).then(function(e) {
        var t = e.body;
        return 0 == t.errcode ? d.default.resolve(t) : d.default.reject(new Error("code:" + t.errcode + "，message:" + t.errmsg));
    }, function(e) {
        return d.default.reject(e);
    });
}

function r() {
    var e = getCurrentPages().slice(0).pop(), t = e.route || e.__route__ || "";
    return t ? "/" + t : t;
}

function n(e) {
    return e ? f.request.get({
        url: "https://wq.jd.com/pinbind/switchAccount",
        data: {
            expectPin: h.base64encode(encodeURIComponent(e)),
            fromtype: "x",
            sceneid: "521192167",
            atk: 9,
            rurl: r()
        }
    }).then(function(e) {
        var t = e.body;
        return 0 == t.retcode ? d.default.resolve(t) : d.default.reject(t);
    }, function(e) {
        return d.default.reject(e);
    }) : d.default.reject(new Error("没有找到有效的账号"));
}

function o(e, t) {
    var r = e.encryptedKey, n = e.roleId;
    return t ? new d.default(function(e, t) {
        l.getcoupon(r, n, function(r, n, o) {
            return r ? t(r) : e({
                code: n,
                message: o
            });
        }, {
            sceneid: 3
        });
    }) : d.default.reject(new Error("未通过 pin 校验，不允许抽奖"));
}

function c(e) {
    g.MessageBox.confirm({
        title: e,
        buttons: [ {
            text: "稍后再说",
            handler: function() {
                g.MessageBox.hide();
            }
        }, {
            text: "去实名认证",
            cls: "btn_red",
            handler: function() {
                u(), g.MessageBox.hide();
            }
        } ]
    });
}

function u() {
    var e = r();
    f.request.get({
        url: "https://wq.jd.com/vipplus/LoginBrigdeAuthName",
        data: {
            scene: "weixin",
            bussinessType: 726,
            rurl: e
        }
    }).then(function(e) {
        var t = e.body;
        if (0 == t.retcode || 45 == t.retcode) {
            var r = {
                url: String(t.redirect).replace(/source=5/, "source=15")
            };
            v.goto("/pages/h5/index", r);
        } else m.show({
            page: getCurrentPages().pop(),
            icon: m.ICON.WARNING,
            content: "领券的人太多，请稍后重试～"
        });
    }, function(e) {
        N.error(e), m.show({
            page: getCurrentPages().pop(),
            icon: m.ICON.WARNING,
            content: "领券的人太多，请稍后重试～"
        });
    });
}

function a(e) {
    var t = e.code, r = e.message, n = !1, o = getCurrentPages().pop();
    switch (+t) {
      case 34:
      case 54:
        c(r), n = !1;
        break;

      case 147:
        m.show({
            page: o,
            icon: m.ICON.WARNING,
            content: "优惠券已抢光啦，下次早点来哟~"
        }), n = !1;
        break;

      case 14:
      case 15:
        m.show({
            page: o,
            icon: m.ICON.SUCCESS,
            content: "您今天已经参加过此活动，别太贪心哟，明天再来~"
        }), n = !0;
        break;

      case 999:
        m.show({
            page: o,
            icon: m.ICON.SUCCESS,
            content: "领券成功，可到个人中心-我的优惠券查看。"
        }), n = !0;
        break;

      default:
        m.show({
            page: o,
            icon: m.ICON.WARNING,
            content: r
        }), n = !1;
    }
    return d.default.resolve({
        success: n,
        code: t
    });
}

function s() {
    var e = this;
    return t().then(function(t) {
        return C.NEED_UPDATE_PROFILE == t.state || C.NO_ASSET_HAS_ACCOUNT == t.state ? (g.MessageBox.alert({
            icon: g.MessageBox.ICONS.INFO,
            title: "您正在领取京东优惠券，请先登录正式京东账号",
            buttons: [ {
                text: "去登录",
                handler: function() {
                    getApp().event.emit("cartrefresh", !1, !1, !0);
                    var e = {
                        sceneid: "531",
                        rurl: r()
                    };
                    v.goto("/pages/my_pages/account/account", e), g.MessageBox.hide();
                }
            } ]
        }), d.default.reject(!1)) : C.SWITHCHABLE == t.state && 1 == t.defaultFlag ? (g.MessageBox.confirm({
            scope: e,
            title: "您需要切换为正式京东账号才能领取优惠券",
            buttons: [ {
                text: "立即切换",
                handler: function() {
                    g.MessageBox.hide();
                    var r = t.pinList.find(function(e) {
                        return "0" == e.defaultFlag;
                    }), o = r ? r.pin : "";
                    n.call(e, o).then(function(e) {
                        b(x, !0).then(a).catch(function(e) {
                            N.error(e), m.show({
                                page: getCurrentPages().pop(),
                                icon: m.ICON.WARNING,
                                content: "活动太火爆了，请稍后重试"
                            });
                        }), getApp().event.emit("cartrefresh");
                    }).catch(function(e) {
                        N.error(e), m.show({
                            page: getCurrentPages().pop(),
                            icon: m.ICON.WARNING,
                            content: "切换失败，请稍后重试(" + (e.retcode || "") + ")"
                        });
                    });
                }
            } ]
        }), d.default.reject(!1)) : d.default.resolve(!0);
    }, function(e) {
        return d.default.reject(e);
    });
}

function i(e) {
    var t = this, r = {
        vid: e.vid,
        rid: e.rid,
        aid: e.aid
    };
    return f.request.get({
        url: "https://wq.jd.com/deal/couponquery/obtaincoupon",
        data: r
    }).then(function(e) {
        var n = e.body, o = 0 == n.errId, c = 13 == n.errId;
        return o ? d.default.resolve({
            code: 999
        }) : c ? login.doLogin().then(i.bind(t, r), function(e) {
            return d.default.reject(e);
        }) : d.default.resolve({
            code: n.resultCode || n.errId,
            message: n.errMsg
        });
    }, function(e) {
        return d.default.reject(e);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.hieRealNameMsgBox = exports.draw = void 0;

var d = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../libs/promise.min")), l = e(require("../../../../models/coupon/coupon_model.js")), f = require("../../../../common/request/request"), p = require("../../../../common/logger.js"), g = require("../../../components/message-box/index"), h = e(require("../../../../common/base64/base64")), m = e(require("../../../../common/toast/toast")), v = e(require("../../../../common/navigator")), N = new p.Logger("购物车-优惠券抽奖组件"), I = {
    WE_CHAT: 2
}, C = {
    NEED_UPDATE_PROFILE: 1,
    NO_ASSET_HAS_ACCOUNT: 2,
    SWITHCHABLE: 3,
    UNBINED: 4
}, b = function() {}, x = {};

exports.draw = function(e) {
    var t = e.encryptedKey, r = e.roleId, n = e.redpacket, c = e.shopId, u = e.actRuleId;
    return n ? (x = {
        vid: c,
        rid: u,
        aid: r
    }, b = i.bind(this, x)) : (x = {
        encryptedKey: t,
        roleId: r
    }, b = o.bind(this, x)), s().then(b).then(a);
}, exports.hieRealNameMsgBox = function(e) {
    g.MessageBox.hide();
};