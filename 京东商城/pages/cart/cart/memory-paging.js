function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = arguments[1], i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function(t, e) {
        return t + e.list.length;
    }, n = t.reduce(i, 0);
    return Math.floor((n + e - 1) / e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), n = Symbol("rawData"), s = Symbol("limit"), a = Symbol("curPage"), r = Symbol("totalPage"), u = Symbol("pages"), l = Symbol("getPages");

exports.MemoryPaging = function() {
    function o(i) {
        t(this, o), i = Object.assign({
            data: [],
            limit: 10
        }, i), this[n] = i.data, this[s] = i.limit, this[a] = 1, this[r] = e(i.data, i.limit), 
        this[u] = this[l]();
    }
    return i(o, [ {
        key: "group",
        value: function() {
            var t = [], e = [], i = this[n], a = this[s], r = 0;
            return i.forEach(function(i) {
                var n = i.list;
                if (r >= a) e.push(i); else {
                    var s = a - r, u = Object.assign({}, i, {
                        list: n.slice(0, s)
                    });
                    r += u.list.length, t.push(u), r === a && e.push(Object.assign({}, i, {
                        list: n.slice(s, n.length)
                    }));
                }
            }), {
                head: t,
                last: e
            };
        }
    }, {
        key: "hasNext",
        value: function() {
            return this[a] <= this[r];
        }
    }, {
        key: "isLastPage",
        value: function() {
            return this[a] == this[r];
        }
    }, {
        key: "next",
        value: function() {
            return !!this.hasNext() && this.getPageByNum(this[a]++);
        }
    }, {
        key: "getPageByNum",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            return this[u].find(function(e) {
                return e.page == t;
            });
        }
    }, {
        key: l,
        value: function() {
            var t = this, i = this[n], r = this[s], u = this[a], l = [], o = {}, h = 0;
            return Object.assign(o, {
                page: u,
                list: []
            }), i.forEach(function(i) {
                for (var n = i.list, s = e(n, r, function(t) {
                    return t + 1;
                }), c = 0, f = 1; f <= s; f++) {
                    var g = r - h, v = 0 === h, y = {}, p = v ? c : r * f - r, b = v ? p + r : g;
                    Object.assign(y, i, {
                        list: n.slice(p, b)
                    }), o.list.push(y), (h += y.list.length) === r && (l.push(o), u = ++t[a], c = b, 
                    h = 0, o = {
                        page: u,
                        list: []
                    });
                }
            }), this.isLastPage() && (l.push(o), this[a] = 1), l;
        }
    } ]), o;
}();