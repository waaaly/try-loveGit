function t(t) {
    if (t && t.__esModule) return t;
    var o = {};
    if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (o[e] = t[e]);
    return o.default = t, o;
}

function o(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = o(require("./store")), n = o(require("../../../../../common/wxcontext")), a = t(require("../../../models/assets_data.js")), i = require("../../../../../common/logger.js"), s = t(require("../../../common/js/utils")), r = new i.Logger("my/indexv2"), c = {
    store: e.default,
    props: {
        delayRender: {
            type: Boolean,
            default: !1
        }
    },
    created: function() {
        this.fetchFavInfo(), s.batchThrottle([ "navToH5", "navToGoodsFav", "navToShopFav", "navToFootPrint" ], this, 1e3);
    },
    methods: {
        initPage: function() {
            this.fetchFavInfo();
        },
        navToGoodsFav: function(t) {
            var o = this, e = "//wqs.jd.com/my/fav/goods_fav.shtml", i = "7155.1.8", s = this.isMenv ? 2 : "";
            this.goodsRedPoint ? a.clearGoodFavRedDot().then(function() {
                o.goodsRedPoint = "";
            }).catch(function(t) {
                r.error(t);
            }).finally(function() {
                o.$xgoto([ e ], n.default.isXCX ? {
                    iswxappEnv: 1,
                    ptag: i
                } : {
                    ptag: i,
                    sceneval: s
                });
            }) : this.$xgoto([ e ], n.default.isXCX ? {
                iswxappEnv: 1,
                ptag: i
            } : {
                ptag: i,
                sceneval: s
            });
        },
        navToShopFav: function(t) {
            var o = this, e = "7155.1.9", i = "//wqs.jd.com/my/fav/shop_fav.shtml", s = this.isMenv ? 2 : "";
            this.shopRedPoint ? a.clearShopFavRedDot().then(function() {
                o.shopRedPoint = "";
            }).catch(function(t) {
                r.error(t);
            }).finally(function() {
                o.$xgoto([ i ], n.default.isXCX ? {
                    iswxappEnv: 1,
                    ptag: e
                } : {
                    ptag: e,
                    sceneval: s
                });
            }) : this.$xgoto([ i ], n.default.isXCX ? {
                iswxappEnv: 1,
                ptag: e
            } : {
                ptag: e,
                sceneval: s
            });
        },
        navToFootPrint: function(t) {
            var o = this;
            this.isMenv && s.mSiteReport({
                eventId: "MMyJD_BrowserHistory",
                eventParam: "",
                eventLevel: 2
            });
            var e = function() {
                setTimeout(function() {
                    o.$xgoto([ o.isMenv ? "//wqs.jd.com/wxsq_project/mhistory/index.html" : "//wqs.jd.com/search/searchfootprint.shtml#level1=1" ], {
                        ptag: "7155.1.10"
                    });
                }, 100);
            };
            this.footDot ? a.removeFootDot().then(function() {
                o.footDot = 0;
            }).catch(function(t) {
                r.error(t);
            }).finally(function() {
                e();
            }) : e();
        },
        navToH5: function(t) {
            this.$xgoto([ "//wqs.jd.com/my/fav/dapei.shtml" ], {
                ptag: "7155.1.86"
            });
        }
    }
};

exports.default = c;