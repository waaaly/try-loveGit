function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), i = require("../../libs/promise.js"), n = require("../utils/api.js"), a = function() {
    function a() {
        e(this, a), this.data = {};
    }
    return t(a, [ {
        key: "reset",
        value: function() {
            this.data = {};
        }
    }, {
        key: "set",
        value: function(e) {
            this.data.isInvoiceAvailable = e.is_available, this.data.invoiceStatusText = e.status_text;
        }
    }, {
        key: "select",
        value: function(e) {
            this.data.invoice = e;
        }
    }, {
        key: "clear",
        value: function() {
            this.data.invoice = {};
        }
    }, {
        key: "edit",
        value: function(e) {
            this.data.editingInvoice = e;
        }
    }, {
        key: "add",
        value: function(e, t) {
            var a = this;
            return n.createInvoice(t).then(function(e) {
                return a.data.invoices.push(e.data), i.resolve(e.data);
            });
        }
    }, {
        key: "remove",
        value: function(e, t) {
            var a = this;
            return n.deleteInvoice(t.id).then(function(e) {
                var n = a.data.invoices.indexOf(a.data.editingInvoice);
                return a.data.invoices.splice(n, 1), a.equal(a.data.invoice, t) && a.clear(), a.data.editingInvoice = void 0, 
                i.resolve();
            });
        }
    }, {
        key: "update",
        value: function(e, t, a) {
            var o = this;
            return n.updateInvoice(t.id, a).then(function(e) {
                return t = a, o.equal(o.data.invoice, t) && (o.data.invoice = a), o.data.editingInvoice = void 0, 
                i.resolve();
            });
        }
    }, {
        key: "equal",
        value: function(e, t) {
            return JSON.stringify(e) === JSON.stringify(t);
        }
    }, {
        key: "load",
        value: function(e) {
            var t = this;
            return new i(function(i, a) {
                e && n.getInvoiceList().then(function(e) {
                    200 == +e.statusCode ? (t.data.invoices = e.data, t.data.invoice = t.data.invoice || {}, 
                    i(t.data)) : a();
                }).catch(function() {
                    a();
                });
            });
        }
    }, {
        key: "loadSync",
        value: function() {
            return this.data;
        }
    } ]), a;
}();

module.exports = a;