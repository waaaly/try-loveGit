function e(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}

require("5C5018F62546F6CF3A3670F1A835B753.js");

module.exports = {
    request: function(e, t) {
        var n = e.relationType, r = e.genderType;
        wx.request({
            url: "https://api.gzcfe.net/app/" + e.path,
            type: e.type || "GET",
            data: {
                relationType: n,
                genderType: r
            },
            header: {
                "App-Space": "B0CD0050CF0BF01B",
                "App-Type": "3",
                "App-Extra": "",
                "App-Uid": 0,
                "Api-Version": "1"
            },
            success: function(e) {
                t(e.data);
            },
            fail: function(e) {
                console.log("remote-fail", e);
            }
        });
    },
    today: function() {
        var t = void 0, n = void 0, r = void 0, o = new Date();
        return t = o.getFullYear(), n = e(o.getMonth() + 1), r = e(o.getDate()), t + "年" + n + "月" + r + "日";
    },
    formatTime: function(t) {
        var n = t.getFullYear(), r = t.getMonth() + 1, o = t.getDate(), i = t.getHours(), a = t.getMinutes(), p = t.getSeconds();
        return [ n, r, o ].map(e).join("/") + " " + [ i, a, p ].map(e).join(":");
    },
    GUID: function() {
        function e() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
        }
        return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e();
    }
};