Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.addPrToH5 = exports.addPr = void 0;

var e = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
    return r.default = e, r;
}(require("./utils.js")), r = {
    "/pages/seckill/index/index": {
        pr: 25,
        next: [ "/pages/seckill/category/category", "/pages/seckill/brand/brand", "/pages/seckill/detail/detail", "/pages/seckill/cate/cate" ]
    },
    "/pages/brand/index": {
        pr: 51,
        next: [ "/pages/h5/index" ]
    },
    "/pages/pingou/index/index": {
        pr: 4,
        next: [ "/pages/pingou/tuan99/tuan99", "/pages/pingou/ziying/ziying", "/pages/pingou/my/my" ]
    }
};

exports.addPr = function(n, t) {
    var a = e.getPageUrl().route, i = r["/" + a];
    i && -1 != i.next.findIndex(function(e) {
        return e == n;
    }) && (t.pr = i.pr);
}, exports.addPrToH5 = function(r, n) {
    if (!n) return r;
    var t = r.match(/([^?]*)\??(.*)/), a = e.querystr(t[2] || "");
    return a.query.pr = conf.pr, t[1] + "?" + e.querystr(a.query) + (a.hash ? "#" + a.hash : "");
};