function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("./store")), o = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    return e.default = t, e;
}(require("../../../common/js/utils")), i = t(require("../../../../../api/Ptag/report_manager_wqvue")), s = o.getEnv(), u = {
    store: e.default,
    created_vue: function() {
        1 == s ? (this.getIsFollowAcc(), this.getIsFollowGwqAcc()) : 2 == s && this.getIsQQFollowAcc();
    },
    methods: {
        toggleAccount: function() {
            if (this.isShowQR || i.default.addPtag("7155.1.38"), 1 == s) this.isShowQR = !this.isShowQR; else try {
                mqq.ui.showOfficalAccountDetail({
                    uin: "2712384158"
                }, function(t) {});
            } catch (t) {
                console.log("mqq" + t);
            }
        },
        toggleGwqAccount: function() {
            this.isShowGwqQR || i.default.addPtag("7155.1.38"), this.isShowGwqQR = !this.isShowGwqQR;
        }
    }
};

exports.default = u;