function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = t(require("./store")), n = e(require("../../../../../common/toast/toast")), o = require("../../../../../common/logger"), a = t(require("../../../../../common/wxcontext")), r = e(require("../../../common/js/utils")), u = t(require("../../../../../api/Ptag/report_manager_wqvue")), s = e(require("../../../common/js/bind")), c = new o.Logger("my/indexv2"), d = {
    props: {
        userInfo: {
            type: Object,
            default: function() {
                return {};
            }
        },
        userInfoNotError: {
            type: Boolean,
            default: !0
        },
        grayInfo: {
            type: Array,
            default: function() {
                return [];
            }
        },
        newBindConfig: {
            type: Array,
            default: function() {
                return [];
            }
        },
        atmosConfig: {
            type: Object,
            default: function() {
                return {
                    headerBg: "",
                    headImg: "",
                    accountIcon: "",
                    arrowBgColor: "",
                    arrowTextColor: "",
                    accountTextColor: ""
                };
            }
        }
    },
    watch: {
        userInfo: function(e, t) {
            0 != Object.keys(e).length && (this.userInfo = e, this.nickName = this.userInfo.nickName, 
            e.curpinType != t.curpinType && (this.verifyAuthUser(), this.$root.isShowModule && this.dealXiaobaiCredit()));
        },
        newBindConfig: function(e) {
            e.length && (this.bindConfig = r.getCurDatePpms(e, "type", "bindheader")[0]);
        }
    },
    store: i.default,
    data: {
        bindConfig: {},
        env: r.getEnv()
    },
    computed: {
        openJvalue: function() {
            return a.default.isXCX ? "goto_arrow" : this.$root.isShowModule ? "goto_arrow" : "";
        }
    },
    created: function() {
        r.batchThrottle([ "navToAccountPage", "navToJdMember", "navToRealName", "changeToJd", "navToBindPage", "navToXBCredit", "navToPlus" ], this), 
        this.initPage();
    },
    methods: {
        initPage: function() {
            this.verifyAuthUser(), this.getIsPlus();
        },
        getIsPlus: function() {
            this.getIsPlusData(), this.getPlusTipsData();
        },
        verifyAuthUser: function() {
            1 == this.userInfo.curpinType && this.verifyAuthUserData();
        },
        dealXiaobaiCredit: function() {
            var e = this.userInfo.curpinType, t = this.getWindowWidth();
            1 == e && t >= 360 && this.queryXBCreditScore();
        },
        navToPlus: function() {
            u.default.addPtag("7155.1.51"), s.mustBind.call(this, this.userInfo, a.default.isXCX ? 721394565 : 721394554, "7155.1.51") || this.$xgoto([ "//plus.m.jd.com/index" ], 3 == this.env ? {
                flow_system: "flow_system",
                flow_entrance: "myhome2",
                flow_channel: "m",
                sceneval: 2
            } : {
                s: a.default.isXCX ? "xcx" : "wq"
            });
        },
        navToAccountPage: function() {
            var e = "7155.1.2";
            2 == this.userInfo.accountType && s.mustBind.call(this, this.userInfo, a.default.isXCX ? 721394568 : 721194545, e) || this.$xgoto([ "//wqs.jd.com/my/accountv2.shtml" ], 3 == this.env ? {
                ptag: e,
                sceneval: 2
            } : {
                sceneid: 11110,
                state: 0,
                rurl: a.default.isXCX ? "/pages/my/index/index" : encodeURIComponent(window.location.href),
                ptag: e
            });
        },
        navToJdMember: function() {
            u.default.addPtag("7155.1.57"), (2 != this.env || this.$root.isShowModule) && this.$xgoto([ "//vip.m.jd.com" ]);
        },
        navToXBCredit: function() {
            var e = r.getEnv(), t = [ "xcxmine", "wechatmine", "qqmine", "m" ];
            u.default.addPtag("7155.1.157"), this.$xgoto([ "//credit.jd.com/xbCredit/wq/index" ], {
                channel: "wq",
                from: t[e]
            });
        },
        showEditName: function() {
            u.default.addPtag("7155.1.125"), this.editNameShow = !0;
        },
        cancleEditName: function() {
            this.editNameShow = !1, this.nickName = this.userInfo.nickName, !a.default.isXCX && (document.getElementById("nickName").value = this.nickName), 
            this.editNameFail = !1;
        },
        editNickNameBlur: function(e) {
            this.nickName = e.detail.value, a.default.isXCX ? this.inputTop = "" : a.default.pageScrollTo({
                scrollTop: 0
            });
        },
        editNickNameFocus: function(e) {
            if (a.default.isXCX) {
                var t = e.detail.height || 0;
                if (t) {
                    var i = a.default.getSystemInfoSync().windowHeight - t - 103;
                    this.inputTop = i + "px";
                } else this.inputTop = "150px";
            }
            this.editNameFail = !1;
        },
        clickSaveNickName: function() {
            var e = this;
            setTimeout(function() {
                var t = e.nickName, i = t.replace(/[\u4e00-\u9fa5]/g, "***").length;
                return i < 4 || i > 20 || !/^[0-9a-zA-Z\u4e00-\u9fa5\-_]+$/.test(t) ? (e.editNameFailMSg = "您的昵称不符合规则，请重新修改", 
                void (e.editNameFail = !0)) : /^[0-9]+$/.test(t) ? (e.editNameFailMSg = "昵称不能设置为手机号等纯数字格式，请修改", 
                void (e.editNameFail = !0)) : void e.saveNickName(t);
            }, 100);
        },
        navToRealName: function() {
            var e = this;
            this.getVerifyAuthUrl().then(function(t) {
                e.$xgoto([ t.redirect ], {
                    ptag: "7155.1.188"
                });
            }).catch(function(e) {
                45 == e.code ? n.show({
                    icon: n.ICON.SUCCESS,
                    content: "您已完成实名认证！",
                    duration: 1e3
                }) : n.show({
                    icon: n.ICON.WARNING,
                    content: "网络错误，请稍后重试~",
                    duration: 1e3
                });
            });
        },
        changeToJd: function() {
            var e = this, t = this.userInfo.pinlist;
            this.changeToJdData(t).then(function(t) {
                a.default.isXCX ? (n.show({
                    icon: n.ICON.SUCCESS,
                    content: "切换成功",
                    duration: 500,
                    page: e.$root
                }), setTimeout(function() {
                    e.$emit("changeAccountSuccess");
                }, 500)) : window.location.href = a.default.JD.url.addUrlParam(location.href, {
                    time: new Date().getTime()
                });
            }).catch(function(t) {
                c.error(t), n.show({
                    icon: n.ICON.WARNING,
                    content: "切换账号失败，请稍后再试！",
                    duration: 1e3,
                    page: e.$root
                });
            });
        },
        navToBindPage: function() {
            var e = this.bindConfig, t = e.activeid, i = e.level;
            s.sureBindGrayConfig.call(this, a.default.isXCX ? 721294563 : 721394542), s.goBindPage.call(this, {
                activeid: t,
                level: i,
                ptag: "7155.1.190",
                bindgray: this.bindgray
            });
        }
    }
};

exports.default = d;