function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t, i, s) {
    return (0, a.isPlainObject)(i) && (s = i, i = i.handler), "string" == typeof i && (i = e[i]), 
    e.$watch(t, i, s);
}

function i(e) {
    o.clear(), s(e, o);
}

function s(e, t) {
    var i = void 0, n = void 0, r = Array.isArray(e);
    if ((r || (0, a.isObject)(e)) && Object.isExtensible(e)) {
        if (e.__ob__) {
            var h = e.__ob__.dep.id;
            if (t.has(h)) return;
            t.add(h);
        }
        if (r) for (i = e.length; i--; ) s(e[i], t); else for (i = (n = Object.keys(e)).length; i--; ) s(e[n[i]], t);
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Watcher = void 0;

var n = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var s = t[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, i, s) {
        return i && e(t.prototype, i), s && e(t, s), t;
    };
}();

exports.initWatch = function(e, i) {
    for (var s in i) {
        var n = i[s];
        if (Array.isArray(n)) for (var r = 0; r < n.length; r++) t(e, s, n[r]); else t(e, s, n);
    }
}, exports.init$watch = function(e) {
    e.$watch = function(e, i, s) {
        var n = this;
        if ((0, a.isPlainObject)(i)) return t(n, e, i, s);
        (s = s || {}).user = !0;
        var r = new u(n, e, i, s);
        return s.immediate && i.call(n, r.value), function() {
            r.teardown();
        };
    };
};

var r = require("./scheduler"), h = require("./dep"), a = require("../util/index"), c = 0, u = exports.Watcher = function() {
    function t(i, s, n, r) {
        e(this, t), this.instance = i, i._watchers.push(this), r ? (this.deep = !!r.deep, 
        this.user = !!r.user, this.lazy = !!r.lazy, this.sync = !!r.sync) : this.deep = this.user = this.lazy = this.sync = !1, 
        this.cb = n, this.id = ++c, this.active = !0, this.dirty = this.lazy, this.deps = [], 
        this.newDeps = [], this.depIds = new Set(), this.newDepIds = new Set(), this.expression = s.toString(), 
        "function" == typeof s ? this.getter = s : (this.getter = (0, a.parsePath)(s), this.getter || (this.getter = function() {})), 
        this.value = this.lazy ? void 0 : this.get();
    }
    return n(t, [ {
        key: "get",
        value: function() {
            (0, h.pushTarget)(this);
            var e = this.instance, t = void 0;
            try {
                t = this.getter.call(e, e);
            } catch (t) {
                if (!this.user) throw t;
                console.error(t, e, 'getter for watcher "' + this.expression + '"');
            } finally {
                this.deep && i(t), (0, h.popTarget)(), this.cleanupDeps();
            }
            return t;
        }
    }, {
        key: "addDep",
        value: function(e) {
            var t = e.id;
            this.newDepIds.has(t) || (this.newDepIds.add(t), this.newDeps.push(e), this.depIds.has(t) || e.addSub(this));
        }
    }, {
        key: "cleanupDeps",
        value: function() {
            for (var e = this.deps.length; e--; ) {
                var t = this.deps[e];
                this.newDepIds.has(t.id) || t.removeSub(this);
            }
            var i = this.depIds;
            this.depIds = this.newDepIds, this.newDepIds = i, this.newDepIds.clear(), i = this.deps, 
            this.deps = this.newDeps, this.newDeps = i, this.newDeps.length = 0;
        }
    }, {
        key: "update",
        value: function() {
            this.lazy ? this.dirty = !0 : this.sync ? this.run() : (0, r.queueWatcher)(this);
        }
    }, {
        key: "run",
        value: function() {
            if (this.active) {
                var e = this.get();
                if (e !== this.value || (0, a.isObject)(e) || this.deep) {
                    var t = this.value;
                    if (this.value = e, this.user) try {
                        this.cb.call(this.instance, e, t);
                    } catch (e) {
                        console.error(e, this.instance, 'callback for watcher "' + this.expression + '"');
                    } else this.cb.call(this.instance, e, t);
                }
            }
        }
    }, {
        key: "evaluate",
        value: function() {
            this.value = this.get(), this.dirty = !1;
        }
    }, {
        key: "depend",
        value: function() {
            for (var e = this.deps.length; e--; ) this.deps[e].depend();
        }
    }, {
        key: "teardown",
        value: function() {
            if (this.active) {
                for (var e = this.deps.length; e--; ) this.deps[e].removeSub(this);
                this.active = !1;
            }
        }
    } ]), t;
}(), o = new Set();