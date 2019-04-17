Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./config")), r = function(r) {
    return r.replace(/^(.)(..)(.{29}(.*))$/, e.default.fussHost + "/$1/$2/$3.$4");
}, t = function(e, r, t) {
    var n = r + "x" + t;
    return e + "?imageMogr/thumbnail/!" + n + "r/gravity/Center/crop/" + n + "/";
};

exports.default = function(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 200, u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 200;
    if (!e) return console.warn("Dave warn: hash is requried.");
    var a = e.match(/^http/) ? e : r(e);
    return t(a, n, u);
};