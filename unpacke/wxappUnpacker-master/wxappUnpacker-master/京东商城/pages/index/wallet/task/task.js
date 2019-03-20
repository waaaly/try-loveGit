function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e.default = t, e;
}

function e(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function n(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var i = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
}, o = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), a = require("../../../../bases/component.js"), r = e(require("../common-behavior.js")), s = t(require("../../model.js")), u = t(require("../../utils.js")), l = t(require("../../../../common/fe_helper.js")), c = require("../../../../common/logger.js"), f = t(require("../../../../common/localStorage.js")), g = t(require("../../../../common/cookie-v2/cookie")), h = e(require("../../../../libs/promise.min.js")), d = e(require("../../../../libs/proxy.min.js")), m = require("../../../../api/Ptag/report_manager.js"), p = require("../../dbl11-components/constant"), v = new c.Logger("HMMMMMMMMM 京东优选 - 每日任务"), D = "AFFECT_ALL_ENTRIES", w = function() {
    function t(e, i) {
        n(this, t), this.raw = e, this.ctx = i, this.proxy = new d.default(e, {
            set: function(t, e, n) {
                if (e === D) for (var i in t) t[i] = n; else if (e.includes(".")) try {
                    this.goInside(t, e.split("."), n);
                } catch (t) {
                    return console.error("Proxy Error", t), !0;
                } else t[e] = n;
                return this.setData(), !0;
            }.bind(this)
        });
    }
    return o(t, [ {
        key: "commit",
        value: function(t, e) {
            this.proxy[t] = e;
        }
    }, {
        key: "goInside",
        value: function(t, e, n) {
            var i = e[0];
            if (!t.hasOwnProperty(i)) throw new Error("goInside Error");
            1 == e.length ? t[i] = n : this.goInside(t[i], e.slice(1), n);
        }
    }, {
        key: "setData",
        value: function() {
            var t = this;
            this.setDataTimer && clearTimeout(this.setDataTimer), this.setDataTimer = setTimeout(function() {
                var e = !1;
                for (var n in t.raw) if (t.raw[n]) {
                    e = !0;
                    break;
                }
                t.ctx.setData(i({}, t.raw, {
                    showModule: e
                }));
            }, 200);
        }
    } ]), t;
}();

