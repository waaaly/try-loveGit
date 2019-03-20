function i(i) {
    if (i && i.__esModule) return i;
    var t = {};
    if (null != i) for (var e in i) Object.prototype.hasOwnProperty.call(i, e) && (t[e] = i[e]);
    return t.default = i, t;
}

function t(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("./store")), n = t(require("../../../../../common/wxcontext")), r = i(require("../../../../../common/localStorage")), o = i(require("../../../common/js/bind")), u = i(require("../../../common/js/utils")), a = {
    store: e.default,
    data: {
        bindgray: 0,
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
        }
    },
    watch: {
        newBindConfig: function(i) {
            i.length && this.initPage();
        },
        grayInfo: function(i) {
            i.length && this.initPage();
        },
        userInfo: function(i, t) {
            this.isValidValue(i, t) && i.isbind != t.isbind && this.initPage();
        }
    },
    methods: {
        initPage: function() {
            var i = this;
            if (this.initNum > 1) this.initNum--; else {
                if (this.userInfo && this.userInfo.isbind) {
                    var t = u.getCurDatePpms(this.newBindConfig, "type", "bind"), e = t && t[0] && t[0].num;
                    e && r.get("bindCurtainShow", 0).then(function(r) {
                        r && r == e || (o.sureBindGrayConfig.call(i, n.default.isXCX ? 721294564 : 721294543), 
                        i.showMyBindCurtain(t[0]));
                    });
                }
                this.initNum = 3;
            }
        },
        isValidValue: function(i, t) {
            return i != t && 0 != Object.keys(i).length;
        },
        hideXModal: function() {
            this.bindWindow.show = !1;
        },
        bindClick: function(i) {
            var t = i.currentTarget.dataset, e = t.rurl, r = t.bindactiveid, o = t.bindlevel, u = t.type, a = n.default.JD.cookie.get("wq_uin");
            n.default.JD.report.umpBiz({
                bizid: 563,
                operation: 23,
                result: 2,
                message: a
            }), this.hideXModal(), this.gotoBindPage(u, e, r, o);
        },
        gotoBindPage: function(i, t, e, n) {
            o.goBindPage.call(this, {
                rurl: t,
                activeid: e,
                level: n,
                ptag: "7155.1.169",
                bindgray: this.bindgray
            });
        }
    }
};

exports.default = a;