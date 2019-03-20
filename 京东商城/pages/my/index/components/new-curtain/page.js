function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
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

var i = t(require("./store")), n = t(require("../../../../../common/wxcontext")), r = e(require("../../../../../common/localStorage")), u = t(require("../../../../../api/Ptag/report_manager_wqvue")), o = e(require("../../../common/js/utils")), s = {
    store: i.default,
    data: {
        isXCX: n.default.isXCX,
        initNum: 3
    },
    props: {
        userInfo: {
            type: Object,
            default: function() {
                return {};
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
            default: -1
        }
    },
    watch: {
        userInfo: function(e, t) {
            this.isValidValue(e, t) && e.isbind != t.isbind && this.initPage();
        },
        newBindConfig: function(e) {
            e.length && this.initPage();
        },
        isNewUser: function(e) {
            1 == e && this.initPage();
        }
    },
    methods: {
        initPage: function() {
            var e = this;
            if (this.initNum > 1) this.initNum--; else {
                if (!this.userInfo.isbind && this.isNewUser) {
                    var t = o.getCurDatePpms(this.newBindConfig, "type", "new"), i = t && t[0] && t[0].num;
                    i && r.get("newCurtainShow", 0).then(function(n) {
                        n && n == i || e.showMyNewCurtain(t[0]);
                    });
                }
                this.initNum = 3;
            }
        },
        isValidValue: function(e, t) {
            return e != t && 0 != Object.keys(e).length;
        },
        hideXModal: function() {
            this.newWindow.show = !1;
        },
        bindClick: function(e) {
            var t = e.currentTarget.dataset, i = t.rurl, n = t.sceneid, r = t.type;
            u.default.addPtag("7155.1.167"), this.hideXModal(), this.gotoBindPage("7155.1.167", n, r, i);
        },
        gotoBindPage: function(e, t, i, n) {
            var r = n + "&sceneid=" + t;
            this.$xgoto([ r ]);
        }
    }
};

exports.default = s;