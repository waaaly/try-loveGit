function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}

function n(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
    null === n && (n = ""), "object" == (void 0 === n ? "undefined" : m(n)) && (n = n.code + " - " + n.message), 
    y.umpBiz({
        bizid: I,
        operation: e,
        result: ~~t,
        message: n
    });
}

function o(e) {
    var t = {};
    if (!e || !e.length) return t;
    for (var n, o = 0; o < e.length; o++) if ((n = e[o]) && n.groupid) {
        var r = {};
        t[n.groupid] = r;
        var s = n.locations;
        if (s && s.length) for (var u, c = 0; c < s.length; c++) if (u = s[c]) {
            var a = u.plans;
            a && a.length ? r[u.locationid] = a : r[u.locationid] = [];
        }
    }
    return t;
}

function r() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : v.getLoginPromise, t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    return new x.default(function(n, o) {
        var r = new Date().getDate();
        j.get("index_show_login_mask_day").then(function(e) {
            r != e ? (n((0, v.doLogin)()), j.set("index_show_login_mask_day", r)) : t ? o(-4) : n();
        }).catch(function(t) {
            n(e()), j.set("index_show_login_mask_day", r);
        });
    });
}

function s() {
    return r().then(function() {
        return new x.default(function(e, t) {
            wx.$.request.get({
                url: "https://wq.jd.com/activep3/singjd/StatusQuery",
                data: {
                    callback: "cjj"
                }
            }).then(function(o) {
                var u = o.body;
                if (0 == u.ret) e(u); else {
                    if (2 == u.ret) return r(v.doLogin, !0).then(function() {
                        s().then(e, t);
                    }).catch(function(e) {
                        t({
                            code: "unlogin",
                            message: "未登录"
                        });
                    });
                    t({
                        code: u.ret,
                        message: u.retmsg
                    });
                }
                n(3, u.ret, u.retmsg);
            }, function(e) {
                t(e), n(3, 1, e);
            });
        });
    });
}

function u() {
    return r().then(function() {
        return new x.default(function(e, t) {
            wx.$.request.get({
                url: "https://wq.jd.com/userattribute/QueryUserGiftInfo",
                data: {
                    channel: 0,
                    querytype: 0
                }
            }).then(function(o) {
                var s = o.body;
                if (n(4, s.retcode, s.msg), 0 == s.retcode) e(s.data || {}); else {
                    if (13 == s.retcode) return r(v.doLogin, !0).then(function() {
                        u().then(e, t);
                    }).catch(function(e) {
                        t(e);
                    });
                    t({
                        code: s.retcode,
                        message: s.msg
                    });
                }
            }, function(e) {
                t(e), n(4, 1, e);
            });
        });
    });
}

function c(e) {
    return r().then(function() {
        return new x.default(function(t, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/active/querybingolist",
                data: {
                    activelist: e.join(",")
                }
            }).then(function(s) {
                var u = s.body;
                if (n(11, u.errorCode, u.errMsg), 0 == u.errorCode) t(u.result); else {
                    if (2 == u.errorCode) return r(v.doLogin, !0).then(function() {
                        return c(e).then(t);
                    }).catch(function(e) {
                        return o(e);
                    });
                    o({
                        code: u.errorCode,
                        message: u.errMsg
                    });
                }
            }).catch(function(e) {
                o(e), n(11, 1, e);
            });
        });
    });
}

function a(e) {
    return r().then(function() {
        return new x.default(function(t, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/active/active_draw",
                data: {
                    active: e.active,
                    level: e.level,
                    ext: "hj:x"
                }
            }).then(function(s) {
                var u = s.body;
                if (n(12, u.ret, u.retmsg), 0 == u.ret) t(u); else {
                    if (2 == u.errorCode) return r(v.doLogin, !0).then(function() {
                        return a(e).then(t);
                    }).catch(function(e) {
                        return o(e);
                    });
                    o({
                        code: u.ret,
                        message: u.retmsg
                    });
                }
            }).catch(function(e) {
                o(e), n(12, 1, e);
            });
        });
    });
}

function i(e) {
    return r().then(function() {
        return new x.default(function(t, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/user/info/QueryCanUActiveCouponBySku",
                data: {
                    skuid: e.join(","),
                    source: 5,
                    flag: 1
                }
            }).then(function(s) {
                var u = s.body;
                if (0 == u.retcode) {
                    var c = {};
                    (u.data || []).forEach(function(e) {
                        var t = [], n = [];
                        e.useCoupon.concat(e.activeCoupon).forEach(function(e) {
                            if (3 != e.couponStyle && 0 != e.couponKind && (0 == e.couponType || 1 == e.couponType) && w.checkTime(e.startTime, e.endTime)) {
                                var o = {
                                    quota: e.couponQuota,
                                    discount: e.couponDiscount
                                };
                                0 == e.couponType ? t.push(o) : n.push(o);
                            }
                        }), t.sort(function(e, t) {
                            return t.discount - e.discount;
                        }), n.sort(function(e, t) {
                            return t.discount / t.quota - e.discount / e.quota;
                        });
                        var o = t.concat(n);
                        o.length && (c[e.skuId] = o);
                    }), t(c);
                } else {
                    if (13 == u.retcode || 102 == u.retcode) return r(v.doLogin, !0).then(function() {
                        i(e).then(t, o);
                    }).catch(function(e) {
                        o(e);
                    });
                    o({
                        code: u.retcode,
                        message: u.msg
                    });
                }
                n(9, u.retcode, u.msg);
            }, function(e) {
                o(e), n(9, 1, e);
            });
        });
    });
}