new a.JDComponent({
    behaviors: [ r.default ],
    properties: {
        showTime: {
            type: Number,
            observer: function() {
                this.onPageShow();
            }
        },
        loadOthers: {
            type: Boolean,
            observer: function(t) {
                this.onIdleResolve && this.onIdleResolve();
            }
        },
        freshmenData: {
            type: Object,
            observer: function(t) {
                this.loadFreshmenData(t), this.freshmenData = t, this.freshmenDataResolve && this.freshmenDataResolve(t);
            }
        },
        saleConfig: {
            type: Object,
            observer: function(t) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(t);
            }
        }
    },
    data: {
        showModule: !1,
        saleColor: "",
        isSale: !1,
        isSaleClimax: !1
    },
    attached: function() {
        this.store = new w({
            signEntry: null,
            welfareEntry: null,
            statedGiftEntry: null,
            giftEntries: null,
            freshmenEntry: null,
            oldBringEntry: null,
            freshmenPingouEntry: null,
            plusEntry: null,
            sportEntry: null,
            beansEntry: null,
            treeEntry: null,
            randowRedBagEntry: null
        }, this), this.setData(this.store.raw);
    },
    methods: {
        refresh: function() {
            var t = this;
            this.onIdle = new h.default(function(e) {
                return t.onIdleResolve = e;
            }), this.onFreshmenData = new h.default(function(e) {
                return t.freshmenDataResolve = e;
            }), this.loadPpmsData(), this.getSaleConfig();
        },
        getSaleConfig: function() {
            var t = this;
            this.getPPMSData().then(function(e) {
                if (!u.checkTime(p.SALE_BEGIN, p.SALE_END)) return h.default.reject();
                var n = null;
                if ((e && e.task || []).some(function(t) {
                    if (u.checkTime(t.begin, t.end)) return n = t, !0;
                }), !n) return h.default.reject();
                t.setData({
                    saleColor: n.bgColor ? "background-color: " + n.bgColor + ";" : "",
                    isSale: !0,
                    isSaleClimax: u.checkTime(p.SALE_BEGIN, p.SALE_END) ? 1 : 0
                });
            }).catch(function(e) {
                t.setData({
                    saleColor: "",
                    isSale: !1,
                    isSaleClimax: !1
                });
            });
        },
        getPPMSData: function() {
            var t = this;
            return new h.default(function(e, n) {
                t.getPPMSDataResolve = e;
            });
        },
        commit: function(t, e) {
            this.store.proxy[t] = e;
        },
        onPageShow: function() {
            this.updateSignData && (this.updateSignData = !1, this.loadSignData()), this.updateGiftData && (this.updateGiftData = !1, 
            this.loadGiftData()), this.updateFreshmenData && (this.updateFreshmenData = !1, 
            this.loadFreshmenData(this.freshmenData)), this.updatePlusData && (this.updatePlusData = !1, 
            this.loadPlusData(this.plusConfig)), this.updateSportData && (this.updateSportData = !1, 
            this.loadSportData()), this.updateTreeData && (this.updateTreeData = !1, this.loadTreeData()), 
            this.updateOldToNewData && (this.updateOldToNewData = !1, this.queryOldBring(this.oldBringConfig)), 
            this.updateRandowRedBag && (this.updateRandowRedBag = !1, this.loadRandowRedBag());
        },
        loadPpmsData: function() {
            var t = this;
            this.biz.getPPMS(32910).then(function(e) {
                var n = e[0];
                t.signConfig = n.arrived[0], t.subpageConfig = n.subpage[0], t.giftConfig = n.gift, 
                t.freshmenConfig = n.newGift[0], t.statedGiftConfig = n.statedGift[0] || {}, t.sportConfig = n.sport && n.sport[0], 
                t.treeConfig = n.treeConfig && n.treeConfig[0], n.randowRedBagConfig && n.randowRedBagConfig.some(function(e) {
                    if (u.checkTime(e.begin, e.end)) return t.randowRedBagConfig = e, !0;
                }), n.oldToNew && n.oldToNew.some(function(e) {
                    if (u.checkTime(e.startTime, e.endTime)) return t.oldBringConfig = e, !0;
                }), n.beans && n.beans.some(function(e) {
                    if (u.checkTime(e.startTime, e.endTime)) return t.beansConfig = e, !0;
                }), n.welfare && n.welfare.some(function(e) {
                    if (u.checkTime(e.beginTime, e.endTime)) return t.welfareConfig = e, !0;
                }), t.freshmenPingouConfig = u.getActiveConfig(n.freshmenPingou, {
                    date: l.getServerTime(),
                    default: null
                }), n.plusGift && n.plusGift.some(function(e) {
                    if (u.checkTime(e.beginTime, e.endTime)) return t.plusConfig = e, !0;
                }), n.rightMoreConfig && n.rightMoreConfig[0] && t.setData({
                    entryText: n.rightMoreConfig[0].desc,
                    entryLink: u.fixUrl(n.rightMoreConfig[0].link)
                });
            }).then(function() {
                var e = [];
                return u.checkTime(t.statedGiftConfig.startTime, t.statedGiftConfig.endTime, l.getServerTime()) && e.push(t.statedGiftConfig.activeId), 
                t.freshmenPingouConfig && e.push(t.freshmenPingouConfig.activeId), t.loadWelfareDate(), 
                h.default.all([ t.loadSignData(), t.queryBingoList(e) ]);
            }).then(function() {
                return t.onIdle;
            }).then(function() {
                return h.default.all([ t.loadGiftData(), t.queryOldBring(t.oldBringConfig), t.loadPlusData(t.plusConfig), t.loadSportData(), t.loadTreeData(), t.loadRandowRedBag() ]);
            }).then(function() {
                return t.loadSubpageBanner(t.subpageConfig);
            }).catch(function(e) {
                e.code, e.message;
                t.commit(D, null);
            });
        },
        loadSignData: function() {
            var t = this, e = this.signConfig;
            if (u.checkTime(e.begin, e.end)) {
                var n = [ "已签到", "领京豆" ], i = [ "https://img11.360buyimg.com/jdphoto/s66x50_jfs/t28636/107/851772236/1778/e62214f1/5c00bef9N1077cd8a.png", "https://img11.360buyimg.com/jdphoto/s144x146_jfs/t26815/183/2393110427/24503/851bf50a/5c00b35aN7e612e4a.png" ];
                return s.getSignStatus().then(function(o) {
                    var a = {
                        icon: t.utils.getImg(e.img_v2),
                        url: e.url
                    }, r = o.status;
                    1 == r || 2 == r ? (a.finish = !0, a.desc = n[0], a.icon = i[0]) : (a.finish = !1, 
                    a.desc = n[1], a.icon = i[1]), t.commit("signEntry", a);
                }, function(o) {
                    o.code, o.message;
                    var a = {
                        icon: i[1],
                        url: e.url,
                        finish: !1,
                        desc: n[1]
                    };
                    t.commit("signEntry", a);
                });
            }
        },
        gotoSign: function() {
            var t = this.data.signEntry;
            this.$goto("/pages/h5/index", {
                url: t.url
            }), this.updateSignData = !0;
        },
        loadSubpageBanner: function(t) {
            if (t) {
                var e = this.store.raw, n = {
                    title: t.title,
                    desc: t.desc,
                    url: t.url
                };
                for (var i in e) if (e[i] && "signEntry" !== i) {
                    n = null;
                    break;
                }
                this.setData({
                    subpage: n
                });
            }
        },
        queryBingoList: function(t) {
            var e = this;
            return t.length ? s.getBingoList(t).then(function(t) {
                var n = e.statedGiftConfig, i = void 0 === n ? {} : n, o = e.freshmenPingouConfig, a = void 0 === o ? {} : o, r = [];
                return t.forEach(function(t) {
                    var n = t.active, o = t.bingos, s = void 0 === o ? [] : o;
                    if (n === i.activeId) {
                        var u = s.find(function(t) {
                            return t.level == i.activeLevel;
                        }) ? 1 : 0;
                        r.push(e.loadStatedGiftData(u));
                    } else if (n === a.activeId) {
                        var l = s.find(function(t) {
                            return t.level == a.activeLevel;
                        }) ? 1 : 0;
                        r.push(e.loadFreshmenPingouData(l));
                    }
                }), h.default.all(r).catch(function(t) {
                    return console.log(t);
                });
            }).catch(function(t) {
                var e = t.code, n = t.message;
                v.log("queryBingoList error: ", e, n);
            }) : h.default.resolve();
        },
        loadWelfareDate: function() {
            var t = this.welfareConfig;
            if (t) {
                var e = {
                    title: t.title,
                    icon: this.utils.getImg(t.img),
                    desc: t.text,
                    btnDesc: t.btnText,
                    url: t.url
                };
                this.commit("welfareEntry", e);
            }
        },
        loadStatedGiftData: function(t) {
            var e = this;
            return new h.default(function(n) {
                var i = e.statedGiftConfig, o = {
                    title: i.title,
                    desc: i.desc,
                    getDesc: i.getDesc,
                    btnDesc: i.btnDesc,
                    icon: e.utils.getImg(i.img)
                };
                o.finish = 0 != t, e.commit("statedGiftEntry", o), n();
            }).catch(function(t) {
                return console.log(t);
            });
        },
        gotoStatedGift: function(t) {
            var e = this, n = this.data.statedGiftEntry;
            n.finish || (s.activeDraw({
                active: this.statedGiftConfig.activeId,
                level: this.statedGiftConfig.activeLevel
            }).then(function(t) {
                0 == t.ret && 0 == t.bingo.bingoret && t.bingo.bingolevel > 0 ? (e.commit("statedGiftEntry", i({}, n, {
                    finish: !0
                })), wx.showModal({
                    content: "恭喜您中奖啦～",
                    showCancel: !1,
                    confirmColor: "#E93B3D"
                })) : wx.showModal({
                    content: "很遗憾未中奖，请下个小时再来试试吧～",
                    showCancel: !1,
                    confirmColor: "#E93B3D"
                });
            }).catch(function(t) {
                t.code;
                var e = t.message;
                wx.showModal({
                    content: e || "服务器开小差了，请稍后再试～",
                    showCancel: !1,
                    confirmColor: "#E93B3D"
                });
            }), n.ptag && u.report(n.ptag));
        },
        loadGiftData: function() {
            var t = this;
            return s.getGiftData().then(function(e) {
                v.log("loadGiftData --\x3e", e);
                var n = [], i = [];
                t.giftConfig.forEach(function(i) {
                    var o = i.giftId, a = e[o];
                    a && a.forEach(function(e) {
                        var a = {
                            id: e.id,
                            desc: i.desc,
                            icon: t.utils.getImg(i.img),
                            type: o
                        };
                        e.url ? (a.url = e.url, n.push(a)) : e.status;
                    });
                });
                var o = n.concat(i);
                t.commit("giftEntries", o.length ? o : null);
            }, function(e) {
                e.code, e.message;
                t.commit("giftEntries", null);
            });
        },
        gotoGift: function(t) {
            var e = t.currentTarget.dataset, n = e.url, i = e.type, o = {
                1: "137889.5.11",
                2: "137889.5.12",
                3: "137889.5.13",
                99: "137889.5.14",
                110: "137889.5.15",
                111: "137889.5.16",
                112: "137889.5.17",
                113: "137889.5.18",
                114: "137889.5.19",
                115: "137889.5.20",
                116: "137889.5.21",
                117: "137889.5.22",
                118: "137889.5.23"
            };
            n && (o[i] && u.report(o[i]), this.$goto("/pages/h5/index", {
                url: n
            }), this.updateGiftData = !0);
        },
        loadFreshmenData: function(t) {
            var e = this;
            return h.default.resolve(t).then(function(t) {
                var n = e.freshmenConfig, i = {
                    title: n.title,
                    desc: n.desc,
                    btnDesc: n.btnDesc,
                    icon: e.utils.getImg(n.img),
                    url: n.url
                };
                e.commit("freshmenEntry", 1 == t.isnew && (0 == t.newgift || 1 == t.newgift) ? i : null);
            }).catch(function(t) {
                t.code, t.message;
                e.commit("freshmenEntry", null);
            });
        },
        gotoFreshmenGift: function(t) {
            var e = t.currentTarget.dataset.url;
            e && (this.$goto("/pages/h5/index", {
                url: e
            }), this.updateFreshmenData = !0);
        },
        queryOldBring: function(t) {},
        getToken: function() {
            var t = g.getCookie("wq_auth_token");
            return t ? h.default.resolve(t) : s.getToken().then(function(t) {
                return t ? (g.setCookie({
                    data: {
                        wq_auth_token: {
                            value: t,
                            maxAge: 300
                        }
                    }
                }), t) : h.default.reject();
            });
        },
        loadFreshmenPingouData: function(t) {
            var e = this, n = this.freshmenPingouConfig;
            return n ? h.default.all([ f.get("index_freshmenPingouTask_hide_until", null), this.onFreshmenData ]).then(function(i) {
                var o = i[0];
                if (1 == i[1].isnew && !(o && Date.now() < o)) {
                    var a = {
                        title: n.title,
                        desc: n.desc,
                        getDesc: n.getDesc,
                        offDesc: n.offDesc,
                        url: n.url,
                        icon: e.utils.getImg(n.img),
                        btnDesc: "立即领取"
                    };
                    a.finish = 0 != t, e.commit("freshmenPingouEntry", a), u.exposureUrlPtag(n.url);
                }
            }).catch(function(t) {
                return console.log(t);
            }) : h.default.resolve();
        },
        gotoFreshmenPingouGift: function(t) {
            var e = this, n = this.data.freshmenPingouEntry;
            if (!n.off) {
                if (n.finish) {
                    var o = t.currentTarget.dataset.url;
                    return this.$goto("/pages/h5/index", {
                        url: o
                    });
                }
                s.activeDraw({
                    active: this.freshmenPingouConfig.activeId,
                    level: this.freshmenPingouConfig.activeLevel
                }).then(function(t) {
                    0 == t.ret && 0 == t.bingo.bingoret && t.bingo.bingolevel > 0 ? (e.commit("freshmenPingouEntry", i({}, n, {
                        finish: !0
                    })), wx.showModal({
                        content: "福利券领取成功~",
                        showCancel: !1,
                        confirmColor: "#E93B3D"
                    })) : (e.commit("freshmenPingouEntry", i({}, n, {
                        btnDesc: "再试试"
                    })), wx.showModal({
                        content: "今日活动太火爆，请稍后再试~",
                        showCancel: !1,
                        confirmColor: "#E93B3D"
                    }));
                }).catch(function() {
                    var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).code;
                    "5" == t || "6" == t || "7" == t || "11" == t ? (e.commit("freshmenPingouEntry", i({}, n, {
                        off: !0
                    })), f.set("index_freshmenPingouTask_hide_until", new Date().setHours(24, 0, 0, 0)), 
                    wx.showModal({
                        content: "来晚一步，福利券已经派完...",
                        showCancel: !1,
                        confirmColor: "#E93B3D"
                    })) : (e.commit("freshmenPingouEntry", i({}, n, {
                        btnDesc: "再试试"
                    })), wx.showModal({
                        content: "今日活动太火爆，请稍后再试~",
                        showCancel: !1,
                        confirmColor: "#E93B3D"
                    }));
                });
            }
        },
        loadPlusData: function(t) {
            var e = this;
            if (t) {
                var n = t.plusChannelUrl, i = t.couponsGiftUrl;
                return this.getToken().then(function(o) {
                    return s.getPlusUserInfo().then(function(o) {
                        var a = {
                            title: t.title,
                            desc: t.desc,
                            btnDesc: t.btnDesc,
                            icon: e.utils.getImg(t.img)
                        };
                        if (o.plusUserBaseInfo.newPlusFlag) a.url = n; else {
                            var r = o.plusUserBaseInfo.flag;
                            if ("201" == r) return s.getPlusCouponTotalQuota().then(function(t) {
                                return 0 == t.totalQuotaWithMonth ? a = null : a.url = i, a;
                            });
                            ("000" == r || "101" == r || "102" == r || "103" == r) && o.plusUserQualificationInfo.qualificationFlag ? a.url = n : a = null;
                        }
                        return a;
                    });
                }).then(function(t) {
                    return e.commit("plusEntry", t);
                }).catch(function(t) {
                    return e.commit("plusEntry", null);
                });
            }
        },
        gotoPlusGift: function(t) {
            var e = t.currentTarget.dataset.url;
            e && (this.$goto("/pages/h5/index", {
                url: e
            }), this.updatePlusData = !0);
        },
        processBeansData: function(t) {
            if (t) {
                var e = null;
                e = {
                    desc: t.desc,
                    icon: this.utils.getImg(t.img),
                    url: t.url
                }, this.commit("beansEntry", e);
            }
        },
        loadSportData: function() {
            var t = this, e = this.sportConfig;
            if (e && u.greyScale(e.ratio)) {
                var n = {
                    title: e.title,
                    img: this.utils.getImg(e.img),
                    btnDesc: "去看看"
                };
                return s.getQuerysport().then(function(i) {
                    i && (n.desc = i.datainfo.receivebonus > 0 ? e.desc1 : e.desc, t.commit("sportEntry", n));
                }).catch(function(e) {
                    t.commit("sportEntry", null);
                });
            }
        },
        gotoSport: function() {
            this.$goto("/pages/events/sportshb/index/index"), u.report("137889.5.31"), this.updateSportData = !0;
        },
        loadTreeData: function() {
            var t = this, e = this.treeConfig;
            if (e && e.title && e.states) return s.getTreeState().then(function(n) {
                var i = n.state, o = e.states, a = e.title, r = o.find(function(t) {
                    return t.state == i || "255" == t.state;
                }) || {}, s = "", u = {
                    title: a,
                    btn: s = 2 == i ? "去浇水" : 6 == i ? "去摘果" : "去看看",
                    des: r.title,
                    icon: t.utils.getImg(r.icon, 100)
                };
                m.ReportManager.addPtagExposure("137889.5.32"), t.commit("treeEntry", u);
            }).catch(function(e) {
                t.commit("treeEntry", null);
            });
        },
        loadRandowRedBag: function() {
            var t = this, e = this.randowRedBagConfig;
            if (e && e.title && e.id) return s.getRandomRedBagTask(e.id).then(function(n) {
                var i = n.iRet, o = new Map([ [ 0, {
                    btn: "去使用",
                    des: e.openSuccessText
                } ], [ 6001, {
                    btn: "开团抢",
                    des: e.unOpenText
                } ], [ 6002, {
                    btn: "去看看",
                    des: e.openingText
                } ], [ 6003, {
                    btn: "去看看",
                    des: e.openingText
                } ] ]).get(i) || "";
                o ? (o.icon = t.utils.getImg(e.img, 100), o.title = e.title, o.url = "https://wq.jd.com/cube/front/activePublish/creategroup/" + e.id + ".html?ptag=" + e.ptag, 
                m.ReportManager.addPtagExposure(e.ptag), t.commit("randowRedBagEntry", o)) : t.commit("randowRedBagEntry", null);
            }).catch(function(e) {
                t.commit("randowRedBagEntry", null);
            });
        },
        gotoTree: function() {
            this.$goto("/pages/moneytreev2/index/index"), u.report("137889.5.32"), this.updateTreeData = !0;
        },
        gotoRandowRedBag: function(t) {
            var e = t.currentTarget.dataset.url;
            e && (this.$goto("/pages/h5/index", {
                url: e
            }), this.updateRandowRedBag = !0);
        },
        gotoOldToNew: function(t) {
            var e = t.currentTarget.dataset.url;
            e && (this.$goto("/pages/h5/index", {
                url: e
            }), this.updateOldToNewData = !0);
        },
        gotoH5: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            });
        }
    }
});