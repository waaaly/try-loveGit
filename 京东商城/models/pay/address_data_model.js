Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.modifyAddress = exports.addAddress = exports.deleteAddress = exports.fetchAddressList = void 0;

var e = function(e) {
    if (e && e.__esModule) return e;
    var d = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (d[r] = e[r]);
    return d.default = e, d;
}(require("./pay_request.js"));

exports.fetchAddressList = function(d, r) {
    "function" == typeof d && (r = d);
    var t = {};
    (d = d || {}) && d.locationid && (t.locationid = d.locationid), t.t = Date.parse(new Date()), 
    e.get("https://wq.jd.com/deal/recvaddr/getrecvaddrlistV3", t, {
        success: function(e) {
            r && (0 != e.errCode ? r(e, []) : r(null, e.list));
        },
        fail: function(e) {
            r && r(e, []);
        }
    });
}, exports.deleteAddress = function(d, r) {
    var t = {};
    t.adid = d, t.t = Date.parse(new Date()), e.get("https://wq.jd.com/deal/recvaddr/delrecvaddr4jd", t, {
        success: function(e) {
            0 == e.errCode ? r && r(null, d) : r && r(e, d);
        },
        fail: function(e) {
            r && r(e, d);
        }
    });
}, exports.addAddress = function(d, r) {
    var t = d;
    t.rgid = "", t.isglobal = d.isglobal || 0, t.idcard = d.idcard || "", t.t = Date.parse(new Date()), 
    e.get("https://wq.jd.com/deal/recvaddr/addrecvaddr4jdv2", t, {
        success: function(e) {
            0 == e.errCode ? r && r(null, e) : r && r(e, null);
        },
        fail: function(e) {
            r && r(e);
        }
    });
}, exports.modifyAddress = function(d, r) {
    var t = d;
    t.rgid = "", t.isglobal = d.isglobal ? d.isglobal : 0, t.idcard = d.idcard ? d.idcard : "", 
    t.idRequired = d.idRequired ? d.idRequired : "0", t.t = Date.parse(new Date()), 
    e.get("https://wq.jd.com/deal/recvaddr/modifyrecvaddr4jd", t, {
        success: function(e) {
            0 == e.errCode ? r && r(null, null) : r && r(e, null);
        },
        fail: function(e) {
            r && r(e, null);
        }
    });
};