function d() {
    return r().then(function() {
        return new x.default(function(e, t) {
            wx.$.request.get({
                url: "https://wq.jd.com/user/info/GetUserBirthday"
            }).then(function(o) {
                var s = o.body;
                if (0 == s.errcode) e("1" == s.data.birthdayFlag); else {
                    if (102 == s.errcode) return r(v.doLogin, !0).then(function() {
                        d().then(e, t);
                    }).catch(function(e) {
                        t(e);
                    });
                    t({
                        code: s.errcode,
                        message: s.msg
                    });
                }
                n(29, s.errcode, s.msg);
            }).catch(function(e) {
                t(e), n(29, 1, e);
            });
        });
    });
}

function f() {
    return r().then(function() {
        return new x.default(function(e, t) {
            wx.$.request.get({
                url: "https://wq.jd.com/pinbind/TokenRedirectForWxApp",
                data: {
                    biz: "jdselect_plus"
                }
            }).then(function(o) {
                var s = o.body;
                if (0 == s.retcode && 0 == s.action) e(s.token); else {
                    if (13 == s.retcode) return r(v.doLogin, !0).then(function() {
                        f().then(e, t);
                    }).catch(function(e) {
                        t(e);
                    });
                    t({
                        code: s.retcode,
                        message: s.retmsg
                    });
                }
                n(32, s.retcode, s.retmsg);
            }).catch(function(e) {
                t(e), n(32, 1, e);
            });
        });
    });
}

function g() {
    return new x.default(function(e) {
        wx.$.request({
            url: "https://storage.jd.com/cubefile/recovery_recommendactive.json"
        }).then(function(t) {
            if (!t || !t.body || !t.body.data) return x.default.reject();
            e(t.body.data);
        }).catch(function(t) {
            return e({});
        });
    });
}

function p(e) {
    return r().then(function() {
        return new x.default(function(t, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/pingou_active/AddMidanChance",
                data: {
                    callback: "cjj",
                    platform: 4,
                    actives: e
                }
            }).then(function(s) {
                var u = s.body;
                if (0 == u.iRet) t(u.has_change_nums); else {
                    if (2 == u.iRet) return r(v.doLogin, !0).then(function() {
                        p(e).then(t, o);
                    }).catch(function(e) {
                        o(e);
                    });
                    o({
                        code: u.iRet,
                        message: u.sErrMsg
                    });
                }
                n(53, u.iRet, u.sErrMsg);
            }).catch(function(e) {
                console.log("cjj e", e), o(e), n(53, 1, e);
            });
        });
    });
}

