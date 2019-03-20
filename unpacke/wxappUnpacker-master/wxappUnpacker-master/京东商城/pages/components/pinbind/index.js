function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

function r() {
    var e = {
        enable: 1
    };
    return f.request.get({
        url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33196.jsonp",
        data: {
            t: Date.now()
        }
    }).then(function(t) {
        var n = t.body.data || [], r = n.length, o = a();
        return r && (e = n.find(function(e) {
            return e.page == o;
        }) || e), l.default.resolve(e);
    }, function(e) {
        return l.default.reject(e);
    });
}

function o() {
    var e = {
        source: y.WE_CHAT
    };
    return f.request.get({
        url: "https://wq.jd.com/pinbind/QueryPinStatus",
        data: e
    }).then(function(e) {
        var t = e.body, n = 0 == t.errcode;
        return 13 == t.errcode ? p.doLogin().then(o) : n ? l.default.resolve(t) : l.default.reject(new Error("code:" + t.errcode + "，message:" + t.errmsg));
    }, function(e) {
        return l.default.reject(e);
    });
}

function u(e) {
    return !(e == b.NEED_UPDATE_PROFILE || e == b.NO_ASSET_HAS_ACCOUNT);
}

function a() {
    var e = getCurrentPages().slice(0).pop();
    return e.route || e.__route__ || "";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PinBind = void 0;

var i = function() {
    function e(e, t) {
        var n = [], r = !0, o = !1, u = void 0;
        try {
            for (var a, i = e[Symbol.iterator](); !(r = (a = i.next()).done) && (n.push(a.value), 
            !t || n.length !== t); r = !0) ;
        } catch (e) {
            o = !0, u = e;
        } finally {
            try {
                !r && i.return && i.return();
            } finally {
                if (o) throw u;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), c = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), l = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../libs/promise.min.js")), s = require("../../component.js"), f = require("../../../common/request/request"), d = require("../../../common/logger.js"), p = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("../../../common/login/login.js")), v = new d.Logger("pinbind组件"), y = {
    WE_CHAT: 2
}, b = {
    NEED_UPDATE_PROFILE: 1,
    NO_ASSET_HAS_ACCOUNT: 2,
    SWITHCHABLE: 3,
    UNBINED: 4
}, h = function(f) {
    function d() {
        e(this, d);
        var n = t(this, (d.__proto__ || Object.getPrototypeOf(d)).apply(this, arguments));
        return n.addFunc("gotoAccountPage", n._gotoAccountPage), n;
    }
    return n(d, s.Component), c(d, [ {
        key: "defaultData",
        value: function() {
            return {
                show: !1
            };
        }
    } ]), c(d, [ {
        key: "onLoad",
        value: function() {}
    }, {
        key: "onShow",
        value: function() {
            var e = this;
            l.default.all([ r(), o() ]).then(function(t) {
                var n = i(t, 2), r = n[0], o = u(n[1].state);
                1 == r.enable && (Object.assign(e.data, {
                    show: !o,
                    activeId: r.activeId,
                    level: r.level,
                    scene: r.scene,
                    title: r.title,
                    text: r.desc,
                    btnText: r.btnBindText
                }), e.setData(e.data));
            }).catch(function(e) {
                v.error(e);
            });
        }
    }, {
        key: "_gotoAccountPage",
        value: function(e) {
            var t = a(), n = {
                sceneid: this.data.scene,
                rurl: "/" + t,
                bindactiveid: this.data.activeId,
                bindlevel: this.data.level
            };
            this.$goto("/pages/my_pages/account/account", n);
        }
    } ]), d;
}();

exports.PinBind = h;