function e(e) {
    if (e && e.__esModule) return e;
    var s = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (s[a] = e[a]);
    return s.default = e, s;
}

function s(e, s, a, o, d) {
    var p = {
        operation: e,
        result: o,
        message: d,
        bizid: 619,
        traceid: App.traceId || ""
    };
    if (t.umpBiz(p), 0 !== s) {
        var i = {
            operation: s,
            result: o,
            message: 0 == o ? "" : "[" + e + "_" + a + "]" + d,
            bizid: 619,
            traceid: App.traceId || ""
        };
        t.umpBiz(i);
    }
}

function a(e, t, r, h) {
    var l = {};
    l.url = e, App.traceId && (t.traceid = App.traceId), l.data = t;
    var c = p[e] ? p[e].o1 : i, m = p[e] ? p[e].o2 : i, n = (e || "").substr(-20);
    99 == c && console.log("结算接口未监控:" + e), o.request.get(l).then(function(o) {
        var p = o.body, i = 7770;
        void 0 !== p.errId ? i = p.errId : void 0 !== p.errCode ? i = p.errCode : void 0 !== p.errcode ? i = p.errcode : void 0 !== p.errno ? i = p.errno : void 0 !== p.retcode ? i = p.retcode : void 0 !== p.ret ? i = p.ret : void 0 !== p.iRet && (i = p.iRet);
        var l = p.errMsg || p.msg || p.retmsg;
        0 == i ? (s(c, m, n, 0), r && r.success && r.success(p, t)) : h || 13 != i ? (s(c, m, n, i || 1, "[yw]" + l), 
        r && r.success && r.success(p, t)) : d.doLogin().then(function() {
            a(e, t, r, !0);
        }, function(e) {
            r && r.success && r.success(p, t);
        });
    }, function(e) {
        e.errId = e.code, e.errMsg = e.message, s(c, m, n, e.errId, "[wg]" + e.errMsg + "(" + e.code + ")"), 
        r && r.fail && r.fail(e, t);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getShipData = exports.getSetPayShipParamData = exports.get = void 0;

var t = e(require("../../common/fe_report/usability.js")), o = require("../../common/request/request.js"), d = e(require("../../common/login/login.js")), p = {
    "https://wqdeal2.jd.com/deal/minfo/orderinfo": {
        o1: 1,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/minfo/venderinfo": {
        o1: 2,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/mship/shipeffect": {
        o1: 3,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/masset/userasset": {
        o1: 4,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/massit/assitinfo": {
        o1: 5,
        o2: 0
    },
    "https://wq.jd.com/deal/recvaddr/getrecvaddrV3": {
        o1: 6,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/massit/getinvoicelist": {
        o1: 7,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/massit/saveinvoice": {
        o1: 8,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mship/chooseship": {
        o1: 9,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mshopcart/uncheckcmdy": {
        o1: 10,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mshopcart/rmvcmdy": {
        o1: 11,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/msubmit/confirm": {
        o1: 12,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/mship/setpayship": {
        o1: 13,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/masset/setbean": {
        o1: 14,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/masset/setbalance": {
        o1: 15,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/masset/setgiftcard": {
        o1: 16,
        o2: 99
    },
    "https://wqdeal.jd.com/deal/masset/giftcardlist": {
        o1: 114,
        o2: 99
    },
    "https://wq.jd.com/pingou_core/GetBizValueInfo": {
        o1: 115,
        o2: 99
    },
    "https://wqdeal1.jd.com/deal/masset/setredpacket": {
        o1: 116,
        o2: 99
    },
    "https://wq.jd.com/user/info/PwdIsActive": {
        o1: 17,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/masset/setcouponlist": {
        o1: 18,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/masset/optimalcoupon": {
        o1: 19,
        o2: 99
    },
    "https://wq.jd.com/deal/recvaddr/getrecvaddrlistV3": {
        o1: 20,
        o2: 99
    },
    "https://wq.jd.com/deal/recvaddr/delrecvaddr4jd": {
        o1: 21,
        o2: 99
    },
    "https://wq.jd.com/deal/recvaddr/addrecvaddr4jdv2": {
        o1: 22,
        o2: 99
    },
    "https://wq.jd.com/deal/recvaddr/modifyrecvaddr4jd": {
        o1: 23,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mshopcart/modifycmdypromo": {
        o1: 24,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mshopcart/addcmdy": {
        o1: 25,
        o2: 99
    },
    "https://wq.jd.com/jdpaygw/wxsapay": {
        o1: 27,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/setcouponlist": {
        o1: 28,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/setgbuyaut": {
        o1: 29,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/orderinfo": {
        o1: 30,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/venderinfo": {
        o1: 31,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/confirm": {
        o1: 32,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/shipeffect": {
        o1: 33,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/assitinfo": {
        o1: 34,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/chooseship": {
        o1: 35,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/setpayship": {
        o1: 36,
        o2: 99
    },
    "https://wq.jd.com/user/info/SecurityPwd": {
        o1: 37,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mship/getpicksitelist": {
        o1: 38,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/getcouponlist": {
        o1: 39,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/getpicksitelist": {
        o1: 40,
        o2: 99
    },
    "https://wq.jd.com/deal/massit/getcoudanfreightandprice": {
        o1: 42,
        o2: 99
    },
    "https://wq.jd.com/deal/mshopcart/addcmdy": {
        o1: 43,
        o2: 99
    },
    "https://wq.jd.com/activepersistent/gwlb/querywxlborder": {
        o1: 44,
        o2: 99
    },
    "https://wq.jd.com/bases/daifu/view": {
        o1: 45,
        o2: 99
    },
    "https://wq.jd.com/bases/daifu/find": {
        o1: 46,
        o2: 99
    },
    "https://wq.jd.com/bases/daifu/confirm": {
        o1: 47,
        o2: 99
    },
    "https://wq.jd.com/dfpaygw/wxsapay": {
        o1: 48,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mship/selectbuyerfreightinsure": {
        o1: 50,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mship/vshipsvc": {
        o1: 100,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mship/vshipfee": {
        o1: 101,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mship/getitemchargelist": {
        o1: 102,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mship/updateorderdelivery": {
        o1: 103,
        o2: 99
    },
    "https://wq.jd.com/wxpaymkt/GetOrderBonus": {
        o1: 104,
        o2: 99
    },
    "https://wq.jd.com/zcpaygw/wxsapay": {
        o1: 105,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mship/selectpackagingservices": {
        o1: 107,
        o2: 99
    }
}, i = 99;

exports.get = a, exports.getSetPayShipParamData = function(e) {
    var s = new Array(6), a = new Array(22), t = e.vender, o = e.selectShipId, d = e.shipType;
    e.resetShip && (d = "0"), "0" == d ? a = App.setPayShipData[0] && App.setPayShipData[0].ship && 22 == App.setPayShipData[0].length && !e.choose ? App.setPayShipData[0].ship.split("|") : new Array(21) : "1" == d ? a = new Array(7) : "2" == d || "5" == d ? (a = new Array(14), 
    a = App.setPayShipData[t.venderId] && App.setPayShipData[t.venderId].ship ? App.setPayShipData[t.venderId].ship.split("|") : new Array(14)) : "8" == d ? a = new Array(8) : "9" == d && (a = new Array(15));
    for (var p = 0, i = s.length; p < i; p++) s[p] = "";
    for (var r = 0, h = a.length; r < h; r++) a[r] = a[r] || "";
    if (a[0] = d, a[1] = o, "1" == d || "2" == d || "5" == d || "9" == d ? a[2] = t.venderId : "8" == d ? a[2] = "0" : a[17] = "0", 
    "0" == d) "ship411" == t.selectedShip ? (a[2] = 5, a[7] = 2, a[11] = t.ship411Obj.sendpay || "") : "ship311" == t.selectedShip ? (a[2] = 4, 
    a[7] = 1, a[9] = t.ship311Obj.date || "", a[10] = t.ship311Obj.time || "", a[11] = t.ship311Obj.sendpay || "", 
    a[12] = t.ship311Obj.batchId || "", t.smInstall && t.smIn311Obj ? a[20] = t.shipSmIns.iOffset || "" : a[20] = "") : "shipjzd" == t.selectedShip && (a[2] = 6, 
    a[7] = 3, a[9] = t.shipjzdObj.date || "", a[10] = t.shipjzdObj.time || "", a[11] = t.shipjzdObj.sendpay || "", 
    a[12] = t.shipjzdObj.batchId || "", a[18] = e.shiptag || "", t.smInstall && t.smInjzdObj ? a[20] = t.shipSmIns.iOffset || "" : a[20] = ""), 
    a[5] = 0, a[19] = t.honortag, t.shipSupCombine ? a[21] = t.shipSelectCombine ? 1 : 0 : a[21] = 0, 
    s = []; else if ("3" == d || "6" == d) s[0] = d, s[1] = o, s[2] = t.shipzitiObj.addr.pickId, 
    s[3] = 0, s[5] = t.shipzitiObj.date, s[6] = t.venderId, a = []; else if ("2" == d) {
        var l = t.shipSopObj || {};
        a[3] = l.date || "", a[4] = l.time || "", a[5] = l.sendpay || "", a[6] = l.batchId || "", 
        a[13] = t.honortag;
    } else if ("5" == d) {
        var c = t.shipSopjdObj || {};
        a[3] = c.date || "", a[4] = c.time || "", a[5] = c.sendpay || "", a[6] = c.batchId || "", 
        a[13] = t.honortag;
    } else if ("8" == d) a[3] = t.shipGsdObj.date || "", a[4] = t.shipGsdObj.time || "", 
    a[5] = t.shipGsdObj.sendpay || "", a[6] = t.shipGsdObj.batchId || "", a[7] = (t.shipGsdObj.time || "").indexOf("立即送达") > -1 ? "1" : "2"; else if ("9" == d) {
        var m = t.shipPopGsdObj || {};
        a[3] = m.date || "", a[4] = m.time || "", a[5] = m.sendpay || "", a[6] = m.batchId || "", 
        a[14] = (m.time || "").indexOf("立即送达") > -1 ? "1" : "2";
    }
    return "3" != d && "6" != d && "7" != d && (s = []), t.shiplaSopjd ? (a[7] = "1", 
    a[8] = t.shipla.defaultDOffset, a[9] = t.shipla.promiseDate, a[10] = t.shipla.promiseTimeRange, 
    a[11] = t.shipla.promiseSendPay, a[12] = t.shipla.batchId) : t.isla && ("shipla" == t.selectedlaShip ? (a[3] = t.shiplaObj.defaultDOffset || "", 
    a[4] = t.shipIns.iOffset || "", a[8] = 4) : "shipla2" == t.selectedlaShip ? (a[3] = t.shipla2Obj.reservingDate || "", 
    a[4] = t.shipIns.iOffset || "", a[8] = 4, a[13] = t.shipla2Obj.date || "", a[14] = t.shipla2Obj.time || "", 
    a[15] = t.shipla2Obj.sendpay || "", a[16] = t.shipla2Obj.batchId || "") : "shiplajzd" == t.selectedlaShip ? (a[3] = t.shiplajzdObj.reservingDate || "", 
    a[4] = t.shipIns.iOffset || "", a[8] = 5, a[13] = t.shiplajzdObj.date || "", a[14] = t.shiplajzdObj.time || "", 
    a[15] = t.shiplajzdObj.sendpay || "", a[16] = t.shiplajzdObj.batchId || "", a[18] = e.shiptag || "") : "shipla411" == t.selectedlaShip && (a[3] = "0", 
    a[4] = t.shipIns.iOffset, a[8] = 6, a[13] = t.shipla411Obj.codDate, a[14] = t.shipla411Obj.speedHour, 
    a[15] = t.shipla411Obj.sendpay, a[16] = t.shipla411Obj.speedMark), s = []), {
        paytype: "0",
        paychannel: "0",
        reg: 1,
        ship: a.join("|"),
        pick: s.join("|")
    };
}, exports.getShipData = function() {
    var e = [], s = [], a = App.setPayShipData;
    for (var t in a) a[t].ship && e.push(a[t].ship), a[t].pick && s.push(a[t].pick);
    return [ e.join("$"), s.join("$") ];
};