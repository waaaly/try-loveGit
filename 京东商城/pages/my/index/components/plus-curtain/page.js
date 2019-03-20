function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("./store")), i = t(require("../../../../../common/wxcontext")), s = t(require("../../../../../api/Ptag/report_manager_wqvue")), n = {
    default: "7155.1.84",
    0: "7155.1.163",
    102: "7155.1.164",
    103: "7155.1.165",
    203: "7155.1.166"
}, u = {
    store: e.default,
    data: {
        bindgray: 0,
        isXCX: i.default.isXCX,
        isInit: !1
    },
    props: {
        userInfo: {
            type: Object,
            default: function() {
                return {};
            }
        },
        isNewUser: {
            type: Number,
            default: -1
        }
    },
    watch: {
        userInfo: function(t, e) {
            this.isValidValue(t, e) && t.isbind != e.isbind && this.initPage();
        },
        isNewUser: function(t) {
            0 == t && this.initPage();
        }
    },
    methods: {
        initPage: function() {
            this.isInit ? (this.userInfo.isbind || this.isNewUser || this.getPpmsPlusConfig(), 
            this.isInit = !1) : this.isInit = !0;
        },
        isValidValue: function(t, e) {
            return t != e && 0 != Object.keys(t).length && void 0 !== t.isbind && void 0 !== this.isNewUser;
        },
        bindClick: function(t) {
            var e = t.currentTarget.dataset, i = e.rurl, u = e.vipStatus;
            0 == u || 102 == u || 103 == u || 203 == u ? s.default.addPtagExposure(n[u]) : 201 != u && 101 != u && s.default.addPtagExposure(n.default), 
            this.plusWindow.show = !1, i && this.gotoBindPage(i);
        },
        gotoBindPage: function(t) {
            this.$xgoto([ t ]);
        }
    }
};

exports.default = u;