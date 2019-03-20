function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.WqComponent = exports.WqVue = void 0;

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var r = n[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, t, r) {
        return t && e(n.prototype, t), r && e(n, r), n;
    };
}(), t = require("./core/instance/xcx/index/index"), r = require("../../bases/page.js"), o = require("../../bases/component.js");

exports.WqVue = function() {
    function o(n) {
        e(this, o), this.pObj = (0, t.parse)(n, n.store), this.register();
    }
    return n(o, [ {
        key: "register",
        value: function() {
            new r.JDPage(this.pObj);
        }
    } ]), o;
}(), exports.WqComponent = function() {
    function r(n, o) {
        e(this, r), this.pObj = (0, t.componentParse)(n, n.store), this.register();
    }
    return n(r, [ {
        key: "register",
        value: function() {
            new o.JDComponent(this.pObj);
        }
    } ]), r;
}();