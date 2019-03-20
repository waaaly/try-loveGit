function e() {
    var e = {
        enable: 1
    };
    return s.request.get({
        url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33196.jsonp",
        data: {
            t: Date.now()
        }
    }).then(function(t) {
        var n = t.body.data || [], a = n.length, o = r();
        return a && (e = n.find(function(e) {
            return e.page == o;
        }) || e), i.default.resolve(e);
    }, function(e) {
        return i.default.reject(e);
    });
}

function t() {
    var e = {
        source: c.WE_CHAT
    };
    return s.request.get({
        url: "https://wq.jd.com/pinbind/QueryPinStatus",
        data: e
    }).then(function(e) {
        var t = e.body;
        return 0 == t.errcode ? i.default.resolve(t) : i.default.reject(new Error("code:" + t.errcode + "，message:" + t.errmsg));
    }, function(e) {
        return i.default.reject(e);
    });
}

function n(e) {
    return !(e == l.NEED_UPDATE_PROFILE || e == l.NO_ASSET_HAS_ACCOUNT);
}

function r() {
    var e = getCurrentPages().slice(0).pop();
    return e.route || e.__route__ || "";
}

var a = function() {
    function e(e, t) {
        var n = [], r = !0, a = !1, i = void 0;
        try {
            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), 
            !t || n.length !== t); r = !0) ;
        } catch (e) {
            a = !0, i = e;
        } finally {
            try {
                !r && s.return && s.return();
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
}(), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../libs/promise.min.js")), o = require("../../../bases/component.js"), s = require("../../../common/request/request"), u = new (require("../../../common/logger.js").Logger)("pinbind组件"), c = {
    WE_CHAT: 2
}, l = {
    NEED_UPDATE_PROFILE: 1,
    NO_ASSET_HAS_ACCOUNT: 2,
    SWITHCHABLE: 3,
    UNBINED: 4
};

new o.JDComponent({
    data: {
        show: !1
    },
    _visiable: !1,
    _loading: !1,
    ready: function() {
        this.reload();
    },
    methods: {
        reload: function() {
            var r = this;
            this._loading || (this._loading = !0, i.default.all([ e(), t() ]).then(function(e) {
                var t = a(e, 2), i = t[0], o = t[1].state;
                r._loading = !1;
                var s = n(o);
                1 == i.enable && !s ? (r._visiable = !0, Object.assign(r.data, {
                    show: !0,
                    activeId: i.activeId,
                    level: i.level,
                    scene: i.scene,
                    title: i.title,
                    text: i.desc,
                    btnText: i.btnBindText
                }), r.setData(r.data)) : (r.setData({
                    show: !1
                }), r._visiable = !1);
            }).catch(function(e) {
                r._loading = !1, u.error(e);
            }));
        },
        gotoAccountPage: function(e) {
            var t = r(), n = {
                sceneid: this.data.scene,
                rurl: "/" + t,
                bindactiveid: this.data.activeId,
                bindlevel: this.data.level
            };
            this.$goto("/pages/my_pages/account/account", n);
        },
        setVisiable: function(e) {
            this._visiable && this.setData(Object.assign(this.data, {
                show: e
            }));
        }
    }
});