function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("./store"), r = t(require("../../common/wxcontext")), a = t(require("../../api/Ptag/report_manager_wqvue")), i = {
    template: "#share",
    store: e.storeFn,
    props: {
        btnText: {
            type: String,
            default: "分享"
        },
        collectFormId: {
            type: Boolean,
            default: !1
        },
        shareCurtainPic: {
            type: String,
            default: ""
        },
        guideText: {
            type: String,
            default: ""
        },
        btnWidth: {
            type: String,
            default: "16.25rem"
        },
        btnStyle: {
            type: String,
            default: ""
        },
        ptag: {
            type: String,
            default: ""
        },
        showClose: {
            type: Boolean,
            default: !1
        },
        domData: {
            type: Object,
            default: function() {
                return {};
            }
        },
        reportParam: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    data: {
        isXcx: r.default.isXCX
    },
    watch: {
        guideText: function(t) {
            this.shareGuideText = t;
        },
        reportParam: function(t) {
            "{}" != JSON.stringify(t) && this.sharereport(t);
        },
        btnStyle: {
            immediate: !0,
            handler: function(t) {
                this.btnStyleRes = this.transform(t);
            }
        },
        domData: {
            immediate: !0,
            handler: function(t) {
                this.domDataStr = JSON.stringify(t);
            }
        }
    },
    methods: {
        onSubItem: function(t) {
            if (a.default.addPtag(this.ptag), this.isXcx && this.collectFormId) {
                var e = t.detail.formId;
                this.setFormId(e), console.error(e);
            }
        },
        close: function() {
            this.isShowCurtain = !1;
        },
        showCurtain: function(t) {
            this.$root.$setShare({
                from: "button",
                target: t.xcxEvent.target
            }), a.default.addPtag(this.ptag);
            try {
                "jdapp" == r.default.JD.device.scene ? window && window.jdShare.callShare() : "mobile" == r.default.JD.device.scene || "qqbrower" == r.default.JD.device.scene ? window && window.mShare.callShare() : this.isShowCurtain = !0;
            } catch (t) {
                this.isShowCurtain = !0;
            }
        },
        transform: function(t) {
            var e = this, r = t.split(";");
            return r.map(function(t) {
                var r = t.split(":");
                return e.tranformStr2(r[0]) + ":" + r[1];
            }), r.join(";");
        },
        tranformStr2: function(t) {
            for (var e = t.split(""), r = 1; r < e.length; r++) "-" == e[r] && (e.splice(r, 1), 
            r < e.length && (e[r] = e[r].toUpperCase()));
            return e.join("");
        }
    }
};

exports.default = i;