Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.hasProto = "__proto__" in {}, exports.canConfigArrayPrototype = Object.getOwnPropertyDescriptor(Array.prototype, "push").configurable;

var e = exports.inBrowser = "undefined" != typeof window, o = (exports.inNode = "undefined" != typeof global && "undefined" != typeof module, 
exports.inWeex = "undefined" != typeof weex && weex.config && weex.config.env && [ "Android", "iOS" ].indexOf(weex.config.env.platform) > 0, 
exports.UA = e && window.navigator.userAgent.toLowerCase()), t = (exports.isIE = o && /msie|trident/.test(o), 
exports.isIE9 = o && o.indexOf("msie 9.0") > 0, exports.isEdge = o && o.indexOf("edge/") > 0), i = (exports.isAndroid = o && o.indexOf("android") > 0, 
exports.isIOS = o && /iphone|ipad|ipod|ios/.test(o), exports.isChrome = o && /chrome\/\d+/.test(o) && !t, 
exports.isXcx = "undefined" != typeof getApp && "undefined" != typeof wx, exports.isJDApp = o && /jdapp;/.test(o)), r = exports.isQQ = o && /qq\/([\d.]+)*/.test(o), s = exports.isWeixin = o && o.indexOf("micromessenger") > -1;

exports.isMobile = e && !i && !r && !s;