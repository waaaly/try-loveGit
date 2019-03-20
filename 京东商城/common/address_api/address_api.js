function e(e, i) {
    this.success = e, this.fail = i;
}

function i(e) {
    for (var i = [], n = [], t = 0; t < e.length; t++) {
        var r = e[t];
        i.push(r.id), n.push(r.name);
    }
    return {
        idList: i,
        nameList: n
    };
}

function n(e) {
    e(null, d);
}

function t(i, n) {
    var t = "https://wq.jd.com/deal/recvaddr/getprovince?provinceid=" + i;
    r.get(t, [], new e(function(e) {
        n(null, e);
    }, function(e) {
        n("error");
    }));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.setDisplayHwAddr = exports.getUserDefaultDeliveryAddress = exports.getTownList = exports.getDistrictList = exports.getCityList = exports.getProvinceList = void 0;

var r = function(e) {
    if (e && e.__esModule) return e;
    var i = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (i[n] = e[n]);
    return i.default = e, i;
}(require("../../common/http_json.js")), d = [ {
    name: "北京",
    id: 1
}, {
    name: "上海",
    id: 2
}, {
    name: "天津",
    id: 3
}, {
    name: "重庆",
    id: 4
}, {
    name: "河北",
    id: 5
}, {
    name: "山西",
    id: 6
}, {
    name: "河南",
    id: 7
}, {
    name: "辽宁",
    id: 8
}, {
    name: "吉林",
    id: 9
}, {
    name: "黑龙江",
    id: 10
}, {
    name: "内蒙古",
    id: 11
}, {
    name: "江苏",
    id: 12
}, {
    name: "山东",
    id: 13
}, {
    name: "安徽",
    id: 14
}, {
    name: "浙江",
    id: 15
}, {
    name: "福建",
    id: 16
}, {
    name: "湖北",
    id: 17
}, {
    name: "湖南",
    id: 18
}, {
    name: "广东",
    id: 19
}, {
    name: "广西",
    id: 20
}, {
    name: "江西",
    id: 21
}, {
    name: "四川",
    id: 22
}, {
    name: "海南",
    id: 23
}, {
    name: "贵州",
    id: 24
}, {
    name: "云南",
    id: 25
}, {
    name: "西藏",
    id: 26
}, {
    name: "陕西",
    id: 27
}, {
    name: "甘肃",
    id: 28
}, {
    name: "青海",
    id: 29
}, {
    name: "宁夏",
    id: 30
}, {
    name: "新疆",
    id: 31
}, {
    name: "台湾",
    id: 32
}, {
    name: "钓鱼岛",
    id: 84
}, {
    name: "港澳地区",
    id: 52993
}, {
    name: "海外",
    id: 53283
} ], a = {}, s = {}, o = {}, u = !0;

exports.getProvinceList = function(e) {
    n(function(i, n) {
        for (var t = [], r = [], d = n.length - 1; d >= 0; d--) {
            var a = n[d];
            (53283 != a.id || u) && (t.splice(0, 0, a.id), r.splice(0, 0, a.name));
        }
        e(i, {
            idList: t,
            nameList: r
        });
    });
}, exports.getCityList = function(e, i) {
    a.hasOwnProperty(e) ? i(null, a[e]) : t(e, function(n, t) {
        -1 == t.errCode && (t = {});
        var r = [], d = [], u = [], p = [];
        for (var m in t) {
            var f = t[m];
            if (r.push(~~m), "string" == typeof f) if (53283 != e) d.push(f); else {
                var l = f.split("_");
                d.push(l[0]), u.push(l[1]), p.push(l[2]);
            } else {
                if (53283 != e) d.push(f[0]); else {
                    var c = f[0].split("_");
                    d.push(c[0]), u.push(c[1]), p.push(c[2]);
                }
                var v = [], h = [], L = f[1];
                for (var g in L) {
                    var y = L[g];
                    if (v.push(~~g), "string" == typeof y) h.push(y); else {
                        h.push(y[0]);
                        var j = [], x = [], w = y[1];
                        for (var D in w) j.push(~~D), x.push(w[D]);
                        o[g] = {
                            idList: j,
                            nameList: x
                        };
                    }
                }
                s[m] = {
                    idList: v,
                    nameList: h
                };
            }
        }
        a[e] = 53283 != e ? {
            idList: r,
            nameList: d
        } : {
            idList: r,
            nameList: d,
            areaCodeList: u,
            nameCodeList: p
        }, i(n, a[e]);
    });
}, exports.getDistrictList = function(e, n, t) {
    s.hasOwnProperty(n) ? t(null, s[n]) : t(null, i([]));
}, exports.getTownList = function(e, n, t, r) {
    0 != t && o.hasOwnProperty(t) ? r(null, o[t]) : r(null, i([]));
}, exports.getUserDefaultDeliveryAddress = function(e) {
    var i = "https://wq.jd.com/deal/recvaddr/getrecvaddrV3?r=" + Math.round(2147483647 * Math.random()) + "&adid=0&reg=1&type=1";
    r.get(i, {}, {
        success: function(i) {
            0 == i.retCode && i.jdaddrid && i.jdaddrname && require("../user_info.js").updateAddress({
                jdaddrid: i.jdaddrid,
                jdaddrname: i.jdaddrname
            }), "function" == typeof e && e(i.retCode || 0, i);
        },
        fail: function(i) {
            "function" == typeof e && e(-1, i);
        }
    });
}, exports.setDisplayHwAddr = function(e) {
    u = e;
};