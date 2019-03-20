Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.arrayMethods = void 0;

var e = require("../util/lang"), r = Array.prototype, t = exports.arrayMethods = Object.create(r);

[ "push", "pop", "shift", "unshift", "splice", "sort", "reverse" ].forEach(function(s) {
    var a = r[s];
    (0, e.def)(t, s, function() {
        for (var e = arguments.length, r = Array(e), t = 0; t < e; t++) r[t] = arguments[t];
        var o = a.apply(this, r), i = this.__ob__, p = void 0;
        switch (s) {
          case "push":
          case "unshift":
            p = r;
            break;

          case "splice":
            p = r.slice(2);
        }
        return p && i.observeArray(p), i.dep.notify(i.pageObj, this), o;
    });
});