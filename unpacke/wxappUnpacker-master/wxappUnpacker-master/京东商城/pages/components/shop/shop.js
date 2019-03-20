function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e.default = t, e;
}

function e(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t) {
    var e = {
        venderIds: t
    };
    return new i.default(function(t, a) {
        h.request.get("https://wq.jd.com/mshop/BatchGetShopInfoByVenderId", e).then(function(e) {
            var o = {}, n = e.body;
            if (0 != n.errcode) a(n.msg); else {
                if (n.data && n.data.length > 0) {
                    var r = n.data[0].shopInfo, s = n.data[0] && n.data[0].squareLogo;
                    "1" == r.isZy && (o.flag = "京东自营"), o.isZy = "1" == r.isZy, o.shopName = r.shopName, 
                    o.squareLogo = s != v ? u.getImg(s) : "", o.shopLogoUrl = u.getImg(n.data[0].rectLogo), 
                    o.goodsNum = r.goodsNum, o.shopFansNum = r.shopFansNum, o.isDiamond = 0 != r.isDiamond, 
                    o.venderId = r.venderId, o.phoneNum = r.phoneNum, o.shopId = n.data[0].shopId, o.shopEnterHotCateId1 = n.data[0].shopEnterHotCateId1, 
                    o.shopEnterHotCateId2 = n.data[0].shopEnterHotCateId2, o.shopEnterHotCateId3 = n.data[0].shopEnterHotCateId3, 
                    o.shopEnterHotCateName1 = n.data[0].shopEnterHotCateName1, o.shopEnterHotCateName2 = n.data[0].shopEnterHotCateName2, 
                    o.shopEnterHotCateName3 = n.data[0].shopEnterHotCateName3, o.fPicUrl = u.getImg(r.fPicUrl), 
                    o.isShopEnterShow = "1" == n.data[0].productDetailShopEnteranceFlag && r.fPicUrl && o.shopEnterHotCateName1 && o.shopEnterHotCateName2 && o.shopEnterHotCateName3, 
                    o.shopFansNum = Number(o.shopFansNum), o.shopFansNum < 1e4 ? o.shopFansNum = o.shopFansNum : o.shopFansNum <= 99999 ? o.shopFansNum = (o.shopFansNum / 1e4).toFixed(1) + "万" : o.shopFansNum = (o.shopFansNum / 1e4).toFixed(0) + "万", 
                    "1" != r.isZy && (o.scoreRankRateGrade = n.data[0].scoreRankRateGrade, o.userEvaluateScore = n.data[0].userEvaluateScore, 
                    o.commentFactorScoreRankGrade = n.data[0].commentFactorScoreRankGrade, o.logisticsLvyueScore = n.data[0].logisticsLvyueScore, 
                    o.logisticsFactorScoreRankGrade = n.data[0].logisticsFactorScoreRankGrade, o.afterServiceScore = n.data[0].afterServiceScore, 
                    o.afsFactorScoreRankGrade = n.data[0].afsFactorScoreRankGrade, o.isScoreShow = o.userEvaluateScore && o.logisticsLvyueScore && o.afterServiceScore), 
                    o.categoryGoodShopCode = n.data[0].categoryGoodShopCode, o.commonGoodShopCode = n.data[0].commonGoodShopCode;
                }
                t(o);
            }
        }).catch(function(t) {
            var e = r(t.code, t.message);
            a(e);
        });
    });
}

function o(t) {
    return new i.default(function(e, a) {
        if (!t) return a(), !1;
        var o = {
            key: "ids,," + t,
            datatype: 1,
            page: 1,
            pagesize: S,
            merge_sku: "yes",
            qp_disable: "yes"
        };
        h.request.get({
            url: "https://wqsou.jd.com/search/searchjsonpg",
            data: o,
            ump: {
                key: "wq.webmonitor.mjcx.pg.shop.entrSearchjsonpg",
                bizId: "969",
                opId: "5",
                errBizId: "970",
                errOpId: "5",
                reportHook: function(t) {
                    return 0 == t.retcode ? {
                        code: 0
                    } : {
                        code: t.retcode,
                        message: t.errmsg
                    };
                }
            }
        }).then(function(t) {
            var o = t.body;
            t.header;
            if (!o || 0 != o.retcode) return a(), !1;
            e(o);
        }).catch(function(t) {
            t.code, t.message;
            a();
        });
    });
}

