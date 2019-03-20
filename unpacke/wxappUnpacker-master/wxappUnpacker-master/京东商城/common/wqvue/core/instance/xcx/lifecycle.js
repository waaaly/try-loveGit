function e(e, n) {
    var o = [], r = !1;
    for (var t in e) o = o.concat(e[t]);
    return o.forEach(function(e) {
        if (n.hasOwnProperty(e)) return r = !0, !1;
    }), r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.parseXcxLifeCircle = function(r, t, a) {
    var d = a ? {
        onLoad: [ "created", "created_xcx", "onLoad" ],
        onReady: [ "mounted", "mounted_xcx", "onReady" ],
        onShow: [ "onShow", "onShow_xcx" ],
        onHide: [ "onHide" ],
        onUnload: [ "destroyed", "destroyed_xcx", "onUnload" ],
        onReachBottom: [ "onReachBottom" ],
        onPullDownRefresh: [ "onPullDownRefresh" ]
    } : {
        created: [ "created" ],
        attached: [ "beforeMount", "attached" ],
        ready: [ "mounted", "mounted_xcx", "ready" ],
        detached: [ "destroyed", "destroyed_xcx", "detached" ]
    }, i = !1;
    if (e(d, r)) {
        (0, o.initXcxInCreated)(a, r, t, function() {
            for (var e = this, o = arguments.length, t = Array(o), i = 0; i < o; i++) t[i] = arguments[i];
            d[a ? "onLoad" : "created"].forEach(function(o) {
                r[o] && (0, n.bind)(r[o], e).apply(void 0, t);
            });
        }), i = !0;
        for (var c in d) !function(e) {
            var o = [];
            if (!a && i && "created" == e) return "continue";
            if (!a && i && "attached" == e) return "continue";
            if (a && i && "onLoad" == e) return "continue";
            var c = !0, u = !1, f = void 0;
            try {
                for (var h, l = d[e][Symbol.iterator](); !(c = (h = l.next()).done); c = !0) {
                    var y = h.value;
                    r[y] && o.push(y);
                }
            } catch (e) {
                u = !0, f = e;
            } finally {
                try {
                    !c && l.return && l.return();
                } finally {
                    if (u) throw f;
                }
            }
            if (0 == o.length) return "continue";
            t[e] = function() {
                for (var e = this, t = arguments.length, a = Array(t), d = 0; d < t; d++) a[d] = arguments[d];
                o.forEach(function(o) {
                    r[o] && (0, n.bind)(r[o], e).apply(void 0, a);
                });
            };
        }(c);
    } else (0, o.initXcxInCreated)(a, r, t);
};

var n = require("../../util/util"), o = require("./init");