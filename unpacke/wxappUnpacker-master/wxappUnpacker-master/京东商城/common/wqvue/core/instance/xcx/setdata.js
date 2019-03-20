function e() {
    if (0 != a.length) for (;a.length > 0; ) {
        var e = a[0], r = e._dataQueue;
        i(e), t((0, u.extend)({}, r, !0), e), e._dataQueue = {}, a.shift();
    }
}

function t(e, t) {
    var i = (0, n.diff)(e, (0, n.getOldData)(e, t.data));
    (0, u.isPlainObject)(i) && (0, u.isNotEmptyObject)(i) && t.setData((0, u.extend)({}, i, !0), function() {
        (0, r.executeNextTick)(t);
    });
}

function i(e) {
    var t = e._computedWatchers || {}, i = Object.keys(t);
    i.length && i.forEach(function(i) {
        if (t[i].dirty) return e[i];
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.setDiffData = t, exports.triggerLazyComputed = i, exports.setData = function(t, i, u) {
    var r = "string" == typeof u ? u : u.getKeyChain(), n = a.filter(function(e) {
        return e._wqvueid == t._wqvueid;
    })[0];
    r.includes("[") && (r = r.split(".")[0].split("[")[0], i = t[r]), t._dataQueue[r] = i, 
    n || a.push(t), clearTimeout(f), f = setTimeout(function() {
        e();
    }, 20);
};

var u = require("../../util/index"), r = require("./nexttick"), n = require("../../util/diff"), a = [], f = 0;