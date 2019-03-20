function e(e) {
    var i = e.rurl, r = e.activeid, a = e.level, d = e.ptag, o = e.bindgray, s = e.forceScene, c = {
        ptag: d,
        sceneid: this.sceneid
    };
    i = i || (t.default.isXCX ? "/pages/my/index/index" : window.location.href), i = t.default.isXCX ? i : encodeURIComponent(decodeURIComponent(i));
    var u = o ? {
        returnText: "个人中心",
        returnUrl: i,
        activeid: r,
        activeLevel: a,
        forceScene: !!s
    } : {
        rurl: i,
        bindactiveid: r,
        bindlevel: a
    };
    Object.assign(n.delObjUndefinedKey(c), n.delObjUndefinedKey(u)), this.$xgoto([ o ? "/pages/my_pages/accountv2/index" : "/pages/my_pages/account/account", o ? "//wqs.jd.com/my/bindpopupv2/index.shtml" : "//wqs.jd.com/my/bindmobilev2.shtml" ], c);
}

function i(e) {
    var i = this, n = t.default.JD.cookie.get("wq_uin");
    Array.isArray(this.grayInfo) && this.grayInfo.forEach(function(t) {
        var r = new Date().getTime();
        if (t.sceneid == e && r >= new Date(t.startTime) && r <= new Date(t.endTime)) {
            var a = t.whiteList;
            "" != a && new RegExp(a).test(n) || "" != t.widTail && parseInt(n.slice(-1)) <= parseInt(t.widTail) ? (i.bindgray = 1, 
            i.sceneid = t.sceneid) : (i.bindgray = 0, i.sceneid = t.old_sceneid);
        }
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.mustBind = exports.sureBindGrayConfig = exports.goBindPage = void 0;

var n = function(e) {
    if (e && e.__esModule) return e;
    var i = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (i[n] = e[n]);
    return i.default = e, i;
}(require("./utils")), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../common/wxcontext"));

exports.goBindPage = e, exports.sureBindGrayConfig = i, exports.mustBind = function(n, t, r) {
    if (n && 0 != n.definePin && n.isbind) return i.call(this, t), e.call(this, {
        ptag: r,
        bindgray: this.bindgray,
        forceScene: !0
    }), !0;
};