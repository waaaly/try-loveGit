function e(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("../../../models/assets_data")), t = require("../../../../../common/login/loginv1"), i = e(require("../../../models/account_data")), o = r.getPlusTips, u = r.getVerifyAuthUrl, n = r.verifyAuthUser, s = r.queryXBCreditScore, a = r.changeNickName, c = r.isPlus, l = i.changeAccount, g = i.getBindGrayConfig, d = {
    isPlus: c,
    getPlusTips: o,
    getVerifyAuthUrl: u,
    getLoginPromise: t.getLoginPromise,
    verifyAuthUser: n,
    changeAccount: l,
    queryXBCreditScore: s,
    changeNickName: a,
    getBindGrayConfig: g
};

exports.default = d;