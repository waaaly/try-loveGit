Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.nextTick = function() {
    this.$nextTickFn = [], this.$nextTick = function(t) {
        var n = this;
        if (void 0 === t) {
            if (void 0 === e.default) throw new Error("当前环境不支持Promise！");
            return new e.default(function(e, t) {
                var i = function() {
                    e();
                };
                i.promise = !0, n.$nextTickFn.push(i);
            });
        }
        this.$nextTickFn.push(t);
    };
}, exports.executeNextTick = function(e) {
    var t = e.$nextTickFn || [];
    t.length && (t.forEach(function(t) {
        t.promise ? t() : t.call(e);
    }), e.$nextTickFn = []);
};

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../../libs/promise.min"));