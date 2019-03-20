function e() {
    d = r.length = n.length = 0, o = {}, u = l = !1;
}

function i() {
    l = !0;
    var i = void 0, t = void 0;
    for (r.sort(function(e, i) {
        return e.id - i.id;
    }), d = 0; d < r.length; d++) t = (i = r[d]).id, o[t] = null, i.run();
    e();
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.MAX_UPDATE_COUNT = void 0, exports.queueWatcher = function(e) {
    var n = e.id;
    if (null == o[n]) {
        if (o[n] = !0, l) {
            for (var s = r.length - 1; s > d && r[s].id > e.id; ) s--;
            r.splice(s + 1, 0, e);
        } else r.push(e);
        u || (u = !0, (0, t.nextTick)(i));
    }
};

var t = require("../util/index"), r = (exports.MAX_UPDATE_COUNT = 100, []), n = [], o = {}, u = !1, l = !1, d = 0;