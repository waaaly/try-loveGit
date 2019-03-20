function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function i(a) {
    if (a && a.__esModule) return a;
    var i = {};
    if (null != a) for (var t in a) Object.prototype.hasOwnProperty.call(a, t) && (i[t] = a[t]);
    return i.default = a, i;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = i(require("./model")), e = a(require("../../../../../libs/promise.min")), o = require("../../../../../common/logger"), n = i(require("../../../common/js/utils")), u = a(require("../../../../../common/wxcontext")), r = a(require("../../../../../api/Ptag/report_manager_wqvue")), c = new o.Logger("my/indexv2");

exports.default = function() {
    return {
        state: {
            couponNum: 0,
            balance: 0,
            eCardNum: 0,
            isCouponRed: !1,
            balanceDetail: "",
            isXcx: u.default.isXCX,
            baiTiaoNum: 0,
            baiTiaoText: "白条额度",
            isBaiTiaoNum: !0,
            notOpenBaitiao: !1
        },
        actions: {
            fetchAllAssetsData: function() {
                var a = this, i = u.default.JD.report.umpStart("wq.webmonitor.my.method.assets", 47, 62, 6e3), t = [ this.fetchCouponData(), this.fetchECardData(), this.getRedIcon(3, 1) ];
                return t.push(this.isXcx ? this.fetchBalanceData() : this.fetchBaiTiaoData()), e.default.all(t).then(function(t) {
                    if (Array.isArray(t)) {
                        var e = Array.isArray(t[0]) ? t[0].length.toString() : 0, o = t[1], n = t[2];
                        if (a.couponNum = e, a.eCardNum = o, a.isCouponRed = n, a.isXcx) {
                            var u = t[3];
                            a.balance = u;
                        } else {
                            var c = t[3];
                            a.baiTiaoNum = c.baiTiaoNum, a.baiTiaoText = c.baiTiaoText, a.isBaiTiaoNum = c.isBaiTiaoNum, 
                            a.notOpenBaitiao = c.notOpenBaitiao || !1;
                        }
                        a.isCouponRed && r.default.addPtag("7155.1.54"), i(0);
                    }
                }).catch(function(a) {
                    i(1), c.error(a);
                });
            },
            fetchCouponData: function() {
                return new e.default(function(a, i) {
                    t.loadCouponData(1).then(function(i) {
                        if (i) {
                            var e = u.default.isXCX ? t.couponsFilter(i.useable) : i.useable;
                            a(e);
                        } else a(0);
                    }).catch(function(i) {
                        a(0), c.error(i);
                    });
                });
            },
            fetchBalanceData: function() {
                var a = this;
                return new e.default(function(i, e) {
                    t.loadBalance().then(function(t) {
                        if (0 == t.retcode) {
                            var e = n.getShowNum(t.data);
                            a.balanceDetail = n.toThousands(e.toString()), e = e >= 1e5 ? n.toTenThousands(e.toString()) : n.toThousands(e.toString()), 
                            i(e);
                        } else i(0);
                    }).catch(function(a) {
                        i(0), c.error(a);
                    });
                });
            },
            fetchECardData: function() {
                return new e.default(function(a, i) {
                    t.getJDGiftCards(0, 10, 1).then(function(i) {
                        if (0 == i.errCode) {
                            var t = i.sumCount.toString();
                            a(t);
                        } else a(0);
                    }).catch(function(i) {
                        a(0), c.error(i);
                    });
                });
            },
            getRedIcon: function(a, i) {
                return new e.default(function(e, o) {
                    t.getRedIcon(a, i).then(function(a) {
                        if (0 == a.iRet) {
                            var i = a.data[0];
                            if (i) {
                                var t = !!(i.num > 0 && 3 == i.msg_type);
                                e(t);
                            } else e(!1);
                        } else e(!1);
                    }).catch(function(a) {
                        e(!1), c.error(a);
                    });
                });
            },
            removeRedIcon: function(a) {
                return new e.default(function(i, e) {
                    t.removeRedIcon(a).then(function(a) {
                        0 == a.iRet ? i(a) : i();
                    }).catch(function(a) {
                        e(a), c.error(a);
                    });
                });
            },
            fetchBaiTiaoData: function() {
                return new e.default(function(a, i) {
                    t.fetchBaiTiaoData().then(function(i) {
                        if (0 == i.ret && i.data) {
                            var t = i.data, e = t.availableLimit.indexOf(".") > 0 ? parseFloat(t.availableLimit).toFixed(2) : t.availableLimit, o = t.outstanding7Amount.indexOf(".") > 0 ? parseFloat(t.outstanding7Amount).toFixed(2) : t.outstanding7Amount, n = t.unpaidForMonth && t.unpaidForMonth.indexOf(".") > 0 ? parseFloat(t.unpaidForMonth).toFixed(2) : t.unpaidForMonth;
                            a(1 == t.bill ? 0 != n ? {
                                baiTiaoNum: n,
                                baiTiaoText: "本月待还",
                                isBaiTiaoNum: !0
                            } : {
                                baiTiaoNum: e,
                                baiTiaoText: "白条额度",
                                isBaiTiaoNum: !0
                            } : 0 != o ? {
                                baiTiaoNum: o,
                                baiTiaoText: "7天待还",
                                isBaiTiaoNum: !0
                            } : 0 != n ? {
                                baiTiaoNum: n,
                                baiTiaoText: "本月待还",
                                isBaiTiaoNum: !0
                            } : {
                                baiTiaoNum: e,
                                baiTiaoText: "白条额度",
                                isBaiTiaoNum: !0
                            });
                        } else a(1 == i.ret ? {
                            baiTiaoNum: "开通有礼",
                            baiTiaoText: "白条",
                            isBaiTiaoNum: !1,
                            notOpenBaitiao: !0
                        } : {
                            baiTiaoNum: "查询额度",
                            baiTiaoText: "白条额度",
                            isBaiTiaoNum: !1
                        });
                    }).catch(function(i) {
                        c.error(i), a({
                            baiTiaoNum: "查询额度",
                            baiTiaoText: "白条额度",
                            isBaiTiaoNum: !1
                        });
                    });
                });
            }
        }
    };
};