function l(e) {
    return r().then(function() {
        return new x.default(function(t, n) {
            wx.$.request.get({
                url: "https://wq.jd.com/cube/front/GetActivePublishConf",
                data: {
                    active_id: e
                }
            }).then(function(o) {
                var s = o.body, u = s.ret, c = s.data, a = void 0 === c ? "" : c, i = s.msg;
                if (0 == u) t(a); else {
                    if (10100 == u) return r(v.doLogin, !0).then(function() {
                        l(e).then(t, n);
                    }).catch(function(e) {
                        n({
                            code: u,
                            message: i
                        });
                    });
                    n({
                        code: u,
                        message: i
                    });
                }
            }, function(e) {
                n(e);
            });
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getFloorData = exports.getQueryPrizesImage = exports.getRocket = exports.getRandomRedBagTask = exports.getQueryMarquee = exports.getQueryPrizesStatus = exports.getQueryPrizeDetails = exports.getQueryAggrStat = exports.batchGetEntryData = exports.getCubeAdvs = exports.getPingouList = exports.getTreeState = exports.getPingouSignStat = exports.getTopic = exports.getQuerysport = exports.getMallMain = exports.getCaptainQuali = exports.getActiveFeeds = exports.getSkuInfo = exports.getRecommendFeedList = exports.getShopRecommend = exports.getGroupTag = exports.getRankInfoData = exports.getCsortData = exports.getKeywordData = exports.getWelfare = exports.getRecommendList = exports.getSeckillGoods = exports.getCarouselAdvs = exports.getPlusCouponTotalQuota = exports.getToken = exports.getPlusUserInfo = exports.getSearchKey = exports.getUserBirthday = exports.getWeatherLocation = exports.getBrandSale = exports.editBookingTags = exports.getBookingTags = exports.queryYiYuanGou = exports.queryOldBring = exports.activeDraw = exports.getActiveCoupon = exports.getFeedList = exports.getReviewRate = exports.getBrandName = exports.getShopInfo = exports.getSmartData = exports.getEntryIconData = exports.getEntryData = exports.getBingoList = exports.getFreshmenData = exports.getGiftData = exports.getSignStatus = exports.getCpcData = exports.parseCpcList = void 0;

var m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, h = t(require("../../common/utils.js")), w = t(require("./utils.js")), x = e(require("../../libs/promise.min.js")), v = require("../../common/login/login.js"), y = t(require("../../common/fe_report/usability.js")), b = e(require("../../libs/md5.js")), q = t(require("../../common/user_info.js")), j = t(require("../../common/localStorage")), I = 648, $ = {
    getFloorSort: 6,
    freshmen: 7
}, S = {
    mallMain: 1386
};

exports.parseCpcList = o, exports.getCpcData = function(e, t) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, u = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
    return new x.default(function(c, a) {
        var i = {
            gids: e.join("|"),
            pcs: t.map(function(e) {
                return e + ":" + (r[e] || 1);
            }).join(",")
        };
        s && (i.pretime = Math.floor(s / 1e3)), wx.$.request.get({
            url: "https://wqcoss.jd.com/mcoss/focusbi/show_new",
            data: i,
            speedPointId: u.speedPointId
        }).then(function(e) {
            var t = e.body;
            0 == t.errCode ? c(u.raw ? t.list || [] : o(t.list || [])) : a({
                code: t.errCode,
                message: t.msg
            }), n(1, t.errCode, t.msg);
        }, function(e) {
            a(e), n(1, 1, e);
        });
    });
}, exports.getSignStatus = s, exports.getGiftData = u, exports.getFreshmenData = function() {
    return r().then(function() {
        return new x.default(function(e, t) {
            wx.$.request.get({
                url: "https://wq.jd.com/activetmp/dianzan/query188",
                data: {
                    cjj: 1
                },
                speedPointId: $.freshmen
            }).then(function(o) {
                var r = o.body;
                0 == r.ret ? e(r) : t({
                    code: r.ret,
                    message: r.retmsg
                }), n(10, r.ret, r.retmsg);
            }).catch(function(e) {
                t(e), n(10, 1, e);
            });
        });
    });
}, exports.getBingoList = c, exports.getEntryData = function(e, t) {
    var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = {
        projectid: e,
        total: t
    };
    return o.interval && !isNaN(o.interval) && o.interval > 0 && (r.interval = o.interval), 
    o.pretime && !isNaN(o.pretime) && (r.pretime = Math.floor(o.pretime / 1e3)), new x.default(function(e, t) {
        wx.$.request.get({
            url: "https://wq.jd.com/mcoss/categoryentry/getentryv2",
            data: r
        }).then(function(o) {
            var r = o.body;
            0 == r.errcode ? e(r.data || []) : t({
                code: r.errcode,
                message: r.msg
            }), n(5, r.errcode, r.msg);
        }, function(e) {
            t(e), n(5, 1, e);
        });
    });
}, exports.getEntryIconData = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], o = {
        pcs: e.map(function(e) {
            return e + ":" + (t[e] || 1);
        }).join(";")
    };
    return n.length > 0 && (o.topskus = n.join(";")), new x.default(function(e, t) {
        wx.$.request.get({
            url: "http://wqcoss.jd.com/mcoss/entryicon/show",
            data: o
        }).then(function(n) {
            var o = n.body;
            0 == o.errcode ? e(o.data || []) : t({
                code: o.errcode,
                message: o.msg
            });
        }, function(e) {
            t(e);
        });
    });
}, exports.getSmartData = function(e) {
    return new x.default(function(t, o) {
        var r = ("" + e.id).split(";");
        wx.$.request.get({
            url: "https://wqcoss.jd.com/mcoss/smart/pagshow",
            data: Object.assign({
                id: "0",
                offset: "0",
                count: "0",
                unshowskus: "",
                venderids: "",
                cgids: "",
                reqtype: "2;2;2"
            }, e),
            header: {
                referer: "http://wq.jd.com/wxapp/pages/index/index"
            }
        }).then(function(e) {
            var s = e.body;
            if (0 == s.errcode) {
                var u = {};
                (s.data || []).forEach(function(e) {
                    e && -1 != r.findIndex(function(t) {
                        return t == e.smartid;
                    }) && (u[e.smartid] = e.list || []);
                }), t(u);
            } else o({
                code: s.errcode,
                message: s.msg
            });
            n(6, s.errcode, s.msg);
        }, function(e) {
            o(e), n(6, 1, e);
        });
    });
}, exports.getShopInfo = function(e) {
    return new x.default(function(t, o) {
        wx.$.request.get({
            url: "https://wq.jd.com/mshop/BatchGetShopInfoByVenderId",
            data: {
                venderIds: e.join(",")
            }
        }).then(function(e) {
            var r = e.body;
            if (0 == r.errcode) {
                var s = {};
                (r.data || []).forEach(function(e) {
                    if (e && 0 != e.shopId && e.shopInfo) {
                        var t = e.shopInfo, n = -1 == t.shopLogoUrl.indexOf("567cae97N2a380057.jpg") ? t.shopLogoUrl : "";
                        s[t.venderId] = {
                            name: t.shopName,
                            logo: h.getImg(n)
                        };
                    }
                }), t(s);
            } else o({
                code: r.errcode,
                message: r.msg
            });
            n(7, r.errcode, r.msg);
        }, function(e) {
            o(e), n(7, 1, e);
        });
    });
}, exports.getBrandName = function(e) {
    return new x.default(function(t, n) {
        wx.$.request.get({
            url: "https://wq.jd.com/mcoss/branddetail/getinfo",
            data: {
                brandid: e.join(";")
            }
        }).then(function(e) {
            var o = e.body;
            if (0 == o.errcode) {
                var r = {};
                (o.data || []).forEach(function(e) {
                    e.brandId && (r[e.brandId] = e.enName || e.cnName || "");
                }), t(r);
            } else n({
                code: o.errcode,
                message: o.msg
            });
        }, function(e) {
            n(e);
        });
    });
}, exports.getReviewRate = function(e) {
    return e.length ? new x.default(function(t, n) {
        wx.$.request.get({
            url: "https://club.jd.com/clubservice/summary-m-" + e.join(",") + ".html",
            data: {}
        }).then(function(e) {
            var n = {};
            (e.body.CommentsCount || []).forEach(function(e) {
                e.SkuId && (n[e.SkuId] = (100 * e.GoodRate).toFixed(1).replace(".0", ""));
            }), t(n);
        }, function(e) {
            n(e);
        });
    }) : x.default.resolve({});
}, exports.getFeedList = function(e) {
    return new x.default(function(t, o) {
        wx.$.request.get({
            url: "https://wq.jd.com/shopgroup_api_feed/GetSkuFeedList",
            data: {
                skuids: e.join(","),
                pageno: 1,
                pagesize: 1
            },
            encoding: "GBK"
        }).then(function(e) {
            var r = e.body;
            if (0 == r.iRet) {
                var s = {};
                (r.feed_list || []).forEach(function(e) {
                    var t = e.shareid, n = 0 == e.contenttype ? e.commentcontent : e.firsttext;
                    e.skuid && t && n && (s[e.skuid] = {
                        shareId: t,
                        content: n,
                        portrait: h.getImg(e.headimgurl, 40),
                        nickname: e.nickname,
                        followers: e.followbuys
                    });
                }), t(s);
            } else o({
                code: r.iRet,
                message: r.errmsg
            });
            n(8, r.iRet, r.errmsg);
        }, function(e) {
            o(e), n(8, 1, e);
        });
    });
}, exports.getActiveCoupon = i, exports.activeDraw = a, exports.queryOldBring = function() {
    return new x.default(function(e, t) {
        wx.$.request.get({
            url: "https://wq.jd.com/activetmp/iphone/queryoldbring",
            data: {
                cjj: 1
            }
        }).then(function(o) {
            var r = o.body;
            0 == r.errcode ? e(r.data || {}) : t({
                code: r.errcode,
                message: r.msg
            }), n(26, r.errcode, r.msg);
        }, function(e) {
            t(e), n(26, 1, e);
        });
    });
}, exports.queryYiYuanGou = function() {
    return new x.default(function(e, t) {
        wx.$.request.get({
            url: "https://wq.jd.com/activet2/oppo/queryyiyuangou",
            data: {
                shareid: b.default.hexMD5(q.gUserData().pin)
            }
        }).then(function(n) {
            var o = n.body;
            0 == o.errcode ? e(o.data || {}) : t({
                code: o.errcode,
                message: o.msg
            });
        }, function(e) {
            t(e);
        });
    });
}, exports.getBookingTags = function(e) {
    return r().then(function() {
        return new x.default(function(t, o) {
            wx.$.request.get({
                url: "https://wqcoss2.jd.com/mcoss/subscrtag/show",
                data: {
                    projid: e
                }
            }).then(function(e) {
                var r = e.body;
                0 == r.errcode ? (t(r.data), n(24, 0)) : (o({
                    code: r.errcode,
                    message: r.msg
                }), n(24, r.errcode, r.msg));
            }).catch(function(e) {
                o(e), n(24, 1, e);
            });
        });
    });
}, exports.editBookingTags = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
    return r().then(function() {
        return new x.default(function(r, s) {
            wx.$.request.get({
                url: "https://wqcoss2.jd.com/mcoss/subscrtag/edit",
                data: {
                    projid: e,
                    addtagid: t.join(","),
                    deltagid: o.join(","),
                    callback: "cjj"
                }
            }).then(function(e) {
                var t = e.body;
                0 == t.errcode ? (r(), n(25, 0)) : (s({
                    code: t.errcode,
                    message: t.msg
                }), n(25, 1));
            }).catch(function(e) {
                s(e), n(25, 1, e);
            });
        });
    });
}, exports.getBrandSale = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments[1], o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
    return new x.default(function(r, s) {
        wx.$.request.get({
            url: "https://wq.jd.com/mcoss/brandspecial/show",
            data: {
                aid: e,
                sid: t,
                filtermark: o
            }
        }).then(function(e) {
            var t = e.body;
            0 == t.errCode ? (r(t), n(27, 0)) : (s({
                code: t.errCode,
                message: "res body errCode != 0"
            }), n(27, 1));
        }).catch(function(e) {
            s(e), n(27, 1, e);
        });
    });
}, exports.getWeatherLocation = function() {
    return new x.default(function(e, t) {
        wx.$.request.get({
            url: "https://wq.jd.com/weatherlocation/ShowWeather"
        }).then(function(o) {
            var r = o.body;
            0 == r.iRet ? e(r) : t({
                code: r.iRet,
                message: "res body iRet != 0"
            }), n(28, r.iRet, r.sErrMsg);
        }).catch(function(e) {
            t(e), n(28, 1, e);
        });
    });
}, exports.getUserBirthday = d, exports.getSearchKey = function(e) {
    return new x.default(function(t, o) {
        wx.$.request.get({
            url: "https://wq.jd.com/mcoss/hiddenword/HiddenwordSearch",
            data: {
                projectid: e,
                total: 1
            }
        }).then(function(e) {
            var r = e.body;
            0 == r.errCode ? t(r) : o({
                code: r.errCode,
                message: r.msg
            }), n(30, r.errCode, r.msg);
        }).catch(function(e) {
            o(e), n(30, 1, e);
        });
    });
}, exports.getPlusUserInfo = function() {
    return new x.default(function(e, t) {
        wx.$.request.get({
            url: "https://plus.m.jd.com/user/getPlusUserInfo/v1",
            data: {
                contentType: "1_6",
                callbackjp: "cjj",
                appName: "jdyxcx"
            },
            channel: "http"
        }).then(function(o) {
            var r = o.body;
            r.success && r.result ? (e(r.result), n(31, 0, r.message)) : (t({
                code: r.resultCode,
                message: r.message
            }), n(31, 1, r.message));
        }).catch(function(e) {
            t(e), n(31, 1, e);
        });
    });
}, exports.getToken = f, exports.getPlusCouponTotalQuota = function() {
    return new x.default(function(e, t) {
        wx.$.request.get({
            url: "https://plus.m.jd.com/coupon/dayCouponsForExternal/v1",
            data: {
                callbackjp: "cjj",
                appName: "jdyxcx"
            }
        }).then(function(o) {
            var r = o.body, s = r.resultCode, u = r.message, c = r.result;
            "1000" == s && c ? e(c) : t({
                code: s,
                message: u
            }), "1000" == s || "0003" == s || "0004" == s || "0005" == s ? n(33, 0, u) : n(33, 1, u);
        }).catch(function(e) {
            t(e), n(33, 1, e);
        });
    });
}, exports.getCarouselAdvs = function(e) {
    return new x.default(function(t, o) {
        wx.$.request.get({
            url: "https://x.jd.com/cpd",
            data: {
                spread_type: "1",
                ad_type: "8",
                mobile_type: "3",
                template: "0",
                app_ad_ids: e
            }
        }).then(function(e) {
            var o = e.body;
            if ("object" !== (void 0 === o ? "undefined" : m(o))) return n(34, 1), x.default.reject("advs request error");
            t(o), n(34, 0);
        }).catch(function(e) {
            o(e), n(34, 1, e);
        });
    });
}, exports.getSeckillGoods = function(e) {
    return new x.default(function(t, o) {
        wx.$.request.get({
            url: "https://wqcoss.jd.com/mcoss/secondkill/show",
            data: {
                actid: e,
                count: 5
            }
        }).then(function(e) {
            var r = e.body, s = r.retcode, u = r.data, c = r.msg;
            0 == s && u ? t(u) : o({
                code: s,
                message: c
            }), n(39, s, c);
        }, function(e) {
            o(e), n(39, 1, e);
        });
    });
}, exports.getRecommendList = function(e) {
    return new x.default(function(e, t) {
        wx.$.request.get({
            url: "https://wq.jd.com/youhaohuo/GetRecommendList",
            data: {
                size: 1
            }
        }).then(function(o) {
            var r = o.body, s = r.ret, u = r.data, c = r.msg;
            0 == s && u && u.list && u.list.length ? e(u.list[0]) : t({
                code: s,
                message: c
            }), n(40, s, c);
        }, function(e) {
            t(e), n(40, 1, e);
        });
    });
}, exports.getWelfare = function(e) {
    return new x.default(function(e, t) {
        wx.$.request.get({
            url: "https://wq.jd.com/cube/activeaggre/RecommendActive",
            data: {
                callback: "cjj"
            }
        }).then(function(t) {
            var o = t.body, r = o.ret, s = o.data, u = o.msg;
            0 == r && s && s.active_list.length ? e(s) : g().then(function(t) {
                return e(t);
            }), n(41, r, u);
        }, function(t) {
            g().then(function(t) {
                return e(t);
            }), n(41, 1, t);
        });
    });
}, exports.getKeywordData = function(e, t, o) {
    return new x.default(function(r, s) {
        wx.$.request.get({
            url: "https://wq.jd.com/mcoss/keyword/keywordsearch",
            data: {
                ruleid: e,
                pi: t,
                pc: o
            }
        }).then(function(e) {
            var t = e.body;
            0 == t.errCode ? r(t.data || []) : s({
                code: t.errcode,
                message: t.msg
            }), n(42, t.errcode, t.msg);
        }, function(e) {
            s(e), n(42, 1, e);
        });
    });
}, exports.getCsortData = function(e, t) {
    return new x.default(function(o, r) {
        wx.$.request.get({
            url: "https://wq.jd.com/mcoss/floor/csort",
            data: {
                proid: e,
                total: t
            }
        }).then(function(e) {
            var t = e.body;
            0 == t.retcode ? o(t.pro || []) : r({
                code: t.retcode,
                message: t.errmsg
            }), n(43, t.retcode, t.errmsg);
        }, function(e) {
            r(e), n(43, 1, e);
        });
    });
}, exports.getRankInfoData = function(e, t, o) {
    return new x.default(function(r, s) {
        var u = {
            cateId: e + "",
            provinceId: t + "",
            cityId: o + "",
            source: "wx",
            time: "1DAY",
            rankId: "rank3001"
        };
        wx.$.request.get({
            url: "https://api.m.jd.com/api",
            data: {
                functionId: "rankInfo",
                client: "wxphb",
                clientVersion: "1.0.0",
                body: JSON.stringify(u)
            }
        }).then(function(e) {
            var t = e.body;
            t.isSuccess ? r(t.result || []) : s({
                code: t.code
            }), n(44, t.code);
        }, function(e) {
            s(e), n(44, 1, e);
        });
    });
}, exports.getGroupTag = function(e, t) {
    var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
    return new x.default(function(r, s) {
        wx.$.request.get({
            url: "https://wq.jd.com/mcoss/grouptag/getgrouptag",
            data: {
                topn: e,
                projectid: t,
                compensate: o
            }
        }).then(function(e) {
            var t = e.body;
            0 == t.retcode ? r(t.tags || []) : s({
                code: t.retcode,
                message: t.errmsg
            }), n(45, t.retcode, t.errmsg);
        }, function(e) {
            s(e), n(45, 1, e);
        });
    });
}, exports.getShopRecommend = function(e, t) {
    return new x.default(function(o, r) {
        wx.$.request.get({
            url: "https://wq.jd.com/mshop/QueryShopRecommendMain",
            data: {
                pin: e,
                p: 619132,
                pi: "wq_indexV6",
                ci: 2,
                visitKey: t,
                lim: 4,
                lid: 0,
                did: "10086119999"
            }
        }).then(function(e) {
            var t = e.body;
            0 == t.ret ? o(t || []) : r({
                code: t.ret,
                message: t.msg
            }), n(46, t.ret, t.msg);
        }, function(e) {
            r(e), n(46, 1, e);
        });
    });
}, exports.getRecommendFeedList = function(e, t) {
    return new x.default(function(o, r) {
        wx.$.request.get({
            url: "https://wq.jd.com/contentcenter_feed/GetRecommendFeedList",
            data: {
                positionid: e,
                pagesize: t,
                pageno: 1,
                bi: 1,
                channelid: 10009
            },
            encoding: "GBK"
        }).then(function(e) {
            var t = e.body;
            0 == t.iRet ? o(t.feed_list || []) : r({
                code: t.iRet,
                message: t.errmsg
            }), n(48, t.iRet, t.errmsg);
        }, function(e) {
            r(e), n(48, 1, e);
        });
    });
}, exports.getSkuInfo = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return new x.default(function(t, o) {
        var r = e.join(",");
        wx.$.request.get({
            url: "https://yx.3.cn/service/info.action",
            data: {
                ids: r,
                u_source: "wxapp"
            },
            encoding: "GBK"
        }).then(function(e) {
            var o = e.body;
            t(o), n(49, 0);
        }, function(e) {
            o(e), n(49, 1, e);
        });
    });
}, exports.getActiveFeeds = function(e) {
    return new x.default(function(t, o) {
        wx.$.request.get({
            url: "https://wq.jd.com/shopgroup_api_feed/GetActvieFeeds",
            encoding: "GBK",
            data: {
                shareids: e.join(","),
                source: "wxapp"
            }
        }).then(function(e) {
            var r = e.body, s = r.iRet, u = r.feed_list, c = r.errmsg;
            0 == s && u ? t(u) : o({
                code: s,
                message: c
            }), n(50, s, c);
        }, function(e) {
            o(e), n(50, 1, e);
        });
    });
}, exports.getCaptainQuali = p, exports.getMallMain = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "http", n = function() {
        return new x.default(function(n, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/webportal/cgigw/wxapp_index_dbl11",
                data: {
                    debugTime: +e
                },
                channel: t,
                speedPageId: S.mallMain,
                ump: {
                    bizId: I,
                    opId: 59
                }
            }).then(function(e) {
                var t = e.body, r = void 0 === t ? {} : t, s = r.errCode, u = r.errMsg, c = r.data;
                0 != s && 1 != s || !c ? o({
                    code: s,
                    message: u
                }) : n(r.data);
            }).catch(function(e) {
                o(e);
            });
        });
    };
    return r().then(n, n);
}, exports.getQuerysport = function() {
    return new x.default(function(e, t) {
        wx.$.request.get({
            url: "https://wq.jd.com/activep2/sportbonus/QuerySportBonus"
        }).then(function(o) {
            var r = o.body;
            0 == r.ret ? e(r) : t({
                code: r.ret,
                message: r.retmsg
            }), n(55, r.ret, r.retmsg);
        }, function(e) {
            t(e), n(55, 1, e);
        });
    });
}, exports.getTopic = function() {
    return new x.default(function(e, t) {
        wx.$.request.get({
            url: "https://wqcoss.jd.com/mcoss/topic/gettopic",
            data: {
                topn: 2,
                count: 7,
                sceneid: 1
            }
        }).then(function(o) {
            var r = o.body, s = r.errcode, u = r.msg, c = r.themes;
            0 == s && c ? e(c) : t({
                code: s,
                message: u
            }), n(56, r.errcode, r.msg);
        }, function(e) {
            t(e), n(56, 1, e);
        });
    });
}, exports.getPingouSignStat = function() {
    arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    return x.default.resolve().then(function() {
        return r();
    }).then(function() {
        return new x.default(function(e, t) {
            wx.$.request.get({
                url: "https://wq.jd.com/signGetPackets/GetFloorUserSignInStat",
                data: {
                    env: 0
                }
            }).then(function(o) {
                var r = o.body;
                0 == r.iRet ? e(r) : t({
                    code: r.iRet,
                    message: r.sMsg
                }), n(58, r.iRet, r.sMsg);
            }).catch(function(e) {
                t(e), n(58, 1, e);
            });
        });
    });
}, exports.getTreeState = function() {
    return new x.default(function(e, t) {
        wx.$.request.get({
            url: "https://wq.jd.com/activep2/hbtree/querystate"
        }).then(function(o) {
            var r = o.body, s = r.ret, u = r.retmsg, c = r.show;
            0 == s && 1 == c ? e(r) : t({
                code: s,
                message: u
            }), n(57, r.ret, r.retmsg);
        }, function(e) {
            t(e), n(57, 1, e);
        });
    });
}, exports.getPingouList = function(e, t) {
    return new x.default(function(n, o) {
        wx.$.request.get({
            url: "https://wq.jd.com/mcoss/pingou/show",
            data: {
                id: e,
                count: t,
                pagetype: "1"
            },
            ump: {
                bizId: I,
                opId: 60
            }
        }).then(function(e) {
            var t = e.body, r = t.errcode, s = t.msg, u = t.data, c = u && u[0] && u[0].list || [];
            0 == r && c ? n(c) : o({
                code: r,
                message: s
            });
        }, function(e) {
            o(e);
        });
    });
}, exports.getCubeAdvs = function(e) {
    return new x.default(function(t, n) {
        wx.$.request.get({
            url: "http://rtb-x.jd.com/swc/focus_wq",
            data: {
                spread_type: "1",
                ad_type: "8",
                mobile_type: "3",
                template: "0",
                app_ad_ids: e
            }
        }).then(function(e) {
            var n = e.body;
            if ("object" !== (void 0 === n ? "undefined" : m(n))) return x.default.reject("advs request error");
            t(n);
        }).catch(function(e) {
            n(e);
        });
    });
}, exports.batchGetEntryData = function(e, t, n, o) {
    var r = {
        ids: e.join(";"),
        totals: t.join(";"),
        intervals: n.join(";")
    };
    return o && (r.pretime = Math.floor(o / 1e3)), new x.default(function(e, t) {
        wx.$.request.get({
            url: "https://wqcoss.jd.com/mcoss/categoryentry/batchgetentryv2",
            data: r
        }).then(function(n) {
            var o = n.body;
            0 == o.errcode ? e(o.prodata || []) : t({
                code: o.errcode,
                message: o.msg
            });
        }, function(e) {
            t(e);
        });
    });
}, exports.getQueryAggrStat = function(e) {
    return new x.default(function(t, n) {
        wx.$.request.get({
            url: "https://wq.jd.com/cutprice/QueryAggrStat",
            data: {
                dwOption: 2,
                dwPageIndex: 1,
                dwPageSize: e,
                source: "jdyouxuan"
            },
            ump: {
                bizId: I,
                opId: 61
            }
        }).then(function(e) {
            var o = e.body, r = o.iRet, s = o.sErrMsg, u = o.data;
            0 == r ? t(u) : n({
                code: r,
                message: s
            });
        }, function(e) {
            n(e);
        });
    });
}, exports.getQueryPrizeDetails = function(e) {
    return new x.default(function(t, n) {
        wx.$.request.get({
            url: "https://wq.jd.com/active/queryprizedetails",
            data: {
                actives: e.join(",")
            },
            ump: {
                bizId: I,
                opId: 62
            }
        }).then(function(e) {
            var o = e.body, r = o.retcode, s = o.errmsg, u = o.result;
            0 == r ? t(u) : n({
                code: r,
                message: s
            });
        }, function(e) {
            n(e);
        });
    });
}, exports.getQueryPrizesStatus = function(e) {
    return new x.default(function(t, n) {
        wx.$.request.get({
            url: "https://wq.jd.com/active/queryprizesstatus",
            data: {
                active: e
            },
            ump: {
                bizId: I,
                opId: 63
            }
        }).then(function(e) {
            var o = e.body, r = o.retcode, s = o.errmsg, u = o.prizes;
            0 == r ? t(u) : n({
                code: r,
                message: s
            });
        }, function(e) {
            n(e);
        });
    });
}, exports.getQueryMarquee = function(e, t) {
    return new x.default(function(n, o) {
        wx.$.request.get({
            url: "https://wq.jd.com/active/querymarquee",
            data: {
                active: e,
                num: t
            },
            ump: {
                bizId: I,
                opId: 64
            }
        }).then(function(e) {
            var t = e.body, r = t.ret, s = t.errMsg, u = t.bingolst;
            0 == r ? n(u) : o({
                code: r,
                message: s
            });
        }, function(e) {
            o(e);
        });
    });
}, exports.getRandomRedBagTask = function(e) {
    return new x.default(function(t, n) {
        wx.$.request.get({
            url: "https://wq.jd.com/bussappactive/assemble/GetUserActiveStatus",
            data: {
                ddwActiveId: e,
                dwIsPublish: "1"
            }
        }).then(function(e) {
            var n = e.body;
            t(n);
        }, function(e) {
            n(e);
        });
    });
}, exports.getRocket = function(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    return new x.default(function(o, r) {
        var s = {
            sceneid: e.join("|"),
            pagesize: t
        };
        n.debugtime && !isNaN(n.debugtime) && (s.debugtime = Math.floor(n.debugtime / 1e3)), 
        wx.$.request.get({
            url: "https://wqcoss.jd.com/mcoss/rocket/show",
            data: s,
            ump: {
                bizId: I,
                opId: 66
            }
        }).then(function(e) {
            var t = e.body, n = t.errcode, s = t.msg, u = t.data;
            0 == n ? o(u) : r({
                code: n,
                message: s
            });
        }, function(e) {
            r(e);
        });
    });
}, exports.getQueryPrizesImage = l, exports.getFloorData = function(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = {
        proids: e.join(";"),
        totals: t.join(";")
    };
    return n.intervals && (o.intervals = n.intervals.join(";")), n.pretime && (o.pretime = Math.floor(n.pretime / 1e3)), 
    new x.default(function(e, t) {
        wx.$.request.get({
            url: "https://wqcoss.jd.com/mcoss/floorv2/eshow",
            data: o,
            ump: {
                bizId: I,
                opId: 65
            }
        }).then(function(n) {
            var o = n.body;
            0 == o.errcode ? e(o.data && o.data[0] && o.data[0].floor || []) : t({
                code: o.errcode,
                message: o.msg
            });
        }, function(e) {
            t(e);
        });
    });
};