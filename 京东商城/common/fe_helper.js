Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.datatime = exports.filterInTime = exports.getUrlParam = exports.getServerTimeAsnyc = exports.getServerTime = exports.isMobile = exports.decode = exports.debounce = exports.throttle = exports.querystring = exports.getImg = void 0;

var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("./utils.js")), t = require("./request/request"), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../libs/promise.min.js")), o = 0;

try {
    t.request.get("https://wq.jd.com/mcoss/servertime/getservertime", {
        callback: "cb"
    }).then(function(e) {
        var t = e.body;
        0 == t.errCode && t.data && t.data.length && (o = new Date(t.data[0].serverTime) - Date.now());
    });
} catch (e) {
    console.error(e);
}

var s = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ], i = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31" ], n = [ "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "04", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59" ], a = {
    parseStampToFormat: function(e, t) {
        var r = void 0, o = (r = e ? new Date(e) : new Date()).getFullYear(), a = s[r.getMonth()], m = i[r.getDate() - 1], u = n[r.getHours()], c = n[r.getMinutes()], p = n[r.getSeconds()];
        return t = t || "YYYY/MM/DD/hh/mm/ss", t.replace("YYYY", o).replace("MM", a).replace("DD", m).replace("hh", u).replace("mm", c).replace("ss", p);
    },
    getNowDatetime: function() {
        var e = new Date().getTime();
        return this.parseStampToFormat(e);
    }
}, m = e.getImg, u = e.querystring, c = e.throttle, p = e.debounce, l = e.decode, g = e.getUrlParam, d = e.isMobile;

exports.getImg = m, exports.querystring = u, exports.throttle = c, exports.debounce = p, 
exports.decode = l, exports.isMobile = d, exports.getServerTime = function() {
    return Date.now() + o;
}, exports.getServerTimeAsnyc = function() {
    return new r.default(function(e, t) {
        wx.$.request.get("https://wq.jd.com/mcoss/servertime/getservertime", {
            callback: "GTSTime"
        }).then(function(t) {
            var r = t.body;
            "0" === r.errCode && e(r.data[0].serverTime);
        });
    });
}, exports.getUrlParam = g, exports.filterInTime = function(e, t) {
    if ("[object Array]" !== Object.prototype.toString.call(e)) return e;
    var r = {
        stime: "stime",
        etime: "etime",
        now: new Date().getTime()
    }, o = t || {};
    for (var s in o) r[s] && (r[s] = o[s]);
    var i = [];
    return e.forEach(function(e) {
        10 === String(e[r.stime]).length && (e[r.stime] = 1e3 * parseInt(e[r.stime])), 10 === String(e[r.etime]).length && (e[r.etime] = 1e3 * parseInt(e[r.etime]));
        var t = new Date(e[r.stime]).getTime(), o = new Date(e[r.etime]).getTime();
        t < r.now && o > r.now && i.push(e);
    }), i;
}, exports.datatime = a;