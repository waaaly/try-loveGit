function e(e) {
    if (e && e.__esModule) return e;
    var a = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (a[t] = e[t]);
    return a.default = e, a;
}

function a(e, a, t) {
    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
    o.umpBiz({
        bizid: e,
        operation: a,
        result: t,
        message: r
    });
}

var t = require("../page"), r = e(require("../../common/user_info.js")), i = e(require("../../common/cookie-v2/cookie.js")), o = e(require("../../common/fe_report/usability.js")), n = require("../../api/Ptag/report_manager"), u = require("../../api/Ptag/Ptag_utils"), c = e(require("../../common/localStorage")), s = r.updateUserData;

new t.JDPage({
    data: {
        rurl: "",
        returnData: {},
        isPingou: !1
    },
    onLoad: function(e) {
        var t = i.getCookie("wxapp_type");
        this.setData({
            rurl: e.rurl && "/" === e.rurl[0] ? e.rurl : "/" + e.rurl,
            returnData: e.returnData || {},
            isPingou: 2 === t
        }), n.ReportManager.addPtagExposure("7608.2.1");
        var r = c.getSync("_LAST_LOGIN_TIME_");
        r && a(1002, 7, 0, "t: " + (Date.now() - r) + " openId: " + i.getCookie("open_id") + " wxappOpenId: " + i.getCookie("wxapp_openid"));
    },
    bindGetUserInfo: function(e) {
        var t = e.detail, r = t.errMsg;
        if (r && -1 !== r.indexOf("auth") && -1 !== r.indexOf("fail")) {
            u.PtagUtils.addPtag("7608.2.5"), a(1002, 6, 1, r);
            var o = {
                gender: 1,
                province: "Guangdong",
                city: "Shenzhen",
                country: "China",
                nickName: "JD用户",
                avatarUrl: "https://img11.360buyimg.com/jdphoto/s120x120_jfs/t13840/48/224229347/6400/4eec0fe2/5a0697abN8a425d5c.png",
                wxNickName: "JD用户",
                wxAvatarUrl: "https://img11.360buyimg.com/jdphoto/s120x120_jfs/t13840/48/224229347/6400/4eec0fe2/5a0697abN8a425d5c.png"
            };
            s(o), i.setCookie({
                data: o,
                defaultExpires: !0
            });
        } else {
            u.PtagUtils.addPtag("7608.2.4"), a(1002, 6, 0, ""), c.setSync("_LAST_LOGIN_TIME_", Date.now(), {
                expire: "365d"
            });
            var n = t.userInfo || {}, d = {
                gender: n.gender || 1,
                province: n.province || "Guangdong",
                city: n.city || "Shenzhen",
                country: n.country || "China",
                wxNickName: n.nickName || "JD用户",
                wxAvatarUrl: n.avatarUrl || "https://img11.360buyimg.com/jdphoto/s120x120_jfs/t13840/48/224229347/6400/4eec0fe2/5a0697abN8a425d5c.png",
                nickName: n.nickName || "JD用户",
                avatarUrl: n.avatarUrl || "https://img11.360buyimg.com/jdphoto/s120x120_jfs/t13840/48/224229347/6400/4eec0fe2/5a0697abN8a425d5c.png"
            };
            s(d);
            var g = this.data.rurl, p = this.data.returnData, l = this;
            i.setCookie({
                data: d,
                defaultExpires: !0,
                cb: function() {
                    l.$goto(g, p, "redirectTo");
                }
            });
        }
    },
    tapReport: function() {
        u.PtagUtils.addPtag("7608.2.2");
    }
});