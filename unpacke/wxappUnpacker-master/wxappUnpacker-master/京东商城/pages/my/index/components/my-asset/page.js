function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
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

var n = t(require("./store")), o = t(require("../../../../../common/wxcontext")), a = e(require("../../../common/js/utils")), i = e(require("../../../common/js/bind")), s = t(require("../../../../../api/Ptag/report_manager_wqvue")), c = e(require("../../../../../common/modal/modal")), r = o.default.isXCX ? 721394567 : 721394553, u = {
    props: {
        jdNum: {
            type: String,
            default: ""
        },
        grayInfo: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    store: n.default,
    data: {
        env: a.getEnv()
    },
    created: function() {
        this.fetchAllAssets(), a.batchThrottle([ "navToCouponPage", "navToBalancePage", "navToBeanPage", "navToECardPage", "navToAssetPage" ], this, 1e3);
    },
    computed: {
        showAssetsTips: function() {
            return !this.isXcx && this.$root.isShowModule;
        }
    },
    methods: {
        initPage: function() {
            this.fetchAllAssets();
        },
        fetchAllAssets: function() {
            this.fetchAllAssetsData();
        },
        navToCouponPage: function() {
            var e = this, t = function() {
                e.$xgoto([ "/pages/my_pages/coupon/coupon", "//wqs.jd.com/my/coupon/index.shtml" ], {
                    ptag: "7155.1.18"
                });
            };
            this.isCouponRed ? this.removeRedIcon(3).then(function(t) {
                e.isCouponRed = !1;
            }).catch(function(e) {}).finally(function() {
                t();
            }) : t();
        },
        navToBalancePage: function() {
            var e = this.balanceDetail;
            i.mustBind.call(this, this.$root.userInfo, r, "7155.1.182") || this.$goto("/pages/my_pages/balance/balance", {
                ptag: "7155.1.182",
                balance: e
            });
        },
        navToBaiTiaoPage: function() {
            var e = this.env, t = [ "WX_H", "WX_H5", "QQ_H5" ];
            s.default.addPtag("7155.1.19");
            var n = this.$root.userInfo, o = this;
            i.mustBind.call(this, n, r, "7155.1.19") || (4 != n.accountType ? this.$xgoto([ 3 == e ? "//bt.jd.com/v3/mobile/rGuide_initGuideMobile" : "//wq.jd.com/pinbind/tokenredirect" ], 3 == e ? {
                channelName: 177,
                source: "JD_m"
            } : {
                biz: "jdbt",
                url: encodeURIComponent("//bt.jd.com/v3/mobile/rGuide_initGuideMobileWXQQ?channelName=166&source=" + t[e])
            }) : c.show({
                title: "提示",
                content: "使用该功能需切换至京东账号" + n.pinlist + "，立即切换",
                showCancel: !0,
                align: "left",
                cancelText: "立即切换",
                confirmText: "下次再说",
                confirmColor: "#E93B3D",
                success: function() {},
                fail: function() {
                    o.$emit("changeAccount");
                }
            }));
        },
        navToBeanPage: function() {
            this.$xgoto([ "/pages/bean/index/index", 3 == this.env ? "//wqs.jd.com/my/jingdou/my.shtml?sceneval=2" : "//wqs.jd.com/promote/201801/bean/index.html?_wv=1" ], {
                ptag: "7155.1.17"
            });
        },
        navToECardPage: function() {
            var e = "7155.1.44";
            i.mustBind.call(this, this.$root.userInfo, r, e) || this.$xgoto([ "/pages/my_pages/ecard/index/index", "//wqs.jd.com/my/ecard.html" ], 3 == this.env ? {
                ptag: e,
                sceneval: 2
            } : {
                ptag: e
            });
        },
        navToAssetPage: function() {
            var e = "7155.1.58";
            this.$xgoto([ "//wqs.jd.com/my/asset.html" ], o.default.isXCX ? {
                iswxappEnv: 1,
                wxAppScene: App.scene,
                ptag: e
            } : 3 == this.env ? {
                ptag: e,
                sceneval: 2
            } : {
                ptag: e
            });
        }
    }
};

exports.default = u;