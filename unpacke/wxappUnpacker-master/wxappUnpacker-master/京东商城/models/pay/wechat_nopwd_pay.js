function p(p, t) {
    return new e.default(function(e, r) {
        a.get(p, t, {
            success: function(p) {
                e(p);
            },
            fail: function(p) {
                var a = p.code, e = p.message;
                r({
                    code: a,
                    message: e
                });
            }
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.wxSaPay = exports.wxPapPay = exports.operatePapPayGuide = exports.supportPapPay = void 0;

var a = function(p) {
    if (p && p.__esModule) return p;
    var a = {};
    if (null != p) for (var e in p) Object.prototype.hasOwnProperty.call(p, e) && (a[e] = p[e]);
    return a.default = p, a;
}(require("./pay_request.js")), e = function(p) {
    return p && p.__esModule ? p : {
        default: p
    };
}(require("../../libs/promise.min.js")), t = getApp(), r = {
    supportpappay: "https://wq.jd.com/wxcontractgw/supportpappay",
    operatepappayguide: "https://wq.jd.com/wxcontractgw/operatepappayguide",
    wxpappay: "https://wq.jd.com/jdpaygw/wxpappay",
    wxsapay: "https://wq.jd.com/jdpaygw/wxsapay"
};

exports.supportPapPay = function(a, e) {
    var n = {
        appid: t.appId,
        itemType: a || "",
        dealId: e || ""
    };
    return p(r.supportpappay, n);
}, exports.operatePapPayGuide = function() {
    var a = {
        appid: t.appId
    };
    return p(r.operatepappayguide, a);
}, exports.wxPapPay = function(a) {
    var e = {
        appid: t.appId,
        dealId: a
    };
    return p(r.wxpappay, e);
}, exports.wxSaPay = function(a) {
    var n = {
        appid: t.appId,
        dealId: a,
        wxpap: 1
    };
    return new e.default(function(e, t) {
        p(r.wxsapay, n).then(function(p) {
            if (0 == p.errno) {
                var r = p.data;
                wx.requestPayment({
                    timeStamp: r.timeStamp,
                    nonceStr: r.nonceStr,
                    package: r.package,
                    signType: r.signType,
                    paySign: r.paySign,
                    success: function(p) {
                        e(a);
                    },
                    fail: function(p) {
                        t(p);
                    }
                });
            } else t(p);
        });
    });
};