function e(a, s) {
    var t = a.mixins || a.behaviors;
    if (t && t.length) {
        s.behaviors = [];
        var o = !0, v = !1, l = void 0;
        try {
            for (var h, n = t[Symbol.iterator](); !(o = (h = n.next()).done); o = !0) {
                var u = h.value, c = {};
                u._isBehaviors = !0, e(u, c), (0, i.parseProps)(u, c), (0, i.parseMethods)(u, c), 
                (0, r.parseXcxLifeCircle)(u, c, !1), s.behaviors.push(Behavior(c));
            }
        } catch (e) {
            v = !0, l = e;
        } finally {
            try {
                !o && n.return && n.return();
            } finally {
                if (v) throw l;
            }
        }
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.parseBehaviors = e;

var r = require("./lifecycle"), i = require("./state");