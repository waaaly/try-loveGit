Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../common/request/request"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/promise.min.js")), s = {
    getPPMS: function(s) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = o.dataType, r = void 0 === n ? "jsonp" : n, u = (o.expire, 
        o.v), p = void 0 === u || u, i = void 0;
        return i = "json" == r ? "https://wqs.jd.com/data/ppms/js/ppms.pagev" + s + ".json" : "https://wq.360buyimg.com/data/ppms/js/ppms.page" + (p ? "v" : "") + s + ".jsonp", 
        new t.default(function(t, s) {
            e.request.get({
                url: i
            }).then(function(e) {
                var s = e.body;
                t(s.data);
            }, function(e) {
                s(e);
            });
        });
    }
};

exports.default = s;