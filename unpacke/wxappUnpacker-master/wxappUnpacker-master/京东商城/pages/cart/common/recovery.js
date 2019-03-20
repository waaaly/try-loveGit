function r(r, e) {
    if (!(r instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e() {
    return new o.default(function(r, e) {
        (0, a.getPPMS)(35042).then(function(e) {
            var n = t(e, 1)[0], o = void 0 === n ? s : n, u = o.enable, a = o.url;
            u = 1 == u, a = (0, i.fixProtocol)(a), a = (0, c.addUrlParam)(a, {
                rongzai: 1
            }), r({
                enable: u,
                url: a
            });
        }).catch(function(e) {
            f.error(e), r(s);
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Recovery = void 0;

var n = function() {
    function r(r, e) {
        for (var n = 0; n < e.length; n++) {
            var t = e[n];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(r, t.key, t);
        }
    }
    return function(e, n, t) {
        return n && r(e.prototype, n), t && r(e, t), e;
    };
}(), t = function() {
    function r(r, e) {
        var n = [], t = !0, o = !1, u = void 0;
        try {
            for (var a, i = r[Symbol.iterator](); !(t = (a = i.next()).done) && (n.push(a.value), 
            !e || n.length !== e); t = !0) ;
        } catch (r) {
            o = !0, u = r;
        } finally {
            try {
                !t && i.return && i.return();
            } finally {
                if (o) throw u;
            }
        }
        return n;
    }
    return function(e, n) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return r(e, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), o = function(r) {
    return r && r.__esModule ? r : {
        default: r
    };
}(require("../../../libs/promise.min.js")), u = require("../../../common/logger.js"), a = require("../../../common/biz.js"), i = require("../../../common/utils.js"), c = require("../../../common/url_utils.js"), l = require("../../../common/navigator.js"), f = new u.Logger("购物车容灾模式"), s = {
    enable: 1,
    url: "https://wq.jd.com/deal/mshopcart/mycart"
}, m = function() {
    function t() {
        r(this, t);
    }
    return n(t, null, [ {
        key: "apply",
        value: function() {
            var r = "pages/cart/cart/cart" == getCurrentPages().pop().route ? "redirectTo" : "navigateTo";
            e().then(function(e) {
                var n = e.enable, t = e.url;
                n && (0, l.goto)("/pages/h5/index", {
                    url: t
                }, {
                    method: r
                });
            });
        }
    } ]), t;
}();

exports.Recovery = m;