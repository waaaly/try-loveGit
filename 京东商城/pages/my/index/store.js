function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function n(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
    return n.default = e, n;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = n(require("../models/account_data.js")), t = n(require("../../../common/toast/toast")), i = n(require("../common/js/utils")), r = n(require("../common/js/bind")), a = n(require("../models/assets_data.js")), s = e(require("../../../libs/promise.min.js")), c = e(require("../../../common/wxcontext"));

exports.default = function() {
    return {
        state: {
            delayRender: !1,
            grayInfo: [],
            userInfo: {},
            userInfoNotError: !1,
            jdNum: "",
            fromPinGouApp: 0,
            popup: {
                show: 0,
                bindpopupOptions: {}
            },
            isShowAdBanner: !1,
            env: i.getEnv(),
            isNewUser: -1,
            newBindConfig: [],
            recommendOptions: {},
            h5RecomendOptions: {},
            atmosImgConfig: {},
            adConfig: {},
            isShowModule: !0,
            showBack: !1,
            isKaipule: !1
        },
        actions: {
            fetchUserInfo: function(e) {
                var n = this;
                return new s.default(function(i, r) {
                    o.getCurPinInfo({}).then(function(e) {
                        n.speedMark(4), i(), e && 0 == e.retcode ? (n.dealUserInfo(e), n.userInfoNotError = !0) : (n.userInfo = n.defaultUserInfo, 
                        n.userInfoNotError = !1), n.getIsNew();
                    }).catch(function(o) {
                        e ? (r(o), n.userInfo = n.defaultUserInfo, n.userInfoNotError = !1, ("-20" == o || "-40" == o || "-30" == o || "-10" == o) && t.show({
                            icon: t.ICON.WARNING,
                            content: "请检查你的网络是否正常！",
                            duration: 2e3
                        })) : i(n.fetchUserInfo(!0));
                    });
                });
            },
            forceBind: function() {
                var e = this.isForceBind ? 721394549 : this.isNoAssetsBind ? 721394549 : "";
                e ? (r.sureBindGrayConfig.call(this, e), this.bindgray ? r.goBindPage.call(this, {
                    bindgray: this.bindgray,
                    forceScene: !0
                }) : this.getMyNewBindConfig()) : this.getMyNewBindConfig();
            },
            dealUserInfo: function(e) {
                var n = this, o = e.base.levelName, t = e.base.jvalue, r = "";
                "企业用户" === o ? r = "v0" : t >= 0 && t < 5e3 ? r = "v2" : t >= 5e3 && t < 1e4 ? r = "v3" : t >= 1e4 && t < 2e4 ? r = "v4" : t >= 2e4 && (r = "v5"), 
                this.userInfo = {
                    pin: e.base.curPin,
                    nickName: e.base.nickname,
                    avatarUrl: e.base.headImageUrl || "https://img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png",
                    definePin: e.definePin,
                    level: r,
                    jvalue: e.base.jvalue,
                    pinlist: e.base.pinlist,
                    jdNum: e.base.jdNum >= 1e5 ? i.toTenThousands(e.base.jdNum.toString()) : i.toThousands(e.base.jdNum.toString()),
                    orderFlag: e.orderFlag,
                    isbind: !(1 != e.definePin && 2 != e.definePin || 3 == e.base.accountType),
                    curpinType: e.curpinType,
                    accountType: e.accountType,
                    isHitArea: e.isHitArea
                }, this.jdNum = this.userInfo.jdNum.toString(), this.$nextTick().then(function() {
                    n.speedMark(5).speedReport();
                });
            },
            getIsNew: function() {
                var e = this;
                o.QueryIsNewUser().then(function(n) {
                    e.isNewUser = 2 == n.isNewUser && 0 == e.userInfo.definePin ? 1 : 0;
                    var o = e.userInfo;
                    1 == o.isHitArea && o.isbind && (e.isForceBind = 1 == o.accountType, e.isNoAssetsBind = 2 == o.accountType), 
                    3 != e.env && (o.isbind || e.isNewUser) && e.getBindGrayConfig().then(function() {
                        e.forceBind();
                    });
                });
            },
            getBindGrayConfig: function() {
                var e = this;
                return new s.default(function(n, t) {
                    o.getBindGrayConfig().then(function(o) {
                        e.grayInfo = o, n();
                    }).catch(function(o) {
                        e.grayInfo = {}, n();
                    });
                });
            },
            getMyNewBindConfig: function() {
                var e = this;
                a.getMyNewBindConfig().then(function(n) {
                    e.newBindConfig = n;
                }).catch(function(n) {
                    e.newBindConfig = [];
                });
            },
            setAdConfig: function() {
                var e = this;
                o.getAdConfig().then(function(n) {
                    var o = i.getCurDatePpms(n)[0];
                    if (o) {
                        var t = o.env.split(";").indexOf(e.env.toString()) > -1;
                        if (o && t) {
                            var r = o.urlH5, a = o.urlXcx;
                            e.adConfig = {
                                img: c.default.JD.performance.getScaleImg(o.img),
                                urlH5: r,
                                urlXcx: a
                            };
                        }
                    }
                }).catch(function(e) {
                    e.code;
                    var n = e.message;
                    console.error(n);
                });
            },
            setAtmosImgConfig: function() {
                var e = this;
                o.getAtmosImgConfig().then(function(n) {
                    var o = i.getCurDatePpms(n)[0];
                    if (o) {
                        var t = o.arrowBgColor, r = o.arrowTextColor, a = o.accountTextColor;
                        e.atmosImgConfig = {
                            headerBg: {
                                headerBg: c.default.JD.performance.getScaleImg(o.headerBg),
                                headImg: c.default.JD.performance.getScaleImg(o.headImg),
                                arrowBgColor: t,
                                arrowTextColor: r,
                                accountTextColor: a,
                                accountIcon: c.default.JD.performance.getScaleImg(o.accountIcon)
                            },
                            toutiaoBg: c.default.JD.performance.getScaleImg(o.toutiaoBg)
                        }, e.recommendOptions = {
                            titleBg: c.default.JD.performance.getScaleImg(o.recommendImg)
                        };
                    }
                }).catch(function(e) {
                    e.code;
                    var n = e.message;
                    console.error(n);
                });
            },
            getIsKaipule: function() {
                var e = this;
                o.getIsKaipule().then(function(n) {
                    e.isKaipule = !!n.isHideNavi;
                }).catch(function(e) {
                    e.code;
                    var n = e.message;
                    console.error(n);
                });
            },
            setH5RecOptions: function() {
                var e = this;
                setTimeout(function() {
                    e.h5RecomendOptions = {
                        recKey: 3 == e.env ? "MmyPage" : "myPage"
                    };
                }, 600);
            }
        }
    };
};