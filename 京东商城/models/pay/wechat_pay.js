function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    return t.default = e, t;
}

function t(e, t, n) {
    var r = {};
    r.appid = e, r.dealId = t, r.t = Date.parse(new Date()), i.get("https://wq.jd.com/jdpaygw/wxsapay", r, {
        success: function(e) {
            a(e, n);
        },
        fail: function(e) {
            e.__dealId = o, n(e, o);
        }
    });
}

function a(e, t) {
    if (0 == e.errno) {
        var a = e.data;
        wx.requestPayment({
            timeStamp: a.timeStamp,
            nonceStr: a.nonceStr,
            package: a.package,
            signType: a.signType,
            paySign: a.paySign,
            success: function(e) {
                t(null, o);
            },
            fail: function(e) {
                t(e, o);
            },
            complete: function(e) {}
        });
    } else t(e, o);
}

function n(e, t, a) {
    var n = {};
    n.appid = e, n.dealId = t, n.t = Date.parse(new Date()), i.get("https://wq.jd.com/jdpaygw/wxmwebpay", n, {
        success: function(e) {
            r(e, a);
        },
        fail: function(e) {
            e.__dealId = o, a(e, o, "QB");
        }
    });
}

function r(e, t) {
    if (0 == e.errno) {
        var a = e.data;
        wx.requestPayment({
            package: c.getUrlParam("package", a.mweb_url),
            prepay_id: c.getUrlParam("prepay_id", a.mweb_url),
            referer: "http://wqs.jd.com",
            success: function(e) {
                t(null, o, "QB");
            },
            fail: function(e) {
                t(e, o, "QB");
            },
            complete: function(e) {}
        });
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.requestPay = void 0;

var i = e(require("./pay_request.js")), c = e(require("../../common/utils.js")), o = (getApp(), 
void 0);

exports.requestPay = function(e, a, r) {
    o = a, wx.getSystemInfoSync().isQB ? n(e = "wxae3e8056daea8727", a, r) : t(e, a, r);
};