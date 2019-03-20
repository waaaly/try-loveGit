function e(e) {
    var n = {};
    return Object.keys(e).forEach(function(i) {
        n[decodeURIComponent(i)] = decodeURIComponent(e[i]);
    }), n;
}

function n() {
    return [ {
        route: document.referrer
    }, this._isWqVueComponent ? this.$root : this ];
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.add$query = function(n, r) {
    var t = r || (0, i.parseQueryString)(location.href);
    n.$query = e(t);
}, exports.decodeQuerys = e, exports.addSpeApi = function(e) {
    e.rpx2px = function(e) {
        return e * ((window ? window.screen.availWidth : wx.getSystemInfoSync().windowWidth) / 750);
    }, e.getCurrentPages = window ? (0, i.bind)(n, e) : getCurrentPages, e.$env = r;
};

var i = require("../../util/index"), r = [ "xcx", "weixin", "qq", "m", "jdapp", "node", "weex" ][[ i.isXcx, i.isWeixin, i.isQQ, i.isMobile, i.isJDApp, i.inNode, i.inWeex ].findIndex(function(e) {
    return e;
})];