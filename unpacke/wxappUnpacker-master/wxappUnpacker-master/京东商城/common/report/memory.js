Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../fe_report/usability");

exports.default = function() {
    "function" == typeof wx.onMemoryWarning && wx.onMemoryWarning(function() {
        var o = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).level, r = void 0 === o ? 1 : o;
        (0, e.umpBiz)({
            bizid: 777,
            operation: 105,
            result: r
        }), console.warn("Memory Warning! Level: " + r);
    });
};