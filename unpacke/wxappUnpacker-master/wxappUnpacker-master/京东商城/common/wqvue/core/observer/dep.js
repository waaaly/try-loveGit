function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Dep = void 0;

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}();

exports.pushTarget = function(e) {
    a.target && u.push(a.target), a.target = e;
}, exports.popTarget = function() {
    a.target = u.pop();
};

var n = require("../util/util"), i = require("../instance/xcx/setdata"), r = 0, a = exports.Dep = function() {
    function a(t, n) {
        e(this, a), this.keyChain = t, this.key = n, this.id = r++, this.subs = [];
    }
    return t(a, [ {
        key: "addSub",
        value: function(e) {
            this.subs.push(e);
        }
    }, {
        key: "removeSub",
        value: function(e) {
            (0, n.remove)(this.subs, e);
        }
    }, {
        key: "depend",
        value: function() {
            a.target && a.target.addDep(this);
        }
    }, {
        key: "notify",
        value: function(e, t) {
            for (var n = this.subs.slice(), r = 0, a = n.length; r < a; r++) n[r].update();
            (0, i.setData)(e, t, this);
        }
    }, {
        key: "getKeyChain",
        value: function() {
            var e = this.keyChain + "." + this.key;
            return this.keyChain ? this.key ? e : this.keyChain : this.key;
        }
    } ]), a;
}();

a.target = null;

var u = [];