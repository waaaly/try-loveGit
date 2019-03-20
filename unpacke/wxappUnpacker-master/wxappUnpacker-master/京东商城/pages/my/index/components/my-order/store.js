function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
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

var r = t(require("../../../../../libs/promise.min")), a = e(require("../../../models/assets_data")), o = t(require("../../../../../api/Ptag/report_manager_wqvue")), n = require("../../../../../common/logger"), i = t(require("../../../../../common/wxcontext")), u = e(require("../../../common/js/utils")), s = new n.Logger("my/indexv2");

exports.default = function() {
    return {
        state: {
            waitPayCount: 0,
            receiveCount: 0,
            commentNum: 0,
            dealLogList: [],
            showLogisBox: !1,
            isMenv: 3 == u.getEnv()
        },
        actions: {
            fetAllOrderData: function() {
                var e = this, t = i.default.JD.report.umpStart("wq.webmonitor.my.method.order", 47, 63, 6e3), a = [ this.fetchOrderNum(1) ];
                return !this.isMenv && a.push(this.fetchCommentNum(1)), r.default.all(a).then(function(r) {
                    if (Array.isArray(r)) {
                        var a = {};
                        r.forEach(function(e) {
                            return Object.assign(a, e);
                        }), e.waitPayCount = a.waitPayCount, e.receiveCount = a.receiveCount, e.commentNum = a.commentNum, 
                        t(0), e.receiveCount > 0 ? e.getLogisticsInfoData() : e.showLogisBox = !1, e.waitPayCount && o.default.addPtag("7155.1.53");
                    }
                }).catch(function(e) {
                    t(1), s.error(e);
                });
            },
            fetchOrderNum: function(e) {
                return new r.default(function(t, r) {
                    a.getOrderNum(e).then(function(e) {
                        if (0 == e.ret_code) {
                            var r = e.waitPayCount || " ", a = Number(e.waitReceiveCount || 0), o = Number(e.waitPickCount || 0);
                            t({
                                waitPayCount: r,
                                receiveCount: a + o || " "
                            });
                        } else t({
                            waitPayCount: 0,
                            receiveCount: 0
                        }), s.error(e);
                    }).catch(function(e) {
                        t({
                            waitPayCount: 0,
                            receiveCount: 0
                        }), s.error(e);
                    });
                });
            },
            fetchCommentNum: function(e) {
                return new r.default(function(t, r) {
                    a.showCommentNum(e).then(function(e) {
                        if (0 == e.ret_code) {
                            var r = e.totalItem || " ";
                            t({
                                commentNum: r
                            });
                        } else t({
                            commentNum: 0
                        }), s.error(e);
                    }).catch(function(e) {
                        t({
                            commentNum: 0
                        }), s.error(e);
                    });
                });
            },
            getLogisticsInfoData: function() {
                var e = this, t = i.default.JD.report.umpStart("wq.webmonitor.my.method.logistics", 47, 64, 6e3);
                return new r.default(function(r, n) {
                    a.getLogisticsInfo().then(function(r) {
                        if (r && 0 == r.errCode) {
                            var a = r.dealLogList;
                            if (a && 0 === a.length) return e.showLogisBox = !1, !1;
                            for (var n = 0; n < a.length; n++) {
                                var i = a[n];
                                if (i.id = n, i.stateName) switch (i.state) {
                                  case "4":
                                  case "5":
                                  case "6":
                                  case "7":
                                  case "32":
                                    i.stateText = "待发货";
                                    break;

                                  case "15":
                                    i.stateText = "配送中";
                                    break;

                                  case "18":
                                    i.stateText = "已签收";
                                    break;

                                  case "21":
                                    i.stateText = "审核中";
                                    break;

                                  case "22":
                                  case "23":
                                    i.stateText = "处理中";
                                    break;

                                  case "11":
                                    i.stateText = "待自提";
                                    break;

                                  case "13":
                                    i.stateText = "已签收";
                                    break;

                                  case "12":
                                    i.stateText = "自提超时";
                                    break;

                                  case "8":
                                    i.stateText = "待出库";
                                    break;

                                  case "9":
                                  case "10":
                                    i.stateText = "配送中";
                                    break;

                                  case "20":
                                    i.stateText = "收款确认";
                                    break;

                                  default:
                                    a.splice(n, 1), n--;
                                } else a.splice(n, 1), n--;
                            }
                            e.dealLogList = a, e.showLogisBox = 0 != a.length, e.showLogisBox && o.default.addPtagExposure("7155.1.189"), 
                            t(0);
                        } else t(1);
                    }).catch(function(e) {
                        s.error(e), t(1);
                    });
                });
            }
        }
    };
};