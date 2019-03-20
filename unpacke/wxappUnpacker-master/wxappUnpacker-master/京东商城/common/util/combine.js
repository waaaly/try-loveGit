Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
};

exports.combine = function(t) {
    for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
    return n.forEach(function(e) {
        if ("object" !== (void 0 === e ? "undefined" : o(e))) throw new Error("组件的配置应当是个对象");
        for (var n in e) e.hasOwnProperty(n) && function() {
            var r = e[n];
            if ("object" === (void 0 === r ? "undefined" : o(r))) t[n] = t[n] || {}, t[n] = Object.assign({}, r, t[n]); else if ("function" == typeof r) {
                var f = t[n] ? t[n] : function() {};
                t[n] = function() {
                    f.apply(this, arguments), r.apply(this, arguments);
                };
            } else t[n] = t[n] || e[n];
        }();
    }), t;
};