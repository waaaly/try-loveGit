var e = getApp(), t = e.services, r = t.Ubt, n = t.imageHash, s = t.User, i = require("./js/images.js"), a = require("./js/apis.js"), o = [ [ 2, 5, 10 ], [ 5, 20, 42 ], [ 50, 100, 88 ] ], c = e.extend([ {
    data: {
        imageHash: n,
        images: i,
        loadedAll: !1,
        loaded: !1,
        bonusRules: o
    },
    onLoad: function() {
        s.id ? this.init() : wx.redirectTo({
            url: "/pages/auth/index?&successUrl=/pages/commend/index"
        });
    },
    onShow: function() {
        r.sendPv();
    },
    init: function() {
        this.getReferDetail(), this.getReferRecords();
    },
    getReferDetail: function() {
        var e = this;
        a.getReferDetail().then(function(t) {
            var r = t.data;
            e.setData({
                myBonusData: e.getMyBonusData(r),
                referCode: r.refer_code,
                redBarWidth: e.getRedBarWidth(r.activity_refer_count),
                activityReferCount: r.activity_refer_count,
                inviteMsg: e.getInviteMsg(r.activity_refer_count),
                loaded: !0
            });
        });
    },
    getReferRecords: function() {
        var e = this, t = this.data.refer_records || [], r = (t[t.length - 1] || {}).id || 0;
        a.getReferRecords(r, 20).then(function(t) {
            var r = t.data;
            e.setData({
                referRecords: r.refer_records,
                bonusRecords: r.extra_bonus_records,
                records: e.mergeRecords(r),
                loadedAll: r.refer_records.length < 20
            });
        });
    },
    getMyBonusData: function(e) {
        return [ {
            title: "<span style='color: #ff6000;'>" + e.estimated_bonus + "</span>元",
            subtitle: "预计收益"
        }, {
            title: e.actual_bonus + "元",
            subtitle: "实际收益"
        }, {
            title: e.refer_count + "人",
            subtitle: "成功邀请"
        } ];
    },
    mergeRecords: function(e) {
        var t = this, r = e.refer_records, n = e.extra_bonus_records, s = [];
        return r.forEach(function(e) {
            n.some(function(r) {
                if (r.refer_record_id === e.id) return r.highlightMsg = t.getHighlightBonusMsg(r), 
                s.push(r), !0;
            }), e.highlightMsg = t.getHighlightBonusMsg(e), s.push(e);
        }), s;
    },
    getHighlightBonusMsg: function(e) {
        var t = e.bonus_text, r = e.highlight_bonus_text;
        return r ? t.replace(r, "<span style='color: #ff6000;'>" + r + "</span>") : t;
    },
    onReachBottom: function() {
        this.data.loadedAll || this.getReferRecords();
    },
    getRedBarWidth: function(e) {
        if (!e) return 0;
        var t = [ [ 0, 0, 0 ] ].concat(o, [ [ 100, 100, 100 ] ]), r = 100;
        return t.slice(1).forEach(function(n, s) {
            var i = [ t[s][0], n[0] ], a = i[0], o = i[1], c = [ t[s][2], n[2] ], u = c[0], d = c[1];
            e >= a && e < o && (r = u + (e - a) / (o - a) * (d - u));
        }), r + "%";
    },
    getInviteMsg: function(e) {
        var t = "";
        if (o.some(function(r) {
            if (e < r[0]) return t = "再邀请<span style='color: #ca1f20;'>" + (r[0] - e) + "人</span>，得额外奖励<span style='color: #ca1f20;'>" + r[1] + "元</span>", 
            !0;
        }), !t) {
            var r = o.reduce(function(e, t) {
                return e + t[1];
            }, 0);
            t = "恭喜获得<span style='color: #ca1f20;'>" + r + "元</span>额外奖励";
        }
        return t;
    },
    onShareAppMessage: function() {
        return r.sendEvent({
            id: 102117
        }), {
            title: "Hi 朋友，有个15元红包，想送给努力前行的你～",
            path: "/pages/invitehongbao/index?referCode=" + this.data.referCode,
            imageUrl: "https://fuss10.elemecdn.com/f/2f/83e8a794da5618e94902fde67b4cfpng.png"
        };
    }
} ]);

Page(c);