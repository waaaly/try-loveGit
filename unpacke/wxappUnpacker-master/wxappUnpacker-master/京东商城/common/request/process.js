Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e, n) {
    var t = new r.Task(e, n);
    return t.speed.start = Date.now(), t.requestStart = Date.now(), o(t, function() {
        t.requestEnd = Date.now();
        var e = {
            body: t.body,
            header: t.resHeader,
            handler: t.handler
        };
        return n(t.error, e);
    });
};

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/async.min.js")), r = require("./task.js"), n = require("./plugins/report.js"), t = require("./plugins/setCookie.js"), s = require("./plugins/cache.js"), u = require("./plugins/coss.js"), i = require("./plugins/dispatcher.js"), a = [ n.Report, t.SetCookie, s.Cache, u.Coss ];

a.push(i.Dispatcher);

var o = function(r) {
    return function(n, t) {
        e.default.applyEachSeries(r.map(function(e) {
            return e.request.bind(e);
        }), n, function() {
            e.default.applyEachSeries(r.reverse().map(function(e) {
                return e.response.bind(e);
            }), n, function() {
                t(n);
            });
        });
    };
}(a);