Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.createStyle = exports.wxPromisify = exports.setState = exports.error = void 0;

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/promise.min.js")), o = function(e, t) {
    return console.error(e), t;
};

exports.error = o, exports.setState = function(o) {
    var r = this;
    return new t.default(function(t, n) {
        if ("object" !== (void 0 === o ? "undefined" : e(o))) n(new Error("setData 的数据不是对象")); else {
            var i = void 0;
            r.__version ? i = r.__version : (i = wx.getSystemInfoSync().SDKVersion, r.__version = i);
            var s = i.split(".");
            s[0] >= 1 && s[1] >= 5 && s[2] >= 0 ? r.setData(o, function() {
                t("ok");
            }) : (r.setData(o), setTimeout(function() {
                return t("ok");
            }, 100));
        }
    });
}, exports.wxPromisify = function(r) {
    return "function" == typeof r && function(o) {
        return o = "object" === (void 0 === o ? "undefined" : e(o)) ? o : {}, new t.default(function(e, t) {
            r(Object.assign({}, o, {
                success: function(t) {
                    e(t);
                },
                fail: function(e) {
                    t(e);
                },
                complete: function() {}
            }));
        });
    } || o("微信接口 Promise 化入参类型错误", function() {});
}, exports.createStyle = function(e) {
    var t = "";
    for (var o in e) if (e.hasOwnProperty(o)) {
        var r = e[o];
        t += (o = o.replace(/([A-Z])/g, "-$1").toLowerCase()) + ": " + r + ";";
    }
    return t;
};