function n(t) {
    return new i.default(function(e, a) {
        if (!t) return a(), !1;
        var o = {
            venderIds: t,
            source: "xcc",
            callback: "testcall"
        };
        h.request.get({
            url: "https://wq.jd.com/pingou_api/GetShopSkuNum",
            data: o,
            ump: {
                key: "wq.webmonitor.mjcx.pg.shop.getShopSkuNum",
                bizId: "969",
                opId: "4",
                errBizId: "970",
                errOpId: "4",
                reportHook: function(t) {
                    return 0 == t.iRet ? {
                        code: 0
                    } : {
                        code: t.iRet,
                        message: t.errmsg
                    };
                }
            }
        }).then(function(t) {
            var o = t.body;
            t.header;
            if (!o || 0 != o.iRet) return a(), !1;
            e(o);
        }).catch(function(t) {
            t.code, t.message;
            a();
        });
    });
}

function r(t, e) {
    var a = "";
    switch (e = e || '"Network Error"', t) {
      case p.default.RET_HTTP_RESPONSE_ERROR:
        a = p.default.Text_RET_HTTP_RESPONSE_ERROR;
        break;

      case p.default.RET_WS_CONNECT_ERROR:
        a = p.default.Text_RET_WS_CONNECT_ERROR;
        break;

      case p.default.RET_WS_REQUEST_TIMEOUT:
        a = p.default.Text_RET_WS_REQUEST_TIMEOUT;
        break;

      default:
        a = e;
    }
    return a;
}

function s(t, e) {
    if (t && e.shopId) {
        var a = [ o(e && e.shopId, S), n(t) ];
        return new i.default(function(o, n) {
            i.default.all(a).then(function(a) {
                var n = a && a[0] && a[0].data && a[0].data.searchm.Paragraph, r = a && a[0] && a[0].data && a[0].data.searchm && a[0].data.searchm.Head && a[0].data.searchm.Head.Summary && a[0].data.searchm.Head.Summary.ResultCount, s = a && a[1] && a[1][t] && a[1][t].num_format;
                if (r <= S) {
                    var d = n.map(function(t) {
                        var e = {};
                        return e.needcount = t.pinGou && t.pinGou.count, e.pgPrice = t.pinGou && t.pinGou.bp, 
                        e;
                    }).filter(function(t) {
                        return t.pgPrice && parseFloat(t.pgPrice) >= 0 && parseInt(t.needcount) > 0;
                    });
                    e.pgGoodsNum = d.length;
                } else e.pgGoodsNum = r;
                s && (e.pinNum = s), o(e);
            }).catch(function(t) {
                n();
            });
        });
    }
}

var d = require("../../../bases/component"), i = e(require("../../../libs/promise.min")), c = t(require("../../../common/biz")), u = t(require("../../../common/fe_helper")), h = require("../../../common/request/request"), p = e(require("../../../common/http_constant.js")), m = e(require("../../../api/Ptag/report_manager_wqvue")), f = getApp(), S = 20, g = {
    DETAIL_SHOP_FANS: "7418.11.2",
    DETAIL_SHOP_ALL: "7418.11.3",
    DETAIL_GOTO_SHOP: "7418.11.4",
    DETAIL_SHOP_FAV: "7418.11.6",
    DETAIL_SHOP_UNFAV: "7418.11.8",
    CLICK_GO_SHOP: "7145.8.4",
    CLICK_FAV_SHOP: "7145.8.4"
}, v = "//img30.360buyimg.com/cms/jfs/t18595/220/1675716535/1334/7ab25346/5ad3fffaN4384dc33.png";

