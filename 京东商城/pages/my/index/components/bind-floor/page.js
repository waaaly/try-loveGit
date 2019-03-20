function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = t(require("./store")), r = e(require("../../../common/js/utils")), i = e(require("../../../common/js/bind")), o = t(require("../../../../../common/wxcontext")), a = {
    props: {
        userInfo: {
            type: Object,
            default: function() {
                return {};
            }
        },
        grayInfo: {
            type: Array,
            default: function() {
                return [];
            }
        },
        newBindConfig: {
            type: Array,
            default: function() {
                return [];
            }
        },
        isNewUser: {
            type: Number,
            default: 0
        }
    },
    store: n.default,
    watch: {
        grayInfo: function(e) {
            e.length && i.sureBindGrayConfig.call(this, o.default.isXCX ? 721294566 : 721294544);
        },
        newBindConfig: function(e) {
            e.length && (this.bindConfig = r.getCurDatePpms(e, "type", "bindfloor")[0]);
        },
        isNewUser: function(e) {
            this.showNewFloor = 3 != r.getEnv() && 1 == e;
        }
    },
    created: function() {
        this.navToBindPage = r.throttle(this.navToBindPage, 1e3);
    },
    methods: {
        navToBindPage: function() {
            var e = this.bindConfig, t = e.activeid, n = e.level;
            this.isNewUser ? this.$xgoto([ "//wqs.jd.com/portal/wx/fresh/wx2017.html?ptag=138115.1.1" ]) : i.goBindPage.call(this, {
                activeid: t,
                level: n,
                ptag: "7155.1.136",
                bindgray: this.bindgray
            });
        }
    }
};

exports.default = a;