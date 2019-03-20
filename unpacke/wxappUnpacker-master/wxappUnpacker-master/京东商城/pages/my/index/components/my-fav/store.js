function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = t(require("../../../models/assets_data.js")), n = e(require("../../../../../libs/promise.min.js")), r = require("../../../../../common/login/loginv1"), i = require("../../../../../common/logger.js"), u = t(require("../../../common/js/utils")), s = e(require("../../../../../common/wxcontext")), a = new i.Logger("my/indexv2");

exports.default = function() {
    return {
        state: {
            footDot: 0,
            goodsFavNum: "",
            shopFavNum: "",
            dpFavNum: "",
            recentNum: "",
            goodsRedPoint: "",
            shopRedPoint: "",
            isMenv: 3 == u.getEnv()
        },
        actions: {
            fetchFavInfo: function() {
                var e = this;
                (0, r.getLoginPromise)().then(function(t) {
                    0 == u.getEnv() && e.getUserShopBrowseRSize(), e.getGoodsFavNumAndRed(), e.getFavNum();
                });
            },
            getFavNum: function() {
                var e = this, t = [ o.getShopFavNum(1) ];
                this.isMenv ? this.showRecentNum() : t = t.concat([ o.showRecentNum(1), o.showDpFavNum(1) ]), 
                n.default.all(t).then(function(t) {
                    e.shopFavNum = t[0].totalNum || " ", "" != e.shopFavNum.trim() && e.getShopFavRed(), 
                    e.isMenv || (e.recentNum = 0 == t[1].errcode ? (parseInt(t[1].itemcount ? t[1].itemcount : 0) + parseInt(t[1].searchcount ? t[1].searchcount : 0)).toString() || " " : 0, 
                    e.dpFavNum = t[2].dpfavNum || " ");
                }).catch(function(e) {
                    a.error(e);
                });
            },
            showRecentNum: function() {
                var e = s.default.JD.cookie.get("warehistory"), t = (e = e.replace(/^"|,?"$/g, "")) && e.split(",").length || 0;
                this.recentNum = t.toString();
            },
            getGoodsFavNumAndRed: function() {
                var e = this;
                o.getGoodsFavRed().then(function(t) {
                    e.goodsFavNum = t.totalNum || " ", t.redpointCount > 0 ? "" != e.goodsFavNum.trim() && (e.goodsRedPoint = "show_red_point") : e.goodsRedPoint = "";
                }).catch(function(e) {
                    a.error(e);
                });
            },
            getShopFavRed: function() {
                var e = this;
                o.getShopFavRed().then(function(t) {
                    t && 1 == t.data ? e.shopRedPoint = "show_red_point" : e.shopRedPoint = "";
                }).catch(function(e) {
                    a.error(e);
                });
            },
            getUserShopBrowseRSize: function() {
                var e = this;
                o.getUserShopBrowseRSize().then(function(t) {
                    e.footDot = t.data.visible;
                }).catch(function(e) {
                    a.error(e);
                });
            }
        }
    };
};