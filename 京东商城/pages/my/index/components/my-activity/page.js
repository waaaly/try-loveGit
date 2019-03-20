function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}

function e(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = e(require("./store")), n = t(require("../../../common/js/utils")), o = t(require("../../../common/js/bind")), r = e(require("../../../../../api/Ptag/report_manager_wqvue")), s = t(require("../../../../../common/modal/modal.js")), a = e(require("../../../../../common/wxcontext")), c = {
    store: i.default,
    data: {
        activityUrlKey: [ "actUrl", "actUrl_wq", "actUrl_qq", "actUrl_m" ],
        env: n.getEnv(),
        lineNum: 3
    },
    props: {
        userInfo: {
            type: Object,
            default: null
        },
        delayRender: {
            type: Boolean,
            default: !0
        },
        grayInfo: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    watch: {
        delayRender: function(t) {
            t && this.fetchActivityInfo();
        },
        grayInfo: function(t) {
            t.length && o.sureBindGrayConfig.call(this, a.default.isXCX ? 721394565 : 721394554);
        }
    },
    created: function() {
        this.navToTools = n.throttle(this.navToTools, 1500), this.changeToJd = n.throttle(this.changeToJd, 1e3);
    },
    attached: function() {
        1 == this.delayRender && this.fetchActivityInfo();
    },
    methods: {
        initPage: function() {
            this.fetchActivityInfo();
        },
        showAllActivity: function() {
            this.wrapHeight = 65 * this.lineNum;
        },
        navToTools: function(t) {
            var e = this, i = this.activityList[t.currentTarget.dataset.idx], n = i.actName, a = i.limit, c = i.ptag, l = i[this.activityUrlKey[this.env]], f = this;
            if (r.default.addPtag(c), !this.userInfo || 0 != this.userInfo.definePin && this.userInfo.isbind && 1 == a) s.show({
                title: "提示",
                content: "登录京东账号，立即体验" + n + "！",
                showCancel: !0,
                align: "left",
                cancelText: "下次再说",
                confirmText: "立即登录",
                confirmColor: "#E93B3D",
                success: function() {
                    o.goBindPage.call(f, {
                        bindgray: f.bindgray,
                        forceScene: !0
                    });
                },
                fail: function() {}
            }); else if (0 == this.userInfo.definePin || this.userInfo.isbind || 1 != a) if (l.indexOf("//") >= 0) {
                if ("免单" === n && (l = "//wqs.jd.com/order/qb_usercenter.htm?md=1&ptag=7155.2.103#type=0"), 
                "我的预约" == n) return this.removeRedIcon(), void setTimeout(function() {
                    e.$xgoto([ l ]);
                }, 400);
                this.$xgoto([ l ]);
            } else this.$goto(l); else s.show({
                title: "提示",
                content: "使用该功能需切换至京东账号" + this.userInfo.pinlist + "，立即切换？",
                showCancel: !0,
                align: "left",
                cancelText: "下次再说",
                confirmText: "确认",
                confirmColor: "#E93B3D",
                success: function() {
                    f.changeToJd(f.userInfo.pinlist);
                },
                fail: function() {}
            });
        }
    }
};

exports.default = c;