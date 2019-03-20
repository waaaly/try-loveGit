Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.parse = function(o) {
    if (!o) throw new Error("page option 参数不合法");
    var t = {};
    return (0, r.parseMethods)(o, t, !0), (0, e.parseXcxLifeCircle)(o, t, !0), (0, s.registerOnPageScroll)(o, t), 
    (0, s.parseAppShare)(o, t), t;
}, exports.componentParse = function(t) {
    if (!t) throw new Error("component option 参数不合法");
    var i = {};
    return (0, o.parseBehaviors)(t, i), (0, r.parseProps)(t, i), (0, r.parseMethods)(t, i, !1), 
    (0, e.parseXcxLifeCircle)(t, i, !1), (0, s.parseOptions)(t, i), i;
};

var e = require("../lifecycle"), r = require("../state"), o = require("../behaviors"), s = require("../init");