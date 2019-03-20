function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function n(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

function o() {}

function s() {
    return {
        icon: "",
        title: "",
        titleAlign: "",
        content: "",
        wrapCls: "",
        tpl: h.SHOW,
        closable: !0,
        modal: !0,
        show: !1,
        scope: null,
        buttons: []
    };
}

function i(t) {
    g.hide();
}

function r(t) {
    p.PtagUtils.addPtag("7014.18.45"), this.$goto("/pages/item/subPackages/freight/freight", {
        ptag: "7014.18.44"
    }), i(t);
}

function u() {
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + Math.random().toString(36).substring(2, 15);
}

function c(t) {
    var e = this;
    t.forEach(function(t) {
        t.name = "msgbox:press" + e.pageId + "_" + u(), e[t.name] = t.handler.bind(e);
    }), this["msgbox:close"] = i.bind(this), this["msgbox:noscroll"] = o.bind(this), 
    this["msgbox:emptyFn"] = o.bind(this), this["msgbox:gotoViewRule"] = r.bind(this);
}

function a(t) {
    if (1 === t.length) {
        var e = t[0].cls || "";
        t[0].cls += e + " btn_red";
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.MessageBox = void 0;

var l = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}(), p = require("../../../api/Ptag/Ptag_utils.js"), b = (function(t) {
    t && t.__esModule;
}(require("../../../libs/promise.min.js")), require("../../component.js")), f = (new (require("../../../common/logger.js").Logger)("消息弹窗组件"), 
{
    NONE: "",
    INFO: "icon_success",
    WARNING: "icon",
    ERROR: ""
}), h = {
    SHOW: "tplShow",
    INFO: "tplInfo"
}, g = function(o) {
    function i() {
        return t(this, i), e(this, (i.__proto__ || Object.getPrototypeOf(i)).apply(this, arguments));
    }
    return n(i, b.Component), l(i, [ {
        key: "defaultData",
        value: function() {
            return s();
        }
    } ], [ {
        key: "alert",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s(), e = t.buttons && t.buttons.length >= 1 ? t.buttons.splice(0, 1) : [ {
                cls: "btn_red",
                text: "确认",
                handler: function() {
                    i.hide();
                }
            } ];
            return Object.assign(t, {
                icon: f.WARNING,
                tpl: h.SHOW,
                content: "",
                buttons: e
            }), i.show(t);
        }
    }, {
        key: "confirm",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s();
            if (0 === t.buttons.length) throw new Error("至少需要提供一个按钮");
            var e = [];
            1 === t.buttons.length ? (e.push({
                text: "取消",
                handler: function() {
                    i.hide();
                }
            }), e.push(Object.assign({
                cls: "btn_red"
            }, t.buttons.pop()))) : e = t.buttons, Object.assign(t, {
                icon: f.WARNING,
                tpl: h.SHOW,
                content: "",
                closable: !1,
                buttons: e
            }), i.show(t);
        }
    }, {
        key: "info",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s(), e = [];
            t.buttons && 0 !== t.buttons.length || e.push({
                text: "知道了",
                handler: function() {
                    i.hide();
                }
            }), Object.assign(t, {
                wrapCls: t.content ? "info" : "",
                icon: f.NONE,
                tpl: h.INFO,
                closable: !1,
                buttons: e
            }), i.show(t);
        }
    }, {
        key: "hide",
        value: function() {
            var t = getCurrentPages().slice(0).pop(), e = {};
            e["msgbox.show"] = !1, t && t.setData(e);
        }
    }, {
        key: "show",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s(), e = t.scope ? t.scope : getCurrentPages().slice(0).pop();
            a((t = Object.assign(s(), t, {
                show: !0
            })).buttons), c.apply(e, [ t.buttons ]), e && e.setData({
                msgbox: t
            });
        }
    }, {
        key: "ICONS",
        get: function() {
            return f;
        }
    } ]), i;
}();

exports.MessageBox = g;