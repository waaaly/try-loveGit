function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("./store")), n = t(require("../../../common/wxcontext")), o = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e.default = t, e;
}(require("../common/js/utils")), i = {
    el: "#app",
    store: e.default,
    data: {
        firstShow: !1,
        defaultUserInfo: {
            avatarUrl: "https://img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png",
            pin: "亲爱的用户"
        },
        isForceBind: !1,
        isNoAssetsBind: !1,
        bindgray: 0
    },
    created: function() {
        2 == this.env && this.renderModuleInQQ(), this.firstShow = !0, this.setAtmosImgConfig(), 
        this.setAdConfig(), 3 == this.env && this.getIsKaipule(), o.batchThrottle([ "onPageScroll", "navToService", "navToAdBanner" ], this, 600);
    },
    created_xcx: function(t) {
        this.fromPinGouApp = "app_pingou" == t.source ? 1 : 0;
    },
    onShow: function() {
        this.initPage();
    },
    onShow_xcx: function() {
        this.selectComponent("#plusCurtain").isInit = !1, this.selectComponent("#newCurtain").initNum = 3, 
        this.selectComponent("#bindCurtain").initNum = 3;
    },
    onHide: function() {
        this.popup.show = 0, this.firstShow = !1, this.getCountComp().isCountDownStop = !0;
    },
    methods: {
        initPage: function() {
            var t = this;
            this.fetchUserInfo().then(function(e) {
                !t.firstShow && n.default.isXCX && t.refreshComData(), setTimeout(function() {
                    t.secondRender();
                }, 0);
            }).catch(function(e) {
                "2328" != e && setTimeout(function() {
                    t.secondRender();
                }, 0);
            });
        },
        getCountComp: function() {
            return this.selectComponent("#myActivity").selectComponent("#myActivityMsg");
        },
        changeAccount: function() {
            this.selectComponent("#myHeader").changeToJd();
        },
        changeAccountSuccess: function() {
            this.initPage();
        },
        changeNickName: function(t) {
            this.userInfo.nickName = t.detail || t;
        },
        refreshComData: function() {
            var t = this;
            this.selectComponent("#myHeader").initPage(), this.selectComponent("#myOrder").initPage(), 
            this.selectComponent("#myAsset").initPage(), setTimeout(function() {
                t.selectComponent("#myFav").initPage(), t.selectComponent("#touTiao").initPage();
                var e = t.selectComponent("#myActivity");
                e && (e.getActivityRedPoint(), e.selectComponent("#myActivityMsg").isCountDownStop = !1, 
                e.selectComponent("#myActivityMsg").initPage());
            }, 500);
        },
        showPopup: function() {
            this.popup.show = 1, this.popup.bindpopupOptions = {
                sceneid: "11110"
            };
        },
        updateNickName: function(t) {
            this.userInfo.nickName = t.detail || t;
        },
        secondRender: function() {
            this.delayRender = !0, !n.default.isXCX && this.setH5RecOptions();
        },
        setBindPopUpStatus: function() {
            this.popup.show = 0;
        },
        setUserInfo: function() {
            this.fetchUserInfo();
        },
        navToService: function() {
            this.$xgoto([ 3 == this.env ? "//ihelp.jd.com/mindex.html?sceneval=2" : "//wqs.jd.com/refund/help.shtml" ], {
                ptag: "7155.1.27"
            });
        },
        navToAdBanner: function(t) {
            var e = (t.xcxEvent || t).currentTarget.dataset, n = e.xcxurl, o = e.h5url;
            this.$xgoto([ n, o ]);
        },
        back2top: function() {
            n.default.pageScrollTo({
                scrollTop: 0
            });
        },
        renderModuleInQQ: function() {
            window.isHideIosSqCheckModule && (this.isShowModule = !1);
        }
    },
    onPageScroll: function(t) {
        this.showBack = t.scrollTop > 800;
    }
};

exports.default = i;