new d.JDComponent({
    properties: {
        isJx: Boolean,
        venderId: String,
        skuId: String,
        category: Array,
        shopFlag: String,
        favStatus: Boolean,
        isPingou: Boolean,
        isPingouApp: Boolean
    },
    data: {
        venderId: "",
        favStatus: !1,
        shopInfo: {}
    },
    pageLifetimes: {
        show: function() {
            var t = this;
            this.data.venderId && c.shopCheckFav(this.data.venderId).then(function(e) {
                t.setData({
                    favStatus: e
                }), f.event.emit("favStatusLoaded", e);
            }).catch(function(t) {});
        }
    },
    ready: function() {
        var t = this, e = this.data, o = e.venderId, n = this;
        e.isPingouApp && m.default.addPtagExposure("138526.4.1"), o && (a(o).then(function(e) {
            e.shopName && (t.data.isPingouApp ? s(o, e).then(function(t) {
                n.setData({
                    shopInfo: t
                });
            }).catch(function() {
                n.setData({
                    shopInfo: e
                });
            }) : (t.setData({
                shopInfo: e
            }), t.triggerEvent("updateServiceInfo", e)));
        }).catch(function(t) {}), c.shopCheckFav(o).then(function(e) {
            t.setData({
                favStatus: e
            }), f.event.emit("favStatusLoaded", e);
        }).catch(function(t) {})), f.event.on("toggleFavStatus", function(t) {
            "component" != t && n.setData({
                favStatus: !n.data.favStatus
            });
        }), f.event.on("shopCheckFav", function(e) {
            c.shopCheckFav(o).then(function(e) {
                t.setData({
                    favStatus: e
                }), f.event.emit("favStatusLoaded", e);
            }).catch(function(t) {});
        }), this.favShop = u.throttle(this.favShop, 1e3);
    },
    methods: {
        gotoShop: function(t) {
            var e = t.currentTarget.dataset.type;
            t.target.id;
            if (e) {
                var a = this.data.isPingou ? g.CLICK_GO_SHOP : g.DETAIL_GOTO_SHOP;
                switch (e) {
                  case "fans":
                    this.$report(g.DETAIL_SHOP_FANS);
                    break;

                  case "all":
                    this.$report(g.DETAIL_SHOP_ALL);
                    break;

                  default:
                    this.$report(a);
                }
            }
            var o = this.data.shopInfo.venderId, n = this.data, r = n.skuId, s = n.category;
            if (o) {
                var d = "";
                d = s ? "https://wqshop.jd.com/mshop/gethomepage?venderid=" + o + "#/index?recItem=" + r + "_" + s[0] + "_" + s[1] + "_" + s[2] : "https://wqshop.jd.com/mshop/gethomepage?venderid=" + o, 
                this.data.isPingouApp ? (this.$report("138526.4.4"), this.$goto("/pages/pingou_shop/shop", {
                    venderid: o
                })) : this.$goto("/pages/h5/index", {
                    url: d
                });
            }
        },
        gotoShopWithCate: function(t) {
            var e = t.currentTarget.dataset, a = e.cateid, o = void 0 === a ? "" : a, n = e.index, r = this.data, s = r.skuId, d = r.venderId, i = void 0 === d ? "" : d, c = "";
            i && (c = "1" == n ? "https://wqshop.jd.com/mshop/gethomepage?venderid=" + i + "&sceneId=1001&skuId=" + s + "&categoryId3=" + o : "https://wqshop.jd.com/mshop/gethomepage?venderid=" + i + "&sceneId=1001&categoryId3=" + o, 
            console.log("##CS", s, o, c), this.$goto("/pages/h5/index", {
                url: c
            }));
        },
        favShop: function(t) {
            var e = t.currentTarget.dataset.type, a = this.data, o = a.venderId, n = a.isPingou;
            "add" == e ? (n ? this.$report(g.CLICK_FAV_SHOP) : this.$report(g.DETAIL_SHOP_FAV), 
            this.addFavShop(o)) : (this.$report(g.DETAIL_SHOP_UNFAV), this.delFavShop(o));
        },
        addFavShop: function(t) {
            var e = this, a = this.data.isPingouApp;
            a && this.$report("138526.4.2"), c.shopAddFav(t).then(function(t) {
                t ? (a && e.$report("138526.3.1"), e.toast.show({
                    content: "收藏成功",
                    icon: e.toast.ICON.SUCCESS
                }), e.setData({
                    favStatus: t
                }), f.event.emit("toggleFavStatus", "component")) : e.toast.show({
                    content: "网络错误，请稍后重试",
                    icon: e.toast.ICON.SUCCESS
                });
            }).catch(function(t) {
                e.toast.show({
                    content: "网络错误，请稍后重试",
                    icon: e.toast.ICON.SUCCESS
                });
            });
        },
        delFavShop: function(t) {
            var e = this;
            this.data.isPingouApp && this.$report("138526.4.3"), c.shopDelFav(t).then(function(t) {
                t ? e.toast.show({
                    content: "网络错误，请稍后重试",
                    icon: e.toast.ICON.SUCCESS
                }) : (e.toast.show({
                    content: "取消收藏成功",
                    icon: e.toast.ICON.SUCCESS
                }), f.event.emit("toggleFavStatus", "component"), e.setData({
                    favStatus: t
                }));
            }).catch(function(t) {
                e.toast.show({
                    content: "网络错误，请稍后重试",
                    icon: e.toast.ICON.SUCCESS
                });
            });
        }
    }
});