Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function e(e, t) {
        var n = [], r = !0, a = !1, i = void 0;
        try {
            for (var o, l = e[Symbol.iterator](); !(r = (o = l.next()).done) && (n.push(o.value), 
            !t || n.length !== t); r = !0) ;
        } catch (e) {
            a = !0, i = e;
        } finally {
            try {
                !r && l.return && l.return();
            } finally {
                if (a) throw i;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), t = getApp().services.HashToUrl;

exports.default = function() {
    var n = [];
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function(r, a) {
        if (r.index = a, /eleme:\/\/restaurants\?/.test(r.link)) {
            var i = decodeURIComponent(r.link).replace(/eleme:\/\/restaurants\?/, "category_name=" + r.name + "&");
            r.link = "/pages/shop/list/shop-list?" + i, r.image_url = t(r.image_hash, 90, 90), 
            n.push(r);
        } else if (/eleme:\/\/offline\?/.test(r.link)) {
            var o = {};
            if (r.link.replace(/eleme:\/\/offline\?/, "").split("&").forEach(function(t) {
                var n = t.split("="), r = e(n, 2), a = r[0], i = r[1];
                o[decodeURIComponent(a)] = decodeURIComponent(i);
            }), o.url) r.link = "/pages/container/index?title=" + encodeURIComponent(r.name) + "&href=" + encodeURIComponent(o.url); else {
                var l = "offline=1&category_name=" + r.name + "&pluginId=" + o.pluginId + "&target=" + o.pageData;
                r.link = "/pages/shop/list/shop-list?" + l;
            }
            r.image_url = t(r.image_hash, 90, 90), n.push(r);
        }
    }), n;
};