function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var n = e[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, a, n) {
        return a && t(e.prototype, a), n && t(e, n), e;
    };
}(), a = require("../../libs/promise.js"), n = require("../utils/api.js"), r = function() {
    function r() {
        t(this, r), this.data = {
            remark: "",
            flattenRemarks: []
        };
    }
    return e(r, [ {
        key: "reset",
        value: function() {
            this.data = {
                remark: "",
                flattenRemarks: []
            };
        }
    }, {
        key: "flatten",
        value: function(t) {
            var e = [];
            return t.forEach(function(t) {
                switch (t.length) {
                  case 1:
                    t.forEach(function(t) {
                        e.push({
                            class: "single",
                            text: t
                        });
                    });
                    break;

                  case 2:
                    t.forEach(function(t, a) {
                        e.push({
                            class: 0 === a ? "left" : "right",
                            text: t
                        });
                    });
                    break;

                  default:
                    t.forEach(function(t, a, n) {
                        e.push({
                            class: 0 === a ? "left" : a === n.length - 1 ? "right" : "middle",
                            text: t
                        });
                    });
                }
            }), e;
        }
    }, {
        key: "toggleRemark",
        value: function(t) {
            if (!t.selected) {
                for (var e = this.data.flattenRemarks.indexOf(t), a = e, n = e; -1 === [ "left", "single" ].indexOf(this.data.flattenRemarks[a].class) && a; ) a--;
                for (;-1 === [ "right", "single" ].indexOf(this.data.flattenRemarks[n].class) && n < this.data.flattenRemarks.length; ) n++;
                for (;a <= n; ) this.data.flattenRemarks[a++].selected = !1;
            }
            t.selected = !t.selected;
        }
    }, {
        key: "setRemarkDescription",
        value: function() {
            this.data.remarksDescription = this.data.flattenRemarks.filter(function(t) {
                return t.selected;
            }).map(function(t) {
                return t.text;
            }).concat(this.data.remark).join(",");
        }
    }, {
        key: "save",
        value: function(t) {
            this.data.remark = t;
        }
    }, {
        key: "load",
        value: function(t) {
            var e = this, r = t.cartId, s = t.sig;
            return new a(function(t, a) {
                n.getRemarks(r, s).then(function(n) {
                    200 == +n.statusCode ? (JSON.stringify(e.data.remarks) !== JSON.stringify(n.data.remarks) && (e.data.remarks = n.data.remarks, 
                    e.data.flattenRemarks = e.flatten(e.data.remarks), e.setRemarkDescription()), t(e.data)) : a();
                }).catch(function() {
                    a();
                });
            });
        }
    }, {
        key: "loadSync",
        value: function() {
            return this.setRemarkDescription(), this.data;
        }
    } ]), r;
}();

module.exports = r;